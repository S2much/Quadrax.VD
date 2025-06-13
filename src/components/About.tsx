import { Brain, Zap, Target, Users, Globe, ChevronRight, ExternalLink } from 'lucide-react';

function About() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Integration',
      description: 'Cutting-edge artificial intelligence capabilities integrated seamlessly into every aspect of the platform.'
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      description: 'Streamlined automation that reduces manual work and accelerates your machine learning projects.'
    },
    {
      icon: Target,
      title: 'Precision Analytics',
      description: 'High-accuracy data analysis and model training with industry-leading performance metrics.'
    },
    {
      icon: Users,
      title: 'Collaborative Environment',
      description: 'Team-friendly workspace designed for seamless collaboration on complex ML projects.'
    }
  ];

  const stats = [
    { label: 'Models Deployed', value: '1,000+' },
    { label: 'Data Scientists', value: '500+' },
    { label: 'Projects Completed', value: '2,500+' },
    { label: 'Accuracy Rate', value: '99.2%' }
  ];

  const team = [
    {
      name: 'Mordecai Thulani Makatini',
      role: 'Founder',
      description: 'First AI, Data Science and Machine Learning infastructure development.'
    }
  ];

  return (
    <section className="p-6 min-h-screen">
      <div className="text-white mb-6">
        <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-black/30 p-4 rounded-lg">
          About QUADRAX•ML
        </h2>
        <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black via-black to-[#005778] p-8 rounded-lg mb-8 text-center">
        <h3 className="text-4xl font-bold text-white mb-4">
          Simplicity in Complexity
        </h3>
        <p className="text-xl text-gray-300 mb-6 max-w-4xl mx-auto">
          QUADRAX•ML is a revolutionary platform designed to simplify data science computation and machine learning model training, 
          seamlessly integrated with artificial intelligence and automation capabilities.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2">
            Get Started
            <ChevronRight size={20} />
          </button>
          <button className="px-6 py-3 bg-black/50 hover:bg-[#005778] text-white rounded-lg border border-[#00699a] transition-colors duration-300 flex items-center gap-2">
            Learn More
            <ExternalLink size={20} />
          </button>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="text-[#00beef]" size={24} />
            Our Mission
          </h4>
          <p className="text-gray-300 leading-relaxed">
            To democratize machine learning by providing an intuitive, powerful platform that transforms complex 
            data science workflows into streamlined, automated processes. We believe that advanced AI capabilities 
            should be accessible to organizations of all sizes, enabling them to harness the power of their data 
            without requiring extensive technical expertise.
          </p>
        </div>

        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="text-[#00beef]" size={24} />
            Our Vision
          </h4>
          <p className="text-gray-300 leading-relaxed">
            To become the leading platform for AI-driven automation and machine learning, empowering businesses 
            worldwide to make data-driven decisions with confidence. We envision a future where machine learning 
            is as accessible as traditional software tools, enabling innovation across industries and accelerating 
            the pace of technological advancement.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-8">
        <h4 className="text-2xl font-bold text-white mb-6">Key Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex gap-4 p-4 bg-gradient-to-b from-[#005778] to-black rounded-lg border border-[#00699a]/30">
                <IconComponent size={32} className="text-[#00beef] flex-shrink-0 mt-1" />
                <div>
                  <h5 className="text-lg font-semibold text-white mb-2">{feature.title}</h5>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-8">
        <h4 className="text-2xl font-bold text-white mb-6 text-center">Platform Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gradient-to-b from-[#005778] to-black rounded-lg border border-[#00699a]/30">
              <div className="text-3xl font-bold text-[#00beef] mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Capabilities */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-8">
        <h4 className="text-2xl font-bold text-white mb-6">Core Capabilities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-b from-[#005778] to-black rounded-lg border border-[#00699a]/30">
            <h5 className="text-lg font-semibold text-white mb-3">Data Management</h5>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Automated data ingestion and cleaning</li>
              <li>• Real-time data quality monitoring</li>
              <li>• Scalable data storage solutions</li>
              <li>• Advanced data visualization tools</li>
            </ul>
          </div>

          <div className="p-4 bg-gradient-to-b from-[#005778] to-black rounded-lg border border-[#00699a]/30">
            <h5 className="text-lg font-semibold text-white mb-3">Model Development</h5>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• AutoML capabilities</li>
              <li>• Custom model training</li>
              <li>• Hyperparameter optimization</li>
              <li>• Model versioning and tracking</li>
            </ul>
          </div>

          <div className="p-4 bg-gradient-to-b from-[#005778] to-black rounded-lg border border-[#00699a]/30">
            <h5 className="text-lg font-semibold text-white mb-3">Deployment & Monitoring</h5>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• One-click model deployment</li>
              <li>• Real-time performance monitoring</li>
              <li>• Automated scaling and optimization</li>
              <li>• Comprehensive analytics dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-8">
        <h4 className="text-2xl font-bold text-white mb-6">About the developer</h4>
        <div className="w-full">
          {team.map((member, index) => (
            <div key={index} className="p-4 bg-gradient-to-b from-[#005778] to-black rounded-lg border border-[#00699a]/30 text-center">
              <div className="w-16 h-16 bg-[#00699a] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <h5 className="text-lg font-semibold text-white mb-1">{member.name}</h5>
              <p className="text-[#00beef] text-sm mb-3">{member.role}</p>
              <p className="text-gray-300 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
        <h4 className="text-2xl font-bold text-white mb-6">Technology Stack</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Machine Learning</h5>
            <div className="flex flex-wrap gap-2">
              {['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost', 'Keras', 'MLflow'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-[#00699a]/30 text-[#00beef] rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Infrastructure</h5>
            <div className="flex flex-wrap gap-2">
              {['Kubernetes', 'Docker', 'AWS', 'Apache Spark', 'Redis', 'PostgreSQL'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-[#00699a]/30 text-[#00beef] rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;