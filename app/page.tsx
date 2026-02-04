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
  FolderOpen,
  Briefcase,
  Users,
  Calendar,
  MapPin,
  ChevronRight,
  Star,
  Heart,
  Sparkles,
  Rocket,
  Zap,
  Send,
  ThumbsUp
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

// Navbar Component
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
    { id: "experience", text: "Experience", icon: <Briefcase className="w-4 h-4" /> },
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
      {/* Desktop Navbar */}
      <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 bg-transparent`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Empty Space - LEFT */}
            <div className="hidden lg:flex flex-1">
              {/* Empty space untuk balance */}
            </div>

            {/* Navigation Items - CENTER */}
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

// Experience Section Component
const ExperienceSection = () => {
  const experienceData = [
    {
      id: 1,
      title: "Magang Pengembangan Sistem Informasi Inventaris",
      company: "TK SC2 Menara Parepare",
      period: "Oktober 2025 – Desember 2025",
      location: "Parepare, Indonesia",
      description: "Mengembangkan sistem informasi inventaris berbasis aplikasi untuk mengdigitalisasi proses pendataan aset sekolah yang sebelumnya dilakukan secara manual.",
      responsibilities: [
        "Merancang alur sistem dan antarmuka (UI/UX) yang sederhana dan mudah digunakan oleh guru serta staf administrasi non-teknis",
        "Mengimplementasikan fitur inti seperti manajemen data aset, pencatatan riwayat keluar–masuk barang, serta laporan inventaris",
        "Berkontribusi dalam meningkatkan akurasi data, efisiensi pengelolaan aset, dan kemudahan akses informasi bagi pihak sekolah"
      ],
      technologies: ["Laravel", "MySQL", "PHP", "CSS", "UI/UX Design"],
      type: "Internship"
    },
    {
      id: 2,
      title: "Magang MBKM Mandiri - Web Development",
      company: "Dinas Komunikasi dan Informatika Kota Parepare",
      period: "April 2025 – Mei 2025",
      location: "Parepare, Indonesia",
      description: "Berperan dalam redesain dan pengembangan website SATU DATA Kota Parepare sebagai platform resmi pengelolaan data pemerintah daerah.",
      responsibilities: [
        "Mengoptimalkan tampilan antarmuka (UI/UX) agar lebih modern, konsisten, dan mudah digunakan",
        "Berkolaborasi dengan tim untuk memastikan struktur informasi, navigasi, dan konten data tersaji secara jelas",
        "Website hasil pengembangan digunakan secara aktif oleh Pemerintah Kota Parepare untuk tata kelola data yang lebih efektif"
      ],
      technologies: ["React", "Laravel", "Tailwind CSS", "MySQL", "Filament"],
      type: "Internship"
    },
    {
      id: 3,
      title: "Asisten Dosen Mata Kuliah Computer Vision",
      company: "Institut Teknologi Bacharuddin Jusuf Habibie",
      period: "2023 – Sekarang",
      location: "Parepare, Indonesia",
      description: "Membantu dosen dalam kegiatan akademik dan praktikum untuk mata kuliah pemrograman dan teknologi informasi.",
      responsibilities: [
        "Membimbing mahasiswa dalam praktikum pemrograman dan pengembangan aplikasi",
        "Membantu persiapan materi pembelajaran dan evaluasi tugas",
        "Memberikan dukungan teknis dalam penggunaan tools dan teknologi terkait"
      ],
      technologies: ["Java", "Python", "Algoritma", "Struktur Data"],
      type: "Teaching"
    }
  ];

  return (
    <div id="experience" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Perjalanan profesional dan pengalaman kerja yang telah saya lalui
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500/30 via-pink-500/30 to-transparent hidden lg:block"></div>
          
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative mb-12 ${index % 2 === 0 ? 'lg:pr-1/2 lg:pl-0' : 'lg:pl-1/2 lg:pr-0'} lg:pr-8 lg:pl-8`}
            >
              {/* Timeline dot */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 z-10"></div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        exp.type === 'Internship' 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {exp.title}
                    </h3>
                    <div className="flex items-center text-purple-400 font-medium mt-1">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {exp.company}
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:text-right">
                    <div className="flex items-center text-gray-300 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">
                  {exp.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-purple-300 font-semibold mb-2 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Responsibilities & Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start text-gray-400 text-sm">
                        <span className="text-purple-400 mr-2 mt-1">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-full border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Organization Section Component
const OrganizationSection = () => {
  const organizationData = [
    {
      id: 1,
      name: "Habibie Engineering Robotic of Organization (HERO)",
      position: "Anggota Hubungan Masyarakat (HUMAS)",
      period: "September 2023 – Desember 2024",
      description: "Organisasi robotika di Institut Teknologi Bacharuddin Jusuf Habibie yang fokus pada pengembangan teknologi robotik dan kecerdasan buatan.",
      activities: [
        "Aktif berperan dalam perencanaan dan pelaksanaan program organisasi, termasuk HERO Goes to School dan seminar robotika",
        "Terlibat dalam pengelolaan komunikasi dan publikasi kegiatan, memastikan informasi tersampaikan secara jelas dan profesional",
        "Berkontribusi dalam penyelenggaraan dan fasilitasi pelatihan robotika, mulai dari pengenalan dasar hingga persiapan lomba",
        "Mengembangkan kemampuan kerja tim, komunikasi, dan problem solving dalam lingkungan organisasi berbasis teknologi"
      ],
      skills: ["Teamwork", "Communication", "Event Planning", "Public Relations"],
      image: "/images/hero-logo.png"
    },
    {
      id: 2,
      name: "Habibie Coding Club (HCC)",
      position: "Anggota Aktif",
      period: "Oktober 2022 – Desember 2023",
      description: "Komunitas pemrograman di kampus yang berfokus pada pengembangan skill coding dan kolaborasi proyek teknologi.",
      activities: [
        "Aktif berkontribusi dalam pelatihan dan mentoring Web Development bagi mahasiswa baru",
        "Terlibat dalam perencanaan dan pelaksanaan kegiatan belajar rutin untuk meningkatkan kemampuan teknis anggota",
        "Mengikuti berbagai kompetisi dan kegiatan pengembangan skill di bidang pemrograman",
        "Mengasah kemampuan teknis, komunikasi, dan kerja tim melalui diskusi dan praktik coding"
      ],
      skills: ["Web Development", "Mentoring", "Collaboration", "Problem Solving"],
      logo: "/images/hcc-logo.png"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Organization <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Involvement</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Pengalaman berorganisasi dan kontribusi dalam komunitas teknologi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {organizationData.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                {/* Header */}
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    {org.image ? (
                      <img 
                        src={org.image} 
                        alt={org.name}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = '<Users className="w-8 h-8 text-purple-400" />';
                        }}
                      />
                    ) : (
                      <Users className="w-8 h-8 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {org.name}
                    </h3>
                    <div className="flex items-center text-purple-400 font-medium mt-1">
                      <ChevronRight className="w-4 h-4 mr-1" />
                      {org.position}
                    </div>
                    <div className="flex items-center text-gray-300 text-sm mt-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {org.period}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6">
                  {org.description}
                </p>

                {/* Activities */}
                <div className="mb-6">
                  <h4 className="text-purple-300 font-semibold mb-3">Key Activities</h4>
                  <ul className="space-y-2">
                    {org.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start text-gray-400 text-sm">
                        <span className="text-purple-400 mr-2 mt-1">▸</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-purple-300 font-semibold mb-3">Skills Developed</h4>
                  <div className="flex flex-wrap gap-2">
                    {org.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-300 text-xs rounded-full border border-purple-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mr-4">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Impact & Learning</h3>
              <p className="text-gray-300">Pengalaman berorganisasi telah mengembangkan soft skills yang berharga</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Leadership", desc: "Mengkoordinasi tim dalam kegiatan organisasi" },
              { title: "Communication", desc: "Public speaking dan publikasi kegiatan", },
              { title: "Teamwork", desc: "Kolaborasi dalam proyek dan event",},
              { title: "Problem Solving", desc: "Menyelesaikan tantangan teknis dan organisasi",}
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-800/30 rounded-xl p-4 hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2"></span>
                  <h4 className="text-purple-300 font-semibold">{item.title}</h4>
                </div>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
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
      liveUrl: "https://jurnal.lppm-stmikhandayani.ac.id/index.php/jti/article/view/382/175",
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
    <div id="projects" className="container mx-auto">
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
    },
    {
      id: 8,
      title: "Sertifikat Magaang",
      issuer: "TK SC2 Menara",
      date: "2025",
      image: "/images/sertimagang1.png",
      credentialUrl: "https://drive.google.com/file/d/1iFWvdmzWzoCTA6b9vnhiaEbUjq1L6NsE/view?usp=sharing",
      skills: ["WEB Inventaris Sekolah", "Magang", "PHP, MySQL"]
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
    <div id="certificates" className="container mx-auto">
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

// Contact Form Section Component (Updated)
const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      time: "2 jam yang lalu",
      comment: "Amazing AI portfolio! The projects showcase incredible technical depth.",
      likes: 12
    },
    {
      id: 2,
      name: "Sarah Miller",
      time: "5 jam yang lalu",
      comment: "Really impressed with your work! The attention to detail is remarkable.",
      likes: 8
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [newCommentName, setNewCommentName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Pesan telah dikirim! Terima kasih telah menghubungi saya.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleAddComment = () => {
    if (!newCommentName.trim() || !newComment.trim()) {
      alert('Silakan isi nama dan komentar Anda');
      return;
    }

    const newCommentObj = {
      id: comments.length + 1,
      name: newCommentName,
      time: 'Baru saja',
      comment: newComment,
      likes: 0
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
    setNewCommentName('');
  };

  const handleLikeComment = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  return (
    <div id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start a <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Project?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Saya senang mendengar tentang ide Anda. Mari berkolaborasi untuk menciptakan sesuatu yang luar biasa bersama!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Hubungi Saya</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Nama Anda</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="Masukkan nama lengkap Anda"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Email Anda</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="nama@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Pesan Anda</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all min-h-[150px] resize-vertical"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Kirim Pesan
                </button>
              </div>
            </form>

            {/* General Info */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <h4 className="text-lg font-semibold text-white mb-3">General</h4>
              <p className="text-gray-400 text-sm">
                Saya akan membalas pesan Anda dalam waktu 24-48 jam. Untuk pertanyaan mendesak, silakan hubungi melalui media sosial.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Comments Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Leave Comment Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Tinggalkan Komentar</h3>
              <p className="text-gray-400 mb-6">Share pengalaman Anda!</p>
              
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="Nama Anda"
                  />
                </div>

                <div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all min-h-[120px] resize-vertical"
                    placeholder="Tinggalkan komentar Anda..."
                  />
                </div>

                <button
                  onClick={handleAddComment}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  Post Komentar
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Komentar ({comments.length})</h3>
              
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="pb-6 border-b border-gray-700/50 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-white">{comment.name}</h4>
                        <p className="text-gray-400 text-sm">{comment.time}</p>
                      </div>
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center space-x-1 text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{comment.likes}</span>
                      </button>
                    </div>
                    
                    <p className="text-gray-300">{comment.comment}</p>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {comments.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-gray-400">Belum ada komentar. Jadilah yang pertama!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Ready to Start a Project Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20 relative overflow-hidden text-center"
        >
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-purple-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Something Amazing?
            </h3>
            
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Saya senang mendengar tentang ide Anda. Mari berkolaborasi untuk menciptakan sesuatu yang luar biasa bersama! 
              <span className="block text-purple-300 mt-2">✨ Setiap proyek adalah petualangan baru ✨</span>
            </p>

            {/* CTA Button - Direct to Gmail */}
            <motion.a
              href="mailto:nirmalamala1311@gmail.com"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform shadow-lg shadow-purple-500/25 text-lg cursor-pointer"
            >
              <Mail className="w-5 h-5 mr-2" />
              Start Conversation
            </motion.a>

            {/* Fun Quote */}
            <div className="mt-8 pt-6 border-t border-purple-500/20">
              <p className="text-gray-400 text-sm italic">
                "Great things in business are never done by one person. They're done by a team of people."
                <span className="block text-purple-300 mt-1">- Steve Jobs</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Email</h4>
              <p className="text-gray-300 text-sm">nirmalamala1311@gmail.com</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-pink-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Response Time</h4>
              <p className="text-gray-300 text-sm">24-48 Jam</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Availability</h4>
              <p className="text-gray-300 text-sm">Senin - Jumat</p>
            </div>
          </div>
        </motion.div>
      </div>
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

      {/* Experience Section */}
      <ExperienceSection />

      {/* Organization Section */}
      <OrganizationSection />

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
      <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <CertificatesSection />
      </section>

      {/* Projects Section */}
      <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <ProjectsSection />
      </section>

      {/* Contact Form Section */}
      <ContactFormSection />
    </div>
  );
}