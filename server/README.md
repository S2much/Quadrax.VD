# QUADRAX•ML Backend

A comprehensive backend API for the QUADRAX•ML machine learning platform.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Workstation Management**: Create and manage development environments
- **Dataset Management**: Upload, validate, and process datasets
- **Model Training & Deployment**: Train and deploy ML models
- **Pipeline Orchestration**: Automate ML workflows
- **Code Execution**: Interactive notebook-style code execution
- **Virtual Machine Management**: Manage containerized compute resources
- **AI Chat Integration**: Intelligent assistant for platform guidance
- **Real-time Updates**: WebSocket support for live updates

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM (in-memory for demo)
- **Cache**: Redis
- **Containers**: Docker for workstation/VM management
- **Real-time**: Socket.IO
- **Authentication**: JWT
- **File Upload**: Multer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### Prerequisites

- Node.js 18+
- Docker (for container management)
- PostgreSQL (for production)
- Redis (for caching)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Workstations
- `GET /api/workstations` - List user workstations
- `POST /api/workstations` - Create new workstation
- `POST /api/workstations/:id/start` - Start workstation
- `POST /api/workstations/:id/stop` - Stop workstation
- `DELETE /api/workstations/:id` - Delete workstation

### DataKits
- `GET /api/datakits` - List user datasets
- `POST /api/datakits/upload` - Upload new dataset
- `POST /api/datakits/:id/validate` - Validate dataset
- `POST /api/datakits/:id/transform` - Transform dataset
- `DELETE /api/datakits/:id` - Delete dataset

### Models
- `GET /api/models` - List user models
- `POST /api/models` - Create/train new model
- `POST /api/models/:id/deploy` - Deploy model
- `POST /api/models/:id/predict` - Make prediction
- `POST /api/models/:id/evaluate` - Evaluate model
- `DELETE /api/models/:id` - Delete model

### Pipelines
- `GET /api/pipelines` - List user pipelines
- `POST /api/pipelines` - Create new pipeline
- `POST /api/pipelines/:id/run` - Execute pipeline
- `POST /api/pipelines/:id/stop` - Stop pipeline
- `GET /api/pipelines/:id/logs` - Get pipeline logs
- `DELETE /api/pipelines/:id` - Delete pipeline

### Codesheets
- `GET /api/codesheets` - List user codesheets
- `POST /api/codesheets` - Create new codesheet
- `PUT /api/codesheets/:id` - Update codesheet content
- `POST /api/codesheets/:id/execute/:cellId` - Execute code cell
- `DELETE /api/codesheets/:id` - Delete codesheet

### Virtual Machines
- `GET /api/vms` - List user VMs
- `POST /api/vms` - Create new VM
- `POST /api/vms/:id/start` - Start VM
- `POST /api/vms/:id/stop` - Stop VM
- `GET /api/vms/:id/logs` - Get VM logs
- `DELETE /api/vms/:id` - Delete VM

### AI Assistant
- `GET /api/ai/chat/:sessionId` - Get chat history
- `POST /api/ai/chat` - Send message to AI
- `POST /api/ai/code-suggest` - Get code suggestions
- `POST /api/ai/analyze-dataset` - Analyze dataset with AI

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics

## Architecture

### Core Services

1. **Authentication Service**: Handles user registration, login, and JWT management
2. **Docker Service**: Manages container lifecycle for workstations and VMs
3. **Database Service**: Handles data persistence and migrations
4. **Redis Service**: Provides caching and session management
5. **Socket Service**: Manages real-time WebSocket connections

### Security Features

- JWT-based authentication
- Role-based access control
- Rate limiting
- Input validation and sanitization
- CORS protection
- Helmet security headers
- File upload restrictions

### Error Handling

- Centralized error handling middleware
- Structured error responses
- Logging and monitoring integration
- Graceful degradation

## Development

### Project Structure
```
server/
├── src/
│   ├── routes/          # API route handlers
│   ├── middleware/      # Express middleware
│   ├── services/        # Business logic services
│   ├── types/           # TypeScript type definitions
│   └── server.ts        # Main server file
├── uploads/             # File upload directory
├── dist/                # Compiled JavaScript
└── package.json
```

### Testing
```bash
npm test                 # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

### Linting
```bash
npm run lint            # Check code style
npm run lint:fix        # Fix linting issues
```

## Deployment

### Docker Deployment
```bash
# Build image
docker build -t quadrax-ml-backend .

# Run container
docker run -p 3001:3001 --env-file .env quadrax-ml-backend
```

### Production Considerations

1. **Database**: Set up PostgreSQL with proper indexing
2. **Redis**: Configure Redis for session storage and caching
3. **Docker**: Ensure Docker daemon is available for container management
4. **Monitoring**: Set up logging and monitoring (Sentry, DataDog, etc.)
5. **Security**: Use proper secrets management
6. **Scaling**: Consider load balancing and horizontal scaling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details