<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-5.10-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</p>

<h1 align="center">💬 Feedback Pulse</h1>

<p align="center">
  <strong>The simplest way to collect, analyze, and act on user feedback.</strong>
</p>

<p align="center">
  <a href="https://feedback-pulse.vercel.app">🌐 Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-widget-integration">Widget Integration</a>
</p>

---

## ✨ Features

- **🚀 Easy Integration** — Add a lightweight feedback widget to any website with a single script tag
- **🤖 AI-Powered Insights** — Automatic sentiment analysis using Google's Gemini AI
- **📊 Dashboard Analytics** — Beautiful dashboard to view and manage all feedback
- **🏷️ Smart Categorization** — Organize feedback by type: Bug Reports, Feature Requests, or General
- **🔒 Secure Authentication** — Built-in authentication with NextAuth.js
- **🌙 Dark Mode** — Full dark mode support for comfortable viewing
- **📱 Responsive Design** — Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **AI** | [Google Gemini AI](https://ai.google.dev/) |
| **Validation** | [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (or use [Neon](https://neon.tech/), [Supabase](https://supabase.com/), etc.)
- Google Gemini API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Blazeiscoding/feedback-pulse.git
   cd feedback-pulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/feedbackpulse"
   NEXTAUTH_SECRET="your-super-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Initialize the database**
   ```bash
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app!

## 📦 Widget Integration

After creating a project in the dashboard, you'll receive a unique project key. Add the feedback widget to your website with a single line of code:

```html
<script 
  src="https://feedback-pulse.vercel.app/widget.js" 
  data-project="YOUR_PROJECT_KEY">
</script>
```

That's it! A feedback button will appear in the bottom-right corner of your website.

### Widget Features

- 🎨 Clean, minimal design that blends with any website
- 📝 Three feedback types: Bug Report, Feature Request, Other
- ✉️ Optional email collection
- 📍 Automatic metadata capture (URL, browser info)
- ✅ Success confirmation animation

## 📁 Project Structure

```
feedback-pulse/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── widget.js              # Embeddable feedback widget
├── src/
│   ├── app/
│   │   ├── (auth)/            # Authentication pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── feedback/      # Feedback CRUD + AI analysis
│   │   │   └── projects/      # Project management
│   │   ├── dashboard/         # Dashboard page
│   │   ├── projects/          # Project detail pages
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   ├── lib/                   # Utilities (auth, prisma, etc.)
│   └── types/                 # TypeScript types
└── package.json
```

## 🗄️ Database Schema

```mermaid
erDiagram
    User ||--o{ Project : owns
    Project ||--o{ Feedback : receives
    Feedback ||--o{ FeedbackLabel : has
    
    User {
        string id PK
        string email UK
        string password
        string name
        datetime createdAt
    }
    
    Project {
        string id PK
        string name
        string projectKey UK
        string userId FK
        datetime createdAt
    }
    
    Feedback {
        string id PK
        string projectId FK
        enum type
        string message
        string email
        enum sentiment
        json metadata
        datetime createdAt
    }
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Create a new user account |
| `GET` | `/api/projects` | List all user projects |
| `POST` | `/api/projects` | Create a new project |
| `POST` | `/api/feedback` | Submit feedback (public, used by widget) |
| `GET` | `/api/feedback/[id]` | Get feedback for a project |
| `POST` | `/api/feedback/[id]/analyze` | Analyze feedback sentiment with AI |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Blazeiscoding">Nikhil Rathore</a>
</p>

<p align="center">
  <a href="https://feedback-pulse.vercel.app">
    <img src="https://img.shields.io/badge/Try_it_Live-feedback--pulse.vercel.app-blue?style=for-the-badge" alt="Live Demo" />
  </a>
</p>
