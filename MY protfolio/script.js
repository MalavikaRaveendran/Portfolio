/**
 * Portfolio JavaScript
 * Malavika Manila Raveendran - Python Full-Stack Developer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typing Effect
  initDynamicTyping();

  // 2. Theme Toggle (Dark / Light)
  initThemeToggle();

  // 3. Mobile Navigation Menu
  initMobileMenu();

  // 4. Active Navigation on Scroll
  initScrollSpy();

  // 5. Back to Top Button
  initBackToTop();

  // 6. Copy Email to Clipboard
  initCopyEmail();

  // 7. Interactive Contact Form
  initContactForm();

  // 8. Dynamic Copyright Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

/**
 * Dynamic Typing Effect in Hero Section
 */
function initDynamicTyping() {
  const dynamicElement = document.getElementById('dynamic-typing');
  if (!dynamicElement) return;

  const roles = [
    'Python Full-Stack Developer',
    'Django & REST API Specialist',
    'Web Designer & Developer',
    'UI/UX Designer',
    'Technical Support Executive',    
    'Prompt Engineer',
    'AI & Web Applications Builder'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      dynamicElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      dynamicElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at the end of the word
      isDeleting = true;
      typingSpeed = 1600;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350;
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing
  type();
}

/**
 * Dark / Light Theme Toggle with LocalStorage
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;
  const metaThemeColor = document.getElementById('meta-theme-color');

  function updateThemeMeta(theme) {
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#ffffff' : '#09090b');
    }
  }

  // Retrieve saved preference or fallback to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let activeTheme = 'dark';
  if (savedTheme) {
    activeTheme = savedTheme;
  } else if (!systemPrefersDark) {
    activeTheme = 'light';
  }

  htmlRoot.setAttribute('data-theme', activeTheme);
  updateThemeMeta(activeTheme);

  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeMeta(newTheme);
  });
}

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
      navMenu.classList.remove('open');
    }
  });
}

/**
 * Scroll Spy - Active navigation links based on scroll position
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
}

/**
 * Copy Email to Clipboard with Visual Tooltip
 */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = 'malavikamr143@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
      copyBtn.setAttribute('title', 'Copied to clipboard!');

      // Create a temporary toast feedback
      showToast('Email address copied to clipboard!');

      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        copyBtn.setAttribute('title', 'Copy email address');
      }, 2500);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });
}

/**
 * Lightweight Toast Notification
 */
function showToast(message) {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.backgroundColor = '#10b981';
    toast.style.color = '#ffffff';
    toast.style.padding = '0.65rem 1.4rem';
    toast.style.borderRadius = '9999px';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = '600';
    toast.style.zIndex = '10000';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '0.5rem';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2800);
}

/**
 * Interactive Contact Form
 */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim() || 'Portfolio Contact Inquiry';
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      feedback.textContent = 'Please fill out all required fields.';
      feedback.className = 'form-feedback error';
      feedback.style.display = 'block';
      return;
    }

    // Compose mailto link so user's native email client opens with the pre-filled message
    const mailtoUri = `mailto:malavikamr143@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    feedback.textContent = 'Thank you! Opening your email client to dispatch the message...';
    feedback.className = 'form-feedback success';
    feedback.style.display = 'block';

    setTimeout(() => {
      window.location.href = mailtoUri;
      form.reset();
    }, 900);
  });
}
