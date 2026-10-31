import { useEffect, useRef, useState, type ReactNode } from 'react'

type Page = 'home' | 'login' | 'signup' | 'app'
type View = 'overview' | 'knowledge' | 'processing' | 'assistant' | 'history' | 'inspector' | 'settings'
type IconName =
  | 'arrow' | 'book' | 'brain' | 'check' | 'chevron' | 'clock' | 'copy'
  | 'dashboard' | 'document' | 'eye' | 'file' | 'history' | 'home' | 'layers'
  | 'logout' | 'menu' | 'more' | 'paperclip' | 'plus' | 'search' | 'send'
  | 'settings' | 'spark' | 'trash' | 'upload' | 'user' | 'x'

const paths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M4 5.5v16" /></>,
  brain: <><path d="M9.5 4.5A3 3 0 0 0 5 7a3 3 0 0 0 .5 5.9A3.5 3.5 0 0 0 9 18h1V5.5a2 2 0 0 0-.5-1zM14.5 4.5A3 3 0 0 1 19 7a3 3 0 0 1-.5 5.9A3.5 3.5 0 0 1 15 18h-1V5.5a2 2 0 0 1 .5-1z" /><path d="M6 9h4M14 9h4M7 15h3M14 15h3" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  copy: <><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
  document: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 12h6M9 16h6" /></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="2.5" /></>,
  file: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></>,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M10 20v-6h4v6" /></>,
  layers: <><path d="m12 2 9 5-9 5-9-5z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
  logout: <><path d="M10 4H4v16h6M14 8l4 4-4 4M18 12H9" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
  paperclip: <path d="m20 12-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-9.5 9.5a2 2 0 0 1-3-3L15 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  send: <><path d="m3 3 18 9-18 9 4-9z" /><path d="M7 12h14" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z" /></>,
  spark: <><path d="m12 3 1.3 4.1L17 9l-3.7 1.9L12 15l-1.3-4.1L7 9l3.7-1.9z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7zM5 3l.6 1.8L7 6l-1.4.8L5 9l-.6-2.2L3 6l1.4-1.2z" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14" /><path d="M10 11v6M14 11v6" /></>,
  upload: <><path d="M12 16V3M7 8l5-5 5 5" /><path d="M5 14H3v7h18v-7h-2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  x: <path d="M6 6l12 12M18 6 6 18" />,
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`logo ${light ? 'logo-light' : ''}`}>
    <span className="logo-mark"><span /><span /><span /></span>
    <strong>TrustRAG</strong>
  </div>
}

function Button({ children, variant = 'primary', icon, onClick, type = 'button', className = '' }: {
  children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'dark'; icon?: IconName;
  onClick?: () => void; type?: 'button' | 'submit'; className?: string
}) {
  return <button type={type} className={`button button-${variant} ${className}`} onClick={onClick}>
    <span>{children}</span>{icon && <Icon name={icon} size={18} />}
  </button>
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function HeroVisual() {
  return <div className="hero-visual" aria-label="Documents flowing into a trusted AI knowledge system">
    <div className="grid-plane" />
    <div className="orbit orbit-a" /><div className="orbit orbit-b" />
    <div className="node n1" /><div className="node n2" /><div className="node n3" /><div className="node n4" />
    <div className="doc-card doc-pdf">
      <div className="file-badge red">PDF</div><span className="doc-fold" />
      <div className="doc-lines"><i /><i /><i /><i /></div><small>Market Research.pdf</small>
    </div>
    <div className="doc-card doc-word">
      <div className="file-badge blue">DOCX</div><span className="doc-fold" />
      <div className="doc-lines"><i /><i /><i /></div><small>Strategy 2025.docx</small>
    </div>
    <div className="core">
      <div className="core-ring"><div className="core-inner"><Icon name="brain" size={38} /></div></div>
      <span>KNOWLEDGE CORE</span>
    </div>
    <div className="answer-float">
      <span className="mini-label"><i /> VERIFIED ANSWER</span>
      <strong>Revenue grew 24% year over year.</strong>
      <div><b>[1]</b> Annual Report.pdf · p.12</div>
    </div>
    <div className="index-pill"><Icon name="check" size={14} /> 1,248 chunks indexed</div>
  </div>
}

function Landing({ go }: { go: (p: Page) => void }) {
  const [menu, setMenu] = useState(false)
  return <main className="landing">
    <nav className="topnav">
      <Logo />
      <div className={`navlinks ${menu ? 'open' : ''}`}>
        <button onClick={() => { scrollTo('home'); setMenu(false) }}>Home</button>
        <button onClick={() => { scrollTo('features'); setMenu(false) }}>Features</button>
        <button onClick={() => { scrollTo('how'); setMenu(false) }}>How It Works</button>
        <button onClick={() => { scrollTo('about'); setMenu(false) }}>About</button>
      </div>
      <div className="nav-actions">
        <button className="login-link" onClick={() => go('login')}>Log in</button>
        <Button onClick={() => go('signup')} icon="arrow">Get Started</Button>
      </div>
      <button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu"><Icon name={menu ? 'x' : 'menu'} /></button>
    </nav>

    <section className="hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span /><b>AI-POWERED KNOWLEDGE</b></div>
        <h1>TURN DOCUMENTS<br /><em>INTO KNOWLEDGE.</em></h1>
        <p>Turn your documents into an intelligent knowledge base. Ask questions, discover insights, and get accurate AI-generated answers backed by real sources.</p>
        <div className="hero-actions">
          <Button onClick={() => go('signup')} icon="arrow">Get Started</Button>
          <Button variant="secondary" onClick={() => scrollTo('features')}>Explore Features</Button>
        </div>
        <div className="trust-row">
          <div className="avatars"><span>AK</span><span>JM</span><span>SR</span><span>+</span></div>
          <div><div className="stars">★★★★★</div><small>Trusted by 2,000+ knowledge teams</small></div>
        </div>
      </div>
      <HeroVisual />
    </section>

    <section className="logo-strip">
      <span>BUILT FOR TEAMS AT</span>
      <div><b>northstar</b><b>APERTURE</b><b>Vertex</b><b>MONUMENT</b><b>Quotient</b></div>
    </section>

    <section className="features section" id="features">
      <div className="section-intro">
        <div className="eyebrow"><span /><b>BUILT FOR TRUST</b></div>
        <h2>Answers are easy.<br /><em>Evidence is everything.</em></h2>
        <p>TrustRAG doesn’t just generate answers. It shows you exactly where every insight comes from.</p>
      </div>
      <div className="feature-grid">
        <article className="feature-card feature-large">
          <div className="feature-icon"><Icon name="layers" /></div>
          <span className="card-num">01</span>
          <div className="mini-search">
            <div className="query-chip"><Icon name="search" size={16} /> What drove Q3 growth?</div>
            <div className="result-layer r1"><b>94% match</b><span>Q3_Report.pdf · Page 14</span></div>
            <div className="result-layer r2"><b>89% match</b><span>Board_Notes.docx · Page 3</span></div>
            <div className="result-layer r3"><b>82% match</b><span>Forecast.pdf · Page 8</span></div>
          </div>
          <h3>Intelligent retrieval</h3><p>Hybrid search finds the most relevant evidence across every document, in seconds.</p>
        </article>
        <article className="feature-card">
          <div className="feature-icon lavender"><Icon name="document" /></div><span className="card-num">02</span>
          <div className="citation-demo"><span>“Customer retention increased to 94%”</span><b>[1]</b><div>Annual_Report.pdf · p.24</div></div>
          <h3>Citations you can verify</h3><p>Every claim links directly to its supporting passage.</p>
        </article>
        <article className="feature-card dark-card">
          <div className="feature-icon green"><Icon name="spark" /></div><span className="card-num">03</span>
          <div className="shield-visual"><div><Icon name="check" size={34} /></div><span>GROUNDED</span></div>
          <h3>Grounded by design</h3><p>Responses stay within the boundaries of your trusted knowledge.</p>
        </article>
      </div>
    </section>

    <section className="how section" id="how">
      <div className="how-copy">
        <div className="eyebrow light"><span /><b>HOW IT WORKS</b></div>
        <h2>From documents<br />to decisions.</h2>
        <p>A powerful knowledge workflow, designed to feel effortless.</p>
        <Button variant="secondary" onClick={() => go('signup')} icon="arrow">Build your knowledge base</Button>
      </div>
      <div className="steps">
        {[
          ['01', 'Upload', 'Add PDF, DOCX, or text files securely.'],
          ['02', 'Connect', 'We extract, chunk, and index your knowledge.'],
          ['03', 'Ask', 'Get grounded answers with precise citations.'],
        ].map((s, i) => <div className="step" key={s[0]}>
          <span>{s[0]}</span><div className="step-icon"><Icon name={i === 0 ? 'upload' : i === 1 ? 'layers' : 'brain'} /></div>
          <div><h3>{s[1]}</h3><p>{s[2]}</p></div>{i < 2 && <i />}
        </div>)}
      </div>
    </section>

    <section className="about section" id="about">
      <div><div className="eyebrow"><span /><b>KNOW WHAT’S TRUE</b></div><h2>Your team’s knowledge,<br /><em>finally connected.</em></h2></div>
      <div><p>Stop hunting through folders, wikis, and outdated threads. TrustRAG gives every team one verified place to ask, understand, and move forward.</p><Button onClick={() => go('signup')} icon="arrow">Start for free</Button></div>
    </section>
    <footer><Logo /><span>Your Knowledge. Connected. Verified. Trusted.</span><small>© 2025 TrustRAG</small></footer>
  </main>
}

function Auth({ mode, go, enter }: { mode: 'login' | 'signup'; go: (p: Page) => void; enter: () => void }) {
  const [show, setShow] = useState(false)
  const submit = (e: React.FormEvent) => { e.preventDefault(); enter() }
  return <main className="auth-page">
    <button className="auth-logo" onClick={() => go('home')}><Logo /></button>
    <section className="auth-art">
      <div className="auth-copy">
        <div className="eyebrow light"><span /><b>VERIFIABLE BY DESIGN</b></div>
        <h2>Your knowledge.<br />One trusted place.</h2>
        <p>Connect your documents and turn scattered information into answers your team can prove.</p>
      </div>
      <div className="auth-visual">
        <div className="auth-orb"><Icon name="brain" size={40} /></div>
        <div className="auth-doc a"><Icon name="file" /><span>Research.pdf</span><b>READY</b></div>
        <div className="auth-doc b"><Icon name="file" /><span>Strategy.docx</span><b>INDEXED</b></div>
        <div className="auth-proof"><Icon name="check" /><div><strong>Answer verified</strong><small>3 sources cited</small></div></div>
      </div>
      <small className="auth-quote">“The fastest way to turn what your team knows into what it can prove.”</small>
    </section>
    <section className="auth-form-wrap">
      <div className="auth-form">
        <button className="back-link" onClick={() => go('home')}>← Back to home</button>
        <div className="form-heading">
          <span>{mode === 'login' ? 'WELCOME BACK' : 'START BUILDING'}</span>
          <h1>{mode === 'login' ? 'Welcome back.' : 'Create your account.'}</h1>
          <p>{mode === 'login' ? 'Enter your details to access your knowledge workspace.' : 'Start turning documents into trustworthy answers.'}</p>
        </div>
        <form onSubmit={submit}>
          {mode === 'signup' && <label>Full name<input required placeholder="Alex Morgan" /></label>}
          <label>Email address<input required type="email" placeholder="you@company.com" /></label>
          <label>Password<div className="password-field"><input required type={show ? 'text' : 'password'} placeholder="••••••••" /><button type="button" onClick={() => setShow(!show)} aria-label="Show password"><Icon name="eye" size={18} /></button></div></label>
          {mode === 'signup' && <label>Confirm password<input required type="password" placeholder="••••••••" /></label>}
          {mode === 'login' && <div className="form-options"><label className="checkbox"><input type="checkbox" /><span />Remember me</label><button type="button">Forgot password?</button></div>}
          <Button type="submit" icon="arrow" className="full">{mode === 'login' ? 'Log in to TrustRAG' : 'Create account'}</Button>
        </form>
        <p className="switch-auth">{mode === 'login' ? 'New to TrustRAG?' : 'Already have an account?'} <button onClick={() => go(mode === 'login' ? 'signup' : 'login')}>{mode === 'login' ? 'Create an account' : 'Log in'}</button></p>
        <div className="security-note"><Icon name="check" size={15} /> Your data is encrypted and never used to train models.</div>
      </div>
    </section>
  </main>
}

const nav: { id: View; label: string; icon: IconName }[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'knowledge', label: 'Knowledge Base', icon: 'book' },
  { id: 'assistant', label: 'AI Assistant', icon: 'spark' },
  { id: 'history', label: 'Chat History', icon: 'history' },
  { id: 'inspector', label: 'Retrieval Inspector', icon: 'layers' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

const docs = [
  { name: 'Product_Strategy_2025.pdf', type: 'PDF', size: '4.2 MB', date: 'Today, 9:42 AM', chunks: 248, status: 'Completed' },
  { name: 'Customer_Research_Q4.docx', type: 'DOCX', size: '2.8 MB', date: 'Yesterday, 4:18 PM', chunks: 176, status: 'Completed' },
  { name: 'Market_Analysis.txt', type: 'TXT', size: '846 KB', date: 'Nov 18, 2025', chunks: 92, status: 'Completed' },
  { name: 'Technical_Architecture.pdf', type: 'PDF', size: '6.1 MB', date: 'Nov 16, 2025', chunks: 314, status: 'Completed' },
]

function Sidebar({ view, setView, logout, open, close }: { view: View; setView: (v: View) => void; logout: () => void; open: boolean; close: () => void }) {
  return <><aside className={`sidebar ${open ? 'open' : ''}`}>
    <div className="side-head"><Logo /><button onClick={close}><Icon name="x" /></button></div>
    <Button className="new-chat" icon="plus" onClick={() => { setView('assistant'); close() }}>New chat</Button>
    <span className="side-label">WORKSPACE</span>
    <nav>{nav.slice(0, 5).map(item => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => { setView(item.id); close() }}><Icon name={item.icon} size={19} /><span>{item.label}</span>{item.id === 'assistant' && <b>AI</b>}</button>)}</nav>
    <div className="sidebar-bottom">
      <button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')}><Icon name="settings" size={19} /> Settings</button>
      <div className="profile"><div className="avatar">AM</div><div><strong>Alex Morgan</strong><small>alex@trustrag.ai</small></div><button onClick={logout} title="Log out"><Icon name="logout" size={17} /></button></div>
    </div>
  </aside>{open && <button className="sidebar-scrim" onClick={close} aria-label="Close navigation" />}</>
}

function AppHeader({ title, menu }: { title: string; menu: () => void }) {
  return <header className="app-header"><button className="mobile-side" onClick={menu}><Icon name="menu" /></button><div><span>TRUSTRAG /</span> {title}</div><div className="header-actions"><button><Icon name="search" size={18} /></button><button className="notification"><span /></button><div className="avatar small">AM</div></div></header>
}

function Overview({ go }: { go: (v: View) => void }) {
  const stats: [string, string, string, IconName, string][] = [
    ['Total Documents', '24', '+3 this week', 'document', 'blue'],
    ['Indexed Chunks', '1,842', '+248 today', 'layers', 'lavender'],
    ['Questions Asked', '186', '+12 today', 'spark', 'green'],
    ['Knowledge Sources', '8', 'Across 4 types', 'book', 'amber'],
  ]
  return <div className="page-content">
    <div className="page-title"><div><span className="breadcrumb">OVERVIEW</span><h1>Welcome back!</h1><p>Your knowledge workspace is ready.</p></div><Button icon="plus" onClick={() => go('knowledge')}>Upload document</Button></div>
    <div className="stats-grid">{stats.map((s, i) => <article className="stat-card" key={s[0]}><span className={`stat-icon ${s[4]}`}><Icon name={s[3]} /></span><div className="stat-top"><span>{s[0]}</span><Icon name="more" size={18} /></div><strong>{s[1]}</strong><small><b>{i < 3 ? '↑' : '•'}</b> {s[2]}</small><i className="card-glow" /></article>)}</div>
    <div className="dashboard-grid">
      <section className="panel activity-panel">
        <div className="panel-head"><div><h2>Recent activity</h2><p>Your latest documents and their status.</p></div><button onClick={() => go('knowledge')}>View all <Icon name="arrow" size={15} /></button></div>
        <div className="activity-list">{docs.slice(0, 4).map((d, i) => <div className="activity-row" key={d.name}><span className={`doc-icon ${d.type.toLowerCase()}`}><Icon name="document" /></span><div className="activity-name"><strong>{d.name}</strong><small>{d.size} · {d.date}</small></div><span className="status success"><i />{d.status}</span><div className="chunk"><strong>{d.chunks}</strong><small>chunks</small></div><button><Icon name="more" size={18} /></button></div>)}</div>
      </section>
      <section className="panel quick-panel">
        <div className="panel-head"><div><h2>Quick actions</h2><p>What would you like to do?</p></div></div>
        <button className="quick primary-quick" onClick={() => go('knowledge')}><span><Icon name="upload" /></span><div><strong>Upload document</strong><small>Add a new knowledge source</small></div><Icon name="arrow" /></button>
        <button className="quick" onClick={() => go('assistant')}><span><Icon name="spark" /></span><div><strong>Ask AI Assistant</strong><small>Get a grounded answer</small></div><Icon name="arrow" /></button>
        <button className="quick" onClick={() => go('knowledge')}><span><Icon name="book" /></span><div><strong>Explore knowledge</strong><small>Browse indexed content</small></div><Icon name="arrow" /></button>
      </section>
    </div>
    <section className="knowledge-banner"><div><span><Icon name="check" /></span><div><small>KNOWLEDGE HEALTH</small><h3>Your workspace is fully indexed</h3><p>All 24 documents are searchable and ready for questions.</p></div></div><div className="health-score"><strong>98%</strong><span>EXCELLENT</span></div></section>
  </div>
}

function Knowledge({ startProcessing }: { startProcessing: (name: string) => void }) {
  const input = useRef<HTMLInputElement>(null)
  const [drag, setDrag] = useState(false)
  const [filter, setFilter] = useState('')
  const [items, setItems] = useState(docs)
  const upload = (files: FileList | null) => { if (files?.[0]) startProcessing(files[0].name) }
  return <div className="page-content">
    <div className="page-title"><div><span className="breadcrumb">KNOWLEDGE BASE</span><h1>Your Knowledge Base</h1><p>Upload your documents and transform them into searchable, intelligent knowledge.</p></div></div>
    <section className={`upload-zone ${drag ? 'dragging' : ''}`} onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files) }}>
      <div className="upload-cube"><Icon name="upload" size={28} /><i /></div>
      <h2>Drag and drop your documents here.</h2><p>Turn your files into searchable knowledge in just a few moments.</p>
      <Button variant="dark" onClick={() => input.current?.click()}>Browse files</Button>
      <input ref={input} type="file" accept=".pdf,.docx,.txt" onChange={e => upload(e.target.files)} hidden />
      <small>SUPPORTED FORMATS <b>PDF</b><b>DOCX</b><b>TXT</b><span>•</span> MAX 25 MB</small>
      <div className="upload-orbit o1" /><div className="upload-orbit o2" />
    </section>
    <section className="documents">
      <div className="documents-head"><div><h2>Uploaded documents <span>{items.length}</span></h2><p>Manage the sources in your knowledge base.</p></div><div className="table-tools"><label><Icon name="search" size={17} /><input placeholder="Search documents" value={filter} onChange={e => setFilter(e.target.value)} /></label><button><Icon name="layers" size={17} /> Filter</button></div></div>
      <div className="documents-table">
        <div className="table-header"><span>DOCUMENT</span><span>STATUS</span><span>CHUNKS</span><span>UPLOADED</span><span /></div>
        {items.filter(d => d.name.toLowerCase().includes(filter.toLowerCase())).map(d => <div className="table-row" key={d.name}>
          <div className="file-cell"><span className={`doc-icon ${d.type.toLowerCase()}`}><Icon name="document" /></span><div><strong>{d.name}</strong><small>{d.type} · {d.size}</small></div></div>
          <span className="status success"><i />{d.status}</span><span className="table-chunks">{d.chunks}<small> chunks</small></span><span className="table-date">{d.date}</span>
          <div className="row-actions"><button title="Preview"><Icon name="eye" size={17} /></button><button title="Delete" onClick={() => setItems(items.filter(x => x.name !== d.name))}><Icon name="trash" size={17} /></button><button><Icon name="more" size={18} /></button></div>
        </div>)}
      </div>
    </section>
  </div>
}

const stages = ['Document Upload', 'Text Extraction', 'Text Chunking', 'Embedding Generation', 'Vector Indexing', 'Ready for Questions']

function Processing({ name, done }: { name: string; done: () => void }) {
  const [progress, setProgress] = useState(4)
  useEffect(() => {
    const timer = window.setInterval(() => setProgress(p => p >= 100 ? 100 : Math.min(100, p + Math.ceil(Math.random() * 7))), 380)
    return () => clearInterval(timer)
  }, [])
  const current = progress === 100 ? 5 : Math.min(4, Math.floor(progress / 20))
  return <div className="processing-page">
    <div className="process-top"><span className="breadcrumb">DOCUMENT PROCESSING</span><h1>{progress === 100 ? 'Your document is ready!' : 'Building trusted knowledge.'}</h1><p>{progress === 100 ? 'Your knowledge is now searchable. Start asking questions.' : 'We’re preparing your document for accurate, evidence-backed answers.'}</p></div>
    <section className="process-card">
      <div className="process-file"><span className="doc-icon pdf"><Icon name="document" /></span><div><strong>{name}</strong><small>PDF · 3.8 MB</small></div><span className={`status ${progress === 100 ? 'success' : 'processing'}`}><i />{progress === 100 ? 'Completed' : 'Processing'}</span></div>
      <div className="progress-head"><span>OVERALL PROGRESS</span><strong>{progress}%</strong></div><div className="progress-bar"><i style={{ width: `${progress}%` }} /></div>
      <div className="pipeline">{stages.map((s, i) => <div className={`pipeline-step ${i < current || progress === 100 ? 'complete' : i === current ? 'current' : ''}`} key={s}>
        <div className="pipeline-node">{i < current || progress === 100 ? <Icon name="check" size={17} /> : <span>{i + 1}</span>}</div>
        <strong>{s}</strong><small>{i < current || progress === 100 ? 'Completed' : i === current ? 'In progress...' : 'Waiting'}</small>{i < 5 && <i />}
      </div>)}</div>
      <div className="process-details">
        <div className="text-preview"><div className="detail-head"><span>EXTRACTED TEXT PREVIEW</span><b>{progress > 28 ? '8,426 words' : 'Analyzing...'}</b></div><p>“Trustworthy knowledge systems require more than accurate generation. They must provide transparent evidence trails that connect each response to its original source...”</p><div className="preview-lines"><i /><i /><i /></div></div>
        <div className="metrics"><div><span>CHUNKS GENERATED</span><strong>{Math.floor(progress * 2.48)}</strong><small>Optimized for retrieval</small></div><div><span>PROCESSING TIME</span><strong>{Math.floor(progress / 20)}:{String(progress % 60).padStart(2, '0')}</strong><small>Securely processed</small></div></div>
      </div>
      {progress === 100 && <div className="ready-callout"><div className="ready-check"><Icon name="check" size={26} /></div><div><strong>Your knowledge is now searchable.</strong><p>We created 248 indexed chunks, ready for accurate retrieval.</p></div><Button icon="arrow" onClick={done}>Ask AI</Button></div>}
    </section>
  </div>
}

const conversations = ['Q4 customer findings', 'Product strategy summary', 'Technical architecture', 'Market expansion risks']
const suggestions = ['Summarize my uploaded documents', 'Compare the key findings from two documents', 'What are the main conclusions?', 'Find information about customer retention']

function Assistant({ openInspector }: { openInspector: () => void }) {
  const [query, setQuery] = useState('')
  const [asked, setAsked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState<number | null>(null)
  const ask = (text = query) => {
    if (!text.trim()) return
    setQuery(text); setLoading(true); setAsked(true)
    window.setTimeout(() => setLoading(false), 1800)
  }
  return <div className="chat-layout">
    <aside className="chat-history">
      <Button className="chat-new" icon="plus" onClick={() => { setAsked(false); setQuery('') }}>New chat</Button>
      <label className="chat-search"><Icon name="search" size={16} /><input placeholder="Search conversations" /></label>
      <span>RECENT CONVERSATIONS</span>
      {conversations.map((c, i) => <button className={asked && i === 0 ? 'active' : ''} key={c} onClick={() => ask(c)}><Icon name="history" size={17} /><span><strong>{c}</strong><small>{i === 0 ? 'Today' : `${i + 1} days ago`}</small></span><Icon name="more" size={16} /></button>)}
      <div className="chat-history-foot"><Icon name="book" /><div><strong>24 documents connected</strong><small>1,842 searchable chunks</small></div></div>
    </aside>
    <section className="chat-main">
      <div className="chat-top"><div><span className="breadcrumb">AI ASSISTANT</span><h1>Ask your Knowledge.</h1></div><button onClick={openInspector}><Icon name="layers" size={17} /> Inspect retrieval</button></div>
      {!asked ? <div className="chat-welcome">
        <div className="assistant-mark"><Icon name="spark" size={27} /><i /></div>
        <h2>What would you like to know?</h2><p>Ask anything about your uploaded documents. TrustRAG retrieves relevant information and generates answers backed by evidence.</p>
        <div className="suggestions">{suggestions.map((s, i) => <button key={s} onClick={() => ask(s)}><span><Icon name={i === 0 ? 'document' : i === 1 ? 'layers' : i === 2 ? 'spark' : 'search'} size={18} /></span>{s}<Icon name="arrow" size={16} /></button>)}</div>
      </div> : <div className="conversation">
        <div className="user-message"><div className="avatar small">AM</div><div><span>YOU</span><p>{query}</p></div></div>
        {loading ? <div className="thinking"><div className="assistant-mark small-mark"><Icon name="spark" size={19} /></div><div><strong>{loading ? 'Searching your knowledge base...' : ''}</strong><div className="thinking-bar"><i /></div><small>Retrieving and ranking relevant document chunks</small></div></div> :
        <div className="answer-message">
          <div className="assistant-mark small-mark"><Icon name="spark" size={19} /></div>
          <div className="answer-body"><span>TRUSTRAG <b><Icon name="check" size={12} /> GROUNDED ANSWER</b></span>
            <h3>Executive summary</h3>
            <p>Your uploaded materials point to a strategy centered on <strong>durable customer value, focused expansion, and evidence-led product investment</strong>. The product strategy prioritizes improving retention within core accounts before accelerating into new market segments.<button className="citation" onClick={() => setSource(1)}>[1]</button></p>
            <h3>Key findings</h3>
            <ul><li><strong>Customer retention is the primary growth lever.</strong> Q4 research shows that teams using collaborative workflows had a 24% higher renewal rate.<button className="citation" onClick={() => setSource(2)}>[2]</button></li><li><strong>Expansion should follow product maturity.</strong> The strategy recommends entering two adjacent segments only after reliability metrics exceed the defined threshold.<button className="citation" onClick={() => setSource(3)}>[3]</button></li><li><strong>Trust is a competitive advantage.</strong> Customers consistently ranked source transparency among their top three purchase criteria.</li></ul>
            <div className="answer-actions"><button><Icon name="copy" size={16} /> Copy</button><button onClick={() => ask(query)}><Icon name="history" size={16} /> Regenerate</button><span>Was this helpful?</span><button>↑</button><button>↓</button></div>
            <div className="sources"><div className="sources-title"><div><Icon name="book" size={18} /><strong>Sources</strong><span>3 references</span></div><button onClick={openInspector}>View retrieval details <Icon name="arrow" size={15} /></button></div>
              {[
                ['Product_Strategy_2025.pdf', 'Page 12', 'The 2025 product strategy prioritizes durable retention across core accounts before pursuing adjacent market expansion.', '96%'],
                ['Customer_Research_Q4.docx', 'Page 8', 'Customers using collaborative workflows demonstrated a 24% higher renewal rate compared with single-user accounts.', '92%'],
                ['Market_Analysis.txt', 'Section 4', 'Market entry should follow achievement of the established platform reliability threshold.', '87%'],
              ].map((s, i) => <button className="source-row" onClick={() => setSource(i + 1)} key={s[0]}><b>[{i + 1}]</b><span className="doc-icon pdf"><Icon name="document" size={17} /></span><div><strong>{s[0]} <small>· {s[1]}</small></strong><p>{s[2]}</p></div><em>{s[3]} match</em><Icon name="chevron" size={16} /></button>)}
            </div>
          </div>
        </div>}
      </div>}
      <div className="composer"><div className="composer-box"><textarea value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask() } }} placeholder="Ask a question about your documents..." /><div><button><Icon name="paperclip" size={18} /> Select sources</button><button className="send-button" onClick={() => ask()} disabled={!query.trim()}><Icon name="send" size={18} /></button></div></div><small>TrustRAG can make mistakes. Verify important information using cited sources.</small></div>
    </section>
    {source && <div className="source-panel"><div className="source-panel-head"><div><span>SOURCE PREVIEW</span><strong>[{source}] Product_Strategy_2025.pdf</strong></div><button onClick={() => setSource(null)}><Icon name="x" /></button></div><div className="source-meta"><span>PAGE 12 OF 48</span><span>96% RELEVANCE</span></div><div className="paper-preview"><small>PRODUCT STRATEGY 2025</small><h3>3.2 Retention-led growth</h3><p>The 2025 product strategy prioritizes <mark>durable retention across core accounts before pursuing adjacent market expansion.</mark> This sequencing allows the organization to compound existing customer value while protecting product reliability.</p><p>Investments in collaborative workflows and transparent reporting will support this objective throughout the coming planning period.</p></div><Button variant="secondary" icon="arrow">Open full document</Button></div>}
  </div>
}

function Inspector() {
  const chunks = [
    ['#01', 'Product_Strategy_2025.pdf', 'Page 12', 'The 2025 product strategy prioritizes durable retention across core accounts before pursuing adjacent market expansion.', 96, '12 keyword matches'],
    ['#02', 'Customer_Research_Q4.docx', 'Page 8', 'Customers using collaborative workflows demonstrated a 24% higher renewal rate compared with single-user accounts.', 92, '9 keyword matches'],
    ['#03', 'Market_Analysis.txt', 'Section 4', 'Market entry should follow achievement of the established platform reliability threshold.', 87, '7 keyword matches'],
  ]
  return <div className="page-content inspector">
    <div className="page-title"><div><span className="breadcrumb">RETRIEVAL INSPECTOR</span><h1>See how every answer is built.</h1><p>Explore the evidence and ranking logic behind your AI responses.</p></div><Button variant="secondary" icon="history">View original chat</Button></div>
    <section className="question-card"><span>ORIGINAL USER QUESTION</span><p>“Summarize the key findings and strategic priorities across my uploaded documents.”</p><div><span><Icon name="clock" size={14} /> 1.8s retrieval time</span><span><Icon name="document" size={14} /> 24 sources searched</span><span><Icon name="layers" size={14} /> 1,842 chunks analyzed</span></div></section>
    <section className="retrieval-flow"><div className="flow-head"><div><h2>Retrieval pipeline</h2><p>How your question became a grounded answer.</p></div><span>HYBRID SEARCH</span></div><div className="flow-steps">
      {[
        ['01', 'User Question', 'Natural language input', 'spark'],
        ['02', 'Query Embedding', '1,536 dimensions', 'brain'],
        ['03', 'Hybrid Search', 'Semantic + keyword', 'search'],
        ['04', 'Ranked Chunks', 'Top 8 selected', 'layers'],
        ['05', 'AI Response', 'Grounded + cited', 'check'],
      ].map((f, i) => <div className="flow-step" key={f[0]}><span>{f[0]}</span><div><Icon name={f[3] as IconName} /></div><strong>{f[1]}</strong><small>{f[2]}</small>{i < 4 && <i><Icon name="chevron" size={15} /></i>}</div>)}
    </div></section>
    <section className="ranked"><div className="ranked-head"><div><h2>Ranked document chunks</h2><p>Results ordered by combined semantic and keyword relevance.</p></div><div><span><i className="semantic" /> Semantic score</span><span><i className="keyword" /> Keyword match</span></div></div>
      {chunks.map((c, i) => <article className="chunk-card" key={c[0]}><div className="chunk-rank"><span>{c[0]}</span><small>RANK</small></div><div className="chunk-main"><div className="chunk-source"><span className="doc-icon pdf"><Icon name="document" size={18} /></span><strong>{c[1]}</strong><small>{c[2]}</small><span className="status success"><i />Selected</span></div><p>“{c[3]}”</p><div className="matching"><span>customer retention</span><span>strategic priority</span><span>market expansion</span></div></div><div className="score-box"><strong>{c[4]}%</strong><span>RELEVANCE</span><div className="scorebar"><i style={{ width: `${c[4]}%` }} /></div><small>{c[5]}</small></div></article>)}
    </section>
    <section className="ranking-note"><Icon name="spark" /><div><strong>Why these results?</strong><p>TrustRAG combines semantic similarity (70%) with keyword relevance (30%), then applies source quality and recency signals to produce the final ranking.</p></div><button>Learn about retrieval <Icon name="arrow" size={15} /></button></section>
  </div>
}

function Placeholder({ view }: { view: View }) {
  return <div className="page-content placeholder-page"><div className="assistant-mark"><Icon name={view === 'settings' ? 'settings' : 'history'} /></div><span className="breadcrumb">{view.toUpperCase()}</span><h1>{view === 'settings' ? 'Workspace settings' : 'Your conversation history'}</h1><p>{view === 'settings' ? 'Manage your profile, team, data controls, and model preferences.' : 'Revisit every question, answer, and cited source in one place.'}</p><Button icon="arrow">{view === 'settings' ? 'Manage profile' : 'Start a new chat'}</Button></div>
}

function Dashboard({ logout }: { logout: () => void }) {
  const [view, setView] = useState<View>('overview')
  const [sideOpen, setSideOpen] = useState(false)
  const [processingName, setProcessingName] = useState('Product_Strategy_2025.pdf')
  const navigate = (v: View) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const title = nav.find(n => n.id === view)?.label || 'Document Processing'
  return <main className="dashboard">
    <Sidebar view={view} setView={navigate} logout={logout} open={sideOpen} close={() => setSideOpen(false)} />
    <div className="app-main"><AppHeader title={title} menu={() => setSideOpen(true)} />
      {view === 'overview' && <Overview go={navigate} />}
      {view === 'knowledge' && <Knowledge startProcessing={name => { setProcessingName(name); navigate('processing') }} />}
      {view === 'processing' && <Processing name={processingName} done={() => navigate('assistant')} />}
      {view === 'assistant' && <Assistant openInspector={() => navigate('inspector')} />}
      {view === 'inspector' && <Inspector />}
      {(view === 'history' || view === 'settings') && <Placeholder view={view} />}
    </div>
  </main>
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const go = (p: Page) => { setPage(p); window.scrollTo(0, 0) }
  if (page === 'home') return <Landing go={go} />
  if (page === 'login' || page === 'signup') return <Auth mode={page} go={go} enter={() => go('app')} />
  return <Dashboard logout={() => go('home')} />
}
