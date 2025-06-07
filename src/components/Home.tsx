export default function Home() {
  return (
    <div id="hero" className="bg-gradient-to-b from-[#00beef] to-black  text-white min-h-screen overflow-hidden">
      {/* Hero */}
      <section id="welcomeSec" className="text-center py-16 px-4 bg-gradient-to-b from-black to-[#008aab]">
        <h1 id="welcomeNote"  className="text-5xl font-extrabold mb-6 text-white [text-shadow:2px_2px_2px_#000]">Welcome to QUADRAX•ML!</h1>
        <p id="welcomeSlogan" className="text-4xl font-bold text-white mb-8 [text-shadow:2px_2px_2px_#000]">Simplicity in complexity</p>
        <input id="signup" className="bg-[#00beef-500 hover:bg-cyan-400 text-black text-3xl font-bold py-2 px-6 [border:5px_solid_#000] rounded-sm transition duration-300 [text-shadow:2px_2px_4px_#00beef,_-2px_-2px_4px_#00beef,_2px_-2px_4px_#00beef,_-2px_2px_4px_#00beef]" type="button" value="Get Started"/>
      </section>

      {/* Explore */}
      <section className="px-6 py-3">
        <h2 id="explore" className="text-3xl font-bold mb-8 text-cyan-200">Explore</h2>
        <div  id="card-grid"className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-8">
          {[
            { title: 'Workshops', desc: 'Organize your projects with dedicated workspaces. Create new workstations, initialize, organize, evaluate, train and deploy ML models for AI development and Automation systems' },
            { title: 'Datakits', desc: 'Manage and explore your datasets efficiently.' },
            { title: 'Codesheets', desc: 'Interactive notebooks for data analysis and model training.' },
            { title: 'Virtual Machines', desc: 'Configure virtuals machine and run compute clusters and automation pipelines.' },
            { title: 'Models', desc: 'Deploy and manage your machine learning models.' }, 
            { title: 'Documentation', desc: 'Learn more about Quadrax•ML.' }
          ].map((card, i) => (
            <div id="card" key={i} className="bg-gradient-to-b from-black to-[#005778] rounded-m p-6 hover:shadow-lg hover:shadow-cyan-500/30 transition">
              <h3 id="card-title" className="text-4xl font-bold text-white mb-2">{card.title}</h3>
              <p id="card-description" className="text-lg text-white">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
