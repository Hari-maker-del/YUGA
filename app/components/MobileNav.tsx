"use client";
import { usePathname } from "next/navigation";
const links=[["/","Universe","✦"],["/explore","Explore","⌕"],["/studio","Studio","✳"],["/creations","Creations","♡"]];
export default function MobileNav(){const path=usePathname();return <nav className="yugaMobileNav" aria-label="Mobile navigation">{links.map(([href,label,icon])=><a key={href} href={href} className={path===href?"active":""}><span>{icon}</span><small>{label}</small></a>)}</nav>}