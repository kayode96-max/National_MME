'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface School {
  id: number
  name: string
  state: string
  members: number
  coordinates?: [number, number] // [latitude, longitude]
}

interface InteractiveMapProps {
  schools: School[]
  onSchoolClick: (school: School) => void
}

export default function InteractiveMap({ schools, onSchoolClick }: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize map centered on Nigeria
    const map = L.map(mapContainerRef.current, {
      center: [9.0820, 8.6753], // Nigeria center coordinates
      zoom: 6,
      scrollWheelZoom: true,
      zoomControl: true,
      attributionControl: false,
    })

    mapRef.current = map

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    // Custom icon for school markers
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="relative">
          <div class="w-6 h-6 rounded-full bg-primary border-2 border-white shadow-lg animate-pulse flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="absolute inset-0 w-6 h-6 rounded-full bg-primary/30 animate-ping"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24],
    })

    // Add markers for each school
    schools.forEach((school) => {
      // Use provided coordinates or generate approximate ones based on state
      const coordinates = school.coordinates || getStateCoordinates(school.state)
      
      if (coordinates) {
        const popup = L.popup({
          closeButton: true,
          autoClose: false,
          closeOnClick: false,
          closeOnEscapeKey: true,
          className: 'custom-popup',
        }).setContent(`
          <div class="p-2 min-w-[200px]">
            <h3 class="font-bold text-sm mb-1">${school.name}</h3>
            <p class="text-xs text-gray-600 mb-1">${school.state} State</p>
            <p class="text-xs text-primary font-semibold">${school.members} Members</p>
            <button 
              class="mt-2 w-full px-3 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90 transition view-chapter-btn"
              data-school-id="${school.id}"
            >
              View Chapter
            </button>
          </div>
        `)

        const marker = L.marker(coordinates, { icon: customIcon })
          .addTo(map)
          .bindPopup(popup)
          
        // Store popup reference
        marker.on('popupopen', () => {
          const buttons = document.querySelectorAll('.view-chapter-btn')
          buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              e.preventDefault()
              e.stopPropagation()
              const schoolId = parseInt((btn as HTMLElement).getAttribute('data-school-id') || '0')
              const selectedSchool = schools.find((s) => s.id === schoolId)
              if (selectedSchool) {
                onSchoolClick(selectedSchool)
              }
            })
          })
        })
      }
    })

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [schools, onSchoolClick])

  return (
    <>
      <div ref={mapContainerRef} className="w-full h-[500px] rounded-2xl overflow-hidden border border-border shadow-lg" />
      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 0.75rem;
          padding: 0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-popup-tip {
          background: white;
        }
        .leaflet-popup {
          z-index: 1000 !important;
        }
        .leaflet-popup-pane {
          z-index: 700 !important;
        }
        .leaflet-pane {
          z-index: 1;
        }
        .leaflet-tile-pane {
          z-index: 1;
        }
        .leaflet-overlay-pane {
          z-index: 2;
        }
        .leaflet-shadow-pane {
          z-index: 3;
        }
        .leaflet-marker-pane {
          z-index: 4;
        }
        .leaflet-container {
          background: #f8fafc;
          position: relative;
          z-index: 1;
        }
      `}</style>
    </>
  )
}

// Approximate coordinates for Nigerian states (major cities)
function getStateCoordinates(state: string): [number, number] | null {
  const stateCoords: Record<string, [number, number]> = {
    'Lagos': [6.5244, 3.3792],
    'Oyo': [7.3775, 3.9470],
    'Kaduna': [10.5105, 7.4165],
    'Enugu': [6.5244, 7.5105],
    'Ondo': [7.2571, 5.2058],
    'Edo': [6.3350, 5.6037],
    'Ekiti': [7.6190, 5.2200],
    'Rivers': [4.8156, 7.0498],
    'Imo': [5.4840, 7.0330],
    'Osun': [7.5629, 4.5200],
    'Kano': [12.0022, 8.5919],
    'Borno': [11.8333, 13.1500],
    'Abia': [5.4527, 7.5248],
    'Akwa Ibom': [5.0077, 7.8500],
    'Anambra': [6.2209, 6.9378],
    'Bauchi': [10.3158, 9.8442],
    'Bayelsa': [4.9267, 6.2646],
    'Benue': [7.7360, 8.7500],
    'Cross River': [5.8737, 8.5980],
    'Delta': [5.6809, 5.9047],
    'Ebonyi': [6.2649, 8.0137],
    'FCT': [9.0765, 7.3986], // Abuja
    'Gombe': [10.2897, 11.1675],
    'Jigawa': [12.2277, 9.5616],
    'Kebbi': [11.5000, 4.2000],
    'Kogi': [7.7333, 6.7333],
    'Kwara': [8.4799, 4.5418],
    'Nasarawa': [8.5403, 8.3228],
    'Niger': [9.9319, 6.5569],
    'Ogun': [7.1605, 3.3470],
    'Plateau': [9.9285, 8.8921],
    'Sokoto': [13.0622, 5.2339],
    'Taraba': [7.9999, 10.5000],
    'Yobe': [12.2938, 11.9656],
    'Zamfara': [12.1704, 6.2200],
  }

  return stateCoords[state] || null
}
