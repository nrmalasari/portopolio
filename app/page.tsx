"use client";

import { useEffect, useRef, useState } from "react";
import Lanyard from "./components/Lanyard/Lanyard";
import { motion } from "framer-motion";
import ShinyText from "./components/ShinyText/ShinyText";
import ProfileCard from "../src/blocks/Components/ProfileCard/ProfileCard";
import { 
  Code2, 
  Smartphone, 
  Palette, 
  Cpu,
  GitBranch,
  Server,
  ExternalLink,
  Github,
  Play,
  FileText,
  Mail,
  Linkedin,
  Instagram,
  MessageCircle,
  Award,
  Download
} from "lucide-react";

// FadeContent Component
interface FadeContentProps {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  easing = "ease-out",
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = "",
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(element);
          setTimeout(() => {
            setInView(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : initialOpacity,
        transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none',
      }}
    >
      {children}
    </div>
  );
};

// Navbar Component - SIMPLIFIED VERSION
const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            {/* Empty space for balance */}
          </div>

          <div className="flex-1 flex justify-center">
            <div className="flex space-x-6 bg-gray-900/50 backdrop-blur-sm rounded-full px-8 py-3 border border-gray-800">
              {[
                { id: "about", text: "About" },
                { id: "skills", text: "Skills" },
                { id: "certificates", text: "Certificates" },
                { id: "projects", text: "Projects" },
                { id: "contact", text: "Contact" }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-300 hover:text-purple-300 transition-colors px-4 py-1 rounded-full hover:bg-purple-900/20 cursor-pointer"
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/in/nirmalasari-rodito-sulnas-159845344"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="https://instagram.com/nrmlardt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Projects Component
const ProjectsSection = () => {
  const projectsData = [
    {
      id: 1,
      title: "Satu Data Parepare – Government Data Integration Dashboard",
      description: "Sistem manajemen dan integrasi data pemerintah Kota Parepare dengan fitur dashboard, visualisasi data, dan pengelolaan dataset terpusat menggunakan Laravel dan React.",
      image: "/public/images/satu-data.png",
      technologies: ["Laravel", "React", "MySQL", "Tailwind CSS", "Filament"],
      category: "Web Application",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      pptUrl: "/ppt/ecommerce.pptx",
      videoUrl: "https://youtube.com",
      featured: true
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Aplikasi mobile banking dengan fitur transfer, pembayaran, dan investasi menggunakan React Native dan Laravel API.",
      image: "/projects/banking.jpg",
      technologies: ["React Native", "Laravel", "MySQL", "Firebase"],
      category: "Mobile App",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      pptUrl: "/ppt/banking.pptx",
      videoUrl: "https://youtube.com",
      featured: true
    },
    {
      id: 3,
      title: "AI Chatbot Integration",
      description: "Integrasi chatbot AI untuk customer service dengan natural language processing menggunakan OpenAI API.",
      image: "/projects/chatbot.jpg",
      technologies: ["Python", "OpenAI API", "React", "WebSocket"],
      category: "AI Integration",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      pptUrl: "/ppt/chatbot.pptx",
      videoUrl: "https://youtube.com",
      featured: false
    },
    {
      id: 4,
      title: "Project Management Tool",
      description: "Tools manajemen proyek dengan kanban board, time tracking, dan kolaborasi tim real-time.",
      image: "/projects/management.jpg",
      technologies: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
      category: "Web Application",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      pptUrl: "/ppt/management.pptx",
      videoUrl: "https://youtube.com",
      featured: false
    },
    {
      id: 5,
      title: "Health & Fitness App",
      description: "Aplikasi kesehatan dan fitness dengan tracking workout, nutrition plan, dan progress monitoring.",
      image: "/projects/fitness.jpg",
      technologies: ["Flutter", "Laravel", "MySQL", "Chart.js"],
      category: "Mobile App",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      pptUrl: "/ppt/fitness.pptx",
      videoUrl: "https://youtube.com",
      featured: true
    },
    {
      id: 6,
      title: "Real Estate Platform",
      description: "Platform properti dengan virtual tour, property listing, dan sistem booking menggunakan 3D integration.",
      image: "/projects/realestate.jpg",
      technologies: ["React", "Three.js", "Laravel", "MySQL"],
      category: "Web Application",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      pptUrl: "/ppt/realestate.pptx",
      videoUrl: "https://youtube.com",
      featured: false
    }
  ];

  const ProjectCard = ({ project, index }: { project: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 ${
        project.featured ? 'ring-2 ring-purple-500/30' : ''
      }`}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
          <div className="text-4xl">🚀</div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.liveUrl}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.githubUrl}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-400 text-sm font-medium">{project.category}</span>
          <div className="flex space-x-2">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href={project.pptUrl}
              className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 hover:bg-purple-500/30 transition-all"
              title="View Presentation"
            >
              <FileText className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href={project.videoUrl}
              className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-300 hover:bg-pink-500/30 transition-all"
              title="Watch Demo"
            >
              <Play className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string, techIndex: number) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-full border border-purple-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.liveUrl}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-lg text-center hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Live Demo
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.githubUrl}
            className="flex-1 bg-gray-700 text-gray-300 text-sm font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-600 transition-all border border-gray-600"
          >
            Code
          </motion.a>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </motion.div>
  );

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Projects</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Koleksi project yang telah saya kembangkan, mencakup web application, mobile app, dan integrasi AI
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* View More Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform shadow-lg shadow-purple-500/25"
        >
          View All Projects
        </motion.button>
      </motion.div>
    </div>
  );
};

// Certificates Section Component
const CertificatesSection = () => {
  const certificatesData = [
    {
      id: 1,
      title: "Full Stack Web Development",
      issuer: "Dicoding Indonesia",
      date: "2023",
      image: "/certificates/fullstack.jpg",
      credentialUrl: "https://example.com/certificate1",
      skills: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      image: "/certificates/aws.jpg",
      credentialUrl: "https://example.com/certificate2",
      skills: ["Cloud Computing", "AWS", "Infrastructure"]
    },
    {
      id: 3,
      title: "React Native Development",
      issuer: "Coursera",
      date: "2022",
      image: "/certificates/react-native.jpg",
      credentialUrl: "https://example.com/certificate3",
      skills: ["React Native", "Mobile Development", "JavaScript"]
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      issuer: "Google",
      date: "2022",
      image: "/certificates/uiux.jpg",
      credentialUrl: "https://example.com/certificate4",
      skills: ["Figma", "User Research", "Prototyping"]
    },
    {
      id: 5,
      title: "Python for Data Science",
      issuer: "DataCamp",
      date: "2021",
      image: "/certificates/python.jpg",
      credentialUrl: "https://example.com/certificate5",
      skills: ["Python", "Pandas", "Data Analysis"]
    },
    {
      id: 6,
      title: "Laravel Advanced",
      issuer: "Laracasts",
      date: "2021",
      image: "/certificates/laravel.jpg",
      credentialUrl: "https://example.com/certificate6",
      skills: ["Laravel", "PHP", "Backend"]
    }
  ];

  const CertificateCard = ({ certificate, index }: { certificate: any; index: number }) => (
    <FadeContent
      key={certificate.id}
      delay={index * 100}
      duration={800}
      blur={true}
      className="group relative"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full"
      >
        {/* Certificate Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <Award className="w-16 h-16 text-purple-400" />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
                title="View Credential"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
                title="Download Certificate"
              >
                <Download className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-purple-400 text-sm font-medium">{certificate.issuer}</span>
            <span className="text-gray-400 text-sm">{certificate.date}</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
            {certificate.title}
          </h3>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {certificate.skills.map((skill: string, skillIndex: number) => (
              <span
                key={skillIndex}
                className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-full border border-purple-500/20"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Verify Button */}
          <motion.a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-lg text-center hover:from-purple-600 hover:to-pink-600 transition-all block"
          >
            Verify Credential
          </motion.a>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </motion.div>
    </FadeContent>
  );

  return (
    <div className="container mx-auto">
      <FadeContent duration={800} delay={200}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Certificates</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Sertifikat dan credential yang telah saya peroleh dalam perjalanan pengembangan karir saya
          </p>
        </div>
      </FadeContent>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificatesData.map((certificate, index) => (
          <CertificateCard key={certificate.id} certificate={certificate} index={index} />
        ))}
      </div>

      {/* View More Button */}
      <FadeContent duration={800} delay={600}>
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform shadow-lg shadow-purple-500/25"
          >
            View All Certificates
          </motion.button>
        </div>
      </FadeContent>
    </div>
  );
};

// Contact Section Component
const ContactSection = () => {
  const contactData = [
    {
      id: 1,
      name: "LinkedIn",
      username: "nirmalasari-rodito-sulnas",
      url: "https://www.linkedin.com/in/nirmalasari-rodito-sulnas-159845344",
      icon: <Linkedin className="w-6 h-6" />,
      color: "blue",
      description: "Connect professionally"
    },
    {
      id: 2,
      name: "Instagram",
      username: "nrmlardt",
      url: "https://instagram.com/nrmlardt",
      icon: <Instagram className="w-6 h-6" />,
      color: "pink",
      description: "Follow for updates"
    },
    {
      id: 3,
      name: "GitHub",
      username: "nrmalasari",
      url: "https://github.com/nrmalasari",
      icon: <Github className="w-6 h-6" />,
      color: "gray",
      description: "Explore my code"
    },
    {
      id: 4,
      name: "Email",
      username: "nirmalamala1311@gmail.com",
      url: "mailto:nirmalamala1311@gmail.com",
      icon: <Mail className="w-6 h-6" />,
      color: "green",
      description: "Send me a message"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-500/20",
          border: "border-blue-500/30",
          gradient: "from-blue-500 to-blue-600",
          icon: "text-blue-400"
        };
      case "pink":
        return {
          bg: "bg-pink-500/20",
          border: "border-pink-500/30",
          gradient: "from-pink-500 to-purple-500",
          icon: "text-pink-400"
        };
      case "gray":
        return {
          bg: "bg-gray-700/20",
          border: "border-gray-600/30",
          gradient: "from-gray-700 to-gray-900",
          icon: "text-gray-400"
        };
      case "green":
        return {
          bg: "bg-green-500/20",
          border: "border-green-500/30",
          gradient: "from-green-500 to-teal-500",
          icon: "text-green-400"
        };
      default:
        return {
          bg: "bg-purple-500/20",
          border: "border-purple-500/30",
          gradient: "from-purple-500 to-pink-500",
          icon: "text-purple-400"
        };
    }
  };

  const ContactCard = ({ contact, index }: { contact: any; index: number }) => {
    const colorClasses = getColorClasses(contact.color);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative"
      >
        <motion.a
          href={contact.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`block bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border ${colorClasses.border} hover:border-opacity-60 transition-all duration-300 h-full`}
        >
          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl ${colorClasses.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <div className={colorClasses.icon}>
              {contact.icon}
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-white mb-2">{contact.name}</h3>
          <p className="text-gray-300 text-sm mb-3">{contact.description}</p>
          <div className="text-purple-300 font-medium text-sm truncate">
            {contact.username}
          </div>

          {/* Hover Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
        </motion.a>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Touch</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Mari terhubung! Saya selalu terbuka untuk membahas peluang baru, kolaborasi, atau sekadar berbagi ide.
        </p>
      </motion.div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {contactData.map((contact, index) => (
          <ContactCard key={contact.id} contact={contact} index={index} />
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-purple-500/20"
      >
        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Ready to Start a Project?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Saya senang mendengar tentang ide Anda. Mari berkolaborasi untuk menciptakan sesuatu yang luar biasa bersama!
        </p>
        <motion.a
          href="mailto:nirmalamala1311@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform shadow-lg shadow-purple-500/25"
        >
          <Mail className="w-5 h-5 mr-2" />
          Start Conversation
        </motion.a>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSkills = () => {
    if (skillsRef.current) {
      skillsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const skillsData = {
    frontend: {
      title: "Frontend Development",
      icon: <Code2 className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "React/Next.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 88 },
        { name: "Vue.js", level: 75 },
      ]
    },
    backend: {
      title: "Backend Development", 
      icon: <Server className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "Node.js", level: 87 },
        { name: "Laravel", level: 82 },
        { name: "Python", level: 80 },
        { name: "PHP", level: 85 },
      ]
    },
    mobile: {
      title: "Mobile Development",
      icon: <Smartphone className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "Android Studio", level: 78 },
        { name: "React Native", level: 75 },
        { name: "Flutter", level: 70 },
      ]
    },
    tools: {
      title: "Tools & Technologies",
      icon: <GitBranch className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "Git/GitHub", level: 88 },
        { name: "MySQL", level: 82 },
        { name: "Figma", level: 85 },
        { name: "Filament", level: 78 },
      ]
    },
    ai: {
      title: "AI Integration",
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "OpenAI API", level: 70 },
        { name: "Machine Learning Basics", level: 65 },
      ]
    },
    design: {
      title: "UI/UX Design",
      icon: <Palette className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "Figma", level: 85 },
        { name: "Adobe XD", level: 78 },
        { name: "Prototyping", level: 82 },
      ]
    }
  };

  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 text-sm font-medium">{name}</span>
        <span className="text-purple-400 text-sm font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        />
      </div>
    </div>
  );

  const SkillCategory = ({ 
    title, 
    icon, 
    skills, 
    delay = 0 
  }: { 
    title: string; 
    icon: React.ReactNode; 
    skills: { name: string; level: number }[];
    delay?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <SkillBar key={index} name={skill.name} level={skill.level} />
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#0a0f1a] via-[#121a2b] to-[#1a2439]">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-purple-500/15 to-pink-500/15"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              width: Math.random() * 120 + 30,
              height: Math.random() * 120 + 30,
              opacity: 0,
            }}
            animate={{
              x: [null, (Math.random() * 100 - 50)],
              y: [null, (Math.random() * 100 - 50)],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Navbar - SIMPLIFIED VERSION */}
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-screen relative z-10 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-80px)] items-center gap-8 lg:gap-12">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Greeting bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block bg-purple-900/30 backdrop-blur-sm px-5 py-2 rounded-2xl border border-purple-500/30"
            >
              <span className="text-purple-200 text-base font-medium">👋 Hi, I'm Nirmalasari Rodito Sulnas</span>
            </motion.div>

            <div className="space-y-5">
              <div className="overflow-hidden">
                <h1 className="font-bold text-white leading-[1.1] tracking-tight">
                  <ShinyText
                    text="Full Stack"
                    speed={3}
                    size="lg"
                    color="purple"
                    className="block mb-2"
                  />
                  <span className="block text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Developer
                  </span>
                </h1>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-lg"
              >
                <p className="text-gray-300 text-base leading-relaxed">
                  Spesialis dalam menciptakan aplikasi web dan mobile dengan pendekatan modern, 
                  mengutamakan performa optimal dan pengalaman pengguna yang menarik. 
                  Memiliki keahlian dalam mengintegrasikan kecerdasan buatan dan pembelajaran mesin 
                  untuk menghasilkan solusi inovatif yang memberikan nilai tambah.
                </p>
              </motion.div>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 pt-3"
            >
              <button className="px-6 py-3 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25">
                Download CV
              </button>
              <button 
                className="px-6 py-3 text-sm bg-transparent border-2 border-purple-500 text-purple-300 rounded-full font-semibold hover:bg-purple-500/10 hover:text-white transition-all transform hover:scale-105"
                onClick={scrollToAbout}
              >
                Explore My Projects
              </button>
              <button 
                className="px-6 py-3 text-sm bg-transparent border-2 border-pink-500 text-pink-300 rounded-full font-semibold hover:bg-pink-500/10 hover:text-white transition-all transform hover:scale-105"
                onClick={scrollToSkills}
              >
                View Skills
              </button>
            </motion.div>
          </motion.div>

          {/* Right content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-full w-full flex items-center justify-center"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                transition={{ delay: 1.0 }}
                className="absolute w-[400px] h-[400px] rounded-full bg-purple-500 blur-[100px]"
              />
            </div>
            
            {isMounted && (
              <div className="relative z-20 w-full h-full min-h-[400px] flex items-center justify-center">
                <Lanyard 
                  position={[0, 0, 15]}
                  gravity={[0, -25, 0]}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <section 
        ref={aboutRef} 
        id="about" 
        className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10 flex items-center"
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Me</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Right side - Profile Card (now on the left) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start order-2 lg:order-1"
            >
              <ProfileCard
                avatarUrl="/avatar.png"
                miniAvatarUrl="/avatar.png"
                name="Nirmalasari Rodito S"
                title="Full Stack Developer"
                handle="nrmla.slns"
                status="Available for work"
                contactText="Hire Me"
                showUserInfo={true}
                onContactClick={() => console.log("Contact clicked")}
                className="w-full max-w-md"
                enableTilt={true}
                enableMobileTilt={false}
              />
            </motion.div>
            
            {/* Left side - About text (now on the right) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <h3 className="text-2xl font-semibold text-purple-300">
                Passionate Developer & Problem Solver
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                Saya adalah seorang Full Stack Developer dengan pengalaman lebih dari 3 tahun 
                dalam mengembangkan aplikasi web dan mobile. Saya memiliki passion dalam menciptakan 
                solusi teknologi yang tidak hanya fungsional tetapi juga memberikan pengalaman 
                pengguna yang memukau.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Keahlian teknis saya mencakup berbagai teknologi modern termasuk React, Next.js, 
                Node.js, Python, Laravel, Filament, Android Studio, dan integrasi AI/ML. Saya selalu bersemangat untuk mempelajari 
                teknologi baru dan menerapkannya dalam proyek-proyek inovatif.
              </p>
              
              <div className="pt-4">
                <h4 className="text-lg font-medium text-purple-200 mb-3">What I Do</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">▸</span>
                    Mengembangkan aplikasi web responsif dengan React/Next.js
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">▸</span>
                    Membangun aplikasi backend dengan Laravel dan Filament
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">▸</span>
                    Mengembangkan aplikasi mobile dengan Android Studio
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">▸</span>
                    Mampu mendesain UI dan UX yang menarik
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">▸</span>
                    Optimasi performa dan pengalaman pengguna
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        ref={skillsRef} 
        id="skills" 
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Skills</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Teknologi dan tools yang saya kuasai untuk menciptakan solusi digital yang inovatif
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skillsData).map(([key, category], index) => (
              <SkillCategory
                key={key}
                title={category.title}
                icon={category.icon}
                skills={category.skills}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Additional Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Tech Stack & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "React", "Next.js", "TypeScript", "Tailwind CSS", 
                "Node.js", "Laravel", "Python", "PHP", "Android Studio",
                "React Native", "Flutter", "MySQL", "Git",
                "Figma", "OpenAI API", "Filament"
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section 
        ref={certificatesRef} 
        id="certificates" 
        className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <CertificatesSection />
      </section>

      {/* Projects Section */}
      <section 
        ref={projectsRef} 
        id="projects" 
        className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <ProjectsSection />
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef} 
        id="contact" 
        className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10 flex items-center"
      >
        <ContactSection />
      </section>
    </div>
  );
}