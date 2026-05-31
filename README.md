# Genz Portfolio

A futuristic personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

The site has two main experiences:
- A software-focused portfolio with hero, skills, projects, education, resume, and contact sections.
- A creative-focused portfolio with hero, videos, designs, creative skills, and collaboration sections.

It also includes a protected admin area for editing the site content.

## Tech Stack

- Frontend: React 18
- Bundler: Vite
- Styling: Tailwind CSS + PostCSS
- Motion: Framer Motion
- Backend: Express for admin auth/session handling
- Session/Auth: httpOnly cookie with JWT

## Project Features

- Dual portfolio modes:
  - `software`
  - `creative`
- Smooth section navigation with active section tracking
- Animated hero and content reveals
- Resume download support
- Local content editor for updating site text and lists
- Admin-only top navigation option
- Server-backed admin login and session check
- Admin content credential updates with session invalidation

## Main Sections

### Software Portfolio

- Hero section
- Skills
- Projects
- Education
- Resume
- Contact

### Creative Portfolio

- Hero section
- Videos
- Designs
- Creative skills
- Collaboration

### Admin Area

- Admin login screen
- Content editor
- Simple editor and JSON editor
- Forgot-password flow UI
- Credential update flow
- Logout and session timeout handling

## Admin Login Details

These are the current default fallback credentials used by the local server if you have not overridden them with environment variables or changed them through the admin screen:

- Username: `admin`
- Password: `admin123`
- Email: `harshalpimpare99@gmail.com`

You can override the defaults with these environment variables:

- `VITE_ADMIN_USERNAME`
- `VITE_ADMIN_PASSWORD`
- `VITE_ADMIN_EMAIL`
- `ADMIN_JWT_SECRET` or `JWT_SECRET`

Important:
- The admin option is hidden from non-admin users in the UI.
- Real admin access is enforced by the server session, not just by hiding the button.
- The admin dashboard is available at `/admin`.

## Project Structure

- `src/main.jsx` - App entry point
- `src/App.jsx` - Top-level app state, routing, admin session handling, and layout
- `src/components/` - Shared UI components such as the navbar, loading screen, and admin panel
- `src/sections/` - Page sections for both portfolio modes
- `src/data/` - Site content data for projects, skills, education, designs, and videos
- `src/hooks/` - Shared hooks such as local storage state
- `src/resumes/` - Resume asset used for download
- `server.js` - Express server for auth/session and production serving
- `auth-core.js` - Shared auth helpers used by both dev and production

## How the Site Works

- The landing page switches between `software` and `creative` tabs.
- Section highlighting is driven by `IntersectionObserver`.
- Site content is stored in browser `localStorage` so edits persist in the current browser.
- Admin authentication is handled with a server-issued cookie.
- The top admin option only appears after a valid admin session is detected.
- The admin dashboard reads the current admin profile from the server.

## Admin Flow

1. Open the site.
2. Navigate to `/admin`.
3. Log in with the admin credentials.
4. Access the dashboard and edit content.
5. Save changes to keep them in local browser storage.
6. Log out to end the admin session.

## Content Editing

The admin panel supports:

- Simple form-based editing
- Raw JSON editing
- Exporting the current content as JSON
- Resetting content back to defaults

The editable content includes:

- Brand name and tag
- Software hero copy and stats
- Creative hero copy and stats
- Section headings
- Software skills
- Creative skills
- Projects
- Designs
- Videos
- Education items
- Contact links
- Resume text
- Collaboration text

## Setup

### Prerequisites

- Node.js 16+ recommended
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the Vite frontend and the local admin auth server together.

### Build

```bash
npm run build
```

### Production Start

```bash
npm start
```

This serves the built app and the admin auth endpoints from the Express server.

### Preview the Built Frontend

```bash
npm run preview
```

## Admin Routes and API

- `/admin` - Admin login and dashboard entry
- `/api/admin/meta` - Returns the current admin display name and email
- `/api/me` - Returns the authenticated admin session
- `/api/login` - Creates the admin session cookie
- `/api/logout` - Clears the admin session cookie
- `/api/admin/credentials` - Updates admin credentials and invalidates the existing session

## Deployment Notes

- For a full deployment, build the app and run the Express server:
  - `npm run build`
  - `npm start`
- If you deploy only the static `dist/` folder, the UI will still render, but the server-backed admin session will not be available unless the Express server is deployed too.
- The `dist/` folder is created by the build command.

## Development Notes

- The Vite dev server includes local admin API middleware so you can test the admin flow without a separate backend process.
- The admin session uses an httpOnly cookie.
- The admin credentials are versioned so changing them invalidates old sessions.
- The admin option is intentionally not visible to non-admin users.

## Useful Files

- [src/App.jsx](src/App.jsx)
- [src/components/Navbar.jsx](src/components/Navbar.jsx)
- [src/components/AdminPanel.jsx](src/components/AdminPanel.jsx)
- [server.js](server.js)
- [auth-core.js](auth-core.js)
- [vite.config.js](vite.config.js)

## License

No license has been specified for this project.
