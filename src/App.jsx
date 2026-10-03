import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SolarSystem from "./SolarSystem";
gsap.registerPlugin(ScrollTrigger);

const specs=[["Движок","Three.js / WebGL"],["Платформы","PC / Android"],["Жанр","Space Sim / Arcade"],["Статус","Alpha"],["Запуск","Browser / HTML"],["Технологии","3D / LOD / Bloom"]];
const progress=[["Код",70],["3D-сцена",82],["UI / UX",76],["Оптимизация",68]];
const gallery=[["01","СОЛНЕЧНАЯ СИСТЕМА","8 планет"],["02","ОРБИТАЛЬНЫЙ СЛОЙ","реальное время"],["03","ИГРОВОЙ ПРОЦЕСС","кристаллы / астероиды"]];

function Section({id,number,title,children}){return <section id={id} className="section"><div className="section-inner"><div className="section-number">{number}</div><h2>{title}</h2>{children}</div></section>}
function SceneLoader(){return <Html center><div className="scene-loader">ЗАГРУЗКА 3D</div></Html>}

export default function App(){
 const root=useRef(null);
 useLayoutEffect(()=>{const ctx=gsap.context(()=>{
   gsap.from(".hero-kicker,.hero-title,.hero-subtitle,.hero-actions",{y:35,opacity:0,duration:.9,stagger:.08,ease:"power3.out"});
   gsap.utils.toArray(".reveal").forEach(el=>gsap.fromTo(el,{y:40,opacity:0},{y:0,opacity:1,duration:.8,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 84%",once:true}}));
 },root);return()=>ctx.revert()},[]);
 return <div ref={root} className="site">
  <div className="scene"><Canvas dpr={[1,1.6]} camera={{position:[0,8,27],fov:46,near:.1,far:1800}} gl={{antialias:true,powerPreference:"high-performance"}}><Suspense fallback={<SceneLoader/>}><SolarSystem/><Preload all/></Suspense></Canvas></div>
  <div className="scene-vignette"/><div className="scanlines"/>
  <header className="header"><a className="brand" href="#home">SPACE <span>-</span> GAME</a><nav><a href="#home">Главная</a><a href="#development">Разработка</a><a href="#gallery">Галерея</a><a href="#download">Скачать</a></nav><a className="header-play" href="game/index.html">PLAY</a></header>
  <main>
   <section id="home" className="hero"><div className="hero-content"><div className="hero-kicker">SPACE SIM / ALPHA / WEBGL</div><h1 className="hero-title">SPACE <span>- GAME</span></h1><p className="hero-subtitle">ИССЛЕДУЙ ГАЛАКТИКУ</p><div className="hero-actions"><a className="button primary" href="game/index.html">PLAY IN BROWSER</a><a className="button" href="game/index.html" download="space-game.html">DOWNLOAD GAME</a></div></div><div className="hero-data"><span>3D REALTIME</span><span>PC / ANDROID</span><span>01 / 05</span></div></section>
   <Section id="development" number="01 / РАЗРАБОТКА" title="ХАРАКТЕРИСТИКИ"><div className="spec-layout reveal"><div className="spec-table">{specs.map(([a,b])=><div className="spec-row" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div><div className="progress-panel"><div className="progress-head"><span>ГОТОВНОСТЬ</span><strong>70%</strong></div>{progress.map(([a,b])=><div className="progress-row" key={a}><div><span>{a}</span><b>{b}%</b></div><i><em style={{width:b+"%"}}/></i></div>)}</div></div></Section>
   <Section id="gallery" number="02 / ГАЛЕРЕЯ" title="ВИЗУАЛ"><div className="gallery-grid reveal">{gallery.map(([n,t,m],i)=><a className={"gallery-item gallery-"+i} href="game/index.html" key={t}><div className="gallery-orbit"/><div className="gallery-planet"/><div className="gallery-copy"><span>{n}</span><strong>{t}</strong><small>{m}</small></div></a>)}</div></Section>
   <Section id="technology" number="03 / ТЕХНОЛОГИИ" title="СИСТЕМА"><div className="tech-grid reveal">{[["3D","React Three Fiber"],["RENDER","Three.js / WebGL"],["FX","Bloom / Vignette"],["LOD","Detailed geometry"],["ANIMATION","GSAP + scroll"],["INPUT","Keyboard + Touch"]].map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></Section>
   <section id="download" className="download"><div className="section-inner reveal"><div className="section-number">04 / ЗАПУСК</div><h2>ИГРА<br/><span>ГОТОВА</span></h2><p>Браузерная версия запускается сразу. HTML-файл игры можно сохранить отдельно.</p><div className="hero-actions"><a className="button primary" href="game/index.html">ЗАПУСТИТЬ</a><a className="button" href="game/index.html" download="space-game.html">СКАЧАТЬ HTML</a></div></div></section>
  </main>
  <footer><span>SPACE - GAME</span><span>THREE.JS / WEBGL / REACT</span><span>2026</span></footer>
 </div>
}