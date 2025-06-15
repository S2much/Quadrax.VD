import { useState, useEffect } from 'react'

const cardData = [
  { 
    ID: 'card',
    title: 'Workshops', 
    desc: 'Create new workstations, initialize, organize, evaluate, train and deploy ML models for AI development and Automation systems. Integrate with external applications, resources.' ,
    desc2: "The Workshop is the heart of the Quadrax_ML ecosystem—your personal R&D lab where you can build, refine, and launch intelligent systems with precision and control. Whether you're a solo developer, a data science team, or an enterprise AI engineer, the Workshop brings all critical functions into one unified interface.",
    doodle: '🔬',
    pattern: 'workshop',
    button: 'Go to Workshops'
  },
  { 
    ID: 'card',
    title: 'Datakits', 
    desc: 'Manage and explore your datasets efficiently with powerful tools and visualizations.',
    desc2: "is your data command center in Quadrax_ML—built for data scientists, engineers, and AI developers who need precision, control, and insight into their datasets. Whether you're prepping raw data, building training sets, or performing exploratory analysis, Datakits puts powerful tools at your fingertips. Upload datasets in common formats: .csv, .json, .parquet, .xls, .txt, and more!",
    doodle: '📊',
    pattern: 'data',
    button: 'Go to Datakits'
  },
  { 
    ID: 'card',
    title: 'Codesheets', 
    desc: 'Interactive notebooks for data analysis and model training with real-time collaboration.',
    desc2: 'Purposely built for scripting, data analysis, prototyping ML models, and collaborating in real time. They blend the simplicity of notebook-style development with the power of full-script execution and rich outputs. Write and execute Python scripts, shell commands, or SQL queries. Run ML experiments with live feedback. Analyze datasets from Datakits. Share reproducible code with collaborators.',    
    doodle: '📝',
    pattern: 'code',
    button: 'Go to Codesheets'
  },
  { 
    ID: 'card',
    title: 'Virtual Machines', 
    desc: 'Configure virtual machines and run compute clusters and automation pipelines. Gives you full control over your compute infrastructure. Easily create, configure, and manage virtual machines that serve as powerful nodes for running your AI models, automating tasks, and executing data pipelines.',
    desc2: 'Define new VMs with custom specs. RAM, CPU, Disk size OS type (Ubuntu, Arch, CentOS, etc.) GPU passthrough support (if available) VM Templates for Data preprocessing, Model training, Automation agents, and Evaluation sandboxes. Choose between Lightweight containers and Full virtualization via KVM/libvirt',
    doodle: '💻',
    pattern: 'vm',
    button: 'Go to VMs'
  },
  { 
    ID: 'card',
    title: 'Models', 
    desc: 'Deploy and manage your machine learning models with advanced monitoring.',
    doodle: '🤖',
    pattern: 'model',
    button: 'Go to Models'
  }, 
  { 
    ID: 'card',
    title: 'Documentation', 
    desc: 'Learn more about Quadrax•ML with comprehensive guides and tutorials.',
    doodle: '📚',
    pattern: 'docs',
    button: 'Learn more'
  }
];

interface HomeProps {
  onGetStarted: () => void;
}

export default function HomePage({ onGetStarted }: HomeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) {
      return;
    }
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cardData.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);


  const getCardIndex = (offset: number) => {
    return (currentIndex + offset + cardData.length) % cardData.length;
  };

  const getPatternClass = (pattern: string) => {
    const patterns = {
      workshop: 'bg-[radial-gradient(circle_at_20%_50%,_rgba(0,190,239,0.1)_0%,_transparent_50%),_radial-gradient(circle_at_80%_20%,_rgba(0,105,154,0.1)_0%,_transparent_50%)]',
      data: 'bg-[radial-gradient(circle_at_30%_40%,_rgba(0,190,239,0.1)_0%,_transparent_50%),_linear-gradient(45deg,_rgba(0,105,154,0.05)_25%,_transparent_25%)]',
      code: 'bg-[repeating-linear-gradient(45deg,_rgba(0,190,239,0.05)_0px,_rgba(0,190,239,0.05)_2px,_transparent_2px,_transparent_10px)]',
      vm: 'bg-[radial-gradient(ellipse_at_center,_rgba(0,190,239,0.1)_0%,_transparent_70%)]',
      model: 'bg-[conic-gradient(from_0deg_at_50%_50%,_rgba(0,190,239,0.1)_0deg,_transparent_60deg,_rgba(0,105,154,0.1)_120deg,_transparent_180deg)]',
      docs: 'bg-[linear-gradient(90deg,_rgba(0,190,239,0.05)_50%,_transparent_50%),_linear-gradient(0deg,_rgba(0,105,154,0.05)_50%,_transparent_50%)]'
    };
    return patterns[pattern as keyof typeof patterns] || patterns.workshop;
  };

  

  return (
    <div className=" m-0 text-white overflow-auto">
      {/* Hero */}
      <section className="flex flex-col text-center justify-center items-center h-[40vh] py-16 bg-gradient-to-b from-black to-[#008aab]">
        <h1 className="text-3xl md:text-5xl [font-weight:400] mb-6 text-white [text-shadow:2px_2px_2px_#000]">
          Welcome to <span className="font-bold text-white [text-shadow:2px_2px_0px_#008aab,_-2px_-2px_2px_#000,_2px_-2px_2px_#000,_-2px_2px_0px_#008aab]" >QUADRAX•ML</span>!
        </h1>
        <p className="text-2xl md:text-4xl text-white mb-8 [text-shadow:2px_2px_2px_#000]">
          Simplicity in complexity
        </p>
        <button className=" flex justify-center items-center bg-black w-[20vw] hover:bg-[#00699a] text-[#00beef] text-xl md:text-3xl text-center font-bold py-3 px-8 border-4 border-[#00beef] rounded-lg transition-all duration-300 hover:scale-105 [text-shadow:1px_1px_2px_rgba(0,190,239,0.5)]" onClick={onGetStarted}>
          Get Started
        </button>
      </section>

      {/* Slideshow */}
      <section className="bg-gradient-to-b from-[#004667] to-black relative">
        <h2 className="text-5xl px-4 py-4 text-left text-white [text-shadow:2px_2px_4px_#000]">
          Explore Our Platform
        </h2>
          <div className="flex items-center justify-center items-center cursor-pointer transition-transform z-10">
            {/* Previous Card */}
            <div className="w-[2%] m-2 border border-[#00699a] [height:35vh] opacity-80 [transform:perspective(500px)_rotateY(-45deg)] items-center transition-all duration-500" >
              <div className={`h-full bg-gradient-to-b from-[#005778] to-black p-4 ${getPatternClass(cardData[getCardIndex(-1)].pattern)}`}>
              </div>
            </div>

            {/* Current Card */}
            <div className="w-[90%] [height:40vh] transition-all duration-500 relative z-10 overflow-hidden">
              <div className={`h-full bg-gradient-to-b from-black to-[#005778] p-4 shadow-2xl border border-[#00699a] ${getPatternClass(cardData[currentIndex].pattern)}`}>
                <div className=" absolute top-20 right-20 text-8xl mb-6 [filter:opacity(0.3)_saturate(200%)] [transform:perspective(500px)_rotateY(-45deg)_scale(2.5,2)]">
                  {cardData[currentIndex].doodle}
                </div>
                <h3 className="text-4xl font-bold text-white mb-4 text-left">
                  {cardData[currentIndex].title}
                </h3>
                <p className="text-xl w-[80%] text-white text-left leading-relaxed">
                  {cardData[currentIndex].desc}
                </p>
                <br/>
                <p className="text-xl w-[80%] text-white text-left leading-relaxed">
                  {cardData[currentIndex].desc2}
                </p>
                <button className={`absolute bottom-10 right-10 ${getPatternClass(cardData[currentIndex].button)}`}>
                </button>
              </div>
</div>
            {/* Next Card */}
            <div className="w-[2%] border border-[#00699a] items-center [height:35vh] opacity-80 [transform:perspective(500px)_rotateY(45deg)] transition-all duration-500">
              <div className={`h-full bg-gradient-to-b from-[#005778] to-black p-4 ${getPatternClass(cardData[getCardIndex(1)].pattern)}`}>
              </div>
            </div>
          </div>

        

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {cardData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-8 h-1 m-0 [box-shadow:0_0_4px_1px_#00beef] transition-all duration-300 ${
                index === currentIndex ? 'bg-[#00beef] scale-125' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

      </section>
      
    </div>
  );
}
