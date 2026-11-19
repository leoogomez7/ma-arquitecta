import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Instagram, MessageSquare, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import logo from '@/assets/ma-arquitecta-logo.jpg.asset.json';
import { projects, filterProjects, referenceNotice, horizon, interior, patio, type Project } from '@/lib/portfolio';
import { contactConfig, createConsultationLink } from '@/lib/contact';

const nav = [
  {label:'INICIO',to:'/'}, {label:'ESTUDIO',to:'/estudio'}, {label:'VIVIENDAS',to:'/viviendas'},
  {label:'REFACCIONES',to:'/refacciones'}, {label:'PROYECTOS',to:'/proyectos'}, {label:'CONTACTO',to:'/contacto'},
] as const;

export function Reveal({children, className = '', delay = 0}: {children:ReactNode; className?:string; delay?:number}) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{opacity:0,y:reduced?0:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduced?.01:.75,delay}}>{children}</motion.div>;
}

function Brand() {
  return <Link to="/" className="brand" aria-label="MA Arquitecta — Inicio"><img src={logo.url} alt="Logo original MA Arquitecta" width={68} height={68}/><span className="brand-name">MA Arquitecta<span className="brand-sub">Arquitectura & interiorismo</span></span></Link>;
}

function WhatsAppIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.8a8.5 8.5 0 1 1 16.1-4.1Z"/><path d="M8 7.5c-.8.7-.7 2 .2 3.7 1.2 2.3 3.4 4 5.4 4.2 1.1.1 2-.6 2.1-1.5l-2.5-1.2-1 1c-1.4-.7-2.6-1.8-3.3-3.2l.9-.9L8.8 7.4Z"/></svg>;
}

export function SiteShell({children}: {children:ReactNode}) {
  const pathname = useLocation({select:l=>l.pathname});
  const [scrolled,setScrolled] = useState(false);
  const [menu,setMenu] = useState(false);
  const [missing,setMissing] = useState<string|null>(null);
  useEffect(()=>{ const onScroll=()=>setScrolled(window.scrollY>45); onScroll(); window.addEventListener('scroll',onScroll,{passive:true}); return ()=>window.removeEventListener('scroll',onScroll); },[]);
  useEffect(()=>{ setMenu(false); },[pathname]);
  useEffect(()=>{ if (!menu) return; const previous=document.body.style.overflow; document.body.style.overflow='hidden'; const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setMenu(false);}; window.addEventListener('keydown',close); return ()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',close);}; },[menu]);
  const social=(kind:'WhatsApp'|'Instagram')=>{const value=kind==='WhatsApp'?contactConfig.whatsapp:contactConfig.instagram; if(value)window.open(kind==='WhatsApp'?`https://wa.me/${value}`:value,'_blank','noopener,noreferrer');else setMissing(kind);};
  return <>
    <header className={`site-header ${scrolled||pathname!=='/'||menu?'scrolled':''}`}><div className="page-width header-inner"><Brand/><nav className="desktop-nav" aria-label="Navegación principal">{nav.map(n=><Link key={n.to} to={n.to} className={`${pathname===n.to?'active ':''}${n.to==='/contacto'?'contact-nav':''}`}>{n.label}</Link>)}</nav><Button variant="editorial" size="icon" className="mobile-toggle" aria-label={menu?'Cerrar menú':'Abrir menú'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</Button></div></header>
    <AnimatePresence>{menu&&<motion.nav className="mobile-menu" aria-label="Navegación móvil" initial={{opacity:0,y:-15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}}>{nav.map((n,i)=><motion.div key={n.to} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*.05}}><Link to={n.to} className={pathname===n.to?'active':''} onClick={()=>setMenu(false)}>{n.label}</Link></motion.div>)}</motion.nav>}</AnimatePresence>
    <main>{children}</main>
    <aside className="floating-contact" aria-label="Contactos rápidos">
      <Button variant="floating" aria-label="WhatsApp" title="WhatsApp" onClick={()=>social('WhatsApp')}><WhatsAppIcon/></Button>
      <Button variant="floating" aria-label="Instagram" title="Instagram" onClick={()=>social('Instagram')}><Instagram size={18}/></Button>
      {pathname==='/'||pathname==='/contacto'?<Button variant="floating" className="consult" aria-label="Consultas" title="Consultas" onClick={()=>document.getElementById('consulta')?.scrollIntoView({behavior:'smooth'})}><MessageSquare size={18}/></Button>:<Button variant="floating" className="consult" asChild><Link to="/contacto" aria-label="Consultas" title="Consultas"><MessageSquare size={18}/></Link></Button>}
    </aside>
    <footer className="site-footer"><div className="page-width"><div className="footer-top"><Brand/><p>Arquitectura e interiorismo.<br/>Diseñamos espacios con identidad.</p><div className="footer-links"><Link to="/estudio">Estudio</Link><Link to="/proyectos">Proyectos</Link><Link to="/contacto">Contacto</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MA Arquitecta. Todos los derechos reservados.</span><div className="flex gap-4"><Button variant="editorial" aria-label="Instagram del estudio" onClick={()=>social('Instagram')}><Instagram/></Button><Button variant="editorial" aria-label="WhatsApp del estudio" onClick={()=>social('WhatsApp')}><WhatsAppIcon/></Button><Button variant="editorial" asChild><Link to="/contacto" aria-label="Email y consultas"><Mail/></Link></Button></div></div></div></footer>
    <Dialog open={missing!==null} onOpenChange={open=>{if(!open)setMissing(null);}}><DialogContent><DialogTitle>{missing} del estudio</DialogTitle><DialogDescription>El contacto oficial todavía no fue proporcionado. Este acceso se activará cuando MA Arquitecta confirme sus datos.</DialogDescription><Button variant="architectural" asChild><Link to="/contacto" onClick={()=>setMissing(null)}>IR A CONTACTO <ArrowUpRight/></Link></Button></DialogContent></Dialog>
  </>;
}

export function Hero() {
  const reduced=useReducedMotion();
  return <><section className="hero" aria-label="MA Arquitecta — Arquitectura e interiorismo"><img className="hero-image" src={horizon} alt="Referencia visual de vivienda contemporánea de hormigón y vidrio junto a un espejo de agua" width={1920} height={1088} fetchPriority="high"/><div className="page-width hero-content"><motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8}} className="eyebrow">ARQUITECTURA · INTERIORISMO</motion.div><motion.h1 initial={{opacity:0,y:reduced?0:22}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.15}}>Espacios que inspiran.<br/><em>Arquitectura que</em><br/><em>trasciende.</em></motion.h1><motion.p className="hero-description" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.4}}>Diseñamos espacios únicos, combinando creatividad, funcionalidad y una mirada arquitectónica contemporánea.</motion.p><motion.div className="hero-actions" initial={{opacity:0,y:reduced?0:12}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.6}}><Button variant="architectural" asChild><Link to="/proyectos">EXPLORAR PROYECTOS <ArrowUpRight/></Link></Button><Button variant="transparent" asChild><Link to="/estudio">CONOCER EL ESTUDIO <ArrowUpRight/></Link></Button></motion.div></div><div className="page-width hero-bottom"><a href="#el-estudio" className="scroll-link"><span className="scroll-line"/>DESCUBRIR <ArrowDown size={12}/></a><span className="hero-project-caption">LA FORMA DE HABITAR, REIMAGINADA.</span><div className="hero-index"><b className="text-primary">01</b><span/>03</div></div></section><div className="intro-strip"><div className="page-width"><p>Una mirada sensible. Una arquitectura con identidad.</p><div className="disciplines"><span>ARQUITECTURA</span><span>INTERIORISMO</span><span>DISEÑO INTEGRAL</span></div></div></div></>;
}

export function StudioSection({full=false}:{full?:boolean}) {
  return <section className="section paper-section" id="el-estudio"><div className="page-width studio-grid"><Reveal><img className="studio-image" src={interior} alt="Referencia de interior contemporáneo, luz natural y materiales nobles" width={1440} height={1088} loading="lazy"/><p className="studio-caption">MATERIALIDAD, LUZ Y ESPACIO · IMAGEN CONCEPTUAL</p></Reveal><Reveal className="studio-text" delay={.15}><div className="eyebrow">01 / EL ESTUDIO</div><h2 className="section-title">Una forma de mirar.<br/><em>Una manera de habitar.</em></h2><p className="section-copy">“Creemos en una arquitectura que va más allá de construir espacios: crea experiencias.”</p><p className="section-copy mt-5">Diseñamos espacios únicos, combinando creatividad, funcionalidad y una mirada arquitectónica contemporánea. Cada idea comienza con escuchar; cada espacio, con entender cómo querés habitarlo.</p>{full?<><div className="mt-8 border-t border-primary pt-6"><h3 className="text-3xl">MA Arquitecta</h3><p className="section-copy mt-3">La presentación personal, formación y trayectoria del estudio se incorporarán con la información proporcionada por su titular.</p></div><Button variant="editorial" asChild><Link to="/contacto">CONVERSEMOS SOBRE TU PROYECTO <ArrowUpRight/></Link></Button></>:<Button variant="editorial" asChild><Link to="/estudio">CONOCER NUESTRA MIRADA <ArrowUpRight/></Link></Button>}</Reveal></div></section>;
}

export function ProjectItem({project,index=0}:{project:Project;index?:number}) {
  return <Reveal className="project-item" delay={index*.07}><Link className="project-image-link" to="/proyectos/$slug" params={{slug:project.slug}} aria-label={`Ver proyecto ${project.name}`}><img src={project.image} alt={`${project.name} — referencia arquitectónica conceptual`} width={1440} height={1088} loading="lazy"/><span className="image-arrow"><ArrowUpRight size={20}/></span></Link><div className="project-info"><div><h3><Link to="/proyectos/$slug" params={{slug:project.slug}}>{project.name}</Link></h3><p>{project.category.toUpperCase()} · REFERENCIA CONCEPTUAL</p></div><div className="project-meta">MA ARQUITECTA<br/><span className="inline-block mt-2">DISEÑO & ESPACIO</span></div></div></Reveal>;
}

export function HomesSection({full=false}:{full?:boolean}) {
  return <section className="section"><div className="page-width"><Reveal className="section-heading"><div><div className="eyebrow">02 / VIVIENDAS</div><h2 className="section-title">Arquitectura para <em>habitar.</em></h2></div>{full?<p className="section-copy">Cada vivienda es una respuesta única a las necesidades de quienes la habitan.</p>:<Button variant="editorial" asChild><Link to="/viviendas">EXPLORAR VIVIENDAS <ArrowUpRight/></Link></Button>}</Reveal><div className="project-grid">{projects.filter(p=>p.category==='Viviendas').slice(0,full?3:2).map((p,i)=><ProjectItem key={p.slug} project={p} index={i}/>)}</div><p className="reference-note">{referenceNotice}</p></div></section>;
}

export function RenovationSection({full=false}:{full?:boolean}) {
  return <section className="section paper-section"><div className="page-width renovation-grid"><Reveal><Link to="/proyectos/$slug" params={{slug:'interior-patio'}}><img src={interior} alt="Propuesta conceptual de renovación interior con madera, travertino y luz natural" loading="lazy" width={1440} height={1088}/></Link></Reveal><Reveal delay={.15}><div className="eyebrow">03 / REFACCIONES & AMPLIACIONES</div><h2 className="section-title">Nuevas formas.<br/><em>La misma esencia.</em></h2><p className="section-copy">Transformamos espacios existentes en nuevas oportunidades para habitar.</p><p className="section-copy">Reformas integrales, ampliaciones e intervenciones interiores. Una mirada atenta a lo que existe y a todo lo que puede llegar a ser.</p><Button variant="editorial" asChild><Link to={full?'/proyectos/$slug':'/refacciones'} params={full?{slug:'interior-patio'}:{}}>EXPLORAR {full?'LA PROPUESTA':'REFACCIONES'} <ArrowUpRight/></Link></Button><p className="reference-note">Imagen de referencia conceptual. Las obras y fotografías de antes y después se incorporarán al recibir el material original.</p></Reveal></div></section>;
}

export function MethodSection() {
  const steps=[['ESCUCHAR','Comprender las necesidades y expectativas del cliente.'],['DISEÑAR','Crear propuestas arquitectónicas funcionales y estéticas.'],['PROYECTAR','Desarrollar soluciones espaciales y técnicas.'],['CONCRETAR','Acompañar la materialización del proyecto según el alcance contratado.']];
  return <section className="section"><div className="page-width"><Reveal><div className="eyebrow">04 / NUESTRA METODOLOGÍA</div><h2 className="section-title">Del concepto <em>a la realidad.</em></h2></Reveal><div className="method-grid">{steps.map(([title,text],i)=><Reveal className="method-step" key={title} delay={i*.1}><span className="method-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>;
}

export function ContactSection() {
  const [status,setStatus]=useState('');
  return <section className="section" id="consulta"><div className="page-width contact-grid"><Reveal><div className="eyebrow">05 / CONTACTO</div><h2 className="section-title">Tu próximo proyecto<br/>comienza con <em>una idea.</em></h2><p className="section-copy">Contanos qué estás imaginando. Estamos para ayudarte a hacerlo realidad.</p><p className="reference-note">La recepción de consultas se activará al confirmar el email oficial del estudio.</p></Reveal><Reveal delay={.1}><form className="contact-form" onSubmit={e=>{e.preventDefault(); const data=new FormData(e.currentTarget);const values=Object.fromEntries([...data.entries()].map(([k,v])=>[k,String(v)]));const link=createConsultationLink(contactConfig.email,values);if(link){window.location.href=link;setStatus('Se abrió tu aplicación de correo con la consulta. Revisá el mensaje y enviálo desde allí.');}else setStatus('La consulta no fue enviada. Falta confirmar el email del estudio para habilitar la recepción.');}}>
    <div className="field"><label htmlFor="name">Nombre y apellido *</label><input id="name" name="Nombre y apellido" autoComplete="name" required minLength={3} placeholder="Tu nombre"/></div>
    <div className="field"><label htmlFor="email">Email *</label><input id="email" name="Email" type="email" autoComplete="email" required placeholder="tu@email.com"/></div>
    <div className="field"><label htmlFor="phone">Teléfono</label><input id="phone" name="Teléfono" type="tel" autoComplete="tel" placeholder="Código de área y número"/></div>
    <div className="field"><label htmlFor="type">Tipo de proyecto *</label><select id="type" name="Tipo de proyecto" required defaultValue=""><option value="" disabled>Seleccionar</option><option>Vivienda nueva</option><option>Refacción / ampliación</option><option>Interiorismo</option><option>Otro proyecto</option></select></div>
    <div className="field"><label htmlFor="location">Ubicación</label><input id="location" name="Ubicación" placeholder="Ciudad o localidad"/></div>
    <div className="field"><label htmlFor="area">Superficie aproximada (m²)</label><input id="area" name="Superficie aproximada" type="number" min="1" placeholder="m²"/></div>
    <div className="field full-field"><label htmlFor="message">Mensaje *</label><textarea id="message" name="Mensaje" required minLength={10} placeholder="Contanos sobre tu idea…"/></div>
    <div className="full-field"><Button type="submit" variant="architectural">ENVIAR CONSULTA <ArrowUpRight/></Button></div>
    {status&&<p role="status" className="form-status full-field">{status}</p>}
  </form></Reveal></div></section>;
}

export function ProjectsPage() {
  const [filter,setFilter]=useState('Todos');
  const items=filterProjects(filter);
  return <SiteShell><section className="inner-page section"><div className="page-width"><Reveal><div className="eyebrow">PORTFOLIO / PROYECTOS</div><h1 className="page-title">Ideas que se convierten<br/>en <em>espacios.</em></h1><p className="section-copy page-description">Viviendas, anteproyectos y propuestas en desarrollo. Una exploración de las posibilidades de la arquitectura.</p></Reveal><div className="filters" role="group" aria-label="Filtrar proyectos">{['Todos','Viviendas','Anteproyectos','En desarrollo'].map(f=><Button key={f} variant="editorial" className={`filter ${filter===f?'selected':''}`} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f.toUpperCase()}</Button>)}</div><div className="project-grid" key={filter}>{items.map((p,i)=><ProjectItem key={p.slug} project={p} index={i}/>)}</div><p className="reference-note">{referenceNotice}</p></div></section><ContactSection/></SiteShell>;
}

export function ProjectDetail({project}:{project:Project}) {
  const [slide,setSlide]=useState<number|null>(null);
  const gallery=project.gallery;
  useEffect(()=>{
    if(slide===null)return;
    const old=document.body.style.overflow;document.body.style.overflow='hidden';
    const onKey=(e:KeyboardEvent)=>{if(e.key==='ArrowRight')setSlide(s=>s===null?null:(s+1)%gallery.length);if(e.key==='ArrowLeft')setSlide(s=>s===null?null:(s-1+gallery.length)%gallery.length);};
    window.addEventListener('keydown',onKey);return ()=>{document.body.style.overflow=old;window.removeEventListener('keydown',onKey);};
  },[slide,gallery.length]);
  return <SiteShell><article className="inner-page section"><div className="page-width"><Button variant="editorial" asChild><Link to="/proyectos"><ChevronLeft/> VOLVER A PROYECTOS</Link></Button><h1 className="page-title">{project.name}</h1><p className="eyebrow mt-6 mb-10">{project.category.toUpperCase()} · PROPUESTA CONCEPTUAL</p></div><img className="detail-cover" src={project.image} alt={`${project.name} — imagen conceptual`} width={1920} height={1088}/><div className="page-width"><dl className="detail-data">{[['UBICACIÓN','A confirmar'],['SUPERFICIE','A confirmar'],['AÑO','A confirmar'],['TIPOLOGÍA',project.category]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><Reveal className="studio-grid"><h2 className="section-title">La esencia <em>del espacio.</em></h2><div><p className="section-copy">{project.description}</p><p className="section-copy mt-5">Materialidad propuesta: {project.materials}.</p><p className="reference-note">{referenceNotice} Ubicación, superficie y año pendientes de información real.</p></div></Reveal><div className="detail-gallery">{gallery.map((image,i)=><Button key={image} variant="editorial" className="gallery-button" aria-label={`Ampliar imagen ${i+1} de ${project.name}`} onClick={()=>setSlide(i)}><img src={image} alt={`${project.name}, vista conceptual ${i+1}`} width={1440} height={1088} loading="lazy"/></Button>)}</div></div></article><ContactSection/>
    <Dialog open={slide!==null} onOpenChange={open=>{if(!open)setSlide(null);}}><DialogContent fullscreen showCloseButton={false}><DialogTitle className="sr-only">Galería de {project.name}</DialogTitle><DialogDescription className="sr-only">Imágenes conceptuales ampliadas</DialogDescription>{slide!==null&&<div className="lightbox"><Button variant="floating" className="lightbox-close" aria-label="Cerrar galería" onClick={()=>setSlide(null)}><X/></Button><Button variant="floating" className="lightbox-prev" aria-label="Imagen anterior" onClick={()=>setSlide((slide-1+gallery.length)%gallery.length)}><ChevronLeft/></Button><img src={gallery[slide]} alt={`${project.name}, vista ${slide+1}`}/><Button variant="floating" className="lightbox-next" aria-label="Imagen siguiente" onClick={()=>setSlide((slide+1)%gallery.length)}><ChevronRight/></Button><div className="lightbox-count">{slide+1} / {gallery.length}</div></div>}</DialogContent></Dialog>
  </SiteShell>;
}