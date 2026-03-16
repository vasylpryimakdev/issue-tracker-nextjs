# 🐞 Issue Tracker

A modern and responsive React application for discovering video games using the RAWG API.

Game Hub allows users to browse games, filter them by platform and release date, and explore detailed information in a clean and intuitive UI.

---

## 🚀 Live Demo

🔗 **Play the app here:**  
https://issue-tracker-livid-zeta.vercel.app/

---

## 🚀 Features

- 🐞 Create, edit and delete issues
- 📝 Markdown support for issue descriptions
- 🔐 Authentication with NextAuth
- 📊 Dashboard with issue statistics
- 📈 Charts for issue status overview
- ✔️ Form validation with Zod
- ⚡ Fast data fetching with React Query
- 🔔 Toast notifications
- 💀 Skeleton loading states
- 📱 Responsive UI

---

## 🛠 Tech Stack

### Frontend

- **▲ Next.js 13 (App Router)**
- **🔷 TypeScript**
- **⚛️ React**

### State & Data

- **🔄 React Query (TanStack Query) – server state management**
- **🐻 Zustand – global UI state**

### UI

- **🎨 Tailwind CSS**
- **Radix UI**
- **React Icons**

### Forms & Validation

- **React Hook Form**
- **Zod**

### Backend

- **Next.js API Routes**
- **Prisma ORM**

### Database

- **PostgreSQL / MySQL**

### Authentication

- **NextAuth.js**

### Data Fetching

- **TanStack React Query**
- **Axios**

### Visualization

- **Recharts**

---

## 📊 Application Pages

### Dashboard

Displays a summary of issue statuses with charts.

#### Includes:

- issue statistics
- status overview
- interactive charts

### Issues Page

Manage and browse all issues.

#### Features:

- create issues
- edit issues
- delete issues
- view issue details

### Issue Details

Detailed page for a selected issue.

#### Includes:

- issue description (Markdown)
- issue status
- creation information

---

## 📂 Project Structure

```
app
│
├── api               # API routes
├── auth              # Authentication logic
├── components        # Reusable UI components
├── issues            # Issue pages
│
├── layout.tsx        # Root layout
├── page.tsx          # Dashboard page
├── NavBar.tsx        # Navigation bar
├── IssueChart.tsx    # Chart component
├── IssueSummary.tsx  # Dashboard summary
├── QueryClientProvider.tsx
└── validationSchemas.ts

prisma
├── schema.prisma     # Database schema
└── client.ts         # Prisma client
```

---

## 🧠 Key Concepts

### Next.js App Router

Uses the Next.js 13 routing system with:

- server components
- client components
- nested layouts
- API routes

### Prisma ORM

Prisma is used for:

- database schema definition
- querying the database
- type-safe database access

### React Query

Used for server state management:

- fetching data
- caching
- background refetching
- mutation handling

### Form Validation

- Forms are built using:
- React Hook Form
- Zod schema validation

This provides type-safe form validation.

---

## 🎨 UI Features

- Clean modern UI
- Responsive layout
- Skeleton loading states
- Toast notifications
- Markdown editor for issue descriptions
- Charts for analytics

---

## ⚡ Performance Optimizations

- Server Components (Next.js)
- React Query caching
- Skeleton loaders during fetch
- Optimized API calls

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/vasylpryimakdev/issue-tracker.git
cd issue-tracker
```

### Install dependencies:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### The app will be available at

```bash
http://localhost:3000
```

## 🔑 Environment Variables

### Create a .env file in the root directory:

```ts
DATABASE_URL = your_database_url_here;
NEXTAUTH_URL = your_nextauth_url_here;
NEXTAUTH_SECRET = your_nextauth_secret_here;
GOOGLE_CLIENT_ID = your_google_client_id_here;
GOOGLE_CLIENT_SECRET = your_google_client_secret_here;
```

## 👨‍💻 Author

GitHub: https://github.com/vasylpryimakdev
LinkedIn: https://www.linkedin.com/in/vasyl-pryimak-64a204384
