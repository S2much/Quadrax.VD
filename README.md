# QUADRAX•ML Platform

A comprehensive machine learning platform with AI-powered assistance, workstation management, and manufacturing capabilities.

## 🚀 Features

- **Workshop**: Create and manage development workstations
- **DataKits**: Upload, validate, and process datasets
- **Codesheets**: Interactive development environments
- **Manufacturing**: Fine-tuning playground with feedback systems
- **Models**: Deploy and monitor ML models
- **AI Assistant**: Intelligent help and automation

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage

## 📦 Setup

### Prerequisites

- Node.js 18+
- Supabase CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quadrax-ml
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   ```bash
   # Install Supabase CLI
   npm install -g @supabase/cli

   # Login to Supabase
   supabase login

   # Initialize Supabase (if not already done)
   supabase init

   # Start local development
   supabase start
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase project details
   ```

5. **Run database migrations**
   ```bash
   supabase db reset
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

The platform uses the following main tables:

- **profiles**: User profiles and settings
- **workstations**: Development environments
- **datakits**: Dataset management
- **models**: ML model tracking
- **pipelines**: Workflow automation
- **user_sessions**: Activity tracking

## 🔧 Supabase Configuration

### Local Development

```bash
# Start Supabase services
supabase start

# View Supabase dashboard
supabase status
```

### Database Migrations

```bash
# Create new migration
supabase migration new migration_name

# Apply migrations
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > src/types/supabase.ts
```

### Edge Functions

```bash
# Deploy edge functions
supabase functions deploy workstation-manager
supabase functions deploy ai-assistant

# Test functions locally
supabase functions serve
```

## 🔐 Authentication

The platform uses Supabase Auth with:

- Email/password authentication
- Row Level Security (RLS)
- Automatic profile creation
- Role-based access control

### Demo Account

- **Email**: drax123@example.com
- **Password**: @Pwd123456

## 🚀 Deployment

### Frontend Deployment

```bash
# Build for production
npm run build

# Deploy to your preferred platform
# (Vercel, Netlify, etc.)
```

### Supabase Deployment

```bash
# Link to remote project
supabase link --project-ref your-project-ref

# Deploy migrations
supabase db push

# Deploy edge functions
supabase functions deploy
```

## 📊 Features Overview

### Workshop
- Create development workstations
- Configure resources (CPU, memory, storage)
- Start/stop workstation lifecycle
- Terminal and code editor integration

### DataKits
- Upload datasets in various formats
- Data validation and quality scoring
- Data transformation pipelines
- Export processed data

### Manufacturing
- Drag-and-drop workflow builder
- Fine-tuning with feedback systems
- Star ratings and text reviews
- Performance metrics tracking

### AI Assistant
- Natural language interaction
- Context-aware responses
- Voice commands support
- Code generation capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

Built with ❤️ by the QUADRAX•ML team