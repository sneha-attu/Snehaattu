import { useState, useEffect, useRef } from "react";
 
/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const METRICS = [
  { tag: "GestiCalc — Gesture Accuracy",  val: "92%+",   desc: "184/200 gestures correct · CPU-only webcam", icon: "✋" },
  { tag: "Logistics Platform Latency",    val: "85%",    desc: "DB latency reduced via Zod + Redis caching",  icon: "📉" },
  { tag: "SLA Compliance",                val: "99.9%",  desc: "platform uptime · resolved 25+ incidents",    icon: "🛡" },
  { tag: "Conversion Tracking",           val: "+20%",   desc: "accuracy via PostHog + Google Ads funnels",   icon: "📊" },
];
 
const SKILLS = [
  { icon: "💻", title: "Languages & Core", items: [["Python","90"],["Java / TypeScript","78"],["SQL (PostgreSQL)","80"],["C++","72"]] },
  { icon: "🏗", title: "Backend & Infra", items: [["Kafka (Event Streaming)","80"],["AWS (EC2, S3, Lambda)","68"],["Redis (Cache-Aside)","76"],["Docker / Terraform / CI-CD","72"]] },
  { icon: "📊", title: "Analytics & PM Tools", items: [["PostHog","85"],["Google Ads","78"],["JIRA (Advanced Roadmaps)","82"],["Tableau / Grafana / Prometheus","72"]] },
  { icon: "🤖", title: "AI & Engineering", items: [["CrewAI / Agentic AI","80"],["ML Pipelines","70"],["React / Next.js / Node.js","76"],["Distributed Tracing / Zod","70"]] },
];
 
const EXPERIENCE = [
  {
    role: "Founder's Office Growth Intern",
    company: "Ecombuddha.ai — Bengaluru, India",
    period: "Jan 2026 – Present",
    points: [
      "Spearhead delivery coordination of AI-driven security modules, ensuring 100% alignment with the Security Transformation roadmap and enterprise architectural controls.",
      "Orchestrate product growth funnels using PostHog and Google Ads, achieving a 20% increase in conversion tracking accuracy through modular technical specification refinement.",
      "Facilitate weekly Sprint Reviews and stakeholder status updates, actively mitigating Critical Path risks and resolving scheduling conflicts for cross-functional engineering teams.",
    ],
    tags: ["PostHog","Google Ads","Agile/Scrum","AI Products","Stakeholder Management"],
  },
  {
    role: "Software Development Intern",
    company: "Theta Dynamics — Remote / India",
    period: "Jul 2025 – Dec 2025",
    points: [
      "Optimized delivery management workflows for enterprise platforms, resulting in a 15% improvement in SDLC velocity and strict adherence to internal quality governance standards.",
      "Managed Requirement Traceability Matrices (RTM) in JIRA; supported Senior PMs in executing complex SIT and UAT implementation phases for mission-critical data solutions.",
      "Troubleshot and resolved 25+ high-priority technical incidents, maintaining 99.9% SLA compliance and documenting root-cause analyses (RCA) for future risk mitigation.",
    ],
    tags: ["JIRA","SDLC","SLA Management","RTM","UAT / SIT"],
  },
];
 
const PROJECTS = [
  {
    flagship: true,
    typeColor: "#34d399",
    type: "⭐ Flagship Project · AI · Accessibility · Computer Vision",
    title: "GestiCalc — Gesture-Driven Calculator for Inclusive Classrooms",
    desc: "Real-time, touch-free arithmetic using hand gestures from a standard webcam. Built for inclusive, low-cost classroom deployment — no special hardware needed.",
    metrics: [["92%+","gesture accuracy"],["92/100","test cases pass"],["0","crashes in testing"]],
    problem: "Traditional calculators are hard to use for students with motor disabilities, and most gesture demos need expensive hardware or fail in real classroom conditions. GestiCalc turns any laptop webcam into an accessible, touch-free calculator with clear feedback and analytics for teachers — at zero hardware cost.",
    arch: ["Webcam Input","MediaPipe Hands","Gesture Manager","Expression Evaluator","Overlay UI & Analytics"],
    tags: ["Python","MediaPipe Hands","OpenCV","Gesture Recognition","Computer Vision","CPU-only"],
    github: "https://github.com/sneha-attu",
  },
  {
    typeColor: "#34d399", type: "🔄 Ongoing · Backend Systems",
    title: "Real-Time Shipment Tracker",
    desc: "Intelligent shipment tracking system with predictive delivery insights, real-time status updates, and event-driven backend architecture.",
    arch: ["Shipment APIs","Event Bus","Prediction Engine","Client"],
    tags: ["Python","Kafka","WebSocket","ML"],
  },
  {
    typeColor: "#a78bfa", type: "🤖 AI / Multi-Agent",
    title: "Agentic AI System — CrewAI",
    desc: "Multi-agent AI orchestration system where autonomous agents collaborate to complete complex tasks through dynamic workflow coordination.",
    arch: ["Task Input","CrewAI Orchestrator","Agent Network","Output"],
    tags: ["Python","CrewAI","LLM APIs","REST"],
  },
  {
    typeColor: "#38bdf8", type: "🌐 IoT · Full-Stack",
    title: "IoT Smart Dashboard",
    desc: "Real-time IoT monitoring system connecting humidity, light, and ultrasonic sensors (Arduino/ESP32) to a live Flask analytics dashboard.",
    tags: ["Python","Flask","Arduino","ESP32","MQTT"],
  },
  {
    typeColor: "#a78bfa", type: "🎤 Real-Time · Networking",
    title: "Voice Chat System — RTP",
    desc: "Low-latency real-time voice communication system built in Python using PyAudio and RTP protocols, demonstrating deep networking fundamentals.",
    tags: ["Python","PyAudio","RTP","Socket Programming"],
  },
  {
    typeColor: "#34d399", type: "👁 Computer Vision · ML",
    title: "Emotion Detection System",
    desc: "Real-time emotion classification system using computer vision and a machine learning pipeline to detect and categorize human facial expressions.",
    tags: ["Python","OpenCV","TensorFlow","CNN"],
  },
];
 
const SD_CARDS = [
  {
    title: "GestiCalc — Gesture Calculator Design",
    sub: "Computer Vision · Accessibility · CPU-only · 92%+ accuracy",
    problem: "Enable real-time touch-free arithmetic for motor-impaired students on any standard laptop webcam, without expensive hardware, with stable gesture recognition in unpredictable classroom lighting.",
    decisions: [
      { pro: true,  text: "MediaPipe Hands for 21-landmark detection — CPU-only, no GPU needed" },
      { pro: true,  text: "Temporal stability checks prevent accidental gesture triggers" },
      { pro: true,  text: "Rule-based Gesture Manager ensures deterministic, explainable logic" },
      { pro: true,  text: "Safe expression evaluator prevents code injection via input sanitisation" },
      { pro: false, text: "Trade-off: rule-based logic over ML gestures — less flexible but more reliable" },
      { pro: false, text: "Trade-off: accuracy drops under extreme lighting — mitigated via preprocessing" },
    ],
    scale: "Modular pipeline (hands.py → gestures.py → evaluator.py → overlay.py) allows swapping any layer independently. Analytics module can be extended to a teacher dashboard with minimal changes.",
  },
  {
    title: "Shipment Tracker — Real-Time Design",
    sub: "Low-latency tracking · predictive delivery engine",
    components: [
      ["API Gateway","Rate limiting + auth"],
      ["Event Bus","Async status updates"],
      ["Prediction Service","ML delivery estimates"],
      ["WebSocket Layer","Real-time client push"],
    ],
    decisions: [
      { pro: true,  text: "WebSocket over polling for 10x bandwidth efficiency" },
      { pro: true,  text: "Event-driven architecture decouples data producers from consumers" },
      { pro: false, text: "Trade-off: WebSocket connection management complexity" },
    ],
  },
];
 
const AI_CARDS = [
  { icon:"🤖", title:"Multi-Agent Task Orchestration", desc:"CrewAI-based system where specialized agents (Researcher, Analyst, Writer) collaborate autonomously to complete complex multi-step tasks without human intervention.", status:"building" },
  { icon:"👁",  title:"Emotion-Aware Interfaces",      desc:"Exploring real-time emotion detection via webcam to adapt UI behavior and content delivery based on user emotional state using CNN-based classification.", status:"done" },
  { icon:"🧩", title:"Rubik's Cube Solver",            desc:"Interactive React web app implementing layer-by-layer and advanced cube-solving algorithms with 3D visualization and move-by-move explanation engine.", status:"done" },
];
 
const AWARDS = [
  {
    icon:"🚀",
    title:"Bharatiya Antariksh Hackathon 2025",
    org:"ISRO · Powered by Hack2Skill",
    year:"2025",
    desc:"Successfully submitted an innovative idea for India's premier space hackathon by ISRO. Recognised for innovation, curiosity, and commitment in solving real-world challenges of space and technology.",
    color:"#f97316",
    cert:"2025H2S06BAH25-P14190",
  },
  {
    icon:"🏅",
    title:"Infosys Global Hackathon 2025 — Top 10",
    org:"Infosys + Cloud Native Computing Foundation (CNCF)",
    year:"2025",
    desc:"Ranked in the Top 10 at the Infosys Global Hackathon 2025 powered by Infosys and CNCF. Built an innovative solution for global good, competing against thousands of participants worldwide.",
    color:"#3b82f6",
    cert:"Verified at shortner.infy.com/verify",
  },
  {
    icon:"🥉",
    title:"ONEST Hackathon 2025 — 3rd Place",
    org:"Deshpande Startups · Hubballi",
    year:"2025",
    desc:"Secured 3rd Place at the ONEST Hackathon 2025 at Deshpande Startups, Hubballi — an open network for education and skilling, building impactful solutions for real-world challenges.",
    color:"#f97316",
    cert:"Certificate of Participation",
  },
  {
    icon:"🎓",
    title:"PMx 2026 — Product Management Expedition",
    org:"IIT Guwahati · Udgam 2026 · Unstop",
    year:"2026",
    desc:"Participated in PMx 2026 — The Product Management Expedition organised by IIT Guwahati as part of Udgam 2026. Represented Gogte Institute of Technology, Belgaum.",
    color:"#a78bfa",
    cert:"Verified via Unstop",
  },
];
 
const ACH_METRICS = [
  { icon:"✋", val:"92%+",   title:"GestiCalc Accuracy",       desc:"184/200 gestures · CPU-only webcam" },
  { icon:"📉", val:"85%",    title:"DB Latency Reduced",        desc:"Zod governance + Redis caching" },
  { icon:"🎯", val:"+20%",   title:"Conversion Accuracy",       desc:"PostHog + Google Ads funnels" },
  { icon:"🛡", val:"99.9%",  title:"SLA Maintained",            desc:"25+ critical issues resolved" },
  { icon:"📈", val:"+15%",   title:"SDLC Velocity",             desc:"Sprint & JIRA optimisation" },
  { icon:"🥉", val:"3rd",    title:"ONEST Hackathon 2025",      desc:"Deshpande Startups · Hubballi" },
  { icon:"🏅", val:"Top 10", title:"Infosys Global Hackathon",  desc:"Infosys + CNCF · 2025" },
  { icon:"🚀", val:"4+",     title:"Hackathons Participated",   desc:"ISRO · Infosys · ONEST · IIT Guwahati" },
];
 
const CERTS = [
  { org:"ISRO · Hack2Skill",        name:"Bharatiya Antariksh Hackathon 2025",                      status:"done", year:"2025" },
  { org:"Infosys + CNCF",           name:"Infosys Global Hackathon 2025 — Top 10 Finish",           status:"done", year:"2025" },
  { org:"Deshpande Startups",       name:"ONEST Hackathon 2025 — 3rd Place 🥉",                     status:"done", year:"2025" },
  { org:"IIT Guwahati · Unstop",    name:"PMx 2026 — Product Management Expedition (Udgam 2026)",   status:"done", year:"2026" },
  { org:"Cisco Networking Academy", name:"NDG Linux Unhatched — Partner Program",                    status:"done", year:"2024" },
];
 
const LEADERSHIP = [
  {
    icon: "🎯",
    role: "Event Head",
    org: "Unified Students Community (USC)",
    color: "#38bdf8",
    desc: "Directed resource allocation and budget reporting for institutional events. Successfully managed 50+ team members, coordinated logistics end-to-end, and resolved critical project bottlenecks under pressure.",
    tags: ["Team Management","Resource Allocation","Budget Planning","50+ Members"],
  },
  {
    icon: "💻",
    role: "Media Head",
    org: "Computer Science Society — KLS GIT",
    color: "#a78bfa",
    desc: "Led the media and communications wing of the college CS Society. Managed digital presence, coordinated technical events, workshops, and hackathon promotions across the department.",
    tags: ["Media & Comms","Content Strategy","Technical Events","CS Community"],
  },
  {
    icon: "❤️",
    role: "Leader & Former Volunteer",
    org: "U&I NGO — Education for Underprivileged Children",
    color: "#34d399",
    desc: "Led a team of volunteers at U&I, an NGO focused on providing quality education to underprivileged children. Coordinated teaching sessions, managed volunteer scheduling, and drove community outreach initiatives.",
    tags: ["NGO Leadership","Community Outreach","Volunteer Management","Social Impact"],
  },
];
const CSS = `
:root{
  --bg:#020408; --bg2:#05080f; --surface2:#0d1220;
  --border:rgba(99,179,237,0.12); --b2:rgba(255,255,255,0.06);
  --cyan:#38bdf8; --cdim:rgba(56,189,248,0.15); --cglow:rgba(56,189,248,0.35);
  --violet:#a78bfa; --vdim:rgba(167,139,250,0.12);
  --emerald:#34d399; --amber:#fbbf24;
  --text:#e2e8f0; --muted:#64748b; --muted2:#94a3b8;
  --card:#080c17; --r:12px;
  --font:'Space Grotesk',sans-serif; --mono:'JetBrains Mono',monospace;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--font);line-height:1.7;overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:rgba(56,189,248,0.3);border-radius:2px}
 
#neural-canvas{position:fixed;inset:0;z-index:0;opacity:0.5;pointer-events:none}
 
/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;
  justify-content:space-between;padding:1rem 3rem;
  background:rgba(2,4,8,0.92);backdrop-filter:blur(24px);
  border-bottom:1px solid var(--b2);transition:padding .3s}
nav.slim{padding:.65rem 3rem}
.nav-brand{font-weight:700;font-size:1rem;color:var(--cyan);
  letter-spacing:-.01em;cursor:pointer;text-decoration:none;flex-shrink:0}
.nav-links{display:flex;gap:1.4rem;list-style:none}
.nav-links a{font-family:var(--mono);font-size:.68rem;color:var(--muted2);
  text-decoration:none;letter-spacing:.04em;text-transform:uppercase;transition:color .2s}
.nav-links a:hover{color:var(--cyan)}
.nav-contact{background:transparent;color:var(--cyan);font-family:var(--mono);
  font-weight:600;font-size:.78rem;padding:.45rem 1.1rem;border-radius:6px;
  border:1px solid rgba(56,189,248,0.4);cursor:pointer;flex-shrink:0;
  transition:background .2s,box-shadow .2s}
.nav-contact:hover{background:var(--cdim);box-shadow:0 0 20px var(--cglow)}
.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;
  cursor:pointer;padding:.4rem;z-index:300}
.hbar{display:block;width:24px;height:2px;background:var(--cyan);border-radius:2px;
  transition:transform .3s,opacity .3s}
.hbar-top.open{transform:translateY(7px) rotate(45deg)}
.hbar-mid.open{opacity:0}
.hbar-bot.open{transform:translateY(-7px) rotate(-45deg)}
.mob-drawer{position:fixed;top:0;right:-100%;width:min(300px,80vw);height:100vh;
  background:rgba(5,8,15,0.98);backdrop-filter:blur(24px);
  border-left:1px solid var(--b2);z-index:250;
  transition:right .35s cubic-bezier(.4,0,.2,1);padding:5rem 2rem 2rem}
.mob-drawer.open{right:0}
.mob-links{display:flex;flex-direction:column;gap:.2rem}
.mob-link{font-family:var(--mono);font-size:.85rem;color:var(--muted2);text-decoration:none;
  letter-spacing:.06em;text-transform:uppercase;padding:.75rem 1rem;border-radius:8px;
  transition:background .2s,color .2s;border:1px solid transparent}
.mob-link:hover{background:var(--cdim);color:var(--cyan);border-color:rgba(56,189,248,.2)}
.mob-overlay{position:fixed;inset:0;z-index:240;background:rgba(0,0,0,.5);backdrop-filter:blur(2px)}
@media(max-width:900px){
  .nav-links{display:none!important}
  .nav-contact{display:none!important}
  .hamburger{display:flex!important}
  nav{padding:.8rem 1.5rem}
  nav.slim{padding:.6rem 1.5rem}
  .hero-inner{grid-template-columns:1fr!important;gap:2rem}
  #hero{padding-top:5rem}
  .hero-photo-desktop{display:none!important}
  .hero-photo-mobile{display:block!important}
  .hero-right-col{display:none!important}
  .about-grid,.sd-grid,.proj-grid{grid-template-columns:1fr}
  .cc-grid{grid-template-columns:1fr!important}
  .contact-inner{padding:1.5rem!important}
}
@media(min-width:901px){
  .hero-photo-mobile{display:none!important}
  .hero-photo-desktop{display:block!important}
  .hamburger{display:none!important}
  .nav-contact{display:inline-block!important}
  .nav-links{display:flex!important}
}
@media(min-width:901px){.hamburger{display:none}}
 
/* LAYOUT */
section{position:relative;z-index:1;scroll-margin-top:72px}
.ctr{max-width:1120px;margin:0 auto;padding:0 2rem}
.lbl{font-family:var(--mono);font-size:.7rem;color:var(--cyan);
  letter-spacing:.12em;text-transform:uppercase;margin-bottom:.6rem}
.ttl{font-size:clamp(1.9rem,3.5vw,2.8rem);font-weight:700;
  letter-spacing:-.03em;line-height:1.1;margin-bottom:1rem}
.ttl .hl{color:var(--cyan)}
.sub{color:var(--muted2);font-size:1rem;max-width:560px;line-height:1.75}
.divider{height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin:.5rem 0}
 
/* FADE */
.fade{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}
.fade.in{opacity:1;transform:none}
 
/* PILLS */
.pill{font-family:var(--mono);font-size:.68rem;padding:.25rem .65rem;border-radius:4px;border:1px solid}
.pc{color:var(--cyan);background:var(--cdim);border-color:rgba(56,189,248,.2)}
.pv{color:var(--violet);background:var(--vdim);border-color:rgba(167,139,250,.2)}
.pe{color:var(--emerald);background:rgba(52,211,153,.1);border-color:rgba(52,211,153,.2)}
.pill-row{display:flex;flex-wrap:wrap;gap:.5rem}
 
/* BUTTONS */
.btn-p{background:var(--cyan);color:#000;font-weight:600;font-size:.875rem;
  padding:.75rem 1.6rem;border-radius:8px;border:none;cursor:pointer;
  font-family:var(--font);text-decoration:none;display:inline-block;
  transition:box-shadow .25s,transform .2s}
.btn-p:hover{box-shadow:0 0 28px var(--cglow);transform:translateY(-2px)}
.btn-s{background:transparent;color:var(--text);font-weight:500;font-size:.875rem;
  padding:.75rem 1.6rem;border-radius:8px;border:1px solid var(--b2);cursor:pointer;
  font-family:var(--font);text-decoration:none;display:inline-block;
  transition:border-color .2s,color .2s}
.btn-s:hover{border-color:var(--cyan);color:var(--cyan)}
 
/* HERO */
#hero{min-height:100vh;display:flex;align-items:center;padding-top:5rem;padding-bottom:3rem}
.hero-inner{display:grid;grid-template-columns:1.1fr .9fr;gap:3rem;align-items:start;width:100%}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--mono);
  font-size:.7rem;color:var(--emerald);border:1px solid rgba(52,211,153,.3);
  padding:.3rem .9rem;border-radius:99px;margin-bottom:1.4rem}
.bdot{width:6px;height:6px;background:var(--emerald);border-radius:50%;animation:blink 2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.hero-name{font-size:clamp(3.5rem,6.5vw,6rem);font-weight:700;letter-spacing:-.04em;line-height:1;margin-bottom:.8rem;white-space:nowrap}
.hero-name .hl{color:var(--cyan);display:inline}
.hero-role{font-family:var(--mono);font-size:.88rem;color:var(--violet);margin-bottom:1.4rem;letter-spacing:.02em}
.hero-desc{font-size:1.05rem;color:rgba(226,232,240,.7);max-width:470px;margin-bottom:2rem;line-height:1.8}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2rem}
.stack-lbl{font-family:var(--mono);font-size:.65rem;color:var(--muted);
  letter-spacing:.08em;text-transform:uppercase;margin-bottom:.5rem}
.metrics-col{display:flex;flex-direction:column;gap:1.2rem}
.mc{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  padding:1.2rem 1.5rem;transition:border-color .3s,box-shadow .3s}
.mc:hover{border-color:var(--border);box-shadow:0 0 30px rgba(56,189,248,.08)}
.mc-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem}
.mc-tag{font-family:var(--mono);font-size:.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
.mc-val{font-size:1.9rem;font-weight:700;color:var(--cyan);line-height:1;margin-bottom:.2rem}
.mc-desc{font-size:.8rem;color:var(--muted2)}
 
/* ABOUT */
#about{padding:7rem 0}
.about-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:4rem;align-items:start}
.ap{color:rgba(226,232,240,.72);margin-bottom:1.1rem;font-size:1rem}
.ap strong{color:var(--cyan);font-weight:500}
.int-box{margin-top:1.8rem;padding:1.4rem;background:var(--card);border:1px solid var(--b2);border-radius:var(--r)}
.int-lbl{font-family:var(--mono);font-size:.7rem;color:var(--violet);letter-spacing:.1em;text-transform:uppercase;margin-bottom:.8rem}
.int-tags{display:flex;flex-wrap:wrap;gap:.5rem}
.itag{font-size:.8rem;color:var(--muted2);background:var(--surface2);padding:.3rem .8rem;border-radius:6px;border:1px solid var(--b2)}
.icard{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);padding:1.4rem;margin-bottom:1.2rem}
.ict{font-family:var(--mono);font-size:.68rem;color:var(--cyan);letter-spacing:.1em;text-transform:uppercase;margin-bottom:1rem}
.icr{display:flex;align-items:flex-start;gap:.75rem;margin-bottom:.75rem}
.ico{font-size:.9rem;margin-top:.1rem;flex-shrink:0}
.icv{font-size:.88rem;color:var(--muted2)}
.icv strong{color:var(--text);font-weight:500}
 
/* SKILLS */
#skills{padding:6rem 0;background:linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)}
.sg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem}
.sg{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  padding:1.6rem;transition:border-color .3s,transform .3s}
.sg:hover{border-color:var(--border);transform:translateY(-3px)}
.sg-head{display:flex;align-items:center;gap:.75rem;margin-bottom:1.2rem}
.sg-icon{font-size:1.3rem}
.sg-title{font-weight:600;font-size:.95rem}
.sbars{display:flex;flex-direction:column;gap:.7rem}
.sbr{display:flex;flex-direction:column;gap:.25rem}
.sbm{display:flex;justify-content:space-between;align-items:center}
.sbn{font-family:var(--mono);font-size:.72rem;color:var(--muted2)}
.sbp{font-family:var(--mono);font-size:.65rem;color:var(--muted)}
.sbt{height:3px;background:rgba(255,255,255,.05);border-radius:99px;overflow:hidden}
.sbf{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--cyan),var(--violet));transition:width 1.5s ease;width:0}
 
/* EXPERIENCE */
#experience{padding:7rem 0}
.exp-tl{position:relative;margin-top:3rem}
.exp-tl::before{content:'';position:absolute;left:11px;top:0;bottom:0;width:1px;
  background:linear-gradient(180deg,var(--cyan),var(--violet),transparent)}
.exp-item{position:relative;padding-left:3rem;margin-bottom:3rem}
.exp-dot{position:absolute;left:0;top:6px;width:24px;height:24px;border-radius:50%;
  background:var(--bg);border:2px solid var(--cyan);display:flex;align-items:center;justify-content:center}
.exp-dot span{width:8px;height:8px;background:var(--cyan);border-radius:50%}
.exp-card{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  padding:1.6rem 2rem;transition:border-color .3s}
.exp-card:hover{border-color:rgba(56,189,248,.25)}
.exp-meta{display:flex;align-items:flex-start;justify-content:space-between;
  gap:1rem;flex-wrap:wrap;margin-bottom:.6rem}
.exp-role{font-weight:700;font-size:1.05rem;color:var(--text)}
.exp-period{font-family:var(--mono);font-size:.7rem;color:var(--muted);
  background:var(--surface2);padding:.25rem .7rem;border-radius:4px;
  border:1px solid var(--b2);white-space:nowrap}
.exp-co{color:var(--cyan);font-size:.88rem;margin-bottom:1rem}
.exp-pts{list-style:none;display:flex;flex-direction:column;gap:.5rem}
.exp-pts li{display:flex;align-items:flex-start;gap:.6rem;font-size:.9rem;color:rgba(226,232,240,.72)}
.exp-pts li::before{content:'▹';color:var(--cyan);flex-shrink:0;margin-top:.05rem}
.exp-tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem}
.etag{font-family:var(--mono);font-size:.65rem;color:var(--violet);
  background:var(--vdim);padding:.2rem .6rem;border-radius:4px}
 
/* PROJECTS */
#projects{padding:7rem 0;background:linear-gradient(180deg,var(--bg2) 0%,var(--bg) 100%)}
.proj-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.pcard{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  overflow:hidden;display:flex;flex-direction:column;
  transition:border-color .3s,box-shadow .3s,transform .3s}
.pcard:hover{border-color:rgba(56,189,248,.3);box-shadow:0 8px 40px rgba(56,189,248,.08);transform:translateY(-4px)}
.pcard.full{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr}
.pcb{background:linear-gradient(135deg,var(--surface2) 0%,rgba(56,189,248,.05) 100%);
  padding:2rem;border-bottom:1px solid var(--b2);position:relative;overflow:hidden}
.pcard.full .pcb{border-bottom:none;border-right:1px solid var(--b2);padding:2.5rem}
.pcb::before{content:'';position:absolute;top:-40%;right:-10%;width:250px;height:250px;
  background:radial-gradient(circle,rgba(56,189,248,.08),transparent 70%);border-radius:50%}
.ptype{font-family:var(--mono);font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.6rem}
.ptitle{font-size:1.25rem;font-weight:700;margin-bottom:.5rem;letter-spacing:-.02em}
.pcard.full .ptitle{font-size:1.7rem}
.pdesc{font-size:.875rem;color:var(--muted2);line-height:1.7;margin-bottom:1rem}
.pm-row{display:flex;gap:1.2rem;flex-wrap:wrap}
.pm-val{font-family:var(--mono);font-size:1.2rem;font-weight:700;color:var(--cyan);line-height:1}
.pm-lbl{font-size:.68rem;color:var(--muted);margin-top:.1rem}
.pbody{padding:1.6rem;flex:1;display:flex;flex-direction:column}
.pcard.full .pbody{padding:2.5rem}
.psl{font-family:var(--mono);font-size:.65rem;color:var(--cyan);
  letter-spacing:.1em;text-transform:uppercase;margin-bottom:.5rem}
.arch{display:flex;align-items:center;flex-wrap:wrap;gap:.3rem;margin-bottom:1rem}
.anode{background:var(--card);border:1px solid var(--b2);color:var(--text);
  padding:.25rem .6rem;border-radius:4px;font-family:var(--mono);font-size:.68rem;white-space:nowrap}
.aarr{color:var(--cyan);font-size:.8rem}
.ptags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}
.ptag{font-family:var(--mono);font-size:.65rem;color:var(--muted2);
  background:var(--surface2);padding:.2rem .55rem;border-radius:4px;border:1px solid var(--b2)}
.plinks{display:flex;gap:.75rem;margin-top:auto}
.plink{font-family:var(--mono);font-size:.72rem;color:var(--cyan);text-decoration:none;
  display:flex;align-items:center;gap:.3rem;border:1px solid rgba(56,189,248,.25);
  padding:.35rem .8rem;border-radius:5px;transition:background .2s}
.plink:hover{background:var(--cdim)}
.plink.demo{color:var(--emerald);border-color:rgba(52,211,153,.25)}
.plink.demo:hover{background:rgba(52,211,153,.1)}
 
/* SYSTEM DESIGN */
#system-design{padding:7rem 0}
.sd-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-top:3rem}
.sdcard{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);padding:2rem;transition:border-color .3s}
.sdcard:hover{border-color:rgba(56,189,248,.25)}
.sd-title{font-size:1.1rem;font-weight:700;margin-bottom:.4rem}
.sd-sub{font-size:.83rem;color:var(--muted2);margin-bottom:1.4rem}
.sd-sh{font-family:var(--mono);font-size:.65rem;color:var(--violet);
  letter-spacing:.1em;text-transform:uppercase;margin-bottom:.5rem}
.sd-p{font-size:.83rem;color:var(--muted2);line-height:1.65;margin-bottom:1.3rem}
.to-list{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1.3rem}
.toi{display:flex;align-items:flex-start;gap:.5rem;font-size:.83rem;color:var(--muted2)}
.pro{color:var(--emerald)}
.con{color:#f87171}
.comp-list{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.3rem}
.comp-i{display:flex;align-items:center;gap:.4rem}
.cnode{background:var(--surface2);border:1px solid var(--b2);font-family:var(--mono);
  font-size:.68rem;color:var(--text);padding:.25rem .6rem;border-radius:4px;white-space:nowrap}
.cdesc{font-size:.78rem;color:var(--muted2)}
 
/* AI EXPERIMENTS */
#ai-experiments{padding:7rem 0;background:linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)}
.ai-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.2rem;margin-top:3rem}
.aicard{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  padding:1.5rem;position:relative;overflow:hidden;transition:all .3s}
.aicard::before{content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 80% 20%,rgba(167,139,250,.06),transparent 60%);pointer-events:none}
.aicard:hover{border-color:rgba(167,139,250,.3);transform:translateY(-3px)}
.ai-icon{font-size:1.6rem;margin-bottom:.8rem}
.ai-title{font-weight:600;font-size:.95rem;margin-bottom:.4rem}
.ai-desc{font-size:.83rem;color:var(--muted2);line-height:1.65;margin-bottom:1rem}
.ai-status{font-family:var(--mono);font-size:.65rem;padding:.2rem .6rem;border-radius:4px;display:inline-block}
.ai-done{color:var(--emerald);background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.2)}
.ai-build{color:var(--amber);background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.2)}
 
/* ACHIEVEMENTS */
#achievements{padding:7rem 0}
.awards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:1.3rem;margin-top:3rem}
.acard{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  padding:1.5rem;position:relative;overflow:hidden;
  transition:border-color .3s,transform .3s,box-shadow .3s}
.acard:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.3)}
.acard-bar{position:absolute;top:0;left:0;right:0;height:2px;border-radius:var(--r) var(--r) 0 0}
.aw-head{display:flex;align-items:flex-start;justify-content:space-between;gap:.8rem;margin-bottom:.7rem}
.aw-icon{display:flex;align-items:center;justify-content:center;width:42px;height:42px;
  border-radius:10px;background:rgba(255,255,255,.04);border:1px solid var(--b2);font-size:1.3rem;flex-shrink:0}
.aw-year{font-family:var(--mono);font-size:.62rem;color:var(--muted);
  background:var(--surface2);border:1px solid var(--b2);padding:.2rem .6rem;border-radius:4px;white-space:nowrap}
.aw-title{font-size:.95rem;font-weight:700;margin-bottom:.25rem;line-height:1.35}
.aw-org{font-family:var(--mono);font-size:.65rem;margin-bottom:.7rem}
.aw-desc{font-size:.8rem;color:var(--muted2);line-height:1.65}
.sep{display:flex;align-items:center;gap:1rem;margin:2.5rem 0}
.sep-line{flex:1;height:1px}
.sep-lbl{font-family:var(--mono);font-size:.65rem;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
.ach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem}
.achcard{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  padding:1.5rem;display:flex;align-items:flex-start;gap:1rem;transition:border-color .3s}
.achcard:hover{border-color:rgba(56,189,248,.2)}
.ach-ico{font-size:1.5rem;flex-shrink:0}
.ach-val{font-family:var(--mono);font-size:1.3rem;font-weight:700;color:var(--cyan);line-height:1;margin-bottom:.25rem}
.ach-tit{font-size:.88rem;font-weight:600;margin-bottom:.2rem}
.ach-desc{font-size:.78rem;color:var(--muted2)}
 
/* CERTIFICATIONS */
#certifications{padding:6rem 0;background:var(--bg2)}
.cert-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.2rem;margin-top:3rem}
.certcard{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  padding:1.3rem;display:flex;flex-direction:column;gap:.6rem;transition:all .3s}
.certcard:hover{border-color:var(--border);transform:translateY(-2px)}
.cert-org{font-family:var(--mono);font-size:.65rem;color:var(--cyan);text-transform:uppercase;letter-spacing:.08em}
.cert-name{font-size:.88rem;font-weight:600;line-height:1.35}
.cert-st{font-size:.75rem;color:var(--muted2);display:flex;align-items:center;gap:.4rem}
.cdot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.cdot.done{background:var(--emerald)}
.cdot.prog{background:var(--amber)}
 
/* CONTACT */
#contact{padding:8rem 0}
.contact-inner{max-width:700px;margin:0 auto;text-align:center}
.cc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2.5rem;margin-top:2.5rem}
.cc{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  padding:1.4rem 1rem;text-align:center;text-decoration:none;
  display:flex;flex-direction:column;align-items:center;gap:.5rem;transition:all .3s}
.cc:hover{border-color:var(--border);box-shadow:0 0 30px rgba(56,189,248,.08);transform:translateY(-3px)}
.cc-icon{display:flex;align-items:center;justify-content:center;width:46px;height:46px;background:var(--cdim);border-radius:10px;border:1px solid rgba(56,189,248,0.2);color:var(--cyan)}
.cc-lbl{font-family:var(--mono);font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
.cc-val{font-size:.75rem;color:var(--cyan);text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.ctag{font-family:var(--mono);font-size:.78rem;color:var(--muted);margin-top:1.5rem}
 
/* FOOTER */
footer{border-top:1px solid var(--b2);padding:2rem 0;position:relative;z-index:1}
.fi{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
.fcopy{font-family:var(--mono);font-size:.72rem;color:var(--muted)}
.flinks{display:flex;gap:1.5rem}
.flinks a{font-family:var(--mono);font-size:.72rem;color:var(--muted);text-decoration:none;transition:color .2s}
.flinks a:hover{color:var(--cyan)}
 
/* LEADERSHIP */
#leadership{padding:7rem 0}
.lead-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.3rem;margin-top:3rem}
.leadcard{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  padding:1.5rem;position:relative;overflow:hidden;
  transition:border-color .3s,transform .3s,box-shadow .3s}
.leadcard:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.3)}
.leadcard-bar{position:absolute;top:0;left:0;right:0;height:2px;border-radius:var(--r) var(--r) 0 0}
.lead-icon{font-size:1.6rem;margin-bottom:.8rem}
.lead-role{font-size:1rem;font-weight:700;margin-bottom:.25rem}
.lead-org{font-family:var(--mono);font-size:.68rem;margin-bottom:.7rem}
.lead-desc{font-size:.82rem;color:var(--muted2);line-height:1.65;font-weight:300}
 
/* LEADERSHIP */
#leadership{padding:6rem 0}
.lead-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.4rem;margin-top:3rem}
.leadcard{background:var(--card);border:1px solid var(--b2);border-radius:var(--r);
  padding:1.6rem;position:relative;overflow:hidden;
  transition:border-color .3s,transform .3s,box-shadow .3s}
.leadcard:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.3)}
.leadcard-bar{position:absolute;top:0;left:0;right:0;height:2px;border-radius:var(--r) var(--r) 0 0}
.lead-head{display:flex;align-items:center;gap:.9rem;margin-bottom:.8rem}
.lead-icon{font-size:1.6rem;flex-shrink:0}
.lead-role{font-size:1rem;font-weight:700;margin-bottom:.2rem}
.lead-org{font-family:var(--mono);font-size:.68rem;font-weight:500}
.lead-desc{font-size:.83rem;color:var(--muted2);line-height:1.7;margin-bottom:.9rem;font-weight:300}
.lead-tags{display:flex;flex-wrap:wrap;gap:.4rem}
.ltag{font-family:var(--mono);font-size:.62rem;color:var(--muted2);background:var(--surface2);
  padding:.18rem .55rem;border-radius:4px;border:1px solid var(--b2)}
 
@media(max-width:900px){
  nav{padding:1rem 1.5rem}
  nav.slim{padding:.65rem 1.5rem}
  .nav-links{display:none}
  .hero-inner,.about-grid,.sd-grid,.proj-grid{grid-template-columns:1fr}
  .pcard.full{grid-template-columns:1fr}
  .pcard.full .pcb{border-right:none;border-bottom:1px solid var(--b2)}
  .cc-grid{grid-template-columns:1fr}
}
`;
 
/* ═══════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════ */
function useSlim() {
  const [slim, setSlim] = useState(false);
  useEffect(() => {
    const h = () => setSlim(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return slim;
}
 
function useFade() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
 
function useSkillBars(ref) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return go;
}
 
function useNeural() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let W, H, nodes = [], raf, mouse = { x: -9999, y: -9999 };
    const resize = () => { W = c.width = innerWidth; H = c.height = innerHeight; };
    const init = () => {
      nodes = [];
      const count = Math.floor(W * H / 18000);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random()*W, y: Math.random()*H,
          vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
          r: Math.random()*1.4+.6,
          pulse: Math.random()*Math.PI*2,
          color: Math.random() > 0.75 ? '167,139,250' : '56,189,248',
        });
      }
    };
    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMove);
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      nodes.forEach(n => {
        n.pulse += 0.018;
        // Gentle mouse attraction (subtle, not repulsion)
        const mdx = mouse.x - n.x, mdy = mouse.y - n.y;
        const md = Math.sqrt(mdx*mdx + mdy*mdy);
        if (md < 180 && md > 0) { n.vx += (mdx/md)*0.04; n.vy += (mdy/md)*0.04; }
        // Speed cap — keep it calm
        const spd = Math.sqrt(n.vx*n.vx+n.vy*n.vy);
        if (spd > 0.8) { n.vx = n.vx/spd*0.8; n.vy = n.vy/spd*0.8; }
        n.x += n.vx; n.y += n.vy;
        if (n.x<0||n.x>W) n.vx*=-1;
        if (n.y<0||n.y>H) n.vy*=-1;
      });
      // Connections — thin, elegant
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if (d<130) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x,nodes[i].y);
          ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.strokeStyle=`rgba(56,189,248,${0.13*(1-d/130)})`;
          ctx.lineWidth=.5; ctx.stroke();
        }
      }
      // Nodes — soft pulsing glow, no harsh radial gradient
      nodes.forEach(n => {
        const pr = Math.max(0.4, n.r + Math.sin(n.pulse)*0.5);
        ctx.beginPath();
        ctx.arc(n.x, n.y, pr, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${n.color},${0.55 + Math.sin(n.pulse)*0.2})`;
        ctx.fill();
        // Soft halo — just a slightly larger transparent circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, pr*3, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${n.color},0.04)`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    window.addEventListener("resize", () => { resize(); init(); });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);
  return ref;
}
 
/* ═══════════════════════════════════════════
   SCROLL HELPER
═══════════════════════════════════════════ */
const go = (id, e) => {
  e && e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};
 
/* ═══════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════ */
function Nav({ slim }) {
  const [open, setOpen] = useState(false);
  const links = [["about","About"],["skills","Skills"],["experience","Experience"],["projects","Projects"],["system-design","Design"],["ai-experiments","AI"],["leadership","Leadership"],["achievements","Achievements"],["contact","Contact"]];
  const handleNav = (id, e) => { go(id, e); setOpen(false); };
  return (
    <>
      <nav className={slim ? "slim" : ""}>
        <a className="nav-brand" onClick={(e) => go("hero", e)} href="#hero">sneha.attu</a>
        <ul className="nav-links">
          {links.map(([id,label]) => (
            <li key={id}><a href={`#${id}`} onClick={(e) => go(id, e)}>{label}</a></li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span className={open ? "hbar hbar-top open" : "hbar hbar-top"} />
          <span className={open ? "hbar hbar-mid open" : "hbar hbar-mid"} />
          <span className={open ? "hbar hbar-bot open" : "hbar hbar-bot"} />
        </button>
      </nav>
      <div className={open ? "mob-drawer open" : "mob-drawer"}>
        <div className="mob-links">
          {links.map(([id,label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => handleNav(id, e)} className="mob-link">{label}</a>
          ))}
        </div>
      </div>
      {open && <div className="mob-overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
 
function Hero() {
  return (
    <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", paddingTop:"5rem" }}>
      <div className="ctr" style={{ width:"100%" }}>
        <div className="hero-inner">

          {/* LEFT — Name + content */}
          <div className="fade">
            {/* Mobile only: photo shown above name */}
            <div className="hero-photo-mobile">
              <div style={{ position:"relative", width:"150px", height:"150px", margin:"0 auto 1.5rem" }}>
                <div style={{ position:"absolute", inset:"-4px", borderRadius:"50%", background:"linear-gradient(135deg,var(--cyan),var(--violet))", zIndex:0 }}/>
                <div style={{ position:"absolute", inset:"0", borderRadius:"50%", background:"var(--bg)", zIndex:0 }}/>
                <img src="/photo.png" alt="Sneha Attu" style={{ position:"relative", zIndex:1, width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", objectPosition:"center top", border:"4px solid var(--bg)" }}/>
                <div style={{ position:"absolute", bottom:"8px", right:"8px", zIndex:2, background:"var(--emerald)", borderRadius:"50%", width:"16px", height:"16px", border:"2px solid var(--bg)", boxShadow:"0 0 10px var(--emerald)" }}/>
              </div>
            </div>
            <div className="hero-badge"><span className="bdot" />CS Student · GIT Belgaum · 2026 Batch</div>
            <h1 className="hero-name">Sneha&nbsp;<span className="hl">Attu.</span></h1>
            <p className="hero-role">// Software Engineer · AI Builder · Project Coordinator</p>
            <p className="hero-desc">Building scalable AI platforms, real-time distributed systems, and data-driven products. From event-driven backends processing <strong style={{ color:"var(--cyan)" }}>1000+ events/sec</strong> to intelligent multi-agent AI pipelines — engineering things that perform at scale.</p>
            <div className="hero-btns">
              <button className="btn-p" onClick={(e) => go("projects", e)}>View Projects</button>
              <button className="btn-s" onClick={(e) => go("about", e)}>About Me</button>
              <a className="btn-s" href="https://github.com/sneha-attu" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
            <div className="stack-lbl">Core Stack</div>
            <div className="pill-row">
              {["Python","Kafka","AWS","PostgreSQL","Docker"].map(t => <span key={t} className="pill pc">{t}</span>)}
              {["PostHog","Google Ads","JIRA"].map(t => <span key={t} className="pill pv">{t}</span>)}
              {["React","Node.js"].map(t => <span key={t} className="pill pe">{t}</span>)}
            </div>
            <div style={{ display:"flex", gap:"2rem", marginTop:"2rem", paddingTop:"1.5rem", borderTop:"1px solid var(--b2)" }}>
              {[["2+","Years Building"],["4+","Hackathons"],["99.9%","SLA Uptime"]].map(([val,lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily:"var(--mono)", fontSize:"1.4rem", fontWeight:700, color:"var(--cyan)", lineHeight:1 }}>{val}</div>
                  <div style={{ fontFamily:"var(--mono)", fontSize:".62rem", color:"var(--muted)", textTransform:"uppercase", letterSpacing:".08em", marginTop:".3rem" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Photo (desktop only) + Metrics */}
          <div className="fade hero-right-col" style={{ transitionDelay:".2s", display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem" }}>
            <div className="hero-photo-desktop" style={{ position:"relative", width:"320px", height:"320px", flexShrink:0 }}>
              <div style={{ position:"absolute", inset:"-3px", borderRadius:"50%", background:"linear-gradient(135deg,var(--cyan),var(--violet))", zIndex:0 }}/>
              <div style={{ position:"absolute", inset:"2px", borderRadius:"50%", background:"var(--bg)", zIndex:0 }}/>
              <img src="/photo.png" alt="Sneha Attu" style={{ position:"absolute", inset:"5px", zIndex:1, width:"calc(100% - 10px)", height:"calc(100% - 10px)", borderRadius:"50%", objectFit:"cover", objectPosition:"center top" }}/>
              <div style={{ position:"absolute", bottom:"18px", right:"18px", zIndex:2, background:"var(--emerald)", borderRadius:"50%", width:"22px", height:"22px", border:"3px solid var(--bg)", boxShadow:"0 0 14px var(--emerald)" }}/>
            </div>
            <div className="metrics-col" style={{ width:"100%" }}>
              {METRICS.slice(0,2).map(m => (
                <div key={m.tag} className="mc">
                  <div className="mc-head"><span className="mc-tag">{m.tag}</span><span>{m.icon}</span></div>
                  <div className="mc-val">{m.val}</div>
                  <div className="mc-desc">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
 
function About() {
  return (
    <section id="about" style={{ padding:"4rem 0" }}>
      <div className="ctr">
        <div className="about-grid fade">
          <div>
            <div className="lbl">About Me</div>
            <h2 className="ttl">Building Systems That <span className="hl">Scale</span>.</h2>
            <div className="divider" style={{ marginBottom:"1.5rem" }} />
            <p className="ap">I'm a Computer Science student at <strong>KLS Gogte Institute of Technology (GIT), Belgaum</strong> (2026 Batch) specializing in the Project Management Life Cycle (PMLC), enterprise software delivery, and AI-driven systems.</p>
            <p className="ap">My work spans <strong>event-driven backend systems, Agile/Scrum delivery, product analytics with PostHog & Google Ads</strong>, multi-agent AI workflows, and enterprise platform coordination. I've worked in fast-paced startup environments and contributed to mission-critical deployments.</p>
            <p className="ap">I thrive at the intersection of <strong>engineering and strategy</strong> — translating complex technical requirements into production-ready solutions while keeping business impact at the center.</p>
            <div className="int-box">
              <div className="int-lbl">// Interests & Curiosities</div>
              <div className="int-tags">
                {["🤖 Agentic AI Systems","📡 Distributed Architectures","⚡ Real-Time Engineering","📊 Product Analytics","🌱 Open Source","📝 Technical Writing","🌍 AI for Social Good","🧠 System Design"].map(t => <span key={t} className="itag">{t}</span>)}
              </div>
            </div>
          </div>
          <div>
            <div className="icard">
              <div className="ict">// Quick Info</div>
              {[
                ["🎓","KLS GIT, Belgaum","— B.E. Computer Science, 2026"],
                ["📍","Bengaluru","Karnataka, India"],
                ["🏢","Currently at","Ecombuddha.ai — Founder's Office"],
                ["🔭","Building:","GestiCalc · Gesture Calculator + Logistics Platform"],
                ["🌐","LinkedIn","linkedin.com/in/sneha-attu"],
              ].map(([ico,b,r]) => (
                <div key={b} className="icr"><span className="ico">{ico}</span><div className="icv"><strong>{b}</strong> {r}</div></div>
              ))}
            </div>
            <div className="icard">
              <div className="ict">// Currently Working With</div>
              <div className="pill-row">
                {["Kafka","Redis","AWS"].map(t => <span key={t} className="pill pc">{t}</span>)}
                {["PostHog","Google Ads","JIRA"].map(t => <span key={t} className="pill pv">{t}</span>)}
                {["CrewAI","Zod","Terraform"].map(t => <span key={t} className="pill pe">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
function Skills() {
  const ref = useRef(null);
  const go2 = useSkillBars(ref);
  return (
    <section id="skills" style={{ padding:"4rem 0", background:"linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)" }}>
      <div className="ctr">
        <div className="fade"><div className="lbl">Technical Skills</div><h2 className="ttl">Full-Stack <span className="hl">Engineering</span> Arsenal.</h2></div>
        <div className="sg-grid fade" ref={ref}>
          {SKILLS.map(g => (
            <div key={g.title} className="sg">
              <div className="sg-head"><span className="sg-icon">{g.icon}</span><span className="sg-title">{g.title}</span></div>
              <div className="sbars">
                {g.items.map(([name, pct]) => (
                  <div key={name} className="sbr">
                    <div className="sbm"><span className="sbn">{name}</span><span className="sbp">{pct}%</span></div>
                    <div className="sbt"><div className="sbf" style={{ width: go2 ? `${pct}%` : "0%" }} /></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function Experience() {
  return (
    <section id="experience" style={{ padding:"4rem 0" }}>
      <div className="ctr">
        <div className="fade"><div className="lbl">Work Experience</div><h2 className="ttl">Industry <span className="hl">Impact</span> at Scale.</h2></div>
        <div className="exp-tl">
          {EXPERIENCE.map(e => (
            <div key={e.role} className="exp-item fade">
              <div className="exp-dot"><span /></div>
              <div className="exp-card">
                <div className="exp-meta">
                  <div><div className="exp-role">{e.role}</div><div className="exp-co">{e.company}</div></div>
                  <span className="exp-period">{e.period}</span>
                </div>
                <ul className="exp-pts">{e.points.map((p,i) => <li key={i}>{p}</li>)}</ul>
                <div className="exp-tags">{e.tags.map(t => <span key={t} className="etag">{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function Projects() {
  return (
    <section id="projects" style={{ padding:"4rem 0", background:"linear-gradient(180deg,var(--bg2) 0%,var(--bg) 100%)" }}>
      <div className="ctr">
        <div className="fade" style={{ marginBottom:"3rem" }}>
          <div className="lbl">Featured Projects</div>
          <h2 className="ttl">Systems Built at <span className="hl">Scale</span>.</h2>
          <p className="sub">From real-time event pipelines processing thousands of events per second to AI agent networks — every project is engineered for performance and impact.</p>
        </div>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className={`pcard fade${p.flagship ? " full" : ""}`} style={{ transitionDelay:`${i*.07}s` }}>
              <div className="pcb">
                <div className="ptype" style={{ color: p.typeColor }}>{p.type}</div>
                <div className="ptitle">{p.title}</div>
                <p className="pdesc">{p.desc}</p>
                {p.metrics && (
                  <div className="pm-row">
                    {p.metrics.map(([v,l]) => <div key={l}><div className="pm-val">{v}</div><div className="pm-lbl">{l}</div></div>)}
                  </div>
                )}
              </div>
              <div className="pbody">
                {p.problem && <><div className="psl">Problem Statement</div><p style={{ fontSize:".85rem",color:"var(--muted2)",lineHeight:"1.65",marginBottom:"1rem" }}>{p.problem}</p></>}
                {p.arch && <><div className="psl">Architecture</div><div className="arch">{p.arch.map((n,i) => <span key={n}><span className="anode">{n}</span>{i<p.arch.length-1&&<span className="aarr">→</span>}</span>)}</div></>}
                <div className="psl">Tech Stack</div>
                <div className="ptags">{p.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
                <div className="plinks">
                  <a href="https://github.com/snehaattu" target="_blank" rel="noreferrer" className="plink">⌥ GitHub</a>
                  {p.flagship && <a href="#system-design" onClick={(e)=>go("system-design",e)} className="plink demo">⬡ System Design →</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function SystemDesign() {
  return (
    <section id="system-design" style={{ padding:"4rem 0" }}>
      <div className="ctr">
        <div className="fade"><div className="lbl">System Design</div><h2 className="ttl">Engineering <span className="hl">Trade-offs</span> & Decisions.</h2><p className="sub">Deep dives into architectural decisions, scalability considerations, and engineering reasoning behind production-grade systems.</p></div>
        <div className="sd-grid">
          {SD_CARDS.map(c => (
            <div key={c.title} className="sdcard fade">
              <div className="sd-title">{c.title}</div>
              <div className="sd-sub">{c.sub}</div>
              {c.problem && <><div className="sd-sh">Problem Constraints</div><p className="sd-p">{c.problem}</p></>}
              {c.components && <><div className="sd-sh">Architecture Components</div><div className="comp-list">{c.components.map(([n,d]) => <div key={n} className="comp-i"><span className="cnode">{n}</span><span className="aarr">→</span><span className="cdesc">{d}</span></div>)}</div></>}
              <div className="sd-sh">Key Design Decisions</div>
              <div className="to-list">{c.decisions.map((d,i) => <div key={i} className="toi"><span className={d.pro?"pro":"con"}>{d.pro?"✓":"~"}</span>{d.text}</div>)}</div>
              {c.scale && <><div className="sd-sh">Scalability Path</div><p className="sd-p">{c.scale}</p></>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function AIExperiments() {
  return (
    <section id="ai-experiments" style={{ padding:"4rem 0", background:"linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)" }}>
      <div className="ctr">
        <div className="fade"><div className="lbl">AI Experiments</div><h2 className="ttl">Exploring the Frontier of <span className="hl">Intelligent Systems</span>.</h2></div>
        <div className="ai-grid">
          {AI_CARDS.map(c => (
            <div key={c.title} className="aicard fade">
              <div className="ai-icon">{c.icon}</div>
              <div className="ai-title">{c.title}</div>
              <div className="ai-desc">{c.desc}</div>
              <span className={`ai-status ${c.status==="done"?"ai-done":"ai-build"}`}>{c.status==="done"?"✓ Complete":"🔨 Building"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function Leadership() {
  return (
    <section id="leadership" style={{ padding:"4rem 0", background:"linear-gradient(180deg,var(--bg2) 0%,var(--bg) 100%)" }}>
      <div className="ctr">
        <div className="fade">
          <div className="lbl">Leadership & Community</div>
          <h2 className="ttl">Beyond the <span className="hl">Code</span>.</h2>
          <p className="sub">Leading teams, building communities, and creating impact beyond engineering.</p>
        </div>
        <div className="lead-grid" style={{ marginTop:"2rem" }}>
          {LEADERSHIP.map(l => (
            <div key={l.role} className="leadcard fade" style={{ borderColor:`${l.color}22` }}>
              <div className="leadcard-bar" style={{ background:l.color }} />
              <div className="lead-icon">{l.icon}</div>
              <div className="lead-role">{l.role}</div>
              <div className="lead-org" style={{ color:l.color }}>{l.org}</div>
              <div className="lead-desc">{l.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function AchievementsAndCerts() {
  return (
    <section id="achievements" style={{ padding:"4rem 0", background:"var(--bg2)" }}>
      <div className="ctr">
 
        {/* ── Section Header ── */}
        <div className="fade">
          <div className="lbl">Achievements, Awards & Certifications</div>
          <h2 className="ttl">Recognition & <span className="hl">Verified Impact</span>.</h2>
          <p className="sub">Real hackathon placements, certificates from top organisations — ISRO, Infosys, IIT Guwahati, Cisco — and measurable engineering results.</p>
        </div>
 
        {/* ── Award Cards ── */}
        <div className="awards-grid" style={{marginTop:"2rem"}}>
          {AWARDS.map(a => (
            <div key={a.title} className="acard fade" style={{ borderColor:`${a.color}22` }}>
              <div className="acard-bar" style={{ background:a.color }} />
              <div className="aw-head"><div className="aw-icon">{a.icon}</div><span className="aw-year">{a.year}</span></div>
              <div className="aw-title">{a.title}</div>
              <div className="aw-org" style={{ color:a.color }}>{a.org}</div>
              <div className="aw-desc">{a.desc}</div>
              {a.cert && <div style={{fontFamily:"var(--mono)",fontSize:".6rem",color:"var(--muted)",marginTop:".8rem",padding:".3rem .6rem",background:"rgba(255,255,255,0.03)",borderRadius:"4px",border:"1px solid var(--b2)"}}># {a.cert}</div>}
            </div>
          ))}
        </div>
 
        {/* ── Divider: Certificates ── */}
        <div className="sep" style={{marginTop:"2rem"}}>
          <div className="sep-line" style={{ background:"linear-gradient(90deg,transparent,var(--b2))" }} />
          <span className="sep-lbl">// Verified Certificates</span>
          <div className="sep-line" style={{ background:"linear-gradient(90deg,var(--b2),transparent)" }} />
        </div>
 
        <div className="cert-grid" style={{marginTop:"1.5rem"}}>
          {CERTS.map(c => (
            <div key={c.name} className="certcard fade">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"0.5rem"}}>
                <div className="cert-org">{c.org}</div>
                <span style={{fontFamily:"var(--mono)",fontSize:".6rem",color:"var(--muted)",background:"var(--surface2)",padding:".15rem .5rem",borderRadius:"4px",border:"1px solid var(--b2)",whiteSpace:"nowrap"}}>{c.year}</span>
              </div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-st"><span className="cdot done" />Verified & Certified</div>
            </div>
          ))}
        </div>
 
 
      </div>
    </section>
  );
}
 
function Contact() {
  return (
    <section id="contact" style={{ padding:"4rem 0" }}>
      <div className="ctr">
        <div className="contact-inner fade">
          <div className="lbl">Get In Touch</div>
          <h2 className="ttl" style={{ fontSize:"clamp(2rem,4vw,3.5rem)",marginBottom:"1rem" }}>Let's <span className="hl">Connect</span>.</h2>
          <p className="sub" style={{ margin:"0 auto" }}>Whether it's a project, a collaboration, or just a conversation about tech and ideas — I'm always open to connecting.</p>
          <div className="cc-grid">
            <a href="mailto:snehaattu9408@gmail.com" className="cc">
              <span className="cc-icon" style={{color:"var(--cyan)"}}>
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              </span>
              <span className="cc-lbl">Email</span>
              <span className="cc-val">snehaattu9408@gmail.com</span>
            </a>
            <a href="tel:+918867559408" className="cc" style={{overflow:"hidden"}}>
              <span className="cc-icon" style={{color:"var(--cyan)"}}>
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <span className="cc-lbl">Phone</span>
              <span className="cc-val" style={{whiteSpace:"nowrap",fontSize:".72rem",letterSpacing:"0"}}>+918867559408</span>
            </a>
            <a href="https://www.linkedin.com/in/sneha-attu/" target="_blank" rel="noreferrer" className="cc">
              <span className="cc-icon" style={{color:"var(--cyan)"}}>
                <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </span>
              <span className="cc-lbl">LinkedIn</span>
              <span className="cc-val">linkedin.com/in/sneha-attu</span>
            </a>
            <a href="https://github.com/sneha-attu" target="_blank" rel="noreferrer" className="cc">
              <span className="cc-icon" style={{color:"var(--cyan)"}}>
                <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </span>
              <span className="cc-lbl">GitHub</span>
              <span className="cc-val">github.com/sneha-attu</span>
            </a>
          </div>
          {/* ── Formspree Message Form ── */}
          <ContactForm />
          <div className="ctag">// +91 88675 59408 · snehaattu9408@gmail.com · Bengaluru, India</div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const FORM_ID = "xbdzqaqj"; // ← Replace with your Formspree ID e.g. "xpwzgkrb"
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSend = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(`xbdzqaqj`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name:"", email:"", subject:"", message:"" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };
  const inputStyle = {
    width:"100%", background:"var(--surface2)", border:"1px solid var(--b2)",
    borderRadius:"8px", padding:".7rem 1rem", color:"var(--text)",
    fontFamily:"var(--font)", fontSize:".9rem", outline:"none", transition:"border-color .2s",
  };
  const labelStyle = {
    fontFamily:"var(--mono)", fontSize:".65rem", color:"var(--muted)",
    letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:".4rem",
  };
  const focus = e => e.target.style.borderColor = "var(--cyan)";
  const blur  = e => e.target.style.borderColor = "var(--b2)";
  const disabled = !form.name.trim() || !form.email.trim() || !form.message.trim() || status === "sending";

  return (
    <div style={{ width:"100%", marginTop:"2.5rem", background:"var(--card)", border:"1px solid var(--b2)", borderRadius:"var(--r)", padding:"2rem" }}>
      <div style={{ fontFamily:"var(--mono)", fontSize:".7rem", color:"var(--cyan)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:"1.4rem" }}>
        // Send Me a Message
      </div>
      {status === "success" ? (
        <div style={{ textAlign:"center", padding:"2rem 1rem" }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>✅</div>
          <div style={{ fontWeight:700, fontSize:"1.1rem", color:"var(--emerald)", marginBottom:".5rem" }}>Message sent!</div>
          <p style={{ color:"var(--muted2)", fontSize:".9rem", marginBottom:"1.5rem" }}>Thanks for reaching out — I'll get back to you soon.</p>
          <button className="btn-s" onClick={() => setStatus("idle")}>Send another →</button>
        </div>
      ) : (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
            <div>
              <label style={labelStyle}>Your Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" style={inputStyle} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={labelStyle}>Your Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" style={inputStyle} onFocus={focus} onBlur={blur} />
            </div>
          </div>
          <div style={{ marginBottom:"1rem" }}>
            <label style={labelStyle}>Subject</label>
            <input name="subject" value={form.subject} onChange={handleChange} placeholder="Project collab, hiring, or just saying hi!" style={inputStyle} onFocus={focus} onBlur={blur} />
          </div>
          <div style={{ marginBottom:"1.4rem" }}>
            <label style={labelStyle}>Message *</label>
            <textarea name="message" value={form.message} onChange={handleChange}
              placeholder="Hi Sneha, I'd love to talk about..." rows={5}
              style={{ ...inputStyle, resize:"vertical", lineHeight:"1.6" }}
              onFocus={focus} onBlur={blur} />
          </div>
          {status === "error" && (
            <p style={{ fontFamily:"var(--mono)", fontSize:".75rem", color:"#f87171", marginBottom:"1rem" }}>
              // Something went wrong — please try again.
            </p>
          )}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
            <span style={{ fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--muted)" }}>
              // Message arrives directly in my inbox
            </span>
            <button className="btn-p" onClick={handleSend} disabled={disabled}
              style={{ fontSize:".9rem", padding:".75rem 2rem", opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}>
              {status === "sending" ? "Sending…" : "Send Message →"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
 
function Footer() {
  return (
    <footer>
      <div className="ctr">
        <div className="fi">
          <span className="fcopy">© 2026 Sneha Attu · B.E. Computer Science · KLS Gogte Institute of Technology, Belgaum</span>
          <div className="flinks">
            <a href="#hero" onClick={(e)=>go("hero",e)}>Top ↑</a>
            <a href="https://github.com/sneha-attu" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/sneha-attu/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:snehaattu9408@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
 
/* ═══════════════════════════════════════════
   APP
═══════════════════════════════════════════ */
export default function App() {
  const slim = useSlim();
  const canvasRef = useNeural();
  useFade();
 
  return (
    <>
      <style>{CSS}</style>
      <canvas id="neural-canvas" ref={canvasRef} />
      <Nav slim={slim} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <SystemDesign />
      <AIExperiments />
      <Leadership />
      <AchievementsAndCerts />
      <Contact />
      <Footer />
    </>
  );
}