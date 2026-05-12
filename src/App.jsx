import React, { useEffect, useState, useRef, useCallback } from 'react';
import { projects } from './data/projects';
import { skills } from './data/skills';
import { experiences } from './data/experiences';
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaMedium,
  FaGlobe,
  FaEnvelope
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { FaExternalLinkAlt } from "react-icons/fa";

// ─────────────────────────────────────────────
// Sub-components defined OUTSIDE App to prevent
// re-creation on every render
// ─────────────────────────────────────────────

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
  <span role="text" aria-label={text}>
    {displayText.split(" ").map((word, i) => {
      const highlightWords = [
        "IoT",
        "Developer",
        "Embedded",
        "Systems",
        "React",
        "AI",
        "Robotics",
        "Cybersecurity"
      ];

      const isHighlighted = highlightWords.includes(word);

      return (
        <span key={i}>
          <span
            className={
              isHighlighted
                ? "text-cyan-400 font-semibold drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
                : "text-gray-300"
            }
          >
            {word}
          </span>

          <span> </span>
        </span>
      );
    })}

    <span className="animate-pulse" aria-hidden="true">|</span>
  </span>
);
};

// SkillBar: receives isVisible as a prop
const SkillBar = ({ name, level, delay, isVisible }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-blue-300 text-sm sm:text-base">{name}</span>
      <span
        className="text-gray-400 text-sm sm:text-base"
        aria-label={`${level} percent proficiency`}
      >
        {level}%
      </span>
    </div>
    <div
      className="h-2 sm:h-3 bg-gray-700 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={level}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label={`${name} skill level`}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-900 to-blue-400 rounded-full transition-all duration-1000 ease-out"
        style={{
          width: isVisible ? `${level}%` : '0%',
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  </div>
);

// TimelineItem: receives isVisibleTimeline as a prop
const TimelineItem = ({ experience, index, isVisibleTimeline }) => {

  const isLeft = index % 2 === 0;

  return (
    <article className="mb-4 w-full">

      {/* ── Mobile View ───────────────────────── */}
      <div className="md:hidden w-full">
        <div
          className={`bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl px-5 py-4 border-l-4 border-blue-600 transition-all duration-700 transform ${
            isVisibleTimeline
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: `${index * 200}ms` }}
        >

          {/* Header */}
          <div className="flex items-center mb-3">

            <div className="bg-blue-700 shadow-lg w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <span className="font-semibold text-white text-sm">
                {index + 1}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-blue-400 text-lg">
                {experience.position}
              </h3>

              <h4 className="text-blue-300 text-sm">
                {experience.company}
              </h4>
            </div>

          </div>

          {/* Period */}
          <time className="text-xs text-gray-400 mb-3 block">
            {experience.period}
          </time>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {experience.description}
          </p>

          {/* Achievements */}
          <ul className="space-y-2">
            {experience.achievements.map((achievement, i) => (
              <li
                key={i}
                className="text-sm text-gray-400"
                style={{
                  transform: isVisibleTimeline
                    ? 'translateX(0)'
                    : 'translateX(-20px)',
                  opacity: isVisibleTimeline ? 1 : 0,
                  transition: 'transform 0.5s ease, opacity 0.5s ease',
                  transitionDelay: `${index * 200 + i * 100 + 300}ms`,
                }}
              >
                • {achievement}
              </li>
            ))}
          </ul>

        </div>
      </div>

      {/* ── Desktop Alternating Timeline ───────────────────────── */}
      <div
        className={`hidden md:flex items-center w-full ${
          isLeft ? 'flex-row' : 'flex-row-reverse'
        }`}
      >

        {/* Empty Space */}
        <div className="w-5/12"></div>

        {/* Center Timeline Dot */}
        <div className="relative flex items-center justify-center w-2/12">

          <div className="w-5 h-5 bg-blue-600 rounded-full border-4 border-black z-10"></div>

        </div>

        {/* Content Card */}
        <div
          className={`w-5/12 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-500/20 transition-all duration-700 transform hover:border-blue-500/40 ${
            isVisibleTimeline
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: `${index * 200}ms` }}
        >

          {/* Header */}
          <div className="flex items-center mb-4">

            <div className="bg-blue-700 shadow-lg w-10 h-10 rounded-full flex items-center justify-center mr-4">
              <span className="font-semibold text-white">
                {index + 1}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-blue-400 text-xl">
                {experience.position}
              </h3>

              <h4 className="text-blue-300 text-sm">
                {experience.company}
              </h4>
            </div>

          </div>

          {/* Period */}
          <time className="text-sm text-gray-400 mb-4 block">
            {experience.period}
          </time>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {experience.description}
          </p>

          {/* Achievements */}
          <ul className="space-y-2">
            {experience.achievements.map((achievement, i) => (
              <li
                key={i}
                className="text-sm text-gray-400"
                style={{
                  transform: isVisibleTimeline
                    ? 'translateX(0)'
                    : 'translateX(-20px)',
                  opacity: isVisibleTimeline ? 1 : 0,
                  transition: 'transform 0.5s ease, opacity 0.5s ease',
                  transitionDelay: `${index * 200 + i * 100 + 300}ms`,
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


// ─────────────────────────────────────────────
// Main App Component
// ─────────────────────────────────────────────

const App = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(''); // 'success' | 'error' | ''
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ── SEO ──────────────────────────────────────
  useEffect(() => {
    document.title =
      'Kushitha Lakshitha | Electronics & Computer Science Undergraduate | React Developer';

    const setMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(property ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', 'Portfolio of Kushitha Lakshitha, an Electronics and Computer Science undergraduate specializing in React development, IoT systems, AI solutions, embedded systems, robotics, cybersecurity, and creative digital design.');
    setMeta('keywords', 'Kushitha Lakshitha, React Developer, Frontend Developer, IoT Developer, Embedded Systems Engineer, AI Developer, Robotics, Electronics and Computer Science, Web Developer Sri Lanka');
    setMeta('author', 'Kushitha Lakshitha');
    setMeta('robots', 'index, follow');
    setMeta('viewport', 'width=device-width, initial-scale=1.0');
    setMeta('theme-color', '#0f172a');

    setMeta('og:title', 'Kushitha Lakshitha | React Developer & IoT Engineer Portfolio', true);
    setMeta('og:description', 'Explore projects and creative works by Kushitha Lakshitha.', true);
    setMeta('og:image', 'https://kushithalakshitha.live/kushitha2.jpg', true);
    setMeta('og:url', 'https://kushithalakshitha.live/', true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'Kushitha Lakshitha Portfolio', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Kushitha Lakshitha | React Developer & IoT Engineer');
    setMeta('twitter:description', 'Portfolio showcasing React development, AI projects, embedded systems, robotics, IoT solutions, and creative media works.');
    setMeta('twitter:image', 'https://kushithalakshitha.live/kushitha2.jpg');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://kushithalakshitha.live/');

    let sd = document.querySelector('#structured-data');
    if (!sd) {
      sd = document.createElement('script');
      sd.id = 'structured-data';
      sd.type = 'application/ld+json';
      document.head.appendChild(sd);
    }
    sd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Kushitha Lakshitha',
      url: 'https://kushithalakshitha.live/',
      image: 'https://kushithalakshitha.live/kushitha2.jpg',
      description: 'Electronics and Computer Science undergraduate specializing in React, embedded systems, AI, IoT, robotics, and creative digital solutions.',
      jobTitle: 'React Developer | IoT & Embedded Systems Enthusiast',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Kelaniya' },
      sameAs: ['https://github.com/kushitha1521', 'https://linkedin.com/in/kushitha-lakshitha'],
      knowsAbout: ['React.js', 'Tailwind CSS', 'JavaScript', 'FastAPI', 'Arduino', 'ESP32', 'IoT Development', 'Embedded Systems', 'AI', 'ML', 'Cybersecurity', 'Robotics'],
    });
  }, []);

  // ── Mouse parallax ────────────────────────────
  useEffect(() => {
    const handleMouseMove = e => {
      setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ── Back-to-top visibility ────────────────────
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Intersection Observer (scroll animations) ─
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections by ID
    const sectionIds = ['home','education', 'projects', 'skills', 'experience','achievements' ,'creative showcase', 'contact'];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Also observe any .animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ── Mobile nav close ──────────────────────────
  const handleNavClick = useCallback(() => {
    if (window.innerWidth < 768) setIsMenuOpen(false);
  }, []);

  // ── Contact form ──────────────────────────────
  const handleFormChange = e => {
    const { id, value } = e.target;
    const key = id.replace('contact-', '');
    setFormData(prev => ({ ...prev, [key]: value }));
  };

const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    setFormStatus("error");
    return;
  }

  setFormSubmitting(true);
  setFormStatus("");

  try {
    // 1️⃣ Send message to YOU
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    // 2️⃣ Auto reply to USER
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
      {
        to_name: formData.name,
        to_email: formData.email,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    setFormStatus("success");
    setFormData({ name: "", email: "", message: "" });

  } catch (error) {
    console.error(error);
    setFormStatus("error");
  } finally {
    setFormSubmitting(false);
  }
};

  // ── Filtered projects ─────────────────────────
  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  const navItems = ['Home','Education', 'Skills', 'Projects',  'Experience','Achievements', 'Creative Showcase', 'Contact'];

  const socialLinks = [
  {
    platform: "GitHub",
    url: "https://github.com/Kushitha1521",
    icon: FaGithub,
    label: "Visit my GitHub",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/kushitha-lakshitha",
    icon: FaLinkedin,
    label: "Visit my LinkedIn",
  },
  // {
  //   platform: "YouTube",
  //   url: "https://youtube.com/@yourchannel",
  //   icon: FaYoutube,
  //   label: "Visit my YouTube channel",
  // },
  // {
  //   platform: "Instagram",
  //   url: "https://instagram.com/yourprofile",
  //   icon: FaInstagram,
  //   label: "Visit my Instagram",
  // },
  {
    platform: "Medium",
    url: "https://medium.com/@kushithalakshitha",
    icon: FaMedium,
    label: "Read my Medium articles",
  },
  {
    platform:"Email",
    url: "mailto:kushithalakshitha@gmail.com",
    icon: FaEnvelope,
    label: "Send me an email"
  }
];
  // ── Render ────────────────────────────────────
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      {/* ── Navbar ─────────────────────────────── */}
      <nav
        className="backdrop-blur-md bg-gray-900/80 text-white p-4 fixed w-full top-0 z-50 shadow-lg"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto flex justify-between items-center max-w-7xl px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="text-xl font-bold text-blue-400 animate-pulse"
            aria-label="Kushitha Lakshitha Portfolio Home"
          >
            My Portfolio
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-1"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-4 lg:space-x-6">
            {navItems.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-300 text-gray-300 transition-all duration-300 hover:scale-110 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-900/90 rounded-lg p-4 backdrop-blur-sm" id="mobile-menu">
            <div className="flex flex-col space-y-3">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-300 text-gray-300 transition-all duration-300 py-2 px-3 rounded hover:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={handleNavClick}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── Main ───────────────────────────────── */}
      <main id="main-content">

        {/* ══ HERO ══════════════════════════════ */}
        <section
          id="home"
          className="relative min-h-screen flex items-center overflow-hidden bg-black pt-20 md:pt-24 px-4 sm:px-6 lg:px-8"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full" aria-hidden="true" />

          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
              backgroundImage: 'radial-gradient(circle, #4a90e2 10%, transparent 10%)',
              backgroundSize: '30px 30px',
            }}
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

            {/* Left – Text */}
            <div
              className={`transition-all duration-1000 ${
                isVisible['home'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                <span className="text-white">Hi, I'm </span>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Kushitha Lakshitha
                </span>
              </h1>

              <div className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 min-h-[4rem]">
                <TypewriterText text="IoT Developer | Embedded Systems | React Developer | AI & Robotics Explorer | Cybersecurity Enthusiast" />
              </div>

              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                I am an Electronics and Computer Science undergraduate at the University of Kelaniya with a passion for
                building innovative digital solutions using React, IoT, Embedded Systems, AI, and Robotics. I enjoy
                combining creativity with technology to create impactful user experiences, smart systems, and modern web
                applications.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 transition duration-300 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/20 text-center"
                >
                  Hire Me
                </a>
                <a
                  href="/Kushitha_Lakshitha_CV.pdf"
                  download
                  className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition duration-300 px-8 py-4 rounded-xl font-semibold text-center"
                >
                  Download CV
                </a>
              </div>
            </div>

            {/* Right – Photo */}
            <div
              className={`relative flex justify-center transition-all duration-1000 ${
                isVisible['home'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="absolute w-[220px] sm:w-[280px] bg-blue-500/30 blur-[100px] rounded-full" aria-hidden="true" />
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-[30px] blur opacity-70 group-hover:opacity-100 transition duration-500" aria-hidden="true" />
                <img
                  src="kushitha2.jpg"
                  alt="Kushitha Lakshitha"
                  className="relative w-[280px] sm:w-[350px] md:w-[420px] object-cover rounded-[30px] border border-white/10 shadow-2xl group-hover:scale-105 transition duration-500"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Wave divider */}
        <div className="text-gray-900 w-full" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="currentColor" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
        </div>


        {/* Education */}
               
               <section id="education" className="py-20 bg-gray-900/50 px-4 sm:px-6 lg:px-8">
  <div className="container mx-auto max-w-6xl">

    {/* Title */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14 text-blue-400">
      Education
    </h2>

    <div className="space-y-8">

      {/* BSc */}
      <div className="bg-gray-900/80 border border-blue-500/20 rounded-2xl p-6 sm:p-8 shadow-xl hover:scale-[1.02] transition duration-300">

        <h3 className="text-xl sm:text-2xl font-bold text-blue-400">
          BSc (Hons) Electronics and Computer Science
        </h3>

        <p className="text-gray-300 mt-2">
          University of Kelaniya
        </p>

        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
          <span className="bg-blue-900/40 px-3 py-1 rounded-full">
            GPA: 3.6
          </span>
          <span className="bg-cyan-900/40 px-3 py-1 rounded-full">
            Final Year Undergraduate
          </span>
        </div>

      </div>

      {/* Hardware Certificate */}
      <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-xl hover:scale-[1.02] transition duration-300">

        <h3 className="text-xl sm:text-2xl font-bold text-cyan-400">
          Computer Hardware Certificate Course
        </h3>

        <p className="text-gray-300 mt-2">
          ICT Center – University of Kelaniya
        </p>

      </div>

      {/* Makerspace */}
      <div className="bg-gray-900/80 border border-purple-500/20 rounded-2xl p-6 sm:p-8 shadow-xl hover:scale-[1.02] transition duration-300">

        <h3 className="text-xl sm:text-2xl font-bold text-purple-400">
          Makerspace Program (Electronics & Robotics)
        </h3>

        <p className="text-gray-300 mt-2">
          American Center – U.S. Embassy in Sri Lanka
        </p>

        <span className="inline-block mt-3 text-xs bg-purple-900/40 px-3 py-1 rounded-full text-purple-300">
          Ongoing
        </span>

      </div>

      {/* A/L */}
      <div className="bg-gray-900/80 border border-green-500/20 rounded-2xl p-6 sm:p-8 shadow-xl hover:scale-[1.02] transition duration-300">

        <h3 className="text-xl sm:text-2xl font-bold text-green-400">
          G.C.E. Advanced Level (2021)
        </h3>

        <p className="text-gray-300 mt-2">
          Telijjawila Central College
        </p>

        <p className="text-gray-400 mt-3 text-sm">
          Passed with A, B, C grades in Physical Science stream  
          (Combined Mathematics, ICT, Physics)
        </p>

      </div>

    </div>
  </div>
</section>
               
               
               
               {/* ══ SKILLS ════════════════════════════ */}
<section id="skills" className="py-16 bg-black px-4 sm:px-6 lg:px-8">

  <div className="container mx-auto max-w-7xl">

    {/* Title */}
    <h2
      className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-blue-400 transition-all duration-1000 ${
        isVisible["skills"] ? "opacity-100" : "opacity-0"
      }`}
    >
      Technical Skills
    </h2>

    {/* Two Columns */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

      {/* ── Electronics Skills ───────────────── */}
      <div>

        <h3 className="text-2xl font-semibold text-cyan-400 mb-6 text-center">
          Electronics & Embedded Systems
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">

          {skills
            .filter(skill => skill.type === "electronics")
            .map((skill, index) => (
              <div
                key={index}
                className={`group bg-gray-900 border border-cyan-500/10 rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-500 hover:border-cyan-500/40 hover:-translate-y-1 ${
                  isVisible["skills"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >

                {/* Icon
                <div className="w-14 h-14 rounded-full bg-cyan-900/40 flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition">

                  <span className="text-cyan-300 font-bold text-lg">
                    {skill.name.charAt(0)}
                  </span>

                </div> */}

                {/* Skill Name */}
                <h3 className="text-white font-semibold text-sm sm:text-base group-hover:text-cyan-300 transition">
                  {skill.name}
                </h3>

                {/* Category
                <p className="text-xs text-gray-500 mt-1">
                  {skill.category}
                </p> */}

              </div>
            ))}

        </div>
      </div>

      {/* ── Computer Science Skills ───────────────── */}
      <div>

        <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
          Computer Science & Software
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">

          {skills
            .filter(skill => skill.type === "software")
            .map((skill, index) => (
              <div
                key={index}
                className={`group bg-gray-900 border border-blue-500/10 rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-500 hover:border-blue-500/40 hover:-translate-y-1 ${
                  isVisible["skills"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >

                {/* Icon
                <div className="w-14 h-14 rounded-full bg-blue-900/40 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">

                  <span className="text-blue-300 font-bold text-lg">
                    {skill.name.charAt(0)}
                  </span>

                </div> */}

                {/* Skill Name */}
                <h3 className="text-white font-semibold text-sm sm:text-base group-hover:text-blue-300 transition">
                  {skill.name}
                </h3>

                {/* Category
                <p className="text-xs text-gray-500 mt-1">
                  {skill.category}
                </p> */}

              </div>
            ))}

        </div>
      </div>

    </div>

  </div>
</section>





        {/* ══ PROJECTS ══════════════════════════ */}
        <section
          id="projects"
          className="py-16 bg-gray-900/50 px-4 sm:px-6 lg:px-8"
        >
          <div className="container mx-auto max-w-7xl">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-blue-400 transition-all duration-1000 ${isVisible['projects'] ? 'opacity-100' : 'opacity-0'}`}>
              My Projects
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Project categories">
              {[
                { id: 'all', label: 'All' },
                { id: 'web', label: 'Web' },
                { id: 'data', label: 'Data' },
                { id: 'mobile', label: 'Mobile' },
                { id: 'IOT', label: 'IoT' },
                { id: 'Desktop Application', label: 'Desktop App' },
                { id: 'Digital Design', label: 'Digital Design' },
                 { id: 'Electronics', label: 'Electronics' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls="projects-grid"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {filteredProjects.length === 0 ? (
              <p className="text-center text-gray-400 py-12">No projects in this category yet.</p>
            ) : (
              <div
                id="projects-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                role="tabpanel"
                aria-label="Projects list"
              >
                {filteredProjects.map((project, index) => (
                  <article
                    key={project.slug ?? index}
                    className={`backdrop-blur-sm bg-gray-800/90 p-4 sm:p-5 md:p-6 rounded-lg shadow-xl border-l-4 border-blue-600 transition-all duration-500 transform hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-400 ${
                      isVisible['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Use a plain anchor so no Router is required; swap to <Link> if you have a router */}
                    <a
                      href={`/projects/${project.slug}`}
                      className="block focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                      aria-label={`View ${project.name} project`}
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
                        {project.technologies.map((tech, ti) => (
                          <span
                            key={ti}
                            className="bg-blue-900/70 text-blue-300 px-2 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-700 transition-colors"
                            role="listitem"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <p
                      className="inline-flex items-center gap-3 mt-4 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition duration-300"
      >
                      See More
                      <span className="text-lg">→</span>
                    </p>

                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Wave divider */}
        <div className="text-black w-full transform rotate-180" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="currentColor" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
        </div>

    

        {/* ══ EXPERIENCE ════════════════════════ */}
        <section id="experience" className="py-16 bg-black px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-blue-400 transition-all duration-1000 ${isVisible['experience'] ? 'opacity-100' : 'opacity-0'}`}>
              Professional Experience
            </h2>

            <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
              {/* Timeline vertical line */}
              <div
                className="absolute h-full border-2 border-blue-600/50 left-1/2 transform -translate-x-1/2 hidden md:block"
                style={{
                  height: isVisible['experience'] ? '100%' : '0%',
                  transition: 'height 1.5s ease-out',
                }}
                aria-hidden="true"
              />

              {experiences.map((exp, index) => (
                <TimelineItem
                  key={index}
                  experience={exp}
                  index={index}
                  isVisibleTimeline={isVisible['experience']}
                />
              ))}
            </div>
          </div>
        </section>



      {/* Achievements */}
              <section id="achievements" className="py-20 bg-gray-900/50 px-4 sm:px-6 lg:px-8">
  <div className="container mx-auto max-w-6xl">

    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14 text-yellow-400">
      Achievements
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Robot Battles */}
      <div className="bg-gray-900/80 border border-yellow-500/20 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition">

        <h3 className="text-lg font-bold text-yellow-400">
          2nd Runner-up
        </h3>

        <p className="text-gray-300 mt-1">
          UOK Robot Battles 2K25
        </p>

       <a
        href="https://www.linkedin.com/posts/kushitha-lakshitha_biteblades-uokrobotbattle2k25-zone24x7-activity-7378414094556545025-XrAK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkaV0MB7CtGiDgsZMfEFKJrugJsTg0c5kU"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-3 text-sm text-yellow-400 hover:text-yellow-300 transition group"
      >
        See more
        <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform" />
      </a>

      </div>

      {/* JapuraExpo */}
      <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition">

        <h3 className="text-lg font-bold text-cyan-400">
          1st Runner-up
        </h3>

        <p className="text-gray-300 mt-1">
          JapuraExpo 2K25
        </p>

        <a
          href="https://www.linkedin.com/posts/kushitha-lakshitha_innovation-universityofkelaniya-ecs-activity-7421892922012278784-woi0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkaV0MB7CtGiDgsZMfEFKJrugJsTg0c5kU"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 text-sm text-cyan-400 hover:text-cyan-300 transition group"
        >
          See more
          <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform" />
        </a>

      </div>

      {/* ICAPS */}
      <div className="bg-gray-900/80 border border-blue-500/20 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition">

        <h3 className="text-lg font-bold text-blue-400">
          1st Runner-up
        </h3>

        <p className="text-gray-300 mt-1">
          ICAPS 2025 Undergraduate Research Symposium (UOK)
        </p>

        <a
        href="https://www.linkedin.com/posts/kushitha-lakshitha_icaps2025-innovation-smartenergy-activity-7382741595755827200-tcuO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkaV0MB7CtGiDgsZMfEFKJrugJsTg0c5kU"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-3 text-sm text-blue-400 hover:text-blue-300 transition group"
      >
        See more
        <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform" />
      </a>

      </div>

      {/* Medusa CTF */}
      <div className="bg-gray-900/80 border border-purple-500/20 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition">

        <h3 className="text-lg font-bold text-purple-400">
          Final Round Participant
        </h3>

        <p className="text-gray-300 mt-1">
          Medusa 1.0 (CTF Competition) – University of Kelaniya (2024)
        </p>

        <a
          href="https://www.linkedin.com/posts/kushitha-lakshitha_ctf-teamwork-kelaniya-activity-7281242204730236929-208O?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkaV0MB7CtGiDgsZMfEFKJrugJsTg0c5kU"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 text-sm text-purple-400 hover:text-purple-300 transition group"
        >
          See more
          <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform" />
        </a>

      </div>

      {/* PARAMOUNT */}
      <div className="bg-gray-900/80 border border-green-500/20 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition md:col-span-2">

        <h3 className="text-lg font-bold text-green-400">
          Top 10 Team Member
        </h3>

        <p className="text-gray-300 mt-1">
          PARAMOUNT 3.0 Mathematics Competition (2024)
        </p>

        <a
          href="https://www.linkedin.com/posts/kushitha-lakshitha_paramount3-mathabrx-kelaniyapride-activity-7170740735862919169-1RVz?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkaV0MB7CtGiDgsZMfEFKJrugJsTg0c5kU"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 text-sm text-green-400 hover:text-green-300 transition group"
        >
          See more
          <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform" />
        </a>

      </div>

    </div>
  </div>
</section>

        

        {/* ══ CREATIVE WORKS ════════════════════ */}
        <section
          id="creative showcase"
          className="py-20 bg-black via-gray-950 to-black px-4 sm:px-6 lg:px-8"
        >
          <div className="container mx-auto max-w-7xl">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent transition-all duration-1000 ${
              isVisible['creative showcase'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Creative Works &amp; Media
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-14">
              Showcasing my creativity through photo editing, digital content creation, visual storytelling, and YouTube
              content production.
            </p>

            {/* Photo gallery */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">Edited Photo Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { src: '/BigBrother.png',  alt: 'Logo Design',    title: 'Logo Design',  sub: 'Photoshop & Lightroom Editing',     border: 'border-blue-500/20' },
                  { src: '/certificate.png', alt: 'Certificate Design',     title: 'Certificate Design',   sub: 'Creative Design using Photoshop',      border: 'border-cyan-500/20' },
                  { src: '/lionDish.png',    alt: 'Logo Design',     title: 'Logo Design',   sub: 'Advanced Color Grading',            border: 'border-purple-500/20' },
                ].map((photo, i) => (
                  <div key={i} className={`group relative overflow-hidden rounded-2xl border ${photo.border} shadow-lg`}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-5">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{photo.title}</h4>
                        <p className="text-sm text-gray-300">{photo.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="/creative-gallery"
                className="inline-flex items-center gap-3 mt-4 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition duration-300"
>
                Explore Full Gallery
                <span className="text-lg">→</span>
              </a>
            </div>

            {/* YouTube channels */}
            <div>
              <h3 className="text-2xl font-semibold text-red-400 mb-6">YouTube Channels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: '/icons/quietworld.png',
                    iconBg: 'bg-indigo-500',
                    borderColor: 'border-indigo-500/20',
                    btnBg: 'bg-indigo-500 hover:bg-indigo-600',
                    title: 'Quiet World',
                    subtitle: 'Travel · Calm Content · Aesthetic Edits · Relaxing Visuals',
                    desc: 'Quiet World is a creative space where I share cinematic travel experiences, calm aesthetic edits, and relaxing visual storytelling. It focuses on minimal travel moments, peaceful scenery, emotional visuals, and immersive storytelling designed to give viewers a soothing digital escape from everyday life.',
                    url: 'https://www.youtube.com/@quietworldlak', // replace with your real channel link
                    btnLabel: 'Explore Channel',
                  },
                  // {
                  //   icon: '🎬',
                  //   iconBg: 'bg-blue-500',
                  //   borderColor: 'border-blue-500/20',
                  //   btnBg: 'bg-blue-500 hover:bg-blue-600',
                  //   title: 'Editing Showcase',
                  //   subtitle: 'Photo Manipulation & Visual Arts',
                  //   desc: 'Showcasing cinematic edits, poster designs, social media creatives, and visual storytelling projects.',
                  //   url: '',
                  //   btnLabel: 'Explore Videos',
                  // },
                ].map((ch, i) => (
                  <div
                    key={i}
                    className={`bg-gray-900/80 backdrop-blur-md border ${ch.borderColor} rounded-2xl p-6 hover:scale-105 transition duration-500 shadow-xl`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-full overflow-hidden ${ch.iconBg}`}>
                        <img
                          src={ch.icon}
                          alt={ch.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">{ch.title}</h4>
                        <p className="text-sm text-gray-400">{ch.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-5">{ch.desc}</p>
                    <a
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block ${ch.btnBg} text-white px-5 py-2 rounded-lg text-sm font-medium transition`}
                    >
                      {ch.btnLabel}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CONTACT ═══════════════════════════ */}
        <section
          id="contact"
          className="py-16 bg-gray-900/50 relative overflow-hidden px-4 sm:px-6 lg:px-8"
        >
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
            aria-hidden="true"
          />

          <div className="container mx-auto max-w-7xl relative z-10">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-blue-400 transition-all duration-1000 ${isVisible['contact'] ? 'opacity-100' : 'opacity-0'}`}>
              Contact Me
            </h2>

            <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">

              {/* Status messages */}
              {formStatus === 'success' && (
                <div role="alert" className="mb-4 p-4 bg-green-800/80 border border-green-500 rounded-lg text-green-300 text-sm text-center">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {formStatus === 'error' && (
                <div role="alert" className="mb-4 p-4 bg-red-900/80 border border-red-500 rounded-lg text-red-300 text-sm text-center">
                  ❌ Something went wrong. Please fill in all fields and try again.
                </div>
              )}

              <form
                onSubmit={handleFormSubmit}
                noValidate
                className={`space-y-3 sm:space-y-4 backdrop-blur-sm bg-gray-800/80 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl transition-all duration-1000 ${
                  isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                aria-label="Contact form"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-gray-400 text-sm mb-1">Your Name <span aria-hidden="true">*</span></label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Kushitha Lakshitha"
                    className="w-full p-2 sm:p-3 bg-gray-700/70 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base focus:ring-2 focus:ring-blue-400"
                    required
                    aria-required="true"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-gray-400 text-sm mb-1">Your Email <span aria-hidden="true">*</span></label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="kushitha@example.com"
                    className="w-full p-2 sm:p-3 bg-gray-700/70 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base focus:ring-2 focus:ring-blue-400"
                    required
                    aria-required="true"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-gray-400 text-sm mb-1">Your Message <span aria-hidden="true">*</span></label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Hi Kushitha, I'd love to work with you on…"
                    className="w-full p-2 sm:p-3 bg-gray-700/70 text-white border-2 border-gray-600 rounded-lg h-32 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base focus:ring-2 focus:ring-blue-400"
                    required
                    aria-required="true"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full bg-blue-700 text-white p-2 sm:p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {formSubmitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Social links */}
            {/* Social links */}
            <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">

              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    className={`group flex flex-col items-center transition-all duration-500 transform focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-xl p-3 ${
                      isVisible["contact"]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >

                    {/* Icon Circle */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-900 border border-blue-500/20 flex items-center justify-center mb-2 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300 shadow-lg">

                      <Icon className="text-xl text-white" />

                    </div>

                    {/* Label */}
                    <span className="text-xs sm:text-sm text-gray-400 group-hover:text-blue-400 transition">
                      {social.platform}
                    </span>

                  </a>
                );
              })}

            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ─────────────────────────────── */}
      <footer className="bg-gray-900 text-white py-6 md:py-8 relative overflow-hidden" role="contentinfo">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.08) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite linear',
          }}
          aria-hidden="true"
        />
        <div className="container mx-auto text-center relative z-10 max-w-7xl px-4 sm:px-6">
          <p className="text-xs sm:text-sm text-gray-500">
            &copy; {new Date().getFullYear()}{' '}
            <a
              href="https://linkedin.com/in/kushitha-lakshitha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              Kushitha Lakshitha
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* ── Back to Top ────────────────────────── */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-600 hover:bg-blue-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Scroll back to top of page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* ── Global styles ──────────────────────── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .sr-only {
          position: absolute; width: 1px; height: 1px;
          padding: 0; margin: -1px; overflow: hidden;
          clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
        .focus\\:not-sr-only:focus {
          position: static; width: auto; height: auto;
          padding: inherit; margin: inherit; overflow: visible;
          clip: auto; white-space: normal;
        }
      `}</style>
    </div>
  );
};

export default App;