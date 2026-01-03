# NAMMES API Documentation

## Overview
This Next.js application serves data from JSON files through API routes. The data is organized into two main files:
- `data/landing.json` - Landing page content
- `data/dashboard.json` - Dashboard and member content

## API Endpoints

### Main Data Endpoints

#### GET `/api/landing`
Returns complete landing page data including hero, network, certificates, internships, news, and council information.

**Response:**
```json
{
  "site": { ... },
  "navigation": { ... },
  "hero": { ... },
  "trustBar": { ... },
  "network": { ... },
  "certificate": { ... },
  "internships": { ... },
  "news": { ... },
  "council": { ... },
  "footer": { ... },
  "signup": { ... }
}
```

#### GET `/api/dashboard`
Returns complete dashboard data including user info, navigation, stats, and quick actions.

**Response:**
```json
{
  "site": { ... },
  "navigation": { ... },
  "user": { ... },
  "stats": { ... },
  "quickActions": [ ... ],
  "partners": { ... },
  "chapters": [ ... ],
  ...
}
```

### Specific Section Endpoints

#### GET `/api/chapters`
Returns array of all chapter/institution data.

**Response:**
```json
[
  {
    "id": 1,
    "name": "University of Lagos",
    "state": "Lagos",
    "members": 450,
    ...
  },
  ...
]
```

#### GET `/api/chapters/[id]`
Returns a specific chapter by ID.

**Parameters:**
- `id` (number) - Chapter ID

**Response:**
```json
{
  "id": 1,
  "name": "University of Lagos",
  "state": "Lagos",
  "members": 450,
  ...
}
```

#### GET `/api/partners`
Returns partner professional bodies data.

**Response:**
```json
{
  "headline": "Partner Pathways",
  "description": "...",
  "bodies": [ ... ]
}
```

#### GET `/api/internships`
Returns internship opportunities data.

**Response:**
```json
{
  "badge": "Exclusive Opportunities",
  "headline": "Internships & SIWES Placements",
  "listings": [ ... ]
}
```

#### GET `/api/news`
Returns news and updates data.

**Response:**
```json
{
  "headline": "Stay Updated",
  "items": [ ... ]
}
```

#### GET `/api/council`
Returns council/leadership data.

**Response:**
```json
{
  "headline": "Led by Students, for Students",
  "executives": [ ... ]
}
```

## Utility Functions

The application includes utility functions in `lib/data.ts` for server-side data access:

```typescript
import { 
  getLandingData, 
  getDashboardData, 
  getChaptersData,
  getChapterById,
  getPartnersData,
  getInternshipsData,
  getNewsData,
  getCouncilData,
  getNetworkData,
  getSiteConfig,
  getUserData
} from '@/lib/data';

// Example usage in Server Component
const chapters = await getChaptersData();
const chapter = await getChapterById(1);
```

## Usage in Components

### Client Component with API
```typescript
'use client';

import { useEffect, useState } from 'react';

export function ChaptersList() {
  const [chapters, setChapters] = useState([]);
  
  useEffect(() => {
    fetch('/api/chapters')
      .then(res => res.json())
      .then(data => setChapters(data));
  }, []);
  
  return (
    <div>
      {chapters.map(chapter => (
        <div key={chapter.id}>{chapter.name}</div>
      ))}
    </div>
  );
}
```

### Server Component with Utility
```typescript
import { getChaptersData } from '@/lib/data';

export default async function ChaptersPage() {
  const chapters = await getChaptersData();
  
  return (
    <div>
      {chapters.map(chapter => (
        <div key={chapter.id}>{chapter.name}</div>
      ))}
    </div>
  );
}
```

## Error Handling

All API routes include error handling and return appropriate HTTP status codes:
- `200` - Success
- `404` - Resource not found (e.g., chapter ID doesn't exist)
- `500` - Server error (e.g., file read error)

## Development

To test the API endpoints locally:

```bash
# Start the development server
npm run dev

# Access endpoints
curl http://localhost:3000/api/landing
curl http://localhost:3000/api/chapters
curl http://localhost:3000/api/chapters/1
```

## Notes

- All data is served from static JSON files
- Data is read on each request (no caching implemented)
- Consider implementing caching for production use
- All endpoints return JSON responses
- CORS headers may need to be configured for external API access
