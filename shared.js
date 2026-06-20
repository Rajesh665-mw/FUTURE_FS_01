/* ══════════════════════════════════════
   SHARED JS — K. RAJESH PORTFOLIO
══════════════════════════════════════ */

/* SPACE CANVAS */
function initSpace() {
  const canvas = document.getElementById('space-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], shooters = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  for (let i = 0; i < 300; i++) {
    stars.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.5+0.2, a: Math.random(), speed: Math.random()*0.008+0.002, twinkle: Math.random()*Math.PI*2 });
  }
  function addShooter() {
    if (document.hidden) return;
    shooters.push({ x: Math.random()*W*0.7, y: Math.random()*H*0.4, len: Math.random()*160+80, speed: Math.random()*14+8, angle: Math.PI/4+Math.random()*0.3, life: 1, decay: Math.random()*0.02+0.015, color: Math.random()>.5?'0,212,255':'157,78,221' });
  }
  setInterval(addShooter, 2000);
  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.twinkle += s.speed; s.a = 0.3+0.7*Math.abs(Math.sin(s.twinkle));
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(180,220,255,${s.a})`; ctx.fill();
    });
    shooters = shooters.filter(s => {
      s.life -= s.decay; if (s.life <= 0) return false;
      const dx = Math.cos(s.angle)*s.len, dy = Math.sin(s.angle)*s.len;
      const g = ctx.createLinearGradient(s.x, s.y, s.x+dx, s.y+dy);
      g.addColorStop(0, `rgba(${s.color},0)`);
      g.addColorStop(0.7, `rgba(${s.color},${s.life*0.8})`);
      g.addColorStop(1, `rgba(${s.color},0)`);
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x+dx, s.y+dy);
      ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
      s.x += Math.cos(s.angle)*s.speed; s.y += Math.sin(s.angle)*s.speed;
      return true;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* CURSOR */
function initCursor() {
  const cur = document.getElementById('cur'), curR = document.getElementById('cur-r');
  if (!cur || !curR) return;
  
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cur.style.display = 'none';
    curR.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mx = 0, my = 0, rx = 0, ry = 0;
  let firstMove = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (!firstMove) {
      firstMove = true;
      cur.style.opacity = '1';
      curR.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', () => {
    cur.style.opacity = '0';
    curR.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (firstMove) {
      cur.style.opacity = '1';
      curR.style.opacity = '1';
    }
  });

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .menu-card, .btn-p, .btn-o, [role="button"]')) {
      document.body.classList.add('cursor-hover');
    } else {
      document.body.classList.remove('cursor-hover');
    }
  });

  (function anim() {
    rx += (mx-rx)*.13;
    ry += (my-ry)*.13;
    cur.style.left = `${mx}px`;
    cur.style.top = `${my}px`;
    curR.style.left = `${rx}px`;
    curR.style.top = `${ry}px`;
    requestAnimationFrame(anim);
  })();
}

/* SCROLL */
function initScroll() {
  const pb = document.getElementById('progress-bar');
  const bt = document.getElementById('back-top');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    if (pb) { const p = scrollY/(document.documentElement.scrollHeight-innerHeight); pb.style.width=(p*100)+'%'; }
    if (bt) bt.classList.toggle('show', scrollY > 400);
  }, { passive: true });
}

/* SCROLL OBSERVER */
function initObserver() {
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        e.target.querySelectorAll('.sk-bar-fill[data-w]').forEach(b => { b.style.width = b.dataset.w + '%'; });
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll('.fiu').forEach(el => obs.observe(el));
}

/* MOBILE NAV */
function toggleMobileNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* TYPED TEXT */
function initTyped(elId, words, speed = 105, deleteSpeed = 55, pause = 2200) {
  const el = document.getElementById(elId);
  if (!el) return;
  let ri = 0, ci = 0, del = false;
  function tick() {
    const w = words[ri];
    if (!del) { el.textContent = w.slice(0, ++ci); if (ci === w.length) { del = true; setTimeout(tick, pause); return; } }
    else { el.textContent = w.slice(0, --ci); if (ci === 0) { del = false; ri = (ri+1)%words.length; } }
    setTimeout(tick, del ? deleteSpeed : speed);
  }
  tick();
}

/* GLITCH RANDOM TRIGGER */
function initRandomGlitch(selector) {
  const els = document.querySelectorAll(selector);
  els.forEach(el => {
    setInterval(() => {
      el.classList.add('glitch-active');
      setTimeout(() => el.classList.remove('glitch-active'), 400);
    }, Math.random()*4000+3000);
  });
}

/* PAGE TRANSITION OUT */
function navigateTo(url) {
  document.body.classList.add('page-out');
  setTimeout(() => { window.location.href = url; }, 500);
}

/* NAV TRANSITION */
function nav(e, url) {
  e.preventDefault();
  navigateTo(url);
}

/* CONTACT FORM */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('sub-btn'), st = document.getElementById('cf-status');
    const name = document.getElementById('fn').value.trim();
    const email = document.getElementById('fe').value.trim();
    const message = document.getElementById('fm').value.trim();
    if (!name||!email||!message) { st.textContent='✗ Name, email and message are required.'; st.className='cf-status cf-err show'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { st.textContent='✗ Enter a valid email address.'; st.className='cf-status cf-err show'; return; }
    btn.disabled=true; btn.textContent='TRANSMITTING...'; st.className='cf-status';
    setTimeout(() => {
      btn.disabled=false; btn.textContent='TRANSMIT MESSAGE';
      st.textContent='✓ Message transmitted. Rajesh will respond within 24 hours.';
      st.className='cf-status show';
      ['fn','fe','fs','fm'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
      setTimeout(() => st.classList.remove('show'), 6000);
    }, 2000);
  });
}

/* BOOT ALL */
function bootPage() {
  initSpace();
  initCursor();
  initScroll();
  initObserver();
  initContactForm();
}

/* PAGE TRANSITION CSS */
const style = document.createElement('style');
style.textContent = `
  body { animation: page-in .5s ease forwards; }
  body.page-out { animation: page-out .5s ease forwards; pointer-events:none; }
  @keyframes page-in { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
  @keyframes page-out { from { opacity:1; } to { opacity:0; transform:translateY(-10px); } }
`;
document.head.appendChild(style);
