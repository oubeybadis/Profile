import React, { useState, useEffect } from 'react';
import { 
  Home,
  User,
  Folder,
  FileText,
  Moon,
  Sun,
  Github,
  Linkedin,
  Twitter,
  Download,
  ExternalLink,
  Eye,
  X
} from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  github: string | null;
  demo: string | null;
  detailedDescription: string;
  technologies: string[];
  images: string[];
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle theme and persist to localStorage
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  // On mount: read stored preference or follow browser preference; default to light
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        setIsDarkMode(true);
        return;
      }
      if (stored === 'light') {
        setIsDarkMode(false);
        return;
      }
    } catch (e) {
      // ignore
    }

    // No stored preference — respect browser if it explicitly prefers dark, otherwise default to light
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const projects: Project[] = [
    
    {
      title: "Tahalile - Medical At-Home Services",
      description: "A healthcare startup platform connecting patients with medical professionals for at-home services. Flutter mobile app with Laravel backend.",
      image: "/tahalile.PNG",
      github: null,
      demo: "https://tahalile.com/",
      detailedDescription: "Tahalile is an innovative medical services platform that brings professional healthcare to patients' homes. Built with Flutter for seamless mobile experience and Laravel for robust backend infrastructure. Features include appointment booking, real-time provider tracking, medical history management, secure payment processing, and telehealth consultations.",
      technologies: ["Flutter", "Laravel", "PostgreSQL", "Firebase", "Stripe API", "WebSocket"],
      images: ["/tahalile.png", "/tahalile2.png", "/tahalile3.png"]
    },
    {
      title: "Kindergarten Management Platform",
      description: "A comprehensive full-stack platform for kindergarten administration with student tracking, attendance, and parent communication.",
      image: "/kindergarten.PNG",
      github: null,
      demo: "https://safehugskindergarten.com/",
      detailedDescription: "A complete kindergarten management system built with Laravel and Vue.js. Features include student information management, attendance tracking, grade reporting, parent-teacher communication portal, fee management, event scheduling, and document management. Designed to streamline administrative tasks and enhance communication between school and parents.",
      technologies: ["Laravel", "Vue.js", "MySQL", "TailwindCSS", "PDF Generation", "Email Services"],
      images: ["/kindergarten.png", "/kindergarten2.png", "/kindergarten3.png"]
    },
    {
      title: "Coding Game API",
      description: "Built a Dockerized backend API for ITC Club, enabling interactive coding challenges and real-time leaderboards.",
      image: "/itcp.jpg",
      github: "https://github.com/oubeybadis/coding_game_api",
      demo: null,
      detailedDescription: "A competitive coding platform API that supports multiple programming languages, real-time code execution, and automated testing. Features include user authentication, challenge management, leaderboards, and code submission with instant feedback.",
      technologies: ["Laravel", "Docker", "Redis", "WebSockets", "JWT"],
      images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60"]
    },
    
    {
      title: "E-Commerce Platform",
      description: "Designed a secure and scalable e-commerce system with seamless product management and payment integration.",
      image: "/ecom.png",
      github: null,
      demo: "https://ecom.getoxtro.com/",
      detailedDescription: "A full-featured e-commerce solution with advanced inventory management, multi-payment gateway integration, order tracking, and analytics dashboard. Supports multiple vendors, dynamic pricing, and automated email marketing campaigns.",
      technologies: ["Laravel", "Vue.js", "Stripe API", "PostgreSQL", "AWS S3"],
      images: ["/ecom1.png", "/ecom2.png"]
    },
    {
      title: "Setram Ticketing System",
      description: "Developed a complete web-based ticketing solution for Setram, optimizing public transport accessibility.",
      image: "/strm1.png",
      github:null,
      demo: null,
      detailedDescription: "A comprehensive public transportation management system built with Laravel and Vue.js. Features include real-time ticket booking, route optimization, payment processing, and admin dashboard for fleet management. The system handles thousands of daily transactions with 99.9% uptime.",
      technologies: ["Laravel", "Vue.js", "MySQL", "Redis", "Docker"],
      images: ["/strm1.png","/strm2.PNG","/strm3.PNG","/strm4.PNG","/strm5.PNG"]
    },
    {
      title: "WebRTC Video Conferencing",
      description: "Implemented real-time communication using WebRTC and Mediasoup, ensuring high-quality video conferencing.",
      image: "/rtc.png",
      github: null,
      demo: null,
      detailedDescription: "A high-performance video conferencing platform built with WebRTC and Mediasoup for scalable real-time communication. Features include screen sharing, recording capabilities, virtual backgrounds, and support for up to 50 concurrent participants with adaptive bitrate streaming.",
      technologies: ["WebRTC", "Mediasoup", "Node.js", "Socket.io", "Redis"],
      images: ["/rtc.png", "/rtc2.PNG", "/rtc1.PNG"]
    },
    {
      title: "AI-Based Food Ingredient Prediction",
      description: "Developed a machine learning model to predict food ingredients using AI for enhanced food safety and nutrition analysis.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
      github: "https://github.com/oubeybadis/Ai-food",
      demo: "https://aifoodpredict.streamlit.app/",
      detailedDescription: "An AI-powered application that analyzes food images to predict ingredients and nutritional information. Uses deep learning models trained on a dataset of 50,000+ food images. Provides detailed nutritional breakdown, allergen warnings, and dietary recommendations.",
      technologies: ["Python", "TensorFlow", "Laravel", "Vue.js", "Docker"],
      images: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"]
    }
  ];

  const blogPosts = [
    {
      title: "Building Scalable APIs with Laravel",
      preview: "Best practices for creating maintainable and efficient APIs...",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
      date: "March 15, 2024"
    },
    {
      title: "Vue.js 3 Composition API Deep Dive",
      preview: "Understanding the power of the Composition API...",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
      date: "March 10, 2024"
    }
  ];

  const techStack = [
    "Laravel", "Vue.js", "PHP", "JavaScript", "MySQL", 
    "TailwindCSS", "Git", "Docker", "Python"
  ];

  // Helper functions
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const hasLinks = (project: Project) => {
    return project.github || project.demo;
  };

  interface ProjectLink {
    type: 'github' | 'demo';
    url: string;
    icon: React.ReactNode;
    label: string;
  }

  const getProjectLinks = (project: Project): ProjectLink[] => {
    const links: ProjectLink[] = [];
    if (project.github) {
      links.push({ type: 'github', url: project.github, icon: <Github size={20} className="mr-2" />, label: 'Code' });
    }
    if (project.demo) {
      links.push({ type: 'demo', url: project.demo, icon: <ExternalLink size={20} className="mr-2" />, label: 'Demo' });
    }
    return links;
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile Bottom Navigation */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-30 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} border-t shadow-2xl safe-area-inset-bottom`}> 
        <div className="flex justify-around items-center py-3 px-1 max-w-full overflow-x-auto">
          {[
            { icon: <Home size={24} />, id: 'home', label: 'Home' },
            { icon: <User size={24} />, id: 'about', label: 'About' },
            { icon: <Folder size={24} />, id: 'projects', label: 'Projects' },
            { icon: <FileText size={24} />, id: 'blog', label: 'Blog' },
            { icon: isDarkMode ? <Sun size={24} /> : <Moon size={24} />, id: 'theme', label: 'Theme' },
          ].map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'theme') toggleTheme();
                else setActiveSection(item.id);
              }}
              className={`flex flex-col items-center justify-center flex-1 min-w-[60px] py-2 px-2 transition-all duration-200 rounded-lg mx-0.5 active:scale-95
                ${item.id === 'theme' ? '' : activeSection === item.id ? (isDarkMode ? 'bg-yellow-400/90 text-slate-900 shadow-md' : 'bg-amber-500/90 text-gray-900 shadow-md') : isDarkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-500 hover:bg-slate-100'}
                ${item.id === 'theme' ? (isDarkMode ? 'text-yellow-400 hover:bg-slate-800' : 'text-amber-500 hover:bg-slate-100') : ''}
              `}
              aria-label={item.label}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium select-none leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      {/* Desktop Sidebar */}
      <nav className={`hidden md:fixed md:left-0 md:top-0 md:h-full md:w-64 md:p-4 md:flex md:flex-col transition-colors duration-200 z-20 ${isDarkMode ? 'bg-slate-900' : 'bg-white shadow-lg'}`}>
        <div className="flex items-center justify-center md:justify-start space-x-3 mb-10 object-cover">
          <img 
            src="/profile.jpg" 
            alt="Logo" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="hidden md:block font-bold text-xl">Oubey Badis</span>
        </div>
        <div className="flex flex-col space-y-4">
          {[
            { icon: <Home size={24} />, text: 'Home', id: 'home' },
            { icon: <User size={24} />, text: 'About', id: 'about' },
            { icon: <Folder size={24} />, text: 'Projects', id: 'projects' },
            { icon: <FileText size={24} />, text: 'Blog', id: 'blog' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 active:scale-95
                ${activeSection === item.id 
                  ? 'bg-amber-500 text-gray-900 shadow-lg' 
                  : `${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}`}
            >
              {item.icon}
              <span className="hidden md:block">{item.text}</span>
            </button>
          ))}
        </div>
        <button
          onClick={toggleTheme}
          className={`mt-auto flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 active:scale-95
            ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          <span className="hidden md:block">Toggle Theme</span>
        </button>
      </nav>
      {/* Main Content + Footer Wrapper */}
      <div className="flex-1 flex flex-col md:flex-row pb-20 md:pb-0">
        <main className="flex-1 pt-0 md:pt-0 md:ml-64 px-3 sm:px-4 md:px-8 py-4 md:py-8 transition-all duration-300 flex flex-col md:items-stretch">
          {/* Hero Section */}
          <section id="home" className={`${activeSection === 'home' ? 'block' : 'hidden'} animate-fade-in w-full`}> 
            <div className="max-w-4xl mx-auto text-center">
              <img
                src="/profile.jpg"
                alt="Amar Neche"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-80 md:h-80 rounded-full mx-auto mt-4 sm:mt-8 md:mt-12 mb-4 sm:mb-6 md:mb-8 border-2 border-amber-500 shadow-xl object-cover p-1 animate-fade-in"
              />
              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 animate-fade-in">Oubey Badis</h1>
              <div className="inline-block bg-amber-500 text-gray-900 px-2 sm:px-3 py-1 md:px-4 md:py-2 rounded-full mb-3 sm:mb-4 md:mb-6 shadow-lg animate-fade-in text-xs sm:text-sm">
                Software Engineer | Laravel | Flutter
              </div>
              <p className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed animate-fade-in px-2
                md:max-w-2xl md:mx-auto md:tracking-wide md:leading-8 ${!isDarkMode ? 'text-slate-900' : 'text-white'}`}>
                 Hi! I'm a Software Engineer with a Bachelor's degree in Networks and Telecommunications Engineering from USTHB, Algeria, and I'm currently pursuing a Master's in Software Engineering.<br />
                With over 2 years of experience as a fullstack developer, I specialize in designing scalable RESTful APIs and mobile applications using Flutter.<br />
                I'm passionate about problem-solving 🧩 and writing clean, scalable code. I'm always ready to turn business challenges into tech solutions , and I'm excited for the next challenge! 
              </p>
              <div className="flex justify-center space-x-4 sm:space-x-6 mb-4 sm:mb-6 md:mb-8 animate-fade-in">
                {[
                  { icon: <Github size={20} className="sm:w-6 sm:h-6" />, link: "https://github.com/oubeybadis" },
                  { icon: <Linkedin size={20} className="sm:w-6 sm:h-6" />, link: "https://www.linkedin.com/in/oubey-badis-7b7700342/" },
                  { icon: <Twitter size={20} className="sm:w-6 sm:h-6" />, link: "#" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="hover:text-amber-500 transition-colors duration-200 active:scale-90"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <a
                href="https://drive.google.com/file/d/1AoX6J9IPU40ZoGcxDt6YO_h6PUcpDOzt/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 text-gray-900 px-3 sm:px-4 py-2 md:px-6 md:py-3 rounded-lg flex items-center w-fit space-x-2 mx-auto hover:bg-amber-600 transition-colors duration-200 shadow-lg active:scale-95 animate-fade-in text-sm sm:text-base"
              >
                <Download size={18} className="sm:w-5 sm:h-5" />
                <span>Download Resume</span>
              </a>
            </div>
          </section>
          {/* Projects Section */}
          <section id="projects" className={`${activeSection === 'projects' ? 'block' : 'hidden'} animate-fade-in w-full`}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">Latest Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
              {projects.map((project, index) => (
                <div key={index} className={`rounded-lg overflow-hidden shadow-lg transition-colors duration-200 hover:shadow-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} animate-fade-in flex flex-col h-full`}> 
                  <img src={project.image} alt={project.title} className="w-full h-32 sm:h-40 md:h-48 object-cover" />
                  <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">{project.title}</h3>
                    <p className={`mb-3 md:mb-4 flex-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {hasLinks(project) ? (
                        getProjectLinks(project).map((link, linkIndex) => (
                          <a 
                            key={linkIndex}
                            href={link.url} 
                            className="text-amber-500 hover:text-amber-600 flex items-center transition-colors duration-200 active:scale-90 text-xs sm:text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.icon} {link.label}
                          </a>
                        ))
                      ) : (
                        <button 
                          onClick={() => openModal(project)}
                          className="text-amber-500 hover:text-amber-600 flex items-center transition-colors duration-200 active:scale-90 text-xs sm:text-sm"
                        >
                          <Eye size={18} className="mr-1 sm:mr-2" /> See More
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Blog Section */}
          <section id="blog" className={`${activeSection === 'blog' ? 'block' : 'hidden'} animate-fade-in w-full`}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">Latest Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
              {blogPosts.map((post, index) => (
                <div key={index} className={`rounded-lg overflow-hidden shadow-lg transition-colors duration-200 hover:shadow-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} animate-fade-in flex flex-col h-full`}>
                  <img src={post.thumbnail} alt={post.title} className="w-full h-32 sm:h-40 md:h-48 object-cover" />
                  <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col">
                    <span className="text-amber-500 text-xs sm:text-sm">{post.date}</span>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold my-1 sm:my-2">{post.title}</h3>
                    <p className={`mb-3 md:mb-4 flex-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.preview}</p>
                    <a href="#" className="text-amber-500 hover:text-amber-600 transition-colors duration-200 active:scale-90 text-xs sm:text-sm">Read More →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        
            
          {/* About Section */}
<section id="about" className={`${activeSection === 'about' ? 'block' : 'hidden'} animate-fade-in w-full`}>
  <div className="max-w-4xl mx-auto">
    <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      About <span className="text-amber-500">Me</span>
    </h2>
    
    {/* Profile Summary Card */}
    <div className={`rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200'}`}>
      <div className="flex flex-col md:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <img 
          src="/profile.jpg" 
          alt="Oubey Badis" 
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-2 border-amber-500 object-cover shadow-md flex-shrink-0"
        />
        <div className="text-center sm:text-left flex-1">
          <h3 className={`text-lg sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Oubey Badis</h3>
          <div className={`text-base sm:text-lg md:text-xl mb-2 sm:mb-3 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
            Software Engineer | Laravel | Flutter
          </div>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 sm:mb-4`}>
            Passionate software engineer with 2+ years of experience in full-stack development, specializing in Laravel and RESTful APIs. 
            Currently pursuing a Master's in Software Engineering while working on innovative projects that bridge technology and real-world solutions.
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <a 
              href="mailto:oubeybadis20@gmail.com" 
              className={`flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${isDarkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-gray-100 text-amber-600 hover:bg-gray-200'}`}
            >
              ✉️ Email
            </a>
            <a 
              href="tel:+213549828623" 
              className={`flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${isDarkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-gray-100 text-amber-600 hover:bg-gray-200'}`}
            >
              📞 Call
            </a>
            <a 
              href="https://www.linkedin.com/in/oubey-badis-7b7700342/" 
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${isDarkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-gray-100 text-amber-600 hover:bg-gray-200'}`}
            >
              <Linkedin size={14} className="mr-1" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Education & Experience */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Education */}
      <div className={`rounded-xl p-4 sm:p-6 shadow-lg ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200'}`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Education
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h4 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Master's in Software Engineering</h4>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Saad Dahleb University Blida 1 • 2024 - Present</p>
            <p className={`mt-1 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Specializing in software architecture, distributed systems, and microservices architecture.
            </p>
          </div>
          <div>
            <h4 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Bachelor's in Network & Telecommunications Engineering</h4>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>USTHB, Algiers • 2021 - 2024</p>
            <p className={`mt-1 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Comprehensive training in network infrastructure, communication systems, and network security.
            </p>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className={`rounded-xl p-4 sm:p-6 shadow-lg ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200'}`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Experience
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h4 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Backend Developer - Laravel Specialist</h4>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Freelance / Collaborative Projects • 2023 - Present</p>
            <ul className={`mt-2 space-y-1 list-disc ml-5 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Specialized in Laravel API development with 1 year of intensive expertise</li>
              <li>Designed and implemented complete web and mobile applications</li>
              <li>Led development teams on multi-disciplinary projects</li>
              <li>Created scalable and maintainable software architectures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Skills & Projects */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Technical Skills */}
      <div className={`rounded-xl p-4 sm:p-6 shadow-lg ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200'}`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Technical Skills
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h4 className={`font-semibold mb-2 text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Backend Development</h4>
            <div className="flex flex-wrap gap-2">
              {['Laravel (Expert)', 'RESTful APIs', 'PHP', 'MVC Architecture'].map((skill) => (
                <span key={skill} className={`px-2 sm:px-3 py-1 rounded-full text-xs ${isDarkMode ? 'bg-slate-800 text-amber-400' : 'bg-amber-100 text-amber-800'}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frontend & Mobile</h4>
            <div className="flex flex-wrap gap-2">
              {['Tailwind CSS', 'Flutter', 'Responsive Design', 'UI/UX'].map((skill) => (
                <span key={skill} className={`px-2 sm:px-3 py-1 rounded-full text-xs ${isDarkMode ? 'bg-slate-800 text-amber-400' : 'bg-amber-100 text-amber-800'}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Infrastructure & DevOps</h4>
            <div className="flex flex-wrap gap-2">
              {['Docker', 'Linux', 'Git'].map((skill) => (
                <span key={skill} className={`px-2 sm:px-3 py-1 rounded-full text-xs ${isDarkMode ? 'bg-slate-800 text-amber-400' : 'bg-amber-100 text-amber-800'}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AI & Emerging Tech</h4>
            <div className="flex flex-wrap gap-2">
              {['Machine Learning',  'WebRTC', 'Microservices'].map((skill) => (
                <span key={skill} className={`px-2 sm:px-3 py-1 rounded-full text-xs ${isDarkMode ? 'bg-slate-800 text-amber-400' : 'bg-amber-100 text-amber-800'}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notable Projects */}
      <div className={`rounded-xl p-4 sm:p-6 shadow-lg ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200'}`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
          <Folder className="w-5 h-5 mr-2" />
          Notable Projects
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h4 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Integrated Healthcare Mobile App</h4>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Developed a comprehensive healthcare mobile application with telemedicine features and robust backend architecture.
            </p>
          </div>
          <div>
            <h4 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>E-commerce Platform</h4>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              End-to-end design of an e-commerce solution with Laravel backend, payment integration, and inventory management.
            </p>
          </div>
          <div>
            <h4 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SETRAM Transportation System</h4>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Developed a public transportation management system with complex backend architecture for real-time operations.
            </p>
          </div>
          <div>
            <h4 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AI Food Ingredient Prediction</h4>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Machine learning project integrating AI algorithms with Laravel backend for food data analysis.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Professional Skills */}
    <div className={`rounded-xl p-4 sm:p-6 shadow-lg mb-6 sm:mb-8 ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200'}`}>
      <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Professional Skills
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <h4 className={`font-semibold mb-2 text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Leadership</h4>
          <ul className={`space-y-1 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li className="flex items-start">
              <span className="mr-2">•</span> Technical Team Leadership
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Project Coordination
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Technical Mentoring
            </li>
          </ul>
        </div>
        <div>
          <h4 className={`font-semibold mb-2 text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Problem Solving</h4>
          <ul className={`space-y-1 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li className="flex items-start">
              <span className="mr-2">•</span> Technical Analysis
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Innovation & Creativity
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Debugging & Optimization
            </li>
          </ul>
        </div>
        <div>
          <h4 className={`font-semibold mb-2 text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Adaptability</h4>
          <ul className={`space-y-1 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li className="flex items-start">
              <span className="mr-2">•</span> Rapid Learning
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Technology Watch
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Change Adaptation
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Languages */}
    <div className={`rounded-xl p-4 sm:p-6 shadow-lg ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        Languages
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <div className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Arabic</div>
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Native proficiency</div>
        </div>
        <div>
          <div className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>French</div>
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fluent (academic & professional)</div>
        </div>
        <div>
          <div className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>English</div>
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Intermediate (technical communication)</div>
        </div>
      </div>
    </div>
  </div>
</section>
          <footer className="mt-auto pt-4 md:pt-8 pb-4 md:pb-0">
            <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-6">
              <p className={`text-center text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                &copy; {new Date().getFullYear()} Oubey Badis. All rights reserved.
              </p>         
            </div>
          </footer>
        </main>

      </div>
      
      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-10 p-2 rounded-full ${isDarkMode ? 'bg-slate-800 text-gray-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors duration-200`}
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 md:p-8 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2">{selectedProject.title}</h2>
              <p className={`text-sm sm:text-base md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedProject.description}</p>
            </div>
            
            {/* Modal Body */}
            <div className="p-4 sm:p-6 md:p-8">
              {/* Project Images */}
              <div className="mb-6">
                <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Project Screenshots</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {selectedProject.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={image} 
                        alt={`${selectedProject.title} screenshot ${index + 1}`}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Detailed Description */}
              <div className="mb-6">
                <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Detailed Description</h3>
                <p className={`leading-relaxed text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedProject.detailedDescription}
                </p>
              </div>
              
              {/* Technologies Used */}
              <div className="mb-6">
                <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${isDarkMode ? 'bg-slate-800 text-amber-400' : 'bg-amber-100 text-amber-800'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Project Links (if any) */}
              {hasLinks(selectedProject) && (
                <div>
                  <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Project Links</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    {getProjectLinks(selectedProject).map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 text-xs sm:text-sm ${isDarkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-gray-100 text-amber-600 hover:bg-gray-200'}`}
                      >
                        {link.icon} {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      {/* <footer className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} Oubey Badis. All rights reserved.
          </p>         
        </div>
      </footer> */}
    </div>
  );
}

export default App;