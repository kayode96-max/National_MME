# PROJECT REQUIREMENTS DOCUMENT (PRD)

**Project Name:** National Student Association Web Application
**Date:** December 12, 2025
**Version:** 1.0
**Status:** Approved for Design Phase

---

## 1. EXECUTIVE SUMMARY

**Product Vision**
To build a state-of-the-art web application for the National Student Department Body that serves as both a membership management tool and a career launchpad. The platform will automate administrative tasks (dues, certification) and provide high-value resources (internships, library, networking) to students.

**Core User Strategy**
The platform utilizes a "Teaser Strategy." Public visitors see the scale and value of the association (network maps, internship logos) but must register and pay to access the details, creating a high-conversion funnel.

---

## 2. SITEMAP & ARCHITECTURE

### 2.1 Public Zone (Unauthenticated)
1.  **Landing Page:** Single-page scroll layout containing Teasers, Trust Signals, and Map.
2.  **Authentication Flow:** Signup → Payment Gateway → Auto-Login.

### 2.2 Student Dashboard (Authenticated)
1.  **Dashboard Home:** Overview, Stats, and Quick Actions.
2.  **Chapters Directory:** Searchable list of schools with deep-dive profiles.
3.  **People (Leadership):** 4-Tier directory (Staff, CEC, Senate, Presidents).
4.  **Internships & SIWES:** Job board with application guides.
5.  **Partner Pathways:** Guides for joining senior professional bodies.
6.  **Resource Library:** Repository for PDFs, Past Questions, and Audio.
7.  **Gallery:** Event photos and videos.
8.  **My Profile:** Digital Identity Wallet and Settings.

---

## 3. FUNCTIONAL SPECIFICATIONS

### 3.1 Module A: The Landing Page
* **Hero Section:** High-impact video/image with "Trust Strip" of partner logos at the bottom.
* **Network Teaser:** Interactive Map displaying pins for all registered schools. Hovering shows the school name; clicking triggers a "Join to Access" modal.
* **Product Showcase:** 3D visualization of the Membership Certificate.
* **Content Sliders:** Horizontal carousels for Internship Companies (locked view) and News Headlines (open view).

### 3.2 Module B: Authentication & Payment
* **Data Collection:** Full Name, Email, Institution (Autocomplete), Password.
* **Payment Integration:** Paystack/Flutterwave/Stripe for annual dues.
* **The "Magic" Loader:** Post-payment animation that visually confirms:
    * Verifying Payment...
    * Generating Digital Certificate...
    * Setting up Dashboard...
* **Auto-Login:** User is redirected immediately to the Dashboard upon success; Certificate is emailed in parallel.

### 3.3 Module C: Chapters (School Directory)
* **Global Search:** "Type-ahead" search bar to find schools instantly.
* **School Profile:**
    * **Department Tab:** History, H.O.D Profile, Staff List.
    * **Executives Tab:** President’s Card (featured) and Exco list.
    * **Contact Tab:** Location and "Message Chapter" action.

### 3.4 Module D: People (Leadership Structure)
* **Organization:** Tabbed interface separating:
    1.  Staff Advisers
    2.  Central Executive Council (CEC)
    3.  The Senate
    4.  Council of Presidents
* **Contact:** All profiles include linked LinkedIn and Email icons.

### 3.5 Module E: Internships & SIWES
* **Job Board UI:** List view showing Role, Company, and Tags (e.g., "Accommodation Provided," "Paid").
* **Detail Panel:** Clicking a job opens a side-panel (or modal) with:
    * Stipend & Location details.
    * "How to Apply" step-by-step guide.
    * Requirements Checklist.

### 3.6 Module F: Partner Pathways
* **Concept:** A wizard to help students join senior professional bodies.
* **Features:**
    * Checklist of requirements for the partner body.
    * Direct link to external registration.
    * Prompt to use the Association Certificate as a "Letter of Good Standing."

### 3.7 Module G: Resource Library
* **Filtering:** AJAX-based filters for Level (100L-500L), Category (Textbook, PQ), and Course Code.
* **Preview Mode:** Clicking a PDF opens a lightweight preview of the first 3 pages before downloading.
* **Audio Player:** Sticky player at the bottom of the screen for audiobooks/lectures.

### 3.8 Module H: User Profile (Identity Wallet)
* **Digital ID Card:** Realistic, flip-able ID card design with QR code. Action: "Save to Phone."
* **Credentials:** Option to re-download Certificate or generate a "Letter of Good Standing" PDF.
* **Settings:** Bio, Password management, Notification toggles.

---

## 4. TECHNICAL REQUIREMENTS

### 4.1 Performance & Optimization
* **Lazy Loading:** Maps, school logos, and gallery images must load only when scrolled into view.
* **Certificate Generation:** Server-side script (e.g., PDFKit) to inject user data into an SVG template and convert to PDF in <2 seconds.

### 4.2 Security
* **Data:** Passwords hashed via Bcrypt.
* **Sessions:** JSON Web Tokens (JWT) for route protection.
* **Payments:** No raw card data stored; use Tokenization.

### 4.3 UI/UX Standards
* **Mobile Responsiveness:** All layouts must be optimized for mobile (320px width minimum).
* **Feedback:** Use "Toast" notifications for actions (e.g., "Saved to Library," "Logged Out").
* **Empty States:** No empty screens; use placeholders (e.g., "No internships found—check back tomorrow!").

---

## 5. NEXT STEPS
1.  **Design Team:** Create low-fidelity wireframes based on this spec.
2.  **Dev Team:** Initialize database schema for Users, Chapters, and Resources.
3.  **Content Team:** Begin collation of School Logos and Executive Photos.
