/**
 * Team Portfolio - Interactive JavaScript
 * Author: Charles
 * Description: Smooth animations, navigation effects, and interactive elements
 * Version: 1.0.0
 */

// ===================================
// Global Variables and Configuration
// ===================================
const config = {
  animationDuration: 800,
  scrollThreshold: 100,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  debounceDelay: 16 // ~60fps
};

// ===================================
// Project Data - Sample projects for each team member
const projectData = {
  project1: {
    title: "E-Commerce Analytics Dashboard",
    subtitle: "Real-time sales analytics and inventory management",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    description: "A comprehensive analytics dashboard built for an e-commerce platform. This project features real-time data visualization, inventory tracking, sales forecasting, and customer behavior analysis. The dashboard provides actionable insights through interactive charts and automated reporting.",
    linesOfCode: "12,847",
    commits: "342",
    contributors: "3",
    duration: "4 months",
    techStack: ["React", "Node.js", "PostgreSQL", "Chart.js", "Redis", "Docker"],
    githubLink: "https://github.com/example/ecommerce-dashboard",
    liveDemoLink: "https://dashboard.example.com"
  },
  project2: {
    title: "Mobile Banking App Redesign",
    subtitle: "Modern UI/UX for digital banking",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
    description: "Complete redesign of a mobile banking application focusing on user experience, accessibility, and modern design principles. The project includes biometric authentication, real-time transaction tracking, budget management tools, and seamless payment integration.",
    linesOfCode: "8,932",
    commits: "198",
    contributors: "2",
    duration: "3 months",
    techStack: ["React Native", "Figma", "Principle", "Sketch", "InVision"],
    githubLink: "https://github.com/example/banking-app",
    liveDemoLink: "https://figma.com/file/banking-app"
  },
  project3: {
    title: "API Gateway Service",
    subtitle: "Scalable microservices architecture",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
    description: "A high-performance API gateway service designed to handle millions of requests per day. Features include rate limiting, authentication, request routing, load balancing, and comprehensive monitoring. Built with scalability and reliability as primary concerns.",
    linesOfCode: "15,234",
    commits: "567",
    contributors: "4",
    duration: "6 months",
    techStack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    githubLink: "https://github.com/example/api-gateway",
    liveDemoLink: "https://api.example.com/docs"
  },
  project4: {
    title: "Cloud Infrastructure Automation",
    subtitle: "DevOps pipeline and infrastructure as code",
    image: "https://images.unsplash.com/photo-1451187580459-4349020c0ebf?w=1200&h=800&fit=crop",
    description: "Comprehensive infrastructure automation solution for cloud deployments. Includes CI/CD pipelines, monitoring setup, auto-scaling configurations, and disaster recovery procedures. Reduces deployment time by 80% and improves system reliability.",
    linesOfCode: "6,789",
    commits: "289",
    contributors: "2",
    duration: "2 months",
    techStack: ["Terraform", "AWS", "Jenkins", "Prometheus", "Grafana", "Ansible"],
    githubLink: "https://github.com/example/infrastructure",
    liveDemoLink: "https://infrastructure.example.com"
  },
  project5: {
    title: "Fitness Tracking App",
    subtitle: "Cross-platform mobile health application",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
    description: "A comprehensive fitness tracking application with workout planning, nutrition tracking, progress monitoring, and social features. Integrates with wearable devices and provides personalized recommendations based on user data and goals.",
    linesOfCode: "18,456",
    commits: "423",
    contributors: "3",
    duration: "5 months",
    techStack: ["React Native", "Swift", "Firebase", "Node.js", "MongoDB"],
    githubLink: "https://github.com/example/fitness-app",
    liveDemoLink: "https://apps.apple.com/fitness-tracker"
  },
  project6: {
    title: "Machine Learning Pipeline",
    subtitle: "Automated ML model training and deployment",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    description: "End-to-end machine learning pipeline for automated model training, validation, and deployment. Features include data preprocessing, feature engineering, hyperparameter tuning, and model monitoring. Achieves 95% accuracy on classification tasks.",
    linesOfCode: "22,134",
    commits: "678",
    contributors: "2",
    duration: "7 months",
    techStack: ["Python", "TensorFlow", "Scikit-learn", "Docker", "Kubernetes", "Airflow"],
    githubLink: "https://github.com/example/ml-pipeline",
    liveDemoLink: "https://ml.example.com/dashboard"
  }
};

// Initialize AOS (Animate On Scroll)
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS with custom settings
  AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 0,
    mirror: false
  });
  
  console.log('🚀 Team Portfolio initialized by Charles');
  
  // Initialize all interactive features
  initializeNavigation();
  initializeTeamCards();
  initializeSmoothScroll();
  initializeScrollEffects();
  initializeButtonEffects();
});

// ===================================
// Navigation Effects
// ===================================
function initializeNavigation() {
  const nav = document.querySelector('nav');
  let lastScrollY = window.scrollY;
  
  // Add scroll effect to navigation
  window.addEventListener('scroll', debounce(() => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class for blur effect
    if (currentScrollY > config.scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Hide/show navigation on scroll (Apple-style)
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  }, config.debounceDelay));
  
  // Smooth navigation link clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Only handle internal links (anchor links)
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100; // Account for fixed nav
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Add active state to clicked link
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      }
      // External links (like contact.html) will work normally - no preventDefault()
    });
  });
  
  console.log('✅ Navigation effects initialized by Charles');
}

// ===================================
// Team Card Interactions
// ===================================
function initializeTeamCards() {
  const teamCards = document.querySelectorAll('.team-card');
  
  teamCards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
      // Add subtle 3D tilt effect
      this.style.transform = 'translateY(-8px) rotateX(5deg)';
      
      // Add glow effect to tech tags
      const techTags = this.querySelectorAll('.tech-tag');
      techTags.forEach((tag, i) => {
        setTimeout(() => {
          tag.style.transform = 'translateY(-2px)';
          tag.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        }, i * 50);
      });
    });
    
    card.addEventListener('mouseleave', function() {
      // Reset transform
      this.style.transform = 'translateY(0) rotateX(0)';
      
      // Reset tech tags
      const techTags = this.querySelectorAll('.tech-tag');
      techTags.forEach(tag => {
        tag.style.transform = 'translateY(0)';
        tag.style.boxShadow = 'none';
      });
    });
    
    // Project view button interaction
    const viewProjectBtn = card.querySelector('.view-project-btn');
    if (viewProjectBtn) {
      viewProjectBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Add ripple effect
        createRippleEffect(this, e);
        
        const pid = this.getAttribute('data-project-id');
        if (pid) {
          showProjectModal(pid);
        }
      });
    }
    
    // Card click for mobile devices
    card.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        this.classList.toggle('mobile-expanded');
      }
    });
  });
  
  console.log('✅ Team card interactions initialized by Charles');
}

// ===================================
// Smooth Scroll Effects
// ===================================
function initializeSmoothScroll() {
  // Hero button smooth scroll
  document.querySelectorAll('.hero-button').forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();
      
      if (buttonText.includes('Team')) {
        document.querySelector('#team').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else if (buttonText.includes('Projects')) {
        // Scroll to projects section (can be added later)
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
      
      // Add button press effect
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  console.log('✅ Smooth scroll effects initialized by Charles');
}

// ===================================
// Scroll-based Effects
// ===================================
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Add parallax effect to hero section
        if (entry.target.classList.contains('hero-section')) {
          addParallaxEffect(entry.target);
        }
      }
    });
  }, observerOptions);
  
  // Observe sections for scroll effects
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  console.log('✅ Scroll effects initialized by Charles');
}

// ===================================
// Button Effects
// ===================================
function initializeButtonEffects() {
  // Add ripple effect to all buttons
  document.querySelectorAll('button, .button').forEach(button => {
    button.addEventListener('click', function(e) {
      createRippleEffect(this, e);
    });
  });
  
  console.log('✅ Button effects initialized by Charles');
}

// ===================================
// Utility Functions
// ===================================

/**
 * Create ripple effect on button click
 * Author: Charles
 */
function createRippleEffect(button, event) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

/**
 * Debounce function for performance optimization
 * Author: Charles
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Show project modal with real project data
 * Author: Charles
 */
function showProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const project = projectData[projectId];
  
  if (!project) {
    console.error('Project not found:', projectId);
    return;
  }
  
  // Populate modal content
  document.getElementById('modalProjectTitle').textContent = project.title;
  document.getElementById('modalProjectSubtitle').textContent = project.subtitle;
  document.getElementById('modalProjectImage').src = project.image;
  document.getElementById('modalProjectDescription').textContent = project.description;
  document.getElementById('modalLinesOfCode').textContent = project.linesOfCode;
  document.getElementById('modalCommits').textContent = project.commits;
  document.getElementById('modalContributors').textContent = project.contributors;
  document.getElementById('modalDuration').textContent = project.duration;
  
  // Populate tech stack
  const techStackContainer = document.getElementById('modalTechStack');
  techStackContainer.innerHTML = '';
  project.techStack.forEach(tech => {
    const techTag = document.createElement('span');
    techTag.className = 'tech-stack-tag';
    techTag.textContent = tech;
    techStackContainer.appendChild(techTag);
  });
  
  // Set up links
  document.getElementById('modalGitHubLink').href = project.githubLink;
  document.getElementById('modalLiveDemoLink').href = project.liveDemoLink;
  
  // Show modal with animation
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  enableFocusTrap(modal);
}

/**
 * Close project modal
 * Author: Charles
 */
function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  disableFocusTrap();
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

/**
 * Add parallax effect to elements
 * Author: Charles
 */
function addParallaxEffect(element) {
  window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    element.style.transform = `translateY(${rate}px)`;
  }, config.debounceDelay));
}

let previouslyFocusedElement = null;
let focusTrapHandler = null;
function enableFocusTrap(modal) {
  previouslyFocusedElement = document.activeElement;
  const focusable = modal.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (first) first.focus();
  focusTrapHandler = function(e) {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };
  document.addEventListener('keydown', focusTrapHandler);
}
function disableFocusTrap() {
  if (focusTrapHandler) {
    document.removeEventListener('keydown', focusTrapHandler);
    focusTrapHandler = null;
  }
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
}

// ===================================
// Performance Optimization
// ===================================

// Preload images for better performance
function preloadImages() {
  const imageUrls = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Initialize image preloading
window.addEventListener('load', preloadImages);

// ===================================
// Mobile Menu Functionality
// ===================================
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (mobileMenuBtn && mobileMenu) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', (!expanded).toString());
    });
    
    // Close mobile menu when clicking on links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        
        // Handle navigation for internal links
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
    
    console.log('✅ Mobile menu initialized by Charles');
  }
}

// Initialize mobile menu
initializeMobileMenu();

// ===================================
// Error Handling
// ===================================
window.addEventListener('error', function(e) {
  console.error('Error in Team Portfolio:', e.error);
});

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
  }
});

/*
 * Documentation Notes by Charles:
 * 
 * This JavaScript file provides:
 * - Smooth scroll animations using AOS library
 * - Apple-inspired navigation with blur effects
 * - Interactive team cards with hover effects
 * - Performance-optimized event handlers
 * - Accessibility features (keyboard navigation)
 * - Error handling for better user experience
 * 
 * All animations are optimized for 60fps performance
 * and work seamlessly across modern browsers.
 * 
 * Future enhancements can include:
 * - Project modal system for each team member
 * - Dynamic content loading
 * - Advanced filtering and search
 * - Team member detail pages
 */
