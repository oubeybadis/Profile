import React, { useState } from 'react';
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
  ExternalLink
} from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const projects = [
    {
      title: "Setram Ticketing System",
      description: "Developed a complete web-based ticketing solution for Setram, optimizing public transport accessibility.",
      image: "/setram.png",
      github: "#",
      demo: "#"
    },
    {
      title: "Coding Game API",
      description: "Built a Dockerized backend API for ITC Club, enabling interactive coding challenges and real-time leaderboards.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
      github: "#",
      demo: "#"
    },
    {
      title: "E-Commerce Platform",
      description: "Designed a secure and scalable e-commerce system with seamless product management and payment integration.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      github: "#",
      demo: "#"
    },
    {
      title: "WebRTC Video Conferencing",
      description: "Implemented real-time communication using WebRTC and Mediasoup, ensuring high-quality video conferencing.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
      github: "#",
      demo: "#"
    },
    {
      title: "AI-Based Food Ingredient Prediction",
      description: "Developed a machine learning model to predict food ingredients using AI for enhanced food safety and nutrition analysis.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
      github: "#",
      demo: "#"
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

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile Bottom Navigation */}
      <nav className={`md:hidden fixed bottom-0 left-0 w-full z-30 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} shadow-2xl flex justify-around items-center py-2 px-1`}> 
        {[
          { icon: <Home size={26} />, id: 'home', label: 'Home' },
          { icon: <User size={26} />, id: 'about', label: 'About' },
          { icon: <Folder size={26} />, id: 'projects', label: 'Projects' },
          { icon: <FileText size={26} />, id: 'blog', label: 'Blog' },
          { icon: isDarkMode ? <Sun size={26} /> : <Moon size={26} />, id: 'theme', label: 'Theme' },
        ].map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'theme') setIsDarkMode(!isDarkMode);
              else setActiveSection(item.id);
            }}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 rounded-xl mx-1
              ${item.id === 'theme' ? '' : activeSection === item.id ? (isDarkMode ? 'bg-yellow-400/90 text-slate-900 shadow-lg scale-110' : 'bg-amber-500/90 text-gray-900 shadow-lg scale-110') : isDarkMode ? 'text-gray-100 hover:bg-slate-800' : 'text-gray-500 hover:bg-slate-100'}
              ${item.id === 'theme' ? (isDarkMode ? 'text-yellow-400' : 'text-amber-500') : ''}
            `}
            aria-label={item.label}
          >
            {item.icon}
            <span className="text-xs mt-0.5 font-medium select-none" style={{fontSize: '0.7rem'}}>{item.label}</span>
          </button>
        ))}
      </nav>
      {/* Desktop Sidebar */}
      <nav className={`hidden md:fixed md:left-0 md:top-0 md:h-full md:w-20 md:w-64 md:p-4 md:flex md:flex-col transition-colors duration-200 z-20 ${isDarkMode ? 'bg-slate-900' : 'bg-white shadow-lg'}`}>
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
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`mt-auto flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 active:scale-95
            ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          <span className="hidden md:block">Toggle Theme</span>
        </button>
      </nav>
      {/* Main Content + Footer Wrapper */}
      <div className="flex-1 flex flex-col md:flex-row">
        <main className="flex-1 pt-16 md:pt-0 ml-0 md:ml-64 p-4 md:p-8 transition-all duration-300 flex flex-col md:items-stretch">
          {/* Hero Section */}
          <section id="home" className={`${activeSection === 'home' ? 'block' : 'hidden'} animate-fade-in`}> 
            <div className="max-w-4xl mx-auto text-center">
              <img
                src="/profile.jpg"
                alt="Amar Neche"
                className="w-40 h-40 md:w-80 md:h-80 rounded-full mx-auto mt-8 md:mt-12 mb-6 md:mb-8 border-2 border-amber-500 shadow-xl object-cover p-1 animate-fade-in"
              />
              <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 animate-fade-in">Oubey Badis</h1>
              <div className="inline-block bg-amber-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 rounded-full mb-4 md:mb-6 shadow-lg animate-fade-in">
                Software Engineer | Laravel | Flutter
              </div>
              <p className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed animate-fade-in
                md:max-w-2xl md:mx-auto md:tracking-wide md:leading-8 md:text-gray-300 md:px-2">
                👋 Hi! I'm a Software Engineer with a Bachelor's degree in Networks and Telecommunications Engineering from USTHB, Algeria, and I'm currently pursuing a Master's in Software Engineering.<br />
                With over 2 years of experience as a fullstack developer, I specialize in designing scalable RESTful APIs and mobile applications using Flutter.<br />
                I'm passionate about problem-solving 🧩 and writing clean, scalable code. I'm always ready to turn business challenges into tech solutions 📈, and I'm excited for the next challenge! 🚀
              </p>
              <div className="flex justify-center space-x-6 mb-6 md:mb-8 animate-fade-in">
                {[
                  { icon: <Github size={24} />, link: "https://github.com/oubeybadis" },
                  { icon: <Linkedin size={24} />, link: "https://www.linkedin.com/in/oubey-badis-7b7700342/" },
                  { icon: <Twitter size={24} />, link: "#" }
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
              <button className="bg-amber-500 text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg flex items-center space-x-2 mx-auto hover:bg-amber-600 transition-colors duration-200 shadow-lg active:scale-95 animate-fade-in">
                <Download size={20} />
                <span>Download Resume</span>
              </button>
            </div>
          </section>
          {/* Projects Section */}
          <section id="projects" className={`${activeSection === 'projects' ? 'block' : 'hidden'} animate-fade-in`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Latest Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {projects.map((project, index) => (
                <div key={index} className={`rounded-lg overflow-hidden shadow-lg transition-colors duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} animate-fade-in`}> 
                  <img src={project.image} alt={project.title} className="w-full h-40 md:h-48 object-cover" />
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2">{project.title}</h3>
                    <p className={`mb-3 md:mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                    <div className="flex space-x-4">
                      <a href={project.github} className="text-amber-500 hover:text-amber-600 flex items-center transition-colors duration-200 active:scale-90">
                        <Github size={20} className="mr-2" /> Code
                      </a>
                      <a href={project.demo} className="text-amber-500 hover:text-amber-600 flex items-center transition-colors duration-200 active:scale-90">
                        <ExternalLink size={20} className="mr-2" /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Blog Section */}
          <section id="blog" className={`${activeSection === 'blog' ? 'block' : 'hidden'} animate-fade-in`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Latest Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {blogPosts.map((post, index) => (
                <div key={index} className={`rounded-lg overflow-hidden shadow-lg transition-colors duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} animate-fade-in`}>
                  <img src={post.thumbnail} alt={post.title} className="w-full h-40 md:h-48 object-cover" />
                  <div className="p-4 md:p-6">
                    <span className="text-amber-500 text-xs md:text-sm">{post.date}</span>
                    <h3 className="text-lg md:text-xl font-bold my-2">{post.title}</h3>
                    <p className={`mb-3 md:mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.preview}</p>
                    <a href="#" className="text-amber-500 hover:text-amber-600 transition-colors duration-200 active:scale-90">Read More →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* About Section */}
          <section id="about" className={`${activeSection === 'about' ? 'block' : 'hidden'} animate-fade-in`}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>About Me</h2>
            <div className={`rounded-lg p-4 md:p-8 shadow-lg transition-colors duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}> 
              <div className={`max-w-3xl mx-auto p-4 md:p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}> 
                <h1 className={`text-xl md:text-3xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>Oubey Badis</h1>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Software Engineer | Backend Developer | AI Enthusiast</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <img src="https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
                  <img src="https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
                  <img src="https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white" alt="TensorFlow" />
                </div>
                <section className="mt-4">
                  <h2 className={`text-lg md:text-2xl font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>🎓 Education</h2>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Master's in Software Engineering (Ongoing) - University of Blida, Algeria<br />
                    Bachelor's in Networks & Telecommunications Engineering - USTHB, Algeria
                  </p>
                </section>
                <section className="mt-4">
                  <h2 className={`text-lg md:text-2xl font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>💻 Skills</h2>
                  <ul className={`list-disc ml-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}> 
                    <li>Backend: Laravel, RESTful APIs, Docker</li>
                    <li>Frontend: TailwindCSS, UI/UX</li>
                    <li>Database: MySQL</li>
                    <li>AI & ML: Deep Learning (CNN, RNN), AI API Integration</li>
                    <li>Networking: TCP/IP, ADM Networking</li>
                  </ul>
                </section>
                <section className="mt-4">
                  <h2 className={`text-lg md:text-2xl font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>🚀 Projects</h2>
                  <ul className={`list-disc ml-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}> 
                    <li>Setram Ticketing System - Web-based ticketing solution</li>
                    <li>Coding Game API - Dockerized backend API for ITC Club</li>
                    <li>E-Commerce Platform - Secure & scalable e-commerce system</li>
                    <li>WebRTC Video Conferencing - Built with Mediasoup</li>
                    <li>AI-Based Food Ingredient Prediction</li>
                  </ul>
                </section>
                <section className="mt-4">
                  <h2 className={`text-lg md:text-2xl font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>📖 Learning</h2>
                  <ul className={`list-disc ml-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}> 
                    <li>Deep Learning: CNN, RNN, GANs, GNNs</li>
                    <li>API-First Design with Apidog</li>
                  </ul>
                </section>
                <section className="mt-4">
                  <h2 className={`text-lg md:text-2xl font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>🤝 Let's Connect!</h2>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    📍 Algeria | 📧 <a href="mailto:oubeybadis20@gmail.com" className={isDarkMode ? 'text-yellow-400' : 'text-amber-600'}>oubeybadis20@gmail.com</a><br />
                    📞 0549828623 | 🌐 <a href="https://www.linkedin.com/in/oubey-badis-7b7700342/" className={isDarkMode ? 'text-yellow-400' : 'text-amber-600'}>LinkedIn</a>
                  </p>
                </section>
              </div>
              <h3 className={`text-lg md:text-xl font-bold mb-3 md:mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Tech Stack</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {techStack.map((tech, index) => (
                  <span key={index} className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm transition-colors duration-200 ${isDarkMode ? 'bg-slate-800 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>{tech}</span>
                ))}
              </div>
            </div>
          </section>
          <footer >
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} Oubey Badis. All rights reserved.
          </p>         
        </div>
      </footer>
        </main>

      </div>
      
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