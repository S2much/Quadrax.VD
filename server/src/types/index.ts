export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organization?: string;
  role: 'admin' | 'user' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

export interface Workstation {
  id: string;
  name: string;
  description: string;
  function: string;
  nature: string[];
  status: 'creating' | 'running' | 'stopped' | 'error';
  resources: {
    cpu: number;
    memory: number;
    storage: number;
    gpu?: boolean;
  };
  containerId?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataKit {
  id: string;
  name: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  filePath: string;
  schema?: any;
  qualityScore?: number;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  type: 'classification' | 'regression' | 'nlp' | 'computer_vision' | 'custom';
  framework: 'tensorflow' | 'pytorch' | 'scikit-learn' | 'custom';
  status: 'training' | 'trained' | 'deployed' | 'failed';
  accuracy?: number;
  metrics?: any;
  modelPath?: string;
  endpointUrl?: string;
  userId: string;
  workstationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  config: any;
  status: 'idle' | 'running' | 'completed' | 'failed';
  schedule?: string;
  lastRun?: Date;
  nextRun?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeSheet {
  id: string;
  name: string;
  description: string;
  content: any;
  language: 'python' | 'r' | 'sql' | 'javascript';
  status: 'idle' | 'running' | 'completed' | 'error';
  userId: string;
  workstationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VirtualMachine {
  id: string;
  name: string;
  description: string;
  image: string;
  status: 'creating' | 'running' | 'stopped' | 'error';
  resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
  containerId?: string;
  ports: number[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  userId: string;
  sessionId: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}