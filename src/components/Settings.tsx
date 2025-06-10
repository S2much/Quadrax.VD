import { useState } from 'react';
import { User, Bell, Shield, Palette, Database, Monitor, Save, RefreshCw, Download, Trash2, Eye, EyeOff } from 'lucide-react';

function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'appearance' | 'data'>('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data & Privacy', icon: Database }
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <section className="p-6 min-h-screen">
      <div className="text-white mb-6">
        <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-black/30 p-4 rounded-lg">
          Settings
        </h2>
        <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-80 bg-black/80 backdrop-blur-sm rounded-lg p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                    activeTab === tab.id
                      ? 'bg-[#00699a] text-white'
                      : 'text-gray-300 hover:bg-[#005778] hover:text-white'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-black/80 backdrop-blur-sm rounded-lg p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Profile Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-4 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                    <input
                      type="text"
                      defaultValue="QUADRAX Technologies"
                      className="w-full px-4 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <select className="w-full px-4 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]">
                      <option>Data Scientist</option>
                      <option>ML Engineer</option>
                      <option>Research Scientist</option>
                      <option>Developer</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                    <h4 className="text-lg font-semibold text-white mb-4">Profile Picture</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-[#00699a] rounded-full flex items-center justify-center">
                        <User size={32} className="text-white" />
                      </div>
                      <div className="space-y-2">
                        <button className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300">
                          Upload New
                        </button>
                        <button className="block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                    <h4 className="text-lg font-semibold text-white mb-4">Account Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Member since</span>
                        <span className="text-[#00beef]">January 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Projects created</span>
                        <span className="text-[#00beef]">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Models deployed</span>
                        <span className="text-[#00beef]">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button className="px-6 py-3 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2">
                  <Save size={20} />
                  Save Changes
                </button>
                <button className="px-6 py-3 bg-black/50 hover:bg-[#005778] text-white rounded-lg border border-[#00699a] transition-colors duration-300 flex items-center gap-2">
                  <RefreshCw size={20} />
                  Reset
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                  <h4 className="text-lg font-semibold text-white mb-4">Communication Preferences</h4>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <span className="text-white capitalize">{key} Notifications</span>
                          <p className="text-sm text-gray-400">
                            Receive {key} notifications about your account activity
                          </p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                            value ? 'bg-[#00beef]' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                  <h4 className="text-lg font-semibold text-white mb-4">Notification Types</h4>
                  <div className="space-y-3">
                    {[
                      'Pipeline completion alerts',
                      'Model training updates',
                      'System maintenance notices',
                      'Security alerts',
                      'Weekly usage reports'
                    ].map((item) => (
                      <label key={item} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[#00beef] bg-black border-[#00699a] rounded focus:ring-[#00beef]"
                        />
                        <span className="text-white">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Security Settings</h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                  <h4 className="text-lg font-semibold text-white mb-4">Password & Authentication</h4>
                  <div className="space-y-4">
                    <button className="w-full px-4 py-3 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300 text-left">
                      Change Password
                    </button>
                    <button className="w-full px-4 py-3 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300 text-left">
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                  <h4 className="text-lg font-semibold text-white mb-4">API Access</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                      <div className="flex gap-2">
                        <input
                          type={showApiKey ? "text" : "password"}
                          value="qx_1234567890abcdef"
                          readOnly
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white rounded-lg"
                        />
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="px-3 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300"
                        >
                          {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        <button className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-300">
                          <RefreshCw size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                  <h4 className="text-lg font-semibold text-white mb-4">Active Sessions</h4>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'New York, US', current: true },
                      { device: 'Safari on macOS', location: 'San Francisco, US', current: false },
                      { device: 'Mobile App', location: 'London, UK', current: false }
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
                        <div>
                          <div className="text-white flex items-center gap-2">
                            <Monitor size={16} />
                            {session.device}
                            {session.current && <span className="text-xs bg-green-600 px-2 py-1 rounded-full">Current</span>}
                          </div>
                          <div className="text-sm text-gray-400">{session.location}</div>
                        </div>
                        {!session.current && (
                          <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-300">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Appearance Settings</h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                  <h4 className="text-lg font-semibold text-white mb-4">Theme</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Dark', preview: 'bg-black', active: true },
                      { name: 'Light', preview: 'bg-white', active: false },
                      { name: 'Auto', preview: 'bg-gradient-to-r from-black to-white', active: false }
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          theme.active ? 'border-[#00beef]' : 'border-[#00699a]/30 hover:border-[#00699a]'
                        }`}
                      >
                        <div className={`w-full h-16 ${theme.preview} rounded mb-2`}></div>
                        <span className="text-white">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                  <h4 className="text-lg font-semibold text-white mb-4">Language & Region</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                      <select className="w-full px-4 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                      <select className="w-full px-4 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]">
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC-8 (Pacific Time)</option>
                        <option>UTC+0 (GMT)</option>
                        <option>UTC+1 (CET)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Data & Privacy</h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                  <h4 className="text-lg font-semibold text-white mb-4">Data Export</h4>
                  <p className="text-gray-300 mb-4">Download a copy of your data including projects, models, and settings.</p>
                  <button className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <Download size={20} />
                    Export Data
                  </button>
                </div>

                <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]/30">
                  <h4 className="text-lg font-semibold text-white mb-4">Data Retention</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Automatically delete old logs</span>
                      <select className="px-3 py-1 bg-black border border-[#00699a] text-white rounded">
                        <option>30 days</option>
                        <option>90 days</option>
                        <option>1 year</option>
                        <option>Never</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Keep model artifacts</span>
                      <select className="px-3 py-1 bg-black border border-[#00699a] text-white rounded">
                        <option>1 year</option>
                        <option>2 years</option>
                        <option>Forever</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-red-900/20 to-black p-6 rounded-lg border border-red-500/30">
                  <h4 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h4>
                  <p className="text-gray-300 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <Trash2 size={20} />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Settings;