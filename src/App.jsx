import React, { useEffect, useState, useRef } from 'react';
import {projects} from './data/projects';
import { skills } from './data/skills';
import { experiences} from './data/experiences';
import { testimonials } from './data/testimonials';

const App = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const experienceRef = useRef(null);
  
  
 

  

  

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Close menu when clicking on a nav item
  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  // Typewriter effect for intro text
  const TypewriterText = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 100);
        
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text]);
    
    return <span>{displayText}<span className="animate-pulse">|</span></span>;
  };

  // Skill bar animation component
  const SkillBar = ({ name, level, delay }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-blue-300 text-sm md:text-base">{name}</span>
          <span className="text-gray-400 text-sm md:text-base">{level}%</span>
        </div>
        <div className="h-2 md:h-3 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-900 to-blue-400 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: isVisible['skills'] ? `${level}%` : '0%',
              transitionDelay: `${delay}ms`
            }}
          ></div>
        </div>
      </div>
    );
  };

  // Timeline animation for experience section
  const TimelineItem = ({ experience, index, isRight }) => {
    const isVisibleTimeline = isVisible['experience'];
    
    return (
      <div className={`mb-8 flex flex-col md:flex-row ${isRight ? 'md:flex-row-reverse' : ''} justify-between items-center w-full`}>
        <div className="order-1 w-5/12 hidden md:block"></div>
        <div className="z-20 flex items-center order-1 bg-blue-800 shadow-xl w-8 h-8 rounded-full mb-4 md:mb-0">
          <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
        </div>
        <div 
          className={`order-1 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4 transition-all duration-1000 transform ${
            isVisibleTimeline 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 md:translate-x-10'
          }`}
          style={{ transitionDelay: `${index * 200}ms` }}
        >
          <h3 className="mb-1 font-bold text-blue-400 text-lg md:text-xl">{experience.position}</h3>
          <h4 className="mb-2 text-blue-300 text-base md:text-lg">{experience.company}</h4>
          <p className="text-xs md:text-sm text-gray-300 mb-2">{experience.period}</p>
          <p className="text-gray-300 text-sm md:text-base mb-3">{experience.description}</p>
          <ul className="text-xs md:text-sm">
            {experience.achievements.map((achievement, i) => (
              <li 
                key={i} 
                className="mb-1 text-gray-400"
                style={{ 
                  transform: isVisibleTimeline ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isVisibleTimeline ? 1 : 0,
                  transition: `transform 0.5s ease, opacity 0.5s ease`,
                  transitionDelay: `${(index * 200) + (i * 100) + 300}ms`
                }}
              >
                • {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Filtered projects based on active tab
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Glassmorphism Navbar */}
      <nav className="backdrop-blur-md bg-gray-900/80 text-white p-4 fixed w-full top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-blue-400 animate-pulse">My Portfolio</div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {['Home', 'Projects', 'Skills', 'Experience', 'Testimonials', 'Contact'].map((item, index) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-blue-300 text-gray-300 transition-all duration-300 hover:scale-110 inline-block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-900/90 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex flex-col space-y-3">
              {['Home', 'Projects', 'Skills', 'Experience', 'Testimonials', 'Contact'].map((item, index) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="hover:text-blue-300 text-gray-300 transition-all duration-300 py-2 px-3 rounded hover:bg-gray-800"
                  onClick={handleNavClick}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Introduction Section with Parallax effect */}
      <section id="home" className="pt-32 md:pt-24 pb-16 container mx-auto px-4 text-center animate-on-scroll relative overflow-hidden">
        {/* Parallax background elements */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ 
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            backgroundImage: 'radial-gradient(circle, #4a90e2 10%, transparent 10%)',
            backgroundSize: '30px 30px'
          }}
        ></div>
        
        <div 
          className={`transition-all duration-1000 transform relative z-10 ${isVisible['home'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <img 
            src="kushitha1.JPG" 
            alt="Profile" 
            className="mx-auto rounded-full w-32 h-32 md:w-48 md:h-48 object-cover mb-4 border-4 border-blue-600 shadow-xl hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-2xl md:text-4xl font-bold mb-2 text-blue-400">
            KUSHITHA LAKSHITHA
          </h1>
          <p className="text-base md:text-xl text-gray-400 h-8">
            <TypewriterText text="Software Developer | Web Developer | Tech Enthusiast" />
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
              Hire Me
            </button>
            <button className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-4 py-2 md:px-6 md:py-2 rounded-full transition-all duration-300 transform hover:scale-105">
              Download CV
            </button>
          </div>
        </div>
      </section>

      {/* SVG Wave Divider */}
      <div className="text-gray-900 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="currentColor" 
            d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            className="path-animation"
          ></path>
        </svg>
      </div>

      {/* Projects Section with filtering */}
      <section id="projects" className="py-16 bg-gray-900/50 animate-on-scroll px-4">
        <div className="container mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 text-blue-400 transition-all duration-1000 ${isVisible['projects'] ? 'opacity-100' : 'opacity-0'}`}>
            My Projects
          </h2>
          
          {/* Project filtering tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'All' },
              { id: 'web', label: 'Web' },
              { id: 'data', label: 'Data' },
              { id: 'mobile', label: 'Mobile' },
              { id: 'design', label: 'UI/UX' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-full transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={index} 
                className={`backdrop-blur-sm bg-gray-800/90 p-4 md:p-6 rounded-lg shadow-xl border-l-4 border-blue-600 transition-all duration-500 transform ${
                  isVisible['projects'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-40 md:h-48 object-cover rounded-lg transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-400">
                  {project.name}
                </h3>
                <p className="text-sm md:text-base text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="bg-blue-900/70 text-blue-300 px-2 py-1 rounded-full text-xs md:text-sm hover:bg-blue-700 transition-colors"
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

      {/* SVG Wave Divider */}
      <div className="text-black w-full transform rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="currentColor" 
            d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            className="path-animation"
          ></path>
        </svg>
      </div>

      {/* Skills Section with progress bars */}
      <section id="skills" className="py-16 bg-black animate-on-scroll px-4">
        <div className="container mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 text-blue-400 transition-all duration-1000 ${isVisible['skills'] ? 'opacity-100' : 'opacity-0'}`}>
            Programming Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <SkillBar 
                key={index} 
                name={skill.name} 
                level={skill.level} 
                delay={index * 100} 
              />
            ))}
          </div>
          
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className={`bg-gray-800 p-3 md:p-4 rounded-lg text-center transition-all duration-500 transform ${isVisible['skills'] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl md:text-3xl text-blue-400 mb-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full bg-blue-900/50 flex items-center justify-center">
                    <span className="text-sm md:text-base">{skill.name.charAt(0)}</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="py-16 bg-gray-900/50 animate-on-scroll px-4" ref={experienceRef}>
        <div className="container mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-blue-400 transition-all duration-1000 ${isVisible['experience'] ? 'opacity-100' : 'opacity-0'}`}>
            Professional Experience
          </h2>
          
          {/* Timeline */}
          <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
            {/* Timeline line */}
            <div 
              className="absolute h-full border-2 border-blue-600/50 left-1/2 transform -translate-x-1/2 hidden md:block"
              style={{
                height: isVisible['experience'] ? '100%' : '0%',
                transition: 'height 1.5s ease-out'
              }}
            ></div>
            
            {/* Timeline items */}
            {experiences.map((exp, index) => (
              <TimelineItem 
                key={index} 
                experience={exp} 
                index={index} 
                isRight={index % 2 === 0} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-black animate-on-scroll px-4">
        <div className="container mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-blue-400 transition-all duration-1000 ${isVisible['testimonials'] ? 'opacity-100' : 'opacity-0'}`}>
            What People Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-gray-800/80 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-xl border-t-4 border-blue-600 transition-all duration-700 transform ${
                  isVisible['testimonials']
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4 border-2 border-blue-400"
                  />
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-blue-300">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-gray-400">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-300 italic">"{testimonial.text}"</p>
                
                {/* Decorative quote icon */}
                <div className="text-blue-800/30 text-3xl md:text-5xl absolute bottom-2 right-2 md:bottom-4 md:right-4">"</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with glassmorphism effect */}
      <section id="contact" className="py-16 bg-gray-900/50 animate-on-scroll relative overflow-hidden px-4">
        {/* Background effect for parallax */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ 
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        <div className="container mx-auto relative z-10">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-blue-400 transition-all duration-1000 ${isVisible['contact'] ? 'opacity-100' : 'opacity-0'}`}>
            Contact Me
          </h2>
          <div className="max-w-lg mx-auto">
            <form className={`space-y-4 backdrop-blur-sm bg-gray-800/80 p-4 md:p-8 rounded-xl shadow-xl transition-all duration-1000 ${isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-2 md:p-3 bg-gray-700/70 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm md:text-base"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-2 md:p-3 bg-gray-700/70 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm md:text-base"
              />
              <textarea 
                placeholder="Your Message" 
                className="w-full p-2 md:p-3 bg-gray-700/70 text-white border-2 border-gray-600 rounded-lg h-32 focus:border-blue-500 focus:outline-none transition-colors text-sm md:text-base"
              ></textarea>
              <button 
                className="w-full bg-blue-700 text-white p-2 md:p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 text-sm md:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8">
            {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map((platform, index) => (
              <a 
                key={platform}
                href="#" 
                className={`flex flex-col items-center transition-all duration-500 transform ${isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-800/50 flex items-center justify-center mb-2 hover:bg-blue-600 transition-colors">
                  <span className="text-sm md:text-base">{platform.charAt(0)}</span>
                </div>
                <span className="text-xs md:text-sm text-gray-400">{platform}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with shimmer effect */}
      <footer className="bg-gray-900 text-white py-6 md:py-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-blue-400/10 to-blue-900/5 animate-shimmer pointer-events-none"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite linear'
          }}
        ></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4">
            {['GitHub', 'LinkedIn', 'Email'].map((platform, index) => (
              <a 
                key={platform} 
                href="#" 
                className="hover:text-blue-300 text-gray-400 transition-all duration-300 transform hover:scale-110 text-sm md:text-base"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {platform}
              </a>
            ))}
          </div>
          <p className="text-xs md:text-sm text-gray-500">&copy; 2024 Kushitha Lakshitha. All Rights Reserved.</p>
        </div>
      </footer>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .path-animation {
          stroke-dasharray: 1500;
          stroke-dashoffset: 1500;
          animation: dash 3s ease-in-out forwards;
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      
      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-blue-600 hover:bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default App;