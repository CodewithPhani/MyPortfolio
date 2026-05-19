const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  document.getElementById('navbar').classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.getElementById('navbar').classList.toggle('dark-mode');
  
  const isDarkMode = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      updateActiveLink(link);
    }
  });
});

function updateActiveLink(link = null) {
  navLinks.forEach(l => l.classList.remove('active'));
  if (link) {
    link.classList.add('active');
  }
}

window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section, header');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  section.classList.add('reveal');
  observer.observe(section);
});

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBar = entry.target;
      const percentage = skillBar.style.width;
      skillBar.style.animation = 'none';
      // Trigger reflow
      void skillBar.offsetWidth;
      // Re-apply animation
      skillBar.style.animation = 'progressBar 1.5s ease-out forwards';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

const projectData = {
  'Attendance Management System': {
    title: 'Attendance Management System',
    tech: 'Java | Database | ADS',
    description: 'A comprehensive system built with Java for managing student attendance with database integration and advanced data structures. It features real-time tracking, secure user authentication, and detailed reporting capabilities to streamline administrative tasks.',
    link: '#'
  },
  'StyleSense Ai': {
    title: 'StyleSense Ai',
    tech: 'Html | Css | JavaScript | Python',
    description: 'This website helps you find the perfect outfit for any occasion. It uses AI to analyze your body type and skin tone to recommend the best styles for you. Integrates a Python backend with a dynamic HTML/CSS/JS frontend for a seamless user experience.',
    link: '#'
  }
};

function openProjectModal(projectName) {
  const modal = document.getElementById('projectModal');
  const data = projectData[projectName.trim()];
  
  if (data && modal) {
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalTech').textContent = data.tech;
    document.getElementById('modalDescription').textContent = data.description;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  } else {
    showNotification(`${projectName} - Great choice!`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const closeModalBtn = document.getElementById('closeModalBtn');
  const projectModal = document.getElementById('projectModal');

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  // Add hover effects
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
  
  const btn = card.querySelector('.project-btn');
  btn.addEventListener('click', () => {
    const projectName = card.querySelector('h3').textContent;
    openProjectModal(projectName);
  });
});

const hobbyCards = document.querySelectorAll('.hobby-card');

hobbyCards.forEach(card => {
  card.addEventListener('click', () => {
    const hobbyText = card.querySelector('p').textContent;
    showNotification(`I love ${hobbyText}!`);
  });
});

const educationItems = document.querySelectorAll('.education-item');

educationItems.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('expanded');
  });
});

const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    // Add a subtle animation
    item.style.transform = 'translateX(10px)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateX(0)';
  });
});

const certBadges = document.querySelectorAll('.cert-badge');

certBadges.forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'scale(1.05) rotate(-2deg)';
  });
  
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = 'scale(1) rotate(0deg)';
  });
});

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  header.style.backgroundPosition = `center ${scrollY * 0.5}px`;
});
function highlightNavLink() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').slice(1);
    if (href === currentSection) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(120deg, #0077B6, #00B4D8);
    color: white;
    padding: 1em 1.5em;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 119, 182, 0.4);
    animation: slideInRight 0.3s ease-out;
    z-index: 1000;
    font-weight: 600;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
  
  .nav-link.active {
    background: #0077B6;
    border-radius: 4px;
  }
`;
document.head.appendChild(styleSheet);

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Thank you! Message sent successfully!');
    form.reset();
  });
}

const socialLinks = document.querySelectorAll('.social-icon');
socialLinks.forEach(link => {
  const href = link.getAttribute('href') || '';
  const isPlaceholder = href === '#' || href.trim() === '';
  if (isPlaceholder) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showNotification('Link coming soon!');
    });
  }
});

window.addEventListener('load', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });
});

const contactItems = document.querySelectorAll('.contact-link, .contact-card a');
contactItems.forEach(link => {
  const href = link.getAttribute('href') || '';
  const isPlaceholder = href === '#' || href.trim() === '';
  if (isPlaceholder) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showNotification('Contact information updated!');
    });
  }
});

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(120deg, #0077B6, #00B4D8);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  font-size: 1.5em;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.4);
  transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  scrollToTopBtn.style.transform = 'scale(1)';
});

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 't') {
    themeToggle.click();
  }
  
  if (e.key === 'Escape') {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(n => n.remove());
  }
});

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      highlightNavLink();
      ticking = false;
    });
    ticking = true;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('✨ Portfolio loaded successfully!');
});

if (typeof console === 'undefined') {
  window.console = { log: () => {} };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showNotification,
    highlightNavLink,
    updateActiveLink
  };
}
