"use client";

import { useEffect, useMemo, useState } from "react";
import MobileNav from "../components/MobileNav";
import { supabase } from "../lib/supabase";

type Design = { id: string; prompt?: string; world?: string; style?: string; image_url?: string; created_at?: string };

export default function Creations() {
  const [items, setItems] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Loading your designs…");
  const [query, setQuery] = useState("");
  const [world, setWorld] = useState("All worlds");
  const [sort, setSort] = useState("Newest first");

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) {
          if (alive) { setMessage("Sign in through Studio to view your saved designs."); setLoading(false); }
          return;
        }
        if (alive) setEmail(user.email || "");
        const { data, error } = await supabase.from("designs").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
        if (error) throw error;
        if (alive) { setItems((data || []) as Design[]); setMessage(data?.length ? "" : "No designs saved yet. Generate your first image in Studio."); }
      } catch (e) {
        if (alive) setMessage(e instanceof Error ? e.message : "Could not load designs.");
      } finally { if (alive) setLoading(false); }
    }
    load();
    return () => { alive = false; };
  }, []);

  const worlds = useMemo(() => ["All worlds", ...Array.from(new Set(items.map(x => x.world).filter(Boolean) as string[]))], [items]);
  const filtered = useMemo(() => items.filter(d => (world === "All worlds" || d.world === world) && (String(d.prompt || "") + " " + String(d.world || "") + " " + String(d.style || "")).toLowerCase().includes(query.toLowerCase())).sort((a,b) => sort === "Oldest first" ? new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime() : new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()), [items, world, query, sort]);

  return <main className="creationPage">
    <header className="topbar shell creationNav"><a className="brand" href="/">YUGA<span>.</span></a><nav className="navlinks"><a href="/">Universe</a><a href="/explore">Explore</a><a href="/creations" className="active">Creations</a><a href="/pricing">Membership</a></nav><a className="navbutton" href="/studio">Enter Studio ↗</a></header>
    <section className="creationHero shell"><div className="kicker">YOUR PERSONAL ARCHIVE {email ? "· "+email : ""}</div><div className="creationHeroRow"><div><h1>Your creations.<br/><em>Your universe.</em></h1><p>A collection of ideas made real. Every generation, saved in one place—ready to revisit, refine, and bring further.</p></div><div className="creationCount"><strong>{loading ? "—" : String(items.length).padStart(2,"0")}</strong><span>DESIGNS<br/>CREATED</span></div></div><div className="creationHeroFoot"><span>YUGA / ARCHIVE</span><span>PERSONAL · PRIVATE · YOURS</span></div></section>

    <section className="shell creationBody">
      {loading ? <div className="creationState"><span className="stateSymbol">✳</span><h2>Opening your archive…</h2><p>{message}</p></div> : items.length === 0 ? <div className="creationState"><span className="stateSymbol">✳</span><h2>{message.includes("Sign in") ? "Your universe awaits." : "A blank canvas."}</h2><p>{message}</p><a className="button" href="/studio">Start creating ↗</a></div> : <>
        <div className="collectionBar"><div><span className="kicker">THE COLLECTION</span><h2>{filtered.length} <span>design{filtered.length===1?"":"s"}</span></h2></div><div className="collectionTools"><label className="creationSearch">⌕ <input aria-label="Search creations" placeholder="Search your designs..." value={query} onChange={e=>setQuery(e.target.value)}/></label><select value={world} onChange={e=>setWorld(e.target.value)} aria-label="Filter by world">{worlds.map(w=><option key={w}>{w}</option>)}</select><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort creations"><option>Newest first</option><option>Oldest first</option></select></div></div>
        {filtered.length ? <div className="creationGrid">{filtered.map((d,i)=><article className="creationCard" key={d.id||i}><div className="creationImage">{d.image_url ? <img src={d.image_url} alt={d.prompt||"YUGA creation"} loading="lazy"/> : <div className="noImage">Y / {String(i+1).padStart(2,"0")}</div>}<span className="creationIndex">Y / {String(i+1).padStart(2,"0")}</span>{d.image_url&&<a className="imageExpand" href={d.image_url} target="_blank" rel="noreferrer" aria-label="Open full image">↗</a>}</div><div className="creationCardMeta"><div><span className="creationWorld">{d.world||"YUGA DESIGN"}{d.created_at?" · "+new Date(d.created_at).toLocaleDateString():""}</span><h3>{d.prompt||"Untitled creation"}</h3>{d.style&&<p>{d.style}</p>}</div>{d.image_url&&<a className="viewLink" href={d.image_url} target="_blank" rel="noreferrer">View ↗</a>}</div></article>)}</div> : <div className="creationState compact"><h2>No matching designs.</h2><p>Try a different search or world filter.</p><button className="button" onClick={()=>{setQuery("");setWorld("All worlds");}}>Reset filters</button></div>}
      </>}
      <div className="creationEnd"><div><span className="kicker">KEEP THE IDEAS COMING</span><h2>Make the next<br/><em>one extraordinary.</em></h2></div><a className="button" href="/studio">Create new design ↗</a></div>
    </section>
    <footer className="footer shell"><span>YUGA © 2026 — THE UNIVERSE OF DESIGN</span><a href="/">BACK TO THE UNIVERSE ↑</a></footer>
    <style jsx global>{`
      .creationPage{min-height:100vh;background:#050505;color:#f5f1e9}.creationNav .brand span{color:#d7b56d}.creationNav .active{color:#d7b56d}
      .creationHero{padding:75px 0 30px;border-bottom:1px solid rgba(255,255,255,.1)}.creationHeroRow{display:flex;justify-content:space-between;align-items:flex-end;padding:35px 0 55px}.creationHero h1{font:500 clamp(58px,9vw,115px)/.9 'Playfair Display',serif;letter-spacing:-.05em;margin:0}.creationHero h1 em,.creationEnd h2 em{color:#d7b56d;font-weight:500}.creationHero p{color:#a5a19a;font-size:13px;line-height:1.8;max-width:440px;margin-top:25px}.creationCount{display:flex;align-items:center;gap:12px;margin-bottom:12px}.creationCount strong{font:60px 'Playfair Display',serif;color:#d7b56d}.creationCount span{font-size:8px;letter-spacing:.18em;line-height:1.7;color:#888}.creationHeroFoot{display:flex;justify-content:space-between;color:#666;font-size:8px;letter-spacing:.2em}
      .creationBody{padding:50px 0 85px}.collectionBar{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:30px}.collectionBar h2{font:42px 'Playfair Display',serif;margin:8px 0 0}.collectionBar h2 span{font-size:20px;color:#888}.collectionTools{display:flex;gap:8px;flex-wrap:wrap}.creationSearch{display:flex;align-items:center;gap:8px;border:1px solid #292929;padding:0 12px;color:#d7b56d;font-size:22px}.creationSearch input{background:transparent;border:0;outline:0;color:#eee;width:190px;font:11px 'DM Sans',sans-serif}.collectionTools select{background:#0b0b0b;border:1px solid #292929;color:#aaa;padding:10px;font:10px 'DM Sans',sans-serif}
      .creationGrid{columns:3;column-gap:18px}.creationCard{break-inside:avoid;display:inline-block;width:100%;margin-bottom:24px}.creationImage{position:relative;overflow:hidden;background:#111;border:1px solid #25221c;min-height:180px}.creationImage img{display:block;width:100%;height:auto;max-height:650px;object-fit:cover;transition:transform .5s}.creationCard:hover .creationImage img{transform:scale(1.025)}.creationIndex{position:absolute;top:13px;left:13px;background:rgba(0,0,0,.55);padding:6px 8px;font-size:8px;letter-spacing:.15em;color:#e8d3a2}.imageExpand{position:absolute;right:12px;top:12px;background:rgba(0,0,0,.65);border:1px solid #777;width:30px;height:30px;display:grid;place-items:center}.noImage{min-height:240px;display:grid;place-items:center;color:#d7b56d;font:30px 'Playfair Display',serif}.creationCardMeta{display:flex;justify-content:space-between;gap:10px;padding:13px 2px}.creationWorld{font-size:8px;letter-spacing:.15em;color:#b89a5d;text-transform:uppercase}.creationCardMeta h3{font:20px 'Playfair Display',serif;margin:8px 0 0;overflow-wrap:anywhere}.creationCardMeta p{font-size:10px;color:#888;margin:6px 0}.viewLink{font-size:9px;color:#d7b56d;white-space:nowrap;margin-top:10px}.creationState{text-align:center;padding:90px 20px;border:1px solid #25221c}.creationState .stateSymbol{color:#d7b56d;font-size:30px}.creationState h2{font:38px 'Playfair Display',serif;margin:15px 0}.creationState p{font-size:12px;color:#999;line-height:1.8;margin-bottom:25px}.creationState.compact{padding:45px}.creationEnd{margin-top:75px;padding:50px 6%;display:flex;align-items:center;justify-content:space-between;gap:20px;border:1px solid rgba(215,181,109,.25);background:radial-gradient(ellipse at 10% 20%,rgba(215,181,109,.1),transparent 55%),#080807}.creationEnd h2{font:50px/1 'Playfair Display',serif;margin:12px 0}.creationEnd .button{white-space:nowrap}
      @media(max-width:850px){.creationGrid{columns:2}.collectionBar{align-items:flex-start;flex-direction:column}.collectionTools{width:100%}.creationSearch{flex:1}.creationSearch input{width:100%;min-width:80px}}
      @media(max-width:550px){.creationHero{padding:40px 0 25px}.creationHeroRow{padding:25px 0 35px}.creationHero h1{font-size:clamp(48px,13vw,72px)}.creationHero p{font-size:12px}.creationCount{display:none}.creationHeroFoot{font-size:7px}.creationBody{padding:35px 0 60px}.collectionBar h2{font-size:34px}.collectionTools{display:grid;grid-template-columns:1fr 1fr}.creationSearch{grid-column:span 2;padding:8px 10px}.collectionTools select{width:100%;font-size:9px}.creationGrid{columns:2;column-gap:10px}.creationCard{margin-bottom:15px}.creationCardMeta{padding:9px 0;flex-direction:column}.creationCardMeta h3{font-size:15px}.creationWorld{font-size:7px}.creationEnd{margin-top:50px;padding:28px 18px;align-items:flex-start;flex-direction:column}.creationEnd h2{font-size:42px}}
    `}</style>
  <MobileNav />
</main>;
}