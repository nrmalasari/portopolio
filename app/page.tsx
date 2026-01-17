"use client";

import { useEffect, useRef, useState } from "react";
import Lanyard from "./components/Lanyard/Lanyard";
import { motion, AnimatePresence } from "framer-motion";
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
  Download,
  Menu,
  X,
  Home as HomeIcon,
  User,
  FolderOpen
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

// Navbar Component - FIXED: Menu di tengah, background transparan
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", text: "Home", icon: <HomeIcon className="w-4 h-4" /> },
    { id: "about", text: "About", icon: <User className="w-4 h-4" /> },
    { id: "skills", text: "Skills", icon: <Code2 className="w-4 h-4" /> },
    { id: "certificates", text: "Certificates", icon: <Award className="w-4 h-4" /> },
    { id: "projects", text: "Projects", icon: <FolderOpen className="w-4 h-4" /> },
    { id: "contact", text: "Contact", icon: <Mail className="w-4 h-4" /> }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nirmalasari-rodito-sulnas-159845344",
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      name: "Instagram", 
      url: "https://instagram.com/nrmlardt",
      icon: <Instagram className="w-5 h-5" />
    }
  ];

  return (
    <>
      {/* Desktop Navbar - FULLY TRANSPARANT dengan menu di tengah */}
      <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 bg-transparent`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Empty Space - LEFT */}
            <div className="hidden lg:flex flex-1">
              {/* Empty space untuk balance */}
            </div>

            {/* Navigation Items - CENTER dengan background hanya di menu */}
            <div className="hidden lg:flex">
              <div className="flex space-x-1 bg-gray-900/70 backdrop-blur-md rounded-full px-6 py-2 border border-gray-700/30">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm font-medium text-gray-300 hover:text-purple-300 transition-colors px-4 py-2 rounded-full hover:bg-purple-900/20 cursor-pointer"
                  >
                    {item.text}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Social Links - RIGHT */}
            <div className="hidden lg:flex flex-1 justify-end">
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center justify-end w-full">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl z-50 lg:hidden border-l border-gray-800"
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Menu</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="p-6">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-purple-900/20 rounded-xl transition-all duration-200"
                    >
                      <div className="text-purple-400">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Social Links in Sidebar */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Connect with me
                  </h3>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                        title={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Simple URL check
  const hasValidUrl = (url: string) => {
    return url && 
           url !== "" && 
           !url.includes("example.com") && 
           !url.includes("your-") &&
           url !== "https://youtube.com" &&
           url !== "https://github.com";
  };

  // Handle URL opening
  const openUrl = (url: string) => {
    if (hasValidUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('No valid URL provided');
    }
  };

  return (
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
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        {project.image && (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        )}
        
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="text-2xl">🚀</div>
              <div className="text-white text-xs mt-1">Project Image</div>
            </div>
          </div>
        )}
        
        {!imageError && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <div className="flex space-x-4">
              {/* Live Demo Button */}
              <button
                onClick={() => openUrl(project.liveUrl)}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer"
                title="Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
              
              {/* GitHub Button */}
              <button
                onClick={() => openUrl(project.githubUrl)}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer"
                title="View Code"
              >
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-400 text-sm font-medium">{project.category}</span>
          <div className="flex space-x-2">
            {/* PPT Button */}
            <button
              onClick={() => openUrl(project.pptUrl)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                hasValidUrl(project.pptUrl) 
                  ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 cursor-pointer' 
                  : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
              }`}
              title={hasValidUrl(project.pptUrl) ? "View Documentation" : "Documentation not available"}
              disabled={!hasValidUrl(project.pptUrl)}
            >
              <FileText className="w-4 h-4" />
            </button>
            
            {/* Video Button */}
            <button
              onClick={() => openUrl(project.videoUrl)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                hasValidUrl(project.videoUrl) 
                  ? 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 cursor-pointer' 
                  : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
              }`}
              title={hasValidUrl(project.videoUrl) ? "Watch Demo Video" : "Video not available"}
              disabled={!hasValidUrl(project.videoUrl)}
            >
              <Play className="w-4 h-4" />
            </button>
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
          {/* Live Demo Button */}
          <button
            onClick={() => openUrl(project.liveUrl)}
            className={`flex-1 text-sm font-semibold py-2 px-4 rounded-lg text-center transition-all ${
              hasValidUrl(project.liveUrl)
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!hasValidUrl(project.liveUrl)}
          >
            {hasValidUrl(project.liveUrl) ? 'Live Demo' : 'Demo Soon'}
          </button>
          
          {/* GitHub Button */}
          <button
            onClick={() => openUrl(project.githubUrl)}
            className={`flex-1 text-sm font-semibold py-2 px-4 rounded-lg text-center transition-all border ${
              hasValidUrl(project.githubUrl)
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600 cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed border-gray-600'
            }`}
            disabled={!hasValidUrl(project.githubUrl)}
          >
            {hasValidUrl(project.githubUrl) ? 'View Code' : 'Code Private'}
          </button>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);

  const projectsData = [
    {
      id: 1,
      title: "Satu Data Parepare – Government Data Integration Dashboard",
      description: "Sistem manajemen dan integrasi data pemerintah Kota Parepare dengan fitur dashboard, visualisasi data, dan pengelolaan dataset terpusat menggunakan Laravel dan React.",
      image: "/images/satu-data.png",
      technologies: ["Laravel", "React", "MySQL", "Tailwind CSS", "Filament"],
      category: "Web Application",
      liveUrl: "https://satu-data.pareparekota.go.id",
      githubUrl: "https://github.com/nrmalasari/satu-data",
      pptUrl: "https://drive.google.com/file/d/1BRX8kp7MuFsODCBMRXO_CggVqYkj86wC/view?usp=sharing",
      videoUrl: "",
      featured: true
    },
    {
      id: 2,
      title: "TERPARKIR – Teknologi Efisiensi Rencana Parkir (Studi Kasus: Mall Panakkukang)",
      description: "Sistem parkir pintar berbasis IoT yang menampilkan ketersediaan slot secara real-time. Terparkir memudahkan pengunjung menemukan lokasi parkir kosong melalui aplikasi, meningkatkan efisiensi operasional parkir, dan mendukung konsep smart city di Makassar. Sistem ini telah di terbitkan jurnalnya",
      image: "/images/terparkir.png",
      technologies: ["Android Studio", "MySQL", "Firebase", "IoT Sensors"],
      category: "Mobile App / IoT System / AI Integration",
      githubUrl: "https://github.com/nrmalasari/ProyekTerparkir",
      pptUrl: "https://drive.google.com/file/d/16rYGnCkeIFNaZfXoLoZo5ZRbuPA8fra9/view?usp=drive_link",
      liveUrl: "https://www.linkedin.com/posts/nirmalasari-rodito-sulnas-159845344_jurnal-activity-7319382236892475392-Xwwc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFZEBpUBg_lLB3gIickj4n4dSPsh_bYiz_4",
      videoUrl: "",
      featured: true
    },
    {
      id: 3,
      title: "Web Pelayanan & Pengaduan Digital Kelurahan Ujung Bulu – Kota Parepare",
      description:"Platform layanan digital untuk pengaduan masyarakat yang memudahkan warga dalam menyampaikan laporan, mengikuti status penanganan, dan mengakses pelayanan kelurahan secara online. Sistem ini meningkatkan transparansi dan efisiensi pelayanan publik di Kelurahan Ujung Bulu.",
      image: "/images/ublapor.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: "Web Application",
      liveUrl: "https://ublapor.vercel.app/",
      githubUrl: "https://github.com/nrmalasari/KOTAKSARAN_DIGITAL_UJUNGBULU",
      pptUrl: "https://drive.google.com/file/d/1czMZHG-_xWnoZb86KWN7Qg2TnnozJdCR/view?usp=sharing",
      videoUrl: "",
      featured: true
    },
    {
      id: 4,
      title: "Sistem Inventaris TK SC2 Menara – Manajemen Aset & Barang Sekolah",
      description:"Sistem inventaris berbasis web untuk mengelola barang, stok, dan aset sekolah di TK SC2 Menara. Fitur meliputi pencatatan barang masuk/keluar, manajemen kategori, pencarian cepat, dan pelacakan riwayat perubahan guna meningkatkan efisiensi dan transparansi pengelolaan aset.",
      image: "/images/inventastk.png",
      technologies: ["Laravel", "MySQL", "CSS"],
      category: "Web Application",
      liveUrl: "", 
      githubUrl: "https://github.com/nrmalasari/inventaris-TKSC2Menara",
      pptUrl: "https://drive.google.com/file/d/1QKhJrVpHW7KW-3UWE0etQS_6oTsHK-xD/view?usp=sharing",
      videoUrl: "",
      featured: false
    },
    {
      id: 5,
      title: "Web Repository Akademik ITH",
      description: "Platform repository akademik untuk ITH dengan fitur penyimpanan jurnal, artikel ilmiah, tesis, materi kuliah, serta manajemen dokumen institusi. Sistem menyediakan akses terstruktur bagi mahasiswa, dosen, dan peneliti untuk mendukung kolaborasi dan penyebaran pengetahuan.",
      image: "/images/repositori.jpeg",
      technologies: ["Laravel", "MySQL", "HTML/CSS", "JavaScript"],
      liveUrl: "",
      githubUrl: "https://github.com/wokkk15/repository",
      pptUrl: "https://drive.google.com/file/d/1m1oQEO4aNZqDxr7pWwuTItqzaeAMJm6k/view?usp=sharing",
      videoUrl: "",
      featured: false
    }
  ];

  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 3);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

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
          onClick={() => setShowAll(!showAll)}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform shadow-lg shadow-purple-500/25 cursor-pointer"
        >
          {showAll ? 'Show Less' : 'View All Projects'}
        </motion.button>
      </motion.div>
    </div>
  );
};

// Certificates Section Component
const CertificatesSection = () => {
  const [showAll, setShowAll] = useState(false);
  
  const certificatesData = [
    {
      id: 1,
      title: "Belajar Dasar Pemrograman Javascript",
      issuer: "Dicoding Indonesia",
      date: "2025",
      image: "/images/JavaScrip.png",
      credentialUrl: "https://drive.google.com/file/d/1rLRF4p9RnLNkpQSi5YpFZqlJSpy6yOin/view?usp=sharing",
      skills: ["JavaScript", "Programming Basics", "Web Development"]
    },
    {
      id: 2,
      title: "Belajar Dasar Cloud dan Gen AI di AWS",
      issuer: "Dicoding Indonesia",
      date: "2025",
      image: "/images/AWS.png", 
      credentialUrl: "https://drive.google.com/file/d/1uXZyDussWf5kHjLYmPHBFa_6mjDtCDUe/view?usp=drive_link",
      skills: ["Cloud Computing", "AWS", "Infrastructure"]
    },
    {
      id: 3,
      title: "Belajar Membuat Aplikasi Android untuk Pemula",
      issuer: "Dicoding Indonesia",
      date: "2025",
      image: "/images/android.png",
      credentialUrl: "https://drive.google.com/file/d/1TiJGBznk8qzLjQof-leOuEFmgyCiSJl6/view?usp=drive_link",
      skills: ["Android Studio", "Kotlin", "JavaScript"]
    },
    {
      id: 4,
      title: "Belajar Dasar AI",
      issuer: "Dicoding Indonesia",
      date: "2025",
      image: "/images/dasar_AI.png", 
      credentialUrl: "https://drive.google.com/file/d/1m1oQEO4aNZqDxr7pWwuTItqzaeAMJm6k/view?usp=drive_link",
      skills: ["Artificial Intelligence", "Machine Learning", "Deep Learning"]
    },
    {
      id: 5,
      title: "Memulai Pemrograman dengan Kotlin",
      issuer: "Dicoding Indonesia",
      date: "2025",
      image: "/images/kotlin.png",
      credentialUrl: "https://drive.google.com/file/d/1QKhJrVpHW7KW-3UWE0etQS_6oTsHK-xD/view?usp=drive_link",
      skills: ["Kotlin", "Android Development", "Programming"]
    },
    {
      id: 6,
      title: "CELEBES ROBOT CONTEST HASANUDDIN TECHNO FEST #8",
      issuer: "Universitas Hasanuddin",
      date: "2024",
      image: "/images/crc.png",
      credentialUrl: "https://drive.google.com/file/d/1czMZHG-_xWnoZb86KWN7Qg2TnnozJdCR/view?usp=drive_link",
      skills: ["Robotics", "Competition", "Technology"]
    },
    {
      id: 7,
      title: "Kompetisi Robot Line Follower",
      issuer: "Universitas Negeri Makassar",
      date: "2023",
      image: "/images/Sertifikat-21.png",
      credentialUrl: "https://drive.google.com/file/d/1czMZHG-_xWnoZb86KWN7Qg2TnnozJdCR/view?usp=drive_link",
      skills: ["Robotics", "Line Follower", "Competition"]
    }
  ];

  const displayedCertificates = showAll ? certificatesData : certificatesData.slice(0, 3);

  const CertificateCard = ({ certificate, index }: { certificate: any; index: number }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full"
      >
        <div className="relative h-48 overflow-hidden">
          {certificate.image ? (
            <>
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center z-10">
                  <div className="text-2xl">📜</div>
                </div>
              )}
              <img 
                src={certificate.image} 
                alt={certificate.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Award className="w-16 h-16 text-purple-400" />
            </div>
          )}
          
          {imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center z-10">
              <Award className="w-16 h-16 text-purple-400" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <div className="flex space-x-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer"
                title="View Credential"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={certificate.credentialUrl}
                download
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer"
                title="Download Certificate"
              >
                <Download className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-purple-400 text-sm font-medium">{certificate.issuer}</span>
            <span className="text-gray-400 text-sm">{certificate.date}</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
            {certificate.title}
          </h3>

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

          <motion.a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-lg text-center hover:from-purple-600 hover:to-pink-600 transition-all cursor-pointer block"
          >
            Verify Credential
          </motion.a>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
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
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Certificates</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Sertifikat dan credential yang telah saya peroleh dalam perjalanan pengembangan karir saya
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCertificates.map((certificate, index) => (
          <CertificateCard key={certificate.id} certificate={certificate} index={index} />
        ))}
      </div>

      {certificatesData.length > 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform shadow-lg shadow-purple-500/25 cursor-pointer"
          >
            {showAll ? 'Show Less Certificates' : `View All Certificates (${certificatesData.length})`}
          </motion.button>
          
          {!showAll && (
            <p className="text-gray-400 text-sm mt-3">
              Showing 3 of {certificatesData.length} certificates
            </p>
          )}
        </motion.div>
      )}
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
          <div className={`w-14 h-14 rounded-2xl ${colorClasses.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <div className={colorClasses.icon}>
              {contact.icon}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{contact.name}</h3>
          <p className="text-gray-300 text-sm mb-3">{contact.description}</p>
          <div className="text-purple-300 font-medium text-sm truncate">
            {contact.username}
          </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {contactData.map((contact, index) => (
          <ContactCard key={contact.id} contact={contact} index={index} />
        ))}
      </div>

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

// Komponen utama
export default function PortfolioPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
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
      ]
    },
    backend: {
      title: "Backend Development", 
      icon: <Server className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "Laravel", level: 87 },
        { name: "Node.js", level: 72 },
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

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div id="hero" className="container mx-auto px-4 sm:px-6 lg:px-8 h-screen relative z-10 pt-24">
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} h-[calc(100vh-80px)] items-center gap-8 lg:gap-12`}>
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
                    text="Software "
                    speed={3}
                    size="lg"
                    color="purple"
                    className="block mb-2"
                  />
                  <span className="block text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Engineer
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
              <a 
                href="https://drive.google.com/uc?export=download&id=1SwkqX8i3vUWlTYEy6AiSYYMByi6UjggC"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 inline-flex items-center justify-center"
              >
                Download CV
              </a>
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

          {/* Right content - Hide Lanyard on mobile */}
          {!isMobile && (
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
          )}
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Profile Card - KIRI */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start"
            >
              <ProfileCard
                avatarUrl="/avatar.png"
                miniAvatarUrl="/avatar.png"
                name="Nirmalasari Rodito S"
                title="Software Engineer"
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
            
            {/* About text - KANAN */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-purple-300">
                Passionate Developer & Problem Solver
              </h3>

              <p className="text-gray-300 leading-relaxed text-sm lg:text-base mb-4">
                Saya adalah pengembang pemula yang fokus pada pengembangan web dan mobile, dengan pengalaman membangun beberapa proyek nyata baik secara mandiri maupun selama magang di beberapa instansi. Dari pengalaman tersebut, saya terbiasa bekerja dengan teknologi seperti React, Next.js, Laravel, Android Studio, serta integrasi API untuk kebutuhan aplikasi modern.
              </p>

              <p className="text-gray-300 leading-relaxed text-sm lg:text-base mb-6">
                Saya memiliki ketertarikan kuat pada pengembangan sistem yang rapi, mudah digunakan, dan relevan dengan kebutuhan pengguna. Setiap proyek yang saya kerjakan selalu menjadi ruang belajar untuk memahami alur kerja profesional dan meningkatkan kemampuan teknis saya agar dapat berkembang menjadi developer yang lebih matang dan kompeten.
              </p>

              <div className="pt-2">
                <h4 className="text-lg font-medium text-purple-200 mb-4">What I Do</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-0.5 flex-shrink-0 text-xs">▸</span>
                    <span className="text-sm">Mengembangkan aplikasi web responsif dengan React/Next.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-0.5 flex-shrink-0 text-xs">▸</span>
                    <span className="text-sm">Membangun aplikasi backend dengan Laravel dan Filament</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-0.5 flex-shrink-0 text-xs">▸</span>
                    <span className="text-sm">Mengembangkan aplikasi mobile dengan Android Studio</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-0.5 flex-shrink-0 text-xs">▸</span>
                    <span className="text-sm">Mampu mendesain UI dan UX yang menarik</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-0.5 flex-shrink-0 text-xs">▸</span>
                    <span className="text-sm">Optimasi performa dan pengalaman pengguna</span>
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