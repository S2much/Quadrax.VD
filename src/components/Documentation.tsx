import { useState } from 'react';
import { BookOpen, Code, FileText, Lightbulb, Download, Search, Tag, Clock, User, Star, ChevronRight, Copy, ExternalLink } from 'lucide-react';

function Documentation() {
  const [selectedCategory, setSelectedCategory] = useState<string>('getting-started');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: Lightbulb,
      description: 'Quick start guides and basic concepts'
    },
    {
      id: 'api-reference',
      name: 'API Reference',
      icon: Code,
      description: 'Complete API documentation and examples'
    },
    {
      id: 'tutorials',
      name: 'Tutorials',
      icon: BookOpen,
      description: 'Step-by-step guides and walkthroughs'
    },
    {
      id: 'templates',
      name: 'Templates',
      icon: FileText,
      description: 'Ready-to-use code templates and snippets'
    }
  ];

  const documentation = {
    'getting-started': [
      {
        id: 1,
        title: 'Introduction to QUADRAX•ML',
        description: 'Learn the fundamentals of our machine learning platform and its core capabilities.',
        content: `QUADRAX•ML is a comprehensive platform designed to simplify data science computation and machine learning model training, integrated with AI and automation capabilities.

## Key Features
- **Workshops**: Organize projects with dedicated workspaces
- **Datakits**: Manage and explore datasets efficiently
- **Codesheets**: Interactive notebooks for analysis
- **Models**: Deploy and manage ML models
- **Pipelines**: Automate ML workflows
- **Virtual Machines**: Scalable compute resources

## Getting Started
1. Create a new workshop
2. Upload your dataset to Datakits
3. Use Codesheets for data exploration
4. Train models using our templates
5. Deploy via automated pipelines`,
        tags: ['basics', 'overview', 'platform'],
        lastUpdated: '2 days ago',
        author: 'QUADRAX Team',
        readTime: '5 min'
      },
      {
        id: 2,
        title: 'Platform Architecture',
        description: 'Understanding the core architecture and components of QUADRAX•ML.',
        content: `## System Architecture

QUADRAX•ML follows a modular architecture designed for scalability and flexibility:

### Core Components
- **Data Layer**: Secure data storage and management
- **Compute Layer**: Distributed processing and ML training
- **API Layer**: RESTful APIs for all platform interactions
- **UI Layer**: Intuitive web interface

### Integration Points
- External data sources
- Third-party ML frameworks
- Cloud providers
- CI/CD systems`,
        tags: ['architecture', 'system', 'components'],
        lastUpdated: '1 week ago',
        author: 'Engineering Team',
        readTime: '8 min'
      }
    ],
    'api-reference': [
      {
        id: 3,
        title: 'Authentication API',
        description: 'Secure authentication and authorization endpoints.',
        content: `## Authentication

All API requests require authentication using API keys or OAuth tokens.

### API Key Authentication
\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.quadrax-ml.com/v1/models
\`\`\`

### OAuth 2.0 Flow
\`\`\`javascript
const response = await fetch('/oauth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    grant_type: 'client_credentials',
    client_id: 'your_client_id',
    client_secret: 'your_client_secret'
  })
});
\`\`\``,
        tags: ['api', 'authentication', 'security'],
        lastUpdated: '3 days ago',
        author: 'API Team',
        readTime: '6 min'
      },
      {
        id: 4,
        title: 'Models API',
        description: 'Complete reference for model management and inference APIs.',
        content: `## Models API

### List Models
\`\`\`bash
GET /api/v1/models
\`\`\`

### Deploy Model
\`\`\`bash
POST /api/v1/models/{model_id}/deploy
Content-Type: application/json

{
  "environment": "production",
  "scaling": {
    "min_instances": 1,
    "max_instances": 10
  }
}
\`\`\`

### Model Inference
\`\`\`bash
POST /api/v1/models/{model_id}/predict
Content-Type: application/json

{
  "inputs": {
    "text": "Sample input text",
    "parameters": {
      "temperature": 0.7
    }
  }
}
\`\`\``,
        tags: ['api', 'models', 'inference'],
        lastUpdated: '1 day ago',
        author: 'ML Team',
        readTime: '10 min'
      }
    ],
    'tutorials': [
      {
        id: 5,
        title: 'Building Your First ML Pipeline',
        description: 'Step-by-step tutorial for creating an end-to-end machine learning pipeline.',
        content: `## Building Your First ML Pipeline

This tutorial will guide you through creating a complete machine learning pipeline from data ingestion to model deployment.

### Prerequisites
- QUADRAX•ML account
- Basic understanding of machine learning
- Sample dataset (we'll provide one)

### Step 1: Data Preparation
1. Navigate to Datakits
2. Upload your dataset
3. Explore data quality metrics
4. Apply data cleaning transformations

### Step 2: Model Training
1. Create a new Codesheet
2. Load your prepared dataset
3. Choose appropriate algorithms
4. Train and validate your model

### Step 3: Pipeline Creation
1. Go to Pipelines section
2. Create new pipeline
3. Configure data processing steps
4. Add model training stage
5. Set up automated deployment

### Step 4: Deployment
1. Configure deployment environment
2. Set scaling parameters
3. Deploy your model
4. Monitor performance metrics`,
        tags: ['tutorial', 'pipeline', 'ml', 'deployment'],
        lastUpdated: '5 days ago',
        author: 'Tutorial Team',
        readTime: '25 min'
      }
    ],
    'templates': [
      {
        id: 6,
        title: 'Classification Model Template',
        description: 'Ready-to-use template for binary and multi-class classification problems.',
        content: `## Classification Model Template

### Python Code Template
\`\`\`python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Load data
data = pd.read_csv('your_dataset.csv')
X = data.drop('target', axis=1)
y = data['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
print(classification_report(y_test, predictions))
\`\`\`

### Configuration Template
\`\`\`yaml
model:
  type: classification
  algorithm: random_forest
  parameters:
    n_estimators: 100
    max_depth: 10
    random_state: 42
  
training:
  test_size: 0.2
  validation_split: 0.1
  
deployment:
  environment: production
  scaling:
    min_instances: 1
    max_instances: 5
\`\`\``,
        tags: ['template', 'classification', 'python', 'sklearn'],
        lastUpdated: '1 week ago',
        author: 'ML Templates',
        readTime: '12 min'
      }
    ]
  };

  const currentDocs = documentation[selectedCategory as keyof typeof documentation] || [];

  const filteredDocs = currentDocs.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="p-6 min-h-screen">
      <div className="text-white mb-6">
        <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-black/30 p-4 rounded-lg">
          Documentation
        </h2>
        <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-80 bg-black/80 backdrop-blur-sm rounded-lg p-4">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef]"
              />
            </div>
          </div>

          <nav className="space-y-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                    selectedCategory === category.id
                      ? 'bg-[#00699a] text-white'
                      : 'text-gray-300 hover:bg-[#005778] hover:text-white'
                  }`}
                >
                  <IconComponent size={20} />
                  <div className="flex-1">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs opacity-75">{category.description}</div>
                  </div>
                  <ChevronRight size={16} />
                </button>
              );
            })}
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-b from-[#005778] to-black rounded-lg border border-[#00699a]">
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-[#00beef] hover:text-white transition-colors duration-300">
                API Status
              </a>
              <a href="#" className="block text-[#00beef] hover:text-white transition-colors duration-300">
                Community Forum
              </a>
              <a href="#" className="block text-[#00beef] hover:text-white transition-colors duration-300">
                Support Center
              </a>
              <a href="#" className="block text-[#00beef] hover:text-white transition-colors duration-300">
                GitHub Repository
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h3>
              <p className="text-gray-300">
                {categories.find(c => c.id === selectedCategory)?.description}
              </p>
            </div>

            <div className="space-y-6">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30 hover:border-[#00699a] transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        {doc.title}
                        <ExternalLink size={16} className="text-gray-400" />
                      </h4>
                      <p className="text-gray-300 mb-3">{doc.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {doc.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {doc.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} />
                          Updated {doc.lastUpdated}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-[#00699a]/30 text-[#00beef] rounded-full flex items-center gap-1"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded transition-colors duration-300">
                        <Copy size={16} />
                      </button>
                      <button className="p-2 bg-black/50 hover:bg-[#005778] text-white rounded border border-[#00699a] transition-colors duration-300">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-black/50 p-4 rounded-lg border border-[#00699a]/20">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                      {doc.content}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {filteredDocs.length === 0 && (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">No documentation found</h4>
                <p className="text-gray-300">Try adjusting your search terms or browse different categories.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Documentation;