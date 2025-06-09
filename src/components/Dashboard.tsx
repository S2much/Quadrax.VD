import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cardData = [
  { 
    ID: 'card',
    title: 'Workshops', 
    desc: 'Create new workstations, initialize, organize, evaluate, train and deploy ML models for AI development and Automation systems',
    doodle: '🔬',
    pattern: 'workshop'
  },
  { 
    ID: 'card',
    title: 'Datakits', 
    desc: 'Manage and explore your datasets efficiently with powerful tools and visualizations.',
    doodle: '📊',
    pattern: 'data'
  },
  { 
    ID: 'card',
    title: 'Codesheets', 
    desc: 'Interactive notebooks for data analysis and model training with real-time collaboration.',
    doodle: '📝',
    pattern: 'code'
  },
  { 
    ID: 'card',
    title: 'Virtual Machines', 
    desc: 'Configure virtual machines and run compute clusters and automation pipelines.',
    doodle: '💻',
    pattern: 'vm'
  },
  { 
    ID: 'card',
    title: 'Models', 
    desc: 'Deploy and manage your machine learning models with advanced monitoring.',
    doodle: '🤖',
    pattern: 'model'
  }, 
  { 
    ID: 'card',
    title: 'Documentation', 
    desc: 'Learn more about Quadrax•ML with comprehensive guides and tutorials.',
    doodle: '📚',
    pattern: 'docs'
  }
];

export default function Home() {
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cardData.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
    setIsAutoPlaying(false);
  };

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
    <div className="bg-gradient-to-b from-[#00beef] to-black text-white min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="text-center py-16 px-8 bg-gradient-to-b from-black to-[#008aab]">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-white [text-shadow:2px_2px_2px_#000]">
          Welcome to QUADRAX•ML!
        </h1>
        <p className="text-2xl md:text-4xl text-white mb-8 [text-shadow:2px_2px_2px_#000]">
          Simplicity in complexity
        </p>
        <button className="bg-black hover:bg-[#00699a] text-[#00beef] text-xl md:text-3xl font-bold py-3 px-8 border-4 border-[#00beef] rounded-lg transition-all duration-300 hover:scale-105 [text-shadow:1px_1px_2px_rgba(0,190,239,0.5)]">
          Get Started
        </button>
      </section>

      {/* Slideshow */}
      <section className="p-0 relative">
        <h2 className="text-5xl px-4 py-4 text-left text-white [text-shadow:2px_2px_4px_#000]">
          Explore Our Platform
        </h2>
          <div className="flex items-center justify-center py-1 cursor-pointer hover:scale-105 transition-transform z-10">
            {/* Previous Card */}
            <div id={'ID'} className="absolute left-0 w-[18%] opacity-30 blur-sm transition-all duration-500" >
              <div className={`h-full bg-gradient-to-b from-black to-[#005778] p-4 ${getPatternClass(cardData[getCardIndex(-1)].pattern)}`}>
                <div className="text-6xl text-center">
                  {cardData[getCardIndex(-1)].doodle}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 text-center">
                  {cardData[getCardIndex(-1)].title}
                </h3>
              </div>
            </div>

            {/* Current Card */}
            <div id={'ID'} className="w-[60%] h-120 transition-all duration-500 relative z-10">
              <div className={`h-full bg-gradient-to-b from-black to-[#005778] rounded-lg p-8 shadow-2xl border border-[#00699a] ${getPatternClass(cardData[currentIndex].pattern)}`}>
                <div className="text-8xl mb-6 text-center animate-bounce">
                  {cardData[currentIndex].doodle}
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 text-center">
                  {cardData[currentIndex].title}
                </h3>
                <p className="text-lg text-white text-center leading-relaxed">
                  {cardData[currentIndex].desc}
                </p>
              </div>

            {/* Next Card */}
            <div id={'ID'} className="absolute right-0 w-[18%] h-120 opacity-30 blur-sm transition-all duration-500">
              <div className={`h-full bg-gradient-to-b from-black to-[#005778] p-4 ${getPatternClass(cardData[getCardIndex(1)].pattern)}`}>
                <div className="text-8xl mb-4 text-center">
                  {cardData[getCardIndex(1)].doodle}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 text-center">
                  {cardData[getCardIndex(1)].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 w-10 transform -translate-y-1/2 bg-black/50 hover:bg-[#00699a] text-white p-3 rounded-full transition-all duration-300 z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-[#00699a] text-white p-3 rounded-full transition-all duration-300 z-20"
          >
            <ChevronRight size={24} />
          </button>
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
              className={`w-3 h-3 m-0 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#00beef] scale-125' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

      </section>
      
    </div>
  );
}
