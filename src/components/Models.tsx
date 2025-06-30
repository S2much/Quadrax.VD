// Updated Models.tsx with Device Info Container and Developer Tools Layout

import { useState } from 'react';
import {
  X,
  Brain,
  Settings,
  Play,
  Layers,
  RotateCcw,
  Save,
  Rocket,
  Eye,
  Code,
  Trash2, 
  Power
} from 'lucide-react';
import DeviceInterface from './DeviceInterface';

interface QMLDevice {
  id: string;
  name: string;
  type: 'compact' | 'standard' | 'complex';
  uptime: number;
  requests: number;
  description: string;
  detailedDescription: string;
  isOn: boolean;
  isMaximized: boolean;
}

const variantMap = {
  compact: 'alpha',
  standard: 'beta',
  complex: 'gamma',
} as const;

function Models() {
  const [qmlDevices, setQmlDevices] = useState<QMLDevice[]>([
    {
      id: 'qml-compact-001',
      name: 'Analyzer Pro',
      type: 'compact',
      uptime: 99.2,
      requests: 15420,
      description: 'Real-time sentiment analysis for customer feedback',
      detailedDescription: 'Advanced sentiment analysis QML device featuring real-time emotion detection, multi-language support, and contextual understanding. Perfect for customer service automation, social media monitoring, and feedback analysis.',
      isOn: false,
      isMaximized: false
    },
    {
      id: 'qml-standard-002',
      name: 'Fraudstar',
      type: 'standard',
      uptime: 97.8,
      requests: 8750,
      description: 'Advanced fraud detection with real-time monitoring',
      detailedDescription: 'Enterprise-grade fraud detection QML with advanced pattern recognition, anomaly detection, and risk assessment capabilities. Features real-time transaction monitoring, behavioral analysis, and adaptive learning algorithms that improve over time. Includes comprehensive dashboard with customizable alerts and detailed reporting.',
      isOn: false,
      isMaximized: false
    },
    {
      id: 'qml-complex-003',
      name: 'Duplexity.AI',
      type: 'complex',
      uptime: 99.9,
      requests: 32100,
      description: 'Advanced AI system with vision, language, and reasoning',
      detailedDescription: 'State-of-the-art multi-modal AI QML combining computer vision, natural language processing, and advanced reasoning capabilities. Supports text, image, audio, and video inputs with sophisticated decision-making algorithms and contextual understanding. Features extensive customization options and enterprise-grade security.',
      isOn: false,
      isMaximized: false
    }
  ]);

  const [selectedDevice, setSelectedDevice] = useState<QMLDevice | null>(null);


  const toggleDevicePower = (device: QMLDevice) => {
    setQmlDevices(prev => prev.map(d =>
      d.id === device.id
        ? { ...d, isOn: !d.isOn }
        : d
    ));
    setSelectedDevice({ ...device, isOn: !device.isOn });
  };

  const handleDeviceClick = (device: QMLDevice) => {
    setSelectedDevice(device);
  };

  const DeveloperTools = () => (
    <div className="relative right top-0 h-full w-60 bg-gradient-to-b from-black to-[#005778] border-l border-[#00699a] p-4 overflow-y-auto z-40">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Developer Tools</h3>
        </div>

      {selectedDevice && (
        <div className="space-y-1">
          <div className="bg-black/40 border border-cyan-800 rounded-xl p-1">
            <h4 className="text-lg font-semibold text-cyan-300 mb-1">Active Device</h4>
            <div className="space-y-2 text-sm">
              <div className="flex [overflow:auto]">
                <span className="text-gray-400">Name:</span>
                <span className="text-cyan-200">{selectedDevice.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Power:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedDevice.isOn ? 'bg-green-600' : 'bg-gray-600'
                }`}>
                  {selectedDevice.isOn ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>
          </div>

            <div className="space-y-3">
            {[
              { label: 'Train Model', border: 'border-green-500', icon: <Brain size={16} /> },
              { label: 'Fine Tune', border: 'border-blue-500', icon: <Settings size={16} /> },
              { label: 'Test Model', border: 'border-yellow-500', icon: <Play size={16} /> },
              { label: 'Duplicate', border: 'border-purple-500', icon: <Layers size={16} /> },
              { label: 'Reset Metrics', border: 'border-red-500', icon: <RotateCcw size={16} /> },
              { label: 'Deploy', border: 'border-indigo-500', icon: <Save size={16} /> },
              { label: 'View Logs', border: 'border-gray-500', icon: <Eye size={16} /> },
              { label: 'API Docs', border: 'border-cyan-500', icon: <Code size={16} /> },
              { label: 'Customize', border: 'border-pink-500', icon: <Settings size={16} /> },
            ].map(({ label, border, icon }) => (
              <button
                key={label}
                className={`w-full px-4 py-3 bg-black ${border} border-2 text-white rounded-lg flex items-center gap-3 transition-all duration-300`}
              >
                {icon}
                {label}
            </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-gradient-to-b from-[#006889] to-black text-white p-4">
      <h1 className="text-4xl font-bold mb-6">QML Models</h1>
      <div className="flex justify-between] gap-6">
      <DeveloperTools />
        {qmlDevices.map(device => {
          
          
          // Expanded view
          return (
            <div key={device.id} className="m-auto">
              <DeviceInterface
                name={device.name}
                variant={variantMap[device.type]}
                isOn={device.isOn}
                type={device.type}
                onDeviceClick={() => handleDeviceClick(device)}
                details={
                  <>
                    <div className="mb-2">{device.detailedDescription}</div>
                    <div className="flex">
                      <div>Type: <span className="capitalize">{device.type}</span></div>
                      <div>Uptime: {device.uptime}%</div>
                      <div>Requests: {device.requests.toLocaleString()}</div>
                    </div>
                  </>
                  
                }
                topRightButton={
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleDevicePower(device);
                      setSelectedDevice(device);
                    }}
                    className={`absolute top-[5px] left-[-20px] rounded-lg bg-[#00beef] border-2 border-green-500 text-white flex items-center gap-2 shadow`}
                    title="Power"
                  >
                    <span className="m-auto"><Power size={20} /></span>
                  </button>
                }
              >
                
              </DeviceInterface>
              <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold mb-2">{device.name}</span>
                  <span className="text-sm text-cyan-200 mb-4">{device.description}</span>
                  <div className="flex flex-row w=[50] gap-3 mt-6">
                  
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        // Placeholder for Deploy action
                      }}
                      className="px-4 py-2 rounded-lg font-semibold bg-black border-2 border-indigo-500 text-white flex items-center gap-2"
                    >
                      <Rocket size={25} />
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        // Placeholder for Reset action
                      }}
                      className="px-4 py-2 rounded-lg font-semibold bg-black border-2 border-yellow-500 text-white flex items-center gap-2"
                    >
                      <RotateCcw size={25} />
                    </button>
                    
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedDevice(device);
                        setShowDeveloperTools(true);
                      }}
                      className="px-4 py-2 rounded-lg font-semibold bg-black border-2 border-blue-500 text-white flex items-center gap-2"
                    >
                      <Settings size={25} />
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        // Placeholder for Delete action
                      }}
                      className="px-4 py-0.5 rounded-lg font-semibold bg-black border-2 border-red-500 text-white flex items-center gap-2"
                    >
                      <Trash2 size={25} />
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                      }}
                      className="px-4 py-2 rounded-lg font-semibold bg-black border-2 border-gray-500 text-white flex items-center gap-2"
                    >
                      <X size={25} />
                    </button>
                    </div>
                  </div>
                </div>
            
          );
        })}
      </div>
    </section>
  );
}

export default Models;
