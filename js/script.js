// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  // demo data (replace or extend)
  const announcements = [
    {
      id: 1,
      title: "Enrollment Reminder",
      date: "Dec 1, 2025",
      text: "Last day for enrollment is Dec 1-5. Check resources for guides.",
      image: "images/event2.jpg"
    },
    {
      id: 2,
      title: "Classes Start Schedule",
      date: "Dec 9, 2025",
      text: "Classes Start for 2nd Semester. Offices will be closed.",
      image: "images/event1.jpg"
    }
  ];

  const events = [
    { id: 1, title: "Student Year-End Party", date: "December 19, 2025", desc: "Celebration to wrap up the school year.", image: "images/party.jpg" },
    { id: 2, title: "Pre-Internship Training", date: "Jan 10, 2026", desc: "Preparation and guidance before on-the-job training.", image: "images/intern.jpg" },
    { id: 3, title: "Tree Planting Activity", date: "April 10, 2026", desc: "Promotes environmental care and community involvement.", image: "images/plant.jpg" }
  ];

  // populate announcements
  const annWrap = document.getElementById('announcementsList');
  announcements.forEach(a => {
    const div = document.createElement('article');
    div.className = 'card';
    div.innerHTML = `
      <img src="${a.image}" alt="${a.title}">
      <h3>${a.title}</h3>
      <small class="muted">${a.date}</small>
      <p>${a.text}</p>
      <a class="btn small" href="#">Read More</a>
    `;
    annWrap.appendChild(div);
  });

  // populate events
  const eventsWrap = document.getElementById('eventsList');
  events.forEach(e => {
    const el = document.createElement('div');
    el.className = 'event-card';
    el.innerHTML = `
      <img src="${e.image}" alt="${e.title}">
      <h4>${e.title}</h4>
      <small class="muted">${e.date}</small>
      <p>${e.desc}</p>
    `;
    eventsWrap.appendChild(el);
  });

  // sticky header class on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 40) header.classList.add('scrolled'); else header.classList.remove('scrolled');
    // update active nav link
    updateActiveLink();
  });

  // mobile nav toggle
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    toggle.classList.toggle('open');
  });

  // smooth scroll links
  document.querySelectorAll('.nav-link, .hero-cta .btn').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if(!href || !href.startsWith('#')) return;
      e.preventDefault();
      const id = href.substring(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior: 'smooth', block:'start'});
      if (nav.classList.contains('show')) nav.classList.remove('show');
    });
  });

  // counters animate
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        animateValue(el, 0, target, 800);
        observer.unobserve(el);
      }
    });
  }, {threshold:0.6});
  counters.forEach(c => observer.observe(c));
  function animateValue(el, start, end, duration) {
    const range = end - start;
    let current = start;
    const stepTime = Math.abs(Math.floor(duration / Math.max(range,1)));
    const timer = setInterval(() => {
      current += (range > 0) ? 1 : -1;
      el.textContent = current;
      if (current == end) clearInterval(timer);
    }, Math.max(stepTime, 10));
  }

  // year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // download button toast (nice feedback)
  document.querySelectorAll('.btn.download').forEach(btn => {
    btn.addEventListener('click', () => {
      // small visual feedback
      showToast('Download started — check your downloads folder.');
      // default behavior will start download because of href+download attribute
    });
  });

  // contact form demo
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Demo form: message is not sent (static site).');
  });

  // simple toast
  function showToast(text){
    let t = document.createElement('div');
    t.className = 'site-toast';
    t.textContent = text;
    Object.assign(t.style, {
      position:'fixed', right:'18px', bottom:'18px', background:'rgba(12,12,18,0.95)',
      color:'#fff', padding:'12px 16px', borderRadius:'10px', boxShadow:'0 10px 30px rgba(0,0,0,0.6)', zIndex:9999
    });
    document.body.appendChild(t);
    setTimeout(()=> t.style.opacity = '0', 2400);
    setTimeout(()=> t.remove(), 2800);
  }

  // helper to highlight active nav link
  function updateActiveLink(){
    const sections = ['home','announcements','events','resources','about','contact'];
    let fromTop = window.scrollY + 120;
    sections.forEach(id => {
      const sec = document.getElementById(id);
      const link = document.querySelector('.nav-link[href="#'+id+'"]');
      if(!sec || !link) return;
      if(sec.offsetTop <= fromTop && sec.offsetTop + sec.offsetHeight > fromTop){
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  // Fade-in animation for sections (smooth top-to-bottom)
  const fadeSections = document.querySelectorAll('.section, .hero, .site-header, .site-footer');

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeSections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(40px)';
    sec.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
    fadeObserver.observe(sec);
  });
});