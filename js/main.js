/**
 * ============================================================
 *  MAIN.JS — Rendering, interaksi, dan animasi E-CV
 *  Membaca semua data dari DATA (data.js).
 * ============================================================
 */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /** Buat elemen dengan atribut dan children */
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') node.className = v;
      else if (k === 'dataset') Object.assign(node.dataset, v);
      else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
      else if (v !== null && v !== undefined) node.setAttribute(k, v);
    }
    children.forEach(c => {
      if (typeof c === 'string' || typeof c === 'number') node.append(c);
      else if (c instanceof Node) node.append(c);
    });
    return node;
  }

  /* WhatsApp SVG Icon */
  function getWhatsAppSvg(size = 20) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('class', 'icon-wa');
    svg.innerHTML = '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>';
    return svg;
  }

  /* ============================================================
     1) THEME MANAGEMENT (dark / light)
     ============================================================ */
  function initTheme() {
    const saved = localStorage.getItem('theme');
    const theme = saved || 'dark';
    document.documentElement.setAttribute('data-theme', theme);

    const toggle = $('#themeToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      });
    }
  }

  /* ============================================================
     2) NAVBAR & DECK SWITCHER — Render, scroll, hamburger
     ============================================================ */
  function renderNav() {
    const menu = $('#navMenu');
    menu.innerHTML = '';
    DATA.nav.forEach(item => {
      menu.append(el('a', { href: item.href }, item.label));
    });
  }

  function initCyberDeckTabs() {
    const tabs = $$('.deck-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.deckTarget;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetEl = $(`#${targetId}`);
        if (targetEl) {
          const navHeight = 90;
          const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: topPos, behavior: 'smooth' });
        }
      });
    });

    // Update active deck tab on scroll
    const sections = ['tentang', 'skill', 'proyek', 'riwayat', 'kontak'];
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            tabs.forEach(t => t.classList.toggle('active', t.dataset.deckTarget === id));
            break;
          }
        }
      }
    }, { passive: true });
  }

  function initNavbar() {
    const navbar = $('#navbar');
    const hamburger = $('#hamburger');
    const menu = $('#navMenu');

    // Scroll effect
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Hamburger
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      menu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        hamburger.classList.remove('open');
        menu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Active link based on scroll
    const sections = $$('section[id]');
    const navLinks = $$('#navMenu a');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-70px 0px -40% 0px' });

    sections.forEach(sec => observer.observe(sec));
  }

  /* ============================================================
     3) HERO — Render + typing effect
     ============================================================ */
  function renderHero() {
    const h = DATA.hero;

    // Status pill
    const statusWrap = $('#heroStatus');
    if (statusWrap && h.statusBadge) {
      statusWrap.innerHTML = `
        <span class="status-indicator">
          <span class="status-dot"></span>
          <span class="status-dot-ping"></span>
        </span>
        <span class="status-text">${h.statusBadge}</span>
      `;
    }

    $('#heroGreeting').textContent = h.greeting;
    $('#heroName').textContent = h.name;
    if ($('#heroSummary') && h.summary) {
      $('#heroSummary').textContent = h.summary;
    }

    // Photo
    const photoEl = $('#heroPhoto');
    photoEl.src = h.photo;
    photoEl.alt = `Foto ${h.name}`;

    // CTAs
    const cta = $('#heroCta');
    cta.innerHTML = '';

    // Primary: WhatsApp / Hubungi
    const waSocial = DATA.contact.socials.find(s => s.platform === 'WhatsApp');
    const waUrl = waSocial ? waSocial.url : `https://wa.me/${DATA.contact.whatsappNumber || ''}`;

    const waBtn = el('a', {
      href: waUrl,
      class: 'btn btn--wa',
      target: '_blank',
      rel: 'noopener',
      'aria-label': 'Hubungi via WhatsApp'
    });
    waBtn.append(getWhatsAppSvg(18), el('span', {}, h.ctaContact || 'Hubungi Saya'));
    cta.append(waBtn);

    // Secondary: Download CV
    const cvBtn = el('a', {
      href: h.cvFile,
      class: 'btn btn--primary',
      download: '',
      'aria-label': h.ctaDownload
    }, el('i', { 'data-lucide': 'file-text' }), el('span', {}, h.ctaDownload));
    cta.append(cvBtn);

    // Outline: Proyek
    const projBtn = el('a', {
      href: '#proyek',
      class: 'btn btn--outline',
      'aria-label': 'Lihat Proyek'
    }, el('i', { 'data-lucide': 'sparkles' }), el('span', {}, 'Lihat Portofolio'));
    cta.append(projBtn);
  }

  /** Efek ketik di hero headline dengan hacker decrypt glitch */
  function initTypingEffect() {
    const target = $('#heroHeadline');
    if (!target) return;
    const lines = DATA.hero.headlines;
    let lineIdx = 0, charIdx = 0, isDeleting = false;
    const GLYPHS = '!<>-_\\/[]{}—=+*^?#________';
    const SPEED_TYPE = 65, SPEED_DELETE = 30, PAUSE = 2200;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.textContent = lines[0];
      return;
    }

    function tick() {
      const line = lines[lineIdx];

      if (!isDeleting) {
        // Efek decoder / character flicker sebelum karakter asli terkunci
        if (charIdx < line.length && Math.random() < 0.3) {
          const randomGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          target.textContent = line.substring(0, charIdx) + randomGlyph;
          setTimeout(() => {
            target.textContent = line.substring(0, charIdx + 1);
            charIdx++;
            setTimeout(tick, SPEED_TYPE);
          }, 25);
          return;
        }

        target.textContent = line.substring(0, charIdx);

        if (charIdx === line.length) {
          setTimeout(() => { isDeleting = true; tick(); }, PAUSE);
          return;
        }
        charIdx++;
      } else {
        target.textContent = line.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          lineIdx = (lineIdx + 1) % lines.length;
        } else {
          charIdx--;
        }
      }

      setTimeout(tick, isDeleting ? SPEED_DELETE : SPEED_TYPE);
    }

    tick();
  }

  /* ============================================================
     3b) HOLOGRAPHIC CHARACTER CARD — 3D Parallax & Prismatic Sheen
     ============================================================ */
  function initCharacterTilt() {
    const card = $('#characterCard');
    const wrapper = $('#charWrapper');
    const badge1 = $('#floatBadge1');
    const badge2 = $('#floatBadge2');
    const badge3 = $('#floatBadge3');

    if (!card || !wrapper) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let isHovered = false;

    wrapper.addEventListener('mouseenter', () => {
      isHovered = true;
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (!isHovered) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Koordinat persentase kursor untuk efek prismatic foil sheen
      const pctX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const pctY = Math.round(((e.clientY - rect.top) / rect.height) * 100);

      card.style.setProperty('--foil-x', `${pctX}%`);
      card.style.setProperty('--foil-y', `${pctY}%`);

      // Rotasi 3D kartu halus
      const rotX = -(y / (rect.height / 2)) * 10;
      const rotY = (x / (rect.width / 2)) * 10;

      card.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;

      // Parallax dinamis bertingkat pada floating badges
      if (badge1) {
        badge1.style.transform = `translate3d(${(-rotY * 1.6).toFixed(1)}px, ${(-rotX * 1.6).toFixed(1)}px, 40px)`;
      }
      if (badge2) {
        badge2.style.transform = `translate3d(${(rotY * 1.8).toFixed(1)}px, ${(rotX * 1.8).toFixed(1)}px, 50px)`;
      }
      if (badge3) {
        badge3.style.transform = `translate3d(${(-rotY * 1.2).toFixed(1)}px, ${(rotX * 1.2).toFixed(1)}px, 30px)`;
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      isHovered = false;
      card.style.transform = '';
      if (badge1) badge1.style.transform = '';
      if (badge2) badge2.style.transform = '';
      if (badge3) badge3.style.transform = '';
    });

    // Easter Egg: Klik kartu atau tombol memicu Sandevistan Overdrive Burst (Edgerunners Speed Burst)
    let isBursting = false;
    function triggerSandevistan() {
      if (isBursting) return;
      isBursting = true;
      card.classList.add('sandevistan-burst');

      const sandeText = $('#sandeText');
      const telemetry = $('#cyberTelemetry');
      if (sandeText) sandeText.textContent = 'OVERDRIVE x10';
      if (telemetry) telemetry.textContent = 'NEURAL BURST // 100%';

      setTimeout(() => {
        card.classList.remove('sandevistan-burst');
        if (sandeText) sandeText.textContent = 'SANDEVISTAN';
        if (telemetry) telemetry.textContent = 'CYBERWARE // MK.IV';
        isBursting = false;
      }, 550);
    }

    card.addEventListener('click', triggerSandevistan);

    const triggerBtn = $('#sandeTriggerBtn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerSandevistan();
      });
    }
  }

  /* ============================================================
     3c) RETRO ARCADE XP SCROLL PROGRESS BAR
     ============================================================ */
  function initScrollXpBar() {
    const bar = $('#pixelXpBar');
    const text = $('#pixelXpText');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.round((scrollY / docHeight) * 100), 100) : 0;

      bar.style.width = progress + '%';
      if (text) text.textContent = `EXP: ${progress}%`;
    }, { passive: true });
  }

  /* ============================================================
     4) ABOUT — Render
     ============================================================ */
  function renderAbout() {
    const a = DATA.about;
    $('#aboutTitle').textContent = a.title;
    if ($('#aboutSubtitle') && a.subtitle) {
      $('#aboutSubtitle').textContent = a.subtitle;
    }

    const content = $('#aboutContent');
    content.innerHTML = '';

    // Paragraphs
    const textDiv = el('div', { class: 'about__text' });
    a.paragraphs.forEach(p => textDiv.append(el('p', {}, p)));

    // Highlights
    const hlDiv = el('div', { class: 'about__highlights' });
    a.highlights.forEach(h => {
      const item = el('div', { class: 'about__highlight-card' },
        el('div', { class: 'about__highlight-icon' }, el('i', { 'data-lucide': h.icon })),
        el('div', { class: 'about__highlight-body' },
          h.title ? el('h4', { class: 'about__highlight-title' }, h.title) : null,
          el('p', { class: 'about__highlight-text' }, h.text)
        )
      );
      hlDiv.append(item);
    });

    content.append(textDiv, hlDiv);
  }

  /* ============================================================
     5) SKILLS — Modern Tech Cards (Tanpa Persentase Angka)
     ============================================================ */
  function renderSkills() {
    const s = DATA.skills;
    $('#skillTitle').textContent = s.title;
    if ($('#skillSubtitle') && s.subtitle) {
      $('#skillSubtitle').textContent = s.subtitle;
    }

    // Filter categories
    const categories = ['Semua', ...new Set(s.list.map(sk => sk.category))];
    const filterWrap = $('#skillFilter');
    filterWrap.innerHTML = '';

    categories.forEach((cat, i) => {
      const btn = el('button', {
        class: `skill-filter-btn${i === 0 ? ' active' : ''}`,
        type: 'button',
        dataset: { cat: cat },
      }, cat);
      filterWrap.append(btn);
    });

    renderSkillCards('Semua');

    filterWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.skill-filter-btn');
      if (!btn) return;
      $$('.skill-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSkillCards(btn.dataset.cat);
    });
  }

  function getLevelClass(level) {
    if (typeof level === 'number') {
      if (level >= 80) return { cls: 'level--mahir', label: 'Mahir', blocks: '■ ■ ■' };
      if (level >= 60) return { cls: 'level--menengah', label: 'Menengah', blocks: '■ ■ □' };
      return { cls: 'level--dasar', label: 'Dasar', blocks: '■ □ □' };
    }
    const l = String(level).toLowerCase();
    if (l.includes('mahir') || l.includes('advanced')) return { cls: 'level--mahir', label: level, blocks: '■ ■ ■' };
    if (l.includes('menengah') || l.includes('intermediate')) return { cls: 'level--menengah', label: level, blocks: '■ ■ □' };
    return { cls: 'level--dasar', label: level, blocks: '■ □ □' };
  }

  function renderSkillCards(category) {
    const grid = $('#skillGrid');
    grid.innerHTML = '';
    const list = category === 'Semua'
      ? DATA.skills.list
      : DATA.skills.list.filter(s => s.category === category);

    list.forEach((sk, idx) => {
      const levelInfo = getLevelClass(sk.level);
      const iconName = sk.icon || 'cpu';
      const chipCode = `CHIP//${String(idx + 1).padStart(2, '0')}`;

      const card = el('div', { class: 'skill-card anim-on-scroll' },
        el('div', { class: 'skill-card__top' },
          el('div', { class: 'skill-card__icon-box' },
            el('i', { 'data-lucide': iconName })
          ),
          el('span', { class: 'skill-card__chip-id' }, chipCode),
          el('span', { class: `skill-badge ${levelInfo.cls}` },
            el('span', { class: 'skill-badge__dot' }),
            levelInfo.label
          )
        ),
        el('div', { class: 'skill-card__body' },
          el('h3', { class: 'skill-card__name' }, sk.name),
          el('div', { class: 'skill-card__meta' },
            el('span', { class: 'skill-card__category' }, sk.category),
            el('span', { class: 'skill-card__meter' }, levelInfo.blocks)
          )
        )
      );
      grid.append(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
    observeAnimations();
  }

  /* ============================================================
     6) PROJECTS — Clean, Polished Cards
     ============================================================ */
  function renderProjects() {
    const p = DATA.projects;
    $('#projectTitle').textContent = p.title;
    if ($('#projectSubtitle') && p.subtitle) {
      $('#projectSubtitle').textContent = p.subtitle;
    }

    const grid = $('#projectGrid');
    grid.innerHTML = '';

    p.list.forEach(proj => {
      const techs = el('div', { class: 'project-card__techs' });
      proj.techs.forEach(t => techs.append(el('span', { class: 'tech-tag' }, t)));

      const links = el('div', { class: 'project-card__links' });
      if (proj.demo && proj.demo !== '#' && proj.demo.trim() !== '') {
        links.append(el('a', { href: proj.demo, target: '_blank', rel: 'noopener', class: 'btn-proj btn-proj--primary' },
          el('i', { 'data-lucide': 'external-link' }), el('span', {}, 'Live Demo')
        ));
      }
      if (proj.repo && proj.repo !== '#' && proj.repo.trim() !== '') {
        links.append(el('a', { href: proj.repo, target: '_blank', rel: 'noopener', class: 'btn-proj btn-proj--outline' },
          el('i', { 'data-lucide': 'github' }), el('span', {}, 'Source Code')
        ));
      }

      const card = el('div', { class: 'project-card anim-on-scroll' },
        el('div', { class: 'project-card__media' },
          proj.badge ? el('span', { class: 'project-card__badge' }, proj.badge) : null,
          el('img', {
            class: 'project-card__image',
            src: proj.image,
            alt: proj.name,
            loading: 'lazy',
            width: '640',
            height: '360',
          })
        ),
        el('div', { class: 'project-card__body' },
          el('h3', { class: 'project-card__title' }, proj.name),
          proj.subname ? el('p', { class: 'project-card__subname' }, proj.subname) : null,
          el('p', { class: 'project-card__desc' }, proj.description),
          techs,
          links
        )
      );
      grid.append(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
    observeAnimations();
  }

  /* ============================================================
     7) EXPERIENCE & EDUCATION — Timeline Modern
     ============================================================ */
  function renderExperience() {
    const e = DATA.experience;
    $('#expTitle').textContent = e.title;
    const timeline = $('#expTimeline');
    timeline.innerHTML = '';

    e.list.forEach(item => {
      const descList = el('ul', { class: 'timeline__desc' });
      item.description.forEach(d => descList.append(el('li', {}, d)));

      const card = el('div', { class: 'timeline__card' },
        el('div', { class: 'timeline__meta' },
          el('span', { class: 'timeline__period' },
            el('i', { 'data-lucide': 'calendar' }), item.period
          ),
          item.type ? el('span', { class: 'timeline__type-badge' }, item.type) : null
        ),
        el('h3', { class: 'timeline__title' }, item.role),
        el('p', { class: 'timeline__subtitle' },
          el('i', { 'data-lucide': 'building-2' }), item.company
        ),
        descList
      );

      const node = el('div', { class: 'timeline__item anim-on-scroll' },
        el('div', { class: 'timeline__marker' }),
        card
      );
      timeline.append(node);
    });
  }

  function renderEducation() {
    const e = DATA.education;
    $('#eduTitle').textContent = e.title;
    const timeline = $('#eduTimeline');
    timeline.innerHTML = '';

    e.list.forEach(item => {
      const card = el('div', { class: 'timeline__card' },
        el('div', { class: 'timeline__meta' },
          el('span', { class: 'timeline__period' },
            el('i', { 'data-lucide': 'calendar' }), item.period
          ),
          item.badge ? el('span', { class: 'timeline__type-badge' }, item.badge) : null
        ),
        el('h3', { class: 'timeline__title' }, item.degree),
        el('p', { class: 'timeline__subtitle' },
          el('i', { 'data-lucide': 'graduation-cap' }), item.school
        ),
        item.description ? el('p', { class: 'timeline__edu-desc' }, item.description) : null
      );

      const node = el('div', { class: 'timeline__item anim-on-scroll' },
        el('div', { class: 'timeline__marker timeline__marker--edu' }),
        card
      );
      timeline.append(node);
    });
  }

  /* ============================================================
     8) SERTIFIKAT — Render
     ============================================================ */
  function renderCertificates() {
    const c = DATA.certificates;
    const section = $('#sertifikat');
    if (!c || !c.list || c.list.length === 0) {
      if (section) section.style.display = 'none';
      return;
    }

    section.style.display = '';
    $('#certTitle').textContent = c.title;
    const grid = $('#certGrid');
    grid.innerHTML = '';

    c.list.forEach(cert => {
      const card = el('div', { class: 'cert-card anim-on-scroll' },
        el('div', { class: 'cert-card__icon' }, el('i', { 'data-lucide': 'award' })),
        el('h3', { class: 'cert-card__name' }, cert.name),
        el('p', { class: 'cert-card__issuer' }, cert.issuer),
        el('p', { class: 'cert-card__date' }, cert.date),
        cert.link
          ? el('a', { class: 'cert-card__link', href: cert.link, target: '_blank', rel: 'noopener' },
              el('i', { 'data-lucide': 'external-link' }), 'Lihat Kredensial'
            )
          : null
      );
      grid.append(card);
    });
  }

  /* ============================================================
     9) CONTACT — Render Modern Interactive Glass Cards
     ============================================================ */
  function renderContact() {
    const c = DATA.contact;
    $('#contactTitle').textContent = c.title;
    $('#contactSubtitle').textContent = c.subtitle;

    const links = $('#contactLinks');
    links.innerHTML = '';

    c.socials.forEach(s => {
      const isWA = s.platform.toLowerCase() === 'whatsapp';
      const isMail = s.platform.toLowerCase() === 'email';
      const isGH = s.platform.toLowerCase() === 'github';
      const isIG = s.platform.toLowerCase() === 'instagram';

      let platformClass = 'contact-card--default';
      let actionHint = 'Buka Profil';
      let statPill = 'ACTIVE';

      if (isWA) {
        platformClass = 'contact-card--wa';
        actionHint = 'Mulai Percakapan';
        statPill = 'FAST RESPONSE';
      } else if (isMail) {
        platformClass = 'contact-card--mail';
        actionHint = 'Kirim Email';
        statPill = 'OFFICIAL';
      } else if (isGH) {
        platformClass = 'contact-card--gh';
        actionHint = 'Lihat Repositori';
        statPill = 'CODEBASE';
      } else if (isIG) {
        platformClass = 'contact-card--ig';
        actionHint = 'Kunjungi Profil';
        statPill = 'SOCIAL';
      }

      const card = el('a', {
        class: `contact-card ${platformClass}${s.highlight ? ' contact-card--highlight' : ''}`,
        href: s.url,
        target: isMail ? '_self' : '_blank',
        rel: isMail ? '' : 'noopener',
      });

      // Icon Container
      const iconWrap = el('div', { class: 'contact-card__icon-box' });
      if (isWA) {
        iconWrap.append(getWhatsAppSvg(24));
      } else {
        iconWrap.append(el('i', { 'data-lucide': s.icon }));
      }

      // Middle Info
      const infoWrap = el('div', { class: 'contact-card__info' },
        el('div', { class: 'contact-card__topline' },
          el('span', { class: 'contact-card__platform' }, s.platform),
          el('span', { class: 'contact-card__status-pill' }, statPill)
        ),
        el('span', { class: 'contact-card__value' }, s.label || s.url),
        el('span', { class: 'contact-card__action-hint' },
          actionHint,
          el('i', { 'data-lucide': 'arrow-up-right' })
        )
      );

      card.append(iconWrap, infoWrap);
      links.append(card);
    });
  }

  /* ============================================================
     10) FOOTER — Render
     ============================================================ */
  function renderFooter() {
    const f = DATA.footer;
    const footerWrap = $('#footer');
    if (!footerWrap) return;

    footerWrap.innerHTML = `
      <div class="container footer__inner">
        ${f.quote ? `<p class="footer__quote">${f.quote}</p>` : ''}
        <div class="footer__divider"></div>
        <div class="footer__bottom">
          <p class="footer__text">${f.text}</p>
          ${f.subtext ? `<p class="footer__subtext">${f.subtext}</p>` : ''}
          <a href="#" class="back-to-top" aria-label="Kembali ke atas">
            <i data-lucide="arrow-up"></i>
            <span>Kembali ke atas</span>
          </a>
        </div>
      </div>
    `;
  }

  /* ============================================================
     11) SCROLL ANIMATIONS — IntersectionObserver
     ============================================================ */
  let animObserver;

  function observeAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      $$('.anim-on-scroll').forEach(el => el.classList.add('visible'));
      return;
    }

    if (animObserver) animObserver.disconnect();

    animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    $$('.anim-on-scroll').forEach(elem => {
      if (!elem.classList.contains('visible')) {
        animObserver.observe(elem);
      }
    });
  }

  /* ============================================================
     12) SEO META — Update
     ============================================================ */
  function updateMeta() {
    const m = DATA.meta;
    document.title = m.title;

    const setMeta = (selector, attr, value) => {
      const tag = $(selector);
      if (tag && value) tag.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', m.description);
    setMeta('meta[property="og:title"]', 'content', m.title);
    setMeta('meta[property="og:description"]', 'content', m.description);
    setMeta('meta[property="og:image"]', 'content', m.ogImage);
    setMeta('meta[name="theme-color"]', 'content', m.themeColor);
  }

  /* ============================================================
     13) MATRIX RAIN BACKGROUND (Calm, Serene, Ambient Stream)
     ============================================================ */
  function initMatrixRain() {
    const canvas = $('#matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    let w, h, columns, drops;
    // Karakter biner & teknis ringkas agar tidak ramai
    const chars = '01<>/_#+*~';
    const fontSize = 18;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      columns = Math.floor(w / (fontSize * 1.8)); // Jarak antar kolom dibuat jauh lebih lega (tenang)
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -60);
      }
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastDraw = 0;
    const FPS = 14; // Kecepatan diperlambat agar tenang, tidak silau dan tidak ramai
    const interval = 1000 / FPS;

    function draw(now) {
      requestAnimationFrame(draw);
      if (now - lastDraw < interval) return;
      lastDraw = now;

      // Fading background
      ctx.fillStyle = 'rgba(4, 7, 20, 0.12)';
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * (fontSize * 1.8);
        const y = drops[i] * fontSize;

        // Warna cyan sangat lembut dan tenang
        ctx.fillStyle = 'rgba(0, 240, 255, 0.28)';
        ctx.fillText(text, x, y);

        if (y > h && Math.random() > 0.992) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    requestAnimationFrame(draw);
  }

  /* ============================================================
     14) CYBERNETIC CROSSHAIR CURSOR & MAGNETIC HOVER
     ============================================================ */
  function initCyberCursor() {
    const dot = $('#cyberCursorDot');
    const ring = $('#cyberCursorRing');
    if (!dot || !ring) return;

    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderRing);
    }
    requestAnimationFrame(renderRing);

    // Expand crosshair ring on interactive elements
    const targets = 'a, button, .character-card, .skill-card, .project-card, .terminal-exec-wrapper';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(targets)) {
        ring.classList.add('hovering');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(targets)) {
        ring.classList.remove('hovering');
      }
    });
  }

  /* ============================================================
     15) CYBERPUNK WEB AUDIO SYNTHESIZER (Sci-Fi Audio SFX)
     ============================================================ */
  let audioCtx = null;
  let isSoundEnabled = false;

  function initWebAudioSynth() {
    const btn = $('#synthAudioToggle');
    const label = $('#synthAudioLabel');
    const icon = $('#synthAudioIcon');
    if (!btn) return;

    function getAudioContext() {
      if (!audioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) audioCtx = new AudioClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playTone(freq, type, duration, gainVal = 0.05) {
      if (!isSoundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (err) {
        // Audio policy ignore
      }
    }

    function playBeep() { playTone(880, 'sine', 0.08, 0.04); }
    function playSandevistanAudio() {
      if (!isSoundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } catch (e) {}
    }

    btn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      getAudioContext();

      btn.classList.toggle('active', isSoundEnabled);
      if (label) label.textContent = isSoundEnabled ? 'SFX: ON' : 'SFX: OFF';
      if (icon) icon.setAttribute('data-lucide', isSoundEnabled ? 'volume-2' : 'volume-x');
      if (window.lucide) lucide.createIcons();

      if (isSoundEnabled) playBeep();
    });

    // Wire SFX to interactive triggers
    document.addEventListener('click', (e) => {
      if (e.target.closest('#sandeTriggerBtn, #characterCard')) {
        playSandevistanAudio();
      } else if (e.target.closest('button, a.btn, a.btn-proj')) {
        playBeep();
      }
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    initTheme();
    updateMeta();
    renderNav();
    initCyberDeckTabs();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderEducation();
    renderCertificates();
    renderContact();
    renderFooter();
    initNavbar();
    initTypingEffect();
    initCharacterTilt();
    initScrollXpBar();
    initMatrixRain();
    initCyberCursor();
    initWebAudioSynth();

    if (window.lucide) {
      lucide.createIcons();
    }
    observeAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
