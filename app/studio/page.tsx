"use client";
import {useEffect,useState} from "react";
export default function Studio(){
 const [world,setWorld]=useState("");
 useEffect(()=>{const w=new URLSearchParams(window.location.search).get("world");if(w)setWorld(w)},[]);
 const current=world?world.charAt(0).toUpperCase()+world.slice(1):"Creative Studio";
 return <main className="studio-shell">
  <header className="studio-header">
   <a className="studio-brand" href="/">YU<span>G</span>A</a>
   <div className="studio-heading"><span className="studio-eyebrow">YUGA / WORKSPACE</span><strong>{current}</strong></div>
   <div className="studio-header-actions"><span className="studio-live"><i/> ENGINE ONLINE</span><a href="/creations">My creations ↗</a></div>
  </header>
  <div className="studio-subnav"><a href="/">← Back to universe</a><span>CREATE <b>·</b> REFINE <b>·</b> COLLECT</span><a href="/explore">Inspiration ↗</a></div>
  <section className="studio-intro"><div><div className="studio-eyebrow">YOUR CREATIVE SPACE</div><h1>Make something<br/><em>extraordinary.</em></h1><p>Turn your imagination into visual reality. Choose a world, shape your idea, and let YUGA bring it to life.</p></div><div className="studio-tip"><span>✦ CREATIVE NOTE</span><p>Specific details create stronger designs. Describe materials, lighting, mood, and perspective.</p></div></section>
  <div className="studio-frame-wrap"><div className="studio-frame-top"><span><i/> GENERATION WORKSPACE</span><span className="studio-frame-tag">{world?world.toUpperCase()+" WORLD":"YUGA AI STUDIO"}</span></div><iframe title="YUGA AI Design Generator" src={"/legacy-site.html"+(world?"?world="+encodeURIComponent(world):"")} className="studio-frame"/><noscript><p>Enable JavaScript to use YUGA Studio.</p></noscript></div>
  <footer className="studio-footer"><span>YUGA — THE UNIVERSE OF DESIGN</span><span>DESIGNED FOR IMAGINATION</span><a href="/creations">View collection ↗</a></footer>
  <style jsx>{`
   .studio-shell{min-height:100vh;background:#050505;color:#f7f3ea;font-family:Arial,sans-serif;--gold:#d6b56d;--muted:#999}
   .studio-header{height:76px;padding:0 clamp(16px,4vw,56px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(214,181,109,.18);position:sticky;top:0;z-index:20;background:rgba(5,5,5,.94);backdrop-filter:blur(16px)}
   .studio-brand{font:600 24px Georgia,serif;letter-spacing:.18em;color:#f5f0e5;text-decoration:none}.studio-brand span{color:var(--gold)}
   .studio-heading{display:flex;flex-direction:column;gap:5px;text-align:center}.studio-eyebrow{font-size:9px;letter-spacing:.22em;color:var(--gold)}.studio-heading strong{font:20px Georgia,serif;font-weight:400}
   .studio-header-actions{display:flex;align-items:center;gap:22px;font-size:11px}.studio-header-actions a,.studio-subnav a,.studio-footer a{color:#c7c2b7;text-decoration:none}.studio-live,.studio-frame-top span{font-size:9px;letter-spacing:.14em;color:#aaa}.studio-live i,.studio-frame-top i{display:inline-block;width:6px;height:6px;border-radius:50%;background:#9dc58c;margin-right:7px;box-shadow:0 0 10px #9dc58c}
   .studio-subnav{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(16px,4vw,56px);font-size:10px;letter-spacing:.12em;border-bottom:1px solid rgba(255,255,255,.06)}.studio-subnav span{color:#666}.studio-subnav b{color:var(--gold);padding:0 8px}
   .studio-intro{max-width:1320px;margin:auto;padding:clamp(28px,5vw,65px) 24px 36px;display:flex;align-items:end;justify-content:space-between;gap:30px}.studio-intro h1{font:500 clamp(38px,6vw,72px)/1.02 Georgia,serif;letter-spacing:-.04em;margin:15px 0}.studio-intro h1 em{font-weight:400;color:var(--gold)}.studio-intro p{max-width:490px;font-size:13px;line-height:1.8;color:#aaa}.studio-tip{max-width:290px;border-left:1px solid var(--gold);padding:10px 0 10px 18px;margin-bottom:8px}.studio-tip span{font-size:9px;letter-spacing:.16em;color:var(--gold)}.studio-tip p{font-size:11px;line-height:1.7;color:#888;margin:10px 0 0}
   .studio-frame-wrap{margin:0 clamp(10px,2vw,28px);border:1px solid rgba(214,181,109,.2);background:#000;box-shadow:0 20px 80px rgba(0,0,0,.5)}.studio-frame-top{height:42px;padding:0 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(214,181,109,.13);background:#090909}.studio-frame-tag{color:var(--gold)!important}.studio-frame{display:block;width:100%;height:calc(100vh - 180px);min-height:760px;border:0;background:#000}
   .studio-footer{display:flex;justify-content:space-between;gap:14px;padding:24px clamp(16px,4vw,56px);color:#666;font-size:9px;letter-spacing:.12em}
   @media(max-width:650px){.studio-header{height:62px}.studio-brand{font-size:20px}.studio-heading{display:none}.studio-header-actions{gap:10px;font-size:10px}.studio-live{font-size:8px}.studio-subnav{font-size:8px;letter-spacing:.06em;padding:12px 14px}.studio-subnav span{display:none}.studio-intro{display:block;padding:30px 16px 24px}.studio-intro h1{font-size:45px}.studio-tip{margin-top:20px;max-width:none}.studio-frame-wrap{margin:0 6px}.studio-frame-top{height:36px;padding:0 10px}.studio-frame-top span{font-size:8px}.studio-frame{height:calc(100dvh - 110px);min-height:700px}.studio-footer{flex-direction:column;padding:22px 16px}}
  `}</style>
 </main>
}