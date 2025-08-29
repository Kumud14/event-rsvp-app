# 🎉 Event RSVP App

A simple web app where users can view upcoming events and RSVP with their attendance status. Built using **Next.js 15**, **Supabase**, and deployed on **Vercel**.

## 📦 Features

- View a list of all upcoming events
- RSVP to events (Yes / No / Maybe)
- Responsive UI with Tailwind CSS
- Data stored in Supabase PostgreSQL
- Deployed live on Vercel

## 🔗 Live Demo

🌐 [https://event-rsvp-app-tau.vercel.app](https://event-rsvp-app-tau.vercel.app)

📁 [GitHub Repository](https://github.com/Kumud14/event-rsvp-app)

---

## 🧠 Database Schema Design

The app uses a normalized relational schema consisting of 3 tables:

### 👤 `users`

| Column     | Type    | Notes              |
|------------|---------|--------------------|
| id         | uuid    | Primary key        |
| name       | text    |                    |
| email      | text    |                    |
| created_at | timestamp | Default: now()  |

### 📅 `events`

| Column     | Type    | Notes                         |
|------------|---------|-------------------------------|
| id         | uuid    | Primary key                   |
| title      | text    |                               |
| description| text    |                               |
| date       | date    |                               |
| city       | text    |                               |
| created_by | uuid    | Foreign key → `users.id`      |

### 📝 `rsvps`

| Column     | Type    | Notes                         |
|------------|---------|-------------------------------|
| id         | uuid    | Primary key                   |
| user_id    | uuid    | Foreign key → `users.id`      |
| event_id   | uuid    | Foreign key → `events.id`     |
| status     | text    | Enum: 'Yes' / 'No' / 'Maybe'  |

---

## 🔐 Constraints and Relationships

- All IDs are UUIDs for secure and unique identification
- `created_by` in `events` links to `users.id`
- `rsvps.user_id` and `rsvps.event_id` form relationships with `users` and `events`
- Referential integrity enforced using Supabase foreign keys
- Optional RLS policies can be enabled for secure access

---

## 🧪 Sample Data

- 👥 10 Users
- 📆 5 Events
- 📋 20 RSVPs

> Inserted manually via Supabase UI

---

## 🖼️ ER Diagram


<img width="1514" height="777" alt="image" src="https://github.com/user-attachments/assets/6877aecd-4e4d-4854-b3a1-147e7474ade5" />

---

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/)

---

## 🛠️ Getting Started (Local Setup)

```bash
git clone https://github.com/Kumud14/event-rsvp-app.git
cd event-rsvp-app
npm install


Add your own .env.local with the following:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key


Then run locally:

npm run dev
