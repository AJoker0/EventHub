# Event Manager

A full-stack event management app built with Next.js and Prisma.

## What is this?

Event Manager lets users create and manage events. You can register an account, login, create events, view other people's events, edit or delete your own events. Only the person who created an event can edit or delete it.

## Tech Stack

- **Next.js** - full-stack framework
- **TypeScript** - type safety
- **Prisma** - database ORM
- **SQLite** - local database
- **NextAuth.js** - authentication
- **bcryptjs** - password hashing
- **Tailwind CSS** - styling

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the root:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
```

3. Initialize database:
```bash
npx prisma migrate dev --name init
```

4. Start the dev server:
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## How It Works

### Pages

- `/register` - Create new account (email must be unique, password is hashed)
- `/login` - Sign in with email and password
- `/` - Home page (different content for logged-in users)
- `/events` - List of all events (requires login)
- `/events/create` - Create new event (requires login)
- `/events/[id]` - View event details, edit/delete if you created it
- `/events/[id]/edit` - Edit event (only if you're the creator)

### Database Schema

Two models:
- **User** - stores email, hashed password, and created events
- **Event** - stores event data (title, description, date, venue, ticket price) with a reference to the creator

Only the user who created an event can edit or delete it.

### Authentication

- User registers with email and password
- Password is hashed with bcryptjs before saving
- NextAuth.js handles login sessions
- Protected routes check if user is logged in
- Edit/Delete endpoints verify the user owns the event

## Project Structure

```
src/
├── app/
│   ├── api/              # API endpoints
│   ├── login/            # Login page
│   ├── register/         # Register page
│   ├── events/           # Events pages
│   └── page.tsx          # Home page
├── lib/
│   └── prisma.ts         # Prisma client
prisma/
├── schema.prisma         # Database schema
└── migrations/           # Migrations
```

## Useful Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Run production build
npx prisma studio       # Open Prisma Studio (view/edit DB)
npx prisma migrate reset # Reset database
```

## Notes

- SQLite is used for local development
- All passwords are hashed, never stored plain-text
- Users can only see events they created in full edit/delete mode
- Validation is done on both frontend and backend





Home
<img width="1245" height="762" alt="{AAEA96DB-8199-4100-BEAA-FABFC66B3317}" src="https://github.com/user-attachments/assets/13cf732b-63d3-486d-ad09-f03a724c9181" />
<img width="1246" height="780" alt="{403E4AC7-B28A-4DD0-A469-00B5B563D0D7}" src="https://github.com/user-attachments/assets/d58a1468-2aeb-4a79-8ec9-72ccb90c8531" />

login
<img width="1241" height="755" alt="{71F45A5C-FBB2-4282-AFDA-44E4BB85FC3D}" src="https://github.com/user-attachments/assets/8b9b62f0-9053-496e-b898-27f1b29e9978" />

register
<img width="1239" height="766" alt="{4FCE9C81-CBDB-4C31-A78F-08C3DA6B13F3}" src="https://github.com/user-attachments/assets/c26261e2-04ab-4697-a417-4497cc6203da" />

list
<img width="1242" height="760" alt="{4A8BAE0F-8111-489F-BA54-BB6BE64E034E}" src="https://github.com/user-attachments/assets/cd106f91-6c25-418b-88e6-688b90a1642c" />

create
<img width="1244" height="761" alt="{0098659F-399B-43AF-940B-8D849FFA2BD9}" src="https://github.com/user-attachments/assets/17ae02a0-233e-4b9a-94b0-60b16efa2a8a" />

details
<img width="1244" height="763" alt="{9E549561-07EC-44A6-A26E-52625EC3E600}" src="https://github.com/user-attachments/assets/ce08d2b6-3fd4-4c9c-8983-0e996a3c8d83" />

Stakeholders
<img width="1246" height="762" alt="{1F254206-306E-4E0A-941C-0B6230A4D218}" src="https://github.com/user-attachments/assets/92ded197-21fb-41fb-9d2d-e0e38c17e3ee" />


edit
<img width="1246" height="765" alt="{C34FC322-681F-4BEA-A1F2-BB6296425E92}" src="https://github.com/user-attachments/assets/85127217-6906-42ce-ba3b-1958ea4e2e51" />
