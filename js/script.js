/**
 * ============================================================
 *  MAIN SCRIPT — Romantic Birthday Website
 *  Depends: GSAP, ScrollTrigger, Lenis, config.js
 * ============================================================
 */

/* ── Wait for DOM ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

    /* ── Register GSAP plugins ────────────────────────────── */
    gsap.registerPlugin(ScrollTrigger);

    /* ── Populate DOM from config ─────────────────────────── */
    populateFromConfig();

    /* ── Loading screen ───────────────────────────────────── */
    initLoading();
});

/* ============================================================
   POPULATE DOM FROM CONFIG
   ============================================================ */
function populateFromConfig() {
    const c = birthdayConfig;

    /* Names everywhere */
    document.querySelectorAll('[data-name="girlfriend"]').forEach(el => {
        el.textContent = el.textContent.replace('[HER NAME]', c.girlfriendName);
    });
    document.querySelectorAll('[data-name="yours"]').forEach(el => {
        el.textContent = el.textContent.replace('[YOUR NAME]', c.yourName);
    });

    /* Hero */
    const heroPre = document.getElementById('hero-pre');
    const heroMsg = document.getElementById('hero-msg');
    const heroName = document.getElementById('hero-name');
    if (heroPre) heroPre.textContent = c.heroPreMessage;
    if (heroMsg) heroMsg.textContent = c.heroMessage;
    if (heroName) heroName.textContent = c.girlfriendName;

    /* Love Letter */
    const letterGreeting = document.getElementById('letter-greeting');
    const letterBody     = document.getElementById('letter-body');
    const letterClosing  = document.getElementById('letter-closing');
    const letterSig      = document.getElementById('letter-sig');

    if (letterGreeting) letterGreeting.textContent = c.loveLetter.greeting.replace('[HER NAME]', c.girlfriendName);
    if (letterBody) {
        letterBody.innerHTML = c.loveLetter.paragraphs.map(p => `<p>${p}</p>`).join('');
    }
    if (letterClosing) letterClosing.textContent = c.loveLetter.closing;
    if (letterSig) letterSig.textContent = c.loveLetter.signature.replace('[YOUR NAME]', c.yourName);

    /* Love Cards */
    const cardsGrid = document.getElementById('love-cards-grid');
    if (cardsGrid) {
        cardsGrid.innerHTML = c.loveCards.map(card => `
            <div class="love-card reveal">
                <span class="love-card-number">${card.number}</span>
                <h3 class="love-card-title">${card.title}</h3>
                <p class="love-card-desc">${card.description}</p>
                <div class="love-card-glow"></div>
            </div>
        `).join('');
    }

    /* Timeline */
    const timelineWrap = document.getElementById('timeline-items');
    if (timelineWrap) {
        timelineWrap.innerHTML = c.timeline.map(item => `
            <div class="timeline-item reveal">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-index">${item.index}</span>
                    <h3 class="timeline-title">${item.title}</h3>
                    <span class="timeline-date">${item.date}</span>
                    <p class="timeline-desc">${item.description}</p>
                    ${item.image ? `<div class="timeline-photo"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>` : ''}
                </div>
            </div>
        `).join('');
    }

    /* Gallery */
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = c.memories.map((mem, i) => `
            <div class="polaroid-card reveal" data-index="${i}" role="button" tabindex="0"
                 aria-label="Memory: ${mem.caption}">
                <div class="polaroid-inner">
                    ${mem.src
                        ? `<img class="polaroid-img" src="${mem.src}" alt="${mem.caption}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
                        : ''}
                    <div class="polaroid-img-placeholder" ${mem.src ? 'style="display:none"' : ''}>📷</div>
                    <div class="polaroid-caption">
                        <span class="polaroid-date">${mem.date}</span>
                        <span class="polaroid-text">${mem.caption}</span>
                    </div>
                </div>
            </div>
        `).join('');

        /* Lightbox on click */
        galleryGrid.addEventListener('click', e => {
            const card = e.target.closest('.polaroid-card');
            if (card) {
                const idx = parseInt(card.dataset.index);
                openLightbox(idx);
            }
        });

        galleryGrid.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                const card = e.target.closest('.polaroid-card');
                if (card) openLightbox(parseInt(card.dataset.index));
            }
        });
    }

    /* Our Story */
    const storyWrap = document.getElementById('story-entries');
    if (storyWrap) {
        storyWrap.innerHTML = c.ourStory.map(s => `
            <div class="story-entry reveal">
                <div class="story-text">
                    <span class="story-date">${s.date}</span>
                    <h3 class="story-title">${s.title}</h3>
                    <p class="story-body">${s.text}</p>
                </div>
                <div class="story-image-wrapper">
                    ${s.image
                        ? `<img src="${s.image}" alt="${s.title}" loading="lazy"
                               style="width:100%;height:100%;object-fit:cover;opacity:0.85;transition:transform 0.8s cubic-bezier(0.4,0,0.2,1),opacity 0.5s"
                               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
                        : ''
                    }
                    <div class="story-image-placeholder" ${s.image ? 'style="display:none"' : ''}>
                        <span>Add your photograph here</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /* Final message */
    const finalMsgWrap = document.getElementById('final-message-lines');
    if (finalMsgWrap) {
        finalMsgWrap.innerHTML = c.finalMessage.map(line => `
            <span class="final-line reveal ${['You are loved.','You are appreciated.'].includes(line) ? 'emphasis' : ''}">${line}</span>
        `).join('');
        const lastLine = document.createElement('span');
        lastLine.className = 'final-line love reveal';
        lastLine.textContent = `Happy Birthday, ${c.girlfriendName}. ❤️`;
        finalMsgWrap.appendChild(lastLine);
    }

    /* Secret message */
    const secretText = document.getElementById('secret-message-text');
    if (secretText) secretText.textContent = c.secretMessage;

    /* Names in final screen */
    const finalNamesEl = document.getElementById('final-names');
    if (finalNamesEl) finalNamesEl.textContent = `${c.yourName} × ${c.girlfriendName}`;

    /* Birthday overlay name */
    const bdayName = document.getElementById('bday-name');
    if (bdayName) bdayName.textContent = `Happy Birthday, ${c.girlfriendName}`;
}

/* ============================================================
   LOADING
   ============================================================ */
function initLoading() {
    const screen = document.getElementById('loading-screen');
    const bar    = document.getElementById('loading-bar');
    if (!screen) { initAll(); return; }

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            if (bar) bar.style.width = '100%';
            setTimeout(() => {
                screen.classList.add('hidden');
                initAll();
            }, 600);
        }
        if (bar) bar.style.width = progress + '%';
    }, 120);
}

/* ============================================================
   INIT ALL — runs after loading
   ============================================================ */
function initAll() {
    initStars();
    initParticles();
    initHero();
    checkBirthdayMode();
    initCursor();
    initLenis();
    initMusic();
    initLightbox();
    initSecretReveal();
    initEasterEggs();
}

/* ============================================================
   STARS — Hero background
   ============================================================ */
function initStars() {
    const container = document.getElementById('hero-stars');
    if (!container) return;
    const count = 120;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2.5 + 0.5;
        star.style.cssText = `
            width:${size}px; height:${size}px;
            top:${Math.random()*100}%;
            left:${Math.random()*100}%;
            --dur:${2 + Math.random()*4}s;
            --delay:${Math.random()*4}s;
            --min-op:${0.1 + Math.random()*0.3};
            opacity:${Math.random()*0.3 + 0.1};
        `;
        container.appendChild(star);
    }
}

/* ============================================================
   PARTICLE SYSTEM
   ============================================================ */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x  = Math.random() * W;
            this.y  = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = -Math.random() * 0.4 - 0.1;
            this.alpha = 0;
            this.targetAlpha = Math.random() * 0.5 + 0.1;
            this.size = Math.random() * 2 + 0.5;
            this.life = 0;
            this.maxLife = Math.random() * 300 + 200;
            this.isHeart = Math.random() < 0.04;
            this.color = Math.random() < 0.3
                ? `rgba(201,169,110,${this.targetAlpha})`
                : `rgba(212,116,142,${this.targetAlpha})`;
        }
        update() {
            this.life++;
            this.x += this.vx;
            this.y += this.vy;
            const ratio = this.life / this.maxLife;
            this.alpha = ratio < 0.2
                ? (ratio / 0.2) * this.targetAlpha
                : ratio > 0.8
                    ? ((1 - ratio) / 0.2) * this.targetAlpha
                    : this.targetAlpha;
            if (this.life >= this.maxLife) this.reset();
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            if (this.isHeart) {
                ctx.font = `${this.size * 6}px serif`;
                ctx.fillStyle = 'rgba(212,116,142,0.6)';
                ctx.fillText('♥', this.x, this.y);
            } else {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < 80; i++) {
        const p = new Particle();
        p.life = Math.random() * p.maxLife;
        particles.push(p);
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }
    loop();
}

/* ============================================================
   HERO SEQUENCE
   ============================================================ */
function initHero() {
    const hero   = document.getElementById('hero');
    const heroPre  = document.getElementById('hero-pre');
    const heroMsg  = document.getElementById('hero-msg');
    const heroName = document.getElementById('hero-name');
    const heroTag  = document.getElementById('hero-tag');
    const heroBtn  = document.getElementById('hero-btn');
    if (!hero) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(heroPre, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .to(heroMsg,  { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .to(heroName, { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out' }, '-=0.2')
      .to(heroTag,  { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.6')
      .to(heroBtn,  { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');

    heroBtn?.addEventListener('click', () => {
        const musicBtn = document.getElementById('music-btn');

        gsap.to(hero, {
            opacity: 0,
            duration: 1.4,
            ease: 'power3.inOut',
            onComplete: () => {
                hero.classList.add('hidden');
                const main = document.getElementById('main-content');
                main.classList.add('visible');
                gsap.from(main, { opacity: 0, duration: 0.8, ease: 'power2.out' });
                gsap.to(musicBtn, { opacity: 1, duration: 0.8, delay: 0.5 });
                initScrollAnimations();
            }
        });

        gsap.to(heroBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
        });
    });

    heroBtn?.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') heroBtn.click();
    });
}

/* ============================================================
   BIRTHDAY MODE DETECTION
   ============================================================ */
function checkBirthdayMode() {
    const target = new Date(birthdayConfig.birthday + 'T00:00:00');
    const now    = new Date();
    const sameDay =
        now.getFullYear()  === target.getFullYear() &&
        now.getMonth()     === target.getMonth() &&
        now.getDate()      === target.getDate();

    if (sameDay) {
        startBirthdayMode();
    } else {
        initCountdown();
    }
}

function initCountdown() {
    const target     = new Date(birthdayConfig.birthday + 'T00:00:00');
    const daysEl     = document.getElementById('cd-days');
    const hoursEl    = document.getElementById('cd-hours');
    const minutesEl  = document.getElementById('cd-minutes');
    const secondsEl  = document.getElementById('cd-seconds');
    const countdownEl = document.getElementById('countdown-wrapper');
    const arrivedEl  = document.getElementById('birthday-arrived');

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
        const now  = new Date();
        const diff = target - now;

        if (diff <= 0) {
            /* Birthday! */
            if (countdownEl) countdownEl.style.display = 'none';
            if (arrivedEl)   arrivedEl.style.display = 'block';
            startBirthdayMode();
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl)    daysEl.textContent    = pad(d);
        if (hoursEl)   hoursEl.textContent   = pad(h);
        if (minutesEl) minutesEl.textContent = pad(m);
        if (secondsEl) secondsEl.textContent = pad(s);
    }

    tick();
    setInterval(tick, 1000);
}

/* ============================================================
   BIRTHDAY MODE
   ============================================================ */
function startBirthdayMode() {
    const overlay = document.getElementById('birthday-overlay');
    if (!overlay) return;

    overlay.classList.add('active');
    initBirthdayCanvas();

    const steps = [
        document.getElementById('bday-step-1'),
        document.getElementById('bday-step-2'),
        document.getElementById('bday-step-3'),
        document.getElementById('bday-step-4'),
        document.getElementById('bday-step-5'),
    ];

    const delays = [0, 2200, 4500, 7000, 9500];

    steps.forEach((step, i) => {
        if (!step) return;
        setTimeout(() => {
            steps.forEach(s => s && s.classList.remove('active'));
            step.classList.add('active');
        }, delays[i]);
    });

    /* After cake step shown, skip button appears */
    const skipBtn = document.getElementById('skip-bday');
    if (skipBtn) {
        setTimeout(() => { skipBtn.style.opacity = '1'; }, 10000);
        skipBtn.addEventListener('click', exitBirthdayMode);
    }

    /* Cake interaction */
    const cake = document.getElementById('bday-cake');
    const wish = document.getElementById('bday-wish');
    if (cake) {
        cake.addEventListener('click', () => {
            if (cake.classList.contains('blown')) return;
            cake.classList.add('blown');
            cake.textContent = '🎂';
            if (wish) wish.classList.add('visible');
            spawnConfetti(150);
            spawnFireworks(8);
            setTimeout(exitBirthdayMode, 6000);
        });
    }
}

function exitBirthdayMode() {
    const overlay = document.getElementById('birthday-overlay');
    if (overlay) {
        gsap.to(overlay, {
            opacity: 0, duration: 1.5, ease: 'power2.inOut',
            onComplete: () => {
                overlay.classList.remove('active');
                overlay.style.display = 'none';
                const main = document.getElementById('main-content');
                main.classList.add('visible');
                const musicBtn = document.getElementById('music-btn');
                gsap.to(musicBtn, { opacity: 1, duration: 0.8, delay: 0.5 });
                initScrollAnimations();
            }
        });
    }
}

/* ============================================================
   BIRTHDAY CANVAS — confetti + fireworks + hearts
   ============================================================ */
function initBirthdayCanvas() {
    const canvas = document.getElementById('birthday-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    let confetti = [];
    let fireworks = [];
    let birthParticles = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    /* Confetti pieces */
    window.spawnConfetti = function(count = 80) {
        const colors = ['#d4748e','#e8a0b0','#c9a96e','#f5cdd8','#8b1a35','#e2c97e','#f0e8e0'];
        for (let i = 0; i < count; i++) {
            confetti.push({
                x: Math.random() * W,
                y: -10,
                w: Math.random() * 10 + 5,
                h: Math.random() * 5 + 3,
                r: Math.random() * Math.PI * 2,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 4 + 2,
                vr: (Math.random() - 0.5) * 0.15,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                gravity: 0.08
            });
        }
    };

    /* Fireworks */
    window.spawnFireworks = function(count = 4) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => launchFirework(), i * 400);
        }
    };

    function launchFirework() {
        const x = Math.random() * W;
        const y = Math.random() * H * 0.5;
        const color = `hsl(${Math.random()*60 + 340},80%,65%)`;
        for (let i = 0; i < 60; i++) {
            const angle = (i / 60) * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            fireworks.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                size: Math.random() * 3 + 1,
                color,
                trail: []
            });
        }
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);

        /* Confetti */
        confetti = confetti.filter(c => c.alpha > 0);
        confetti.forEach(c => {
            c.x  += c.vx;
            c.y  += c.vy;
            c.vy += c.gravity;
            c.r  += c.vr;
            if (c.y > H + 20) c.alpha -= 0.05;
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.r);
            ctx.globalAlpha = c.alpha;
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
            ctx.restore();
        });

        /* Fireworks */
        fireworks = fireworks.filter(f => f.alpha > 0.01);
        fireworks.forEach(f => {
            f.trail.push({ x: f.x, y: f.y });
            if (f.trail.length > 5) f.trail.shift();
            f.x  += f.vx;
            f.y  += f.vy;
            f.vy += 0.06;
            f.vx *= 0.97;
            f.alpha -= 0.022;
            ctx.save();
            ctx.globalAlpha = f.alpha;
            ctx.fillStyle = f.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = f.color;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(loop);
    }
    loop();
}

/* ============================================================
   LENIS — smooth scroll
   ============================================================ */
function initLenis() {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({
        duration: 1.4,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(time => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {

    /* Helper — safe fromTo that always ends fully visible */
    const reveal = (el, from, extra = {}) => {
        const to = Object.assign({ opacity: 1, x: 0, y: 0, scale: 1 }, extra);
        return gsap.fromTo(el, { opacity: 0, ...from }, { ...to, ease: 'power3.out' });
    };

    /* October intro lines */
    document.querySelectorAll('.october-intro').forEach(el => {
        reveal(el, { y: 30 }, {
            duration: 1.2,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
    });

    /* October date */
    const octoberDate = document.querySelector('.october-date');
    if (octoberDate) {
        reveal(octoberDate, { scale: 0.85 }, {
            duration: 1.4,
            scrollTrigger: { trigger: octoberDate, start: 'top 82%' }
        });
    }

    /* Countdown */
    const countdownWrap = document.querySelector('.countdown-wrapper');
    if (countdownWrap) {
        reveal(countdownWrap, { y: 40 }, {
            duration: 1.2,
            scrollTrigger: { trigger: countdownWrap, start: 'top 88%' }
        });
    }

    /* Section titles & subtitles */
    document.querySelectorAll('.section-title').forEach(el => {
        reveal(el, { y: 30 }, {
            duration: 1,
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    document.querySelectorAll('.section-subtitle').forEach(el => {
        reveal(el, { y: 20 }, {
            duration: 1, delay: 0.12,
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    /* Gold lines */
    document.querySelectorAll('.gold-line').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, scaleX: 0 },
            { opacity: 1, scaleX: 1, duration: 0.9, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 90%' } }
        );
    });

    /* Story entries */
    document.querySelectorAll('.story-entry').forEach((el, i) => {
        const text  = el.querySelector('.story-text');
        const image = el.querySelector('.story-image-wrapper');
        const isEven = i % 2 === 1;

        if (text) {
            gsap.fromTo(text,
                { opacity: 0, x: isEven ? 50 : -50 },
                { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
                  scrollTrigger: { trigger: el, start: 'top 82%' } }
            );
        }
        if (image) {
            gsap.fromTo(image,
                { opacity: 0, x: isEven ? -50 : 50, scale: 0.94 },
                { opacity: 1, x: 0, scale: 1, duration: 1.2, delay: 0.15, ease: 'power3.out',
                  scrollTrigger: { trigger: el, start: 'top 82%' } }
            );
        }
    });

    /* Polaroid cards */
    document.querySelectorAll('.polaroid-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: (i % 3) * 0.12,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 94%' } }
        );
    });

    /* Love cards */
    document.querySelectorAll('.love-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: (i % 3) * 0.14,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 92%' } }
        );
    });

    /* Timeline line */
    const lineProgress = document.querySelector('.timeline-line-progress');
    const timelineContainer = document.querySelector('.timeline-container');
    if (lineProgress && timelineContainer) {
        gsap.to(lineProgress, {
            height: '100%', ease: 'none',
            scrollTrigger: {
                trigger: timelineContainer,
                start: 'top 60%', end: 'bottom 40%',
                scrub: 1,
            }
        });
    }

    /* Timeline items */
    document.querySelectorAll('.timeline-item').forEach((item) => {
        gsap.fromTo(item,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 87%' },
              onComplete: () => item.classList.add('active') }
        );
        ScrollTrigger.create({
            trigger: item, start: 'top 62%',
            onEnter: () => item.classList.add('active'),
        });
    });

    /* Envelope / Love Letter */
    if (document.querySelector('.envelope')) {
        ScrollTrigger.create({
            trigger: '#love-letter', start: 'top 58%',
            onEnter: openEnvelope, once: true
        });
    }

    /* Final message lines — already start at opacity:0 via CSS */
    document.querySelectorAll('.final-line').forEach((line, i) => {
        gsap.to(line, {
            opacity: 1, y: 0, duration: 0.9, delay: i * 0.16, ease: 'power3.out',
            scrollTrigger: { trigger: line, start: 'top 90%' }
        });
    });

    /* Final screen elements */
    [
        ['#final-screen .final-made-with', { y: 20 }, 0,    0.8],
        ['#final-screen .final-heart',     { scale: 0.4 }, 0.3, 1.2],
        ['#final-screen .final-names',     { y: 20 }, 0.55, 0.9],
    ].forEach(([sel, from, delay, dur]) => {
        const el = document.querySelector(sel);
        if (!el) return;
        gsap.fromTo(el,
            { opacity: 0, ...from },
            { opacity: 1, y: 0, scale: 1, duration: dur, delay,
              ease: delay === 0.3 ? 'back.out(2)' : 'power3.out',
              scrollTrigger: { trigger: '#final-screen', start: 'top 78%' } }
        );
    });

    /* Parallax on bg text watermarks */
    document.querySelectorAll('.section-bg-text').forEach(el => {
        gsap.to(el, {
            y: '-15%', ease: 'none',
            scrollTrigger: {
                trigger: el.closest('.section'),
                start: 'top bottom', end: 'bottom top',
                scrub: 2,
            }
        });
    });
}

/* ============================================================
   ENVELOPE / LETTER ANIMATION
   ============================================================ */
function openEnvelope() {
    const flap    = document.querySelector('.envelope-flap');
    const seal    = document.querySelector('.envelope-seal');
    const letter  = document.querySelector('.letter-wrapper');
    const hint    = document.querySelector('.envelope-hint');

    if (!flap) return;

    setTimeout(() => {
        seal?.classList.add('hidden');
        hint?.classList.add('hidden');
        flap.classList.add('open');

        setTimeout(() => {
            letter?.classList.add('revealed');
            /* Typewriter on letter body */
            typewriterEffect();
        }, 900);
    }, 400);
}

function typewriterEffect() {
    const body = document.getElementById('letter-body');
    if (!body) return;
    const paragraphs = body.querySelectorAll('p');
    let delay = 0;
    paragraphs.forEach(p => {
        const text = p.textContent;
        p.textContent = '';
        p.style.opacity = '1';
        let i = 0;
        setTimeout(() => {
            const iv = setInterval(() => {
                p.textContent += text[i];
                i++;
                if (i >= text.length) clearInterval(iv);
            }, 20);
        }, delay);
        delay += text.length * 20 + 500;
    });
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
function initLightbox() {
    const lb      = document.getElementById('lightbox');
    const lbImg   = document.getElementById('lightbox-img');
    const lbCap   = document.getElementById('lightbox-caption');
    const lbDate  = document.getElementById('lightbox-date');
    const lbClose = document.getElementById('lightbox-close');
    if (!lb) return;

    window.openLightbox = function(idx) {
        const mem = birthdayConfig.memories[idx];
        if (!mem) return;

        if (lbImg) {
            lbImg.src = mem.src || '';
            lbImg.alt = mem.caption;
            lbImg.style.display = mem.src ? 'block' : 'none';
        }
        if (lbCap)  lbCap.textContent  = mem.caption;
        if (lbDate) lbDate.textContent  = mem.date;

        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function closeLightbox() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }

    lbClose?.addEventListener('click', closeLightbox);
    lb.addEventListener('click', e => {
        if (e.target === lb) closeLightbox();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lb.classList.contains('active')) closeLightbox();
    });
}

/* ============================================================
   MUSIC
   ============================================================ */
function initMusic() {
    const btn   = document.getElementById('music-btn');
    const audio = document.getElementById('bg-audio');
    if (!btn || !audio) return;

    audio.src    = birthdayConfig.music;
    audio.loop   = true;
    audio.volume = 0.4;

    let playing = false;

    const iconNote = btn.querySelector('.music-icon-note');
    const iconEq   = btn.querySelector('.music-icon-eq');

    btn.addEventListener('click', () => {
        if (playing) {
            audio.pause();
            playing = false;
            if (iconNote) iconNote.style.display = 'block';
            if (iconEq)   iconEq.style.display   = 'none';
        } else {
            audio.play().catch(() => {});
            playing = true;
            if (iconNote) iconNote.style.display = 'none';
            if (iconEq)   iconEq.style.display   = 'flex';
        }
    });
}

/* ============================================================
   SECRET REVEAL
   ============================================================ */
function initSecretReveal() {
    const btn = document.getElementById('secret-reveal-btn');
    const box = document.getElementById('secret-message-box');
    if (!btn || !box) return;

    btn.addEventListener('click', () => {
        box.classList.add('visible');
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
        spawnMiniHearts(btn, 12);
    });
}

/* ============================================================
   EASTER EGGS
   ============================================================ */
function initEasterEggs() {
    /* 1. Hidden star in october section */
    const octoberSection = document.getElementById('october');
    if (octoberSection) {
        const star = document.createElement('div');
        star.className = 'easter-star';
        star.textContent = '✦';
        star.setAttribute('aria-hidden', 'true');
        star.style.cssText = 'top:15%;right:8%;';
        star.title = 'A little secret...';
        octoberSection.appendChild(star);

        const tooltip = createTooltip('Some things are too big for countdowns. Like how much you mean to me. ✨');
        document.body.appendChild(tooltip);
        setupEasterTrigger(star, tooltip);
    }

    /* 2. Double-click polaroid = floating hearts */
    document.addEventListener('dblclick', e => {
        const card = e.target.closest('.polaroid-card');
        if (card) {
            spawnMiniHearts(card, 8);
        }
    });

    /* 3. Final heart click */
    const finalHeart = document.querySelector('.final-heart');
    if (finalHeart) {
        const fTooltip = createTooltip('Still beating, just for you. ❤️');
        document.body.appendChild(fTooltip);
        setupEasterTrigger(finalHeart, fTooltip);
    }
}

function createTooltip(text) {
    const el = document.createElement('div');
    el.className = 'easter-tooltip';
    el.textContent = text;
    return el;
}

function setupEasterTrigger(trigger, tooltip) {
    let visible = false;
    trigger.addEventListener('click', e => {
        e.stopPropagation();
        visible = !visible;
        const rect = trigger.getBoundingClientRect();
        tooltip.style.left = Math.min(rect.left, window.innerWidth - 300) + 'px';
        tooltip.style.top  = (rect.top - 80) + 'px';
        tooltip.classList.toggle('visible', visible);
        if (visible) setTimeout(() => { visible = false; tooltip.classList.remove('visible'); }, 4000);
    });
}

function spawnMiniHearts(el, count = 8) {
    const rect = el.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
        const h = document.createElement('div');
        h.className = 'float-heart';
        h.textContent = ['❤️','♥','🌸','✨'][Math.floor(Math.random() * 4)];
        h.style.cssText = `
            left:${rect.left + Math.random() * rect.width}px;
            top:${rect.top + Math.random() * rect.height * 0.5}px;
            animation-delay:${Math.random() * 0.4}s;
            animation-duration:${1.5 + Math.random()}s;
        `;
        document.body.appendChild(h);
        h.addEventListener('animationend', () => h.remove());
    }
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function initCursor() {
    if (window.innerWidth < 768) return; /* mobile: skip */

    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    document.body.classList.add('cursor-active');

    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    /* Smooth ring follow */
    function animateRing() {
        rx += (mx - rx) * 0.14;
        ry += (my - ry) * 0.14;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    /* Hover states */
    const interactives = 'a, button, .polaroid-card, .love-card, .hero-btn, .secret-btn, .birthday-cake';
    document.addEventListener('mouseover', e => {
        if (e.target.closest(interactives)) ring.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(interactives)) ring.classList.remove('cursor-hover');
    });
}
