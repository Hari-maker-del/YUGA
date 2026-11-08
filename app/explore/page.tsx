"use client";

import { useEffect, useMemo, useState } from "react";
import MobileNav from "../components/MobileNav";

type Inspiration = { id: number; title: string; world: string; style: string; creator: string; image: string; height: number; };

const inspirations: Inspiration[] = [
  { id: 1, title: "Sculpted in Silence", world: "Architecture", style: "Minimal", creator: "Studio Forma", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85", height: 440 },
  { id: 2, title: "Golden Hour Atelier", world: "Fashion", style: "Editorial", creator: "Maison Noire", image: "https://images.unsplash.com/photo-1539101638881-7f5a6e5a4f20?auto=format&fit=crop&w=1000&q=85", height: 540 },
  { id: 3, title: "Object No. 08", world: "Accessories", style: "Luxury", creator: "Object Lab", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85", height: 350 },
  { id: 4, title: "A Quiet Ritual", world: "Interiors", style: "Organic", creator: "Atelier Nami", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85", height: 480 },
  { id: 5, title: "Future Form", world: "Architecture", style: "Futuristic", creator: "YUGA Collective", image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85", height: 390 },
  { id: 6, title: "The Modern Muse", world: "Fashion", style: "Minimal", creator: "Studio 27", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85", height: 510 },
  { id: 7, title: "Soft Geometry", world: "Interiors", style: "Minimal", creator: "Form & Light", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85", height: 370 },
  { id: 8, title: "Golden Artifact", world: "Accessories", style: "Editorial", creator: "Aurum Studio", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85", height: 460 },
  { id: 9, title: "Concrete Poetry", world: "Architecture", style: "Organic", creator: "Northline", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=85", height: 420 },
  { id: 10, title: "After the Rain", world: "Interiors", style: "Luxury", creator: "Casa Atelier", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85", height: 520 },
  { id: 11, title: "Chromatic Motion", world: "Fashion", style: "Futuristic", creator: "Motion House", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85", height: 380 },
  { id: 12, title: "The Everyday Icon", world: "Accessories", style: "Minimal", creator: "Forma Objects", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85", height: 400 },
];

const worlds = ["All worlds", "Fashion", "Architecture", "Accessories", "Interiors"];
const styles = ["All styles", "Minimal", "Luxury", "Editorial", "Organic", "Futuristic"];

export default function Explore() {
  const [world, setWorld] = useState("All worlds");
  const [style, setStyle] = useState("All styles");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);

  useEffect(() => {
    try { setSaved(JSON.parse(localStorage.getItem("yuga-explore-saved") || "[]")); } catch { setSaved([]); }
  }, []);

  const toggleSave = (id: number) => {
    setSaved(current => {
      const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
      localStorage.setItem("yuga-explore-saved", JSON.stringify(next));
      return next;
    });
  };

  const filtered = useMemo(() => inspirations.filter(item =>
    (world === "All worlds" || item.world === world) &&
    (style === "All styles" || item.style === style) &&
    (!onlySaved || saved.includes(item.id)) &&
    (item.title + " " + item.world + " " + item.style + " " + item.creator).toLowerCase().includes(query.toLowerCase())
  ), [world, style, query, onlySaved, saved]);

  return (
    <main className="explorePage">
      <header className="topbar shell exploreNav">
        <a className="brand" href="/">YUGA<span>.</span></a>
        <nav className="navlinks"><a href="/">Universe</a><a href="/explore" className="active">Explore</a><a href="/creations">Creations</a><a href="/pricing">Membership</a></nav>
        <a className="navbutton" href="/studio">Enter Studio ↗</a>
      </header>

      <section className="exploreHero shell">
        <div className="exploreEyebrow"><span className="eyebrowLine" /> THE YUGA INSPIRATION INDEX / 001</div>
        <div className="exploreHeroRow">
          <div><h1>Ideas are<br/><em>infinite.</em></h1><p>A curated universe of visual ideas, forms, materials, and possibilities. Find your spark. Make it yours.</p></div>
          <div className="heroSideNote"><span>12</span><small>CURATED<br/>DIRECTIONS</small><i>✳</i></div>
        </div>
        <div className="exploreHeroBottom"><span>SCROLL TO DISCOVER</span><span>DESIGN · CULTURE · POSSIBILITY</span></div>
      </section>

      <section className="exploreContent shell">
        <div className="exploreControls">
          <div className="filterGroup"><span className="filterLabel">WORLD</span>{worlds.map(x=><button key={x} className={world===x?"filterChip selected":"filterChip"} onClick={()=>setWorld(x)}>{x}</button>)}</div>
          <div className="filterGroup styleGroup"><span className="filterLabel">MOOD</span>{styles.map(x=><button key={x} className={style===x?"filterChip selected":"filterChip"} onClick={()=>setStyle(x)}>{x}</button>)}</div>
          <div className="exploreTools">
            <label className="searchBox"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search inspiration..." aria-label="Search inspiration"/></label>
            <button className={onlySaved?"savedToggle on":"savedToggle"} onClick={()=>setOnlySaved(v=>!v)}>♡ Saved {saved.length ? `(${saved.length})` : ""}</button>
          </div>
        </div>

        <div className="galleryHeading"><div><span className="kicker">THE COLLECTION</span><h2>{onlySaved ? "Your saved ideas." : "Find your next obsession."}</h2></div><span className="galleryCount">{String(filtered.length).padStart(2,"0")} / {String(inspirations.length).padStart(2,"0")} DESIGNS</span></div>

        {filtered.length ? <div className="inspirationGrid">{filtered.map((item,index)=><article className="inspirationCard" key={item.id}>
          <div className="inspirationImage" style={{height:item.height,backgroundImage:`url("${item.image}")`}}>
            <div className="imageOverlay"/>
            <span className="cardNumber">Y / {String(item.id).padStart(2,"0")}</span>
            <button className={saved.includes(item.id)?"saveButton isSaved":"saveButton"} onClick={()=>toggleSave(item.id)} aria-label={saved.includes(item.id)?"Remove saved design":"Save design"}>{saved.includes(item.id)?"♥":"♡"}</button>
            <a className="createSimilar" href={"/studio?world="+encodeURIComponent(item.world)+"&inspiration="+encodeURIComponent(item.title)}>Create something similar ↗</a>
          </div>
          <div className="inspirationMeta"><div><h3>{item.title}</h3><p>{item.creator} <span>·</span> {item.world}</p></div><span className="styleTag">{item.style}</span></div>
        </article>)}</div> : <div className="emptyExplore"><span>✳</span><h3>No ideas found.</h3><p>Try another search or reset your filters.</p><button className="button" onClick={()=>{setWorld("All worlds");setStyle("All styles");setQuery("");setOnlySaved(false);}}>Reset filters</button></div>}

        <div className="exploreCta"><div><span className="kicker">YOUR TURN</span><h2>Inspiration is only<br/><em>the beginning.</em></h2><p>Take an idea, make it personal, and bring something new into the universe.</p></div><a className="button" href="/studio">Create in YUGA Studio ↗</a></div>
      </section>

      <footer className="footer shell"><span>YUGA © 2026 — THE UNIVERSE OF DESIGN</span><a href="/">BACK TO THE UNIVERSE ↑</a></footer>

      <style jsx global>{`
        .explorePage{min-height:100vh;background:#050505;color:#f5f1e9}
        .exploreNav .brand span{color:#d7b56d}.exploreNav .active{color:#d7b56d}
        .exploreHero{padding:78px 0 35px;border-bottom:1px solid rgba(255,255,255,.1)}
        .exploreEyebrow{display:flex;align-items:center;gap:12px;color:#d7b56d;font-size:9px;letter-spacing:.24em}
        .eyebrowLine{display:inline-block;width:34px;height:1px;background:#d7b56d}
        .exploreHeroRow{display:flex;justify-content:space-between;align-items:flex-end;padding:35px 0 55px}
        .exploreHero h1{font:500 clamp(64px,10vw,132px)/.87 'Playfair Display',serif;letter-spacing:-.055em;margin:0}
        .exploreHero h1 em,.exploreCta h2 em{font-weight:500;color:#d7b56d}
        .exploreHeroRow p{color:#a6a29b;font-size:14px;line-height:1.8;max-width:430px;margin:28px 0 0}
        .heroSideNote{display:flex;align-items:center;gap:13px;margin-bottom:12px;color:#d7b56d}
        .heroSideNote span{font:48px 'Playfair Display',serif}.heroSideNote small{font-size:8px;letter-spacing:.18em;line-height:1.7;color:#999}.heroSideNote i{font-style:normal;font-size:34px;margin-left:25px}
        .exploreHeroBottom{display:flex;justify-content:space-between;color:#666;font-size:8px;letter-spacing:.2em}
        .exploreContent{padding:34px 0 90px}
        .exploreControls{border:1px solid rgba(255,255,255,.1);background:#0b0b0b;padding:18px 20px;display:flex;flex-direction:column;gap:14px}
        .filterGroup{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.filterLabel{color:#777;font-size:8px;letter-spacing:.2em;width:48px}
        .filterChip,.savedToggle{border:1px solid transparent;background:transparent;color:#999;padding:8px 12px;font-size:10px;cursor:pointer;transition:.2s}
        .filterChip:hover,.savedToggle:hover{color:#f3e6c6;border-color:#42351d}.filterChip.selected{background:#d7b56d;color:#080706;border-color:#d7b56d}
        .exploreTools{display:flex;justify-content:space-between;gap:12px;margin-top:5px;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)}
        .searchBox{display:flex;align-items:center;gap:10px;flex:1;max-width:360px;color:#d7b56d}.searchBox span{font-size:24px}.searchBox input{background:transparent;border:0;outline:0;color:#eee;width:100%;font:12px 'DM Sans',sans-serif}.searchBox input::placeholder{color:#686868}.savedToggle{border:1px solid rgba(255,255,255,.12);padding:10px 15px}.savedToggle.on{color:#d7b56d;border-color:#d7b56d}
        .galleryHeading{display:flex;justify-content:space-between;align-items:flex-end;padding:65px 0 28px}.galleryHeading h2{font:500 clamp(32px,4vw,52px) 'Playfair Display',serif;margin:12px 0 0;letter-spacing:-.03em}.galleryCount{font-size:8px;letter-spacing:.2em;color:#777;padding-bottom:8px}
        .inspirationGrid{columns:3;column-gap:18px}.inspirationCard{break-inside:avoid;margin:0 0 24px;display:inline-block;width:100%}
        .inspirationImage{position:relative;width:100%;background-size:cover;background-position:center;overflow:hidden;border:1px solid rgba(255,255,255,.08);isolation:isolate}
        .inspirationImage:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.3),transparent 25%,transparent 55%,rgba(0,0,0,.6));z-index:-0}
        .imageOverlay{position:absolute;inset:0;background:rgba(0,0,0,.08);transition:background .35s}.inspirationCard:hover .imageOverlay{background:rgba(0,0,0,.25)}
        .cardNumber{position:absolute;top:16px;left:16px;font-size:8px;letter-spacing:.2em;color:#f2dfb5}
        .saveButton{position:absolute;right:14px;top:12px;width:36px;height:36px;border:1px solid rgba(255,255,255,.5);border-radius:50%;background:rgba(0,0,0,.35);color:#fff;font-size:20px;cursor:pointer;backdrop-filter:blur(8px)}.saveButton.isSaved{color:#d7b56d;border-color:#d7b56d}
        .createSimilar{position:absolute;left:16px;bottom:16px;border:1px solid rgba(215,181,109,.75);background:rgba(0,0,0,.6);padding:11px 13px;color:#f4dfb0;font-size:9px;letter-spacing:.08em;opacity:0;transform:translateY(8px);transition:.25s}.inspirationCard:hover .createSimilar{opacity:1;transform:translateY(0)}
        .inspirationMeta{display:flex;justify-content:space-between;gap:8px;align-items:flex-start;padding:12px 2px}.inspirationMeta h3{font:19px 'Playfair Display',serif;margin:0}.inspirationMeta p{font-size:9px;color:#777;margin:7px 0 0;letter-spacing:.04em}.inspirationMeta p span{color:#d7b56d}.styleTag{font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:#c4a76c;border:1px solid rgba(215,181,109,.25);padding:5px 7px;white-space:nowrap}
        .emptyExplore{text-align:center;padding:80px 20px;border:1px solid #222}.emptyExplore>span{font-size:30px;color:#d7b56d}.emptyExplore h3{font:32px 'Playfair Display',serif}.emptyExplore p{color:#888;font-size:12px;margin-bottom:25px}
        .exploreCta{display:flex;align-items:center;justify-content:space-between;gap:30px;margin-top:90px;padding:55px 6%;border:1px solid rgba(215,181,109,.25);background:radial-gradient(ellipse at 15% 20%,rgba(215,181,109,.1),transparent 55%),#080807}
        .exploreCta h2{font:500 clamp(38px,5vw,65px)/1 'Playfair Display',serif;margin:15px 0}.exploreCta p{font-size:12px;line-height:1.8;color:#999;max-width:380px}
        @media(max-width:900px){.inspirationGrid{columns:2}.exploreHero{padding-top:55px}.exploreHeroRow{padding:30px 0 40px}}
        @media(max-width:600px){.exploreHero{padding:40px 0 25px}.exploreHeroRow{padding:25px 0 35px}.exploreHero h1{font-size:clamp(58px,17vw,86px)}.exploreHeroRow p{font-size:12px;max-width:290px}.heroSideNote{display:none}.exploreHeroBottom{font-size:7px;gap:12px}.exploreHeroBottom span:last-child{text-align:right}.exploreControls{padding:13px}.filterLabel{width:100%;margin-bottom:3px}.filterChip{padding:7px 9px;font-size:9px}.exploreTools{flex-direction:column}.searchBox{max-width:none}.galleryHeading{padding:45px 0 20px;gap:10px;align-items:flex-end}.galleryHeading h2{font-size:31px}.galleryCount{font-size:7px;white-space:nowrap}.inspirationGrid{columns:2;column-gap:10px}.inspirationCard{margin-bottom:14px}.inspirationMeta{padding:9px 0;flex-direction:column}.inspirationMeta h3{font-size:15px}.inspirationMeta p{font-size:8px}.styleTag{font-size:7px;padding:4px 6px}.createSimilar{opacity:1;transform:none;bottom:10px;left:8px;padding:8px;font-size:7px}.saveButton{width:30px;height:30px;right:8px;top:8px;font-size:17px}.cardNumber{top:9px;left:9px;font-size:7px}.exploreCta{margin-top:55px;padding:30px 20px;flex-direction:column;align-items:flex-start}.exploreCta h2{font-size:43px}.exploreNav .navbutton{font-size:8px}.exploreNav .brand{font-size:18px}}
      `}</style>
    <MobileNav />
</main>
  );
}
