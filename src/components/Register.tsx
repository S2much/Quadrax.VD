import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Building, ArrowLeft, Github, Chrome, Check } from 'lucide-react';

interface RegisterProps {
  onCancel: () => void;
  onRegister: () => void;
}

function Register({ onCancel }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    password: '',
    confirmPassword: ''
  });
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAgreementChange = (field: string) => {
    setAgreements(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt:', { formData, agreements });
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00beef] to-black flex items-center justify-center p-6 custom-scrollbar">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onCancel}
            className="absolute top-6 left-6 p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <h1 className="text-4xl font-bold text-white [text-shadow:2px_2px_2px_#000] mb-2">
            QUADRAX•ML
          </h1>
          <p className="text-xl text-white/80">Join the future of machine learning</p>
        </div>

        {/* Registration Form */}
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-[#00699a]/30 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef] focus:ring-2 focus:ring-[#00beef]/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef] focus:ring-2 focus:ring-[#00beef]/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef] focus:ring-2 focus:ring-[#00beef]/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Organization (Optional)</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  placeholder="Enter your organization"
                  className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef] focus:ring-2 focus:ring-[#00beef]/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-12 py-3 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef] focus:ring-2 focus:ring-[#00beef]/20 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength(formData.password))}`}
                        style={{ width: `${(passwordStrength(formData.password) / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs ${passwordStrength(formData.password) < 2 ? 'text-red-400' : passwordStrength(formData.password) < 4 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {getStrengthText(passwordStrength(formData.password))}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Password should contain uppercase, lowercase, numbers, and special characters
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef] focus:ring-2 focus:ring-[#00beef]/20 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="mt-1 text-xs text-red-400">Passwords do not match</div>
              )}
            </div>

            {/* Agreements */}
            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={agreements.terms}
                    onChange={() => handleAgreementChange('terms')}
                    className="w-4 h-4 text-[#00beef] bg-black border-[#00699a] rounded focus:ring-[#00beef] focus:ring-2 mt-1"
                    required
                  />
                  {agreements.terms && (
                    <Check size={12} className="absolute top-1.5 left-0.5 text-[#00beef] pointer-events-none" />
                  )}
                </div>
                <span className="text-sm text-gray-300">
                  I agree to the <button type="button" className="text-[#00beef] hover:text-white transition-colors duration-300">Terms of Service</button> and <button type="button" className="text-[#00beef] hover:text-white transition-colors duration-300">Privacy Policy</button>
                </span>
              </label>
              
              <label className="flex items-start gap-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={agreements.marketing}
                    onChange={() => handleAgreementChange('marketing')}
                    className="w-4 h-4 text-[#00beef] bg-black border-[#00699a] rounded focus:ring-[#00beef] focus:ring-2 mt-1"
                  />
                  {agreements.marketing && (
                    <Check size={12} className="absolute top-1.5 left-0.5 text-[#00beef] pointer-events-none" />
                  )}
                </div>
                <span className="text-sm text-gray-300">
                  I would like to receive product updates and marketing communications
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreements.terms || formData.password !== formData.confirmPassword}
              className="w-full py-3 bg-gradient-to-r from-[#00beef] to-[#00699a] hover:from-[#00699a] hover:to-[#00beef] disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-[#00699a]/30"></div>
            <span className="px-4 text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 border-t border-[#00699a]/30"></div>
          </div>

          {/* Social Registration */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-black/50 hover:bg-[#005778] border border-[#00699a] text-white rounded-lg transition-all duration-300">
              <Github size={20} />
              <span>GitHub</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-black/50 hover:bg-[#005778] border border-[#00699a] text-white rounded-lg transition-all duration-300">
              <Chrome size={20} />
              <span>Google</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-400">Already have an account? </span>
            <button className="text-[#00beef] hover:text-white transition-colors duration-300 font-medium">
              Sign in
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Register;