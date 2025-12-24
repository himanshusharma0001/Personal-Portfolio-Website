import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Briefcase, User, ChevronDown } from 'lucide-react';

import profileImage from './images/image1.jpeg';
import project1Image from './images/image2.png';
import project2Image from './images/image3.png';
import project3Image from './images/image4.png';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const emailInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionName) => {
    const refs = {
      home: homeRef,
      about: aboutRef,
      projects: projectsRef,
      skills: skillsRef,
      contact: contactRef
    };
    
    refs[sectionName]?.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionName);
    setIsMenuOpen(false);

    // Focus email input when navigating to contact
    if (sectionName === 'contact') {
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Using Formspree - replace 'YOUR_FORM_ID' with your actual Formspree form ID
      // Get it from https://formspree.io/ after signing up
      const response = await fetch('https://formspree.io/f/xgownqvo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          message: message || 'New contact request',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        setMessage('');
        alert('Thank you! Your message has been sent successfully.');
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      alert('Oops! Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects = [
    {
      title: "Alex– A Discord Moderation Bot  ",
      description: "Developed a Discord moderation bot to manage and maintain server discipline by automating moderation tasks such as warning users, muting, kicking, banning, and logging activities.",
      tags: ["Python"],
      color: "from-blue-500 to-cyan-500",
      image: project1Image,
      link: "https://github.com/himanshusharma0001/Alex-Discord-Moderation-Bot-"
    },
    {
      title: "Desktop Assistant",
      description: "Developed a Python-based Desktop Assistant capable of performing tasks such as voice recognition, opening applications, searching the web, telling date/time, and executing system commands using speech input.",
      tags: ["Python", "Flask", "React.js"],
      color: "from-purple-500 to-pink-500",
      image: project2Image,
      link: "https://github.com/himanshusharma0001/Desktop-Assistant"
    },
    {
      title: "Personal Portfolio – A Portfolio Website  ",
      description: "Developed a responsive and interactive portfolio website using HTML, CSS, and JavaScript to showcase projects and skills.",
      tags: ["Node.js", "Tailwind CSS", "HTML"],
      color: "from-orange-500 to-red-500",
      image: project3Image,
      link: "#"
    }
  ];

  const skills = [
    { name: "Python", level: 90 },
    { name: "Java", level: 85 },
    { name: "C", level: 80 },
    { name: "AI/ML", level: 70 },
    { name: "FrontEnd", level: 60 },
    { name: "Node.js", level: 60 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/98 backdrop-blur-md shadow-lg shadow-purple-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              Portfolio
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative hover:text-cyan-400 transition-colors font-medium ${activeSection === item.toLowerCase() ? 'text-cyan-400' : ''}`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-slate-800/50 rounded-lg transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-800/50">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-4 py-3 hover:bg-slate-800/50 rounded-lg transition-colors ${activeSection === item.toLowerCase() ? 'text-cyan-400 bg-slate-800/30' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={homeRef} className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        <div className="text-center z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Himanshu Sharma</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Full Stack, Python & AI/ML Developer
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border border-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all"
            >
              Contact Me
            </button>
          </div>
          <button 
            onClick={() => scrollToSection('about')}
            className="mt-16 mx-auto block"
          >
            <ChevronDown className="animate-bounce" size={32} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <User className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">About Me</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full h-96 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <User size={120} className="text-cyan-400/50" />
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I’m a motivated computer applications student with a strong interest in software development and emerging technologies. I enjoy building practical projects like desktop assistants and Discord bots, and I’m constantly improving my skills in programming, problem-solving, and system design. I believe in learning by doing, exploring new ideas, and consistently adding features that create real value.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                projects, or sharing knowledge with the developer community.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/himanshusharma0001" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-cyan-500 transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/himanshu-sharma-b67352298/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-cyan-500 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:himanshureal820@gmail.com" className="p-3 bg-slate-800 rounded-full hover:bg-cyan-500 transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
<section ref={projectsRef} className="py-20 px-4 bg-slate-900/50">
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center gap-3 mb-12">
      <Briefcase className="text-cyan-400" size={32} />
      <h2 className="text-4xl font-bold">Featured Projects</h2>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div
          key={index}
          className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
        >
          {/* REPLACE THE OLD DIV WITH THIS: */}
          <div className="h-48 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cyan-400 hover:gap-4 transition-all"
            >
              View Project <ExternalLink size={16} />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Code className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">Skills & Expertise</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-cyan-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-8">
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <input
              ref={emailInputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full px-6 py-3 bg-slate-800 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message (optional)"
              rows="4"
              className="w-full px-6 py-3 bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white resize-none"
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Get In Touch'}
            </button>
            {submitStatus === 'success' && (
              <p className="text-green-400">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400">Failed to send. Please try again.</p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Himanshu Sharma. All Rights Reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}