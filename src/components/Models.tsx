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
  Eye,
  Code,
  Trash2
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
  const [showDeveloperTools, setShowDeveloperTools] = useState(false);
  const [expandedDeviceId, setExpandedDeviceId] = useState<string | null>(null);

  const toggleDevicePower = (device: QMLDevice) => {
    setQmlDevices(prev => prev.map(d =>
      d.id === device.id
        ? { ...d, isOn: !d.isOn }
        : d
    ));
    setSelectedDevice({ ...device, isOn: !device.isOn });
    setShowDeveloperTools(true);
  };

  const DeveloperTools = () => (
    <div className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-black to-[#005778] border-l border-[#00699a] p-4 overflow-y-auto z-40">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Developer Tools</h3>
          <button
            onClick={() => setShowDeveloperTools(false)}
          className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"
          >
            <X size={20} />
          </button>
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
    <section className="bg-gradient-to-b from-[#006889] to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">QML Models</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {qmlDevices.map(device => {
          const isExpanded = expandedDeviceId === device.id;
          if (!isExpanded) {
            // Compact view
            return (
              <div
                key={device.id}
                className="bg-gradient-to-br from-black to-[#005778] p-4 rounded-lg border border-[#00699a] shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-cyan-500/20"
                onClick={() => setExpandedDeviceId(device.id)}
              >
                <p className="text-sm text-gray-400 mb-3">{device.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-300">Uptime: {device.uptime}%</span>
                </div>
              </div>
            );
          }
          // Expanded view
          return (
            <div key={device.id} className="flex">
              <DeviceInterface
                name={device.name}
                variant={variantMap[device.type]}
                isOn={device.isOn}
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
                      setShowDeveloperTools(true);
                    }}
                    className={`absolute top-0 left-0 px-3 py-2 rounded-full bg-black border-2 border-green-500 text-white flex items-center gap-2 shadow`}
                    title="Power"
                  >
                    <span className="m-auto">Power</span>
                  </button>
                }
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-2xl font-bold mb-2">{device.name}</span>
                  <span className="text-sm text-cyan-200 mb-4">{device.description}</span>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedDevice(device);
                        setShowDeveloperTools(true);
                      }}
                      className="px-4 py-2 rounded-lg font-semibold bg-black border-2 border-blue-500 text-white flex items-center gap-2"
                    >
                      <Settings size={18} /> Configure
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        // Placeholder for Deploy action
                      }}
                      className="px-4 py-2 rounded-lg font-semibold bg-black border-2 border-indigo-500 text-white flex items-center gap-2"
                    >
                      <Save size={18} /> Deploy
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        // Placeholder for Reset action
                      }}
                      className="px-4 py-2 rounded-lg font-semibold bg-black border-2 border-yellow-500 text-white flex items-center gap-2"
                    >
                      <RotateCcw size={18} /> Reset
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        // Placeholder for Delete action
                      }}
                      className="px-4 py-2 rounded-lg font-semibold bg-black border-2 border-red-500 text-white flex items-center gap-2"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setExpandedDeviceId(null);
                      }}
                      className="px-4 py-2 rounded-lg font-semibold bg-black border-2 border-gray-500 text-white flex items-center gap-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </DeviceInterface>
            </div>
          );
        })}
      </div>
      {showDeveloperTools && <DeveloperTools />}
    </section>
  );
}

export default Models;
