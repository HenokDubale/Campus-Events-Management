This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Campus Events Frontend

A responsive web application where students can discover campus events, view
event details and sessions, filter, sort, search and create new events.
It connects to an existing NestJS Campus Events API.

## Technologies Used

- Next.js (App Router)
- TypeScript
- React
- Native Fetch API
- CSS

## Installation

```bash
git clone <your-repository-url>
cd campus-events-frontend
npm install
```

## Backend URL Configuration

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TOKEN=test-token
```

Change the URL if your NestJS backend uses another port. The token is sent as
`Authorization: Bearer <token>` because the backend uses an auth guard.

## Start the Development Server

Start the NestJS backend first (port 3000), then:

```bash
npm run dev -- -p 3001
```

Open http://localhost:3001

## Main Features

- Home page with hero section and upcoming events
- All events page with category, location and status filters
- Sorting by date or title, ascending or descending
- Pagination using the API's page data
- Frontend title search
- Event details page with its sessions
- Session details page with related event information
- Create event form with validation and success message
- Loading, error, empty and not-found states
- Responsive layout for desktop, tablet and mobile

## Project Structure

```
src/
  app/          pages (home, events, events/[id], create-event)
  components/   reusable UI components
  services/     eventService.ts (Fetch API calls)
  types/        TypeScript interfaces
```
