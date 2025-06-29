import React, { useState, useEffect } from 'react';
import Image1 from '../images/image1.png';
import Image2 from '../images/image2.png';
import Image3 from '../images/image3.png';
import Image4 from '../images/Image4.png';

const cardData = [
  { 
    title: 'Quadrax Model Virtual Devices',
    image: Image1,
    desc: 'Design, deploy, and manage intelligent virtual devices for any ML or data science workflow.',
    desc2: 'Seamlessly connect, monitor, and control your AI-powered devices in one unified platform.',
    button: 'View devices'
  },
  {
    title: 'Manufacture',
    image: Image2,
    desc: 'Visually assemble and automate your ML pipelines with our drag-and-drop canvas.',
    desc2: 'Build, connect, and execute complex workflows with ease—no code required.',
    button: 'View Canvas'
  },
  {
    title: 'Datakits, Notebooks, and Code',
    image: Image3,
    desc: 'Access powerful data tools, interactive notebooks, and a modern code editor.',
    desc2: 'Analyze, visualize, and transform data with integrated Python and SQL support.',
    button: 'View Editor'
  },
  {
    title: 'Integrate with APIs and external tools',
    image: Image4,
    desc: 'Connect Quadrax to your favorite APIs, cloud services, and third-party tools.',
    desc2: 'Automate data flows and extend your platform with seamless integrations.',
    button: 'View Integration'
  },
  {
    title: 'Quadrax Docs',
    image: Image2,
    desc: 'Comprehensive documentation for every feature, workflow, and integration.',
    desc2: 'Get started quickly and find answers to all your Quadrax questions.',
    button: 'View Documentation'
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

  return (
    <div className="w-full h-full text-white overflow-y-auto custom-scrollbar">
      {/* Hero */}
      <section id="hero-home" className="flex flex-col text-center justify-center items-center min-h-[35vh] py-8">
        <h1 className="text-4xl md:text-6xl [font-weight:400] mb-6 text-white [text-shadow:2px_2px_2px_#000] px-4">
          Welcome to <span className="font-bold text-white [text-shadow:2px_2px_0px_#008aab,_-2px_-2px_2px_#000,_-2px_2px_0px_#008aab]" >QUADRAX•ML</span>!
        </h1>
        <p className="text-3xl md:text-5xl text-white mb-8 [text-shadow:2px_2px_2px_#000] px-4">
          Simplicity in complexity
        </p>
        <button 
          className="flex justify-center items-center bg-black w-auto min-w-[200px] max-w-[300px] hover:bg-[#00699a] text-[#00beef] text-xl md:text-2xl text-center font-bold py-3 px-6 border-4 border-[#00beef] rounded-lg transition-all duration-300 hover:scale-105 [text-shadow:1px_1px_2px_rgba(0,190,239,0.5)]" 
          onClick={onGetStarted}
        >
          Get Started
        </button>
      </section>

      {/* Slideshow */}
      <section id="explore" className="bg-gradient-to-b from-[transparent] to-black relative pb-8">
        <h2 className="text-3xl md:text-5xl px-4 py-4 text-left text-white [text-shadow:2px_2px_4px_#000]">
          Explore
        </h2>
        <div className="flex items-center justify-center cursor-pointer transition-transform z-10 px-1">
          {/* Previous Card */}
          <div className="w-[3%] min-w-[20px] m-1 border border-[#00699a] h-[35vh] opacity-80 [transform:perspective(500px)_rotateY(-45deg)] items-center transition-all duration-500">
            <div className={`h-full bg-gradient-to-b from-[#005778] to-black p-2 `}>
            </div>
          </div>

          {/* Current Card */}
          <div className="flex-1 max-w-[90%] h-[36vh] transition-all duration-500 relative z-10 overflow-hidden ">
            <div className={`h-full bg-gradient-to-b from-black to-[#005778] p-4 md:p-6 shadow-2xl border border-[#00699a] relative`}>
              <div className="absolute top-8 md:top-16 right-8 md:right-16 text-3xl md:text-4xl mb-6 [filter:opacity(0.6)] [transform:perspective(500px)_rotateY(-45deg)_scale(2,1.5)] md:[transform:perspective(500px)_rotateY(-45deg)_scale(2.5,2)]">
                <img src={cardData[currentIndex].image} alt={cardData[currentIndex].title} className="text-[#00beef] md:w-[120px] md:h-[120px]" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 text-left">
                {cardData[currentIndex].title}
              </h3>
              <div className="relative overflow-hidden">
                <div className="absolute"></div>
                <div className="text-lg md:text-xl w-[50vw] text-white text-left leading-relaxed">
                  <p className="mb-2 md:mb-4 w-[40vw]">{cardData[currentIndex].desc}</p>
                  <p className="md:text-xl w-[50vw]">{cardData[currentIndex].desc2}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Card */}
          <div className="w-[3%] min-w-[20px] border border-[#00699a] items-center h-[35vh] opacity-80 [transform:perspective(500px)_rotateY(45deg)] transition-all duration-500 m-1">
            <div className={`h-full bg-gradient-to-b from-[#005778] to-black p-2 `}>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2 px-4">
          {cardData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-6 md:w-8 h-1 m-0 [box-shadow:0_0_4px_1px_#00beef] transition-all duration-300 ${
                index === currentIndex ? 'bg-[#00beef] scale-125' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}