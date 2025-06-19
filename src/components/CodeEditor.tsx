import { useState, useRef, useEffect } from 'react';
import { X, Save, Download, Upload, Play, Settings, FileText, Folder, Search, Copy, Undo, Redo, Code } from 'lucide-react';

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

  // Sample files based on context
  const getContextFiles = () => {
    switch (context) {
      case 'workshop':
        return [
          { name: 'main.py', language: 'python', content: '# QUADRAX ML Workshop\nimport tensorflow as tf\nimport numpy as np\n\n# Initialize model\nmodel = tf.keras.Sequential([\n    tf.keras.layers.Dense(128, activation="relu"),\n    tf.keras.layers.Dense(10, activation="softmax")\n])\n\nprint("Workshop environment ready!")' },
          { name: 'config.yaml', language: 'yaml', content: 'workspace:\n  name: quadrax-ml-v_2\n  resources:\n    cpu: 8\n    memory: 32GB\n    storage: 500GB\n  frameworks:\n    - tensorflow\n    - pytorch\n    - scikit-learn' },
          { name: 'requirements.txt', language: 'text', content: 'tensorflow>=2.10.0\npytorch>=1.12.0\nscikit-learn>=1.1.0\npandas>=1.5.0\nnumpy>=1.23.0\nmatplotlib>=3.6.0' }
        ];
      case 'datakits':
        return [
          { name: 'data_processor.py', language: 'python', content: '# Data Processing Pipeline\nimport pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\n\ndef process_dataset(file_path):\n    """Process and clean dataset"""\n    df = pd.read_csv(file_path)\n    \n    # Data cleaning\n    df = df.dropna()\n    \n    # Feature scaling\n    scaler = StandardScaler()\n    numeric_cols = df.select_dtypes(include=[np.number]).columns\n    df[numeric_cols] = scaler.fit_transform(df[numeric_cols])\n    \n    return df\n\nif __name__ == "__main__":\n    processed_data = process_dataset("dataset.csv")\n    print(f"Processed {len(processed_data)} records")' },
          { name: 'data_validation.py', language: 'python', content: '# Data Validation Script\nimport pandas as pd\nimport json\n\ndef validate_schema(df, schema):\n    """Validate dataframe against schema"""\n    errors = []\n    \n    for column, expected_type in schema.items():\n        if column not in df.columns:\n            errors.append(f"Missing column: {column}")\n        elif df[column].dtype != expected_type:\n            errors.append(f"Type mismatch in {column}: expected {expected_type}, got {df[column].dtype}")\n    \n    return errors\n\ndef quality_check(df):\n    """Perform data quality checks"""\n    report = {\n        "total_rows": len(df),\n        "missing_values": df.isnull().sum().to_dict(),\n        "duplicates": df.duplicated().sum(),\n        "quality_score": 0\n    }\n    \n    # Calculate quality score\n    missing_ratio = df.isnull().sum().sum() / (len(df) * len(df.columns))\n    duplicate_ratio = df.duplicated().sum() / len(df)\n    report["quality_score"] = max(0, 100 - (missing_ratio * 50) - (duplicate_ratio * 30))\n    \n    return report' }
        ];
      case 'models':
        return [
          { name: 'model_trainer.py', language: 'python', content: '# Model Training Script\nimport tensorflow as tf\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report\nimport numpy as np\n\nclass ModelTrainer:\n    def __init__(self, model_config):\n        self.config = model_config\n        self.model = None\n        \n    def build_model(self, input_shape, num_classes):\n        """Build neural network model"""\n        self.model = tf.keras.Sequential([\n            tf.keras.layers.Dense(128, activation="relu", input_shape=input_shape),\n            tf.keras.layers.Dropout(0.2),\n            tf.keras.layers.Dense(64, activation="relu"),\n            tf.keras.layers.Dense(num_classes, activation="softmax")\n        ])\n        \n        self.model.compile(\n            optimizer="adam",\n            loss="sparse_categorical_crossentropy",\n            metrics=["accuracy"]\n        )\n        \n    def train(self, X, y, validation_split=0.2, epochs=10):\n        """Train the model"""\n        history = self.model.fit(\n            X, y,\n            validation_split=validation_split,\n            epochs=epochs,\n            batch_size=32,\n            verbose=1\n        )\n        return history\n        \n    def evaluate(self, X_test, y_test):\n        """Evaluate model performance"""\n        predictions = self.model.predict(X_test)\n        predicted_classes = np.argmax(predictions, axis=1)\n        \n        return classification_report(y_test, predicted_classes)' },
          { name: 'model_config.json', language: 'json', content: '{\n  "model_name": "quadrax_classifier_v1",\n  "architecture": {\n    "layers": [\n      {"type": "dense", "units": 128, "activation": "relu"},\n      {"type": "dropout", "rate": 0.2},\n      {"type": "dense", "units": 64, "activation": "relu"},\n      {"type": "dense", "units": 10, "activation": "softmax"}\n    ]\n  },\n  "training": {\n    "optimizer": "adam",\n    "loss": "sparse_categorical_crossentropy",\n    "metrics": ["accuracy"],\n    "epochs": 50,\n    "batch_size": 32,\n    "validation_split": 0.2\n  },\n  "deployment": {\n    "endpoint": "/api/v1/predict",\n    "scaling": {\n      "min_instances": 1,\n      "max_instances": 10\n    }\n  }\n}' }
        ];
      case 'pipelines':
        return [
          { name: 'pipeline_config.yaml', language: 'yaml', content: 'pipeline:\n  name: ml_training_pipeline\n  version: "1.0"\n  \nstages:\n  - name: data_ingestion\n    type: data\n    source: /datakits/customer_data.csv\n    output: /tmp/raw_data\n    \n  - name: data_processing\n    type: transform\n    input: /tmp/raw_data\n    script: data_processor.py\n    output: /tmp/processed_data\n    \n  - name: model_training\n    type: ml\n    input: /tmp/processed_data\n    model_config: model_config.json\n    output: /models/trained_model\n    \n  - name: model_evaluation\n    type: evaluation\n    model: /models/trained_model\n    test_data: /tmp/test_data\n    metrics: [accuracy, precision, recall]\n    \n  - name: deployment\n    type: deploy\n    model: /models/trained_model\n    endpoint: /api/v1/predict\n    \nschedule:\n  type: cron\n  expression: "0 2 * * *"  # Daily at 2 AM\n  \nnotifications:\n  on_success: team@quadrax.com\n  on_failure: alerts@quadrax.com' },
          { name: 'pipeline_runner.py', language: 'python', content: '# Pipeline Execution Engine\nimport yaml\nimport subprocess\nimport logging\nfrom datetime import datetime\nimport json\n\nclass PipelineRunner:\n    def __init__(self, config_path):\n        with open(config_path, "r") as f:\n            self.config = yaml.safe_load(f)\n        \n        self.logger = logging.getLogger(__name__)\n        \n    def execute_stage(self, stage):\n        """Execute a single pipeline stage"""\n        stage_name = stage["name"]\n        stage_type = stage["type"]\n        \n        self.logger.info(f"Executing stage: {stage_name}")\n        \n        try:\n            if stage_type == "data":\n                return self._execute_data_stage(stage)\n            elif stage_type == "transform":\n                return self._execute_transform_stage(stage)\n            elif stage_type == "ml":\n                return self._execute_ml_stage(stage)\n            elif stage_type == "evaluation":\n                return self._execute_evaluation_stage(stage)\n            elif stage_type == "deploy":\n                return self._execute_deploy_stage(stage)\n            else:\n                raise ValueError(f"Unknown stage type: {stage_type}")\n                \n        except Exception as e:\n            self.logger.error(f"Stage {stage_name} failed: {str(e)}")\n            raise\n            \n    def run_pipeline(self):\n        """Execute the complete pipeline"""\n        pipeline_name = self.config["pipeline"]["name"]\n        stages = self.config["stages"]\n        \n        self.logger.info(f"Starting pipeline: {pipeline_name}")\n        start_time = datetime.now()\n        \n        results = []\n        \n        for stage in stages:\n            try:\n                result = self.execute_stage(stage)\n                results.append({\n                    "stage": stage["name"],\n                    "status": "success",\n                    "result": result\n                })\n            except Exception as e:\n                results.append({\n                    "stage": stage["name"],\n                    "status": "failed",\n                    "error": str(e)\n                })\n                break\n        \n        end_time = datetime.now()\n        duration = (end_time - start_time).total_seconds()\n        \n        self.logger.info(f"Pipeline completed in {duration:.2f} seconds")\n        return results' }
        ];
      case 'codesheets':
        return [
          { name: 'data_analysis.py', language: 'python', content: '# Data Analysis Notebook\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report, confusion_matrix\n\n# Load and explore data\ndf = pd.read_csv("dataset.csv")\nprint("Dataset shape:", df.shape)\nprint("\\nDataset info:")\nprint(df.info())\n\n# Data visualization\nplt.figure(figsize=(12, 8))\n\n# Distribution plots\nplt.subplot(2, 2, 1)\nsns.histplot(df["feature1"], kde=True)\nplt.title("Feature 1 Distribution")\n\nplt.subplot(2, 2, 2)\nsns.boxplot(y=df["feature2"])\nplt.title("Feature 2 Box Plot")\n\n# Correlation heatmap\nplt.subplot(2, 2, 3)\ncorr_matrix = df.corr()\nsns.heatmap(corr_matrix, annot=True, cmap="coolwarm")\nplt.title("Correlation Matrix")\n\n# Target distribution\nplt.subplot(2, 2, 4)\nsns.countplot(x=df["target"])\nplt.title("Target Distribution")\n\nplt.tight_layout()\nplt.show()\n\n# Model training\nX = df.drop("target", axis=1)\ny = df["target"]\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Train Random Forest\nrf_model = RandomForestClassifier(n_estimators=100, random_state=42)\nrf_model.fit(X_train, y_train)\n\n# Predictions and evaluation\ny_pred = rf_model.predict(X_test)\nprint("\\nClassification Report:")\nprint(classification_report(y_test, y_pred))\n\n# Feature importance\nfeature_importance = pd.DataFrame({\n    "feature": X.columns,\n    "importance": rf_model.feature_importances_\n}).sort_values("importance", ascending=False)\n\nprint("\\nTop 10 Important Features:")\nprint(feature_importance.head(10))' },
          { name: 'ml_experiment.ipynb', language: 'json', content: '{\n "cells": [\n  {\n   "cell_type": "markdown",\n   "metadata": {},\n   "source": [\n    "# Machine Learning Experiment\\n",\n    "\\n",\n    "This notebook contains experiments for model comparison and hyperparameter tuning."\n   ]\n  },\n  {\n   "cell_type": "code",\n   "execution_count": null,\n   "metadata": {},\n   "outputs": [],\n   "source": [\n    "import pandas as pd\\n",\n    "import numpy as np\\n",\n    "from sklearn.model_selection import GridSearchCV, cross_val_score\\n",\n    "from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier\\n",\n    "from sklearn.svm import SVC\\n",\n    "from sklearn.metrics import accuracy_score, precision_score, recall_score"\n   ]\n  },\n  {\n   "cell_type": "markdown",\n   "metadata": {},\n   "source": [\n    "## Model Comparison"\n   ]\n  },\n  {\n   "cell_type": "code",\n   "execution_count": null,\n   "metadata": {},\n   "outputs": [],\n   "source": [\n    "# Define models to compare\\n",\n    "models = {\\n",\n    "    \\"Random Forest\\": RandomForestClassifier(random_state=42),\\n",\n    "    \\"Gradient Boosting\\": GradientBoostingClassifier(random_state=42),\\n",\n    "    \\"SVM\\": SVC(random_state=42)\\n",\n    "}\\n",\n    "\\n",\n    "# Compare models\\n",\n    "results = {}\\n",\n    "for name, model in models.items():\\n",\n    "    scores = cross_val_score(model, X_train, y_train, cv=5, scoring=\\"accuracy\\")\\n",\n    "    results[name] = {\\n",\n    "        \\"mean_accuracy\\": scores.mean(),\\n",\n    "        \\"std_accuracy\\": scores.std()\\n",\n    "    }\\n",\n    "    print(f\\"{name}: {scores.mean():.4f} (+/- {scores.std() * 2:.4f})\\")"\n   ]\n  }\n ],\n "metadata": {\n  "kernelspec": {\n   "display_name": "Python 3",\n   "language": "python",\n   "name": "python3"\n  },\n  "language_info": {\n   "codemirror_mode": {\n    "name": "ipython",\n    "version": 3\n   },\n   "file_extension": ".py",\n   "mimetype": "text/x-python",\n   "name": "python",\n   "nbconvert_exporter": "python",\n   "pygments_lexer": "ipython3",\n   "version": "3.9.7"\n  }\n },\n "nbformat": 4,\n "nbformat_minor": 4\n}' }
        ];
      default:
        return [
          { name: 'README.md', language: 'markdown', content: '# QUADRAX•ML Project\n\nWelcome to your QUADRAX•ML development environment.\n\n## Getting Started\n\n1. Explore the file structure\n2. Open the terminal for CLI access\n3. Start coding!\n\n## Features\n\n- Integrated development environment\n- Terminal access with Bash and PowerShell\n- File management\n- Code execution\n\nHappy coding!' }
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
    pipelines: [
      { icon: Play, label: 'Run Pipeline', action: () => console.log('Run pipeline') },
      { icon: Settings, label: 'Configure', action: () => console.log('Configure') },
      { icon: Upload, label: 'Deploy Pipeline', action: () => console.log('Deploy') },
      { icon: Download, label: 'Export Config', action: () => console.log('Export') }
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
    <div className="relative inset-0 bg-black z-40 flex">
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