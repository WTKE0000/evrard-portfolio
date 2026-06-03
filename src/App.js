import { useState, useEffect, useRef } from "react";

const WA = "237656620793";
const EMAIL = "ewemayi@gmail.com";
const waLink = (msg = "Hello Evrard! I'd like to discuss a project.") =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const mailLink = `mailto:${EMAIL}?subject=Project enquiry`;

/* ── GLOBAL STYLES ─────────────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap');

:root {
  --g: #14e87b;
  --g2: #0bc863;
  --bg: #050505;
  --bg2: #0d0d0d;
  --bg3: #111;
  --line: rgba(255,255,255,0.07);
  --t1: #f0ede8;
  --t2: #9a9590;
  --t3: #555;
  --display: 'Clash Display', sans-serif;
  --body: 'Cabinet Grotesk', sans-serif;
  --r: 12px;
  --r2: 20px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--body); background: var(--bg); color: var(--t1); line-height: 1.6; overflow-x: hidden; }

/* NAV */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(1.2rem, 5vw, 3rem);
  height: 68px;
  background: rgba(5,5,5,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--line);
  transition: all .3s;
}
.nav-logo {
  font-family: var(--display); font-size: 1.15rem; font-weight: 700;
  color: var(--t1); letter-spacing: -0.02em; text-decoration: none;
}
.nav-logo em { color: var(--g); font-style: normal; }
.nav-links { display: flex; align-items: center; gap: 2.5rem; list-style: none; }
.nav-links a { font-size: 0.85rem; color: var(--t2); text-decoration: none; font-weight: 500; letter-spacing: 0.01em; transition: color .2s; }
.nav-links a:hover { color: var(--t1); }
.nav-pill {
  background: var(--g); color: #050505 !important;
  padding: 0.5rem 1.2rem; border-radius: 100px;
  font-weight: 700 !important; font-size: 0.82rem !important;
  transition: opacity .2s, transform .15s !important;
}
.nav-pill:hover { opacity: 0.88; transform: translateY(-1px); }
.burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
.burger span { display: block; width: 22px; height: 2px; background: var(--t1); border-radius: 2px; transition: all .3s; }
.mob-menu { display: none; position: fixed; inset: 0; z-index: 998; background: var(--bg); padding: 6rem 2rem 2rem; flex-direction: column; gap: 1.5rem; }
.mob-menu.open { display: flex; }
.mob-menu a { font-family: var(--display); font-size: 2rem; font-weight: 600; color: var(--t1); text-decoration: none; border-bottom: 1px solid var(--line); padding-bottom: 1.5rem; transition: color .2s; }
.mob-menu a:hover { color: var(--g); }

/* HERO */
.hero {
  min-height: 100vh;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 0 clamp(1.2rem, 6vw, 4rem) clamp(3rem, 6vw, 5rem);
  position: relative; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(ellipse 60% 60% at 70% 50%, rgba(20,232,123,0.07) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 20% 80%, rgba(20,232,123,0.04) 0%, transparent 60%);
}
.hero-grid {
  position: absolute; inset: 0; z-index: 0;
  background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}
.hero-content { position: relative; z-index: 1; max-width: 900px; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--g); margin-bottom: 1.5rem;
}
.hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--g); animation: blink 2s infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
.hero h1 {
  font-family: var(--display);
  font-size: clamp(3rem, 8vw, 7.5rem);
  font-weight: 700; line-height: 0.95;
  letter-spacing: -0.04em; color: var(--t1);
  margin-bottom: 2rem;
}
.hero h1 .outline {
  -webkit-text-stroke: 1px rgba(240,237,232,0.35);
  color: transparent;
}
.hero h1 .green { color: var(--g); }
.hero-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; flex-wrap: wrap; margin-top: 3rem; }
.hero-desc { font-size: clamp(0.95rem, 1.5vw, 1.1rem); color: var(--t2); max-width: 440px; line-height: 1.75; font-weight: 400; }
.hero-btns { display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }
.btn-g {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--g); color: #050505;
  padding: 0.85rem 1.6rem; border-radius: 100px;
  font-size: 0.875rem; font-weight: 700; border: none; cursor: pointer;
  font-family: var(--body); text-decoration: none;
  transition: transform .15s, opacity .2s;
}
.btn-g:hover { transform: translateY(-2px); opacity: 0.9; }
.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: var(--t1);
  padding: 0.85rem 1.6rem; border-radius: 100px;
  font-size: 0.875rem; font-weight: 500;
  border: 1px solid rgba(255,255,255,0.15); cursor: pointer;
  font-family: var(--body); text-decoration: none;
  transition: border-color .2s, transform .15s;
}
.btn-ghost:hover { border-color: rgba(255,255,255,0.4); transform: translateY(-2px); }
.hero-scroll {
  position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 1;
  animation: scrollbob 2s ease-in-out infinite;
}
@keyframes scrollbob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
.hero-scroll span { font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--t3); }
.hero-scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, var(--t3), transparent); }

/* TICKER */
.ticker-wrap { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: var(--bg2); padding: 0.9rem 0; }
.ticker { display: flex; gap: 3rem; animation: tick 20s linear infinite; white-space: nowrap; }
.ticker:hover { animation-play-state: paused; }
@keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.ticker-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.8rem; font-weight: 500; color: var(--t3); letter-spacing: 0.06em; text-transform: uppercase; flex-shrink: 0; }
.ticker-item em { color: var(--g); font-style: normal; font-size: 1rem; }

/* ABOUT / STATS */
.about { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; padding: clamp(4rem,8vw,8rem) clamp(1.2rem,6vw,4rem); max-width: 1400px; margin: 0 auto; }
.about-left h2 { font-family: var(--display); font-size: clamp(2rem,4vw,3.2rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; color: var(--t1); margin-bottom: 1.5rem; }
.about-left h2 span { color: var(--g); }
.about-left p { font-size: 1rem; color: var(--t2); line-height: 1.8; margin-bottom: 1rem; font-weight: 400; }
.about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--r2); overflow: hidden; }
.stat-box { background: var(--bg2); padding: 2rem 1.5rem; }
.stat-box:hover { background: var(--bg3); }
.stat-n { font-family: var(--display); font-size: 2.8rem; font-weight: 700; color: var(--g); letter-spacing: -0.04em; line-height: 1; display: block; margin-bottom: 0.4rem; }
.stat-l { font-size: 0.8rem; color: var(--t3); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500; }

/* SECTION WRAPPER */
.sec { padding: clamp(4rem,8vw,7rem) clamp(1.2rem,6vw,4rem); max-width: 1400px; margin: 0 auto; }
.sec-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem; }
.sec-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--g); margin-bottom: 0.5rem; }
.sec-title { font-family: var(--display); font-size: clamp(1.8rem,3.5vw,2.8rem); font-weight: 700; letter-spacing: -0.03em; color: var(--t1); line-height: 1.1; }
.sec-count { font-family: var(--display); font-size: 4rem; font-weight: 700; color: var(--line); letter-spacing: -0.04em; line-height: 1; }

/* SERVICES */
.services { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--r2); overflow: hidden; }
.svc { background: var(--bg2); padding: 2.5rem 2rem; position: relative; overflow: hidden; transition: background .25s; cursor: default; }
.svc::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--g); transform: scaleX(0); transform-origin: left; transition: transform .35s cubic-bezier(.4,0,.2,1); }
.svc:hover { background: var(--bg3); }
.svc:hover::after { transform: scaleX(1); }
.svc-num { font-family: var(--display); font-size: 0.7rem; font-weight: 700; color: var(--t3); letter-spacing: 0.1em; margin-bottom: 1.5rem; }
.svc-icon { font-size: 1.8rem; margin-bottom: 1rem; display: block; }
.svc h3 { font-family: var(--display); font-size: 1.05rem; font-weight: 600; color: var(--t1); margin-bottom: 0.75rem; line-height: 1.3; }
.svc p { font-size: 0.875rem; color: var(--t2); line-height: 1.65; }
.svc-price { display: inline-flex; align-items: center; gap: 4px; margin-top: 1.5rem; font-size: 0.78rem; font-weight: 700; color: var(--g); background: rgba(20,232,123,0.1); padding: 4px 12px; border-radius: 100px; border: 1px solid rgba(20,232,123,0.2); }

/* PROJECTS */
.projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr)); gap: 1.5rem; }
.proj {
  background: var(--bg2); border: 1px solid var(--line); border-radius: var(--r2);
  padding: 2rem; position: relative; overflow: hidden;
  transition: transform .25s, border-color .25s;
  display: flex; flex-direction: column;
}
.proj:hover { transform: translateY(-4px); border-color: rgba(20,232,123,0.25); }
.proj-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
.proj-year { font-size: 0.72rem; font-weight: 700; color: var(--t3); letter-spacing: 0.1em; text-transform: uppercase; background: var(--bg3); padding: 4px 10px; border-radius: 100px; border: 1px solid var(--line); }
.proj-arrow { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; color: var(--t3); font-size: 0.9rem; transition: all .2s; }
.proj:hover .proj-arrow { background: var(--g); border-color: var(--g); color: #050505; }
.proj h3 { font-family: var(--display); font-size: 1.1rem; font-weight: 700; color: var(--t1); margin-bottom: 0.6rem; letter-spacing: -0.015em; line-height: 1.3; }
.proj p { font-size: 0.875rem; color: var(--t2); line-height: 1.65; flex: 1; }
.proj-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 1.5rem; }
.ptag { font-size: 0.72rem; font-weight: 600; padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,0.04); border: 1px solid var(--line); color: var(--t3); letter-spacing: 0.04em; }

/* SKILLS */
.skills-bg { background: var(--bg2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px,1fr)); gap: 3rem; }
.sk-group h4 { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--t3); margin-bottom: 1.2rem; }
.sk-list { display: flex; flex-direction: column; gap: 10px; }
.sk { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: var(--t2); font-weight: 400; }
.sk::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--g); flex-shrink: 0; }

/* EXPERIENCE */
.exp-list { display: flex; flex-direction: column; }
.exp {
  display: grid; grid-template-columns: 180px 1fr;
  gap: 2.5rem; padding: 2.5rem 0;
  border-top: 1px solid var(--line);
  transition: background .2s;
}
.exp:last-child { border-bottom: 1px solid var(--line); }
.exp-meta { padding-top: 3px; }
.exp-date { font-size: 0.8rem; color: var(--t3); font-weight: 500; margin-bottom: 6px; }
.exp-co { font-size: 0.875rem; color: var(--g); font-weight: 600; }
.exp-right h3 { font-family: var(--display); font-size: 1.15rem; font-weight: 700; color: var(--t1); margin-bottom: 0.6rem; letter-spacing: -0.015em; }
.exp-right p { font-size: 0.875rem; color: var(--t2); line-height: 1.75; }
.badge-now { display: inline-block; font-size: 0.65rem; font-weight: 700; background: var(--g); color: #050505; padding: 2px 8px; border-radius: 100px; margin-left: 10px; vertical-align: middle; letter-spacing: 0.06em; text-transform: uppercase; }

/* CONTACT */
.contact-wrap { background: var(--bg2); border-top: 1px solid var(--line); }
.contact-inner { max-width: 1400px; margin: 0 auto; padding: clamp(4rem,8vw,7rem) clamp(1.2rem,6vw,4rem); display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
.contact-left h2 { font-family: var(--display); font-size: clamp(2rem,4vw,3.2rem); font-weight: 700; letter-spacing: -0.03em; color: var(--t1); line-height: 1.1; margin-bottom: 1rem; }
.contact-left h2 span { color: var(--g); }
.contact-left > p { font-size: 1rem; color: var(--t2); line-height: 1.8; margin-bottom: 2.5rem; }
.cta-links { display: flex; flex-direction: column; gap: 10px; }
.clink {
  display: flex; align-items: center; gap: 14px;
  padding: 1.1rem 1.4rem; border-radius: var(--r2);
  border: 1px solid var(--line); text-decoration: none;
  background: var(--bg3); transition: transform .2s, border-color .2s;
}
.clink:hover { transform: translateX(6px); border-color: rgba(20,232,123,0.3); }
.clink-wa { border-color: rgba(37,211,102,0.25); background: rgba(37,211,102,0.06); }
.clink-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.clink-wa .clink-icon { background: #25d366; }
.clink-em .clink-icon { background: rgba(255,255,255,0.08); }
.clink-gh .clink-icon { background: rgba(255,255,255,0.08); }
.clink-icon svg { width: 18px; height: 18px; fill: white; }
.clink-text { display: flex; flex-direction: column; }
.clink-lbl { font-size: 0.7rem; color: var(--t3); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
.clink-val { font-size: 0.9rem; color: var(--t1); font-weight: 500; }
.clink-arr { margin-left: auto; color: var(--t3); font-size: 1rem; transition: transform .2s; }
.clink:hover .clink-arr { transform: translateX(3px); color: var(--g); }

/* FORM */
.form-card { background: var(--bg3); border: 1px solid var(--line); border-radius: var(--r2); padding: 2.5rem; }
.form-card h3 { font-family: var(--display); font-size: 1.2rem; font-weight: 700; color: var(--t1); margin-bottom: 1.75rem; letter-spacing: -0.02em; }
.fg { margin-bottom: 1.1rem; }
.fg label { display: block; font-size: 0.72rem; font-weight: 700; color: var(--t3); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
.fg input, .fg textarea, .fg select {
  width: 100%; background: rgba(255,255,255,0.04);
  border: 1px solid var(--line); border-radius: var(--r);
  padding: 0.8rem 1rem; font-size: 0.9rem; color: var(--t1);
  font-family: var(--body); outline: none;
  transition: border-color .2s, background .2s;
  -webkit-appearance: none;
}
.fg input::placeholder, .fg textarea::placeholder { color: var(--t3); }
.fg input:focus, .fg textarea:focus, .fg select:focus { border-color: var(--g); background: rgba(20,232,123,0.04); }
.fg textarea { resize: vertical; min-height: 110px; }
.fg select option { background: #111; }
.fsub {
  width: 100%; background: var(--g); color: #050505;
  border: none; border-radius: var(--r); padding: 1rem;
  font-size: 0.9rem; font-weight: 700; cursor: pointer;
  font-family: var(--body); margin-top: 0.5rem;
  transition: opacity .2s, transform .15s;
  letter-spacing: 0.02em;
}
.fsub:hover { opacity: 0.88; transform: translateY(-1px); }
.fsub:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.form-ok { text-align: center; padding: 2.5rem 1rem; }
.form-ok .ok-icon { width: 52px; height: 52px; border-radius: 50%; background: rgba(20,232,123,0.15); border: 1px solid rgba(20,232,123,0.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
.form-ok h4 { font-family: var(--display); font-size: 1.1rem; font-weight: 700; color: var(--t1); margin-bottom: 0.4rem; }
.form-ok p { font-size: 0.875rem; color: var(--t2); }
.form-ok button { margin-top: 1.2rem; background: none; border: 1px solid var(--line); color: var(--t3); padding: 0.5rem 1.2rem; border-radius: 100px; cursor: pointer; font-family: var(--body); font-size: 0.8rem; transition: border-color .2s; }
.form-ok button:hover { border-color: var(--t2); }

/* FOOTER */
.footer { border-top: 1px solid var(--line); padding: 2rem clamp(1.2rem,6vw,4rem); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; max-width: 100%; }
.footer p { font-size: 0.8rem; color: var(--t3); }
.footer-links { display: flex; gap: 2rem; }
.footer-links a { font-size: 0.8rem; color: var(--t3); text-decoration: none; transition: color .2s; }
.footer-links a:hover { color: var(--g); }

/* FLOAT WA */
.wa-float {
  position: fixed; bottom: 1.75rem; right: 1.75rem; z-index: 990;
  width: 54px; height: 54px; background: #25d366; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 24px rgba(37,211,102,0.35);
  text-decoration: none; transition: transform .2s, box-shadow .2s;
  animation: wabounce .6s ease 1.2s both;
}
.wa-float:hover { transform: scale(1.1); box-shadow: 0 6px 32px rgba(37,211,102,0.5); }
@keyframes wabounce { from{opacity:0;transform:scale(0.4)} to{opacity:1;transform:scale(1)} }
.wa-float svg { width: 27px; height: 27px; fill: white; }

/* RESPONSIVE */
@media(max-width:1024px) {
  .about { grid-template-columns: 1fr; gap: 3rem; }
  .contact-inner { grid-template-columns: 1fr; gap: 3rem; }
}
@media(max-width:768px) {
  .nav-links { display: none; }
  .burger { display: flex; }
  .hero h1 { letter-spacing: -0.03em; }
  .hero-bottom { flex-direction: column; align-items: flex-start; }
  .about-stats { grid-template-columns: 1fr 1fr; }
  .exp { grid-template-columns: 1fr; gap: 0.5rem; }
  .sec-count { display: none; }
}
@media(max-width:480px) {
  .about-stats { grid-template-columns: 1fr; }
  .hero-btns { flex-direction: column; width: 100%; }
  .btn-g, .btn-ghost { justify-content: center; }
}
`;

/* ── SVG ICONS ──────────────────────────────────────────────────────────── */
const WaSvg = () => (
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);
const GhSvg = () => (
  <svg viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
);
const MailSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

/* ── CONTACT FORM ───────────────────────────────────────────────────────── */
function Form() {
  const [d, setD] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = e => setD(p => ({ ...p, [e.target.name]: e.target.value }));
  const submit = () => {
    setBusy(true);
    const msg = `Hi Evrard! I'm ${d.name} (${d.email}).\n\nService: ${d.service || "—"}\n\nMessage: ${d.message}`;
    setTimeout(() => { setBusy(false); setSent(true); window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank"); }, 700);
  };
  if (sent) return (
    <div className="form-card">
      <div className="form-ok">
        <div className="ok-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#14e87b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
        <h4>WhatsApp is opening!</h4>
        <p>Your message is pre-filled and ready to send.</p>
        <button onClick={() => setSent(false)}>Send another</button>
      </div>
    </div>
  );
  return (
    <div className="form-card">
      <h3>Quick message</h3>
      <div className="fg"><label>Name</label><input name="name" value={d.name} onChange={set} placeholder="Your full name" /></div>
      <div className="fg"><label>Email</label><input name="email" type="email" value={d.email} onChange={set} placeholder="your@email.com" /></div>
      <div className="fg">
        <label>Service</label>
        <select name="service" value={d.service} onChange={set}>
          <option value="">Select a service...</option>
          <option>Website design & development</option>
          <option>Google Maps & local SEO</option>
          <option>Social media setup</option>
          <option>Monthly maintenance</option>
          <option>Other / not sure yet</option>
        </select>
      </div>
      <div className="fg"><label>Message</label><textarea name="message" value={d.message} onChange={set} placeholder="Tell me about your business and what you need..." /></div>
      <button className="fsub" onClick={submit} disabled={busy || !d.name || !d.message}>
        {busy ? "Opening WhatsApp..." : "Send via WhatsApp →"}
      </button>
    </div>
  );
}

/* ── APP ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const ticker = ["React", "Django", "Python", "Node.js", "FastAPI", "Figma", "MySQL", "MongoDB", "AdobeXD", "Git", "REST APIs", "Agile"];

  return (
    <>
      <style>{G}</style>

      {/* FLOATING WA */}
      <a href={waLink()} target="_blank" rel="noreferrer" className="wa-float" aria-label="WhatsApp">
        <WaSvg />
      </a>

      {/* MOBILE MENU */}
      <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
        {[["#services","Services"],["#projects","Projects"],["#skills","Skills"],["#experience","Experience"],["#contact","Let's talk"]].map(([h,l]) => (
          <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
      </div>

      {/* NAV */}
      <nav style={scrolled ? { borderBottomColor: "rgba(255,255,255,0.1)" } : {}}>
        <a href="#top" className="nav-logo">Evrard<em>.</em></a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact" className="nav-pill">Let's talk</a></li>
        </ul>
        <div className="burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span style={menuOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}} />
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            Available for projects · Yaoundé, Cameroon
          </div>
          <h1>
            Software<br />
            <span className="outline">Engineer</span> &<br />
            <span className="green">Web Builder.</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-desc">
              I'm Evrard Wemayi — full-stack engineer at ZezeHealth and freelance web developer. I help local businesses in Cameroon build a powerful digital presence.
            </p>
            <div className="hero-btns">
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn-g">
                <WaSvg style={{ width: 16, height: 16, fill: "#050505" }} />
                WhatsApp me
              </a>
              <a href="#projects" className="btn-ghost">View work ↓</a>
            </div>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker">
          {[...ticker, ...ticker].map((t, i) => (
            <span className="ticker-item" key={i}><em>✦</em>{t}</span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div className="about">
        <div className="about-left">
          <p className="sec-label">About me</p>
          <h2>Turning ideas into<br /><span>digital reality.</span></h2>
          <p>I'm a bilingual (EN/FR) software engineer based in Yaoundé with hands-on experience building full-stack applications. Currently working full-time at ZezeHealth while offering web & digital services to local businesses.</p>
          <p>I've built platforms for CCA Bank, designed and deployed ZezeHealth's website, and delivered full software projects from architecture to documentation.</p>
        </div>
        <div className="about-stats">
          {[["3+","Projects delivered"],["2+","Years experience"],["EN/FR","Bilingual"],["5+","Tech stacks mastered"]].map(([n,l]) => (
            <div className="stat-box" key={l}><span className="stat-n">{n}</span><span className="stat-l">{l}</span></div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div id="services" className="sec">
        <div className="sec-header">
          <div><p className="sec-label">What I offer</p><h2 className="sec-title">Services</h2></div>
          <span className="sec-count">04</span>
        </div>
        <div className="services">
          {[
            { num:"01", icon:"🌐", title:"Website design & development", desc:"Modern, fast, mobile-first websites built with React or Django. From landing pages to full web apps tailored to your business.", price:"From 50,000 XAF" },
            { num:"02", icon:"📍", title:"Google Maps & local SEO", desc:"Get found on Google by people searching locally. Business Profile setup, maps listing, and on-page SEO optimisation.", price:"From 25,000 XAF" },
            { num:"03", icon:"📱", title:"Social media setup", desc:"Facebook, Instagram, and WhatsApp Business professionally configured and branded — ready to attract and engage customers.", price:"From 20,000 XAF" },
            { num:"04", icon:"🔧", title:"Monthly maintenance", desc:"Keep your site fast, secure and up to date. Monthly retainer with priority support and regular content updates.", price:"From 15,000 XAF/mo" }
          ].map(s => (
            <div className="svc" key={s.num}>
              <div className="svc-num">{s.num}</div>
              <span className="svc-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="svc-price">{s.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <div id="projects" className="sec" style={{ paddingTop: 0 }}>
        <div className="sec-header">
          <div><p className="sec-label">Portfolio</p><h2 className="sec-title">Selected projects</h2></div>
          <span className="sec-count">03</span>
        </div>
        <div className="projects">
          {[
            { year:"2025", title:"CCA Bank — Training platform", desc:"Full-stack employee onboarding and training platform used internally by CCA Bank. React frontend, Django backend with full authentication and content management.", tags:["React","Django","Python","MySQL","REST API"] },
            { year:"2024", title:"ZezeHealth — Company website", desc:"Designed and deployed the official website for a Yaoundé-based health tech startup. Focused on performance, accessibility, and clean branding.", tags:["React","Node.js","Figma","CSS"] },
            { year:"2023", title:"Salar Sarl — Business software", desc:"End-to-end software project including system architecture, development, testing, and full documentation. Delivered on time for a Higher Technician Diploma.", tags:["Python","FastAPI","MongoDB","Postman"] }
          ].map(p => (
            <div className="proj" key={p.title}>
              <div className="proj-top">
                <span className="proj-year">{p.year}</span>
                <span className="proj-arrow">↗</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="proj-tags">{p.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <div id="skills" className="skills-bg">
        <div className="sec">
          <div className="sec-header">
            <div><p className="sec-label">Technical skills</p><h2 className="sec-title">What I build with</h2></div>
          </div>
          <div className="skills-grid">
            {[
              { label:"Languages", items:["Python","JavaScript","HTML & CSS"] },
              { label:"Frameworks", items:["React","Django","FastAPI","Node.js"] },
              { label:"Databases", items:["MySQL","MongoDB","Oracle"] },
              { label:"Design & tools", items:["Figma","AdobeXD","Git & GitHub","Postman"] },
              { label:"Methods", items:["Agile & Scrum","UML design","Unit testing","REST APIs"] },
              { label:"Languages spoken", items:["English — fluent","French — fluent"] }
            ].map(g => (
              <div className="sk-group" key={g.label}>
                <h4>{g.label}</h4>
                <div className="sk-list">{g.items.map(i => <span className="sk" key={i}>{i}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EXPERIENCE */}
      <div id="experience" className="sec">
        <div className="sec-header">
          <div><p className="sec-label">Work history</p><h2 className="sec-title">Experience</h2></div>
        </div>
        <div className="exp-list">
          {[
            { date:"Dec 2025 – Present", co:"ZezeHealth · Yaoundé", role:"Software Engineer", current:true, desc:"Building digital tools for healthcare operations. Integrating APIs, improving user experience, and delivering user-focused features in collaboration with cross-functional teams." },
            { date:"Jul – Sep 2024", co:"ZezeHealth · Yaoundé", role:"Software Engineer Intern", current:false, desc:"Contributed to development of digital tools for healthcare as part of an engineering diploma project. Collaborated with front-end developers to integrate APIs and improve UX." },
            { date:"Jun – Sep 2023", co:"Salar Sarl · Yaoundé", role:"Software Engineer Intern", current:false, desc:"Led a full software project covering system architecture, development, testing, and documentation for a Higher Technician Diploma. Delivered stable, maintainable software on time." }
          ].map(e => (
            <div className="exp" key={e.date}>
              <div className="exp-meta">
                <div className="exp-date">{e.date}</div>
                <div className="exp-co">{e.co}</div>
              </div>
              <div className="exp-right">
                <h3>{e.role}{e.current && <span className="badge-now">Now</span>}</h3>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" className="contact-wrap">
        <div className="contact-inner">
          <div className="contact-left">
            <p className="sec-label">Get in touch</p>
            <h2>Let's build<br />something<br /><span>great together.</span></h2>
            <p>Based in Yaoundé, serving businesses across Cameroon. Whether you need a website, Google presence, or full digital setup — reach out anytime.</p>
            <div className="cta-links">
              <a href={waLink()} target="_blank" rel="noreferrer" className="clink clink-wa">
                <span className="clink-icon"><WaSvg /></span>
                <span className="clink-text"><span className="clink-lbl">WhatsApp</span><span className="clink-val">+237 656 620 793</span></span>
                <span className="clink-arr">→</span>
              </a>
              <a href={mailLink} className="clink clink-em">
                <span className="clink-icon"><MailSvg /></span>
                <span className="clink-text"><span className="clink-lbl">Email</span><span className="clink-val">ewemayi@gmail.com</span></span>
                <span className="clink-arr">→</span>
              </a>
              <a href="https://github.com/WTKE0000" target="_blank" rel="noreferrer" className="clink clink-gh">
                <span className="clink-icon"><GhSvg /></span>
                <span className="clink-text"><span className="clink-lbl">GitHub</span><span className="clink-val">WTKE0000</span></span>
                <span className="clink-arr">→</span>
              </a>
            </div>
          </div>
          <Form />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Evrard Wemayi. All rights reserved.</p>
        <div className="footer-links">
          <a href={waLink()} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={mailLink}>Email</a>
          <a href="https://github.com/WTKE0000" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </>
  );
}
