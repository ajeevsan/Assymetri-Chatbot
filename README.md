# Complete Setup Guide - Chatbot HTML Generator

## Prerequisites

Before starting, ensure you have these installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

## Step 1: Clone and Install

### Clone the Repository
```bash
git clone https://github.com/ajeevsan/Assymetri-Chatbot.git
cd Assymetri-Chatbot
```

### Install Dependencies
```bash
npm install
```

This will install all dependencies from your package.json including:
- Next.js 15.3.3
- React 19
- Prisma & Prisma Client
- NextAuth.js
- OpenAI SDK
- Tailwind CSS
- All UI components (Radix UI, Lucide React)

## Step 2: Environment Variables Setup

Create a `.env.local` file in your project root:

```bash
touch .env.local
```

Add these environment variables:

```env
# Database Configuration
DATABASE_URL="your_database_connection_string"
DIRECT_URL="your_direct_database_url" # Optional: for connection pooling

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_random_secret_here"

# OpenAI Configuration
OPENAI_API_KEY="your_openai_api_key"

# Prisma Accelerate (Optional)
PRISMA_ACCELERATE_URL="your_accelerate_connection_string"
```

## Step 3: Database Setup

### Option A: Local PostgreSQL

1. **Install PostgreSQL** locally
2. **Create a database**:
   ```sql
   createdb chatbot_db
   ```
3. **Set DATABASE_URL**:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/chatbot_db"
   ```

### Option B: Cloud Database (Recommended)

#### Using Supabase (Free tier available):
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your connection string from Settings → Database
4. Use the connection string in your `.env.local`

#### Using PlanetScale:
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get connection strings for development and production
4. Add to your environment variables

#### Using Vercel Postgres:
1. Go to your Vercel project dashboard
2. Navigate to Storage → Create Database → Postgres
3. Copy the provided connection strings

## Step 4: Database Schema & Migration

### Initialize Prisma
```bash
npx prisma generate
```

### Push Schema to Database
```bash
npx prisma db push
```

### View Database (Optional)
```bash
npx prisma studio
```
This opens a web interface to view/edit your database at `http://localhost:5555`

## Step 5: Authentication Setup

### Generate NextAuth Secret
```bash
openssl rand -base64 32
```
Add the output to your `NEXTAUTH_SECRET` in `.env.local`

### OAuth Providers Setup (Optional)

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to your `.env.local`

#### GitHub OAuth:
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to your `.env.local`

## Step 6: OpenAI API Setup

1. **Create OpenAI Account**: Go to [platform.openai.com](https://platform.openai.com)
2. **Generate API Key**: 
   - Navigate to API Keys section
   - Create new secret key
   - Copy and add to `OPENAI_API_KEY` in `.env.local`
3. **Add Billing**: Ensure you have credits/billing set up for API usage

## Step 7: Development Server

### Start the Development Server
```bash
npm run dev
```

Your application will be available at:
- **Main App**: `http://localhost:3000`
- **Prisma Studio**: `http://localhost:5555` (if running)

## Step 8: Verify Setup

### Check These URLs:
1. **Home Page**: `http://localhost:3000` (should redirect to login)
2. **Login Page**: `http://localhost:3000/login`
3. **API Health**: `http://localhost:3000/api/auth/providers`

### Test Authentication:
1. Try signing up/logging in
2. Check if user data appears in your database
3. Verify JWT tokens are working

### Test Chatbot:
1. Log in successfully
2. Navigate to chat interface
3. Send a test message
4. Verify OpenAI API responses

## Step 9: Project Structure Understanding

```
your-project/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── auth/          # NextAuth configuration
│   ├── login/             # Login page
│   └── page.tsx           # Root page (redirects to login)
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema file
├── public/               # Static assets
├── .env.local            # Environment variables (local)
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## Step 10: Common Scripts

```bash
# Development
npm run dev                 # Start development server with Turbopack

# Building
npm run build              # Build for production
npm run start              # Start production server

# Database
npx prisma generate        # Generate Prisma client
npx prisma db push         # Push schema to database
npx prisma studio          # Open database browser
npx prisma db seed         # Run seed file (if you create one)

# Code Quality
npm run lint               # Run ESLint
```

## Troubleshooting Common Issues

### Database Connection Issues
```bash
# Test your database connection
npx prisma db push
```
If this fails, check your `DATABASE_URL` format.

### NextAuth Issues
- Ensure `NEXTAUTH_URL` matches your development URL
- `NEXTAUTH_SECRET` must be set
- OAuth redirect URIs must match exactly

### OpenAI API Issues
- Verify API key is correct
- Check your OpenAI account has credits
- Ensure API key has proper permissions

### Prisma Issues
```bash
# Reset database (careful - deletes data!)
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

## Environment-Specific Setup

### Development (.env.local)
```env
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="your_local_or_dev_database_url"
```

### Production (Vercel Environment Variables)
```env
NEXTAUTH_URL="https://your-app-name.vercel.app"
DATABASE_URL="your_production_database_url"
```

## Next Steps After Setup

1. **Customize the UI** - Modify components in `/components`
2. **Configure Chat Features** - Set up your chatbot logic
3. **Add Database Models** - Extend `/prisma/schema.prisma` as needed
4. **Deploy to Production** - Follow the Vercel deployment guide
5. **Set up Monitoring** - Add error tracking and analytics

## Verification Checklist

- [ ] Dependencies installed successfully
- [ ] Environment variables configured
- [ ] Database connected and schema applied
- [ ] Authentication working (login/logout)
- [ ] OpenAI API responding
- [ ] Development server running without errors
- [ ] Can create and view database records
- [ ] All required pages accessible

Your chatbot application should now be fully set up and ready for development!