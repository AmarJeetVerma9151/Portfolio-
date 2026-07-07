import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaDownload, 
  FaExternalLinkAlt,
  FaChevronDown,
  FaCode,
  FaServer,
  FaDatabase,
  FaWhatsapp
} from 'react-icons/fa';
import './index.css';

// --- Data ---
const skills = [
  { name: 'JavaScript', level: 88 },
  { name: 'React.js', level: 90 },
  { name: 'Next.js', level: 85 },
  { name: 'Node.js', level: 90 },
  { name: 'Express.js', level: 90 },
  { name: 'MongoDB', level: 88 },
  { name: 'AWS', level: 75 },
  // { name: 'Docker', level: 70 },
  { name: 'Git', level: 85 },
  { name: 'GitHub', level: 85 },
  { name: 'Postman', level: 95 }
];  


const projects = [
  {
    title: 'Algo Saas',
    desc: 'Backend for an Algo Trading SaaS platform with secure REST APIs, JWT, RBAC, trading strategy execution, portfolio management.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
    live: 'https://algo-saas-client.vercel.app',
    github: 'https://github.com/AmarJeetVerma9151',
    img: 'https://tse3.mm.bing.net/th/id/OIP.yenh6srvXPL2d7qqCEsG7gHaDy?pid=Api&P=0&h=180'
  },
  {
    title: 'Notebook IAS',
    desc: 'Full-stack educational platform for UPSC/IAS aspirants. Secure RESTful APIs, content management, responsive interface.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'React'],
    live: 'https://notebook-ias-web.vercel.app',
    github: 'https://github.com/AmarJeetVerma9151',
    img: 'https://www.readynez.com/media/r3zjlnkm/3-study-strategies-and-resources-for-success.webp?rmode=max&width=778&height=437'
  },
  {
    title: 'Gas Agency Management',
    desc: 'MERN stack system managing branches, delivery personnel onboarding, customer assignment, and delivery tracking.',
    tech: ['MERN', 'RBAC', 'REST API'],
    live: 'https://gas-software.vercel.app',
    github: 'https://github.com/AmarJeetVerma9151',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Rental Management System',
    desc: 'Platform to manage properties,rooms, tenants, and owners payments management.',
    tech: ['Node.js', 'Express.js', 'MongoDB',"React.js"],
    live: 'https://room-rent-admin.vercel.app',
    github: 'https://github.com/AmarJeetVerma9151',
    img: 'https://tse3.mm.bing.net/th/id/OIP.uv2B284-X3xbWPHqmW4ivgHaEK?pid=Api&P=0&h=180'
  },
  {
    title: 'Hoistenger',
    desc: 'Web hosting clone showcasing advanced frontend styling and responsive design techniques with full backend integration.',
    tech: ['HTML5', 'CSS3', 'JavaScript',"Node.js", "MongoDB"],
    live: 'https://hosting-three-tau.vercel.app/',
    github: 'https://github.com/AmarJeetVerma9151',
    img: 'https://tse4.mm.bing.net/th/id/OIP.9X5Y9MH6JIRTiL0THuPfUwHaEK?pid=Api&P=0&h=180'
  },
   {
    title: 'Styky',
    desc: 'Scalable service for sending emails and SMS notifications using Nodemailer and message queues.',
    tech: ['Node.js', 'Nodemailer', 'MongoDB', 'express.js'],
    live: 'https://styky-admin.vercel.app/auth/signin',
    github: 'https://github.com/AmarJeetVerma9151',
    img: 'https://styky.in/img/logo.png?auto=format&fit=crop&q=80&w=800'
  }
];

const experience = [
  {
    role: 'Backend Developer',
    company: 'SG Webapp Techniques Kirti Nager Delhi',
    date: 'June 2025 - Present',
    desc: 'Developed and maintained scalable backend applications using Node.js, Express.js, and MongoDB. Implemented RBAC, JWT authentication,CRON Job,Socket.io and RESTful APIs.'
  },
  {
    role: 'B.Tech - Computer Science And Design',
    company: 'R. R. Institute of Modern Technology Lucknow',
    date: '2022 - 2025',
    desc: 'Gained strong foundational knowledge in computer science, software design, and algorithms.'
  },
  {
    role: 'Diploma in Mechanical Engineering',
    company: 'Jhun Jhun Wala Engineering college Ayodhya',
    date: '2019 - 2022',
    desc: 'Developed analytical and problem-solving skills through core engineering disciplines.'
  }
];

// --- Components ---

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const updateHoverState = (e) => {
      const target = e.target;
      setIsHovering(
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button')
      );
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}

function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="glass"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 9999, background: '#050505'
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: 80, height: 80, borderRadius: '50%', border: '4px solid #4F46E5', borderTopColor: '#9333EA' }}
      />
    </motion.div>
  );
}

function Bubbles() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 40 + 10,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 6,
      animationDelay: Math.random() * 6,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="bubbles-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.animationDuration}s`,
            animationDelay: `${bubble.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formspree.io/f/xkoadpdl", {
        method: "POST",
        headers: { 
            'Accept': 'application/json'
        },
        body: formData
      });
      
      if (response.ok) {
        setFormStatus('sent');
        e.target.reset();
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 3000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <>
      <CustomCursor />
      <div className="bg-mesh" />
      <Bubbles />
      
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <nav className={scrolled ? 'scrolled' : ''}>
            <div className="container nav-container">
              <a href="#" className="logo gradient-text">Amarjeet Verma</a>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
                <a href="#skills" style={{ color: 'white', textDecoration: 'none' }}>Skills</a>
                <a href="#experience" style={{ color: 'white', textDecoration: 'none' }}>Experience</a>
                <a href="#projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</a>
                <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
              </div>
            </div>
          </nav>

          <main>
            {/* Hero Section */}
            <section className="section hero" id="home">
              <div className="container hero-content">
                <motion.div 
                  className="hero-text"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.h2 variants={fadeInUp} style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                    Hello, I'm
                  </motion.h2>
                  <motion.h1 variants={fadeInUp} style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: 1.1 }}>
                    <span className="gradient-text">Amarjeet Verma</span>
                  </motion.h1>
                  <motion.h3 variants={fadeInUp} style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                    Backend Developer (node.js)
                  </motion.h3>
                  <motion.p variants={fadeInUp} style={{ fontSize: '1.1rem', color: '#aaa', marginBottom: '2.5rem', maxWidth: '600px' }}>
                    Passionate backend developer with 1 year of professional experience building secure, scalable, and high-performance backend applications. Adept at Node.js, Express.js, MongoDB, and REST API Development.
                  </motion.p>
                  <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="#contact" className="btn btn-primary">
                      Contact Me <FaEnvelope size={20} />
                    </a>
                    <a href="/Amarjeet_verma.pdf" download="Amarjeet_Verma_Resume.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
                      Download Resume <FaDownload size={20} />
                    </a>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="hero-image"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <div className="hero-img-container">
                    <img src="/profile.png" alt="Amarjeet Verma" />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <section className="section" id="about">
              <div className="container">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                >
                  <h2 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
                    <span className="gradient-text">About Me</span>
                  </h2>
                  <div className="glass" style={{ padding: '3rem' }}>
                    <p style={{ fontSize: '1.2rem', color: '#ddd', marginBottom: '2rem', textAlign: 'center', lineHeight: '1.6' }}>
                      Backend Developer with 1+ years of experience in Node.js, Express.js, MongoDB, JavaScript (ES6+), 
                      RESTful API Development, Authentication & Authorization (JWT, OTP), Database Design, and Third-Party 
                      API Integration. Skilled in building secure, scalable, and high-performance backend applications. 
                      Hands-on experience with Razorpay Payment Gateway Integration, Socket.IO for Real-Time Communication, 
                      Cron Jobs for Task Scheduling, Nodemailer for Email Services, Role-Based Access Control (RBAC), 
                      File Upload Management, and API Security Best Practices. Adept at optimizing application performance, 
                      maintaining code quality, and delivering reliable backend solutions with a focus on continuous 
                      improvement and problem-solving.
                      
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>1+</h3>
                        <p>Years Experience</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2.5rem', color: 'var(--secondary)' }}>10+</h3>
                        <p>Projects Completed</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2.5rem', color: '#60A5FA' }}>5+</h3>
                        <p>Happy Clients</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="section" id="skills">
              <div className="container">
                <motion.h2 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                  style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}
                >
                  <span className="gradient-text">Technical Skills</span>
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                  <motion.div className="glass" style={{ padding: '2rem' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                    <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaServer className="gradient-text" /> Backend & Database
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {skills.filter(s => ['Node.js', 'Express.js', 'MongoDB', 'AWS', 'Docker'].includes(s.name)).map((skill, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>{skill.name}</span>
                            <span style={{ color: 'var(--primary)' }}>{skill.level}%</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1.5, delay: 0.2 }}
                              style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '4px' }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div className="glass" style={{ padding: '2rem' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                    <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaCode className="gradient-text" /> Frontend & Tools
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {skills.filter(s => ["JavaScript",'Git',"GitHub",'Postman'].includes(s.name)).map((skill, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>{skill.name}</span>
                            <span style={{ color: 'var(--primary)' }}>{skill.level}%</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1.5, delay: 0.2 }}
                              style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '4px' }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section className="section" id="experience">
              <div className="container">
                <motion.h2 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                  style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}
                >
                  <span className="gradient-text">Experience & Education</span>
                </motion.h2>

                <div className="timeline">
                  {experience.map((item, index) => (
                    <motion.div 
                      key={index}
                      className="timeline-item"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <div className="timeline-dot" />
                      <div className="glass timeline-content">
                        <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.role}</h3>
                        <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{item.company} | {item.date}</h4>
                        <p style={{ color: '#aaa' }}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section className="section" id="projects">
              <div className="container">
                <motion.h2 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                  style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}
                >
                  <span className="gradient-text">Featured Projects</span>
                </motion.h2>

                <div className="projects-grid">
                  {projects.map((project, index) => (
                    <motion.div 
                      key={index}
                      className="glass project-card"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                    >
                      <div className="project-img">
                        <img src={project.img} alt={project.title} />
                      </div>
                      <div className="project-content">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                        <p style={{ color: '#aaa', fontSize: '0.9rem', flex: 1 }}>{project.desc}</p>
                        <div className="project-tags">
                          {project.tech.map((t, i) => (
                            <span key={i} className="project-tag">{t}</span>
                          ))}
                        </div>
                        <div className="project-links">
                          <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}>
                            Live Demo <FaExternalLinkAlt size={16} />
                          </a>
                          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            <FaGithub size={16} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="section" id="contact">
              <div className="container">
                <motion.div 
                  className="glass contact-section-glass" 
                  style={{ padding: '4rem' }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                >
                  <h2 className="contact-section-title" style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                    <span className="gradient-text">Get In Touch</span>
                  </h2>
                  <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '4rem' }}>
                    Currently looking for new opportunities. My inbox is always open.
                  </p>

                  <div className="contact-container">
                    <div className="contact-info">
                      <div className="contact-item">
                        <div className="contact-icon"><FaPhoneAlt size={24} /></div>
                        <div>
                          <h4 style={{ color: 'white', marginBottom: '0.2rem' }}>Phone</h4>
                          <p style={{ color: '#aaa' }}>+91 9151663358</p>
                        </div>
                      </div>
                      <div className="contact-item">
                        <div className="contact-icon"><FaEnvelope size={24} /></div>
                        <div>
                          <h4 style={{ color: 'white', marginBottom: '0.2rem' }}>Email</h4>
                          <p style={{ color: '#aaa' }}>vermaamarjeet095@gmail.com</p>
                        </div>
                      </div>
                      <div className="contact-item">
                        <div className="contact-icon"><FaMapMarkerAlt size={24} /></div>
                        <div>
                          <h4 style={{ color: 'white', marginBottom: '0.2rem' }}>Location</h4>
                          <p style={{ color: '#aaa' }}>Moti Nager, Delhi 110015</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <a href="https://github.com/AmarJeetVerma9151" target="_blank" rel="noreferrer" className="contact-icon" style={{ textDecoration: 'none' }}>
                          <FaGithub size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/amarjeet-verma-018148261" target="_blank" rel="noreferrer" className="contact-icon" style={{ textDecoration: 'none' }}>
                          <FaLinkedin size={24} />
                        </a>
                         <a href="whatsapp://send?phone=+919151663358" target="_blank" rel="noreferrer" className="contact-icon" style={{ textDecoration: 'none' }}>
                          <FaWhatsapp size={24} />
                        </a>
                      </div>
                    </div>

                    <form className="contact-form" onSubmit={handleFormSubmit}>
                      <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio!" />
                      <input type="hidden" name="_captcha" value="false" />
                      <div className="form-group">
                        <input type="text" name="name" className="form-control" placeholder="Your Name" required disabled={formStatus === 'sending'} />
                      </div>
                      <div className="form-group">
                        <input type="email" name="email" className="form-control" placeholder="Your Email" required disabled={formStatus === 'sending'} />
                      </div>
                      <div className="form-group">
                        <textarea name="message" className="form-control" placeholder="Your Message" required disabled={formStatus === 'sending'}></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={formStatus === 'sending'}>
                        {formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? 'Message Sent!' : formStatus === 'error' ? 'Error Sending' : 'Send Message'}
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>

          <footer>
            <div className="container">
              <p style={{ color: '#aaa' }}>&copy; {new Date().getFullYear()} Amarjeet Verma | Backend Developer</p>
            </div>
          </footer>
        </motion.div>
      )}
    </>
  );
}
