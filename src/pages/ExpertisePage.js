import React from "react";
import {useState ,useEffect}  from "react";
import { Link } from "react-router-dom";
import "./ExpertisePage.css";

import logo from '../Assests/logo.png'
import react from "react";

function ExpertisePage() {
  const skills = [
    // Frontend Development
    { name: "React.js", level: 80, category: "Frontend" },
    { name: "JavaScript (ES6+)", level: 80, category: "Frontend" },
    { name: "HTML5", level: 90, category: "Frontend" },
    { name: "CSS3", level: 90, category: "Frontend" },
    { name: "WordPress", level: 60, category: "Frontend" },

    // Backend Development
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Express.js", level: 85, category: "Backend" },
    { name: "Flask", level: 60, category: "Backend" },
    { name: "REST APIs", level: 90, category: "Backend" },

    // Programming Languages
    { name: "Python", level: 90, category: "Programming" },
    { name: "C/C++", level: 60, category: "Programming" },
    { name: "Kotlin", level: 60, category: "Programming" },

    // Databases
    { name: "DynamoDB", level: 80, category: "Database" },
    { name: "Firebase", level: 95, category: "Database" },

    // AI/ML & Robotics
    { name: "TensorFlow", level: 70, category: "AI/ML" },
    { name: "OpenCV", level: 90, category: "AI/ML" },
    { name: "PyTorch", level: 70, category: "AI/ML" },
    { name: "ROS/ROS2", level: 80, category: "Robotics" },
    { name: "SLAM", level: 80, category: "Robotics" },
    { name: "Arduino", level: 90, category: "Robotics" },

    // Cloud & DevOps
    { name: "AWS", level: 90, category: "Cloud" },
    { name: "Google Cloud", level: 80, category: "Cloud" },
    { name: "Git/GitHub", level: 90, category: "DevOps" },
    { name: "Linux/WSL", level: 80, category: "DevOps" },
  ];

  const projects = [
    {
      title: "Autonomous Wheelchair – IIT Mandi",
      description:
        "Developed comprehensive mapping, localization, and navigation system for an autonomous wheelchair during internship at IIT Mandi. Implemented advanced SLAM algorithms and Rtab with ROS and optimized navigation stack for real-world deployment.",
      technologies: [
        "ROS",
        "SLAM",
        "Python",
        "Navigation Stack",
        "Localization",
      ],
      features: ["Autonomous Navigation", "Real-time Mapping", "Path Planning"],
      github: "https://github.com/yourusername/autonomous-wheelchair",

      status: "Completed",
    },
    {
      title: "Gas Component Detection – IIT Guwahati",
      description:
        "Built a sophisticated gas detection prototype using IR sensors for environmental monitoring during my internship at IIT Guwahati, capable of distinguishing absorption rates at different concentrations of target solutions.",
      technologies: ["Arduino", "IR Sensors", "C++"],
      features: [
        "IR Sensor Integration",
        "Data Logging",
        "Environmental Monitoring",
      ],
      github: "https://github.com/yourusername/gas-detection-iit",
      status: "Completed",
    },
    {
      title: "Mento.in – Mental Wellness Platform",
      description:
        "Built full-scale website for Mento.in mental wellness startup. Worked as backend & partial frontend developer, designing database architecture, mail service, meet scheduler, and link generator using modern web technologies.",
      technologies: [
        "React",
        "Express.js",
        "AWS",
        "Database Design",
        "Mail Service",
      ],
      features: [
        "Meet Scheduler",
        "Link Generator",
        "Mail Service",
        "Database Architecture",
      ],
      live: "https://mento.in",
      status: "Live",
    },
    {
      title: "Google Drive File Downloader",
      description:
        "Developed a comprehensive React + Express application to download files and folders directly from Google Drive using Drive API. Features bulk downloads and seamless file management.",
      technologies: ["React", "Express.js", "Google Drive API", "Node.js"],
      features: [
        "Bulk Downloads",
        "Drive API Integration",
        "File Management",
        "Real-time Progress",
      ],
      github: "https://github.com/yourusername/drive-downloader",
      live: "/drive-download",
      status: "Live",
    },
    {
      title: "Colab Notes App",
      description:
        "Built a real-time collaborative notes application for seamless teamwork. Features live editing, user collaboration, and synchronized document management.",
      technologies: ["React", "Socket.io", "Node.js", "Real-time Sync"],
      features: [
        "Real-time Collaboration",
        "Live Editing",
        "User Management",
        "Document Sync",
      ],

      live: "#",
      status: "In Progress",
    },
    {
      title: "Android Development Projects",
      description:
        "Developed multiple Android applications including a Lemonade interactive app and currently building a Fun Facts app that displays random facts with engaging user interface.",
      technologies: ["Kotlin", "Android Studio", "Mobile Development"],
      features: [
        "Interactive UI",
        "Random Facts",
        "Mobile Optimization",
        "User Engagement",
      ],
      github: "https://github.com/yourusername/android-apps",
      live: "#",
      status: "In Progress",
    },
    {
      title: "AI & ML Projects Portfolio",
      description:
        "Trained Transformer model for hand gesture recognition in home automation. Built object detection models and color detection & segmentation pipelines using OpenCV for computer vision applications.",
      technologies: [
        "TensorFlow",
        "OpenCV",
        "Python",
        "Transformers",
        "Computer Vision",
      ],
      features: [
        "Gesture Recognition",
        "Object Detection",
        "Color Segmentation",
        "Home Automation",
      ],
      github: "https://github.com/yourusername/ai-ml-projects",

      status: "Completed",
    },
  ];

  const certifications = [
    {
      title: "Google Developers Certification – Android Development",
      issuer: "Online Intership Program",
      date: "2024",
      Link: "https://www.linkedin.com/in/pradeep-argal/overlay/1737985658907/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "Comprehensive Android development certification covering Kotlin programming, UI/UX design, Firebase integration, and modern Android architecture patterns.",
    },
    {
      title: "Google AI/ML Internship Certification",
      issuer: "Online Internship Program",
      date: "2024",
      Link: "https://www.linkedin.com/in/pradeep-argal/details/certifications/1729689929087/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "Advanced certification in machine learning and AI fundamentals, including computer vision, NLP, deep learning, transformers, and large language models.",
    },
    {
      title: "AWS Academy Cloud Architecture ",
      issuer: "Online Internship Program",
      date: "2024",
      Link: "https://www.linkedin.com/in/pradeep-argal/details/certifications/1724585361911/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "This certification validates your expertise in designing and deploying scalable, secure, and resilient cloud architectures on AWS. It equips you with skills to create well-architected solutions tailored to business needs.",
    },
    {
      title: "AWS Academy Cloud Foundations",
      issuer: "Online Internship Program",
      date: "2024",
      Link: "https://www.linkedin.com/in/pradeep-argal/details/certifications/1724581790507/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "This certification demonstrates proficiency in foundational AWS cloud concepts, including core services, security, governance, and cloud economics. It builds a solid groundwork for adopting cloud technologies confidently.",
    },

    {
      title: "Natural Language Processing (NLP)",
      issuer: "Infosys",
      date: "2024",
      Link: "https://www.linkedin.com/in/pradeep-argal/details/certifications/1729689906094/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "Advanced NLP certification covering text processing, sentiment analysis, language models, and natural language understanding.",
    },
    {
      title: "Data Science Certification",
      issuer: "Infosys",
      date: "2024",
      Link: "https://www.linkedin.com/in/pradeep-argal/details/certifications/1729689429592/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "Comprehensive data science training including statistical modeling, machine learning, and data analytics with real-world applications.",
    },

    {
      title: "Artificial Intelligence (AI)",
      issuer: "Infosys",
      date: "2024",
      Link: "https://www.linkedin.com/in/pradeep-argal/details/certifications/1729689388849/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "Comprehensive AI certification covering machine learning algorithms, neural networks, and AI application development.",
    },
    {
      title: "NPTEL Certification-Data Structures (DS)",
      issuer: "Nptel",
      date: "2023",

      Link: "https://www.linkedin.com/in/pradeep-argal/details/certifications/1728020754345/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "Advanced data structures certification covering algorithms, complexity analysis, and efficient programming techniques.",
    },
    {
      title: "Deep Learning (DL)",
      issuer: "Infosys",
      date: "2024",

      Link: "https://www.linkedin.com/in/pradeep-argal/details/certifications/1729689638403/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "Deep learning certification covering neural networks, convolutional networks, and advanced deep learning architectures.",
    },
    {
      title: "Generative Adversarial Networks (GANs)",
      issuer: "Infosys",
      date: "2024",
      credentialId: "INFOSYS-GAN-2024",
      Link: "https://www.linkedin.com/in/pradeep-argal/details/certifications/1750653606478/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "Specialized certification in GANs covering generative models, adversarial training, and creative AI applications.",
    },
    {
      title: "Python Programming",
      issuer: "Udemy",
      date: "2023",
      credentialId: "UDEMY-PYTHON-2023",
      Link: "https://www.linkedin.com/in/pradeep-argal/details/certifications/1729690620466/single-media-viewer/?profileId=ACoAAEBNnmoBuNax4z5P8BTrKbacPHaVgCM51x0",
      description:
        "Comprehensive Python programming certification covering advanced programming concepts, libraries, and application development.",
    },
  ];


  const [visibleCount, setVisibleCount] = useState(7);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (



    <div className="expertise-page">
      {/* Navigation */}

      <div className="expertise-container">
        {/* Hero Section */}
        <section className="expertise-hero">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span className="badge-text">Technical Excellence</span>
            </div>
            <h1 className="hero-title">
              My <span className="highlight">Expertise</span>
              <span className="title-decoration">
                <span className="decoration-dot">•</span>
                <span className="decoration-line"></span>
              </span>
            </h1>
            <p className="hero-description">
              A comprehensive showcase of my technical skills, innovative
              projects, and professional certifications. From robotics and AI/ML
              to full-stack development, explore the technologies and expertise
              that drive my passion for creating intelligent systems and
              innovative solutions.
            </p>

            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-icon">🛠️</div>
                <div className="stat-content">
                  <span className="stat-number">{skills.length}+</span>
                  <span className="stat-label">Technical Skills</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🚀</div>
                <div className="stat-content">
                  <span className="stat-number">{projects.length}+</span>
                  <span className="stat-label">Projects Built</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-content">
                  <span className="stat-number">{certifications.length}+</span>
                  <span className="stat-label">Certifications</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
            </div>

            <div className="hero-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">🤖</span>
                <span className="highlight-text">AI/ML & Robotics</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">💻</span>
                <span className="highlight-text">Full-Stack Development</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">☁️</span>
                <span className="highlight-text">Cloud Architecture</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">📱</span>
                <span className="highlight-text">Mobile Development</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-elements">
              <div className="floating-element element-1">⚡</div>
              <div className="floating-element element-2">🔧</div>
              <div className="floating-element element-3">💡</div>
              <div className="floating-element element-4">🎯</div>
              <div className="floating-element element-5">🚀</div>
            </div>
            <div className="hero-gradient"></div>
          </div>
        </section>

      
        {/* Projects Section */}
        <section className="projects-section">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <p>Real-world applications of my technical expertise</p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span
                    className={`status ${project.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-features">
                  {project.features.map((feature, featureIndex) => (
                    <span key={featureIndex} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.github !== undefined && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn secondary"
                    >
                      <span>📖</span> Code
                    </a>
                  )}

                  {project.live !== "#" && project.live !== undefined ? (
                    project.live.startsWith("/") ? (
                      <Link to={project.live} className="project-btn primary">
                        <span>🚀</span> Live Demo
                      </Link>
                    ) : (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn primary"
                      >
                        <span>🚀</span> Live Demo
                      </a>
                    )
                  ) : project.live === "#" ? (
                    <button className="project-btn disabled">
                      Coming Soon
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="skills-section">
          <div className="section-header">
            <h2>Technical Skills</h2>
            <p>Technologies and tools I work with across different domains</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-category">{skill.category}</span>

                {isMobile && visibleCount < skill.length && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button onClick={() => setVisibleCount(skill.length)} style={{ padding: "8px 16px" }}>
            Show More
          </button>
        </div>
      )}

      {isMobile && visibleCount === skill.length && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button onClick={() => setVisibleCount(3)} style={{ padding: "8px 16px" }}>
            Show Less
          </button>
        </div>
      )}
              </div>
  
              
            
            
            ))}
          </div>


        
     
        </section>
        {/* Certifications Section */}
        <section className="certifications-section">
          <div className="section-header">
            <h2>Professional Certifications</h2>
            <p>Industry-recognized credentials and achievements</p>
          </div>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <a className="certification-link" href={cert.Link}>
                <div key={index} className="certification-card">
                  <div className="cert-icon">🏆</div>
                  <div className="cert-content">
                    <h3>{cert.title}</h3>
                    <h4>{cert.issuer}</h4>
                    <p className="cert-date">{cert.date}</p>
                    <p className="cert-description">{cert.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="expertise-footer">
          <div className="footer-content">
            <div className="footer-logo">
            <img src={logo} className="logo-photo" alt="Profile" />
            </div>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/expertise">Expertise</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © 2024 Your Portfolio. Showcasing expertise in robotics, AI/ML,
              and development.
            </p>
          </div>
        </footer>
      </div>




    </div>
  );
}

export default ExpertisePage;
