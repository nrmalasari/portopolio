"use client";

import { useEffect, useRef, useState } from "react";
import Lanyard from "./components/Lanyard/Lanyard";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import ShinyText from "./components/ShinyText/ShinyText";
import SkillTabs from "@/components/SkillTabs";
import Folder from "@/components/Folder";
import ActivityDepthCarousel from "@/components/ActivityDepthCarousel";
import { formatRelativeTime } from "@/lib/format-relative-time";
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
  ThumbsUp,
  Database,
  GraduationCap,
  Brain,
  Users as UsersIcon,
  Globe,
  Terminal,
  Layers,
  BarChart3,
  Cloud,
  Shield,
  Zap as ZapIcon,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

// ============================================================
// SHARED STYLE TOKENS
// ============================================================
const gradientText =
  "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400";

const glassCard =
  "relative bg-white/[0.03] lg:backdrop-blur-md rounded-3xl border border-white/10 hover:border-purple-400/40 transition-all duration-500 shadow-[0_8px_40px_rgba(0,0,0,0.35)]";

const primaryBtn =
  "inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:brightness-110 transition-all cursor-pointer";

const socialLinksData = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nirmalasari-rodito-sulnas-159845344",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/nrmlardt",
    icon: <Instagram className="w-5 h-5" />,
  },
];

// ============================================================
// FADECONTENT COMPONENT
// ============================================================
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
        filter: blur ? (inView ? "blur(0px)" : "blur(10px)") : "none",
      }}
    >
      {children}
    </div>
  );
};

// ============================================================
// SECTION HEADING (dipakai semua section)
// ============================================================
const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center mb-12 sm:mb-16"
  >
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/30 bg-purple-500/10 text-purple-200 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
      {eyebrow}
    </span>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
      {title} <span className={gradientText}>{highlight}</span>
    </h2>
    <div className="mx-auto mb-5 h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500" />
    <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg px-2 leading-relaxed">
      {subtitle}
    </p>
  </motion.div>
);

// ============================================================
// NAVBAR COMPONENT
// ============================================================
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  const navItems = [
    { id: "hero", text: "Home", icon: <HomeIcon className="w-4 h-4" /> },
    { id: "about", text: "About", icon: <User className="w-4 h-4" /> },
    { id: "skills", text: "Skills", icon: <Code2 className="w-4 h-4" /> },
    { id: "experience", text: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { id: "certificates", text: "Certificates", icon: <Award className="w-4 h-4" /> },
    { id: "projects", text: "Projects", icon: <FolderOpen className="w-4 h-4" /> },
    { id: "contact", text: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy: tandai menu sesuai section yang sedang terlihat
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0a0f1a]/60 lg:backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="hidden lg:flex flex-1 items-center">
              <button
                onClick={() => scrollToSection("hero")}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-fuchsia-500/30 group-hover:rotate-6 transition-transform">
                  N
                </span>
                <span className="text-white font-bold tracking-tight">
                  nrmlardt<span className="text-pink-400">.</span>
                </span>
              </button>
            </div>

            <div className="hidden lg:flex">
              <div className="flex space-x-1 bg-gray-900/70 rounded-full px-3 py-2 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                {navItems.map((item) => {
                  const active = activeId === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer ${
                        active ? "text-white" : "text-gray-400 hover:text-purple-200"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 border border-purple-400/30"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.text}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex flex-1 justify-end">
              <div className="flex space-x-3">
                {socialLinksData.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    title={social.name}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex lg:hidden items-center justify-between w-full">
              <button
                onClick={() => scrollToSection("hero")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-sm">
                  N
                </span>
              </button>
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl z-50 lg:hidden border-l border-gray-800"
            >
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
              <div className="p-6">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const active = activeId === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        whileHover={{ scale: 1.02, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                          active
                            ? "text-white bg-gradient-to-r from-purple-500/25 to-pink-500/25 border border-purple-400/30"
                            : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                        }`}
                      >
                        <div className="text-purple-400">{item.icon}</div>
                        <span className="font-medium">{item.text}</span>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Connect with me
                  </h3>
                  <div className="flex space-x-3">
                    {socialLinksData.map((social, index) => (
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

// ============================================================
// EXPERIENCE SECTION COMPONENT
// ============================================================
const ExperienceSection = () => {
  const experienceData = [
    {
      id: 1,
      title: "Data Analyst dan Verifikator Data Program Bantuan Pangan (Banpang)",
      company: "Kantor Perum BULOG",
      period: "April 2026 – Juli 2026",
      location: "Indonesia",
      description:
        "Bertanggung jawab dalam analisis dan verifikasi data penerima Bantuan Pangan (Banpang) untuk memastikan keakuratan, validitas, dan ketepatan sasaran sebelum proses penyaluran bantuan pemerintah.",
      responsibilities: [
        "Melakukan analisis dan verifikasi data penerima Bantuan Pangan (Banpang) untuk memastikan keakuratan dan validitas data sebelum proses penyaluran",
        "Mencocokkan data lapangan dengan basis data resmi serta mengidentifikasi data yang tidak sesuai guna meminimalkan kesalahan penyaluran",
        "Mengelola dan memvalidasi data penerima secara sistematis untuk mendukung ketepatan sasaran program bantuan pemerintah",
        "Berkoordinasi dengan tim terkait dalam proses verifikasi dan pembaruan data agar distribusi bantuan berjalan tepat waktu dan akurat",
        "Berkontribusi dalam kelancaran pelaksanaan program melalui pengelolaan data yang terstruktur, teliti, dan terdokumentasi dengan baik",
      ],
      technologies: ["Data Analysis", "Data Verification", "Microsoft Excel", "Documentation"],
      type: "Internship",
      gallery: [
        { src: "/images/experience/bulog/bulog1.jpeg", alt: "Kegiatan di Kantor Perum BULOG 1" },
        { src: "/images/experience/bulog/bulog2.jpeg", alt: "Kegiatan di Kantor Perum BULOG 2" },
        { src: "/images/experience/bulog/bulog3.jpeg", alt: "Kegiatan di Kantor Perum BULOG 3" },
        { src: "/images/experience/bulog/bulog4.jpeg", alt: "Kegiatan di Kantor Perum BULOG 4" },
      ],
    },
    {
      id: 2,
      title: "Magang Pengembangan Sistem Informasi Inventaris",
      company: "TK SC2 Menara Parepare",
      period: "Oktober 2025 – Desember 2025",
      location: "Parepare, Indonesia",
      description:
        "Mengembangkan sistem informasi inventaris berbasis aplikasi untuk mengdigitalisasi proses pendataan aset sekolah yang sebelumnya dilakukan secara manual.",
      responsibilities: [
        "Merancang alur sistem dan antarmuka (UI/UX) yang sederhana dan mudah digunakan oleh guru serta staf administrasi non-teknis",
        "Mengimplementasikan fitur inti seperti manajemen data aset, pencatatan riwayat keluar–masuk barang, serta laporan inventaris",
        "Berkontribusi dalam meningkatkan akurasi data, efisiensi pengelolaan aset, dan kemudahan akses informasi bagi pihak sekolah",
      ],
      technologies: ["Laravel", "MySQL", "PHP", "CSS", "UI/UX Design"],
      type: "Internship",
      gallery: [
        { src: "/images/experience/sc2-menara/tk1.jpeg", alt: "Kegiatan magang TK SC2 Menara 1" },
        { src: "/images/experience/sc2-menara/tk2.jpeg", alt: "Kegiatan magang TK SC2 Menara 2" },
        { src: "/images/experience/sc2-menara/tk3.jpeg", alt: "Kegiatan magang TK SC2 Menara 3" },
      ],
    },
    {
      id: 3,
      title: "Magang MBKM Mandiri - Web Development",
      company: "Dinas Komunikasi dan Informatika Kota Parepare",
      period: "April 2025 – Mei 2025",
      location: "Parepare, Indonesia",
      description:
        "Berperan dalam redesain dan pengembangan website SATU DATA Kota Parepare sebagai platform resmi pengelolaan data pemerintah daerah.",
      responsibilities: [
        "Mengoptimalkan tampilan antarmuka (UI/UX) agar lebih modern, konsisten, dan mudah digunakan",
        "Berkolaborasi dengan tim untuk memastikan struktur informasi, navigasi, dan konten data tersaji secara jelas",
        "Website hasil pengembangan digunakan secara aktif oleh Pemerintah Kota Parepare untuk tata kelola data yang lebih efektif",
      ],
      technologies: ["React", "Laravel", "Tailwind CSS", "MySQL", "Filament"],
      type: "Internship",
      gallery: [
        { src: "/images/experience/diskominfo/kominfo1.jpg", alt: "Kegiatan magang Diskominfo 1" },
        { src: "/images/experience/diskominfo/kominfo2.jpg", alt: "Kegiatan magang Diskominfo 2" },
        { src: "/images/experience/diskominfo/kominfo3.jpg", alt: "Kegiatan magang Diskominfo 3" },
      ],
    },
    {
      id: 4,
      title: "Asisten Dosen Mata Kuliah Computer Vision",
      company: "Institut Teknologi Bacharuddin Jusuf Habibie",
      period: "2025",
      location: "Parepare, Indonesia",
      description:
        "Membantu dosen dalam kegiatan akademik dan praktikum untuk mata kuliah pemrograman dan teknologi informasi.",
      responsibilities: [
        "Membimbing mahasiswa dalam praktikum pemrograman dan pengembangan aplikasi",
        "Membantu persiapan materi pembelajaran dan evaluasi tugas",
        "Memberikan dukungan teknis dalam penggunaan tools dan teknologi terkait",
      ],
      technologies: ["Java", "Python", "Algoritma", "Struktur Data"],
      type: "Teaching",
      gallery: [
        { src: "/images/experience/asisten-dosen/asdos1.jpeg", alt: "Kegiatan asisten dosen 1" },
        { src: "/images/experience/asisten-dosen/asdos2.jpeg", alt: "Kegiatan asisten dosen 2" },
        { src: "/images/experience/asisten-dosen/asdos3.jpeg", alt: "Kegiatan asisten dosen 3" },
      ],
    },
  ];

  return (
    <div id="experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Journey"
          title="My"
          highlight="Experience"
          subtitle="Perjalanan profesional dan pengalaman kerja yang telah saya lalui"
        />

        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`${glassCard} overflow-hidden`}>
                {/* aksen gradient di sisi kiri */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-fuchsia-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                {/* nomor besar */}
                <span className="pointer-events-none absolute right-6 top-2 text-7xl sm:text-8xl font-black text-white/[0.04] select-none">
                  0{index + 1}
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 items-start lg:items-center p-4 sm:p-6 lg:p-10">
                  <div
                    className={`order-1 min-w-0 flex flex-col justify-center ${
                      index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="mb-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${
                          exp.type === "Internship"
                            ? "bg-purple-500/15 text-purple-200 border-purple-400/30"
                            : "bg-sky-500/15 text-sky-200 border-sky-400/30"
                        }`}
                      >
                        {exp.type === "Internship" ? (
                          <Briefcase className="w-3 h-3" />
                        ) : (
                          <GraduationCap className="w-3 h-3" />
                        )}
                        {exp.type}
                      </span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-purple-200 transition-colors leading-snug">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-fuchsia-300 font-medium mt-2 text-sm sm:text-base">
                        <Briefcase className="w-4 h-4 mr-2 shrink-0" />
                        <span className="break-words">{exp.company}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200 text-xs sm:text-sm">
                          <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs sm:text-sm">
                          <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-5 leading-relaxed text-sm sm:text-base">
                      {exp.description}
                    </p>

                    <div className="mb-5">
                      <h4 className="text-purple-200 font-semibold mb-2 flex items-center text-sm sm:text-base">
                        <ChevronRight className="w-4 h-4 mr-1 shrink-0 text-pink-400" />
                        Responsibilities & Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-gray-400 text-xs sm:text-sm leading-relaxed"
                          >
                            <span className="text-pink-400 mr-2 mt-0.5 shrink-0">▸</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 sm:px-3 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-200 text-xs rounded-full border border-purple-400/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`order-2 w-full min-w-0 ${
                      index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 p-2 sm:p-3 shadow-inner">
                      <ActivityDepthCarousel
                        images={exp.gallery}
                        tiltDirection={index % 2 === 0 ? "right" : "left"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ORGANIZATION SECTION COMPONENT
// ============================================================
const orgSkillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Teamwork: Users,
  Communication: MessageCircle,
  "Event Planning": Calendar,
  "Public Relations": Globe,
  "Web Development": Code2,
  Mentoring: GraduationCap,
  Collaboration: UsersIcon,
  "Problem Solving": Brain,
};

const OrganizationSection = () => {
  const organizationData = [
    {
      id: 1,
      name: "Habibie Engineering Robotic of Organization (HERO)",
      position: "Anggota Hubungan Masyarakat (HUMAS)",
      period: "September 2023 – Desember 2024",
      description:
        "Organisasi robotika di Institut Teknologi Bacharuddin Jusuf Habibie yang fokus pada pengembangan teknologi robotik dan kecerdasan buatan.",
      activities: [
        "Aktif berperan dalam perencanaan dan pelaksanaan program organisasi, termasuk HERO Goes to School dan seminar robotika",
        "Terlibat dalam pengelolaan komunikasi dan publikasi kegiatan, memastikan informasi tersampaikan secara jelas dan profesional",
        "Berkontribusi dalam penyelenggaraan dan fasilitasi pelatihan robotika, mulai dari pengenalan dasar hingga persiapan lomba",
        "Mengembangkan kemampuan kerja tim, komunikasi, dan problem solving dalam lingkungan organisasi berbasis teknologi",
      ],
      skills: ["Teamwork", "Communication", "Event Planning", "Public Relations"],
      image: "/images/hero-logo.png",
      gallery: [
        { src: "/images/organization/hero/hero1.jpeg", alt: "Kegiatan HERO 1" },
        { src: "/images/organization/hero/hero2.JPEG", alt: "Kegiatan HERO 2" },
        { src: "/images/organization/hero/hero3.jpg", alt: "Kegiatan HERO 3" },
        { src: "/images/organization/hero/hero4.jpg", alt: "Kegiatan HERO 4" },
        { src: "/images/organization/hero/hero5.JPG", alt: "Kegiatan HERO 5" },
        { src: "/images/organization/hero/hero7.jpeg", alt: "Kegiatan HERO 7" },
      ],
    },
    {
      id: 2,
      name: "Habibie Coding Club (HCC)",
      position: "Anggota Aktif",
      period: "Oktober 2022 – Desember 2023",
      description:
        "Komunitas pemrograman di kampus yang berfokus pada pengembangan skill coding dan kolaborasi proyek teknologi.",
      activities: [
        "Aktif berkontribusi dalam pelatihan dan mentoring Web Development bagi mahasiswa baru",
        "Terlibat dalam perencanaan dan pelaksanaan kegiatan belajar rutin untuk meningkatkan kemampuan teknis anggota",
        "Mengikuti berbagai kompetisi dan kegiatan pengembangan skill di bidang pemrograman",
        "Mengasah kemampuan teknis, komunikasi, dan kerja tim melalui diskusi dan praktik coding",
      ],
      skills: ["Web Development", "Mentoring", "Collaboration", "Problem Solving"],
      logo: "/images/hcc-logo.png",
      gallery: [],
    },
  ];

  return (
    <div id="organization" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Community"
          title="Organization"
          highlight="Involvement"
          subtitle="Pengalaman berorganisasi dan kontribusi dalam komunitas teknologi"
        />

        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {organizationData.map((org, index) => {
            const hasGallery = org.gallery && org.gallery.length > 0;

            return (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`${glassCard} overflow-hidden`}>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-fuchsia-500 to-purple-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="p-5 sm:p-6 lg:p-10">
                    <div className="mb-5">
                      <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/25 to-pink-500/25 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                          {org.image || org.logo ? (
                            <img
                              src={org.image || org.logo}
                              alt={org.name}
                              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-purple-200 transition-colors leading-snug">
                            {org.name}
                          </h3>
                          <div className="flex items-center text-fuchsia-300 font-medium mt-1 text-sm sm:text-base">
                            <ChevronRight className="w-4 h-4 mr-1 shrink-0" />
                            <span className="break-words">{org.position}</span>
                          </div>
                          <div className="mt-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200 text-xs sm:text-sm">
                              <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span>{org.period}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {org.description}
                    </p>

                    <div>
                      <h4 className="text-purple-200 font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                        <ChevronRight className="w-4 h-4 mr-1 shrink-0 text-pink-400" />
                        Key Activities
                      </h4>
                      <ul className="space-y-2">
                        {org.activities.map((activity, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-gray-400 text-xs sm:text-sm leading-relaxed"
                          >
                            <span className="text-pink-400 mr-2 mt-0.5 shrink-0">▸</span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/10">
                      <h4 className="text-purple-200 font-semibold mb-3 flex items-center text-sm sm:text-base">
                        <Sparkles className="w-4 h-4 mr-1.5 shrink-0 text-pink-400" />
                        Skills Developed
                      </h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                        {org.skills.map((skill, idx) => {
                          const SkillIcon = orgSkillIcons[skill] ?? Star;
                          return (
                            <div
                              key={idx}
                              className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-xs sm:text-sm transition-all hover:border-purple-400/40 hover:bg-purple-500/10 hover:-translate-y-0.5"
                            >
                              <SkillIcon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span className="leading-snug">{skill}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {hasGallery && (
                      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 p-2 sm:p-3">
                          <ActivityDepthCarousel
                            images={org.gallery}
                            tiltDirection={index % 2 === 0 ? "right" : "left"}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 lg:backdrop-blur-md rounded-3xl p-5 sm:p-6 lg:p-8 border border-white/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5 sm:mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/25 to-pink-500/25 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Impact & Learning</h3>
              <p className="text-gray-300 text-sm sm:text-base mt-1">
                Pengalaman berorganisasi telah mengembangkan soft skills yang berharga
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: "Leadership", desc: "Mengkoordinasi tim dalam kegiatan organisasi" },
              { title: "Communication", desc: "Public speaking dan publikasi kegiatan" },
              { title: "Teamwork", desc: "Kolaborasi dalam proyek dan event" },
              { title: "Problem Solving", desc: "Menyelesaikan tantangan teknis dan organisasi" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <h4 className="text-purple-200 font-semibold text-sm sm:text-base mb-1.5">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================
// PROJECT CARD COMPONENT
// ============================================================
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [imageError, setImageError] = useState(false);

  const hasValidUrl = (url?: string) => {
    if (!url || url.trim() === "") return false;
    return (
      !url.includes("example.com") &&
      !url.includes("your-") &&
      url !== "https://youtube.com" &&
      url !== "https://github.com"
    );
  };

  const linkProps = {
    target: "_blank",
    rel: "noopener noreferrer",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col bg-white/[0.04] lg:backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ${
        project.featured ? "ring-1 ring-fuchsia-500/30" : ""
      }`}
    >
      {project.featured && (
        <div className="absolute top-4 left-4 z-30">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-fuchsia-500/30">
            <Star className="w-3 h-3 fill-white" />
            Featured
          </span>
        </div>
      )}

      <div className="relative h-52 overflow-hidden z-10">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1626] via-transparent to-transparent z-10" />
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
              {hasValidUrl(project.liveUrl) ? (
                <a
                  href={project.liveUrl}
                  {...linkProps}
                  className="w-12 h-12 bg-white/20 lg:backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all cursor-pointer"
                  title="Live Demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              ) : (
                <span
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gray-400 cursor-not-allowed"
                  title="Demo not available"
                >
                  <ExternalLink className="w-5 h-5" />
                </span>
              )}
              {hasValidUrl(project.githubUrl) ? (
                <a
                  href={project.githubUrl}
                  {...linkProps}
                  className="w-12 h-12 bg-white/20 lg:backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all cursor-pointer"
                  title="View Code"
                >
                  <Github className="w-5 h-5" />
                </a>
              ) : (
                <span
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gray-400 cursor-not-allowed"
                  title="Code not available"
                >
                  <Github className="w-5 h-5" />
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/25 text-purple-200 text-xs font-medium">
            {project.category}
          </span>
          <div className="flex space-x-2 shrink-0">
            {hasValidUrl(project.pptUrl) ? (
              <a
                href={project.pptUrl}
                {...linkProps}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 cursor-pointer"
                title="View Documentation"
              >
                <FileText className="w-4 h-4" />
              </a>
            ) : (
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-500/10 text-gray-500 cursor-not-allowed"
                title="Documentation not available"
              >
                <FileText className="w-4 h-4" />
              </span>
            )}
            {hasValidUrl(project.videoUrl) ? (
              <a
                href={project.videoUrl}
                {...linkProps}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-pink-500/20 text-pink-300 hover:bg-pink-500/40 cursor-pointer"
                title="Watch Demo Video"
              >
                <Play className="w-4 h-4" />
              </a>
            ) : (
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-500/10 text-gray-500 cursor-not-allowed"
                title="Video not available"
              >
                <Play className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors leading-snug">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech: string, techIndex: number) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-white/5 text-gray-200 text-xs rounded-full border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-3 mt-auto">
          {hasValidUrl(project.liveUrl) ? (
            <a
              href={project.liveUrl}
              {...linkProps}
              className={`${primaryBtn} flex-1 text-sm py-2.5 px-4`}
            >
              Live Demo
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ) : (
            <span className="flex-1 text-sm font-semibold py-2.5 px-4 rounded-full text-center bg-white/5 text-gray-500 cursor-not-allowed border border-white/10">
              Demo Soon
            </span>
          )}
          {hasValidUrl(project.githubUrl) ? (
            <a
              href={project.githubUrl}
              {...linkProps}
              className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-4 rounded-full transition-all border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10 hover:border-purple-400/40 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          ) : (
            <span className="flex-1 text-sm font-semibold py-2.5 px-4 rounded-full text-center bg-white/5 text-gray-500 cursor-not-allowed border border-white/10">
              Code Private
            </span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
    </motion.div>
  );
};

// ============================================================
// PROJECTS SECTION COMPONENT
// ============================================================
const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);

  const projectsData = [
    {
      id: 8,
      title: "Ujikom Pusjar SKMP – Sistem Uji Kompetensi Pusat Pelatihan Jarak Jauh",
      description:
        "Sistem uji kompetensi berbasis web untuk Pusjar SKMP yang menyediakan portal login penguji, manajemen soal, dan pengelolaan hasil ujian secara terpusat. Sistem ini memudahkan proses uji kompetensi jarak jauh dengan antarmuka yang terstruktur dan aman.",
      image: "/images/ujikom-pusjar.png", // sesuaikan path image Anda
      technologies: ["Laravel", "MySQL", "Tailwind CSS", "Filament"], // sesuaikan
      category: "Web Application",
      liveUrl: "https://ujikompusjarskmp.online/login-penguji",
      githubUrl: "", // kosongkan jika private
      pptUrl: "",
      videoUrl: "",
      featured: true,
    },
    {
      id: 7,
      title: "Sistem Pendaftaran Taman Kanak-Kanak TK SC2 Menara",
      description:
        "Sistem pendaftaran siswa baru berbasis web yang dikembangkan sebagai proyek skripsi untuk mendigitalisasi proses pendaftaran di TK SC2 Menara. Sistem menyediakan pendaftaran online, pengelolaan data calon siswa, validasi data dan dokumen oleh admin, serta pengamanan data sensitif menggunakan enkripsi AES-256-CBC.",
      image: "/images/pendaftaran-tk.png",
      technologies: [
        "React",
        "Laravel",
        "Filament",
        "MySQL",
        "Tailwind CSS",
        "AES-256-CBC",
        "Web Development",
      ],
      liveUrl:
        "https://drive.google.com/file/d/1EZvjui7JBqJ0ZXZnh07lGRPnDtibOUrw/view?usp=drive_link",
      githubUrl: "https://github.com/nrmalasari/TKSC2Menara.git",
      pptUrl: "https://canva.link/ox2v4o101rqm743",
      videoUrl:
        "https://drive.google.com/file/d/1EZvjui7JBqJ0ZXZnh07lGRPnDtibOUrw/view?usp=drive_link",
      featured: true,
    },
    {
      id: 1,
      title: "Satu Data Parepare – Government Data Integration Dashboard",
      description:
        "Sistem manajemen dan integrasi data pemerintah Kota Parepare dengan fitur dashboard, visualisasi data, dan pengelolaan dataset terpusat menggunakan Laravel dan React.",
      image: "/images/satu-data.png",
      technologies: ["Laravel", "React", "MySQL", "Tailwind CSS", "Filament"],
      category: "Web Application",
      liveUrl: "https://satu-data.pareparekota.go.id",
      githubUrl: "https://github.com/nrmalasari/satu-data",
      pptUrl:
        "https://drive.google.com/file/d/1BRX8kp7MuFsODCBMRXO_CggVqYkj86wC/view?usp=sharing",
      videoUrl:
        "https://drive.google.com/file/d/1sKs3RecQEr5Y_lP-a6b-vgh212sxQw3G/view?usp=drive_link",
      featured: true,
    },
    {
      id: 2,
      title:
        "TERPARKIR – Teknologi Efisiensi Rencana Parkir (Studi Kasus: Mall Panakkukang)",
      description:
        "Sistem parkir pintar berbasis IoT yang menampilkan ketersediaan slot secara real-time. Terparkir memudahkan pengunjung menemukan lokasi parkir kosong melalui aplikasi, meningkatkan efisiensi operasional parkir, dan mendukung konsep smart city di Makassar. Sistem ini telah di terbitkan jurnalnya",
      image: "/images/terparkir.png",
      technologies: ["Android Studio", "MySQL", "Firebase", "IoT Sensors"],
      category: "Mobile App / IoT System / AI Integration",
      githubUrl: "https://github.com/nrmalasari/ProyekTerparkir",
      pptUrl:
        "https://drive.google.com/file/d/16rYGnCkeIFNaZfXoLoZo5ZRbuPA8fra9/view?usp=drive_link",
      liveUrl:
        "https://drive.google.com/file/d/1xNMAhlclgZaPGSVtlCkA-wh_f4NaDTuE/view?usp=sharing",
      videoUrl:
        "https://jurnal.lppm-stmikhandayani.ac.id/index.php/jti/article/view/382/175",
      featured: false,
    },
    {
      id: 3,
      title:
        "Web Pelayanan & Pengaduan Digital Kelurahan Ujung Bulu – Kota Parepare",
      description:
        "Platform layanan digital untuk pengaduan masyarakat yang memudahkan warga dalam menyampaikan laporan, mengikuti status penanganan, dan mengakses pelayanan kelurahan secara online. Sistem ini meningkatkan transparansi dan efisiensi pelayanan publik di Kelurahan Ujung Bulu.",
      image: "/images/ublapor.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: "Web Application",
      liveUrl: "https://ublapor.vercel.app/",
      githubUrl: "https://github.com/nrmalasari/KOTAKSARAN_DIGITAL_UJUNGBULU",
      pptUrl:
        "https://drive.google.com/file/d/1czMZHG-_xWnoZb86KWN7Qg2TnnozJdCR/view?usp=sharing",
      videoUrl: "",
      featured: false,
    },
    {
      id: 4,
      title: "Sistem Inventaris TK SC2 Menara – Manajemen Aset & Barang Sekolah",
      description:
        "Sistem inventaris berbasis web untuk mengelola barang, stok, dan aset sekolah di TK SC2 Menara. Fitur meliputi pencatatan barang masuk/keluar, manajemen kategori, pencarian cepat, dan pelacakan riwayat perubahan guna meningkatkan efisiensi dan transparansi pengelolaan aset.",
      image: "/images/inventastk.png",
      technologies: ["Laravel", "MySQL", "CSS"],
      category: "Web Application",
      liveUrl:
        "https://drive.google.com/file/d/175tINiG4uoCZlsBDgH8rOaPUizvETuju/view?usp=drive_link",
      githubUrl: "https://github.com/nrmalasari/inventaris-TKSC2Menara",
      pptUrl:
        "https://drive.google.com/file/d/1QKhJrVpHW7KW-3UWE0etQS_6oTsHK-xD/view?usp=sharing",
      videoUrl:
        "https://drive.google.com/file/d/175tINiG4uoCZlsBDgH8rOaPUizvETuju/view?usp=drive_link",
      featured: false,
    },
    {
      id: 5,
      title: "Web Repository Akademik ITH",
      description:
        "Platform repository akademik untuk ITH dengan fitur penyimpanan jurnal, artikel ilmiah, tesis, materi kuliah, serta manajemen dokumen institusi. Sistem menyediakan akses terstruktur bagi mahasiswa, dosen, dan peneliti untuk mendukung kolaborasi dan penyebaran pengetahuan.",
      image: "/images/repositori.jpeg",
      technologies: ["Laravel", "MySQL", "HTML/CSS", "JavaScript"],
      liveUrl: "",
      githubUrl: "https://github.com/wokkk15/repository",
      pptUrl:
        "https://drive.google.com/file/d/1m1oQEO4aNZqDxr7pWwuTItqzaeAMJm6k/view?usp=sharing",
      videoUrl: "",
      featured: false,
    },
    {
      id: 6,
      title: "Demo Sistem Deteksi Objek CCTV",
      description:
        "Aplikasi web berbasis React untuk demonstrasi sistem deteksi objek pada video CCTV. Sistem menampilkan hasil deteksi objek secara visual dengan bounding box dan label secara interaktif. Berperan sebagai Frontend Developer dengan implementasi React + TypeScript + Vite untuk membangun antarmuka real-time dan integrasi hasil deteksi.",
      image: "/images/deteksi-cctv.png",
      technologies: ["React", "TypeScript", "Vite", "Computer Vision", "Frontend Development"],
      liveUrl: "https://demo-deteksi-objek-cctv.vercel.app",
      githubUrl: "https://github.com/AldiAlfatih/DemoDeteksiObjekCCTV",
      pptUrl: "",
      videoUrl: "",
      featured: false,
    },
  ];

  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 3);

  return (
    <div id="projects" className="container mx-auto">
      <SectionHeading
        eyebrow="Portfolio"
        title="My"
        highlight="Projects"
        subtitle="Koleksi project yang telah saya kembangkan, mencakup web application, mobile app, dan integrasi AI"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {projectsData.length > 3 && (
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
            className={`${primaryBtn} px-8 py-3`}
          >
            {showAll ? "Show Less Projects" : `View All Projects (${projectsData.length})`}
            <ArrowRight className={`w-4 h-4 transition-transform ${showAll ? "-rotate-90" : "rotate-90"}`} />
          </motion.button>
          {!showAll && (
            <p className="text-gray-400 text-sm mt-3">
              Showing 3 of {projectsData.length} projects
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

// ============================================================
// CERTIFICATE CARD (dipindah ke luar agar tidak remount tiap render)
// ============================================================
const CertificateCard = ({ certificate, index }: { certificate: any; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col bg-white/[0.04] lg:backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 h-full"
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
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1626]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <div className="flex space-x-3">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 lg:backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer"
              title="View Credential"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={certificate.credentialUrl}
              download
              className="w-12 h-12 bg-white/20 lg:backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer"
              title="Download Certificate"
            >
              <Download className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="text-fuchsia-300 text-sm font-medium">{certificate.issuer}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs">
            {certificate.date}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-200 transition-colors leading-snug">
          {certificate.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-5">
          {certificate.skills.map((skill: string, skillIndex: number) => (
            <span
              key={skillIndex}
              className="px-2.5 py-1 bg-white/5 text-gray-200 text-xs rounded-full border border-white/10"
            >
              {skill}
            </span>
          ))}
        </div>

        <motion.a
          href={certificate.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`${primaryBtn} w-full text-sm py-2.5 px-4 mt-auto`}
        >
          Verify Credential
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
    </motion.div>
  );
};

// ============================================================
// CERTIFICATES SECTION COMPONENT
// ============================================================
const CertificatesSection = () => {
  const [showAll, setShowAll] = useState(false);

  const certificatesData = [
    {
      id: 1,
      title: "Belajar Dasar Pemrograman Javascript",
      issuer: "Dicoding Indonesia",
      date: "2025",
      image: "/images/JavaScrip.png",
      credentialUrl:
        "https://drive.google.com/file/d/1rLRF4p9RnLNkpQSi5YpFZqlJSpy6yOin/view?usp=sharing",
      skills: ["JavaScript", "Programming Basics", "Web Development"],
    },
    {
      id: 2,
      title: "Belajar Dasar Cloud dan Gen AI di AWS",
      issuer: "Dicoding Indonesia",
      date: "2025",
      image: "/images/AWS.png",
      credentialUrl:
        "https://drive.google.com/file/d/1uXZyDussWf5kHjLYmPHBFa_6mjDtCDUe/view?usp=drive_link",
      skills: ["Cloud Computing", "AWS", "Infrastructure"],
    },
    {
      id: 3,
      title: "Belajar Membuat Aplikasi Android untuk Pemula",
      issuer: "Dicoding Indonesia",
      date: "2025",
      image: "/images/android.png",
      credentialUrl:
        "https://drive.google.com/file/d/1TiJGBznk8qzLjQof-leOuEFmgyCiSJl6/view?usp=drive_link",
      skills: ["Android Studio", "Kotlin", "JavaScript"],
    },
    {
      id: 4,
      title: "Belajar Dasar AI",
      issuer: "Dicoding Indonesia",
      date: "2025",
      image: "/images/dasar_AI.png",
      credentialUrl:
        "https://drive.google.com/file/d/1m1oQEO4aNZqDxr7pWwuTItqzaeAMJm6k/view?usp=drive_link",
      skills: ["Artificial Intelligence", "Machine Learning", "Deep Learning"],
    },
    {
      id: 5,
      title: "Memulai Pemrograman dengan Kotlin",
      issuer: "Dicoding Indonesia",
      date: "2025",
      image: "/images/kotlin.png",
      credentialUrl:
        "https://drive.google.com/file/d/1QKhJrVpHW7KW-3UWE0etQS_6oTsHK-xD/view?usp=drive_link",
      skills: ["Kotlin", "Android Development", "Programming"],
    },
    {
      id: 6,
      title: "CELEBES ROBOT CONTEST HASANUDDIN TECHNO FEST #8",
      issuer: "Universitas Hasanuddin",
      date: "2024",
      image: "/images/crc.png",
      credentialUrl:
        "https://drive.google.com/file/d/1czMZHG-_xWnoZb86KWN7Qg2TnnozJdCR/view?usp=drive_link",
      skills: ["Robotics", "Competition", "Technology"],
    },
    {
      id: 7,
      title: "Kompetisi Robot Line Follower",
      issuer: "Universitas Negeri Makassar",
      date: "2023",
      image: "/images/Sertifikat-21.png",
      credentialUrl:
        "https://drive.google.com/file/d/1czMZHG-_xWnoZb86KWN7Qg2TnnozJdCR/view?usp=drive_link",
      skills: ["Robotics", "Line Follower", "Competition"],
    },
    {
      id: 8,
      title: "Sertifikat Magang",
      issuer: "TK SC2 Menara",
      date: "2025",
      image: "/images/sertimagang1.png",
      credentialUrl:
        "https://drive.google.com/file/d/1iFWvdmzWzoCTA6b9vnhiaEbUjq1L6NsE/view?usp=sharing",
      skills: ["WEB Inventaris Sekolah", "Magang", "PHP, MySQL"],
    },
    {
      id: 9,
      title: "FertInnovation Challenge 2025 – Top 20 Proposal (AI-Driven)",
      issuer: "Indonesia Agrichemical Research Institute",
      date: "2025",
      image: "/images/fertinnovation2025.png",
      credentialUrl:
        "https://drive.google.com/file/d/11GGsIa4tBKY56ZN9kZtJAmkHnoUp43Bw/view?usp=drive_link",
      skills: [
        "Artificial Intelligence",
        "AI-Driven Innovation",
        "Proposal Development",
        "Problem Solving",
      ],
    },
  ];

  const displayedCertificates = showAll ? certificatesData : certificatesData.slice(0, 3);

  const certificateFolders = [
    {
      id: "dicoding-dev",
      title: "Dicoding · Programming",
      color: "#a855f7",
      gradientFrom: "#c084fc",
      gradientTo: "#ec4899",
      ids: [1, 3, 5],
    },
    {
      id: "cloud-ai",
      title: "Cloud & AI",
      color: "#ec4899",
      gradientFrom: "#f472b6",
      gradientTo: "#818cf8",
      ids: [2, 4, 9],
    },
    {
      id: "event-magang",
      title: "Kompetisi & Magang",
      color: "#7c3aed",
      gradientFrom: "#818cf8",
      gradientTo: "#22d3ee",
      ids: [6, 7, 8],
    },
  ];

  const getFolderPapers = (ids: number[]) =>
    ids.map((id) => {
      const certificate = certificatesData.find((item) => item.id === id);
      if (!certificate) return null;
      return (
        <a
          key={certificate.id}
          href={certificate.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
          title={certificate.title}
        >
          <img src={certificate.image} alt={certificate.title} className="w-full h-full object-cover" />
        </a>
      );
    });

  return (
    <div id="certificates" className="container mx-auto">
      <SectionHeading
        eyebrow="Credentials"
        title="My"
        highlight="Certificates"
        subtitle="Sertifikat dan credential yang telah saya peroleh dalam perjalanan pengembangan karir saya"
      />

      <div className="lg:hidden overflow-visible">
        <p className="text-center text-purple-300/80 text-sm mb-2">
          Ketuk folder untuk membuka sertifikat
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-32 pt-28 pb-12 overflow-visible">
          {certificateFolders.map((folder) => (
            <div key={folder.id} className="flex flex-col items-center w-[160px] overflow-visible">
              <Folder
                color={folder.color}
                gradientFrom={folder.gradientFrom}
                gradientTo={folder.gradientTo}
                size={1.35}
                items={getFolderPapers(folder.ids)}
              />
              <p className="mt-5 text-center text-sm font-medium text-purple-200 leading-tight">
                {folder.title}
              </p>
              <p className="mt-1 text-center text-[11px] text-gray-400">
                {folder.ids.length} sertifikat
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
              className={`${primaryBtn} px-8 py-3`}
            >
              {showAll
                ? "Show Less Certificates"
                : `View All Certificates (${certificatesData.length})`}
              <ArrowRight className={`w-4 h-4 transition-transform ${showAll ? "-rotate-90" : "rotate-90"}`} />
            </motion.button>
            {!showAll && (
              <p className="text-gray-400 text-sm mt-3">
                Showing 3 of {certificatesData.length} certificates
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// CONTACT FORM SECTION COMPONENT
// ============================================================
interface ContactComment {
  id: string;
  name: string;
  comment: string;
  likes: number;
  createdAt: string;
}

const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all";

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [comments, setComments] = useState<ContactComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentName, setNewCommentName] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [commentSuccess, setCommentSuccess] = useState("");

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetch("/api/comments");
        if (!response.ok) throw new Error("Gagal memuat komentar");
        const data = await response.json();
        setComments(Array.isArray(data) ? data : []);
      } catch {
        setCommentError("Gagal memuat komentar. Silakan refresh halaman.");
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      `Pesan dari ${formData.name}`
    )}&body=${encodeURIComponent(
      `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    alert("Pesan telah disiapkan di aplikasi email Anda. Terima kasih telah menghubungi saya.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleAddComment = async () => {
    if (!newCommentName.trim() || !newComment.trim()) {
      setCommentError("Silakan isi nama dan komentar Anda");
      return;
    }

    setIsPostingComment(true);
    setCommentError("");
    setCommentSuccess("");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCommentName,
          comment: newComment,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gagal mengirim komentar");
      }

      setComments((prev) => [data, ...prev]);
      setNewComment("");
      setNewCommentName("");
      setCommentSuccess("Komentar berhasil diposting!");
    } catch (error) {
      setCommentError(
        error instanceof Error ? error.message : "Gagal mengirim komentar"
      );
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleLikeComment = async (id: string) => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", id }),
      });

      const data = await response.json();
      if (!response.ok) return;

      setComments((prev) =>
        prev.map((comment) => (comment.id === id ? data : comment))
      );
    } catch {
      // ignore like errors silently
    }
  };

  return (
    <div id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Contact"
          title="Ready to Start a"
          highlight="Project?"
          subtitle="Saya senang mendengar tentang ide Anda. Mari berkolaborasi untuk menciptakan sesuatu yang luar biasa bersama!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`${glassCard} p-6 sm:p-8`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-200" />
              </div>
              <h3 className="text-2xl font-bold text-white">Hubungi Saya</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Nama Anda</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  placeholder="Masukkan nama lengkap Anda"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Email Anda</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  placeholder="nama@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Pesan Anda</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} min-h-[150px] resize-y`}
                  placeholder="Tulis pesan Anda di sini..."
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className={`${primaryBtn} w-full py-3.5 px-6 hover:scale-[1.02]`}
                >
                  <Send className="w-5 h-5" />
                  Kirim Pesan
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-lg font-semibold text-white mb-2">General</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Saya akan membalas pesan Anda dalam waktu 24-48 jam. Untuk pertanyaan mendesak,
                silakan hubungi melalui media sosial.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className={`${glassCard} p-6 sm:p-8`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-pink-200" />
                </div>
                <h3 className="text-2xl font-bold text-white">Tinggalkan Komentar</h3>
              </div>
              <p className="text-gray-400 mb-6 ml-14 -mt-0.5 text-sm">Share pengalaman Anda!</p>

              <div className="space-y-4">
                {commentError && (
                  <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {commentError}
                  </p>
                )}
                {commentSuccess && (
                  <p className="text-sm text-green-300 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                    {commentSuccess}
                  </p>
                )}

                <input
                  type="text"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  maxLength={80}
                  disabled={isPostingComment}
                  className={`${inputClass} disabled:opacity-60`}
                  placeholder="Nama Anda"
                />

                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  maxLength={1000}
                  disabled={isPostingComment}
                  className={`${inputClass} min-h-[120px] resize-y disabled:opacity-60`}
                  placeholder="Tinggalkan komentar Anda..."
                />

                <button
                  type="button"
                  onClick={handleAddComment}
                  disabled={isPostingComment}
                  className={`${primaryBtn} w-full py-3.5 px-6 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  {isPostingComment ? "Mengirim..." : "Post Komentar"}
                </button>
              </div>
            </div>

            <div className={`${glassCard} p-6 sm:p-8`}>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                Komentar
                <span className="px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-sm font-semibold">
                  {comments.length}
                </span>
              </h3>

              <div className="space-y-5 max-h-[420px] overflow-y-auto pr-1">
                {isLoadingComments ? (
                  <p className="text-gray-400 text-center py-6">Memuat komentar...</p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3 gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shrink-0">
                            {comment.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-white truncate">{comment.name}</h4>
                            <p className="text-gray-500 text-xs">
                              {formatRelativeTime(comment.createdAt)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleLikeComment(comment.id)}
                          className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-pink-300 hover:border-pink-400/40 transition-colors cursor-pointer shrink-0"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{comment.likes}</span>
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed break-words">
                        {comment.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {!isLoadingComments && comments.length === 0 && (
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-pink-500/20 lg:backdrop-blur-md rounded-[2rem] p-8 sm:p-12 border border-white/10 relative overflow-hidden text-center"
        >
          <div className="hidden lg:block absolute -top-10 -right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="hidden lg:block absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-6">
              <Rocket className="w-10 h-10 text-purple-200 -rotate-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Ready to Start <span className={gradientText}>Something Amazing?</span>
            </h3>

            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Saya senang mendengar tentang ide Anda. Mari berkolaborasi untuk menciptakan sesuatu
              yang luar biasa bersama!
              <span className="block text-purple-300 mt-2">
                ✨ Setiap proyek adalah petualangan baru ✨
              </span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href="mailto:nirmalamala1311@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${primaryBtn} px-8 py-4 text-lg`}
              >
                <Mail className="w-5 h-5" />
                Start Conversation
              </motion.a>
              {socialLinksData.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.name}
                  className="w-14 h-14 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-purple-400/50 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm italic">
                "Great things in business are never done by one person. They're done by a team of
                people."
                <span className="block text-purple-300 mt-1 not-italic">- Steve Jobs</span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {[
            {
              icon: <Mail className="w-6 h-6 text-purple-300" />,
              title: "Email",
              value: "nirmalamala1311@gmail.com",
              tint: "from-purple-500/20 to-purple-500/5",
            },
            {
              icon: <MessageCircle className="w-6 h-6 text-pink-300" />,
              title: "Response Time",
              value: "24-48 Jam",
              tint: "from-pink-500/20 to-pink-500/5",
            },
            {
              icon: <Zap className="w-6 h-6 text-fuchsia-300" />,
              title: "Availability",
              value: "Senin - Jumat",
              tint: "from-fuchsia-500/20 to-fuchsia-500/5",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`text-center p-6 rounded-3xl border border-white/10 bg-gradient-to-b ${item.tint} lg:backdrop-blur-md hover:-translate-y-1 hover:border-purple-400/40 transition-all duration-300`}
            >
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h4 className="text-white font-semibold mb-1">{item.title}</h4>
              <p className="text-gray-300 text-sm break-words">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================
// SKILLS SECTION
// ============================================================
const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState("hardskills");

  const skillData = {
    hardskills: {
      label: "Hard Skills",
      icon: <Code2 className="w-4 h-4" />,
      categories: [
        {
          title: "Bahasa Pemrograman",
          icon: <Terminal className="w-4 h-4" />,
          skills: ["Python", "Java", "PHP", "JavaScript", "TypeScript", "Kotlin", "Dart", "C++"],
        },
        {
          title: "Web Development & Backend",
          icon: <Globe className="w-4 h-4" />,
          skills: [
            "HTML5",
            "CSS3",
            "Tailwind CSS",
            "JavaScript",
            "TypeScript",
            "PHP Native",
            "Laravel",
            "Laravel Filament",
            "CodeIgniter",
            "React.js",
            "Next.js",
            "Vue.js",
            "Node.js",
            "REST API",
            "Vite",
          ],
        },
        {
          title: "AI/ML & Data",
          icon: <Brain className="w-4 h-4" />,
          skills: [
            "Machine Learning",
            "Deep Learning",
            "Computer Vision",
            "NLP",
            "Data Mining",
            "EDA",
            "Data Visualization",
            "Model Deployment",
            "TensorFlow",
            "Keras",
            "scikit-learn",
            "MediaPipe",
          ],
        },
        {
          title: "Database",
          icon: <Database className="w-4 h-4" />,
          skills: ["MySQL", "PostgreSQL", "Supabase", "Firebase"],
        },
        {
          title: "Tools & Others",
          icon: <Layers className="w-4 h-4" />,
          skills: ["Git", "Docker", "Figma", "Filament", "Android Studio", "Postman"],
        },
      ],
    },
    softskills: {
      label: "Soft Skills",
      icon: <UsersIcon className="w-4 h-4" />,
      categories: [
        {
          title: "Leadership & Management",
          icon: <Users className="w-4 h-4" />,
          skills: ["Team Leadership", "Project Management", "Decision Making", "Delegation"],
        },
        {
          title: "Communication",
          icon: <MessageCircle className="w-4 h-4" />,
          skills: [
            "Public Speaking",
            "Presentation",
            "Technical Writing",
            "Active Listening",
            "Negotiation",
          ],
        },
        {
          title: "Problem Solving",
          icon: <Brain className="w-4 h-4" />,
          skills: [
            "Critical Thinking",
            "Analytical Skills",
            "Creative Solutions",
            "Root Cause Analysis",
          ],
        },
        {
          title: "Collaboration",
          icon: <UsersIcon className="w-4 h-4" />,
          skills: ["Teamwork", "Cross-functional Collaboration", "Mentoring", "Knowledge Sharing"],
        },
        {
          title: "Personal Attributes",
          icon: <Heart className="w-4 h-4" />,
          skills: [
            "Adaptability",
            "Time Management",
            "Self-motivation",
            "Continuous Learning",
            "Resilience",
          ],
        },
      ],
    },
    languages: {
      label: "Languages",
      icon: <Globe className="w-4 h-4" />,
      categories: [
        {
          title: "Native Languages",
          icon: <Globe className="w-4 h-4" />,
          skills: ["Indonesian (Native)", "Bugis (Native)"],
        },
        {
          title: "Foreign Languages",
          icon: <Globe className="w-4 h-4" />,
          skills: ["English (Basic)"],
        },
      ],
    },
  };

  const tabs = [
    { id: "hardskills", label: "Hard Skills", icon: <Code2 className="w-4 h-4" /> },
    { id: "softskills", label: "Soft Skills", icon: <UsersIcon className="w-4 h-4" /> },
    { id: "languages", label: "Languages", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Expertise"
          title="My"
          highlight="Skills"
          subtitle="Keterampilan teknis, soft skills, dan kemampuan bahasa yang mendukung pengembangan solusi AI dan backend development"
        />

        <div className="flex justify-center mb-10 overflow-x-auto">
          <SkillTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillData[activeTab as keyof typeof skillData].categories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative bg-white/[0.04] lg:backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/15 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="relative text-lg font-semibold text-white mb-5 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-white/10 flex items-center justify-center text-purple-200">
                    {category.icon}
                  </span>
                  {category.title}
                </h3>
                <div className="relative flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skillIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: skillIdx * 0.02 }}
                      className="px-3 py-1.5 bg-white/5 text-gray-200 text-sm rounded-full border border-white/10 hover:border-fuchsia-400/60 hover:bg-fuchsia-500/10 hover:text-white transition-all duration-300 hover:scale-105 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 lg:backdrop-blur-md rounded-3xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2">
            <ZapIcon className="w-5 h-5 text-purple-400" />
            Tech Stack Overview
            <ZapIcon className="w-5 h-5 text-pink-400" />
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "Laravel",
              "Python",
              "PHP",
              "Android Studio",
              "React Native",
              "Flutter",
              "MySQL",
              "PostgreSQL",
              "Git",
              "Figma",
              "OpenAI API",
              "Filament",
              "Docker",
              "TensorFlow",
              "Keras",
              "scikit-learn",
              "MediaPipe",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-purple-500/15 text-purple-100 rounded-full text-sm font-medium border border-purple-400/30 hover:bg-purple-500/35 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = () => (
  <footer className="relative z-10 border-t border-white/10 bg-black/20 lg:backdrop-blur-md">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-gray-400 text-sm text-center sm:text-left">
        © {new Date().getFullYear()}{" "}
        <span className={`${gradientText} font-semibold`}>Nirmalasari Rodito Sulnas</span>. All
        rights reserved.
      </p>
      <div className="flex items-center gap-3">
        {socialLinksData.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 hover:bg-purple-500/10 transition-all"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ============================================================
// MAIN COMPONENT — PortfolioPage
// ============================================================
export default function PortfolioPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [lanyardReady, setLanyardReady] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Progress bar scroll di paling atas
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setIsMounted(true);
    const media = window.matchMedia("(min-width: 1024px)");
    const syncDesktop = () => setIsDesktop(media.matches);
    syncDesktop();
    media.addEventListener("change", syncDesktop);
    return () => media.removeEventListener("change", syncDesktop);
  }, []);

  // Lanyard (WebGL) dimuat belakangan agar halaman tidak crash di HP / browser in-app
  useEffect(() => {
    const t = setTimeout(() => setLanyardReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSkills = () => {
    if (skillsRef.current) {
      skillsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroStats = [
    { value: "3.91", label: "IPK" },
    { value: "7+", label: "Proyek" },
    { value: "9+", label: "Sertifikat" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#0a0f1a] via-[#121a2b] to-[#1a2439]">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 z-[60]"
      />

      {/* Background elements: aurora + grid + orbs */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        {/* grid halus */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #a78bfa 1px, transparent 1px), linear-gradient(to bottom, #a78bfa 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* aurora statis (radial-gradient, tanpa filter blur agar ringan di HP) */}
        <div
          className="absolute -top-40 -left-40 w-[620px] h-[620px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(147,51,234,0.28) 0%, transparent 65%)" }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[580px] h-[580px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(219,39,119,0.22) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-40 left-1/4 w-[540px] h-[540px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,70,229,0.22) 0%, transparent 65%)" }}
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative w-full z-10 overflow-x-clip lg:min-h-screen">
        {/* ===== LANYARD MOBILE: layar pertama = lanyard, teks ada di bawahnya ===== */}
        <div className="relative w-full h-[100svh] z-20 lg:hidden">
          {isMounted && lanyardReady && !isDesktop && (
            <>
              <Lanyard gravity={[0, -30, 0]} />
              {/* petunjuk scroll */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{
                  opacity: { delay: 1.5, duration: 0.6 },
                  y: { delay: 1.5, duration: 1.6, repeat: Infinity },
                }}
                className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-purple-200/80 text-xs tracking-[0.25em]"
              >
                <span>SCROLL</span>
                <ChevronRight className="w-4 h-4 rotate-90" />
              </motion.div>
            </>
          )}
        </div>

        {/* ===== LANYARD DESKTOP: sisi kanan layar ===== */}
        <div className="hidden lg:block absolute top-0 right-0 h-full w-[50vw] z-20">
          <div className="pointer-events-none absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-pink-500/30 blur-3xl" />
          {isMounted && isDesktop && <Lanyard gravity={[0, -30, 0]} />}
        </div>

        {/* ===== TEKS HERO ===== */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen items-center gap-6 lg:gap-12 relative z-30 py-16 lg:pt-32 lg:pb-20 lg:pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 pointer-events-auto"
          >
            <div className="flex flex-wrap items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/5 lg:backdrop-blur-md px-5 py-2 rounded-full border border-purple-400/30 shadow-lg shadow-purple-500/10"
              >
                <span className="text-purple-100 text-sm sm:text-base font-medium">
                  👋 Hi, I'm Nirmalasari Rodito Sulnas
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for work
              </motion.div>
            </div>

            <div className="space-y-5">
              <h1 className="font-bold text-white leading-[1.05] tracking-tight">
                <ShinyText
                  text="Software "
                  speed={3}
                  size="lg"
                  color="purple"
                  className="block mb-2"
                />
                <span className="block text-5xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500">
                  Engineer
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2"
              >
                {["Frontend", "Backend", "Mobile", "UI/UX"].map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-purple-100 bg-purple-500/15 border border-purple-400/25"
                  >
                    {role}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="max-w-lg"
              >
                <p className="text-gray-300 text-base leading-relaxed">
                  Fresh Graduate S1 Ilmu Komputer (S.Kom) dengan IPK 3,91 yang memiliki minat dan
                  pengalaman dalam pengembangan perangkat lunak, khususnya Software Engineering,
                  Frontend Development, Backend Development, Web Development, Mobile Development,
                  serta UI/UX Design. Terbiasa mengembangkan aplikasi menggunakan teknologi modern
                  melalui proyek akademik, magang, dan proyek pribadi serta selalu antusias
                  mempelajari teknologi baru.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <a
                href="/ppt/CV NIRMALASARI RODITO SULNAS_PALING BARU.pdf"
                download="CV_NIRMALASARI_RODITO_SULNAS.pdf"
                rel="noopener noreferrer"
                className={`${primaryBtn} px-6 py-3 text-sm hover:scale-105`}
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
              <button
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm bg-white/5 lg:backdrop-blur-md border border-purple-400/50 text-purple-100 rounded-full font-semibold hover:bg-purple-500/20 hover:text-white transition-all hover:scale-105 cursor-pointer"
                onClick={scrollToProjects}
              >
                Explore My Projects
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm bg-white/5 lg:backdrop-blur-md border border-pink-400/50 text-pink-100 rounded-full font-semibold hover:bg-pink-500/20 hover:text-white transition-all hover:scale-105 cursor-pointer"
                onClick={scrollToSkills}
              >
                View Skills
              </button>
            </motion.div>

            {/* stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-3 sm:gap-4 pt-2"
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="px-4 sm:px-5 py-3 rounded-2xl bg-white/5 lg:backdrop-blur-md border border-white/10 hover:border-purple-400/40 transition-colors min-w-[84px] text-center"
                >
                  <div className={`text-xl sm:text-2xl font-extrabold ${gradientText}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-[11px] sm:text-xs tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
              <div className="hidden sm:block h-10 w-px bg-white/10 mx-1" />
              <div className="hidden sm:flex items-center gap-2">
                {socialLinksData.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 hover:bg-purple-500/10 transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div className="hidden lg:block" />
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        id="about"
        className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="container mx-auto">
          <SectionHeading
            eyebrow="Get to know me"
            title="About"
            highlight="Me"
            subtitle="Sedikit cerita tentang siapa saya dan apa yang saya kerjakan"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative flex justify-center lg:justify-start"
            >
              <div className="hidden lg:block pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-purple-500/25 to-pink-500/25 blur-3xl" />
              <ProfileCard
                avatarUrl="/avatar.png"
                miniAvatarUrl="/foto formal.jpeg"
                name="Nirmalasari Rodito S"
                title="Software Engineer"
                handle="nrmlardt"
                status="Available for work"
                contactText="Hire Me"
                showUserInfo={true}
                onContactClick={() => console.log("Contact clicked")}
                className="relative w-full max-w-[230px] sm:max-w-[260px] lg:max-w-sm"
                enableTilt={true}
                enableMobileTilt={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className={`${glassCard} p-6 sm:p-8 space-y-4 lg:space-y-6`}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Passionate <span className={gradientText}>Developer</span> & Problem Solver
              </h3>

              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                Saya adalah software engineer yang fokus pada pengembangan web dan mobile, dengan
                pengalaman membangun beberapa proyek nyata baik secara mandiri maupun selama magang
                di beberapa instansi. Dari pengalaman tersebut, saya terbiasa bekerja dengan
                teknologi seperti React, Next.js, Laravel, Android Studio, serta integrasi API untuk
                kebutuhan aplikasi modern.
              </p>

              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                Saya memiliki ketertarikan kuat pada pengembangan sistem yang rapi, mudah digunakan,
                dan relevan dengan kebutuhan pengguna. Setiap proyek yang saya kerjakan selalu
                menjadi ruang belajar untuk memahami alur kerja profesional dan meningkatkan
                kemampuan teknis saya agar dapat berkembang menjadi developer yang lebih matang dan
                kompeten.
              </p>

              <div className="pt-2">
                <h4 className="text-lg font-semibold text-purple-200 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  What I Do
                </h4>
                <ul className="space-y-2.5 text-gray-300">
                  {[
                    "Mengembangkan aplikasi web responsif dengan React/Next.js",
                    "Membangun aplikasi backend dengan Laravel dan Filament",
                    "Mengembangkan aplikasi mobile dengan Android Studio",
                    "Mampu mendesain UI dan UX yang menarik",
                    "Optimasi performa dan pengalaman pengguna",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <div ref={skillsRef}>
        <SkillsSection />
      </div>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Organization Section */}
      <OrganizationSection />

      {/* Certificates Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 overflow-visible">
        <CertificatesSection />
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <ProjectsSection />
      </section>

      {/* Contact Form Section */}
      <ContactFormSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
