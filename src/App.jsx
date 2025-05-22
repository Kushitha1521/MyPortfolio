import React, { useEffect, useState, useRef } from 'react';
import { projects } from './data/projects';
import { skills } from './data/skills';
import { experiences } from './data/experiences';
import { testimonials } from './data/testimonials';

const App = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const experienceRef = useRef(null);

  // SEO optimization using document head manipulation
  useEffect(() => {
    // Set page title
    document.title = "Kushitha Lakshitha - Software Developer & Web Developer Portfolio";
    
    // Create and update meta tags
    const updateMetaTag = (name, content, property = null) => {
      let selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic SEO meta tags
    updateMetaTag('description', 'Professional software developer specializing in web development, mobile apps, and UI/UX design. View my portfolio of projects and technical skills.');
    updateMetaTag('keywords', 'Kushitha Lakshitha, Software Developer, Web Developer, Portfolio, JavaScript, React, Full Stack Developer, Tech Enthusiast');
    updateMetaTag('author', 'Kushitha Lakshitha');
    updateMetaTag('robots', 'index, follow');

    // Open Graph meta tags
    updateMetaTag('og:title', 'Kushitha Lakshitha - Software Developer & Web Developer Portfolio', true);
    updateMetaTag('og:description', 'Professional software developer specializing in web development, mobile apps, and UI/UX design. View my portfolio of projects and technical skills.', true);
    updateMetaTag('og:image', 'https://kushithalakshitha.vercel.app/kushitha1.JPG', true); // Replace with actual URL
    updateMetaTag('og:url', 'https://kushithalakshitha.vercel.app/', true); // Replace with actual URL
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'Kushitha Lakshitha Portfolio', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'Kushitha Lakshitha - Software Developer & Web Developer Portfolio');
    updateMetaTag('twitter:description', 'Professional software developer specializing in web development, mobile apps, and UI/UX design. View my portfolio of projects and technical skills.');
    updateMetaTag('twitter:image', 'https://kushithalakshitha.vercel.app/kushitha1.JPG'); // Replace with actual URL

    // Additional SEO meta tags
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#1e40af');

    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://kushithalakshitha.vercel.app/'); // Replace with actual URL

    // Add JSON-LD structured data
    let structuredDataScript = document.querySelector('#structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Undergraduate",
      "name": "Kushitha Lakshitha",
      "jobTitle": "Frontend Developer",
      "description": "Professional software developer specializing in web development and mobile applications",
      "url": "https://kushithalakshitha.vercel.app/", // Replace with actual URL
      "image": "https://kushithalakshitha.vercel.app/kushitha1.JPG", // Replace with actual URL
      "sameAs": [
        "https://github.com/kushitha1521", // Replace with actual URLs
        "https://linkedin.com/in/kushitha-lakshitha"
      ],
      "knowsAbout": ["JavaScript", "React", "Web Development", "Mobile Development", "UI/UX Design"],
      "alumniOf": "University of Kelaniya", // Add if applicable
      "worksFor": {
        "@type": "Organization",
        "name": "AWS Cloud Club" // Add if applicable
      }
    };
    
    structuredDataScript.textContent = JSON.stringify(structuredData);

    // Cleanup function
    return () => {
      // Optional: Clean up meta tags when component unmounts
      // This is generally not needed for single-page applications
    };
  }, []);

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
    
    return (
      <span role="text" aria-label={text}>
        {displayText}<span className="animate-pulse" aria-hidden="true">|</span>
      </span>
    );
  };

  // Skill bar animation component
  const SkillBar = ({ name, level, delay }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-blue-300 text-sm sm:text-base">{name}</span>
          <span className="text-gray-400 text-sm sm:text-base" aria-label={`${level} percent proficiency`}>{level}%</span>
        </div>
        <div className="h-2 sm:h-3 bg-gray-700 rounded-full overflow-hidden" role="progressbar" aria-valuenow={level} aria-valuemin="0" aria-valuemax="100" aria-label={`${name} skill level`}>
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
  const TimelineItem = ({ experience, index }) => {
    const isVisibleTimeline = isVisible['experience'];
    
    return (
      <article className="mb-8 w-full">
        {/* Mobile view */}
        <div className="md:hidden w-full">
          <div 
            className={`bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl px-4 py-3 sm:px-6 sm:py-4 border-l-4 border-blue-600 transition-all duration-700 transform ${
              isVisibleTimeline 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="flex items-center mb-2">
              <div className="bg-blue-800 shadow-xl w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3" aria-hidden="true">
                <span className="font-semibold text-sm sm:text-base text-white">{index + 1}</span>
              </div>
              <div>
                <h3 className="font-bold text-blue-400 text-base sm:text-lg">{experience.position}</h3>
                <h4 className="text-blue-300 text-sm sm:text-base">{experience.company}</h4>
              </div>
            </div>
            <time className="text-xs sm:text-sm text-gray-300 mb-2 block">{experience.period}</time>
            <p className="text-gray-300 text-xs sm:text-sm mb-2">{experience.description}</p>
            <ul className="text-xs sm:text-sm" role="list">
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
        
        {/* Desktop view */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center w-full">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-blue-800 shadow-xl w-8 h-8 rounded-full mb-4 md:mb-0" aria-hidden="true">
            <span className="mx-auto font-semibold text-lg text-white">{index + 1}</span>
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
            <time className="text-xs md:text-sm text-gray-300 mb-2 block">{experience.period}</time>
            <p className="text-gray-300 text-sm md:text-base mb-3">{experience.description}</p>
            <ul className="text-xs md:text-sm" role="list">
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
      </article>
    );
  };

  // Filtered projects based on active tab
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      {/* Glassmorphism Navbar */}
      <nav className="backdrop-blur-md bg-gray-900/80 text-white p-4 fixed w-full top-0 z-50 shadow-lg" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto flex justify-between items-center max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-xl font-bold text-blue-400 animate-pulse">
            <a href="#home" aria-label="Kushitha Lakshitha Portfolio Home">My Portfolio</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 lg:space-x-6" role="list">
            {['Home', 'Projects', 'Skills', 'Experience', 'Testimonials', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-blue-300 text-gray-300 transition-all duration-300 hover:scale-110 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                role="listitem"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-900/90 rounded-lg p-4 backdrop-blur-sm" id="mobile-menu">
            <div className="flex flex-col space-y-3" role="list">
              {['Home', 'Projects', 'Skills', 'Experience', 'Testimonials', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="hover:text-blue-300 text-gray-300 transition-all duration-300 py-2 px-3 rounded hover:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={handleNavClick}
                  role="listitem"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main id="main-content">
        {/* Introduction Section with Parallax effect */}
        <section id="home" className="pt-32 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center animate-on-scroll relative overflow-hidden">
          {/* Parallax background elements */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ 
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
              backgroundImage: 'radial-gradient(circle, #4a90e2 10%, transparent 10%)',
              backgroundSize: '30px 30px'
            }}
            aria-hidden="true"
          ></div>
          
          <div 
            className={`transition-all duration-1000 transform relative z-10 ${isVisible['home'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <img 
              src="kushitha1.JPG" 
              alt="Kushitha Lakshitha - Professional profile photo" 
              className="mx-auto rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover mb-4 border-4 border-blue-600 shadow-xl hover:scale-105 transition-transform duration-300"
              loading="eager"
              width="192"
              height="192"
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-blue-400">
              KUSHITHA LAKSHITHA
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 h-8">
              <TypewriterText text="Software Developer | Web Developer | Tech Enthusiast" />
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button 
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Contact me for hiring opportunities"
              >
                Hire Me
              </button>
              <button 
                className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Download my curriculum vitae"
              >
                Download CV
              </button>
            </div>
          </div>
        </section>

        {/* SVG Wave Divider */}
        <div className="text-gray-900 w-full" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path 
              fill="currentColor" 
              d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              className="path-animation"
            ></path>
          </svg>
        </div>

        {/* Projects Section with filtering */}
        <section id="projects" className="py-16 bg-gray-900/50 animate-on-scroll px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-blue-400 transition-all duration-1000 ${isVisible['projects'] ? 'opacity-100' : 'opacity-0'}`}>
              My Projects
            </h2>
            
            {/* Project filtering tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Project categories">
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
                  className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls="projects-grid"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" id="projects-grid" role="tabpanel">
              {filteredProjects.map((project, index) => (
                <article 
                  key={index} 
                  className={`backdrop-blur-sm bg-gray-800/90 p-4 sm:p-5 md:p-6 rounded-lg shadow-xl border-l-4 border-blue-600 transition-all duration-500 transform hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-400 ${
                    isVisible['projects'] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="overflow-hidden rounded-lg mb-4">
                    <img 
                      src={project.image} 
                      alt={`${project.name} project screenshot`}
                      className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                      width="400"
                      height="224"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-blue-400">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="bg-blue-900/70 text-blue-300 px-2 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-700 transition-colors"
                        role="listitem"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SVG Wave Divider */}
        <div className="text-black w-full transform rotate-180" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path 
              fill="currentColor" 
              d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              className="path-animation"
            ></path>
          </svg>
        </div>

        {/* Skills Section with progress bars */}
        <section id="skills" className="py-16 bg-black animate-on-scroll px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-blue-400 transition-all duration-1000 ${isVisible['skills'] ? 'opacity-100' : 'opacity-0'}`}>
              Programming Skills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <SkillBar 
                  key={index} 
                  name={skill.name} 
                  level={skill.level} 
                  delay={index * 100} 
                />
              ))}
            </div>
            
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className={`bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg text-center transition-all duration-500 transform focus-within:ring-2 focus-within:ring-blue-400 ${isVisible['skills'] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  tabIndex="0"
                  role="img"
                  aria-label={`${skill.name} skill icon`}
                >
                  <div className="text-2xl md:text-3xl text-blue-400 mb-1 sm:mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto rounded-full bg-blue-900/50 flex items-center justify-center">
                      <span className="text-sm sm:text-base" aria-hidden="true">{skill.name.charAt(0)}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Timeline Section */}
        <section id="experience" className="py-16 bg-gray-900/50 animate-on-scroll px-4 sm:px-6" ref={experienceRef}>
          <div className="container mx-auto max-w-5xl">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-blue-400 transition-all duration-1000 ${isVisible['experience'] ? 'opacity-100' : 'opacity-0'}`}>
              Professional Experience
            </h2>
            
            {/* Timeline */}
            <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
              {/* Timeline line - hidden on mobile */}
              <div 
                className="absolute h-full border-2 border-blue-600/50 left-1/2 transform -translate-x-1/2 hidden md:block"
                style={{
                  height: isVisible['experience'] ? '100%' : '0%',
                  transition: 'height 1.5s ease-out'
                }}
                aria-hidden="true"
              ></div>
              
              {/* Timeline items */}
              {experiences.map((exp, index) => (
                <TimelineItem 
                  key={index} 
                  experience={exp} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-black animate-on-scroll px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-blue-400 transition-all duration-1000 ${isVisible['testimonials'] ? 'opacity-100' : 'opacity-0'}`}>
              What People Say
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <article 
                  key={index}
                  className={`bg-gray-800/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-lg shadow-xl border-t-4 border-blue-600 transition-all duration-700 transform relative ${
                    isVisible['testimonials']
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name} profile photo`}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 border-2 border-blue-400"
                      loading="lazy"
                      width="48"
                      height="48"
                    />
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-blue-300">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-400">{testimonial.position}</p>
                    </div>
                  </div>
                  <blockquote className="text-xs sm:text-sm text-gray-300 italic">"{testimonial.text}"</blockquote>
                  
                  {/* Decorative quote icon */}
                  <div className="text-blue-800/30 text-3xl sm:text-4xl md:text-5xl absolute bottom-2 right-2 sm:bottom-4 sm:right-4" aria-hidden="true">"</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section with glassmorphism effect */}
        <section id="contact" className="py-16 bg-gray-900/50 animate-on-scroll relative overflow-hidden px-4 sm:px-6 lg:px-8">
          {/* Background effect for parallax */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ 
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
            aria-hidden="true"
          ></div>
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-blue-400 transition-all duration-1000 ${isVisible['contact'] ? 'opacity-100' : 'opacity-0'}`}>
              Contact Me
            </h2>
            <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
              <form 
                className={`space-y-3 sm:space-y-4 backdrop-blur-sm bg-gray-800/80 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl transition-all duration-1000 ${isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                role="form"
                aria-label="Contact form"
              >
                <div>
                  <label htmlFor="contact-name" className="sr-only">Your Name</label>
                  <input 
                    id="contact-name"
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-2 sm:p-3 bg-gray-700/70 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base focus:ring-2 focus:ring-blue-400"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Your Email</label>
                  <input 
                    id="contact-email"
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-2 sm:p-3 bg-gray-700/70 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base focus:ring-2 focus:ring-blue-400"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">Your Message</label>
                  <textarea 
                    id="contact-message"
                    placeholder="Your Message" 
                    className="w-full p-2 sm:p-3 bg-gray-700/70 text-white border-2 border-gray-600 rounded-lg h-32 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base focus:ring-2 focus:ring-blue-400"
                    required
                    aria-required="true"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-700 text-white p-2 sm:p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
              {[
                { platform: 'GitHub', url: 'https://github.com/kushitha1521', label: 'Visit my GitHub profile' },
                { platform: 'LinkedIn', url: 'https://linkedin.com/in/kushitha-lakshitha', label: 'Connect on LinkedIn' },
                // { platform: 'Twitter', url: 'https://twitter.com/kushitha_dev', label: 'Follow me on Twitter' },
                { platform: 'Email', url: 'mailto:kushithalakshitha@gmail.com', label: 'Send me an email' }
              ].map((social, index) => (
                <a 
                  key={social.platform}
                  href={social.url}
                  className={`flex flex-col items-center transition-all duration-500 transform focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-2 ${isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-800/50 flex items-center justify-center mb-2 hover:bg-blue-600 transition-colors">
                    <span className="text-sm sm:text-base" aria-hidden="true">{social.platform.charAt(0)}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400">{social.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer with shimmer effect */}
      <footer className="bg-gray-900 text-white py-6 md:py-8 relative overflow-hidden" role="contentinfo">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-blue-400/10 to-blue-900/5 animate-shimmer pointer-events-none"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite linear'
          }}
          aria-hidden="true"
        ></div>
        
        <div className="container mx-auto text-center relative z-10 max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
            {[
              // { platform: 'GitHub', url: 'https://github.com/kushitha-lakshitha' },
              // { platform: 'LinkedIn', url: 'https://linkedin.com/in/kushitha-lakshitha' },
              // { platform: 'Email', url: 'mailto:kushitha@example.com' }
            ].map((social, index) => (
              <a 
                key={social.platform} 
                href={social.url}
                className="hover:text-blue-300 text-gray-400 transition-all duration-300 transform hover:scale-110 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                style={{ animationDelay: `${index * 0.1}s` }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${social.platform} profile`}
              >
                {social.platform}
              </a>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-500">&copy; 2024 <a href='https://linkedin.com/in/kushitha-lakshitha'>Kushitha Lakshitha </a>. All Rights Reserved.</p>
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

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        
        .focus\\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: inherit;
          margin: inherit;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
      `}</style>
      
      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-600 hover:bg-blue-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
        aria-label="Scroll back to top of page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default App;