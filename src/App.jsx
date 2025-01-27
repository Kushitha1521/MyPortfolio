import React from 'react';

const App = () => {
  const projects = [
    {
      name: "Web Development Project",
      description: "Full-stack web application with modern technologies",
      image: "/api/placeholder/400/300",
      technologies: ["React", "Tailwind", "Node.js"]
    },
    {
      name: "Data Science Project", 
      description: "Machine learning model for predictive analytics",
      image: "/api/placeholder/400/300",
      technologies: ["Python", "Django", "Machine Learning"]
    }
  ];

  const skills = [
    "JavaScript", "React", "Python", "Tailwind CSS", 
    "Node.js", "Git", "HTML", "CSS"
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-blue-400">My Portfolio</div>
          <div className="space-x-4">
            {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-blue-300 text-gray-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Introduction Section */}
      <section id="home" className="pt-20 container mx-auto text-center">
        <img 
          src="/api/placeholder/300/300" 
          alt="Profile" 
          className="mx-auto rounded-full w-48 h-48 object-cover mb-4 
                     border-4 border-blue-600 shadow-xl"
        />
        <h1 className="text-4xl font-bold mb-2 text-blue-400">
          Your Name
        </h1>
        <p className="text-xl text-gray-400">
          Software Developer | Web Developer | Tech Enthusiast
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">
            My Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-800 p-6 rounded-lg shadow-xl 
                            transform transition-all duration-300 
                            hover:-translate-y-4 hover:shadow-2xl 
                            border-l-4 border-blue-600"
              >
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-blue-400">
                  {project.name}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="bg-blue-900 text-blue-300 px-2 py-1 
                                 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-black">
        <div className="container mx-auto text-center">
          <img 
            src="/api/placeholder/600/300" 
            alt="Skills" 
            className="mx-auto mb-8 rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold mb-8 text-blue-400">
            Programming Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-blue-800 text-white px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900/50">
        <div className="container mx-auto">
          <img 
            src="/api/placeholder/800/300" 
            alt="Contact" 
            className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg"
          />
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">
            Contact Me
          </h2>
          <div className="max-w-lg mx-auto">
            <form className="space-y-4 bg-gray-800 p-8 rounded-xl shadow-xl">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg"
              />
              <textarea 
                placeholder="Your Message" 
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg h-32"
              ></textarea>
              <button 
                className="w-full bg-blue-700 text-white p-3 rounded-lg 
                           hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            {['GitHub', 'LinkedIn', 'Email'].map((platform) => (
              <a 
                key={platform} 
                href="#" 
                className="hover:text-blue-300 text-gray-400"
              >
                {platform}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-500">&copy; 2024 Your Name. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;


