# Professional AI Portfolio Website

A dynamic, high-performance portfolio website built with **Next.js 16**, **Firebase**, and **Gemini AI**. It features a fully functional Admin Dashboard for managing projects and messages, along with AI-powered content generation.

## 🚀 Features

- **Dynamic Project Showcase**: Fetch and display projects in real-time from Firestore.
- **Admin Dashboard**: Secure /admin route to manage content.
  - **Create, Read, Update, Delete (CRUD)** projects.
  - **Messages Tab**: View and manage inquiries sent from the contact form.
  - **AI Auto-Fill**: Use Google Gemini AI to automatically generate project titles, descriptions, and tech stacks from raw text.
- **Real-time Updates**: Changes in the admin panel reflect instantly on the live site.
- **Image Upload**: Integrated with Firebase Storage for project screenshots.
- **Contact System**: Visitors can send messages directly to your dashboard.
- **Responsive Design**: Mobile-first, glassmorphism UI using Tailwind CSS.
- **SEO Optimized**: Built with Next.js specific SEO practices.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend / Database**: Firebase (Firestore & Storage)
- **Authentication**: Firebase Auth
- **AI Integration**: Google Gemini API
- **Icons**: Heroicons / Custom SVG Components

## ⚙️ Environment Setup

Create a `.env.local` file in the root directory and add the following keys:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Gemini AI (Optional, for Auto-Fill)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

## 📦 Installation & Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🔒 Security Rules

This project uses **Firestore Security Rules** to ensure data safety:
- **Public**: Everyone can view projects and create messages.
- **Admin Only**: Only authenticated users can manage projects and read/delete messages.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
