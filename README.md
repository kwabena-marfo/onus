# Onus

A Bible study and scripture memorisation app. Users build their own list of verses to learn, test themselves with quizzes by book of the Bible, and track their scores over time.

**Live:** [onusbible.vercel.app](https://onusbible.vercel.app)

## What it does

- **My Onus Bible:** look up passages, add the verses you want to memorise, and keep them in one place
- **Quizzes:** test yourself on a book of the Bible or on your own verses; scores are saved so you can see progress
- **Saved:** bookmark passages to come back to
- **Admin:** create and manage the quizzes everyone can take
- **Accounts:** sign in with email or Google, with password reset by email

The same API also serves the Onus mobile app (Expo), which signs in through better-auth's Expo integration.

## How it's built

```
Next.js App Router pages ─► /api/[[...routes]] (one Hono app)
                               ├─ /verses   look up and save verses
                               ├─ /quizzes  book quizzes, user quizzes, scores
                               └─ /emails   transactional email
                             ─► Prisma ─► MongoDB
```

- One Hono API mounted on a single Next.js catch-all route, with a small router per feature
- Zod schemas shared by forms (React Hook Form) and the API
- better-auth for sessions on web and mobile
- TanStack Query and SWR for data fetching, shadcn/ui and Tailwind for the interface

| Model | Holds |
| --- | --- |
| `User`, `Session`, `Account`, `Verification`, `PasswordReset` | Auth |
| `Verse`, `Reference` | A user's saved verses and where they come from |
| `Quiz`, `QuizScore` | Quizzes and every attempt's score |

## Stack

Next.js 16 · TypeScript · Hono · Prisma · MongoDB · better-auth · Zod · TanStack Query · shadcn/ui · Tailwind CSS · Vercel

## Run it locally

```bash
npm install
# create .env with DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, NEXT_PUBLIC_HOST,
# GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRETE (Google sign-in), plus your SMTP settings
npx prisma db push
npm run dev
```

---

Built by [Collins Marfo](https://github.com/kwabena-marfo).
