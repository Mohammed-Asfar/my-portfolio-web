"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getProjects, Project } from "@/lib/projects";
import { addMessage } from "@/lib/messages";
import ProjectCard from "./components/ProjectCard";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  EmailIcon,
  MenuIcon,
  CloseIcon,
  CodeIcon,
  SmartphoneIcon,
  GlobeIcon,
  ServerIcon,
  CheckCircleIcon,
  ArrowDownIcon,
} from "./icons";

// Navigation Links
const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

// Skills Data
const skills = [
  { name: "Flutter", level: 90 },
  { name: "Python", level: 90 },
  { name: "Firebase", level: 85 },
  { name: "LangChain / GenAI", level: 80 },
  { name: "AWS CDK", level: 75 },
  { name: "Django", level: 70 },
  { name: "Next.js", level: 65 },
  { name: "React", level: 60 },
];

const additionalTech = [
  "Dart", "Java", "C", "FastAPI", "Flask", "Selenium",
  "Playwright", "MongoDB", "ShadCN UI", "Tailwind CSS", "Vite", "OpenCV",
  "n8n", "AI Code Editors", "Cursor", "Windsurf"
];

// Services Data
const services = [
  {
    icon: SmartphoneIcon,
    title: "Mobile App Development",
    description: "Cross-platform development using Flutter with Firebase integration, real-time data, and seamless iOS/Android deployment.",
    technologies: ["Flutter", "Firebase", "Dart", "Bloc"],
  },
  {
    icon: GlobeIcon,
    title: "Website Development",
    description: "Responsive, modern websites with stunning UI/UX, API integration, and SEO optimization. Building with Next.js using AI-powered code editors.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Vite"],
  },
  {
    icon: ServerIcon,
    title: "Backend & Cloud",
    description: "REST API development, cloud infrastructure with AWS CDK (Python), database design, and scalable deployment solutions.",
    technologies: ["AWS CDK", "Django", "FastAPI", "Python"],
  },
  {
    icon: CodeIcon,
    title: "GenAI & Automation",
    description: "Building AI-powered applications with LangChain, workflow automation with n8n, and integrating LLMs into production systems.",
    technologies: ["LangChain", "n8n", "OpenAI", "Python"],
  },
];

// Experience Stats
const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "20+", label: "Projects Completed" },
  { value: "5+", label: "Technologies Mastered" },
  { value: "100%", label: "Client Satisfaction" },
];

// Process Steps
const processSteps = [
  { step: "01", title: "Discovery", description: "Understanding requirements and goals" },
  { step: "02", title: "Planning", description: "Creating detailed project roadmap" },
  { step: "03", title: "Development", description: "Building with best practices" },
  { step: "04", title: "Testing", description: "Comprehensive quality assurance" },
  { step: "05", title: "Deployment", description: "Launching and monitoring" },
  { step: "06", title: "Support", description: "Ongoing maintenance and updates" },
];

// Social Links
const socialLinks = [
  { icon: GitHubIcon, href: "https://github.com/Mohammed-Asfar", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/mohammed-asfar-a22b68295", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://www.instagram.com/mohammed_asfar/", label: "Instagram" },
  { icon: EmailIcon, href: "mailto:errorfound500@gmail.com", label: "Email" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Message Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setSending(true);
    try {
      await addMessage(formData);
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 glass-card px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors duration-200">
              <Image
                src="/profilepic.png"
                alt="Mohammed Asfar"
                fill
                className="object-cover"
              />
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary">
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text p-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-muted hover:text-text transition-colors duration-200 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
                Hire Me
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Profile Picture */}
            <div className="relative animate-fade-in-up">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glow-accent animate-pulse-glow">
                <Image
                  src="/profilepic.png"
                  alt="Mohammed Asfar"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-accent/30 scale-110" />
            </div>
            
            {/* Hero Content */}
            <div className="text-center lg:text-left flex-1">
              <p className="text-accent font-medium mb-4 animate-fade-in-up">
                Hello, I&apos;m
              </p>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)] animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                Mohammed <span className="gradient-text">Asfar</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-muted mb-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                App Developer • GenAI Developer • Cloud Engineer
              </p>
              <p className="text-text-muted max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                Creating scalable mobile and web applications using Flutter, React, and Python.
                Building AI-powered solutions with LangChain and deploying to AWS with CDK.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <a href="#contact" className="btn-primary">
              Get In Touch
            </a>
            <a href="#services" className="btn-secondary">
              View Services
            </a>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center lg:justify-start gap-4 mt-12 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-surface hover:bg-surface-hover text-text-muted hover:text-accent transition-all duration-200 cursor-pointer"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce text-center">
            <a href="#about" aria-label="Scroll to about section">
              <ArrowDownIcon className="w-6 h-6 text-text-muted mx-auto" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title font-[family-name:var(--font-space-grotesk)]">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Passionate about creating innovative solutions
          </p>
          
          <div className="glass-card p-8 md:p-12">
            <p className="text-text-muted leading-relaxed mb-6">
              I&apos;m Mohammed Asfar, passionate about app development and staying current with the latest 
              technologies and trends in the field. I&apos;ve developed mobile apps, websites, and desktop 
              software using Flutter, and I am proficient in Python, Java, C, and Dart.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              I&apos;ve also worked on several projects, including real-time object detection with OpenCV 
              and integrating AI chatbots into mobile applications. These experiences have honed my 
              coding skills and problem-solving abilities.
            </p>
            <p className="text-text-muted leading-relaxed">
              I&apos;m eager to further develop my skills and contribute to innovative projects in app 
              development and AI, particularly those that involve real-world data and enhance user 
              experiences. Outside of my work, I enjoy gaming and keeping up with tech trends.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title font-[family-name:var(--font-space-grotesk)]">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Some of my recent work
          </p>
          
          {loadingProjects ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-text-muted">Projects coming soon...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title font-[family-name:var(--font-space-grotesk)]">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies I work with
          </p>
          
          <div className="glass-card p-8 md:p-12 mb-8">
            <div className="grid gap-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-text-muted">{skill.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Additional Technologies */}
          <div className="glass-card p-8">
            <h3 className="text-lg font-semibold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Additional Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {additionalTech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-surface rounded-full text-sm text-text-muted hover:text-accent hover:bg-surface-hover transition-colors duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title font-[family-name:var(--font-space-grotesk)]">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            What I can do for you
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="glass-card glass-card-hover p-8 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-space-grotesk)]">
                  {service.title}
                </h3>
                <p className="text-text-muted mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-surface text-xs rounded-full text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title font-[family-name:var(--font-space-grotesk)]">
            Experience & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Numbers that speak for themselves
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-6 text-center glow-on-hover cursor-default"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 font-[family-name:var(--font-space-grotesk)]">
                  {stat.value}
                </div>
                <div className="text-text-muted text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title font-[family-name:var(--font-space-grotesk)]">
            Development <span className="gradient-text">Process</span>
          </h2>
          <p className="section-subtitle">
            How I bring ideas to life
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="glass-card p-6 relative overflow-hidden group cursor-default"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-accent/10 font-[family-name:var(--font-space-grotesk)] group-hover:text-accent/20 transition-colors duration-300">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-space-grotesk)]">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title font-[family-name:var(--font-space-grotesk)]">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let&apos;s talk!
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-6 font-[family-name:var(--font-space-grotesk)]">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:errorfound500@gmail.com"
                  className="flex items-center gap-4 text-text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <EmailIcon className="w-5 h-5 text-accent" />
                  </div>
                  <span>errorfound500@gmail.com</span>
                </a>
                
                <div className="flex items-center gap-4 text-text-muted">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <GlobeIcon className="w-5 h-5 text-accent" />
                  </div>
                  <span>Available Worldwide</span>
                </div>
                
                <div className="flex items-center gap-4 text-text-muted">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-accent" />
                  </div>
                  <span>Response within 24 hours</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-text-muted text-sm mb-4">Follow me on</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-surface hover:bg-accent/10 text-text-muted hover:text-accent transition-all duration-200 cursor-pointer"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-6 font-[family-name:var(--font-space-grotesk)]">
                Send a Message
              </h3>
              
              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-text-muted mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors duration-200"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm text-text-muted mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors duration-200"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-text-muted mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={sending || sent}
                  className={`btn-primary w-full ${sent ? 'bg-green-500 hover:bg-green-600' : ''}`}
                >
                  {sending ? "Sending..." : sent ? "Message Sent! ✅" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Mohammed Asfar. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
