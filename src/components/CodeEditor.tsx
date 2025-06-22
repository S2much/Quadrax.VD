import { useState, useRef, useEffect } from 'react';
import { X, Save, Download, Upload, Play, Settings, FileText, Folder, Search, Copy, Undo, Redo, Code, Terminal, Zap, Brain, Database } from 'lucide-react';

interface CodeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  
  context: string;
  workingDirectory?: string;
}

interface FileTab {
  id: string;
  name: string;
  content: string;
  language: string;
  modified: boolean;
}

function CodeEditor({ isOpen, onClose, context, workingDirectory = '~' }: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<string>('');
  const [tabs, setTabs] = useState<FileTab[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Enhanced sample files based on context with ML/AI focus
  const getContextFiles = () => {
    switch (context) {
      case 'workshop':
        return [
          { 
            name: 'main.py', 
            language: 'python', 
            content: `# QUADRAX ML Workshop - Enhanced Training Environment
import tensorflow as tf
import torch
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# GPU Configuration
print("TensorFlow version:", tf.__version__)
print("PyTorch version:", torch.__version__)
print("GPU available (TF):", tf.config.list_physical_devices('GPU'))
print("GPU available (PyTorch):", torch.cuda.is_available())

# Initialize enhanced ML environment
class QuadraxMLWorkshop:
    def __init__(self):
        self.models = {}
        self.datasets = {}
        self.experiments = []
        
    def load_dataset(self, name, path):
        """Load and validate dataset"""
        try:
            if path.endswith('.csv'):
                df = pd.read_csv(path)
            elif path.endswith('.json'):
                df = pd.read_json(path)
            else:
                raise ValueError("Unsupported file format")
                
            self.datasets[name] = df
            print(f"Dataset '{name}' loaded successfully: {df.shape}")
            return df
        except Exception as e:
            print(f"Error loading dataset: {e}")
            
    def create_model(self, name, model_type='tensorflow'):
        """Create ML model with specified framework"""
        if model_type == 'tensorflow':
            model = tf.keras.Sequential([
                tf.keras.layers.Dense(128, activation='relu'),
                tf.keras.layers.Dropout(0.2),
                tf.keras.layers.Dense(64, activation='relu'),
                tf.keras.layers.Dense(10, activation='softmax')
            ])
            model.compile(
                optimizer='adam',
                loss='sparse_categorical_crossentropy',
                metrics=['accuracy']
            )
        elif model_type == 'pytorch':
            import torch.nn as nn
            model = nn.Sequential(
                nn.Linear(784, 128),
                nn.ReLU(),
                nn.Dropout(0.2),
                nn.Linear(128, 64),
                nn.ReLU(),
                nn.Linear(64, 10),
                nn.Softmax(dim=1)
            )
        
        self.models[name] = model
        print(f"Model '{name}' created using {model_type}")
        return model

# Initialize workshop environment
workshop = QuadraxMLWorkshop()
print("🚀 QUADRAX ML Workshop environment ready!")
print("Available commands:")
print("- workshop.load_dataset(name, path)")
print("- workshop.create_model(name, framework)")
print("- Use GPU acceleration for training")` 
          },
          { 
            name: 'config.yaml', 
            language: 'yaml', 
            content: `# QUADRAX ML Workshop Configuration
workspace:
  name: quadrax-ml-workshop-v2
  version: "2.1.0"
  description: "Enhanced ML development environment"
  
resources:
  cpu:
    cores: 16
    architecture: "x86_64"
  memory:
    total: "64GB"
    available: "48GB"
  storage:
    total: "2TB"
    type: "NVMe SSD"
  gpu:
    enabled: true
    devices:
      - name: "Tesla V100"
        memory: "32GB"
        compute_capability: "7.0"
      - name: "Tesla A100"
        memory: "80GB"
        compute_capability: "8.0"

frameworks:
  tensorflow:
    version: "2.15.0"
    gpu_support: true
    distributed: true
  pytorch:
    version: "2.1.0"
    gpu_support: true
    distributed: true
  scikit_learn:
    version: "1.3.0"
  xgboost:
    version: "2.0.0"
    gpu_support: true

development_tools:
  jupyter:
    enabled: true
    port: 8888
    extensions:
      - "jupyterlab-git"
      - "jupyterlab-lsp"
      - "jupyterlab-ai"
  vscode:
    enabled: true
    port: 8080
    extensions:
      - "ms-python.python"
      - "ms-toolsai.jupyter"
  tensorboard:
    enabled: true
    port: 6006

data_sources:
  local:
    path: "/workspace/datasets"
  s3:
    bucket: "quadrax-ml-data"
    region: "us-west-2"
  databases:
    postgresql:
      host: "localhost"
      port: 5432
      database: "ml_data"

monitoring:
  metrics:
    enabled: true
    interval: "30s"
  logging:
    level: "INFO"
    format: "json"
  alerts:
    gpu_utilization: 90
    memory_usage: 85
    disk_usage: 80` 
          },
          { 
            name: 'requirements.txt', 
            language: 'text', 
            content: `# QUADRAX ML Workshop Dependencies
# Core ML Frameworks
tensorflow>=2.15.0
torch>=2.1.0
torchvision>=0.16.0
scikit-learn>=1.3.0
xgboost>=2.0.0

# Data Processing
pandas>=2.1.0
numpy>=1.24.0
scipy>=1.11.0
polars>=0.19.0

# Visualization
matplotlib>=3.7.0
seaborn>=0.12.0
plotly>=5.17.0
bokeh>=3.2.0

# Deep Learning Utilities
transformers>=4.35.0
datasets>=2.14.0
accelerate>=0.24.0
peft>=0.6.0

# Computer Vision
opencv-python>=4.8.0
pillow>=10.0.0
albumentations>=1.3.0

# NLP
spacy>=3.7.0
nltk>=3.8.0
gensim>=4.3.0

# MLOps
mlflow>=2.7.0
wandb>=0.15.0
dvc>=3.24.0
great-expectations>=0.17.0

# Development Tools
jupyter>=1.0.0
jupyterlab>=4.0.0
ipywidgets>=8.1.0
tqdm>=4.66.0

# API and Web
fastapi>=0.104.0
uvicorn>=0.24.0
streamlit>=1.28.0
gradio>=3.50.0

# Database
sqlalchemy>=2.0.0
psycopg2-binary>=2.9.0
pymongo>=4.5.0

# Cloud and Deployment
boto3>=1.29.0
google-cloud-storage>=2.10.0
azure-storage-blob>=12.19.0
docker>=6.1.0

# Performance
numba>=0.58.0
cupy-cuda12x>=12.2.0
rapids-cudf>=23.10.0` 
          }
        ];
      case 'datakits':
        return [
          { 
            name: 'data_processor.py', 
            language: 'python', 
            content: `# Enhanced Data Processing Pipeline for QUADRAX ML
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.impute import SimpleImputer, KNNImputer
from sklearn.feature_selection import SelectKBest, f_classif
import matplotlib.pyplot as plt
import seaborn as sns
from typing import Dict, List, Tuple, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class QuadraxDataProcessor:
    """Advanced data processing pipeline with ML-ready outputs"""
    
    def __init__(self):
        self.scalers = {}
        self.encoders = {}
        self.imputers = {}
        self.feature_selectors = {}
        self.data_quality_report = {}
        
    def load_dataset(self, file_path: str, **kwargs) -> pd.DataFrame:
        """Load dataset with automatic format detection"""
        try:
            if file_path.endswith('.csv'):
                df = pd.read_csv(file_path, **kwargs)
            elif file_path.endswith('.json'):
                df = pd.read_json(file_path, **kwargs)
            elif file_path.endswith('.parquet'):
                df = pd.read_parquet(file_path, **kwargs)
            elif file_path.endswith(('.xlsx', '.xls')):
                df = pd.read_excel(file_path, **kwargs)
            else:
                raise ValueError(f"Unsupported file format: {file_path}")
                
            logger.info(f"Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns")
            return df
            
        except Exception as e:
            logger.error(f"Error loading dataset: {e}")
            raise
    
    def analyze_data_quality(self, df: pd.DataFrame) -> Dict:
        """Comprehensive data quality analysis"""
        quality_report = {
            'shape': df.shape,
            'memory_usage': df.memory_usage(deep=True).sum(),
            'missing_values': df.isnull().sum().to_dict(),
            'missing_percentage': (df.isnull().sum() / len(df) * 100).to_dict(),
            'duplicates': df.duplicated().sum(),
            'data_types': df.dtypes.to_dict(),
            'unique_values': df.nunique().to_dict(),
            'numeric_summary': df.describe().to_dict(),
            'categorical_summary': {}
        }
        
        # Analyze categorical columns
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns
        for col in categorical_cols:
            quality_report['categorical_summary'][col] = {
                'unique_count': df[col].nunique(),
                'top_values': df[col].value_counts().head().to_dict(),
                'null_count': df[col].isnull().sum()
            }
        
        # Calculate overall quality score
        missing_ratio = df.isnull().sum().sum() / (len(df) * len(df.columns))
        duplicate_ratio = df.duplicated().sum() / len(df)
        quality_score = max(0, 100 - (missing_ratio * 50) - (duplicate_ratio * 30))
        quality_report['quality_score'] = round(quality_score, 2)
        
        self.data_quality_report = quality_report
        logger.info(f"Data quality score: {quality_score:.2f}%")
        
        return quality_report
    
    def clean_data(self, df: pd.DataFrame, 
                   handle_missing: str = 'auto',
                   remove_duplicates: bool = True,
                   outlier_method: str = 'iqr') -> pd.DataFrame:
        """Advanced data cleaning with multiple strategies"""
        
        df_cleaned = df.copy()
        
        # Remove duplicates
        if remove_duplicates:
            initial_rows = len(df_cleaned)
            df_cleaned = df_cleaned.drop_duplicates()
            removed_duplicates = initial_rows - len(df_cleaned)
            logger.info(f"Removed {removed_duplicates} duplicate rows")
        
        # Handle missing values
        if handle_missing == 'auto':
            # Automatic strategy based on data type and missing percentage
            for col in df_cleaned.columns:
                missing_pct = df_cleaned[col].isnull().sum() / len(df_cleaned)
                
                if missing_pct > 0.5:
                    # Drop columns with >50% missing values
                    df_cleaned = df_cleaned.drop(columns=[col])
                    logger.info(f"Dropped column '{col}' (>{missing_pct:.1%} missing)")
                elif missing_pct > 0:
                    if df_cleaned[col].dtype in ['int64', 'float64']:
                        # Use KNN imputation for numeric columns
                        imputer = KNNImputer(n_neighbors=5)
                        df_cleaned[col] = imputer.fit_transform(df_cleaned[[col]]).ravel()
                    else:
                        # Use mode for categorical columns
                        mode_value = df_cleaned[col].mode().iloc[0] if not df_cleaned[col].mode().empty else 'Unknown'
                        df_cleaned[col] = df_cleaned[col].fillna(mode_value)
        
        # Handle outliers
        if outlier_method == 'iqr':
            numeric_cols = df_cleaned.select_dtypes(include=[np.number]).columns
            for col in numeric_cols:
                Q1 = df_cleaned[col].quantile(0.25)
                Q3 = df_cleaned[col].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR
                
                outliers_before = len(df_cleaned)
                df_cleaned = df_cleaned[(df_cleaned[col] >= lower_bound) & (df_cleaned[col] <= upper_bound)]
                outliers_removed = outliers_before - len(df_cleaned)
                
                if outliers_removed > 0:
                    logger.info(f"Removed {outliers_removed} outliers from column '{col}'")
        
        return df_cleaned
    
    def feature_engineering(self, df: pd.DataFrame, target_col: Optional[str] = None) -> pd.DataFrame:
        """Advanced feature engineering pipeline"""
        
        df_engineered = df.copy()
        
        # Encode categorical variables
        categorical_cols = df_engineered.select_dtypes(include=['object', 'category']).columns
        categorical_cols = [col for col in categorical_cols if col != target_col]
        
        for col in categorical_cols:
            unique_values = df_engineered[col].nunique()
            
            if unique_values == 2:
                # Binary encoding for binary categorical variables
                le = LabelEncoder()
                df_engineered[f'{col}_encoded'] = le.fit_transform(df_engineered[col].astype(str))
                self.encoders[col] = le
            elif unique_values <= 10:
                # One-hot encoding for low cardinality categorical variables
                encoded_cols = pd.get_dummies(df_engineered[col], prefix=col)
                df_engineered = pd.concat([df_engineered, encoded_cols], axis=1)
            else:
                # Target encoding for high cardinality categorical variables
                if target_col and target_col in df_engineered.columns:
                    target_mean = df_engineered.groupby(col)[target_col].mean()
                    df_engineered[f'{col}_target_encoded'] = df_engineered[col].map(target_mean)
        
        # Remove original categorical columns
        df_engineered = df_engineered.drop(columns=categorical_cols)
        
        # Feature scaling
        numeric_cols = df_engineered.select_dtypes(include=[np.number]).columns
        numeric_cols = [col for col in numeric_cols if col != target_col]
        
        if len(numeric_cols) > 0:
            scaler = StandardScaler()
            df_engineered[numeric_cols] = scaler.fit_transform(df_engineered[numeric_cols])
            self.scalers['standard'] = scaler
        
        # Feature selection
        if target_col and target_col in df_engineered.columns:
            X = df_engineered.drop(columns=[target_col])
            y = df_engineered[target_col]
            
            selector = SelectKBest(score_func=f_classif, k=min(20, len(X.columns)))
            X_selected = selector.fit_transform(X, y)
            selected_features = X.columns[selector.get_support()].tolist()
            
            df_engineered = pd.concat([
                pd.DataFrame(X_selected, columns=selected_features, index=df_engineered.index),
                df_engineered[target_col]
            ], axis=1)
            
            self.feature_selectors['kbest'] = selector
            logger.info(f"Selected {len(selected_features)} best features")
        
        return df_engineered
    
    def generate_ml_ready_splits(self, df: pd.DataFrame, target_col: str, 
                                test_size: float = 0.2, val_size: float = 0.1) -> Tuple:
        """Generate train/validation/test splits ready for ML"""
        
        X = df.drop(columns=[target_col])
        y = df[target_col]
        
        # First split: train+val vs test
        X_temp, X_test, y_temp, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y if y.dtype == 'object' else None
        )
        
        # Second split: train vs val
        val_size_adjusted = val_size / (1 - test_size)
        X_train, X_val, y_train, y_val = train_test_split(
            X_temp, y_temp, test_size=val_size_adjusted, random_state=42,
            stratify=y_temp if y_temp.dtype == 'object' else None
        )
        
        logger.info(f"Data splits - Train: {len(X_train)}, Val: {len(X_val)}, Test: {len(X_test)}")
        
        return X_train, X_val, X_test, y_train, y_val, y_test
    
    def export_processed_data(self, df: pd.DataFrame, output_path: str, format: str = 'csv'):
        """Export processed data in various formats"""
        
        try:
            if format == 'csv':
                df.to_csv(output_path, index=False)
            elif format == 'parquet':
                df.to_parquet(output_path, index=False)
            elif format == 'json':
                df.to_json(output_path, orient='records', indent=2)
            else:
                raise ValueError(f"Unsupported export format: {format}")
                
            logger.info(f"Data exported to {output_path} in {format} format")
            
        except Exception as e:
            logger.error(f"Error exporting data: {e}")
            raise

# Example usage
if __name__ == "__main__":
    processor = QuadraxDataProcessor()
    
    # Load and process data
    # df = processor.load_dataset("your_dataset.csv")
    # quality_report = processor.analyze_data_quality(df)
    # df_cleaned = processor.clean_data(df)
    # df_engineered = processor.feature_engineering(df_cleaned, target_col='target')
    # X_train, X_val, X_test, y_train, y_val, y_test = processor.generate_ml_ready_splits(df_engineered, 'target')
    
    print("🚀 QUADRAX Data Processor ready for advanced ML data preparation!")` 
          },
          { 
            name: 'data_validation.py', 
            language: 'python', 
            content: `# Advanced Data Validation for QUADRAX ML
import pandas as pd
import numpy as np
from typing import Dict, List, Any, Optional
import json
import logging
from datetime import datetime
import warnings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class QuadraxDataValidator:
    """Comprehensive data validation system for ML pipelines"""
    
    def __init__(self):
        self.validation_rules = {}
        self.validation_results = {}
        self.schema_definitions = {}
        
    def define_schema(self, schema_name: str, schema_definition: Dict) -> None:
        """Define a data schema for validation"""
        self.schema_definitions[schema_name] = schema_definition
        logger.info(f"Schema '{schema_name}' defined with {len(schema_definition)} rules")
    
    def validate_schema(self, df: pd.DataFrame, schema_name: str) -> Dict:
        """Validate dataframe against predefined schema"""
        
        if schema_name not in self.schema_definitions:
            raise ValueError(f"Schema '{schema_name}' not found")
        
        schema = self.schema_definitions[schema_name]
        validation_results = {
            'schema_name': schema_name,
            'timestamp': datetime.now().isoformat(),
            'passed': True,
            'errors': [],
            'warnings': [],
            'column_validations': {}
        }
        
        # Validate required columns
        required_columns = schema.get('required_columns', [])
        missing_columns = set(required_columns) - set(df.columns)
        if missing_columns:
            validation_results['errors'].append(f"Missing required columns: {list(missing_columns)}")
            validation_results['passed'] = False
        
        # Validate column data types
        column_types = schema.get('column_types', {})
        for column, expected_type in column_types.items():
            if column in df.columns:
                actual_type = str(df[column].dtype)
                if not self._check_type_compatibility(actual_type, expected_type):
                    validation_results['errors'].append(
                        f"Column '{column}' type mismatch: expected {expected_type}, got {actual_type}"
                    )
                    validation_results['passed'] = False
        
        # Validate column constraints
        column_constraints = schema.get('column_constraints', {})
        for column, constraints in column_constraints.items():
            if column in df.columns:
                column_validation = self._validate_column_constraints(df[column], constraints)
                validation_results['column_validations'][column] = column_validation
                
                if not column_validation['passed']:
                    validation_results['errors'].extend(column_validation['errors'])
                    validation_results['passed'] = False
                
                if column_validation['warnings']:
                    validation_results['warnings'].extend(column_validation['warnings'])
        
        # Validate data quality thresholds
        quality_thresholds = schema.get('quality_thresholds', {})
        quality_results = self._validate_quality_thresholds(df, quality_thresholds)
        validation_results.update(quality_results)
        
        self.validation_results[schema_name] = validation_results
        return validation_results
    
    def _check_type_compatibility(self, actual_type: str, expected_type: str) -> bool:
        """Check if actual data type is compatible with expected type"""
        type_mappings = {
            'int': ['int64', 'int32', 'int16', 'int8'],
            'float': ['float64', 'float32', 'float16'],
            'string': ['object', 'string'],
            'datetime': ['datetime64[ns]', 'datetime64'],
            'bool': ['bool'],
            'category': ['category']
        }
        
        if expected_type in type_mappings:
            return actual_type in type_mappings[expected_type]
        
        return actual_type == expected_type
    
    def _validate_column_constraints(self, series: pd.Series, constraints: Dict) -> Dict:
        """Validate individual column constraints"""
        result = {
            'passed': True,
            'errors': [],
            'warnings': []
        }
        
        # Check null values
        if 'allow_null' in constraints:
            if not constraints['allow_null'] and series.isnull().any():
                result['errors'].append(f"Column contains null values but nulls not allowed")
                result['passed'] = False
        
        # Check value ranges for numeric columns
        if series.dtype in ['int64', 'float64'] and 'range' in constraints:
            min_val, max_val = constraints['range']
            out_of_range = series[(series < min_val) | (series > max_val)]
            if not out_of_range.empty:
                result['errors'].append(f"{len(out_of_range)} values outside range [{min_val}, {max_val}]")
                result['passed'] = False
        
        # Check allowed values
        if 'allowed_values' in constraints:
            invalid_values = series[~series.isin(constraints['allowed_values'])]
            if not invalid_values.empty:
                unique_invalid = invalid_values.unique()[:5]  # Show first 5 invalid values
                result['errors'].append(f"Invalid values found: {list(unique_invalid)}")
                result['passed'] = False
        
        # Check string patterns
        if 'pattern' in constraints and series.dtype == 'object':
            import re
            pattern = constraints['pattern']
            invalid_patterns = series[~series.str.match(pattern, na=False)]
            if not invalid_patterns.empty:
                result['errors'].append(f"{len(invalid_patterns)} values don't match pattern: {pattern}")
                result['passed'] = False
        
        # Check uniqueness
        if constraints.get('unique', False):
            duplicates = series.duplicated().sum()
            if duplicates > 0:
                result['errors'].append(f"Column should be unique but has {duplicates} duplicates")
                result['passed'] = False
        
        # Check minimum/maximum length for strings
        if series.dtype == 'object':
            if 'min_length' in constraints:
                short_strings = series[series.str.len() < constraints['min_length']]
                if not short_strings.empty:
                    result['warnings'].append(f"{len(short_strings)} values shorter than {constraints['min_length']} characters")
            
            if 'max_length' in constraints:
                long_strings = series[series.str.len() > constraints['max_length']]
                if not long_strings.empty:
                    result['errors'].append(f"{len(long_strings)} values longer than {constraints['max_length']} characters")
                    result['passed'] = False
        
        return result
    
    def _validate_quality_thresholds(self, df: pd.DataFrame, thresholds: Dict) -> Dict:
        """Validate data quality against thresholds"""
        quality_results = {
            'quality_checks': {},
            'quality_passed': True
        }
        
        # Check missing value threshold
        if 'max_missing_percentage' in thresholds:
            missing_pct = (df.isnull().sum().sum() / (len(df) * len(df.columns))) * 100
            quality_results['quality_checks']['missing_percentage'] = {
                'actual': round(missing_pct, 2),
                'threshold': thresholds['max_missing_percentage'],
                'passed': missing_pct <= thresholds['max_missing_percentage']
            }
            
            if missing_pct > thresholds['max_missing_percentage']:
                quality_results['quality_passed'] = False
        
        # Check duplicate threshold
        if 'max_duplicate_percentage' in thresholds:
            duplicate_pct = (df.duplicated().sum() / len(df)) * 100
            quality_results['quality_checks']['duplicate_percentage'] = {
                'actual': round(duplicate_pct, 2),
                'threshold': thresholds['max_duplicate_percentage'],
                'passed': duplicate_pct <= thresholds['max_duplicate_percentage']
            }
            
            if duplicate_pct > thresholds['max_duplicate_percentage']:
                quality_results['quality_passed'] = False
        
        # Check minimum row count
        if 'min_rows' in thresholds:
            row_count = len(df)
            quality_results['quality_checks']['row_count'] = {
                'actual': row_count,
                'threshold': thresholds['min_rows'],
                'passed': row_count >= thresholds['min_rows']
            }
            
            if row_count < thresholds['min_rows']:
                quality_results['quality_passed'] = False
        
        return quality_results
    
    def create_ml_schema(self, df: pd.DataFrame, target_column: str) -> Dict:
        """Automatically create ML-ready schema from dataframe"""
        schema = {
            'required_columns': list(df.columns),
            'column_types': {},
            'column_constraints': {},
            'quality_thresholds': {
                'max_missing_percentage': 10,
                'max_duplicate_percentage': 5,
                'min_rows': 100
            }
        }
        
        for column in df.columns:
            # Set data types
            if df[column].dtype in ['int64', 'int32']:
                schema['column_types'][column] = 'int'
            elif df[column].dtype in ['float64', 'float32']:
                schema['column_types'][column] = 'float'
            elif df[column].dtype == 'object':
                schema['column_types'][column] = 'string'
            elif df[column].dtype == 'bool':
                schema['column_types'][column] = 'bool'
            else:
                schema['column_types'][column] = str(df[column].dtype)
            
            # Set constraints
            constraints = {}
            
            # Handle target column specially
            if column == target_column:
                constraints['allow_null'] = False
                if df[column].dtype == 'object':
                    constraints['allowed_values'] = df[column].unique().tolist()
            else:
                # Allow some missing values in features
                missing_pct = (df[column].isnull().sum() / len(df)) * 100
                constraints['allow_null'] = missing_pct < 50
            
            # Set ranges for numeric columns
            if df[column].dtype in ['int64', 'float64']:
                q1, q99 = df[column].quantile([0.01, 0.99])
                constraints['range'] = [q1, q99]
            
            # Set uniqueness for ID-like columns
            if 'id' in column.lower() and df[column].nunique() == len(df):
                constraints['unique'] = True
            
            schema['column_constraints'][column] = constraints
        
        return schema
    
    def generate_validation_report(self, validation_results: Dict) -> str:
        """Generate human-readable validation report"""
        report = []
        report.append(f"=== Data Validation Report ===")
        report.append(f"Schema: {validation_results['schema_name']}")
        report.append(f"Timestamp: {validation_results['timestamp']}")
        report.append(f"Overall Status: {'PASSED' if validation_results['passed'] else 'FAILED'}")
        report.append("")
        
        if validation_results['errors']:
            report.append("ERRORS:")
            for error in validation_results['errors']:
                report.append(f"  ❌ {error}")
            report.append("")
        
        if validation_results['warnings']:
            report.append("WARNINGS:")
            for warning in validation_results['warnings']:
                report.append(f"  ⚠️  {warning}")
            report.append("")
        
        if validation_results.get('quality_checks'):
            report.append("QUALITY CHECKS:")
            for check_name, check_result in validation_results['quality_checks'].items():
                status = "✅" if check_result['passed'] else "❌"
                report.append(f"  {status} {check_name}: {check_result['actual']} (threshold: {check_result['threshold']})")
            report.append("")
        
        if validation_results.get('column_validations'):
            report.append("COLUMN VALIDATIONS:")
            for column, result in validation_results['column_validations'].items():
                status = "✅" if result['passed'] else "❌"
                report.append(f"  {status} {column}")
                if result['errors']:
                    for error in result['errors']:
                        report.append(f"      ❌ {error}")
                if result['warnings']:
                    for warning in result['warnings']:
                        report.append(f"      ⚠️  {warning}")
        
        return "\\n".join(report)

# Example usage and predefined schemas
if __name__ == "__main__":
    validator = QuadraxDataValidator()
    
    # Example ML schema for customer data
    customer_schema = {
        'required_columns': ['customer_id', 'age', 'income', 'purchase_amount', 'category'],
        'column_types': {
            'customer_id': 'string',
            'age': 'int',
            'income': 'float',
            'purchase_amount': 'float',
            'category': 'string'
        },
        'column_constraints': {
            'customer_id': {'unique': True, 'allow_null': False},
            'age': {'range': [18, 100], 'allow_null': False},
            'income': {'range': [0, 1000000], 'allow_null': True},
            'purchase_amount': {'range': [0, 50000], 'allow_null': False},
            'category': {'allowed_values': ['electronics', 'clothing', 'books', 'home'], 'allow_null': False}
        },
        'quality_thresholds': {
            'max_missing_percentage': 5,
            'max_duplicate_percentage': 2,
            'min_rows': 1000
        }
    }
    
    validator.define_schema('customer_data', customer_schema)
    print("🚀 QUADRAX Data Validator ready for ML data validation!")` 
          }
        ];
      case 'models':
        return [
          { 
            name: 'model_trainer.py', 
            language: 'python', 
            content: `# Advanced Model Training System for QUADRAX ML
import tensorflow as tf
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split, GridSearchCV, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from typing import Dict, List, Tuple, Any, Optional
import logging
import json
import pickle
from datetime import datetime
import mlflow
import mlflow.tensorflow
import mlflow.pytorch
import mlflow.sklearn

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class QuadraxModelTrainer:
    """Advanced ML model training system with MLOps integration"""
    
    def __init__(self, experiment_name: str = "quadrax_ml_experiments"):
        self.models = {}
        self.training_history = {}
        self.evaluation_results = {}
        self.experiment_name = experiment_name
        
        # Initialize MLflow
        mlflow.set_experiment(experiment_name)
        
        # GPU configuration
        self._configure_gpu()
        
    def _configure_gpu(self):
        """Configure GPU settings for TensorFlow and PyTorch"""
        # TensorFlow GPU configuration
        gpus = tf.config.experimental.list_physical_devices('GPU')
        if gpus:
            try:
                for gpu in gpus:
                    tf.config.experimental.set_memory_growth(gpu, True)
                logger.info(f"TensorFlow configured with {len(gpus)} GPU(s)")
            except RuntimeError as e:
                logger.error(f"GPU configuration error: {e}")
        
        # PyTorch GPU configuration
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
            logger.info(f"PyTorch CUDA available: {torch.cuda.get_device_name(0)}")
        
    def create_tensorflow_model(self, model_config: Dict) -> tf.keras.Model:
        """Create TensorFlow/Keras model from configuration"""
        
        model_type = model_config.get('type', 'sequential')
        input_shape = model_config.get('input_shape', (784,))
        num_classes = model_config.get('num_classes', 10)
        
        if model_type == 'sequential':
            model = tf.keras.Sequential()
            
            # Add layers based on configuration
            layers_config = model_config.get('layers', [
                {'type': 'dense', 'units': 128, 'activation': 'relu'},
                {'type': 'dropout', 'rate': 0.2},
                {'type': 'dense', 'units': 64, 'activation': 'relu'},
                {'type': 'dense', 'units': num_classes, 'activation': 'softmax'}
            ])
            
            for i, layer_config in enumerate(layers_config):
                layer_type = layer_config['type']
                
                if layer_type == 'dense':
                    if i == 0:
                        model.add(tf.keras.layers.Dense(
                            layer_config['units'],
                            activation=layer_config.get('activation', 'relu'),
                            input_shape=input_shape
                        ))
                    else:
                        model.add(tf.keras.layers.Dense(
                            layer_config['units'],
                            activation=layer_config.get('activation', 'relu')
                        ))
                elif layer_type == 'dropout':
                    model.add(tf.keras.layers.Dropout(layer_config['rate']))
                elif layer_type == 'conv2d':
                    model.add(tf.keras.layers.Conv2D(
                        layer_config['filters'],
                        layer_config['kernel_size'],
                        activation=layer_config.get('activation', 'relu'),
                        input_shape=input_shape if i == 0 else None
                    ))
                elif layer_type == 'maxpool2d':
                    model.add(tf.keras.layers.MaxPooling2D(layer_config['pool_size']))
                elif layer_type == 'flatten':
                    model.add(tf.keras.layers.Flatten())
        
        elif model_type == 'cnn':
            # Predefined CNN architecture
            model = tf.keras.Sequential([
                tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
                tf.keras.layers.MaxPooling2D((2, 2)),
                tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
                tf.keras.layers.MaxPooling2D((2, 2)),
                tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
                tf.keras.layers.Flatten(),
                tf.keras.layers.Dense(64, activation='relu'),
                tf.keras.layers.Dropout(0.2),
                tf.keras.layers.Dense(num_classes, activation='softmax')
            ])
        
        # Compile model
        optimizer = model_config.get('optimizer', 'adam')
        loss = model_config.get('loss', 'sparse_categorical_crossentropy')
        metrics = model_config.get('metrics', ['accuracy'])
        
        model.compile(optimizer=optimizer, loss=loss, metrics=metrics)
        
        return model
    
    def create_pytorch_model(self, model_config: Dict) -> nn.Module:
        """Create PyTorch model from configuration"""
        
        class DynamicNN(nn.Module):
            def __init__(self, config):
                super(DynamicNN, self).__init__()
                self.layers = nn.ModuleList()
                
                input_size = config.get('input_size', 784)
                num_classes = config.get('num_classes', 10)
                hidden_layers = config.get('hidden_layers', [128, 64])
                dropout_rate = config.get('dropout_rate', 0.2)
                
                # Input layer
                self.layers.append(nn.Linear(input_size, hidden_layers[0]))
                self.layers.append(nn.ReLU())
                self.layers.append(nn.Dropout(dropout_rate))
                
                # Hidden layers
                for i in range(len(hidden_layers) - 1):
                    self.layers.append(nn.Linear(hidden_layers[i], hidden_layers[i + 1]))
                    self.layers.append(nn.ReLU())
                    self.layers.append(nn.Dropout(dropout_rate))
                
                # Output layer
                self.layers.append(nn.Linear(hidden_layers[-1], num_classes))
                self.layers.append(nn.Softmax(dim=1))
            
            def forward(self, x):
                for layer in self.layers:
                    x = layer(x)
                return x
        
        return DynamicNN(model_config)
    
    def train_tensorflow_model(self, model: tf.keras.Model, X_train: np.ndarray, y_train: np.ndarray,
                             X_val: np.ndarray, y_val: np.ndarray, training_config: Dict) -> Dict:
        """Train TensorFlow model with advanced configuration"""
        
        with mlflow.start_run():
            # Log parameters
            mlflow.log_params(training_config)
            
            # Callbacks
            callbacks = []
            
            # Early stopping
            if training_config.get('early_stopping', True):
                early_stopping = tf.keras.callbacks.EarlyStopping(
                    monitor='val_loss',
                    patience=training_config.get('patience', 10),
                    restore_best_weights=True
                )
                callbacks.append(early_stopping)
            
            # Learning rate scheduling
            if training_config.get('lr_scheduling', False):
                lr_scheduler = tf.keras.callbacks.ReduceLROnPlateau(
                    monitor='val_loss',
                    factor=0.5,
                    patience=5,
                    min_lr=1e-7
                )
                callbacks.append(lr_scheduler)
            
            # Model checkpointing
            checkpoint = tf.keras.callbacks.ModelCheckpoint(
                'best_model.h5',
                monitor='val_accuracy',
                save_best_only=True,
                mode='max'
            )
            callbacks.append(checkpoint)
            
            # Training
            history = model.fit(
                X_train, y_train,
                validation_data=(X_val, y_val),
                epochs=training_config.get('epochs', 100),
                batch_size=training_config.get('batch_size', 32),
                callbacks=callbacks,
                verbose=1
            )
            
            # Log metrics
            for epoch, (loss, acc, val_loss, val_acc) in enumerate(zip(
                history.history['loss'],
                history.history['accuracy'],
                history.history['val_loss'],
                history.history['val_accuracy']
            )):
                mlflow.log_metrics({
                    'loss': loss,
                    'accuracy': acc,
                    'val_loss': val_loss,
                    'val_accuracy': val_acc
                }, step=epoch)
            
            # Log model
            mlflow.tensorflow.log_model(model, "model")
            
            return {
                'history': history.history,
                'final_accuracy': max(history.history['val_accuracy']),
                'final_loss': min(history.history['val_loss'])
            }
    
    def train_sklearn_model(self, model_type: str, X_train: np.ndarray, y_train: np.ndarray,
                           X_val: np.ndarray, y_val: np.ndarray, model_config: Dict) -> Dict:
        """Train scikit-learn model with hyperparameter optimization"""
        
        with mlflow.start_run():
            # Model selection
            if model_type == 'random_forest':
                base_model = RandomForestClassifier(random_state=42)
                param_grid = {
                    'n_estimators': [100, 200, 300],
                    'max_depth': [10, 20, None],
                    'min_samples_split': [2, 5, 10],
                    'min_samples_leaf': [1, 2, 4]
                }
            elif model_type == 'gradient_boosting':
                base_model = GradientBoostingClassifier(random_state=42)
                param_grid = {
                    'n_estimators': [100, 200],
                    'learning_rate': [0.05, 0.1, 0.2],
                    'max_depth': [3, 5, 7]
                }
            elif model_type == 'logistic_regression':
                base_model = LogisticRegression(random_state=42, max_iter=1000)
                param_grid = {
                    'C': [0.1, 1, 10, 100],
                    'penalty': ['l1', 'l2'],
                    'solver': ['liblinear', 'saga']
                }
            elif model_type == 'svm':
                base_model = SVC(random_state=42, probability=True)
                param_grid = {
                    'C': [0.1, 1, 10],
                    'kernel': ['rbf', 'linear'],
                    'gamma': ['scale', 'auto']
                }
            else:
                raise ValueError(f"Unsupported model type: {model_type}")
            
            # Hyperparameter optimization
            search_type = model_config.get('search_type', 'grid')
            cv_folds = model_config.get('cv_folds', 5)
            
            if search_type == 'grid':
                search = GridSearchCV(
                    base_model, param_grid, cv=cv_folds, 
                    scoring='accuracy', n_jobs=-1
                )
            else:
                search = RandomizedSearchCV(
                    base_model, param_grid, cv=cv_folds,
                    scoring='accuracy', n_jobs=-1, n_iter=20
                )
            
            # Fit model
            search.fit(X_train, y_train)
            best_model = search.best_estimator_
            
            # Validation predictions
            val_predictions = best_model.predict(X_val)
            val_probabilities = best_model.predict_proba(X_val)
            
            # Calculate metrics
            val_accuracy = best_model.score(X_val, y_val)
            val_auc = roc_auc_score(y_val, val_probabilities, multi_class='ovr')
            
            # Log parameters and metrics
            mlflow.log_params(search.best_params_)
            mlflow.log_metrics({
                'val_accuracy': val_accuracy,
                'val_auc': val_auc,
                'best_cv_score': search.best_score_
            })
            
            # Log model
            mlflow.sklearn.log_model(best_model, "model")
            
            return {
                'model': best_model,
                'best_params': search.best_params_,
                'val_accuracy': val_accuracy,
                'val_auc': val_auc,
                'cv_results': search.cv_results_
            }
    
    def evaluate_model(self, model, X_test: np.ndarray, y_test: np.ndarray, 
                      model_type: str = 'sklearn') -> Dict:
        """Comprehensive model evaluation"""
        
        if model_type == 'tensorflow':
            predictions = model.predict(X_test)
            predicted_classes = np.argmax(predictions, axis=1)
            probabilities = predictions
        else:
            predicted_classes = model.predict(X_test)
            probabilities = model.predict_proba(X_test)
        
        # Calculate metrics
        accuracy = np.mean(predicted_classes == y_test)
        
        # Classification report
        class_report = classification_report(y_test, predicted_classes, output_dict=True)
        
        # Confusion matrix
        conf_matrix = confusion_matrix(y_test, predicted_classes)
        
        # AUC score (for multi-class)
        try:
            auc_score = roc_auc_score(y_test, probabilities, multi_class='ovr')
        except:
            auc_score = None
        
        evaluation_results = {
            'accuracy': accuracy,
            'classification_report': class_report,
            'confusion_matrix': conf_matrix.tolist(),
            'auc_score': auc_score,
            'predictions': predicted_classes.tolist(),
            'probabilities': probabilities.tolist() if probabilities is not None else None
        }
        
        return evaluation_results
    
    def save_model(self, model, model_name: str, model_type: str, metadata: Dict = None):
        """Save model with metadata"""
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{model_name}_{timestamp}"
        
        if model_type == 'tensorflow':
            model.save(f"{filename}.h5")
        elif model_type == 'pytorch':
            torch.save(model.state_dict(), f"{filename}.pth")
        else:
            with open(f"{filename}.pkl", 'wb') as f:
                pickle.dump(model, f)
        
        # Save metadata
        if metadata:
            with open(f"{filename}_metadata.json", 'w') as f:
                json.dump(metadata, f, indent=2)
        
        logger.info(f"Model saved as {filename}")
        
        return filename
    
    def load_model(self, filename: str, model_type: str):
        """Load saved model"""
        
        if model_type == 'tensorflow':
            model = tf.keras.models.load_model(f"{filename}.h5")
        elif model_type == 'pytorch':
            # Note: Need to recreate model architecture first
            model = torch.load(f"{filename}.pth")
        else:
            with open(f"{filename}.pkl", 'rb') as f:
                model = pickle.load(f)
        
        # Load metadata if exists
        metadata = None
        try:
            with open(f"{filename}_metadata.json", 'r') as f:
                metadata = json.load(f)
        except FileNotFoundError:
            pass
        
        return model, metadata
    
    def compare_models(self, evaluation_results: Dict[str, Dict]) -> pd.DataFrame:
        """Compare multiple model evaluation results"""
        
        comparison_data = []
        
        for model_name, results in evaluation_results.items():
            comparison_data.append({
                'Model': model_name,
                'Accuracy': results['accuracy'],
                'AUC Score': results.get('auc_score', 'N/A'),
                'Precision (Macro)': results['classification_report']['macro avg']['precision'],
                'Recall (Macro)': results['classification_report']['macro avg']['recall'],
                'F1-Score (Macro)': results['classification_report']['macro avg']['f1-score']
            })
        
        comparison_df = pd.DataFrame(comparison_data)
        comparison_df = comparison_df.sort_values('Accuracy', ascending=False)
        
        return comparison_df

# Example usage and model configurations
if __name__ == "__main__":
    trainer = QuadraxModelTrainer()
    
    # Example TensorFlow model configuration
    tf_config = {
        'type': 'sequential',
        'input_shape': (784,),
        'num_classes': 10,
        'layers': [
            {'type': 'dense', 'units': 128, 'activation': 'relu'},
            {'type': 'dropout', 'rate': 0.2},
            {'type': 'dense', 'units': 64, 'activation': 'relu'},
            {'type': 'dense', 'units': 10, 'activation': 'softmax'}
        ],
        'optimizer': 'adam',
        'loss': 'sparse_categorical_crossentropy',
        'metrics': ['accuracy']
    }
    
    # Example training configuration
    training_config = {
        'epochs': 100,
        'batch_size': 32,
        'early_stopping': True,
        'patience': 10,
        'lr_scheduling': True
    }
    
    print("🚀 QUADRAX Model Trainer ready for advanced ML model training!")
    print("Features:")
    print("- TensorFlow/Keras and PyTorch support")
    print("- Automated hyperparameter optimization")
    print("- MLflow experiment tracking")
    print("- Comprehensive model evaluation")
    print("- GPU acceleration")
    print("- Model comparison and selection")` 
          },
          { 
            name: 'model_config.json', 
            language: 'json', 
            content: `{
  "model_registry": {
    "customer_classifier_v2": {
      "name": "Customer Behavior Classifier",
      "version": "2.1.0",
      "description": "Advanced customer behavior classification model with ensemble learning",
      "framework": "tensorflow",
      "model_type": "classification",
      "architecture": {
        "type": "ensemble",
        "base_models": [
          {
            "name": "neural_network",
            "type": "sequential",
            "layers": [
              {"type": "dense", "units": 256, "activation": "relu", "dropout": 0.3},
              {"type": "batch_normalization"},
              {"type": "dense", "units": 128, "activation": "relu", "dropout": 0.2},
              {"type": "dense", "units": 64, "activation": "relu", "dropout": 0.1},
              {"type": "dense", "units": 5, "activation": "softmax"}
            ]
          },
          {
            "name": "gradient_boosting",
            "type": "xgboost",
            "parameters": {
              "n_estimators": 200,
              "max_depth": 8,
              "learning_rate": 0.1,
              "subsample": 0.8
            }
          }
        ],
        "ensemble_method": "weighted_voting",
        "weights": [0.6, 0.4]
      },
      "training": {
        "optimizer": "adam",
        "learning_rate": 0.001,
        "loss": "sparse_categorical_crossentropy",
        "metrics": ["accuracy", "precision", "recall", "f1_score"],
        "epochs": 150,
        "batch_size": 64,
        "validation_split": 0.2,
        "early_stopping": {
          "enabled": true,
          "monitor": "val_accuracy",
          "patience": 15,
          "restore_best_weights": true
        },
        "callbacks": [
          {
            "type": "reduce_lr_on_plateau",
            "monitor": "val_loss",
            "factor": 0.5,
            "patience": 8,
            "min_lr": 1e-7
          },
          {
            "type": "model_checkpoint",
            "filepath": "models/customer_classifier_v2_best.h5",
            "monitor": "val_accuracy",
            "save_best_only": true
          }
        ]
      },
      "data_preprocessing": {
        "feature_scaling": "standard_scaler",
        "categorical_encoding": "one_hot",
        "missing_value_strategy": "knn_imputation",
        "outlier_detection": "isolation_forest",
        "feature_selection": {
          "method": "recursive_feature_elimination",
          "n_features": 20
        }
      },
      "deployment": {
        "environment": "production",
        "endpoint": "/api/v2/predict/customer-behavior",
        "container": {
          "image": "quadrax-ml/customer-classifier:v2.1.0",
          "resources": {
            "cpu": "2 cores",
            "memory": "4GB",
            "gpu": "optional"
          }
        },
        "scaling": {
          "min_instances": 2,
          "max_instances": 20,
          "target_cpu_utilization": 70,
          "scale_up_cooldown": "5m",
          "scale_down_cooldown": "10m"
        },
        "monitoring": {
          "health_check_path": "/health",
          "metrics_endpoint": "/metrics",
          "logging_level": "INFO",
          "alerts": {
            "accuracy_threshold": 0.85,
            "latency_threshold": "200ms",
            "error_rate_threshold": 0.05
          }
        }
      },
      "performance_metrics": {
        "accuracy": 0.947,
        "precision": 0.952,
        "recall": 0.941,
        "f1_score": 0.946,
        "auc_roc": 0.987,
        "inference_latency": "45ms",
        "training_time": "2.5 hours",
        "model_size": "125MB"
      },
      "data_requirements": {
        "input_features": [
          {"name": "age", "type": "numeric", "range": [18, 80]},
          {"name": "income", "type": "numeric", "range": [20000, 200000]},
          {"name": "purchase_history", "type": "numeric", "range": [0, 100]},
          {"name": "location", "type": "categorical", "categories": ["urban", "suburban", "rural"]},
          {"name": "device_type", "type": "categorical", "categories": ["mobile", "desktop", "tablet"]},
          {"name": "session_duration", "type": "numeric", "range": [0, 3600]},
          {"name": "page_views", "type": "numeric", "range": [1, 50]},
          {"name": "previous_purchases", "type": "numeric", "range": [0, 20]}
        ],
        "output_classes": [
          {"id": 0, "name": "low_value", "description": "Low value customer"},
          {"id": 1, "name": "medium_value", "description": "Medium value customer"},
          {"id": 2, "name": "high_value", "description": "High value customer"},
          {"id": 3, "name": "premium", "description": "Premium customer"},
          {"id": 4, "name": "enterprise", "description": "Enterprise customer"}
        ]
      }
    },
    "sentiment_analyzer_v3": {
      "name": "Advanced Sentiment Analysis Model",
      "version": "3.0.0",
      "description": "Transformer-based sentiment analysis with fine-tuning capabilities",
      "framework": "pytorch",
      "model_type": "nlp_classification",
      "architecture": {
        "base_model": "bert-base-uncased",
        "fine_tuning": {
          "layers_to_freeze": 8,
          "learning_rate": 2e-5,
          "warmup_steps": 500,
          "max_sequence_length": 512
        },
        "classifier_head": {
          "hidden_size": 768,
          "dropout": 0.1,
          "num_classes": 3
        }
      },
      "training": {
        "optimizer": "adamw",
        "learning_rate": 2e-5,
        "weight_decay": 0.01,
        "epochs": 10,
        "batch_size": 16,
        "gradient_accumulation_steps": 2,
        "max_grad_norm": 1.0,
        "scheduler": {
          "type": "linear_with_warmup",
          "warmup_ratio": 0.1
        }
      },
      "deployment": {
        "endpoint": "/api/v3/analyze/sentiment",
        "container": {
          "image": "quadrax-ml/sentiment-analyzer:v3.0.0",
          "resources": {
            "cpu": "4 cores",
            "memory": "8GB",
            "gpu": "Tesla T4"
          }
        },
        "scaling": {
          "min_instances": 1,
          "max_instances": 10
        }
      },
      "performance_metrics": {
        "accuracy": 0.923,
        "f1_score": 0.921,
        "inference_latency": "150ms",
        "model_size": "440MB"
      }
    },
    "recommendation_engine_v4": {
      "name": "Hybrid Recommendation Engine",
      "version": "4.2.0",
      "description": "Advanced hybrid recommendation system with collaborative and content-based filtering",
      "framework": "tensorflow",
      "model_type": "recommendation",
      "architecture": {
        "type": "hybrid",
        "components": [
          {
            "name": "collaborative_filtering",
            "type": "neural_collaborative_filtering",
            "embedding_size": 128,
            "hidden_layers": [256, 128, 64]
          },
          {
            "name": "content_based",
            "type": "deep_content_model",
            "feature_extractors": ["text_cnn", "image_resnet"],
            "fusion_method": "concatenation"
          },
          {
            "name": "popularity_baseline",
            "type": "weighted_popularity",
            "time_decay": 0.95
          }
        ],
        "fusion_weights": [0.5, 0.3, 0.2],
        "ranking_model": {
          "type": "learning_to_rank",
          "loss": "listwise_ranking"
        }
      },
      "training": {
        "negative_sampling_ratio": 4,
        "regularization": {
          "l2": 1e-6,
          "dropout": 0.2
        },
        "batch_size": 512,
        "epochs": 50
      },
      "deployment": {
        "endpoint": "/api/v4/recommend",
        "real_time": true,
        "batch_processing": true,
        "caching": {
          "enabled": true,
          "ttl": "1h",
          "cache_size": "10GB"
        }
      },
      "performance_metrics": {
        "precision_at_10": 0.234,
        "recall_at_10": 0.187,
        "ndcg_at_10": 0.312,
        "coverage": 0.78,
        "diversity": 0.65,
        "inference_latency": "25ms"
      }
    }
  },
  "model_templates": {
    "binary_classification": {
      "description": "Template for binary classification problems",
      "architecture": {
        "layers": [
          {"type": "dense", "units": 64, "activation": "relu"},
          {"type": "dropout", "rate": 0.2},
          {"type": "dense", "units": 32, "activation": "relu"},
          {"type": "dense", "units": 1, "activation": "sigmoid"}
        ]
      },
      "training": {
        "loss": "binary_crossentropy",
        "metrics": ["accuracy", "precision", "recall"]
      }
    },
    "multiclass_classification": {
      "description": "Template for multiclass classification problems",
      "architecture": {
        "layers": [
          {"type": "dense", "units": 128, "activation": "relu"},
          {"type": "dropout", "rate": 0.3},
          {"type": "dense", "units": 64, "activation": "relu"},
          {"type": "dense", "units": "num_classes", "activation": "softmax"}
        ]
      },
      "training": {
        "loss": "sparse_categorical_crossentropy",
        "metrics": ["accuracy"]
      }
    },
    "regression": {
      "description": "Template for regression problems",
      "architecture": {
        "layers": [
          {"type": "dense", "units": 64, "activation": "relu"},
          {"type": "dropout", "rate": 0.2},
          {"type": "dense", "units": 32, "activation": "relu"},
          {"type": "dense", "units": 1, "activation": "linear"}
        ]
      },
      "training": {
        "loss": "mse",
        "metrics": ["mae", "mse"]
      }
    }
  },
  "deployment_environments": {
    "development": {
      "resources": {
        "cpu": "1 core",
        "memory": "2GB"
      },
      "scaling": {
        "min_instances": 1,
        "max_instances": 2
      }
    },
    "staging": {
      "resources": {
        "cpu": "2 cores",
        "memory": "4GB"
      },
      "scaling": {
        "min_instances": 1,
        "max_instances": 5
      }
    },
    "production": {
      "resources": {
        "cpu": "4 cores",
        "memory": "8GB",
        "gpu": "optional"
      },
      "scaling": {
        "min_instances": 2,
        "max_instances": 20
      },
      "monitoring": {
        "enabled": true,
        "alerts": true,
        "logging": "detailed"
      }
    }
  }
}` 
          }
        ];
      case 'manufacture':
        return [
          { 
            name: 'manufacturing_workflow.py', 
            language: 'python', 
            content: `# QUADRAX Manufacturing Playground - Advanced Fine-tuning Workflows
import json
import numpy as np
import pandas as pd
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime
import logging
from dataclasses import dataclass, asdict
from enum import Enum
import uuid

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class NodeType(Enum):
    DATA_SOURCE = "data_source"
    MODEL = "model"
    PROCESSOR = "processor"
    EVALUATOR = "evaluator"
    FEEDBACK = "feedback"
    OUTPUT = "output"

class JobStatus(Enum):
    DRAFT = "draft"
    QUEUED = "queued"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

@dataclass
class WorkflowNode:
    """Represents a node in the manufacturing workflow"""
    id: str
    name: str
    type: NodeType
    position: Tuple[int, int]
    config: Dict[str, Any]
    inputs: List[str]
    outputs: List[str]
    status: str = "idle"
    
    def to_dict(self):
        return asdict(self)

@dataclass
class FeedbackItem:
    """Represents user feedback on manufacturing jobs"""
    id: str
    job_id: str
    user_id: str
    type: str  # 'star', 'thumbs', 'text', 'metric'
    value: Any
    timestamp: datetime
    metadata: Optional[Dict] = None
    
    def to_dict(self):
        data = asdict(self)
        data['timestamp'] = self.timestamp.isoformat()
        return data

class QuadraxManufacturingEngine:
    """Advanced manufacturing engine for ML fine-tuning workflows"""
    
    def __init__(self):
        self.workflows = {}
        self.jobs = {}
        self.feedback_store = {}
        self.node_registry = self._initialize_node_registry()
        
    def _initialize_node_registry(self) -> Dict:
        """Initialize available node types and their configurations"""
        return {
            "data_source": {
                "name": "Data Source",
                "description": "Input data for training/fine-tuning",
                "config_schema": {
                    "source_type": {"type": "select", "options": ["file", "database", "api", "synthetic"]},
                    "file_path": {"type": "text", "required": True},
                    "format": {"type": "select", "options": ["csv", "json", "parquet", "txt"]},
                    "sample_size": {"type": "number", "default": 1000, "min": 100}
                },
                "outputs": ["data"]
            },
            "model": {
                "name": "ML Model",
                "description": "Base model for fine-tuning",
                "config_schema": {
                    "model_type": {"type": "select", "options": ["bert", "gpt", "resnet", "custom"]},
                    "pretrained": {"type": "boolean", "default": True},
                    "model_path": {"type": "text"},
                    "fine_tune_layers": {"type": "number", "default": 3, "min": 1, "max": 12}
                },
                "inputs": ["data"],
                "outputs": ["model"]
            },
            "processor": {
                "name": "Data Processor",
                "description": "Process and transform data",
                "config_schema": {
                    "operation": {"type": "select", "options": ["tokenize", "augment", "filter", "transform"]},
                    "parameters": {"type": "json"},
                    "batch_size": {"type": "number", "default": 32}
                },
                "inputs": ["data"],
                "outputs": ["processed_data"]
            },
            "fine_tuner": {
                "name": "Fine-tuning Engine",
                "description": "Fine-tune models with custom prompts and feedback",
                "config_schema": {
                    "learning_rate": {"type": "number", "default": 2e-5, "min": 1e-6, "max": 1e-3},
                    "epochs": {"type": "number", "default": 3, "min": 1, "max": 20},
                    "batch_size": {"type": "number", "default": 16},
                    "prompt_template": {"type": "textarea", "placeholder": "Enter custom prompt template"},
                    "feedback_integration": {"type": "boolean", "default": True},
                    "validation_split": {"type": "number", "default": 0.2, "min": 0.1, "max": 0.5}
                },
                "inputs": ["model", "processed_data"],
                "outputs": ["fine_tuned_model"]
            },
            "evaluator": {
                "name": "Model Evaluator",
                "description": "Evaluate model performance",
                "config_schema": {
                    "metrics": {"type": "multiselect", "options": ["accuracy", "f1", "bleu", "rouge", "perplexity"]},
                    "test_data": {"type": "text"},
                    "benchmark": {"type": "select", "options": ["custom", "glue", "squad", "coco"]}
                },
                "inputs": ["fine_tuned_model", "test_data"],
                "outputs": ["evaluation_results"]
            },
            "feedback_collector": {
                "name": "Feedback Collector",
                "description": "Collect and process user feedback",
                "config_schema": {
                    "feedback_types": {"type": "multiselect", "options": ["star_rating", "thumbs", "text_review", "comparison"]},
                    "auto_collect": {"type": "boolean", "default": True},
                    "sample_outputs": {"type": "number", "default": 10}
                },
                "inputs": ["fine_tuned_model"],
                "outputs": ["feedback_data"]
            },
            "output": {
                "name": "Output",
                "description": "Final output and deployment",
                "config_schema": {
                    "output_format": {"type": "select", "options": ["model_file", "api_endpoint", "container", "report"]},
                    "deployment_target": {"type": "select", "options": ["local", "cloud", "edge"]},
                    "monitoring": {"type": "boolean", "default": True}
                },
                "inputs": ["fine_tuned_model", "evaluation_results"],
                "outputs": []
            }
        }
    
    def create_workflow(self, name: str, description: str, user_id: str) -> str:
        """Create a new manufacturing workflow"""
        workflow_id = str(uuid.uuid4())
        
        workflow = {
            "id": workflow_id,
            "name": name,
            "description": description,
            "user_id": user_id,
            "nodes": [],
            "connections": [],
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
            "version": "1.0"
        }
        
        self.workflows[workflow_id] = workflow
        logger.info(f"Created workflow '{name}' with ID: {workflow_id}")
        
        return workflow_id
    
    def add_node_to_workflow(self, workflow_id: str, node_type: str, 
                           position: Tuple[int, int], config: Dict = None) -> str:
        """Add a node to the workflow"""
        if workflow_id not in self.workflows:
            raise ValueError(f"Workflow {workflow_id} not found")
        
        if node_type not in self.node_registry:
            raise ValueError(f"Unknown node type: {node_type}")
        
        node_id = str(uuid.uuid4())
        node_info = self.node_registry[node_type]
        
        node = WorkflowNode(
            id=node_id,
            name=f"{node_info['name']} {len(self.workflows[workflow_id]['nodes']) + 1}",
            type=NodeType(node_type),
            position=position,
            config=config or {},
            inputs=[],
            outputs=[]
        )
        
        self.workflows[workflow_id]["nodes"].append(node.to_dict())
        self.workflows[workflow_id]["updated_at"] = datetime.now()
        
        logger.info(f"Added {node_type} node to workflow {workflow_id}")
        return node_id
    
    def connect_nodes(self, workflow_id: str, source_node_id: str, 
                     target_node_id: str, output_port: str = "default", 
                     input_port: str = "default") -> None:
        """Connect two nodes in the workflow"""
        if workflow_id not in self.workflows:
            raise ValueError(f"Workflow {workflow_id} not found")
        
        connection = {
            "id": str(uuid.uuid4()),
            "source": source_node_id,
            "target": target_node_id,
            "source_port": output_port,
            "target_port": input_port
        }
        
        self.workflows[workflow_id]["connections"].append(connection)
        self.workflows[workflow_id]["updated_at"] = datetime.now()
        
        logger.info(f"Connected nodes {source_node_id} -> {target_node_id}")
    
    def create_manufacturing_job(self, workflow_id: str, job_name: str, 
                               user_id: str, priority: str = "normal") -> str:
        """Create a manufacturing job from a workflow"""
        if workflow_id not in self.workflows:
            raise ValueError(f"Workflow {workflow_id} not found")
        
        job_id = str(uuid.uuid4())
        workflow = self.workflows[workflow_id]
        
        job = {
            "id": job_id,
            "name": job_name,
            "workflow_id": workflow_id,
            "user_id": user_id,
            "status": JobStatus.DRAFT.value,
            "priority": priority,
            "progress": 0,
            "created_at": datetime.now(),
            "started_at": None,
            "completed_at": None,
            "error_message": None,
            "metrics": {},
            "outputs": {},
            "feedback_summary": {
                "total_feedback": 0,
                "average_rating": 0,
                "sentiment_score": 0,
                "improvement_suggestions": []
            }
        }
        
        self.jobs[job_id] = job
        logger.info(f"Created manufacturing job '{job_name}' with ID: {job_id}")
        
        return job_id
    
    def start_manufacturing_job(self, job_id: str) -> None:
        """Start executing a manufacturing job"""
        if job_id not in self.jobs:
            raise ValueError(f"Job {job_id} not found")
        
        job = self.jobs[job_id]
        workflow = self.workflows[job["workflow_id"]]
        
        job["status"] = JobStatus.RUNNING.value
        job["started_at"] = datetime.now()
        job["progress"] = 0
        
        logger.info(f"Started manufacturing job {job_id}")
        
        # Simulate job execution with progress updates
        self._execute_workflow(job_id, workflow)
    
    def _execute_workflow(self, job_id: str, workflow: Dict) -> None:
        """Execute the workflow nodes in topological order"""
        job = self.jobs[job_id]
        nodes = workflow["nodes"]
        connections = workflow["connections"]
        
        # Build execution order (simplified topological sort)
        execution_order = self._get_execution_order(nodes, connections)
        
        total_nodes = len(execution_order)
        
        for i, node_id in enumerate(execution_order):
            if job["status"] != JobStatus.RUNNING.value:
                break
                
            node = next(n for n in nodes if n["id"] == node_id)
            
            try:
                # Execute node
                result = self._execute_node(node, job_id)
                job["outputs"][node_id] = result
                
                # Update progress
                job["progress"] = int(((i + 1) / total_nodes) * 100)
                
                logger.info(f"Completed node {node['name']} in job {job_id}")
                
            except Exception as e:
                job["status"] = JobStatus.FAILED.value
                job["error_message"] = str(e)
                logger.error(f"Node execution failed in job {job_id}: {e}")
                return
        
        # Job completed successfully
        job["status"] = JobStatus.COMPLETED.value
        job["completed_at"] = datetime.now()
        job["progress"] = 100
        
        # Generate final metrics
        self._generate_job_metrics(job_id)
        
        logger.info(f"Manufacturing job {job_id} completed successfully")
    
    def _get_execution_order(self, nodes: List[Dict], connections: List[Dict]) -> List[str]:
        """Get the execution order of nodes (topological sort)"""
        # Simplified implementation - in practice, use proper topological sort
        node_ids = [node["id"] for node in nodes]
        
        # For demo, return nodes in order they were added
        return node_ids
    
    def _execute_node(self, node: Dict, job_id: str) -> Dict:
        """Execute a single node in the workflow"""
        node_type = node["type"]
        config = node["config"]
        
        # Simulate node execution based on type
        if node_type == "data_source":
            return self._execute_data_source(config)
        elif node_type == "model":
            return self._execute_model_node(config)
        elif node_type == "processor":
            return self._execute_processor(config)
        elif node_type == "fine_tuner":
            return self._execute_fine_tuner(config, job_id)
        elif node_type == "evaluator":
            return self._execute_evaluator(config)
        elif node_type == "feedback_collector":
            return self._execute_feedback_collector(config, job_id)
        elif node_type == "output":
            return self._execute_output(config)
        else:
            raise ValueError(f"Unknown node type: {node_type}")
    
    def _execute_data_source(self, config: Dict) -> Dict:
        """Execute data source node"""
        # Simulate data loading
        return {
            "type": "dataset",
            "size": config.get("sample_size", 1000),
            "format": config.get("format", "csv"),
            "columns": ["text", "label"],
            "quality_score": np.random.uniform(0.8, 0.95)
        }
    
    def _execute_model_node(self, config: Dict) -> Dict:
        """Execute model node"""
        # Simulate model loading
        return {
            "type": "model",
            "model_type": config.get("model_type", "bert"),
            "parameters": np.random.randint(100000000, 500000000),
            "size_mb": np.random.randint(100, 1000),
            "accuracy": np.random.uniform(0.7, 0.9)
        }
    
    def _execute_processor(self, config: Dict) -> Dict:
        """Execute processor node"""
        # Simulate data processing
        return {
            "type": "processed_data",
            "operation": config.get("operation", "tokenize"),
            "processed_samples": np.random.randint(800, 1200),
            "processing_time": np.random.uniform(10, 60)
        }
    
    def _execute_fine_tuner(self, config: Dict, job_id: str) -> Dict:
        """Execute fine-tuning node with feedback integration"""
        # Simulate fine-tuning process
        epochs = config.get("epochs", 3)
        learning_rate = config.get("learning_rate", 2e-5)
        
        # Simulate training metrics
        training_history = []
        for epoch in range(epochs):
            loss = np.random.uniform(0.1, 0.5) * (0.8 ** epoch)
            accuracy = np.random.uniform(0.8, 0.95) + (epoch * 0.02)
            training_history.append({
                "epoch": epoch + 1,
                "loss": loss,
                "accuracy": min(accuracy, 0.98),
                "learning_rate": learning_rate
            })
        
        # Integrate feedback if available
        feedback_boost = 0
        if config.get("feedback_integration", True):
            job_feedback = self.get_job_feedback(job_id)
            if job_feedback:
                avg_rating = np.mean([f.value for f in job_feedback if f.type == "star"])
                feedback_boost = (avg_rating - 3) * 0.02  # Boost based on rating
        
        final_accuracy = training_history[-1]["accuracy"] + feedback_boost
        
        return {
            "type": "fine_tuned_model",
            "training_history": training_history,
            "final_accuracy": min(final_accuracy, 0.99),
            "epochs_completed": epochs,
            "feedback_integrated": config.get("feedback_integration", True),
            "model_size_mb": np.random.randint(200, 800)
        }
    
    def _execute_evaluator(self, config: Dict) -> Dict:
        """Execute evaluator node"""
        # Simulate model evaluation
        metrics = config.get("metrics", ["accuracy", "f1"])
        results = {}
        
        for metric in metrics:
            if metric == "accuracy":
                results[metric] = np.random.uniform(0.85, 0.95)
            elif metric == "f1":
                results[metric] = np.random.uniform(0.82, 0.93)
            elif metric == "bleu":
                results[metric] = np.random.uniform(0.3, 0.6)
            elif metric == "rouge":
                results[metric] = np.random.uniform(0.4, 0.7)
            else:
                results[metric] = np.random.uniform(0.5, 0.9)
        
        return {
            "type": "evaluation_results",
            "metrics": results,
            "benchmark": config.get("benchmark", "custom"),
            "test_samples": np.random.randint(100, 500)
        }
    
    def _execute_feedback_collector(self, config: Dict, job_id: str) -> Dict:
        """Execute feedback collector node"""
        # Simulate feedback collection
        feedback_types = config.get("feedback_types", ["star_rating", "thumbs"])
        
        collected_feedback = {
            "total_responses": np.random.randint(10, 50),
            "feedback_types": feedback_types,
            "average_rating": np.random.uniform(3.5, 4.8),
            "positive_ratio": np.random.uniform(0.7, 0.9),
            "response_rate": np.random.uniform(0.6, 0.85)
        }
        
        return {
            "type": "feedback_data",
            "collected_feedback": collected_feedback,
            "auto_collected": config.get("auto_collect", True)
        }
    
    def _execute_output(self, config: Dict) -> Dict:
        """Execute output node"""
        # Simulate output generation
        return {
            "type": "output",
            "format": config.get("output_format", "model_file"),
            "deployment_target": config.get("deployment_target", "cloud"),
            "monitoring_enabled": config.get("monitoring", True),
            "endpoint_url": f"https://api.quadrax-ml.com/v1/models/{uuid.uuid4()}",
            "deployment_time": np.random.uniform(30, 120)
        }
    
    def _generate_job_metrics(self, job_id: str) -> None:
        """Generate comprehensive metrics for completed job"""
        job = self.jobs[job_id]
        
        # Calculate overall metrics from node outputs
        metrics = {
            "execution_time": (job["completed_at"] - job["started_at"]).total_seconds(),
            "nodes_executed": len(job["outputs"]),
            "success_rate": 1.0,  # Since job completed
            "resource_utilization": {
                "cpu_hours": np.random.uniform(0.5, 5.0),
                "memory_gb_hours": np.random.uniform(2, 20),
                "gpu_hours": np.random.uniform(0, 2)
            },
            "cost_estimate": np.random.uniform(5, 50),
            "quality_score": np.random.uniform(0.85, 0.98)
        }
        
        # Extract model performance metrics
        for node_output in job["outputs"].values():
            if node_output.get("type") == "fine_tuned_model":
                metrics["model_accuracy"] = node_output.get("final_accuracy", 0)
            elif node_output.get("type") == "evaluation_results":
                metrics.update(node_output.get("metrics", {}))
        
        job["metrics"] = metrics
    
    def add_feedback(self, job_id: str, user_id: str, feedback_type: str, 
                    value: Any, metadata: Dict = None) -> str:
        """Add feedback to a manufacturing job"""
        if job_id not in self.jobs:
            raise ValueError(f"Job {job_id} not found")
        
        feedback_id = str(uuid.uuid4())
        feedback = FeedbackItem(
            id=feedback_id,
            job_id=job_id,
            user_id=user_id,
            type=feedback_type,
            value=value,
            timestamp=datetime.now(),
            metadata=metadata
        )
        
        if job_id not in self.feedback_store:
            self.feedback_store[job_id] = []
        
        self.feedback_store[job_id].append(feedback)
        
        # Update job feedback summary
        self._update_feedback_summary(job_id)
        
        logger.info(f"Added {feedback_type} feedback to job {job_id}")
        return feedback_id
    
    def _update_feedback_summary(self, job_id: str) -> None:
        """Update the feedback summary for a job"""
        job = self.jobs[job_id]
        feedback_list = self.feedback_store.get(job_id, [])
        
        if not feedback_list:
            return
        
        # Calculate summary statistics
        star_ratings = [f.value for f in feedback_list if f.type == "star"]
        thumbs_feedback = [f.value for f in feedback_list if f.type == "thumbs"]
        text_feedback = [f.value for f in feedback_list if f.type == "text"]
        
        summary = {
            "total_feedback": len(feedback_list),
            "average_rating": np.mean(star_ratings) if star_ratings else 0,
            "positive_thumbs": sum(1 for t in thumbs_feedback if t == "up"),
            "negative_thumbs": sum(1 for t in thumbs_feedback if t == "down"),
            "text_reviews": len(text_feedback),
            "sentiment_score": np.random.uniform(0.6, 0.9),  # Simulated sentiment analysis
            "improvement_suggestions": self._extract_suggestions(text_feedback)
        }
        
        job["feedback_summary"] = summary
    
    def _extract_suggestions(self, text_feedback: List[str]) -> List[str]:
        """Extract improvement suggestions from text feedback"""
        # Simulated suggestion extraction
        suggestions = [
            "Reduce training time",
            "Improve model accuracy",
            "Add more validation metrics",
            "Better progress tracking",
            "Enhanced error messages"
        ]
        
        return suggestions[:np.random.randint(1, 4)]
    
    def get_job_feedback(self, job_id: str) -> List[FeedbackItem]:
        """Get all feedback for a job"""
        return self.feedback_store.get(job_id, [])
    
    def get_job_status(self, job_id: str) -> Dict:
        """Get current status of a manufacturing job"""
        if job_id not in self.jobs:
            raise ValueError(f"Job {job_id} not found")
        
        job = self.jobs[job_id]
        return {
            "id": job_id,
            "status": job["status"],
            "progress": job["progress"],
            "metrics": job.get("metrics", {}),
            "feedback_summary": job.get("feedback_summary", {}),
            "error_message": job.get("error_message")
        }
    
    def export_workflow(self, workflow_id: str) -> Dict:
        """Export workflow configuration"""
        if workflow_id not in self.workflows:
            raise ValueError(f"Workflow {workflow_id} not found")
        
        workflow = self.workflows[workflow_id].copy()
        workflow["created_at"] = workflow["created_at"].isoformat()
        workflow["updated_at"] = workflow["updated_at"].isoformat()
        
        return workflow
    
    def import_workflow(self, workflow_data: Dict, user_id: str) -> str:
        """Import workflow from configuration"""
        workflow_id = str(uuid.uuid4())
        
        workflow_data["id"] = workflow_id
        workflow_data["user_id"] = user_id
        workflow_data["created_at"] = datetime.now()
        workflow_data["updated_at"] = datetime.now()
        
        self.workflows[workflow_id] = workflow_data
        
        logger.info(f"Imported workflow with ID: {workflow_id}")
        return workflow_id

# Example usage and workflow templates
if __name__ == "__main__":
    engine = QuadraxManufacturingEngine()
    
    # Create a sample fine-tuning workflow
    workflow_id = engine.create_workflow(
        "Sentiment Analysis Fine-tuning",
        "Fine-tune BERT for customer sentiment analysis with feedback integration",
        "user123"
    )
    
    # Add nodes to workflow
    data_node = engine.add_node_to_workflow(workflow_id, "data_source", (100, 100), {
        "source_type": "file",
        "file_path": "customer_reviews.csv",
        "format": "csv",
        "sample_size": 5000
    })
    
    model_node = engine.add_node_to_workflow(workflow_id, "model", (300, 100), {
        "model_type": "bert",
        "pretrained": True,
        "fine_tune_layers": 3
    })
    
    processor_node = engine.add_node_to_workflow(workflow_id, "processor", (200, 200), {
        "operation": "tokenize",
        "batch_size": 32
    })
    
    fine_tuner_node = engine.add_node_to_workflow(workflow_id, "fine_tuner", (400, 200), {
        "learning_rate": 2e-5,
        "epochs": 5,
        "batch_size": 16,
        "prompt_template": "Analyze the sentiment of this review: {text}",
        "feedback_integration": True
    })
    
    evaluator_node = engine.add_node_to_workflow(workflow_id, "evaluator", (500, 300), {
        "metrics": ["accuracy", "f1"],
        "benchmark": "custom"
    })
    
    feedback_node = engine.add_node_to_workflow(workflow_id, "feedback_collector", (600, 200), {
        "feedback_types": ["star_rating", "thumbs", "text_review"],
        "auto_collect": True,
        "sample_outputs": 20
    })
    
    output_node = engine.add_node_to_workflow(workflow_id, "output", (700, 300), {
        "output_format": "api_endpoint",
        "deployment_target": "cloud",
        "monitoring": True
    })
    
    # Connect nodes
    engine.connect_nodes(workflow_id, data_node, processor_node)
    engine.connect_nodes(workflow_id, model_node, fine_tuner_node)
    engine.connect_nodes(workflow_id, processor_node, fine_tuner_node)
    engine.connect_nodes(workflow_id, fine_tuner_node, evaluator_node)
    engine.connect_nodes(workflow_id, fine_tuner_node, feedback_node)
    engine.connect_nodes(workflow_id, evaluator_node, output_node)
    
    print("🏭 QUADRAX Manufacturing Engine ready!")
    print(f"Sample workflow created: {workflow_id}")
    print("Features:")
    print("- Drag-and-drop workflow builder")
    print("- Advanced fine-tuning with feedback integration")
    print("- Real-time progress tracking")
    print("- Comprehensive evaluation metrics")
    print("- Multi-modal feedback collection (stars, thumbs, text)")
    print("- Automated deployment and monitoring")` 
          },
          { 
            name: 'feedback_system.py', 
            language: 'python', 
            content: `# Advanced Feedback System for QUADRAX Manufacturing
import json
import numpy as np
import pandas as pd
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime, timedelta
from dataclasses import dataclass, asdict
from enum import Enum
import uuid
import logging
from collections import defaultdict
import statistics

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FeedbackType(Enum):
    STAR_RATING = "star_rating"
    THUMBS = "thumbs"
    TEXT_REVIEW = "text_review"
    COMPARISON = "comparison"
    METRIC_SCORE = "metric_score"
    SLIDER_SCALE = "slider_scale"

class SentimentType(Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"
    NEUTRAL = "neutral"

@dataclass
class FeedbackItem:
    """Comprehensive feedback item with metadata"""
    id: str
    job_id: str
    user_id: str
    type: FeedbackType
    value: Any
    timestamp: datetime
    context: Optional[Dict] = None
    metadata: Optional[Dict] = None
    processed: bool = False
    sentiment: Optional[SentimentType] = None
    confidence: Optional[float] = None
    
    def to_dict(self):
        data = asdict(self)
        data['timestamp'] = self.timestamp.isoformat()
        data['type'] = self.type.value
        if self.sentiment:
            data['sentiment'] = self.sentiment.value
        return data

@dataclass
class FeedbackAnalytics:
    """Analytics results for feedback data"""
    total_feedback: int
    feedback_by_type: Dict[str, int]
    average_rating: float
    sentiment_distribution: Dict[str, float]
    trends: Dict[str, List[float]]
    insights: List[str]
    recommendations: List[str]
    quality_score: float

class QuadraxFeedbackSystem:
    """Advanced feedback collection and analysis system"""
    
    def __init__(self):
        self.feedback_store = defaultdict(list)
        self.analytics_cache = {}
        self.feedback_templates = self._initialize_templates()
        self.sentiment_keywords = self._initialize_sentiment_keywords()
        
    def _initialize_templates(self) -> Dict:
        """Initialize feedback collection templates"""
        return {
            "model_performance": {
                "title": "Rate Model Performance",
                "description": "How well did this model perform on your task?",
                "feedback_types": [
                    {
                        "type": "star_rating",
                        "label": "Overall Performance",
                        "min": 1,
                        "max": 5,
                        "required": True
                    },
                    {
                        "type": "slider_scale",
                        "label": "Accuracy",
                        "min": 0,
                        "max": 100,
                        "unit": "%"
                    },
                    {
                        "type": "slider_scale",
                        "label": "Speed",
                        "min": 0,
                        "max": 100,
                        "unit": "%"
                    },
                    {
                        "type": "text_review",
                        "label": "Additional Comments",
                        "placeholder": "Share your thoughts on model performance..."
                    }
                ]
            },
            "fine_tuning_quality": {
                "title": "Fine-tuning Results",
                "description": "How satisfied are you with the fine-tuning results?",
                "feedback_types": [
                    {
                        "type": "star_rating",
                        "label": "Fine-tuning Quality",
                        "min": 1,
                        "max": 5,
                        "required": True
                    },
                    {
                        "type": "thumbs",
                        "label": "Would you recommend this approach?",
                        "options": ["up", "down"]
                    },
                    {
                        "type": "comparison",
                        "label": "Compared to baseline model",
                        "options": ["much_better", "better", "same", "worse", "much_worse"]
                    },
                    {
                        "type": "text_review",
                        "label": "Improvement Suggestions",
                        "placeholder": "How could we improve the fine-tuning process?"
                    }
                ]
            },
            "user_experience": {
                "title": "User Experience",
                "description": "Rate your experience using the manufacturing playground",
                "feedback_types": [
                    {
                        "type": "star_rating",
                        "label": "Ease of Use",
                        "min": 1,
                        "max": 5
                    },
                    {
                        "type": "star_rating",
                        "label": "Feature Completeness",
                        "min": 1,
                        "max": 5
                    },
                    {
                        "type": "slider_scale",
                        "label": "Learning Curve",
                        "min": 0,
                        "max": 100,
                        "unit": "% difficulty"
                    },
                    {
                        "type": "text_review",
                        "label": "Feature Requests",
                        "placeholder": "What features would you like to see added?"
                    }
                ]
            },
            "output_quality": {
                "title": "Output Quality Assessment",
                "description": "Evaluate the quality of the generated outputs",
                "feedback_types": [
                    {
                        "type": "star_rating",
                        "label": "Output Relevance",
                        "min": 1,
                        "max": 5
                    },
                    {
                        "type": "star_rating",
                        "label": "Output Accuracy",
                        "min": 1,
                        "max": 5
                    },
                    {
                        "type": "metric_score",
                        "label": "Custom Quality Score",
                        "min": 0,
                        "max": 10,
                        "step": 0.1
                    },
                    {
                        "type": "comparison",
                        "label": "Compared to expectations",
                        "options": ["exceeded", "met", "below", "far_below"]
                    }
                ]
            }
        }
    
    def _initialize_sentiment_keywords(self) -> Dict:
        """Initialize sentiment analysis keywords"""
        return {
            "positive": [
                "excellent", "great", "amazing", "perfect", "outstanding", "impressive",
                "love", "fantastic", "wonderful", "brilliant", "superb", "awesome",
                "helpful", "useful", "effective", "efficient", "fast", "accurate",
                "easy", "intuitive", "smooth", "seamless", "reliable", "stable"
            ],
            "negative": [
                "terrible", "awful", "horrible", "bad", "poor", "disappointing",
                "hate", "frustrating", "annoying", "confusing", "difficult", "slow",
                "inaccurate", "unreliable", "buggy", "broken", "useless", "waste",
                "complicated", "hard", "impossible", "failed", "error", "problem"
            ],
            "neutral": [
                "okay", "fine", "average", "normal", "standard", "typical",
                "acceptable", "reasonable", "moderate", "fair", "decent"
            ]
        }
    
    def collect_feedback(self, job_id: str, user_id: str, template_name: str,
                        feedback_data: Dict, context: Dict = None) -> List[str]:
        """Collect feedback using a predefined template"""
        
        if template_name not in self.feedback_templates:
            raise ValueError(f"Unknown template: {template_name}")
        
        template = self.feedback_templates[template_name]
        feedback_ids = []
        
        for feedback_type_config in template["feedback_types"]:
            feedback_type = feedback_type_config["type"]
            
            if feedback_type in feedback_data:
                feedback_id = self.add_feedback(
                    job_id=job_id,
                    user_id=user_id,
                    feedback_type=FeedbackType(feedback_type),
                    value=feedback_data[feedback_type],
                    context=context,
                    metadata={
                        "template": template_name,
                        "config": feedback_type_config
                    }
                )
                feedback_ids.append(feedback_id)
        
        logger.info(f"Collected {len(feedback_ids)} feedback items for job {job_id}")
        return feedback_ids
    
    def add_feedback(self, job_id: str, user_id: str, feedback_type: FeedbackType,
                    value: Any, context: Dict = None, metadata: Dict = None) -> str:
        """Add individual feedback item"""
        
        feedback_id = str(uuid.uuid4())
        
        feedback = FeedbackItem(
            id=feedback_id,
            job_id=job_id,
            user_id=user_id,
            type=feedback_type,
            value=value,
            timestamp=datetime.now(),
            context=context,
            metadata=metadata
        )
        
        # Process feedback for sentiment and insights
        self._process_feedback(feedback)
        
        self.feedback_store[job_id].append(feedback)
        
        # Invalidate analytics cache
        if job_id in self.analytics_cache:
            del self.analytics_cache[job_id]
        
        logger.info(f"Added {feedback_type.value} feedback for job {job_id}")
        return feedback_id
    
    def _process_feedback(self, feedback: FeedbackItem) -> None:
        """Process feedback for sentiment analysis and insights"""
        
        if feedback.type == FeedbackType.TEXT_REVIEW:
            # Perform sentiment analysis on text
            sentiment, confidence = self._analyze_sentiment(feedback.value)
            feedback.sentiment = sentiment
            feedback.confidence = confidence
        
        elif feedback.type == FeedbackType.STAR_RATING:
            # Convert star rating to sentiment
            if feedback.value >= 4:
                feedback.sentiment = SentimentType.POSITIVE
                feedback.confidence = 0.8
            elif feedback.value <= 2:
                feedback.sentiment = SentimentType.NEGATIVE
                feedback.confidence = 0.8
            else:
                feedback.sentiment = SentimentType.NEUTRAL
                feedback.confidence = 0.6
        
        elif feedback.type == FeedbackType.THUMBS:
            # Convert thumbs to sentiment
            if feedback.value == "up":
                feedback.sentiment = SentimentType.POSITIVE
                feedback.confidence = 0.9
            else:
                feedback.sentiment = SentimentType.NEGATIVE
                feedback.confidence = 0.9
        
        feedback.processed = True
    
    def _analyze_sentiment(self, text: str) -> Tuple[SentimentType, float]:
        """Simple sentiment analysis using keyword matching"""
        
        if not text or not isinstance(text, str):
            return SentimentType.NEUTRAL, 0.5
        
        text_lower = text.lower()
        
        positive_count = sum(1 for word in self.sentiment_keywords["positive"] if word in text_lower)
        negative_count = sum(1 for word in self.sentiment_keywords["negative"] if word in text_lower)
        neutral_count = sum(1 for word in self.sentiment_keywords["neutral"] if word in text_lower)
        
        total_sentiment_words = positive_count + negative_count + neutral_count
        
        if total_sentiment_words == 0:
            return SentimentType.NEUTRAL, 0.5
        
        positive_ratio = positive_count / total_sentiment_words
        negative_ratio = negative_count / total_sentiment_words
        
        if positive_ratio > negative_ratio and positive_ratio > 0.3:
            confidence = min(0.9, 0.5 + positive_ratio)
            return SentimentType.POSITIVE, confidence
        elif negative_ratio > positive_ratio and negative_ratio > 0.3:
            confidence = min(0.9, 0.5 + negative_ratio)
            return SentimentType.NEGATIVE, confidence
        else:
            return SentimentType.NEUTRAL, 0.6
    
    def get_feedback_analytics(self, job_id: str, force_refresh: bool = False) -> FeedbackAnalytics:
        """Get comprehensive analytics for job feedback"""
        
        if job_id in self.analytics_cache and not force_refresh:
            return self.analytics_cache[job_id]
        
        feedback_list = self.feedback_store.get(job_id, [])
        
        if not feedback_list:
            return FeedbackAnalytics(
                total_feedback=0,
                feedback_by_type={},
                average_rating=0,
                sentiment_distribution={},
                trends={},
                insights=[],
                recommendations=[],
                quality_score=0
            )
        
        # Calculate basic metrics
        total_feedback = len(feedback_list)
        feedback_by_type = defaultdict(int)
        
        for feedback in feedback_list:
            feedback_by_type[feedback.type.value] += 1
        
        # Calculate average rating
        star_ratings = [f.value for f in feedback_list if f.type == FeedbackType.STAR_RATING]
        average_rating = statistics.mean(star_ratings) if star_ratings else 0
        
        # Calculate sentiment distribution
        sentiments = [f.sentiment for f in feedback_list if f.sentiment]
        sentiment_distribution = {}
        
        if sentiments:
            total_sentiments = len(sentiments)
            sentiment_distribution = {
                "positive": sum(1 for s in sentiments if s == SentimentType.POSITIVE) / total_sentiments,
                "negative": sum(1 for s in sentiments if s == SentimentType.NEGATIVE) / total_sentiments,
                "neutral": sum(1 for s in sentiments if s == SentimentType.NEUTRAL) / total_sentiments
            }
        
        # Calculate trends (simplified - would use time series analysis in practice)
        trends = self._calculate_trends(feedback_list)
        
        # Generate insights
        insights = self._generate_insights(feedback_list, sentiment_distribution, average_rating)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(feedback_list, insights)
        
        # Calculate overall quality score
        quality_score = self._calculate_quality_score(
            average_rating, sentiment_distribution, total_feedback
        )
        
        analytics = FeedbackAnalytics(
            total_feedback=total_feedback,
            feedback_by_type=dict(feedback_by_type),
            average_rating=average_rating,
            sentiment_distribution=sentiment_distribution,
            trends=trends,
            insights=insights,
            recommendations=recommendations,
            quality_score=quality_score
        )
        
        # Cache results
        self.analytics_cache[job_id] = analytics
        
        return analytics
    
    def _calculate_trends(self, feedback_list: List[FeedbackItem]) -> Dict[str, List[float]]:
        """Calculate feedback trends over time"""
        
        # Group feedback by day
        daily_feedback = defaultdict(list)
        
        for feedback in feedback_list:
            day = feedback.timestamp.date()
            daily_feedback[day].append(feedback)
        
        # Calculate daily averages
        trends = {
            "daily_rating": [],
            "daily_sentiment": [],
            "daily_volume": []
        }
        
        sorted_days = sorted(daily_feedback.keys())
        
        for day in sorted_days:
            day_feedback = daily_feedback[day]
            
            # Average rating for the day
            day_ratings = [f.value for f in day_feedback if f.type == FeedbackType.STAR_RATING]
            avg_rating = statistics.mean(day_ratings) if day_ratings else 0
            trends["daily_rating"].append(avg_rating)
            
            # Sentiment score for the day
            day_sentiments = [f.sentiment for f in day_feedback if f.sentiment]
            if day_sentiments:
                positive_ratio = sum(1 for s in day_sentiments if s == SentimentType.POSITIVE) / len(day_sentiments)
                trends["daily_sentiment"].append(positive_ratio)
            else:
                trends["daily_sentiment"].append(0.5)
            
            # Volume for the day
            trends["daily_volume"].append(len(day_feedback))
        
        return trends
    
    def _generate_insights(self, feedback_list: List[FeedbackItem], 
                          sentiment_distribution: Dict, average_rating: float) -> List[str]:
        """Generate insights from feedback data"""
        
        insights = []
        
        # Rating insights
        if average_rating >= 4.5:
            insights.append("Excellent user satisfaction with consistently high ratings")
        elif average_rating >= 3.5:
            insights.append("Good user satisfaction with room for improvement")
        elif average_rating >= 2.5:
            insights.append("Mixed user feedback indicates significant improvement opportunities")
        else:
            insights.append("Low user satisfaction requires immediate attention")
        
        # Sentiment insights
        if sentiment_distribution.get("positive", 0) > 0.7:
            insights.append("Overwhelmingly positive user sentiment")
        elif sentiment_distribution.get("negative", 0) > 0.4:
            insights.append("High negative sentiment indicates user frustration")
        
        # Volume insights
        total_feedback = len(feedback_list)
        if total_feedback > 50:
            insights.append("High engagement with substantial feedback volume")
        elif total_feedback < 10:
            insights.append("Low feedback volume may indicate user disengagement")
        
        # Text feedback insights
        text_feedback = [f.value for f in feedback_list if f.type == FeedbackType.TEXT_REVIEW]
        if text_feedback:
            common_themes = self._extract_common_themes(text_feedback)
            if common_themes:
                insights.append(f"Common themes in feedback: {', '.join(common_themes[:3])}")
        
        return insights
    
    def _extract_common_themes(self, text_feedback: List[str]) -> List[str]:
        """Extract common themes from text feedback"""
        
        # Simplified theme extraction (would use NLP in practice)
        themes = {
            "performance": ["slow", "fast", "speed", "performance", "latency"],
            "accuracy": ["accurate", "wrong", "correct", "precision", "accuracy"],
            "usability": ["easy", "difficult", "intuitive", "confusing", "user-friendly"],
            "features": ["feature", "functionality", "capability", "option"],
            "reliability": ["reliable", "stable", "crash", "bug", "error"]
        }
        
        theme_counts = defaultdict(int)
        
        for text in text_feedback:
            text_lower = text.lower()
            for theme, keywords in themes.items():
                for keyword in keywords:
                    if keyword in text_lower:
                        theme_counts[theme] += 1
                        break
        
        # Return top themes
        sorted_themes = sorted(theme_counts.items(), key=lambda x: x[1], reverse=True)
        return [theme for theme, count in sorted_themes if count > 0]
    
    def _generate_recommendations(self, feedback_list: List[FeedbackItem], 
                                insights: List[str]) -> List[str]:
        """Generate actionable recommendations based on feedback"""
        
        recommendations = []
        
        # Rating-based recommendations
        star_ratings = [f.value for f in feedback_list if f.type == FeedbackType.STAR_RATING]
        if star_ratings:
            avg_rating = statistics.mean(star_ratings)
            if avg_rating < 3.5:
                recommendations.append("Focus on addressing core user pain points to improve satisfaction")
            if avg_rating < 4.0:
                recommendations.append("Implement user feedback to enhance overall experience")
        
        # Sentiment-based recommendations
        negative_feedback = [f for f in feedback_list if f.sentiment == SentimentType.NEGATIVE]
        if len(negative_feedback) > len(feedback_list) * 0.3:
            recommendations.append("Prioritize resolving issues causing negative user sentiment")
        
        # Text feedback recommendations
        text_feedback = [f.value for f in feedback_list if f.type == FeedbackType.TEXT_REVIEW]
        if text_feedback:
            common_complaints = self._identify_complaints(text_feedback)
            for complaint in common_complaints[:2]:
                recommendations.append(f"Address user concerns about {complaint}")
        
        # Volume-based recommendations
        if len(feedback_list) < 10:
            recommendations.append("Increase feedback collection to gather more user insights")
        
        # Comparison feedback recommendations
        comparison_feedback = [f for f in feedback_list if f.type == FeedbackType.COMPARISON]
        worse_comparisons = [f for f in comparison_feedback if f.value in ["worse", "much_worse", "below", "far_below"]]
        if len(worse_comparisons) > len(comparison_feedback) * 0.4:
            recommendations.append("Investigate why performance is below user expectations")
        
        return recommendations
    
    def _identify_complaints(self, text_feedback: List[str]) -> List[str]:
        """Identify common complaints from text feedback"""
        
        complaint_keywords = {
            "speed": ["slow", "sluggish", "takes forever", "too long"],
            "accuracy": ["wrong", "incorrect", "inaccurate", "mistakes"],
            "usability": ["confusing", "difficult", "hard to use", "complicated"],
            "reliability": ["crashes", "bugs", "errors", "unstable"],
            "features": ["missing", "lacks", "needs", "should have"]
        }
        
        complaint_counts = defaultdict(int)
        
        for text in text_feedback:
            text_lower = text.lower()
            for complaint_type, keywords in complaint_keywords.items():
                for keyword in keywords:
                    if keyword in text_lower:
                        complaint_counts[complaint_type] += 1
                        break
        
        # Return top complaints
        sorted_complaints = sorted(complaint_counts.items(), key=lambda x: x[1], reverse=True)
        return [complaint for complaint, count in sorted_complaints if count > 0]
    
    def _calculate_quality_score(self, average_rating: float, 
                                sentiment_distribution: Dict, total_feedback: int) -> float:
        """Calculate overall quality score based on multiple factors"""
        
        # Base score from average rating (0-100)
        rating_score = (average_rating / 5.0) * 100 if average_rating > 0 else 0
        
        # Sentiment score (0-100)
        positive_ratio = sentiment_distribution.get("positive", 0)
        negative_ratio = sentiment_distribution.get("negative", 0)
        sentiment_score = (positive_ratio - negative_ratio + 1) * 50  # Normalize to 0-100
        
        # Volume score (0-100) - more feedback generally indicates engagement
        volume_score = min(100, (total_feedback / 50) * 100)
        
        # Weighted combination
        quality_score = (
            rating_score * 0.5 +
            sentiment_score * 0.3 +
            volume_score * 0.2
        )
        
        return round(quality_score, 2)
    
    def export_feedback_data(self, job_id: str, format: str = "json") -> str:
        """Export feedback data in specified format"""
        
        feedback_list = self.feedback_store.get(job_id, [])
        
        if format == "json":
            data = {
                "job_id": job_id,
                "export_timestamp": datetime.now().isoformat(),
                "total_feedback": len(feedback_list),
                "feedback_items": [feedback.to_dict() for feedback in feedback_list],
                "analytics": asdict(self.get_feedback_analytics(job_id))
            }
            return json.dumps(data, indent=2)
        
        elif format == "csv":
            # Convert to DataFrame for CSV export
            feedback_data = []
            for feedback in feedback_list:
                row = {
                    "id": feedback.id,
                    "job_id": feedback.job_id,
                    "user_id": feedback.user_id,
                    "type": feedback.type.value,
                    "value": str(feedback.value),
                    "timestamp": feedback.timestamp.isoformat(),
                    "sentiment": feedback.sentiment.value if feedback.sentiment else None,
                    "confidence": feedback.confidence
                }
                feedback_data.append(row)
            
            df = pd.DataFrame(feedback_data)
            return df.to_csv(index=False)
        
        else:
            raise ValueError(f"Unsupported export format: {format}")
    
    def get_feedback_summary(self, job_id: str) -> Dict:
        """Get a concise feedback summary for display"""
        
        analytics = self.get_feedback_analytics(job_id)
        feedback_list = self.feedback_store.get(job_id, [])
        
        # Get recent feedback samples
        recent_feedback = sorted(feedback_list, key=lambda x: x.timestamp, reverse=True)[:5]
        
        summary = {
            "total_feedback": analytics.total_feedback,
            "average_rating": round(analytics.average_rating, 1),
            "quality_score": analytics.quality_score,
            "sentiment_breakdown": {
                "positive": round(analytics.sentiment_distribution.get("positive", 0) * 100, 1),
                "negative": round(analytics.sentiment_distribution.get("negative", 0) * 100, 1),
                "neutral": round(analytics.sentiment_distribution.get("neutral", 0) * 100, 1)
            },
            "top_insights": analytics.insights[:3],
            "key_recommendations": analytics.recommendations[:3],
            "recent_feedback": [
                {
                    "type": f.type.value,
                    "value": f.value,
                    "sentiment": f.sentiment.value if f.sentiment else None,
                    "timestamp": f.timestamp.strftime("%Y-%m-%d %H:%M")
                }
                for f in recent_feedback
            ]
        }
        
        return summary

# Example usage and feedback collection scenarios
if __name__ == "__main__":
    feedback_system = QuadraxFeedbackSystem()
    
    # Example: Collect feedback for a completed fine-tuning job
    job_id = "job_123"
    user_id = "user_456"
    
    # Collect model performance feedback
    feedback_system.collect_feedback(
        job_id=job_id,
        user_id=user_id,
        template_name="model_performance",
        feedback_data={
            "star_rating": 4,
            "slider_scale": 85,  # Accuracy percentage
            "text_review": "Great model performance! The accuracy improved significantly after fine-tuning."
        },
        context={"model_type": "bert", "task": "sentiment_analysis"}
    )
    
    # Collect fine-tuning quality feedback
    feedback_system.collect_feedback(
        job_id=job_id,
        user_id=user_id,
        template_name="fine_tuning_quality",
        feedback_data={
            "star_rating": 5,
            "thumbs": "up",
            "comparison": "better",
            "text_review": "The fine-tuning process was smooth and results exceeded expectations."
        }
    )
    
    # Get analytics
    analytics = feedback_system.get_feedback_analytics(job_id)
    summary = feedback_system.get_feedback_summary(job_id)
    
    print("🎯 QUADRAX Feedback System ready!")
    print(f"Collected feedback for job: {job_id}")
    print(f"Quality Score: {analytics.quality_score}")
    print(f"Average Rating: {analytics.average_rating}")
    print("Features:")
    print("- Multi-modal feedback collection (stars, thumbs, text, sliders)")
    print("- Advanced sentiment analysis")
    print("- Real-time analytics and insights")
    print("- Automated recommendations")
    print("- Trend analysis and reporting")
    print("- Export capabilities (JSON, CSV)")` 
          }
        ];
      case 'codesheets':
        return [
          { 
            name: 'data_analysis.py', 
            language: 'python', 
            content: `# Advanced Data Analysis Notebook for QUADRAX ML
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import warnings
warnings.filterwarnings('ignore')

# Set style for better visualizations
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

print("🔬 QUADRAX ML Advanced Data Analysis Environment")
print("=" * 60)

# Load and explore data
def load_sample_data():
    """Load sample dataset for demonstration"""
    # Generate synthetic customer data for demonstration
    np.random.seed(42)
    n_samples = 5000
    
    data = {
        'customer_id': range(1, n_samples + 1),
        'age': np.random.normal(35, 12, n_samples).astype(int),
        'income': np.random.lognormal(10.5, 0.5, n_samples),
        'purchase_amount': np.random.exponential(100, n_samples),
        'session_duration': np.random.gamma(2, 15, n_samples),
        'page_views': np.random.poisson(8, n_samples),
        'previous_purchases': np.random.negative_binomial(3, 0.3, n_samples),
        'device_type': np.random.choice(['mobile', 'desktop', 'tablet'], n_samples, p=[0.6, 0.3, 0.1]),
        'location': np.random.choice(['urban', 'suburban', 'rural'], n_samples, p=[0.5, 0.3, 0.2]),
        'satisfaction_score': np.random.beta(2, 1, n_samples) * 5
    }
    
    df = pd.DataFrame(data)
    
    # Create target variable based on business logic
    df['customer_value'] = pd.cut(
        df['purchase_amount'] * df['previous_purchases'] + df['income'] * 0.001,
        bins=5,
        labels=['low', 'medium_low', 'medium', 'medium_high', 'high']
    )
    
    # Add some realistic constraints
    df['age'] = np.clip(df['age'], 18, 80)
    df['income'] = np.clip(df['income'], 20000, 200000)
    df['satisfaction_score'] = np.clip(df['satisfaction_score'], 1, 5)
    
    return df

# Load the dataset
print("📊 Loading sample customer dataset...")
df = load_sample_data()
print(f"Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns")
print("\\nDataset Overview:")
print(df.info())

# Basic statistical analysis
print("\\n📈 Statistical Summary:")
print(df.describe())

# Data quality assessment
print("\\n🔍 Data Quality Assessment:")
missing_values = df.isnull().sum()
print(f"Missing values: {missing_values.sum()} total")
print(f"Duplicate rows: {df.duplicated().sum()}")

# Advanced visualizations
print("\\n🎨 Creating Advanced Visualizations...")

# 1. Distribution Analysis
fig, axes = plt.subplots(2, 3, figsize=(18, 12))
fig.suptitle('Customer Data Distribution Analysis', fontsize=16, fontweight='bold')

# Age distribution
sns.histplot(data=df, x='age', kde=True, ax=axes[0,0])
axes[0,0].set_title('Age Distribution')
axes[0,0].axvline(df['age'].mean(), color='red', linestyle='--', label=f'Mean: {df["age"].mean():.1f}')
axes[0,0].legend()

# Income distribution (log scale)
sns.histplot(data=df, x='income', kde=True, ax=axes[0,1])
axes[0,1].set_title('Income Distribution')
axes[0,1].set_xscale('log')

# Purchase amount vs Income
sns.scatterplot(data=df.sample(1000), x='income', y='purchase_amount', 
                hue='customer_value', alpha=0.6, ax=axes[0,2])
axes[0,2].set_title('Purchase Amount vs Income')

# Device type distribution
device_counts = df['device_type'].value_counts()
axes[1,0].pie(device_counts.values, labels=device_counts.index, autopct='%1.1f%%')
axes[1,0].set_title('Device Type Distribution')

# Customer value by location
sns.countplot(data=df, x='location', hue='customer_value', ax=axes[1,1])
axes[1,1].set_title('Customer Value by Location')
axes[1,1].tick_params(axis='x', rotation=45)

# Satisfaction score distribution
sns.boxplot(data=df, x='customer_value', y='satisfaction_score', ax=axes[1,2])
axes[1,2].set_title('Satisfaction Score by Customer Value')
axes[1,2].tick_params(axis='x', rotation=45)

plt.tight_layout()
plt.show()

# 2. Correlation Analysis
print("\\n🔗 Correlation Analysis:")
numeric_cols = df.select_dtypes(include=[np.number]).columns
correlation_matrix = df[numeric_cols].corr()

plt.figure(figsize=(12, 10))
mask = np.triu(np.ones_like(correlation_matrix, dtype=bool))
sns.heatmap(correlation_matrix, mask=mask, annot=True, cmap='coolwarm', 
            center=0, square=True, linewidths=0.5)
plt.title('Feature Correlation Matrix', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

# Find strong correlations
strong_correlations = []
for i in range(len(correlation_matrix.columns)):
    for j in range(i+1, len(correlation_matrix.columns)):
        corr_value = correlation_matrix.iloc[i, j]
        if abs(corr_value) > 0.5:
            strong_correlations.append({
                'feature1': correlation_matrix.columns[i],
                'feature2': correlation_matrix.columns[j],
                'correlation': corr_value
            })

print("Strong correlations (|r| > 0.5):")
for corr in sorted(strong_correlations, key=lambda x: abs(x['correlation']), reverse=True):
    print(f"  {corr['feature1']} ↔ {corr['feature2']}: {corr['correlation']:.3f}")

# 3. Advanced Statistical Analysis
print("\\n📊 Advanced Statistical Analysis:")

# Customer segmentation using clustering
print("\\n🎯 Customer Segmentation Analysis:")

# Prepare data for clustering
clustering_features = ['age', 'income', 'purchase_amount', 'session_duration', 
                      'page_views', 'previous_purchases', 'satisfaction_score']
X_cluster = df[clustering_features].copy()

# Standardize features
scaler = StandardScaler()
X_cluster_scaled = scaler.fit_transform(X_cluster)

# Determine optimal number of clusters using elbow method
inertias = []
k_range = range(2, 11)
for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_cluster_scaled)
    inertias.append(kmeans.inertia_)

# Plot elbow curve
plt.figure(figsize=(10, 6))
plt.plot(k_range, inertias, 'bo-')
plt.xlabel('Number of Clusters (k)')
plt.ylabel('Inertia')
plt.title('Elbow Method for Optimal k')
plt.grid(True, alpha=0.3)
plt.show()

# Perform clustering with optimal k (let's use k=4)
optimal_k = 4
kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
df['cluster'] = kmeans.fit_predict(X_cluster_scaled)

# Analyze clusters
print(f"\\nCluster Analysis (k={optimal_k}):")
cluster_summary = df.groupby('cluster')[clustering_features].mean()
print(cluster_summary.round(2))

# Visualize clusters using PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_cluster_scaled)

plt.figure(figsize=(12, 8))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=df['cluster'], 
                     cmap='viridis', alpha=0.6, s=50)
plt.colorbar(scatter)
plt.xlabel(f'First Principal Component (explained variance: {pca.explained_variance_ratio_[0]:.2%})')
plt.ylabel(f'Second Principal Component (explained variance: {pca.explained_variance_ratio_[1]:.2%})')
plt.title('Customer Segments Visualization (PCA)')

# Add cluster centers
centers_pca = pca.transform(kmeans.cluster_centers_)
plt.scatter(centers_pca[:, 0], centers_pca[:, 1], c='red', marker='x', s=200, linewidths=3)
plt.grid(True, alpha=0.3)
plt.show()

# 4. Predictive Modeling
print("\\n🤖 Predictive Modeling:")

# Prepare data for machine learning
# Encode categorical variables
le_device = LabelEncoder()
le_location = LabelEncoder()
le_target = LabelEncoder()

df_ml = df.copy()
df_ml['device_type_encoded'] = le_device.fit_transform(df_ml['device_type'])
df_ml['location_encoded'] = le_location.fit_transform(df_ml['location'])
df_ml['customer_value_encoded'] = le_target.fit_transform(df_ml['customer_value'])

# Select features for modeling
feature_columns = ['age', 'income', 'purchase_amount', 'session_duration', 
                  'page_views', 'previous_purchases', 'satisfaction_score',
                  'device_type_encoded', 'location_encoded']

X = df_ml[feature_columns]
y = df_ml['customer_value_encoded']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, 
                                                    random_state=42, stratify=y)

# Scale features
scaler_ml = StandardScaler()
X_train_scaled = scaler_ml.fit_transform(X_train)
X_test_scaled = scaler_ml.transform(X_test)

# Train multiple models
models = {
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, random_state=42),
    'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000)
}

model_results = {}

for name, model in models.items():
    print(f"\\nTraining {name}...")
    
    # Use scaled data for Logistic Regression, original for tree-based models
    if name == 'Logistic Regression':
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
        y_pred_proba = model.predict_proba(X_test_scaled)
    else:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)
    
    # Calculate metrics
    accuracy = (y_pred == y_test).mean()
    auc_score = roc_auc_score(y_test, y_pred_proba, multi_class='ovr')
    
    model_results[name] = {
        'model': model,
        'accuracy': accuracy,
        'auc_score': auc_score,
        'predictions': y_pred,
        'probabilities': y_pred_proba
    }
    
    print(f"Accuracy: {accuracy:.4f}")
    print(f"AUC Score: {auc_score:.4f}")
    
    # Classification report
    print("\\nClassification Report:")
    target_names = le_target.classes_
    print(classification_report(y_test, y_pred, target_names=target_names))

# Model comparison
print("\\n📊 Model Comparison:")
comparison_df = pd.DataFrame({
    'Model': list(model_results.keys()),
    'Accuracy': [results['accuracy'] for results in model_results.values()],
    'AUC Score': [results['auc_score'] for results in model_results.values()]
})

print(comparison_df.round(4))

# Visualize model comparison
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

# Accuracy comparison
bars1 = ax1.bar(comparison_df['Model'], comparison_df['Accuracy'], 
                color=['skyblue', 'lightgreen', 'lightcoral'])
ax1.set_title('Model Accuracy Comparison')
ax1.set_ylabel('Accuracy')
ax1.set_ylim(0, 1)
for bar, acc in zip(bars1, comparison_df['Accuracy']):
    ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01, 
             f'{acc:.3f}', ha='center', va='bottom')

# AUC Score comparison
bars2 = ax2.bar(comparison_df['Model'], comparison_df['AUC Score'], 
                color=['skyblue', 'lightgreen', 'lightcoral'])
ax2.set_title('Model AUC Score Comparison')
ax2.set_ylabel('AUC Score')
ax2.set_ylim(0, 1)
for bar, auc in zip(bars2, comparison_df['AUC Score']):
    ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01, 
             f'{auc:.3f}', ha='center', va='bottom')

plt.tight_layout()
plt.show()

# Feature importance analysis (for Random Forest)
rf_model = model_results['Random Forest']['model']
feature_importance = pd.DataFrame({
    'feature': feature_columns,
    'importance': rf_model.feature_importances_
}).sort_values('importance', ascending=False)

print("\\n🎯 Feature Importance (Random Forest):")
print(feature_importance.round(4))

# Visualize feature importance
plt.figure(figsize=(10, 6))
sns.barplot(data=feature_importance, x='importance', y='feature', palette='viridis')
plt.title('Feature Importance Analysis')
plt.xlabel('Importance Score')
plt.tight_layout()
plt.show()

# 5. Interactive Plotly Visualizations
print("\\n🎨 Creating Interactive Visualizations...")

# Interactive scatter plot
fig_scatter = px.scatter(df.sample(1000), x='income', y='purchase_amount', 
                        color='customer_value', size='satisfaction_score',
                        hover_data=['age', 'session_duration'],
                        title='Customer Analysis: Income vs Purchase Amount',
                        labels={'income': 'Annual Income ($)', 
                               'purchase_amount': 'Purchase Amount ($)'})
fig_scatter.show()

# Interactive correlation heatmap
fig_heatmap = px.imshow(correlation_matrix, 
                       title='Interactive Correlation Matrix',
                       color_continuous_scale='RdBu_r',
                       aspect='auto')
fig_heatmap.show()

# Customer value distribution by demographics
fig_sunburst = px.sunburst(df, path=['location', 'device_type', 'customer_value'],
                          title='Customer Segmentation Hierarchy')
fig_sunburst.show()

# Summary insights
print("\\n💡 Key Insights:")
print("=" * 50)

# Calculate key metrics
high_value_customers = (df['customer_value'] == 'high').sum()
avg_satisfaction = df['satisfaction_score'].mean()
mobile_users = (df['device_type'] == 'mobile').sum()

insights = [
    f"• {high_value_customers} high-value customers identified ({high_value_customers/len(df)*100:.1f}% of total)",
    f"• Average customer satisfaction: {avg_satisfaction:.2f}/5.0",
    f"• Mobile users dominate: {mobile_users/len(df)*100:.1f}% of customers",
    f"• Best performing model: {comparison_df.loc[comparison_df['Accuracy'].idxmax(), 'Model']} "
    f"(Accuracy: {comparison_df['Accuracy'].max():.3f})",
    f"• Top predictive feature: {feature_importance.iloc[0]['feature']} "
    f"(Importance: {feature_importance.iloc[0]['importance']:.3f})",
    f"• {optimal_k} distinct customer segments identified through clustering"
]

for insight in insights:
    print(insight)

print("\\n🎯 Recommendations:")
print("=" * 50)
recommendations = [
    "• Focus marketing efforts on mobile platform optimization",
    "• Develop targeted campaigns for high-value customer segments",
    "• Investigate factors driving customer satisfaction scores",
    "• Implement personalized recommendations based on customer clusters",
    "• Monitor key predictive features for early intervention strategies"
]

for rec in recommendations:
    print(rec)

print("\\n✅ Analysis Complete!")
print("🚀 Ready for model deployment and further experimentation!")` 
          },
          { 
            name: 'ml_experiment.ipynb', 
            language: 'json', 
            content: `{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# QUADRAX ML Advanced Experimentation Notebook\\n",
    "\\n",
    "This notebook contains comprehensive ML experiments including model comparison, hyperparameter tuning, and advanced evaluation techniques."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Import essential libraries\\n",
    "import pandas as pd\\n",
    "import numpy as np\\n",
    "import matplotlib.pyplot as plt\\n",
    "import seaborn as sns\\n",
    "from sklearn.model_selection import GridSearchCV, RandomizedSearchCV, cross_val_score\\n",
    "from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier\\n",
    "from sklearn.linear_model import LogisticRegression\\n",
    "from sklearn.svm import SVC\\n",
    "from sklearn.neural_network import MLPClassifier\\n",
    "from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score\\n",
    "from sklearn.metrics import classification_report, confusion_matrix, roc_curve\\n",
    "from sklearn.preprocessing import StandardScaler, LabelEncoder\\n",
    "from sklearn.feature_selection import SelectKBest, f_classif, RFE\\n",
    "import warnings\\n",
    "warnings.filterwarnings('ignore')\\n",
    "\\n",
    "print('🧪 QUADRAX ML Experimentation Environment Loaded')\\n",
    "print('Ready for advanced machine learning experiments!')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 1. Data Preparation and Feature Engineering"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Load and prepare experimental dataset\\n",
    "def create_experimental_dataset():\\n",
    "    \\\"\\\"\\\"Create a comprehensive dataset for ML experiments\\\"\\\"\\\"\\n",
    "    np.random.seed(42)\\n",
    "    n_samples = 10000\\n",
    "    \\n",
    "    # Generate synthetic features with realistic relationships\\n",
    "    data = {\\n",
    "        'feature_1': np.random.normal(50, 15, n_samples),\\n",
    "        'feature_2': np.random.exponential(2, n_samples),\\n",
    "        'feature_3': np.random.gamma(2, 2, n_samples),\\n",
    "        'feature_4': np.random.beta(2, 5, n_samples) * 100,\\n",
    "        'feature_5': np.random.lognormal(3, 1, n_samples),\\n",
    "        'categorical_1': np.random.choice(['A', 'B', 'C', 'D'], n_samples, p=[0.4, 0.3, 0.2, 0.1]),\\n",
    "        'categorical_2': np.random.choice(['X', 'Y', 'Z'], n_samples, p=[0.5, 0.3, 0.2]),\\n",
    "        'binary_feature': np.random.choice([0, 1], n_samples, p=[0.6, 0.4])\\n",
    "    }\\n",
    "    \\n",
    "    df = pd.DataFrame(data)\\n",
    "    \\n",
    "    # Create target variable with complex relationships\\n",
    "    target_score = (\\n",
    "        df['feature_1'] * 0.3 +\\n",
    "        df['feature_2'] * 0.2 +\\n",
    "        df['feature_3'] * 0.15 +\\n",
    "        df['feature_4'] * 0.1 +\\n",
    "        np.log(df['feature_5']) * 0.25 +\\n",
    "        df['binary_feature'] * 10 +\\n",
    "        np.random.normal(0, 5, n_samples)  # Add noise\\n",
    "    )\\n",
    "    \\n",
    "    # Convert to classification problem\\n",
    "    df['target'] = pd.cut(target_score, bins=3, labels=['Low', 'Medium', 'High'])\\n",
    "    \\n",
    "    return df\\n",
    "\\n",
    "# Create dataset\\n",
    "df_exp = create_experimental_dataset()\\n",
    "print(f'Experimental dataset created: {df_exp.shape}')\\n",
    "print(f'Target distribution:\\\\n{df_exp[\\\"target\\\"].value_counts()}')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 2. Advanced Feature Engineering"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Advanced feature engineering\\n",
    "def engineer_features(df):\\n",
    "    \\\"\\\"\\\"Create advanced features for better model performance\\\"\\\"\\\"\\n",
    "    df_eng = df.copy()\\n",
    "    \\n",
    "    # Polynomial features\\n",
    "    df_eng['feature_1_squared'] = df_eng['feature_1'] ** 2\\n",
    "    df_eng['feature_2_log'] = np.log1p(df_eng['feature_2'])\\n",
    "    df_eng['feature_3_sqrt'] = np.sqrt(df_eng['feature_3'])\\n",
    "    \\n",
    "    # Interaction features\\n",
    "    df_eng['feature_1_x_2'] = df_eng['feature_1'] * df_eng['feature_2']\\n",
    "    df_eng['feature_3_x_4'] = df_eng['feature_3'] * df_eng['feature_4']\\n",
    "    \\n",
    "    # Binning continuous features\\n",
    "    df_eng['feature_1_binned'] = pd.cut(df_eng['feature_1'], bins=5, labels=False)\\n",
    "    df_eng['feature_5_binned'] = pd.qcut(df_eng['feature_5'], q=4, labels=False)\\n",
    "    \\n",
    "    # Ratio features\\n",
    "    df_eng['ratio_1_2'] = df_eng['feature_1'] / (df_eng['feature_2'] + 1e-8)\\n",
    "    df_eng['ratio_3_4'] = df_eng['feature_3'] / (df_eng['feature_4'] + 1e-8)\\n",
    "    \\n",
    "    # Statistical features\\n",
    "    numeric_cols = ['feature_1', 'feature_2', 'feature_3', 'feature_4', 'feature_5']\\n",
    "    df_eng['mean_features'] = df_eng[numeric_cols].mean(axis=1)\\n",
    "    df_eng['std_features'] = df_eng[numeric_cols].std(axis=1)\\n",
    "    df_eng['max_features'] = df_eng[numeric_cols].max(axis=1)\\n",
    "    df_eng['min_features'] = df_eng[numeric_cols].min(axis=1)\\n",
    "    \\n",
    "    return df_eng\\n",
    "\\n",
    "# Apply feature engineering\\n",
    "df_engineered = engineer_features(df_exp)\\n",
    "print(f'Features after engineering: {df_engineered.shape[1] - 1}')  # -1 for target\\n",
    "print(f'New features created: {df_engineered.shape[1] - df_exp.shape[1]}')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 3. Model Comparison Framework"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Comprehensive model comparison\\n",
    "from sklearn.model_selection import StratifiedKFold\\n",
    "from sklearn.pipeline import Pipeline\\n",
    "from sklearn.preprocessing import StandardScaler\\n",
    "import time\\n",
    "\\n",
    "def compare_models(X, y, cv_folds=5):\\n",
    "    \\\"\\\"\\\"Compare multiple ML models with cross-validation\\\"\\\"\\\"\\n",
    "    \\n",
    "    # Define models to compare\\n",
    "    models = {\\n",
    "        'Logistic Regression': Pipeline([\\n",
    "            ('scaler', StandardScaler()),\\n",
    "            ('classifier', LogisticRegression(random_state=42, max_iter=1000))\\n",
    "        ]),\\n",
    "        'Random Forest': RandomForestClassifier(\\n",
    "            n_estimators=100, random_state=42, n_jobs=-1\\n",
    "        ),\\n",
    "        'Gradient Boosting': GradientBoostingClassifier(\\n",
    "            n_estimators=100, random_state=42\\n",
    "        ),\\n",
    "        'SVM': Pipeline([\\n",
    "            ('scaler', StandardScaler()),\\n",
    "            ('classifier', SVC(random_state=42, probability=True))\\n",
    "        ]),\\n",
    "        'Neural Network': Pipeline([\\n",
    "            ('scaler', StandardScaler()),\\n",
    "            ('classifier', MLPClassifier(\\n",
    "                hidden_layer_sizes=(100, 50), random_state=42, max_iter=500\\n",
    "            ))\\n",
    "        ])\\n",
    "    }\\n",
    "    \\n",
    "    # Cross-validation setup\\n",
    "    cv = StratifiedKFold(n_splits=cv_folds, shuffle=True, random_state=42)\\n",
    "    \\n",
    "    results = {}\\n",
    "    \\n",
    "    for name, model in models.items():\\n",
    "        print(f'Evaluating {name}...')\\n",
    "        \\n",
    "        start_time = time.time()\\n",
    "        \\n",
    "        # Cross-validation scores\\n",
    "        cv_scores = cross_val_score(model, X, y, cv=cv, scoring='accuracy', n_jobs=-1)\\n",
    "        cv_precision = cross_val_score(model, X, y, cv=cv, scoring='precision_macro', n_jobs=-1)\\n",
    "        cv_recall = cross_val_score(model, X, y, cv=cv, scoring='recall_macro', n_jobs=-1)\\n",
    "        cv_f1 = cross_val_score(model, X, y, cv=cv, scoring='f1_macro', n_jobs=-1)\\n",
    "        \\n",
    "        training_time = time.time() - start_time\\n",
    "        \\n",
    "        results[name] = {\\n",
    "            'accuracy_mean': cv_scores.mean(),\\n",
    "            'accuracy_std': cv_scores.std(),\\n",
    "            'precision_mean': cv_precision.mean(),\\n",
    "            'precision_std': cv_precision.std(),\\n",
    "            'recall_mean': cv_recall.mean(),\\n",
    "            'recall_std': cv_recall.std(),\\n",
    "            'f1_mean': cv_f1.mean(),\\n",
    "            'f1_std': cv_f1.std(),\\n",
    "            'training_time': training_time,\\n",
    "            'model': model\\n",
    "        }\\n",
    "        \\n",
    "        print(f'  Accuracy: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})')\\n",
    "        print(f'  Training time: {training_time:.2f}s')\\n",
    "    \\n",
    "    return results\\n",
    "\\n",
    "# Prepare data for modeling\\n",
    "# Encode categorical variables\\n",
    "df_model = df_engineered.copy()\\n",
    "le_cat1 = LabelEncoder()\\n",
    "le_cat2 = LabelEncoder()\\n",
    "le_target = LabelEncoder()\\n",
    "\\n",
    "df_model['categorical_1_encoded'] = le_cat1.fit_transform(df_model['categorical_1'])\\n",
    "df_model['categorical_2_encoded'] = le_cat2.fit_transform(df_model['categorical_2'])\\n",
    "df_model['target_encoded'] = le_target.fit_transform(df_model['target'])\\n",
    "\\n",
    "# Select features (exclude original categorical and target)\\n",
    "feature_cols = [col for col in df_model.columns \\n",
    "                if col not in ['categorical_1', 'categorical_2', 'target', 'target_encoded']]\\n",
    "\\n",
    "X = df_model[feature_cols]\\n",
    "y = df_model['target_encoded']\\n",
    "\\n",
    "print(f'Features for modeling: {len(feature_cols)}')\\n",
    "print(f'Samples: {len(X)}')\\n",
    "\\n",
    "# Run model comparison\\n",
    "model_results = compare_models(X, y)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 4. Hyperparameter Optimization"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Advanced hyperparameter tuning\\n",
    "def optimize_hyperparameters(X, y, model_name='Random Forest'):\\n",
    "    \\\"\\\"\\\"Perform comprehensive hyperparameter optimization\\\"\\\"\\\"\\n",
    "    \\n",
    "    if model_name == 'Random Forest':\\n",
    "        model = RandomForestClassifier(random_state=42, n_jobs=-1)\\n",
    "        param_grid = {\\n",
    "            'n_estimators': [50, 100, 200, 300],\\n",
    "            'max_depth': [10, 20, 30, None],\\n",
    "            'min_samples_split': [2, 5, 10],\\n",
    "            'min_samples_leaf': [1, 2, 4],\\n",
    "            'max_features': ['sqrt', 'log2', None]\\n",
    "        }\\n",
    "    \\n",
    "    elif model_name == 'Gradient Boosting':\\n",
    "        model = GradientBoostingClassifier(random_state=42)\\n",
    "        param_grid = {\\n",
    "            'n_estimators': [50, 100, 200],\\n",
    "            'learning_rate': [0.01, 0.1, 0.2],\\n",
    "            'max_depth': [3, 5, 7, 10],\\n",
    "            'subsample': [0.8, 0.9, 1.0],\\n",
    "            'min_samples_split': [2, 5, 10]\\n",
    "        }\\n",
    "    \\n",
    "    elif model_name == 'SVM':\\n",
    "        model = Pipeline([\\n",
    "            ('scaler', StandardScaler()),\\n",
    "            ('classifier', SVC(random_state=42, probability=True))\\n",
    "        ])\\n",
    "        param_grid = {\\n",
    "            'classifier__C': [0.1, 1, 10, 100],\\n",
    "            'classifier__kernel': ['rbf', 'linear', 'poly'],\\n",
    "            'classifier__gamma': ['scale', 'auto', 0.001, 0.01]\\n",
    "        }\\n",
    "    \\n",
    "    else:\\n",
    "        raise ValueError(f'Model {model_name} not supported')\\n",
    "    \\n",
    "    print(f'Optimizing hyperparameters for {model_name}...')\\n",
    "    print(f'Parameter grid size: {np.prod([len(v) for v in param_grid.values()])} combinations')\\n",
    "    \\n",
    "    # Use RandomizedSearchCV for efficiency\\n",
    "    search = RandomizedSearchCV(\\n",
    "        model, param_grid, n_iter=50, cv=5, \\n",
    "        scoring='accuracy', n_jobs=-1, random_state=42, verbose=1\\n",
    "    )\\n",
    "    \\n",
    "    search.fit(X, y)\\n",
    "    \\n",
    "    print(f'Best score: {search.best_score_:.4f}')\\n",
    "    print(f'Best parameters: {search.best_params_}')\\n",
    "    \\n",
    "    return search.best_estimator_, search.best_params_, search.best_score_\\n",
    "\\n",
    "# Optimize top performing models\\n",
    "optimization_results = {}\\n",
    "\\n",
    "# Find best performing model from previous comparison\\n",
    "best_model_name = max(model_results.keys(), \\n",
    "                     key=lambda x: model_results[x]['accuracy_mean'])\\n",
    "\\n",
    "print(f'Best performing model: {best_model_name}')\\n",
    "print(f'Baseline accuracy: {model_results[best_model_name][\\\"accuracy_mean\\\"]:.4f}')\\n",
    "\\n",
    "# Optimize the best model\\n",
    "if best_model_name in ['Random Forest', 'Gradient Boosting', 'SVM']:\\n",
    "    optimized_model, best_params, best_score = optimize_hyperparameters(X, y, best_model_name)\\n",
    "    optimization_results[best_model_name] =  {\\n",
    "        'model': optimized_model,\\n",
    "        'params': best_params,\\n",
    "        'score': best_score\\n",
    "    }\\n",
    "    \\n",
    "    print(f'Improvement: {best_score - model_results[best_model_name][\\\"accuracy_mean\\\"]:.4f}')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 5. Advanced Model Evaluation"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Advanced model evaluation\\n",
    "from sklearn.model_selection import learning_curve\\n",
    "\\n",
    "def evaluate_final_model(model, X, y, test_size=0.2):\\n",
    "    \\\"\\\"\\\"Comprehensive evaluation of the final model\\\"\\\"\\\"\\n",
    "    \\n",
    "    # Split data for final evaluation\\n",
    "    X_train, X_test, y_train, y_test = train_test_split(\\n",
    "        X, y, test_size=test_size, random_state=42, stratify=y\\n",
    "    )\\n",
    "    \\n",
    "    # Train model\\n",
    "    print('Training final model...')\\n",
    "    model.fit(X_train, y_train)\\n",
    "    \\n",
    "    # Make predictions\\n",
    "    y_pred = model.predict(X_test)\\n",
    "    y_pred_proba = model.predict_proba(X_test)\\n",
    "    \\n",
    "    # Calculate metrics\\n",
    "    accuracy = accuracy_score(y_test, y_pred)\\n",
    "    precision = precision_score(y_test, y_pred, average='macro')\\n",
    "    recall = recall_score(y_test, y_pred, average='macro')\\n",
    "    f1 = f1_score(y_test, y_pred, average='macro')\\n",
    "    auc = roc_auc_score(y_test, y_pred_proba, multi_class='ovr')\\n",
    "    \\n",
    "    print(f'Final Model Performance:')\\n",
    "    print(f'  Accuracy:  {accuracy:.4f}')\\n",
    "    print(f'  Precision: {precision:.4f}')\\n",
    "    print(f'  Recall:    {recall:.4f}')\\n",
    "    print(f'  F1 Score:  {f1:.4f}')\\n",
    "    print(f'  AUC Score: {auc:.4f}')\\n",
    "    \\n",
    "    # Classification report\\n",
    "    print('\\nClassification Report:')\\n",
    "    target_names = le_target.classes_\\n",
    "    print(classification_report(y_test, y_pred, target_names=target_names))\\n",
    "    \\n",
    "    # Confusion matrix\\n",
    "    cm = confusion_matrix(y_test, y_pred)\\n",
    "    plt.figure(figsize=(10, 8))\\n",
    "    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', \\n",
    "                xticklabels=target_names, yticklabels=target_names)\\n",
    "    plt.title('Confusion Matrix')\\n",
    "    plt.xlabel('Predicted')\\n",
    "    plt.ylabel('Actual')\\n",
    "    plt.tight_layout()\\n",
    "    plt.show()\\n",
    "    \\n",
    "    # Learning curve\\n",
    "    train_sizes, train_scores, test_scores = learning_curve(\\n",
    "        model, X, y, cv=5, n_jobs=-1, train_sizes=np.linspace(0.1, 1.0, 10),\\n",
    "        scoring='accuracy'\\n",
    "    )\\n",
    "    \\n",
    "    train_mean = np.mean(train_scores, axis=1)\\n",
    "    train_std = np.std(train_scores, axis=1)\\n",
    "    test_mean = np.mean(test_scores, axis=1)\\n",
    "    test_std = np.std(test_scores, axis=1)\\n",
    "    \\n",
    "    plt.figure(figsize=(10, 6))\\n",
    "    plt.plot(train_sizes, train_mean, 'o-', color='r', label='Training score')\\n",
    "    plt.fill_between(train_sizes, train_mean - train_std, train_mean + train_std, alpha=0.1, color='r')\\n",
    "    plt.plot(train_sizes, test_mean, 'o-', color='g', label='Cross-validation score')\\n",
    "    plt.fill_between(train_sizes, test_mean - test_std, test_mean + test_std, alpha=0.1, color='g')\\n",
    "    plt.title('Learning Curve')\\n",
    "    plt.xlabel('Training Examples')\\n",
    "    plt.ylabel('Accuracy Score')\\n",
    "    plt.legend(loc='best')\\n",
    "    plt.grid(True, alpha=0.3)\\n",
    "    plt.show()\\n",
    "    \\n",
    "    # ROC curve for multiclass\\n",
    "    plt.figure(figsize=(10, 8))\\n",
    "    for i, class_name in enumerate(target_names):\\n",
    "        fpr, tpr, _ = roc_curve(\\n",
    "            (y_test == i).astype(int), y_pred_proba[:, i]\\n",
    "        )\\n",
    "        plt.plot(fpr, tpr, label=f'ROC curve for {class_name}')\\n",
    "    \\n",
    "    plt.plot([0, 1], [0, 1], 'k--')\\n",
    "    plt.xlabel('False Positive Rate')\\n",
    "    plt.ylabel('True Positive Rate')\\n",
    "    plt.title('ROC Curve for Each Class')\\n",
    "    plt.legend(loc='best')\\n",
    "    plt.grid(True, alpha=0.3)\\n",
    "    plt.show()\\n",
    "    \\n",
    "    return {\\n",
    "        'model': model,\\n",
    "        'accuracy': accuracy,\\n",
    "        'precision': precision,\\n",
    "        'recall': recall,\\n",
    "        'f1': f1,\\n",
    "        'auc': auc,\\n",
    "        'confusion_matrix': cm,\\n",
    "        'y_test': y_test,\\n",
    "        'y_pred': y_pred,\\n",
    "        'y_pred_proba': y_pred_proba\\n",
    "    }\\n",
    "\\n",
    "# Evaluate the optimized model\\n",
    "if optimization_results:\\n",
    "    best_model_name = list(optimization_results.keys())[0]\\n",
    "    best_model = optimization_results[best_model_name]['model']\\n",
    "    \\n",
    "    print(f'Evaluating optimized {best_model_name} model...')\\n",
    "    final_results = evaluate_final_model(best_model, X, y)\\n",
    "else:\\n",
    "    # Use the best model from comparison if no optimization was done\\n",
    "    best_model_name = max(model_results.keys(), \\n",
    "                         key=lambda x: model_results[x]['accuracy_mean'])\\n",
    "    best_model = model_results[best_model_name]['model']\\n",
    "    \\n",
    "    print(f'Evaluating {best_model_name} model...')\\n",
    "    final_results = evaluate_final_model(best_model, X, y)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 6. Feature Importance and Explainability"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Advanced feature importance analysis\\n",
    "def analyze_feature_importance(model, X, feature_names):\\n",
    "    \\\"\\\"\\\"Analyze feature importance using multiple methods\\\"\\\"\\\"\\n",
    "    \\n",
    "    # Get model type\\n",
    "    if hasattr(model, 'steps'):\\n",
    "        # Handle pipeline\\n",
    "        model_type = type(model.named_steps['classifier']).__name__\\n",
    "        model_obj = model.named_steps['classifier']\\n",
    "    else:\\n",
    "        model_type = type(model).__name__\\n",
    "        model_obj = model\\n",
    "    \\n",
    "    importance_methods = {}\\n",
    "    \\n",
    "    # Method 1: Built-in feature importance (if available)\\n",
    "    if hasattr(model_obj, 'feature_importances_'):\\n",
    "        importance_methods['built_in'] = {\\n",
    "            'name': 'Built-in Feature Importance',\\n",
    "            'values': model_obj.feature_importances_\\n",
    "        }\\n",
    "    elif hasattr(model_obj, 'coef_'):\\n",
    "        # For linear models\\n",
    "        if len(model_obj.coef_.shape) == 1:\\n",
    "            importance_methods['built_in'] = {\\n",
    "                'name': 'Coefficient Magnitude',\\n",
    "                'values': np.abs(model_obj.coef_)\\n",
    "            }\\n",
    "        else:\\n",
    "            # For multiclass, take average of absolute coefficients\\n",
    "            importance_methods['built_in'] = {\\n",
    "                'name': 'Coefficient Magnitude',\\n",
    "                'values': np.mean(np.abs(model_obj.coef_), axis=0)\\n",
    "            }\\n",
    "    \\n",
    "    # Method 2: Permutation importance\\n",
    "    from sklearn.inspection import permutation_importance\\n",
    "    \\n",
    "    # Split data for permutation importance\\n",
    "    X_train, X_test, y_train, y_test = train_test_split(\\n",
    "        X, y, test_size=0.3, random_state=42, stratify=y\\n",
    "    )\\n",
    "    \\n",
    "    # Fit model on training data\\n",
    "    model.fit(X_train, y_train)\\n",
    "    \\n",
    "    # Calculate permutation importance\\n",
    "    perm_importance = permutation_importance(\\n",
    "        model, X_test, y_test, n_repeats=10, random_state=42, n_jobs=-1\\n",
    "    )\\n",
    "    \\n",
    "    importance_methods['permutation'] = {\\n",
    "        'name': 'Permutation Importance',\\n",
    "        'values': perm_importance.importances_mean\\n",
    "    }\\n",
    "    \\n",
    "    # Method 3: SHAP values (simplified)\\n",
    "    try:\\n",
    "        import shap\\n",
    "        \\n",
    "        # Create a small sample for SHAP analysis (for efficiency)\\n",
    "        X_sample = X_test[:100]\\n",
    "        \\n",
    "        # Calculate SHAP values\\n",
    "        if model_type in ['RandomForestClassifier', 'GradientBoostingClassifier']:\\n",
    "            explainer = shap.TreeExplainer(model_obj)\\n",
    "            shap_values = explainer.shap_values(X_sample)\\n",
    "            \\n",
    "            # For multiclass, take average absolute SHAP values across classes\\n",
    "            if isinstance(shap_values, list):\\n",
    "                shap_importance = np.mean([np.abs(sv).mean(axis=0) for sv in shap_values], axis=0)\\n",
    "            else:\\n",
    "                shap_importance = np.abs(shap_values).mean(axis=0)\\n",
    "            \\n",
    "            importance_methods['shap'] = {\\n",
    "                'name': 'SHAP Importance',\\n",
    "                'values': shap_importance,\\n",
    "                'explainer': explainer,\\n",
    "                'sample': X_sample\\n",
    "            }\\n",
    "    except:\\n",
    "        print('SHAP not available, skipping SHAP analysis')\\n",
    "    \\n",
    "    # Visualize feature importance\\n",
    "    plt.figure(figsize=(12, 10))\\n",
    "    \\n",
    "    for i, (method_name, method_data) in enumerate(importance_methods.items()):\\n",
    "        plt.subplot(len(importance_methods), 1, i+1)\\n",
    "        \\n",
    "        # Create DataFrame for plotting\\n",
    "        importance_df = pd.DataFrame({\\n",
    "            'feature': feature_names,\\n",
    "            'importance': method_data['values']\\n",
    "        }).sort_values('importance', ascending=False)\\n",
    "        \\n",
    "        # Plot\\n",
    "        sns.barplot(data=importance_df.head(15), x='importance', y='feature', palette='viridis')\\n",
    "        plt.title(f'{method_data[\\\"name\\\"]}')\\n",
    "        plt.tight_layout()\\n",
    "    \\n",
    "    plt.tight_layout()\\n",
    "    plt.show()\\n",
    "    \\n",
    "    # SHAP summary plot (if available)\\n",
    "    if 'shap' in importance_methods:\\n",
    "        shap.summary_plot(\\n",
    "            importance_methods['shap']['explainer'].shap_values(importance_methods['shap']['sample']),\\n",
    "            importance_methods['shap']['sample'],\\n",
    "            feature_names=feature_names,\\n",
    "            plot_size=(12, 8)\\n",
    "        )\\n",
    "    \\n",
    "    return importance_methods\\n",
    "\\n",
    "# Analyze feature importance for the final model\\n",
    "print('Analyzing feature importance...')\\n",
    "importance_analysis = analyze_feature_importance(final_results['model'], X, feature_cols)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 7. Model Deployment Preparation"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Prepare model for deployment\\n",
    "import pickle\\n",
    "import json\\n",
    "from datetime import datetime\\n",
    "\\n",
    "def prepare_model_for_deployment(model, feature_names, target_encoder, model_name='quadrax_model'):\\n",
    "    \\\"\\\"\\\"Prepare model for deployment with metadata\\\"\\\"\\\"\\n",
    "    \\n",
    "    # Create model package\\n",
    "    model_package = {\\n",
    "        'model': model,\\n",
    "        'metadata': {\\n",
    "            'name': model_name,\\n",
    "            'version': '1.0.0',\\n",
    "            'created_at': datetime.now().isoformat(),\\n",
    "            'feature_names': feature_names,\\n",
    "            'target_classes': target_encoder.classes_.tolist(),\\n",
    "            'performance': {\\n",
    "                'accuracy': float(final_results['accuracy']),\\n",
    "                'precision': float(final_results['precision']),\\n",
    "                'recall': float(final_results['recall']),\\n",
    "                'f1': float(final_results['f1']),\\n",
    "                'auc': float(final_results['auc'])\\n",
    "            }\\n",
    "        }\\n",
    "    }\\n",
    "    \\n",
    "    # Save model package\\n",
    "    model_filename = f'{model_name}_{datetime.now().strftime(\\\"%Y%m%d_%H%M%S\\\")}.pkl'\\n",
    "    with open(model_filename, 'wb') as f:\\n",
    "        pickle.dump(model_package, f)\\n",
    "    \\n",
    "    # Save metadata separately for easy access\\n",
    "    metadata_filename = f'{model_name}_metadata_{datetime.now().strftime(\\\"%Y%m%d_%H%M%S\\\")}.json'\\n",
    "    with open(metadata_filename, 'w') as f:\\n",
    "        json.dump(model_package['metadata'], f, indent=2)\\n",
    "    \\n",
    "    print(f'Model saved as {model_filename}')\\n",
    "    print(f'Metadata saved as {metadata_filename}')\\n",
    "    \\n",
    "    # Create sample prediction code\\n",
    "    prediction_code = f\\\"\\\"\\\"\\n",
    "# Sample code for model inference\\n",
    "import pickle\\n",
    "import pandas as pd\\n",
    "\\n",
    "# Load model package\\n",
    "with open('{model_filename}', 'rb') as f:\\n",
    "    model_package = pickle.load(f)\\n",
    "\\n",
    "model = model_package['model']\\n",
    "metadata = model_package['metadata']\\n",
    "\\n",
    "# Sample inference function\\n",
    "def predict(data):\\n",
    "    \\\"\\\"\\\"Make predictions with the model\\\"\\\"\\\"\\n",
    "    # Ensure data has the correct features\\n",
    "    required_features = metadata['feature_names']\\n",
    "    \\n",
    "    # Convert to DataFrame if it's a dictionary\\n",
    "    if isinstance(data, dict):\\n",
    "        data = pd.DataFrame([data])\\n",
    "    \\n",
    "    # Check for missing features\\n",
    "    missing_features = set(required_features) - set(data.columns)\\n",
    "    if missing_features:\\n",
    "        raise ValueError(f'Missing features: {missing_features}')\\n",
    "    \\n",
    "    # Make prediction\\n",
    "    prediction_idx = model.predict(data[required_features])\\n",
    "    prediction_proba = model.predict_proba(data[required_features])\\n",
    "    \\n",
    "    # Convert to class names\\n",
    "    prediction_class = [metadata['target_classes'][idx] for idx in prediction_idx]\\n",
    "    \\n",
    "    # Create prediction response\\n",
    "    result = {\\n",
    "        'prediction': prediction_class,\\n",
    "        'probabilities': prediction_proba.tolist(),\\n",
    "        'class_names': metadata['target_classes']\\n",
    "    }\\n",
    "    \\n",
    "    return result\\n",
    "\\\"\\\"\\\"\\n",
    "    \\n",
    "    # Save sample code\\n",
    "    code_filename = f'{model_name}_inference_{datetime.now().strftime(\\\"%Y%m%d_%H%M%S\\\")}.py'\\n",
    "    with open(code_filename, 'w') as f:\\n",
    "        f.write(prediction_code)\\n",
    "    \\n",
    "    print(f'Sample inference code saved as {code_filename}')\\n",
    "    \\n",
    "    return model_package\\n",
    "\\n",
    "# Prepare model for deployment\\n",
    "deployment_package = prepare_model_for_deployment(\\n",
    "    final_results['model'], feature_cols, le_target, \\n",
    "    model_name=f'quadrax_{best_model_name.lower().replace(\\\" \\\", \\\"_\\\")}'\\n",
    ")"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 8. Experiment Summary and Insights"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Generate comprehensive experiment summary\\n",
    "def generate_experiment_summary(model_results, final_results, importance_analysis):\\n",
    "    \\\"\\\"\\\"Generate a comprehensive summary of the experiment\\\"\\\"\\\"\\n",
    "    \\n",
    "    print('=' * 80)\\n",
    "    print('🧪 QUADRAX ML EXPERIMENT SUMMARY')\\n",
    "    print('=' * 80)\\n",
    "    \\n",
    "    # Dataset summary\\n",
    "    print('\\n📊 DATASET SUMMARY')\\n",
    "    print(f'Total samples: {len(X)}')\\n",
    "    print(f'Features: {len(feature_cols)}')\\n",
    "    print(f'Target classes: {le_target.classes_.tolist()}')\\n",
    "    print(f'Class distribution: {np.bincount(y)}')\\n",
    "    \\n",
    "    # Model comparison summary\\n",
    "    print('\\n🤖 MODEL COMPARISON')\\n",
    "    comparison_df = pd.DataFrame({\\n",
    "        'Model': list(model_results.keys()),\\n",
    "        'Accuracy': [results['accuracy_mean'] for results in model_results.values()],\\n",
    "        'Precision': [results['precision_mean'] for results in model_results.values()],\\n",
    "        'Recall': [results['recall_mean'] for results in model_results.values()],\\n",
    "        'F1 Score': [results['f1_mean'] for results in model_results.values()],\\n",
    "        'Training Time (s)': [results['training_time'] for results in model_results.values()]\\n",
    "    }).sort_values('Accuracy', ascending=False)\\n",
    "    \\n",
    "    print(comparison_df.round(4))\\n",
    "    \\n",
    "    # Final model performance\\n",
    "    print('\\n🏆 FINAL MODEL PERFORMANCE')\\n",
    "    print(f'Model: {best_model_name}')\\n",
    "    print(f'Accuracy: {final_results[\\\"accuracy\\\"]:.4f}')\\n",
    "    print(f'Precision: {final_results[\\\"precision\\\"]:.4f}')\\n",
    "    print(f'Recall: {final_results[\\\"recall\\\"]:.4f}')\\n",
    "    print(f'F1 Score: {final_results[\\\"f1\\\"]:.4f}')\\n",
    "    print(f'AUC Score: {final_results[\\\"auc\\\"]:.4f}')\\n",
    "    \\n",
    "    # Top features\\n",
    "    print('\\n🔍 TOP FEATURES')\\n",
    "    for method_name, method_data in importance_analysis.items():\\n",
    "        importance_df = pd.DataFrame({\\n",
    "            'feature': feature_cols,\\n",
    "            'importance': method_data['values']\\n",
    "        }).sort_values('importance', ascending=False)\\n",
    "        \\n",
    "        print(f'\\nTop 10 features by {method_data[\\\"name\\\"]}:')\\n",
    "        print(importance_df.head(10).round(4))\\n",
    "    \\n",
    "    # Key insights\\n",
    "    print('\\n💡 KEY INSIGHTS')\\n",
    "    \\n",
    "    # Identify best model\\n",
    "    best_model = comparison_df.iloc[0]['Model']\\n",
    "    print(f'• Best performing model: {best_model} (Accuracy: {comparison_df.iloc[0][\\\"Accuracy\\\"]:.4f})')\\n",
    "    \\n",
    "    # Identify most important features\\n",
    "    if 'permutation' in importance_analysis:\\n",
    "        top_features = pd.DataFrame({\\n",
    "            'feature': feature_cols,\\n",
    "            'importance': importance_analysis['permutation']['values']\\n",
    "        }).sort_values('importance', ascending=False).head(3)['feature'].tolist()\\n",
    "        \\n",
    "        print(f'• Most important features: {\\\"\\\\n  - \\\".join(top_features)}')\\n",
    "    \\n",
    "    # Identify challenging classes\\n",
    "    cm = final_results['confusion_matrix']\\n",
    "    class_accuracy = np.diag(cm) / np.sum(cm, axis=1)\\n",
    "    worst_class_idx = np.argmin(class_accuracy)\\n",
    "    worst_class = le_target.classes_[worst_class_idx]\\n",
    "    \\n",
    "    print(f'• Most challenging class to predict: {worst_class} (Accuracy: {class_accuracy[worst_class_idx]:.4f})')\\n",
    "    \\n",
    "    # Model efficiency\\n",
    "    fastest_model = comparison_df.sort_values('Training Time (s)').iloc[0]['Model']\\n",
    "    print(f'• Most efficient model: {fastest_model} (Training time: {comparison_df[comparison_df[\\\"Model\\\"] == fastest_model][\\\"Training Time (s)\\\"].values[0]:.2f}s)')\\n",
    "    \\n",
    "    # Recommendations\\n",
    "    print('\\n🎯 RECOMMENDATIONS')\\n",
    "    \\n",
    "    # Model selection recommendation\\n",
    "    print(f'• Use {best_model} for production deployment')\\n",
    "    \\n",
    "    # Feature engineering recommendation\\n",
    "    if 'permutation' in importance_analysis:\\n",
    "        low_importance_features = pd.DataFrame({\\n",
    "            'feature': feature_cols,\\n",
    "            'importance': importance_analysis['permutation']['values']\\n",
    "        }).sort_values('importance')\\n",
    "        \\n",
    "        if len(low_importance_features) > 10:\\n",
    "            print(f'• Consider removing low importance features: {\\\"\\\\n  - \\\".join(low_importance_features.head(3)[\\\"feature\\\"].tolist())}')\\n",
    "    \\n",
    "    # Class imbalance recommendation\\n",
    "    class_counts = np.bincount(y)\\n",
    "    if max(class_counts) / min(class_counts) > 2:\\n",
    "        print('• Address class imbalance using techniques like SMOTE or class weights')\\n",
    "    \\n",
    "    # Hyperparameter tuning recommendation\\n",
    "    if optimization_results:\\n",
    "        print('• Use the optimized hyperparameters for production deployment')\\n",
    "    else:\\n",
    "        print('• Consider further hyperparameter optimization for production deployment')\\n",
    "    \\n",
    "    # Ensemble recommendation\\n",
    "    if len(model_results) >= 3:\\n",
    "        print('• Consider creating an ensemble of top 3 models for improved performance')\\n",
    "    \\n",
    "    print('\\n✅ EXPERIMENT COMPLETE')\\n",
    "\\n",
    "# Generate experiment summary\\n",
    "generate_experiment_summary(model_results, final_results, importance_analysis)"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.9.7"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}`
          }
        ];
      default:
        return [
          { name: 'README.md', language: 'markdown', content: `# QUADRAX•ML Project

Welcome to your QUADRAX•ML development environment.

## Enhanced Features

### 🚀 Advanced Dashboard
- Real-time metrics and visualizations
- System resource monitoring
- Activity tracking and analytics

### 🤖 Enhanced AI Assistant
- Voice commands and text-to-speech
- Code generation and execution
- Multi-modal feedback systems
- Context-aware suggestions

### 🏭 Manufacturing Playground
- Drag-and-drop workflow builder
- Fine-tuning with feedback integration
- Star ratings, thumbs up/down, and text reviews
- Real-time progress tracking

### 🔧 Advanced Terminal
- AI/ML-specific commands
- Enhanced output formatting
- Intelligent command suggestions
- Integrated with manufacturing workflows

## Getting Started

1. Explore the enhanced dashboard
2. Try the AI assistant with voice commands
3. Create a manufacturing job with the drag-and-drop interface
4. Use the terminal for advanced ML operations

## Features

- Integrated development environment
- Terminal access with enhanced ML commands
- Advanced file management
- Code execution with real-time feedback
- Manufacturing playground for fine-tuning

Happy coding!` }
        ];
    }
  };

  // Initialize with context files
  useEffect(() => {
    if (isOpen && tabs.length === 0) {
      const contextFiles = getContextFiles();
      const newTabs = contextFiles.map((file, index) => ({
        id: `file-${index}`,
        name: file.name,
        content: file.content,
        language: file.language,
        modified: false
      }));
      setTabs(newTabs);
      if (newTabs.length > 0) {
        setActiveTab(newTabs[0].id);
      }
    }
  }, [isOpen, context]);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  const updateTabContent = (content: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === activeTab 
        ? { ...tab, content, modified: true }
        : tab
    ));
  };

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    } else if (newTabs.length === 0) {
      setActiveTab('');
    }
  };

  const saveFile = () => {
    if (activeTabData) {
      // Simulate file save
      setTabs(prev => prev.map(tab => 
        tab.id === activeTab 
          ? { ...tab, modified: false }
          : tab
      ));
      console.log(`Saved ${activeTabData.name}`);
    }
  };

  const createNewFile = () => {
    const newTab: FileTab = {
      id: `file-${Date.now()}`,
      name: 'untitled.py',
      content: '# New file\n',
      language: 'python',
      modified: false
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const sidebarActions = {
    workshop: [
      { icon: Play, label: 'Run Workstation', action: () => console.log('Run workstation') },
      { icon: Settings, label: 'Configure', action: () => console.log('Configure') },
      { icon: Upload, label: 'Import Project', action: () => console.log('Import') },
      { icon: Download, label: 'Export Project', action: () => console.log('Export') }
    ],
    datakits: [
      { icon: Upload, label: 'Upload Dataset', action: () => console.log('Upload dataset') },
      { icon: Play, label: 'Process Data', action: () => console.log('Process data') },
      { icon: Search, label: 'Validate Data', action: () => console.log('Validate') },
      { icon: Download, label: 'Export Data', action: () => console.log('Export data') }
    ],
    models: [
      { icon: Play, label: 'Train Model', action: () => console.log('Train model') },
      { icon: Upload, label: 'Deploy Model', action: () => console.log('Deploy') },
      { icon: Settings, label: 'Configure', action: () => console.log('Configure') },
      { icon: Download, label: 'Export Model', action: () => console.log('Export model') }
    ],
    manufacture: [
      { icon: Play, label: 'Run Manufacturing', action: () => console.log('Run manufacturing') },
      { icon: Settings, label: 'Configure', action: () => console.log('Configure') },
      { icon: Upload, label: 'Import Workflow', action: () => console.log('Import') },
      { icon: Download, label: 'Export Workflow', action: () => console.log('Export') }
    ],
    codesheets: [
      { icon: Play, label: 'Run Notebook', action: () => console.log('Run notebook') },
      { icon: Upload, label: 'Import Notebook', action: () => console.log('Import') },
      { icon: Download, label: 'Export Notebook', action: () => console.log('Export') },
      { icon: Settings, label: 'Kernel Settings', action: () => console.log('Kernel') }
    ]
  };

  const currentActions = sidebarActions[context as keyof typeof sidebarActions] || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-40 flex">
      {/* Sidebar - 20vw */}
      <div className={`${sidebarCollapsed ? 'w-12' : 'w-[20vw]'} bg-gradient-to-b from-black to-[#005778] border-r border-[#00699a] flex flex-col transition-all duration-300`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#00699a] flex items-center justify-between">
          {!sidebarCollapsed && (
            <h3 className="text-xl font-bold text-white capitalize">{context} Editor</h3>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Folder size={20} />
          </button>
        </div>

        {!sidebarCollapsed && (
          <>
            {/* Primary Actions */}
            <div className="p-4 border-b border-[#00699a]">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                {currentActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center gap-3 p-2 text-white hover:bg-[#00699a] rounded transition-colors duration-300"
                  >
                    <action.icon size={16} className="text-[#00beef]" />
                    <span className="text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* File Explorer */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-300">Files</h4>
                <button
                  onClick={createNewFile}
                  className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
                  title="New File"
                >
                  <FileText size={16} />
                </button>
              </div>
              
              <div className="space-y-1">
                {tabs.map(tab => (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors duration-300 ${
                      activeTab === tab.id ? 'bg-[#00699a] text-white' : 'text-gray-300 hover:bg-[#005778]'
                    }`}
                  >
                    <FileText size={14} />
                    <span className="text-sm flex-1">{tab.name}</span>
                    {tab.modified && <div className="w-2 h-2 bg-[#00beef] rounded-full"></div>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Editor Area - 80vw */}
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className="h-16 bg-gradient-to-r from-black to-[#005778] border-b border-[#00699a] flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Code size={24} className="text-[#00beef]" />
            <h2 className="text-xl font-bold text-white">Code Editor - {context}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 py-1 bg-black border border-[#00699a] text-white text-sm rounded focus:outline-none focus:border-[#00beef]"
              />
            </div>
            
            <button
              onClick={saveFile}
              className="p-2 bg-[#00beef] hover:bg-[#00699a] text-black rounded transition-colors duration-300"
              title="Save File"
            >
              <Save size={16} />
            </button>
            <button
              onClick={() => console.log('Run code')}
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-300"
              title="Run Code"
            >
              <Play size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
              title="Close Editor"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        {tabs.length > 0 && (
          <div className="flex bg-[#005778] border-b border-[#00699a] overflow-x-auto">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-2 border-r border-[#00699a] cursor-pointer transition-colors duration-300 ${
                  activeTab === tab.id ? 'bg-black text-white' : 'text-gray-300 hover:bg-[#00699a]'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="text-sm">{tab.name}</span>
                {tab.modified && <div className="w-1 h-1 bg-[#00beef] rounded-full"></div>}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Editor Content */}
        <div className="flex-1 flex">
          {activeTabData ? (
            <textarea
              ref={editorRef}
              value={activeTabData.content}
              onChange={(e) => updateTabContent(e.target.value)}
              className="flex-1 p-4 bg-black text-white font-mono text-sm resize-none outline-none custom-scrollbar"
              style={{ 
                lineHeight: '1.5',
                tabSize: 2
              }}
              spellCheck={false}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-black">
              <div className="text-center text-gray-400">
                <FileText size={48} className="mx-auto mb-4" />
                <p className="text-lg">No file selected</p>
                <p className="text-sm">Create a new file or select one from the sidebar</p>
              </div>
            </div>
          )}
        </div>

        {/* Editor Footer */}
        <div className="h-8 bg-gradient-to-r from-[#005778] to-black border-t border-[#00699a] flex items-center justify-between px-4 text-xs text-gray-400">
          <span>
            {activeTabData ? `${activeTabData.language} | ${activeTabData.content.split('\n').length} lines` : 'No file open'}
          </span>
          <span>Working Directory: {workingDirectory}</span>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;