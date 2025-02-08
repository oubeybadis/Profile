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
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar Navigation */}
      <nav className={`fixed left-0 top-0 h-full w-20 md:w-64 p-4 flex flex-col transition-colors duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-white shadow-lg'}`}>
        <div className="flex items-center justify-center md:justify-start space-x-3 mb-10">
          <img 
            src="/profile.jpg" 
            alt="Logo" 
            className="w-10 h-10 rounded-full"
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
              className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200
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
          className={`mt-auto flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 
            ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          <span className="hidden md:block">Toggle Theme</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="ml-20 md:ml-64 p-8">
        {/* Hero Section */}
        <section id="home" className={activeSection === 'home' ? 'block' : 'hidden'}>
          <div className="max-w-4xl mx-auto text-center">
            <img
              src="/profile.jpg"
              alt="Amar Neche"
              className="w-48 h-48 rounded-full mx-auto mt-12 mb-8 border-4 border-amber-500 shadow-xl"
            />
            <h1 className="text-4xl font-bold mb-4">Oubey Badis</h1>
            <div className="inline-block bg-amber-500 text-gray-900 px-4 py-2 rounded-full mb-6 shadow-lg">
              Software Engineer | Laravel 
            </div>
            <p className="text-lg mb-8 leading-relaxed">
            👋 Hi! I'm a Software Engineer with a Bachelor's in Networks and Telecommunications Engineering from USTHB, Algeria, currently pursuing a Master's in Software Engineering. With over 4 years of experience in web development and a strong focus on backend engineering, I specialize in designing scalable RESTful APIs and integrating AI-driven solutions. Passionate about problem-solving 🧩 and writing clean, scalable code, I'm ready to turn business challenges into tech solutions 📈. Excited for the next challenge! 🚀
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: <Github size={24} />, link: "https://github.com/oubeybadis" },
                { icon: <Linkedin size={24} />, link: "https://www.linkedin.com/in/oubey-badis-7b7700342/" },
                { icon: <Twitter size={24} />, link: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="hover:text-amber-500 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <button className="bg-amber-500 text-gray-900 px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto hover:bg-amber-600 transition-colors duration-200 shadow-lg">
              <Download size={20} />
              <span>Download Resume</span>
            </button>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={activeSection === 'projects' ? 'block' : 'hidden'}>
          <h2 className="text-3xl font-bold mb-8">Latest Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className={`rounded-lg overflow-hidden shadow-lg transition-colors duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                  <div className="flex space-x-4">
                    <a href={project.github} className="text-amber-500 hover:text-amber-600 flex items-center transition-colors duration-200">
                      <Github size={20} className="mr-2" /> Code
                    </a>
                    <a href={project.demo} className="text-amber-500 hover:text-amber-600 flex items-center transition-colors duration-200">
                      <ExternalLink size={20} className="mr-2" /> Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className={activeSection === 'blog' ? 'block' : 'hidden'}>
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className={`rounded-lg overflow-hidden shadow-lg transition-colors duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
                <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-amber-500 text-sm">{post.date}</span>
                  <h3 className="text-xl font-bold my-2">{post.title}</h3>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.preview}</p>
                  <a href="#" className="text-amber-500 hover:text-amber-600 transition-colors duration-200">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={activeSection === 'about' ? 'block' : 'hidden'}>
  <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>About Me</h2>
  <div className={`rounded-lg p-8 shadow-lg transition-colors duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
    <div className={`max-w-3xl mx-auto p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>Oubey Badis</h1>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Software Engineer | Backend Developer | AI Enthusiast</p>

      <div className="flex flex-wrap gap-2 mt-4">
        <img src="https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
        <img src="https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
        <img src="https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white" alt="TensorFlow" />
      </div>

      <section className="mt-4">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>🎓 Education</h2>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          Master's in Software Engineering (Ongoing) - University of Blida, Algeria
          <br />
          Bachelor's in Networks & Telecommunications Engineering - USTHB, Algeria
        </p>
      </section>

      <section className="mt-4">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>💻 Skills</h2>
        <ul className={`list-disc ml-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>Backend: Laravel, RESTful APIs, Docker</li>
          <li>Frontend: TailwindCSS, UI/UX</li>
          <li>Database: MySQL</li>
          <li>AI & ML: Deep Learning (CNN, RNN), AI API Integration</li>
          <li>Networking: TCP/IP, ADM Networking</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>🚀 Projects</h2>
        <ul className={`list-disc ml-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>Setram Ticketing System - Web-based ticketing solution</li>
          <li>Coding Game API - Dockerized backend API for ITC Club</li>
          <li>E-Commerce Platform - Secure & scalable e-commerce system</li>
          <li>WebRTC Video Conferencing - Built with Mediasoup</li>
          <li>AI-Based Food Ingredient Prediction</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>📖 Learning</h2>
        <ul className={`list-disc ml-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>Deep Learning: CNN, RNN, GANs, GNNs</li>
          <li>API-First Design with Apidog</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'}`}>🤝 Let's Connect!</h2>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          📍 Algeria | 📧 <a href="mailto:oubeybadis20@gmail.com" className={isDarkMode ? 'text-yellow-400' : 'text-amber-600'}>oubeybadis20@gmail.com</a>
          <br />
          📞 0549828623 | 🌐 <a href="https://www.linkedin.com/in/oubey-badis-7b7700342/" className={isDarkMode ? 'text-yellow-400' : 'text-amber-600'}>LinkedIn</a>
        </p>
      </section>
    </div>

    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Tech Stack</h3>
    <div className="flex flex-wrap gap-3">
      {techStack.map((tech, index) => (
        <span key={index} className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 
          ${isDarkMode ? 'bg-slate-800 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
          {tech}
        </span>
      ))}
    </div>
  </div>
</section>
      </main>

      {/* Footer */}
      <footer className={`ml-20 md:ml-64 text-center p-8 transition-colors duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-white shadow-lg'}`}>
        <div className="flex justify-center space-x-6 mb-4">
          {[
            { icon: <Github size={20} />, link: "https://github.com/oubeybadis" },
            { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/oubey-badis-7b7700342/" },
            { icon: <Twitter size={20} />, link: "#" }
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              className="hover:text-amber-500 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>© 2025 Oubey Badis. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;