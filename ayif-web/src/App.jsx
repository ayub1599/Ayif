/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   AYIF — Fresh & Local Groceries | B2B Distribution Platform
═══════════════════════════════════════════════════════════════════ */

const G = {
  dark:"#062510", mid:"#0e4a1f", main:"#1a6b2b", light:"#7cc04f",
  gold:"#f0c040", goldDark:"#c8920a", cream:"#ff0000", cardBg:"#ffffff",
  text:"#1a1a1a", muted:"#6b7280", border:"#e5e0d8", red:"#dc2626",
  blue:"#1e40af", amber:"#d97706"
};

const CSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { font-family: 'Plus Jakarta Sans', sans-serif; background: ${G.cream}; -webkit-tap-highlight-color: transparent; overscroll-behavior: none; color: ${G.text}; }
    button, input, select, textarea { font-family: inherit; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-thumb { background: ${G.border}; border-radius: 4px; }
    .logo-text { font-family: 'Syne', sans-serif; font-weight: 800; letter-spacing: -1.5px; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes pop { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
    @keyframes slideRight { from{opacity:0;transform:translateX(100%)} to{opacity:1;transform:translateX(0)} }
    @keyframes bell { 0%,100%{transform:rotate(0)} 15%,45%{transform:rotate(-14deg)} 30%,60%{transform:rotate(14deg)} }
    @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
    @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    .tap:active { transform: scale(.95) !important; }
    .card { transition: box-shadow .18s, transform .18s; }
    .card:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,.12) !important; }
    .ring-bell { animation: bell 1.4s ease-in-out infinite; transform-origin: top center; }
    /* Layout */
    .shell { max-width: 1280px; margin: 0 auto; min-height: 100vh; }
    @media(min-width:1024px) { .shell { display: grid; grid-template-columns: 268px 1fr; } }
    .sidebar { display: none; }
    @media(min-width:1024px) { .sidebar { display: flex; flex-direction: column; background: linear-gradient(180deg,${G.dark} 0%,${G.mid} 100%); position: sticky; top: 0; height: 100vh; overflow-y: auto; } }
    .main { min-height: 100vh; background: ${G.cream}; padding-bottom: 80px; }
    @media(min-width:1024px) { .main { padding-bottom: 32px; } }
    .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; z-index: 88; background: #fff; border-top: 1px solid ${G.border}; display: flex; box-shadow: 0 -4px 24px rgba(0,0,0,.07); }
    @media(min-width:1024px) { .bottom-nav { display: none; } }
    /* Grids */
    .cat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; }
    @media(min-width:540px) { .cat-grid { grid-template-columns: repeat(5,1fr); gap: 10px; } }
    @media(min-width:768px) { .cat-grid { grid-template-columns: repeat(7,1fr); gap: 12px; } }
    @media(min-width:1024px) { .cat-grid { grid-template-columns: repeat(6,1fr); gap: 12px; } }
    .prod-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }
    @media(min-width:540px) { .prod-grid { grid-template-columns: repeat(3,1fr); gap: 14px; } }
    @media(min-width:1024px) { .prod-grid { grid-template-columns: repeat(4,1fr); gap: 16px; } }
  `}</style>
);

/* ─────────────────────── DATA ─────────────────────────────────── */

const DEF_ADMIN = {
  user:"ayif_admin", pass:"Ayif@2025", pin:"1234",
  phone:"9000000000", upiId:"ayif@upi",
  businessName:"AYIF Fresh & Local Groceries",
  city:"Hyderabad", state:"Telangana", gst:""
};

const DEF_CATS = [
  { id:"fv",  label:"Fruits & Vegetables",           emoji:"🥬", bg:"#e8f5e9", visible:true, subs:[
    {name:"Premium Fruits",emoji:"🍎"},{name:"Fresh Vegetables",emoji:"🥦"},{name:"Exotic Produce",emoji:"🥑"},{name:"Herbs & Greens",emoji:"🌿"}]},
  { id:"db",  label:"Dairy & Bakery",                emoji:"🥛", bg:"#e3f2fd", visible:true, subs:[
    {name:"Milk & Curd",emoji:"🥛"},{name:"Butter & Ghee",emoji:"🧈"},{name:"Bread",emoji:"🍞"},{name:"Paneer",emoji:"🧀"}]},
  { id:"bp",  label:"Biscuits, Drinks & Packaged",   emoji:"🍪", bg:"#fff3e0", visible:true, subs:[
    {name:"Chips & Namkeen",emoji:"🥨"},{name:"Biscuits",emoji:"🍪"},{name:"Chocolates",emoji:"🍫"},{name:"Indian Sweets",emoji:"🍮"},
    {name:"Drinks & Juices",emoji:"🧃"},{name:"Cereals",emoji:"🥣"},{name:"Noodles & Pasta",emoji:"🍜"},{name:"Ice Cream",emoji:"🍨"},
    {name:"Ready to Cook",emoji:"🍲"},{name:"Tea & Coffee",emoji:"☕"}]},
  { id:"ce",  label:"Cooking Essentials",            emoji:"🌾", bg:"#f3e5f5", visible:true, subs:[
    {name:"Atta & Flours",emoji:"🌾"},{name:"Dals & Pulses",emoji:"🫘"},{name:"Rice",emoji:"🍚"},
    {name:"Edible Oils",emoji:"🫗"},{name:"Masala & Spices",emoji:"🌶️"},{name:"Salt & Sugar",emoji:"🧂"},
    {name:"Ghee",emoji:"🧈"},{name:"Dry Fruits",emoji:"🥜"},{name:"Millets & Organic",emoji:"🌱"}]},
  { id:"pc",  label:"Personal Care",                 emoji:"🧴", bg:"#e0f2f1", visible:true, subs:[
    {name:"Hair Care",emoji:"💆"},{name:"Bath & Wash",emoji:"🧼"},{name:"Oral Care",emoji:"🪥"},{name:"Skin Care",emoji:"🧴"},
    {name:"Feminine Hygiene",emoji:"🌸"},{name:"Men's Grooming",emoji:"🪒"},{name:"Wellness",emoji:"💊"}]},
  { id:"bty", label:"Beauty",                        emoji:"💄", bg:"#fce4ec", visible:true, subs:[
    {name:"Face",emoji:"✨"},{name:"Lips",emoji:"💋"},{name:"Eyes",emoji:"👁️"},{name:"Nails",emoji:"💅"}]},
  { id:"mc",  label:"Mom & Baby Care",               emoji:"👶", bg:"#fff8e1", visible:true, subs:[
    {name:"Diapers & Wipes",emoji:"🧻"},{name:"Baby Hygiene",emoji:"🛁"},{name:"Food & Feeding",emoji:"🍼"}]},
  { id:"home",label:"Home & Cleaning",               emoji:"🏠", bg:"#f1f8e9", visible:true, subs:[
    {name:"Dishwash",emoji:"🧽"},{name:"Detergents",emoji:"👕"},{name:"Fresheners",emoji:"🌸"},
    {name:"Cleaning",emoji:"🧹"},{name:"Pooja Needs",emoji:"🪔"},{name:"Stationery",emoji:"🎒"}]},
];

const DEF_PRODS = [
  {id:1,name:"Basmati Rice Premium",cat:"ce",sub:"Rice",unit:"50kg bag",mrp:3200,price:2800,cost:2200,stock:40,img:"",desc:"Aged 1121 long-grain basmati"},
  {id:2,name:"Toor Dal Yellow",cat:"ce",sub:"Dals & Pulses",unit:"25kg bag",mrp:1900,price:1650,cost:1300,stock:25,img:"",desc:"Export grade pigeon peas"},
  {id:3,name:"Sunflower Oil",cat:"ce",sub:"Edible Oils",unit:"15L tin",mrp:2200,price:1920,cost:1550,stock:18,img:"",desc:"Double refined, fortified"},
  {id:4,name:"Sugar M30",cat:"ce",sub:"Salt & Sugar",unit:"50kg bag",mrp:2350,price:2100,cost:1700,stock:30,img:"",desc:"Refined white sugar"},
  {id:5,name:"Wheat Flour",cat:"ce",sub:"Atta & Flours",unit:"25kg bag",mrp:1100,price:980,cost:780,stock:0,img:"",desc:"Chakki-ground whole wheat"},
  {id:6,name:"Chana Dal",cat:"ce",sub:"Dals & Pulses",unit:"25kg bag",mrp:1600,price:1420,cost:1100,stock:12,img:"",desc:"Bold split Bengal gram"},
  {id:7,name:"Turmeric Powder",cat:"ce",sub:"Masala & Spices",unit:"kg",mrp:230,price:180,cost:130,stock:80,img:"",desc:"Pure Erode 3.5% curcumin"},
  {id:8,name:"Red Chilli Powder",cat:"ce",sub:"Masala & Spices",unit:"kg",mrp:270,price:210,cost:160,stock:60,img:"",desc:"Byadgi blend, rich colour"},
  {id:9,name:"Tea Powder",cat:"bp",sub:"Tea & Coffee",unit:"kg",mrp:490,price:420,cost:340,stock:35,img:"",desc:"Assam strong dust"},
  {id:10,name:"Parle-G Biscuits",cat:"bp",sub:"Biscuits",unit:"carton",mrp:570,price:520,cost:460,stock:25,img:"",desc:"96 packs · trade pricing"},
];

const STATES=["Andhra Pradesh","Telangana","Maharashtra","Karnataka","Tamil Nadu","Kerala","Gujarat","Rajasthan","Uttar Pradesh","Delhi","West Bengal","Punjab","Haryana","Madhya Pradesh","Bihar","Odisha","Assam","Other"];
const UNITS=["kg","g","litre","ml","piece","dozen","box","carton","bag (50kg)","bag (25kg)","tin (15L)","pack","quintal"];

/* ─────────────────────── UTILS ────────────────────────────────── */

const R = n => "₹"+Number(n||0).toLocaleString("en-IN");
const pct = (a,b) => b?Math.round(a/b*100):0;
const disc = (mrp,price) => mrp>price&&mrp>0?Math.round((mrp-price)/mrp*100):0;
const now = () => new Date().toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
const today = () => new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
const ago = ts=>{const m=Math.floor((Date.now()-ts)/60000);return m<1?"just now":m<60?`${m}m ago`:m<1440?`${Math.floor(m/60)}h ago`:`${Math.floor(m/1440)}d ago`;};
const uid = ()=>Math.random().toString(36).slice(2,8);

/* ─────────────────────── SMALL UI ─────────────────────────────── */

const AyifLogo = ({size=44}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="lgG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={G.dark}/><stop offset="100%" stopColor={G.main}/></linearGradient>
      <linearGradient id="lgL" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7cc04f"/><stop offset="100%" stopColor="#2e8b3d"/></linearGradient>
      <linearGradient id="lgW" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f6c84a"/><stop offset="100%" stopColor="#c8920a"/></linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="#fff"/>
    <circle cx="50" cy="50" r="44" fill="none" stroke="url(#lgG)" strokeWidth="2.8"/>
    {/* leaves */}
    <path d="M36 23 Q28 18 30 35 Q37 42 43 35 Q44 24 36 23Z" fill="url(#lgL)"/>
    <path d="M57 21 Q65 18 65 34 Q58 41 52 34 Q50 23 57 21Z" fill="url(#lgL)"/>
    {/* wheat */}
    <g transform="translate(72,26) rotate(22)">
      <ellipse cx="0" cy="0" rx="2.2" ry="3.5" fill="url(#lgW)"/>
      <ellipse cx="-3.5" cy="4" rx="2.2" ry="3.5" fill="url(#lgW)"/>
      <ellipse cx="3.5" cy="4" rx="2.2" ry="3.5" fill="url(#lgW)"/>
      <ellipse cx="-3.5" cy="9.5" rx="2.2" ry="3.5" fill="url(#lgW)"/>
      <ellipse cx="3.5" cy="9.5" rx="2.2" ry="3.5" fill="url(#lgW)"/>
      <line x1="0" y1="-3" x2="0" y2="15" stroke="#a07810" strokeWidth="1.1"/>
    </g>
    {/* cart */}
    <g transform="translate(33,46)">
      <path d="M0 4 L4 4 L9 22 L30 22 L33 8 L6 8" fill="none" stroke={G.mid} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 8 L29 8 L27 19 L10 19Z" fill="url(#lgW)" opacity=".9"/>
      <circle cx="14" cy="27" r="2.8" fill="none" stroke={G.mid} strokeWidth="2.2"/>
      <circle cx="26" cy="27" r="2.8" fill="none" stroke={G.mid} strokeWidth="2.2"/>
      {/* leaf inside cart */}
      <path d="M19 13 Q23 10 24 14 Q21 18 18 16 Q17 13 19 13Z" fill={G.light}/>
    </g>
  </svg>
);

const AyifName = ({size=28,white=true}) => (
  <span className="logo-text" style={{fontSize:size,color:white?"#fff":G.dark,letterSpacing:"-1.5px",lineHeight:1}}>
    AY<span style={{color:G.gold}}>I</span>F
  </span>
);

const Toast = ({msg,type="ok",onDone}) => {
  useEffect(()=>{const t=setTimeout(onDone,3600);return()=>clearTimeout(t);},[onDone]);
  const bg={ok:G.mid,err:"#7f1d1d",info:G.blue,warn:G.amber}[type]||G.mid;
  return <div style={{position:"fixed",top:18,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:bg,color:"#fff",padding:"13px 22px",borderRadius:14,fontSize:13,fontWeight:600,boxShadow:"0 8px 32px rgba(0,0,0,.3)",maxWidth:340,textAlign:"center",animation:"pop .3s ease",whiteSpace:"pre-line",lineHeight:1.6}}>{msg}</div>;
};

const PickImg = ({value,onChange,size=80}) => {
  const r=useRef();
  return (
    <div onClick={()=>r.current.click()} style={{width:size,height:size,borderRadius:14,cursor:"pointer",border:`2px dashed ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"#faf8f4",flexShrink:0,position:"relative"}}>
      {value?<img src={value} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>
        :<div style={{textAlign:"center"}}><div style={{fontSize:size*.32}}>📷</div><div style={{fontSize:9,color:"#aaa",marginTop:2}}>Photo</div></div>}
      {value&&<div style={{position:"absolute",bottom:4,right:4,background:"rgba(0,0,0,.55)",borderRadius:5,padding:"2px 5px",fontSize:8,color:"#fff"}}>Change</div>}
      <input ref={r} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=ev=>onChange(ev.target.result);rd.readAsDataURL(f);}}/>
    </div>
  );
};

const ProdImg = ({img,name,sub,cat,size=72,r=12,cats}) => {
  if(img) return <img src={img} alt={name} style={{width:size,height:size,borderRadius:r,objectFit:"cover",flexShrink:0}}/>;
  const sec=cats?.find(c=>c.id===cat);
  const s=sec?.subs?.find(x=>x.name===sub);
  return <div style={{width:size,height:size,borderRadius:r,flexShrink:0,background:sec?.bg||"#e8f5e3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.44}}>{s?.emoji||sec?.emoji||"📦"}</div>;
};

const StatusPill = ({s}) => {
  const map={Pending:["#fef9c3","#92400e"],Confirmed:["#dbeafe","#1e3a8a"],Dispatched:["#e0f2fe","#075985"],Delivered:["#dcfce7","#166534"],Cancelled:["#fee2e2","#991b1b"]};
  const [bg,c]=map[s]||["#f3f4f6","#555"];
  return <span style={{background:bg,color:c,borderRadius:6,padding:"3px 10px",fontSize:10,fontWeight:700,whiteSpace:"nowrap"}}>{s}</span>;
};

const DiscBadge = ({mrp,price,size=10}) => {
  const d=disc(mrp,price);
  if(!d) return null;
  return <span style={{background:G.red,color:"#fff",borderRadius:6,padding:"2px 7px",fontSize:size,fontWeight:800,lineHeight:1.4}}>{d}% OFF</span>;
};

const Field = ({label,req,hint,children}) => (
  <div style={{marginBottom:13}}>
    {label&&<div style={{fontSize:12,fontWeight:700,color:"#444",marginBottom:5}}>
      {label}{req&&<span style={{color:G.red}}> *</span>}
      {hint&&<span style={{color:G.muted,fontWeight:400,fontSize:11,marginLeft:6}}>· {hint}</span>}
    </div>}
    {children}
  </div>
);

const Input = ({...p}) => <input {...p} style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${G.border}`,fontSize:14,background:"#fff",color:G.text,...p.style}}/>;
const Select = ({opts,...p}) => (
  <select {...p} style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${G.border}`,fontSize:14,background:"#fff",...p.style}}>
    {opts.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.v} value={o.v}>{o.l}</option>)}
  </select>
);

const Btn = ({ch,v="g",...p}) => {
  const s={
    g:{background:`linear-gradient(135deg,${G.mid},${G.main})`,color:"#fff",boxShadow:`0 4px 14px rgba(14,74,31,.28)`},
    gold:{background:`linear-gradient(135deg,${G.gold},${G.goldDark})`,color:G.dark,boxShadow:`0 4px 14px rgba(200,146,10,.28)`},
    ghost:{background:"#f0ede5",color:"#555"},
    red:{background:"#fef2f2",color:G.red},
    wa:{background:"#25D366",color:"#fff"},
    outline:{background:"transparent",color:G.main,border:`1.5px solid ${G.main}`},
  }[v]||{background:G.main,color:"#fff"};
  return <button className="tap" {...p} style={{padding:"13px",borderRadius:12,border:"none",fontWeight:700,fontSize:14,cursor:"pointer",width:"100%",...s,...p.style}}>{ch||p.children}</button>;
};

/* ─────────────────────── INVOICE ──────────────────────────────── */

const makeInvoice = (o,ac) => {
  const rows=o.items.map(i=>{
    const d=disc(i.mrp,i.price);
    return `<tr>
      <td style="padding:9px 10px;border-bottom:1px solid #f0ede8;"><b>${i.name}</b><br/><small style="color:#888">${i.sub||""}</small></td>
      <td style="padding:9px 10px;border-bottom:1px solid #f0ede8;text-align:center;font-size:12px">${i.unit}</td>
      <td style="padding:9px 10px;border-bottom:1px solid #f0ede8;text-align:center">${i.qty}</td>
      <td style="padding:9px 10px;border-bottom:1px solid #f0ede8;text-align:right;font-size:12px">
        ${i.mrp&&i.mrp>i.price?`<s style="color:#aaa">₹${Number(i.mrp).toLocaleString("en-IN")}</s> `:""}
        <b>₹${Number(i.price).toLocaleString("en-IN")}</b>
        ${d?`<br/><span style="color:#dc2626;font-size:10px">-${d}%</span>`:""}
      </td>
      <td style="padding:9px 10px;border-bottom:1px solid #f0ede8;text-align:right;font-weight:700">₹${Number(i.price*i.qty).toLocaleString("en-IN")}</td>
    </tr>`;
  }).join("");
  const mrpT=o.items.reduce((s,i)=>s+(i.mrp||i.price)*i.qty,0);
  const sav=mrpT-o.total;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Invoice ${o.id}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
    body{font-family:'Plus Jakarta Sans',sans-serif;color:#222;margin:0;padding:30px;background:#fafaf6}
    .hd{background:linear-gradient(135deg,#062510,#0e4a1f);color:#fff;padding:28px 32px;border-radius:18px;margin-bottom:24px}
    .nm{font-family:'Syne',sans-serif;font-weight:800;font-size:48px;letter-spacing:-2px;line-height:1}
    .nm span{color:#f0c040}
    table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.06);margin:14px 0}
    th{background:#0e4a1f;color:#fff;padding:11px 10px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
    .tr{background:#dcfce7;font-weight:800;font-size:16px;color:#0e4a1f}
    .sv{background:#fff8e1;color:#92400e;font-weight:600}
    .up{background:linear-gradient(135deg,#fffde7,#fff9c4);border:1.5px solid #f0c040;border-radius:14px;padding:18px;margin:14px 0;text-align:center}
    @media print{body{padding:14px;background:#fff} .np{display:none}}
  </style></head><body>
  <div class="hd">
    <div class="nm">AY<span>I</span>F</div>
    <div style="font-size:11px;letter-spacing:3px;color:#7cc04f;margin-top:6px;text-transform:uppercase">Fresh & Local Groceries</div>
    <div style="margin-top:12px;font-size:13px;opacity:.85">${ac.businessName} · ${ac.city}, ${ac.state}</div>
    ${ac.upiId?`<div style="font-size:12px;opacity:.7;margin-top:3px">UPI: ${ac.upiId}</div>`:""}
    ${ac.gst?`<div style="font-size:12px;opacity:.7">GST: ${ac.gst}</div>`:""}
  </div>
  <div style="display:flex;justify-content:space-between;margin-bottom:22px;flex-wrap:wrap;gap:14px">
    <div>
      <div style="font-size:11px;color:#888;letter-spacing:1.5px;margin-bottom:3px">INVOICE</div>
      <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:22px;color:#0e4a1f">${o.id}</div>
      <div style="font-size:12px;color:#888;margin-top:4px">${o.time}</div>
      <div style="margin-top:8px;background:${o.paymentMethod==="UPI Payment"?"#dbeafe":"#dcfce7"};color:${o.paymentMethod==="UPI Payment"?"#1e3a8a":"#166534"};border-radius:6px;padding:3px 10px;font-size:11px;font-weight:700;display:inline-block">💵 ${o.paymentMethod||"Cash on Delivery"}</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:11px;color:#888;letter-spacing:1.5px;margin-bottom:3px">BILL TO</div>
      <div style="font-weight:700;font-size:16px">${o.vendorName}</div>
      <div style="font-size:13px;color:#555;margin-top:4px">${o.phone}</div>
      <div style="font-size:13px;color:#555">${o.shopAddress}</div>
      <div style="font-size:12px;color:#888">${o.state||""}</div>
    </div>
  </div>
  <table>
    <thead><tr>
      <th style="text-align:left">Product</th>
      <th>Unit</th>
      <th>Qty</th>
      <th style="text-align:right">Rate</th>
      <th style="text-align:right">Amount</th>
    </tr></thead>
    <tbody>${rows}</tbody>
    <tfoot>
      ${sav>0?`<tr class="sv"><td colspan="4" style="padding:9px 10px;text-align:right;font-size:13px">You saved on this order</td><td style="padding:9px 10px;text-align:right;font-size:13px">−₹${Number(sav).toLocaleString("en-IN")}</td></tr>`:""}
      <tr class="tr">
        <td colspan="4" style="padding:14px 10px;text-align:right">GRAND TOTAL</td>
        <td style="padding:14px 10px;text-align:right;font-family:'Syne',sans-serif">₹${Number(o.total).toLocaleString("en-IN")}</td>
      </tr>
    </tfoot>
  </table>
  ${o.note?`<div style="background:#fff;border-radius:10px;padding:14px;font-size:13px;color:#555;margin-bottom:14px;border-left:3px solid #f0c040"><b>Note:</b> ${o.note}</div>`:""}
  ${ac.upiId&&o.paymentMethod==="UPI Payment"?`<div class="up"><b style="color:#92400e">💳 Pay via UPI</b><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:22px;color:#0e4a1f;margin:10px 0">${ac.upiId}</div><div style="font-size:11px;color:#888">GPay · PhonePe · Paytm · Any UPI App</div></div>`:""}
  <div style="margin-top:32px;padding-top:18px;border-top:2px dashed #c8b89a;text-align:center;font-size:11px;color:#888;line-height:1.8">
    <b style="color:#0e4a1f">Thank you for choosing AYIF</b><br>AYIF Fresh & Local Groceries · India 🇮🇳
  </div>
  <div class="np" style="margin-top:24px;text-align:center">
    <button onclick="window.print()" style="background:linear-gradient(135deg,#0e4a1f,#1a6b2b);color:#fff;border:none;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer">🖨 Print / Save PDF</button>
  </div>
  </body></html>`;
};

const openInvoice = (o,ac) => window.open(URL.createObjectURL(new Blob([makeInvoice(o,ac)],{type:"text/html"})),"_blank");

/* ═════════════════════════════════════════════════════════════════
   MAIN APP
═════════════════════════════════════════════════════════════════ */

export default function App() {
  /* ── Core state ─────────────────────────────────────────────── */
  const [page,    setPage]    = useState("splash");
  const [adminCfg,setAdminCfg]= useState(DEF_ADMIN);
  const [firstRun,setFirstRun]= useState(true);
  const [cats,    setCats]    = useState(DEF_CATS);
  const [prods,   setProds]   = useState(DEF_PRODS);
  const [vendors, setVendors] = useState([
    {id:"V001",name:"Rahman General Store",  phone:"9876543210",addr:"Shop 12, Mehdipatnam, Hyderabad",state:"Telangana",pass:"ayif123",joined:Date.now()-86400000*40},
    {id:"V002",name:"Srinivas Traders",      phone:"9123456789",addr:"45 MG Road, Secunderabad",       state:"Telangana",pass:"ayif123",joined:Date.now()-86400000*12},
  ]);
  const [orders,  setOrders]  = useState([]);
  const [cart,    setCart]    = useState([]);
  const [me,      setMe]      = useState(null); // current vendor
  const [toast,   setToast]   = useState(null);
  const [notifs,  setNotifs]  = useState([
    {id:uid(),to:"all",title:"Welcome to AYIF!",body:"B2B grocery ordering made simple. Daily updated prices.",type:"info",ts:Date.now()-3600000,read:false},
  ]);
  const [tickets, setTickets] = useState([]);
  const [anns,    setAnns]    = useState([]);

  /* ── UI state ───────────────────────────────────────────────── */
  const [activeCat,setActiveCat] = useState(null);
  const [activeSub,setActiveSub] = useState(null);
  const [searchQ,  setSearchQ]   = useState("");
  const [drawer,   setDrawer]    = useState(false); // profile drawer
  const [supportDlg,setSupportDlg]=useState(false);
  const [adminTab,  setAdminTab]  = useState("dash");
  const [oFilter,   setOFilter]   = useState("All");
  const [priceModal,setPriceModal]=useState(false);
  const [priceEdits,setPriceEdits]=useState({});
  const [upiModal,  setUpiModal]  = useState(false);
  const [upiOrder,  setUpiOrder]  = useState(null);
  const [setupStep, setSetupStep] = useState(1);
  const [showPw,    setShowPw]    = useState(false);

  /* ── Form states ────────────────────────────────────────────── */
  const [setup, setSetup] = useState({user:"",pass:"",cp:"",pin:"",cpin:"",biz:"AYIF Fresh & Local Groceries",city:"",state:"Telangana",phone:"",upi:"",gst:""});
  const [aUser, setAUser] = useState(""); const [aPass, setAPass] = useState(""); const [aPin, setAPin] = useState(""); const [loginStep,setLoginStep]=useState("creds"); const [loginErr,setLoginErr]=useState("");
  const [vPhone,setVPhone]=useState(""); const [vPass,setVPass]=useState("");
  const [editP,setEditP]=useState(null); const [addPOpen,setAddPOpen]=useState(false);
  const [newP,setNewP]=useState({name:"",cat:"ce",sub:"Rice",unit:"kg",mrp:"",price:"",cost:"",stock:"",desc:"",img:""});
  const [addVOpen,setAddVOpen]=useState(false);
  const [newV,setNewV]=useState({name:"",phone:"",addr:"",state:"Telangana",pass:""});
  const [resetV,setResetV]=useState(null); const [resetVPass,setResetVPass]=useState("");
  const [editCat,setEditCat]=useState(null); const [addCatOpen,setAddCatOpen]=useState(false);
  const [newCat,setNewCat]=useState({label:"",emoji:"📦",bg:"#f0f0f0",subs:[]}); const [subInput,setSubInput]=useState({name:"",emoji:"📦"});
  const [coStep,setCoStep]=useState(0); const [payMethod,setPayMethod]=useState("Cash on Delivery"); const [oNote,setONote]=useState("");
  const [sOld,setSOld]=useState(""); const [sUser,setSUser]=useState(""); const [sPass,setSPass]=useState(""); const [sPin,setSPin]=useState(""); const [sPhone,setSPhone]=useState(""); const [sUpi,setSUpi]=useState(""); const [sGst,setSGst]=useState("");
  const [vpOld,setVpOld]=useState(""); const [vpNew,setVpNew]=useState(""); const [vpCon,setVpCon]=useState("");
  const [newTkt,setNewTkt]=useState({subj:"",msg:""});
  const [newAnn,setNewAnn]=useState({title:"",body:"",type:"info"});
  const [tktReply,setTktReply]=useState("");

  const toast_ = (msg,type="ok") => setToast({msg,type});

  /* ── Push notification helper ───────────────────────────────── */
  const push = (to,title,body,type="info",link=null) =>
    setNotifs(p=>[{id:uid(),to,title,body,type,link,ts:Date.now(),read:false},...p]);

  /* ── Cart helpers ───────────────────────────────────────────── */
  const cCount = cart.reduce((s,i)=>s+i.qty,0);
  const cTotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const cMrp   = cart.reduce((s,i)=>s+(i.mrp||i.price)*i.qty,0);
  const cSaved = cMrp-cTotal;

  const addToCart=(p,qty)=>{setCart(pr=>{const ex=pr.find(x=>x.id===p.id);return ex?pr.map(x=>x.id===p.id?{...x,qty:x.qty+qty}:x):[...pr,{...p,qty}];});toast_(`${p.name} added ✓`);};
  const chQty=(id,d)=>setCart(p=>p.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+d)}:x));
  const remCart=id=>setCart(p=>p.filter(x=>x.id!==id));

  /* ── Place order ────────────────────────────────────────────── */
  const placeOrder=()=>{
    if(!me)return;
    const o={id:"ORD-"+Date.now().toString().slice(-5),vendorId:me.id,vendorName:me.name,phone:me.phone,shopAddr:me.addr,state:me.state,items:[...cart],total:cTotal,mrpTotal:cMrp,savings:cSaved,note:oNote,time:now(),status:"Pending",paymentMethod:payMethod,tracking:[{status:"Order Placed",time:now()}]};
    setOrders(p=>[o,...p]);
    push(me.id,"Order placed! 🎉",`${o.id} · ${R(o.total)} · ${o.items.length} items`,"ok","my_orders");
    push("admin",`New order from ${me.name}`,`${o.id} · ${R(o.total)}`,"order");
    setCart([]); setCoStep(0); setONote(""); setPayMethod("Cash on Delivery");
    if(payMethod==="UPI Payment"){setUpiOrder(o);setUpiModal(true);}
    toast_(`Order ${o.id} placed! 🎉`);
    setPage("my_orders");
  };

  const updateStatus=(oid,st)=>{
    let vendId="";
    setOrders(p=>p.map(o=>{
      if(o.id!==oid)return o;
      vendId=o.vendorId;
      const tr=[...o.tracking];
      if(!tr.find(t=>t.status===st))tr.push({status:st,time:now()});
      return{...o,status:st,tracking:tr};
    }));
    if(vendId)push(vendId,`Order ${st}`,`${oid} has been ${st.toLowerCase()}`,"ok","my_orders");
    toast_(`Order → ${st}`);
  };

  /* ── Computed ───────────────────────────────────────────────── */
  const delivered   = orders.filter(o=>o.status==="Delivered");
  const totalRev    = delivered.reduce((s,o)=>s+o.total,0);
  const totalProfit = delivered.reduce((s,o)=>s+o.items.reduce((ps,i)=>{const p=prods.find(x=>x.id===i.id);return ps+(p?(i.price-(p.cost||0))*i.qty:0);},0),0);
  const pendingCt   = orders.filter(o=>["Pending","Confirmed"].includes(o.status)).length;
  const outStock    = prods.filter(p=>p.stock===0);
  const lowStock    = prods.filter(p=>p.stock>0&&p.stock<=10);
  const filtOrders  = orders.filter(o=>oFilter==="All"||o.status===oFilter);
  const openTkts    = tickets.filter(t=>t.status!=="Closed").length;
  const visCats     = cats.filter(c=>c.visible);

  const filtProds = prods.filter(p=>{
    const qs=!searchQ||p.name.toLowerCase().includes(searchQ.toLowerCase())||p.desc?.toLowerCase().includes(searchQ.toLowerCase());
    const cs=!activeCat||p.cat===activeCat;
    const ss=!activeSub||p.sub===activeSub;
    return qs&&cs&&ss;
  });

  const myNotifs    = me ? notifs.filter(n=>n.to===me.id||n.to==="all") : [];
  const adminNotifs = notifs.filter(n=>n.to==="admin"||n.to==="all");
  const unread      = (me?myNotifs:adminNotifs).filter(n=>!n.read).length;
  const myTickets   = me ? tickets.filter(t=>t.vendorId===me.id) : [];

  /* ════════════════════════════ SCREENS ════════════════════════ */

  /* UPI Modal */
  if(upiModal&&upiOrder) return (
    <><CSS/>
    <div style={{minHeight:"100vh",background:"rgba(0,0,0,.72)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#fff",borderRadius:24,padding:30,maxWidth:380,width:"100%",textAlign:"center",animation:"pop .3s ease"}}>
        <div style={{fontSize:48,marginBottom:12}}>💳</div>
        <div className="logo-text" style={{fontSize:28,color:G.mid}}>UPI Payment</div>
        <div style={{fontSize:14,color:G.muted,margin:"10px 0 18px"}}>Pay <b style={{fontSize:18,color:G.mid}}>{R(upiOrder.total)}</b> for order {upiOrder.id}</div>
        <div style={{background:"linear-gradient(135deg,#fffde7,#fff8c4)",border:`2px solid ${G.gold}`,borderRadius:16,padding:20,marginBottom:18}}>
          <div style={{fontSize:10,color:"#888",letterSpacing:2,marginBottom:6}}>PAY TO UPI ID</div>
          <div className="logo-text" style={{fontSize:24,color:G.mid}}>{adminCfg.upiId}</div>
          <div style={{fontSize:11,color:"#888",marginTop:8}}>GPay · PhonePe · Paytm · Any UPI App</div>
        </div>
        {adminCfg.phone&&<a href={`https://wa.me/91${adminCfg.phone}?text=${encodeURIComponent(`Hi AYIF, UPI paid for ${upiOrder.id}. Total ${R(upiOrder.total)}. Please confirm.`)}`} target="_blank" rel="noreferrer" style={{display:"block",background:"#25D366",color:"#fff",borderRadius:12,padding:"14px",textAlign:"center",fontSize:14,fontWeight:700,textDecoration:"none",marginBottom:10}}>📲 Send Payment Proof on WhatsApp</a>}
        <Btn v="ghost" ch="Done · Close" onClick={()=>{setUpiModal(false);setUpiOrder(null);}}/>
      </div>
    </div>
    </>
  );

  /* SETUP */
  if(page==="setup") return (
    <><CSS/>
    {toast&&<Toast {...toast} onDone={()=>setToast(null)}/>}
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${G.dark},${G.main})`,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#fff",borderRadius:24,padding:30,maxWidth:440,width:"100%",animation:"fadeUp .35s ease"}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <AyifLogo size={68}/>
          <div className="logo-text" style={{fontSize:28,color:G.mid,marginTop:10}}>Setup AYIF</div>
          <p style={{color:G.muted,fontSize:12,marginTop:3,letterSpacing:1}}>STEP {setupStep} OF 3</p>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:12}}>{[1,2,3].map(s=><div key={s} style={{height:5,width:56,borderRadius:4,background:s<=setupStep?G.main:G.border,transition:"background .3s"}}/>)}</div>
        </div>
        {setupStep===1&&<div style={{animation:"fadeUp .2s"}}>
          <div style={{background:"#e8f5e9",borderRadius:12,padding:13,marginBottom:14,fontSize:13,color:G.mid,lineHeight:1.6}}><b>👋 Welcome!</b> One-time setup for your business.</div>
          <Field label="Business Name" req><Input placeholder="AYIF Fresh & Local Groceries" value={setup.biz} onChange={e=>setSetup({...setup,biz:e.target.value})}/></Field>
          <Field label="City" req><Input placeholder="e.g. Hyderabad" value={setup.city} onChange={e=>setSetup({...setup,city:e.target.value})}/></Field>
          <Field label="State"><Select opts={STATES} value={setup.state} onChange={e=>setSetup({...setup,state:e.target.value})}/></Field>
          <Field label="WhatsApp Number" req hint="for order alerts"><Input type="tel" placeholder="10-digit" value={setup.phone} onChange={e=>setSetup({...setup,phone:e.target.value.replace(/\D/,"").slice(0,10)})}/></Field>
          <Field label="UPI ID" hint="for payments"><Input placeholder="name@okicici" value={setup.upi} onChange={e=>setSetup({...setup,upi:e.target.value})}/></Field>
          <Field label="GST Number" hint="optional"><Input placeholder="36ABCDE1234F1Z5" value={setup.gst} onChange={e=>setSetup({...setup,gst:e.target.value})}/></Field>
          <Btn ch="Next →" onClick={()=>{if(!setup.biz||!setup.city||!setup.phone){toast_("Fill required fields","err");return;}setSetupStep(2);}}/>
        </div>}
        {setupStep===2&&<div style={{animation:"fadeUp .2s"}}>
          <Field label="Admin Username" req><Input placeholder="Choose username" value={setup.user} onChange={e=>setSetup({...setup,user:e.target.value})}/></Field>
          <Field label="Password" req>
            <div style={{position:"relative"}}><Input type={showPw?"text":"password"} placeholder="Min 6 chars" value={setup.pass} onChange={e=>setSetup({...setup,pass:e.target.value})} style={{paddingRight:42}}/>
            <button onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16}}>{showPw?"🙈":"👁"}</button></div>
          </Field>
          <Field label="Confirm Password" req><Input type="password" value={setup.cp} onChange={e=>setSetup({...setup,cp:e.target.value})}/></Field>
          <div style={{display:"flex",gap:10}}>
            <Btn v="ghost" style={{flex:1}} ch="← Back" onClick={()=>setSetupStep(1)}/>
            <Btn style={{flex:2}} ch="Next →" onClick={()=>{if(!setup.user||!setup.pass){toast_("Fill all fields","err");return;}if(setup.pass!==setup.cp){toast_("Passwords don't match","err");return;}if(setup.pass.length<6){toast_("Min 6 characters","err");return;}setSetupStep(3);}}/>
          </div>
        </div>}
        {setupStep===3&&<div style={{animation:"fadeUp .2s"}}>
          <div style={{background:"#fffde7",borderRadius:12,padding:13,marginBottom:14,fontSize:13,color:G.amber,lineHeight:1.6}}><b>🔢 4-digit PIN</b> for quick admin access.</div>
          <Field label="4-Digit PIN" req><Input type="password" maxLength={4} value={setup.pin} onChange={e=>setSetup({...setup,pin:e.target.value.replace(/\D/,"")})}/></Field>
          <Field label="Confirm PIN" req><Input type="password" maxLength={4} value={setup.cpin} onChange={e=>setSetup({...setup,cpin:e.target.value.replace(/\D/,"")})}/></Field>
          <div style={{background:"#f5f0e8",borderRadius:10,padding:13,marginBottom:14,fontSize:12,lineHeight:1.9}}>
            ✅ <b>{setup.biz}</b> · {setup.city}<br/>👤 <b>{setup.user}</b> · 📞 <b>{setup.phone}</b><br/>💳 UPI: <b>{setup.upi||"Not set"}</b>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Btn v="ghost" style={{flex:1}} ch="← Back" onClick={()=>setSetupStep(2)}/>
            <Btn v="gold" style={{flex:2}} ch="🚀 Launch AYIF" onClick={()=>{
              if(setup.pin.length!==4){toast_("PIN must be 4 digits","err");return;}
              if(setup.pin!==setup.cpin){toast_("PINs don't match","err");return;}
              setAdminCfg({user:setup.user,pass:setup.pass,pin:setup.pin,phone:setup.phone,upiId:setup.upi,businessName:setup.biz,city:setup.city,state:setup.state,gst:setup.gst});
              setFirstRun(false);toast_("Setup complete! 🎉");
              setTimeout(()=>setPage("splash"),1200);
            }}/>
          </div>
        </div>}
      </div>
    </div>
    </>
  );

  /* SPLASH */
  if(page==="splash") return (
    <><CSS/>
    <div style={{minHeight:"100vh",background:`linear-gradient(165deg,${G.dark} 0%,${G.mid} 60%,${G.main} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"12%",right:"8%",width:220,height:220,background:"radial-gradient(circle,rgba(124,192,79,.14),transparent)",borderRadius:"50%"}}/>
      <div style={{position:"absolute",bottom:"8%",left:"5%",width:180,height:180,background:"radial-gradient(circle,rgba(240,192,64,.1),transparent)",borderRadius:"50%"}}/>
      <div style={{animation:"pop .7s ease",zIndex:1}}><AyifLogo size={126}/></div>
      <div style={{marginTop:20,zIndex:1}}><AyifName size={72}/></div>
      <p style={{color:G.light,fontSize:11,letterSpacing:5,marginTop:6,textTransform:"uppercase",fontWeight:700}}>Fresh & Local Groceries</p>
      <p style={{color:"rgba(255,255,255,.38)",fontSize:12,marginTop:8}}>B2B Wholesale Distribution · India 🇮🇳</p>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:48,width:"100%",maxWidth:340,zIndex:1}}>
        <button className="tap" onClick={()=>setPage("vlogin")} style={{padding:"18px",background:`linear-gradient(135deg,${G.gold},${G.goldDark})`,color:G.dark,border:"none",borderRadius:18,fontWeight:800,fontSize:16,cursor:"pointer",boxShadow:"0 8px 28px rgba(240,192,64,.45)"}}>🛒 Customer Login</button>
        <button className="tap" onClick={()=>{if(firstRun){setPage("setup");}else{setLoginStep("creds");setLoginErr("");setPage("alogin");}}} style={{padding:"16px",background:"rgba(255,255,255,.08)",color:"#fff",border:"1.5px solid rgba(255,255,255,.2)",borderRadius:18,fontWeight:600,fontSize:15,cursor:"pointer"}}>🔐 Admin Login</button>
      </div>
      <p style={{color:"rgba(255,255,255,.15)",fontSize:11,marginTop:36,zIndex:1,letterSpacing:1.5}}>AYIF · {adminCfg.city||"India"} 🇮🇳</p>
    </div>
    </>
  );

  /* ADMIN LOGIN */
  if(page==="alogin") return (
    <><CSS/>
    {toast&&<Toast {...toast} onDone={()=>setToast(null)}/>}
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${G.dark},${G.mid})`,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#fff",borderRadius:24,padding:34,maxWidth:400,width:"100%",animation:"fadeUp .3s ease"}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <AyifLogo size={68}/>
          <div className="logo-text" style={{fontSize:26,color:G.mid,marginTop:12}}>Admin Portal</div>
          <p style={{color:G.muted,fontSize:12,marginTop:3,letterSpacing:1}}>{loginStep==="creds"?"Enter credentials":"Enter 4-digit PIN"}</p>
        </div>
        {loginStep==="creds"&&<div style={{animation:"fadeUp .2s"}}>
          <Field label="Username" req><Input placeholder="Admin username" value={aUser} onChange={e=>{setAUser(e.target.value);setLoginErr("");}}/></Field>
          <Field label="Password" req>
            <div style={{position:"relative"}}>
              <Input type={showPw?"text":"password"} placeholder="Admin password" value={aPass} onChange={e=>{setAPass(e.target.value);setLoginErr("");}} style={{paddingRight:42}}/>
              <button onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16}}>{showPw?"🙈":"👁"}</button>
            </div>
          </Field>
          {loginErr&&<p style={{color:G.red,fontSize:13,marginBottom:10,textAlign:"center"}}>{loginErr}</p>}
          <Btn ch="Continue →" onClick={()=>{if(aUser===adminCfg.user&&aPass===adminCfg.pass){setLoginStep("pin");setAPin("");setLoginErr("");}else setLoginErr("Incorrect username or password");}}/> 
          <div style={{marginTop:12,padding:10,background:"#e8f5e9",borderRadius:8,fontSize:11,color:G.muted,textAlign:"center"}}>Demo: <code>ayif_admin</code> / <code>Ayif@2025</code></div>
        </div>}
        {loginStep==="pin"&&<div style={{animation:"fadeUp .2s",textAlign:"center"}}>
          <p style={{fontSize:13,color:G.muted,marginBottom:18}}>Welcome <b>{adminCfg.user}</b>! Enter PIN.</p>
          <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:16}}>
            {[0,1,2,3].map(i=><div key={i} style={{width:54,height:54,borderRadius:14,border:`2.5px solid ${aPin.length>i?G.mid:G.border}`,background:aPin.length>i?G.mid:"#faf8f4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,color:"#fff",transition:"all .15s"}}>{aPin.length>i?"●":""}</div>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,maxWidth:240,margin:"0 auto 14px"}}>
            {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k,i)=>(
              <button key={i} onClick={()=>{if(k==="⌫")setAPin(p=>p.slice(0,-1));else if(k!==""&&aPin.length<4)setAPin(p=>p+k);}}
                style={{padding:"15px",background:k==="⌫"?"#fef2f2":"#e8f5e9",border:"none",borderRadius:14,fontSize:k==="⌫"?18:20,fontWeight:700,cursor:k===""?"default":"pointer",color:k==="⌫"?G.red:G.mid,opacity:k===""?0:1}}>
                {k}
              </button>
            ))}
          </div>
          {loginErr&&<p style={{color:G.red,fontSize:13,marginBottom:10}}>{loginErr}</p>}
          <Btn v="gold" ch="Unlock Admin ✓" onClick={()=>{if(aPin===adminCfg.pin){setPage("admin");setAPin("");setAUser("");setAPass("");setLoginErr("");}else{setLoginErr("Incorrect PIN");setAPin("");}}}/> 
          <button onClick={()=>{setLoginStep("creds");setLoginErr("");}} style={{marginTop:10,background:"none",border:"none",color:G.muted,fontSize:13,cursor:"pointer",width:"100%"}}>← Use password</button>
        </div>}
        <button onClick={()=>setPage("splash")} style={{width:"100%",padding:"10px",background:"none",border:"none",color:"#ccc",fontSize:13,cursor:"pointer",marginTop:8}}>← Back</button>
      </div>
    </div>
    </>
  );

  /* VENDOR LOGIN */
  if(page==="vlogin") return (
    <><CSS/>
    {toast&&<Toast {...toast} onDone={()=>setToast(null)}/>}
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${G.dark},${G.main})`,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#fff",borderRadius:24,padding:34,maxWidth:400,width:"100%",animation:"fadeUp .3s ease"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <AyifLogo size={68}/>
          <div className="logo-text" style={{fontSize:26,color:G.mid,marginTop:12}}>Vendor Login</div>
          <p style={{color:G.muted,fontSize:13,marginTop:4}}>Browse · Order · Track · Grow</p>
        </div>
        <Field label="Mobile Number" req><Input type="tel" placeholder="10-digit mobile" value={vPhone} onChange={e=>setVPhone(e.target.value.replace(/\D/,"").slice(0,10))}/></Field>
        <Field label="Password" req><Input type="password" placeholder="Your password" value={vPass} onChange={e=>setVPass(e.target.value)}/></Field>
        <Btn v="gold" ch="Login & Browse →" onClick={()=>{
          const v=vendors.find(x=>x.phone===vPhone&&x.pass===vPass);
          if(v){setMe(v);setPage("catalog");setVPhone("");setVPass("");push(v.id,"Welcome back! 👋",`Hello ${v.name}. Today's prices are live.`,"info");}
          else toast_("Incorrect phone or password.\nContact AYIF admin.","err");
        }}/>
        <button onClick={()=>setPage("splash")} style={{width:"100%",padding:"10px",background:"none",border:"none",color:G.muted,fontSize:13,cursor:"pointer",marginTop:10}}>← Back</button>
        <div style={{marginTop:14,padding:12,background:"#fffde7",borderRadius:10,fontSize:12,color:"#795548",lineHeight:1.7,textAlign:"center"}}><b>Demo:</b> <code>9876543210</code> / <code>ayif123</code></div>
      </div>
    </div>
    </>
  );

  /* ════════════════ VENDOR APP ══════════════════════════════════ */
  if(["catalog","my_orders","cart","notifs","tickets","cpwd","install"].includes(page)) {
    const isNotifsPage=page==="notifs";
    return (
      <><CSS/>
      {toast&&<Toast {...toast} onDone={()=>setToast(null)}/>}

      {/* Profile Drawer */}
      {drawer&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.56)",zIndex:300,animation:"fadeIn .2s"}} onClick={()=>setDrawer(false)}>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:300,background:"#fff",animation:"slideRight .25s ease",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{background:`linear-gradient(135deg,${G.dark},${G.main})`,padding:"28px 22px"}}>
              <div style={{width:62,height:62,borderRadius:"50%",background:`linear-gradient(135deg,${G.gold},${G.goldDark})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontFamily:"'Syne',sans-serif",fontWeight:800,color:G.mid,marginBottom:12}}>{me?.name?.[0]}</div>
              <div style={{color:"#fff",fontWeight:700,fontSize:17}}>{me?.name}</div>
              <div style={{color:"rgba(255,255,255,.65)",fontSize:12,marginTop:3}}>📞 {me?.phone}</div>
              <div style={{color:"rgba(255,255,255,.5)",fontSize:11,marginTop:2}}>📍 {me?.addr}</div>
              <div style={{color:"rgba(255,255,255,.35)",fontSize:10,marginTop:2}}>{me?.state} · {me?.id}</div>
            </div>
            <div style={{padding:"6px 0"}}>
              {[
                {ic:"👤",lb:"My Profile",    sub:"Account details",     fn:()=>toast_(`${me?.name}\n${me?.phone}\n${me?.addr}`,"info")},
                {ic:"📦",lb:"My Orders",     sub:"Track & manage",       fn:()=>{setDrawer(false);setPage("my_orders");}},
                {ic:"🔔",lb:"Notifications", sub:`${unread} unread`,     fn:()=>{setDrawer(false);setPage("notifs");}},
                {ic:"🎫",lb:"Support",       sub:`${myTickets.length} tickets`,fn:()=>{setDrawer(false);setPage("tickets");}},
                {ic:"🔑",lb:"Change Password",sub:"Update login password",fn:()=>{setDrawer(false);setPage("cpwd");}},
                {ic:"💬",lb:"Chat Support",  sub:"WhatsApp · Call AYIF", fn:()=>{setDrawer(false);setSupportDlg(true);}},
                {ic:"⚙️",lb:"Settings",       sub:"Preferences",          fn:()=>toast_("Settings coming soon","info")},
                {ic:"🔒",lb:"Privacy",       sub:"Data policy",           fn:()=>toast_("AYIF respects your privacy.\nData used only for orders.","info")},
                {ic:"📲",lb:"Install App",   sub:"Add to home screen",   fn:()=>{setDrawer(false);setPage("install");}},
                {ic:"ℹ️",lb:"About AYIF",    sub:adminCfg.businessName,  fn:()=>toast_(`${adminCfg.businessName}\n${adminCfg.city}, ${adminCfg.state}\nIndia 🇮🇳`)},
                {ic:"🚪",lb:"Sign Out",      sub:"Logout securely",      fn:()=>{setMe(null);setCart([]);setDrawer(false);setPage("splash");},danger:true},
              ].map(item=>(
                <button key={item.lb} onClick={item.fn} style={{width:"100%",display:"flex",gap:14,alignItems:"center",padding:"14px 20px",background:"none",border:"none",cursor:"pointer",textAlign:"left",borderBottom:`1px solid ${G.cream}`}}>
                  <span style={{fontSize:20,width:28,textAlign:"center"}}>{item.ic}</span>
                  <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14,color:item.danger?G.red:G.text}}>{item.lb}</div><div style={{fontSize:11,color:G.muted,marginTop:1}}>{item.sub}</div></div>
                  <span style={{color:"#ccc",fontSize:18}}>›</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Support dialog */}
      {supportDlg&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setSupportDlg(false)}>
          <div style={{background:"#fff",borderRadius:22,padding:26,maxWidth:340,width:"100%",animation:"pop .3s"}} onClick={e=>e.stopPropagation()}>
            <div className="logo-text" style={{fontSize:22,color:G.mid,marginBottom:4}}>Customer Support</div>
            <div style={{fontSize:13,color:G.muted,marginBottom:18}}>AYIF Fresh & Local Groceries</div>
            {adminCfg.phone&&<>
              <a href={`https://wa.me/91${adminCfg.phone}?text=Hi AYIF, I need help.`} target="_blank" rel="noreferrer" style={{display:"flex",gap:12,alignItems:"center",background:"#e7fde9",borderRadius:14,padding:"15px",textDecoration:"none",marginBottom:10,border:"1.5px solid #25D366"}}>
                <span style={{fontSize:26}}>💬</span><div><div style={{fontWeight:700,fontSize:14,color:"#166534"}}>WhatsApp Support</div><div style={{fontSize:12,color:G.muted}}>+91 {adminCfg.phone}</div></div>
              </a>
              <a href={`tel:+91${adminCfg.phone}`} style={{display:"flex",gap:12,alignItems:"center",background:"#e8f5e9",borderRadius:14,padding:"15px",textDecoration:"none",marginBottom:10,border:`1.5px solid ${G.main}`}}>
                <span style={{fontSize:26}}>📞</span><div><div style={{fontWeight:700,fontSize:14,color:G.mid}}>Call Us</div><div style={{fontSize:12,color:G.muted}}>+91 {adminCfg.phone}</div></div>
              </a>
            </>}
            <button onClick={()=>{setSupportDlg(false);setPage("tickets");}} style={{width:"100%",display:"flex",gap:12,alignItems:"center",background:"#fff8e1",borderRadius:14,padding:"15px",border:`1.5px solid ${G.gold}`,cursor:"pointer",marginBottom:14}}>
              <span style={{fontSize:26}}>🎫</span><div style={{textAlign:"left"}}><div style={{fontWeight:700,fontSize:14,color:G.amber}}>Submit a Ticket</div><div style={{fontSize:12,color:G.muted}}>Report an issue</div></div>
            </button>
            <button onClick={()=>setSupportDlg(false)} style={{width:"100%",padding:"12px",background:"#f0ede5",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:13}}>Close</button>
          </div>
        </div>
      )}

      <div className="shell">
        {/* Sidebar */}
        <div className="sidebar">
          <div style={{padding:"24px 18px 18px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <AyifLogo size={42}/>
              <div><AyifName size={26}/><div style={{color:G.light,fontSize:9,letterSpacing:2.5,fontWeight:700,marginTop:2}}>FRESH & LOCAL</div></div>
            </div>
            {me&&<div style={{marginTop:14,background:"rgba(255,255,255,.07)",borderRadius:10,padding:"10px 12px",display:"flex",gap:10,alignItems:"center"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${G.gold},${G.goldDark})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:16,color:G.dark,flexShrink:0}}>{me.name[0]}</div>
              <div style={{overflow:"hidden"}}><div style={{color:"#fff",fontWeight:700,fontSize:13,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{me.name}</div><div style={{color:"rgba(255,255,255,.5)",fontSize:10}}>{me.phone}</div></div>
            </div>}
          </div>
          <div style={{padding:"14px 12px",flex:1,overflowY:"auto"}}>
            <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.35)",letterSpacing:2,marginBottom:8,paddingLeft:8}}>BROWSE</div>
            {[["🏠","All Categories",null,null],["🛒","My Cart","cart",null],["📦","My Orders","my_orders",null],["🔔","Notifications","notifs",unread],["🎫","Support","tickets",null],["🔑","Change Password","cpwd",null]].map(([ic,lb,pg,badge])=>(
              <button key={lb} onClick={()=>{if(pg){setPage(pg);}else{setActiveCat(null);setActiveSub(null);setSearchQ("");setPage("catalog");}}} style={{display:"flex",gap:10,alignItems:"center",padding:"10px 12px",borderRadius:10,border:"none",cursor:"pointer",background:page===pg&&pg?"rgba(124,192,79,.15)":"none",color:page===pg&&pg?G.light:"rgba(255,255,255,.65)",marginBottom:3,width:"100%",textAlign:"left",fontSize:12.5,fontWeight:600}}>
                <span style={{fontSize:16}}>{ic}</span>{lb}
                {badge>0&&<span style={{marginLeft:"auto",background:G.red,color:"#fff",borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:800}}>{badge}</span>}
              </button>
            ))}
            <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.35)",letterSpacing:2,margin:"14px 0 8px",paddingLeft:8}}>CATEGORIES</div>
            {visCats.map(c=>(
              <button key={c.id} onClick={()=>{setActiveCat(c.id);setActiveSub(null);setPage("catalog");}} style={{display:"flex",gap:10,alignItems:"center",padding:"9px 12px",borderRadius:10,border:"none",cursor:"pointer",background:activeCat===c.id?"rgba(124,192,79,.15)":"none",color:activeCat===c.id?G.light:"rgba(255,255,255,.55)",marginBottom:2,width:"100%",textAlign:"left",fontSize:12,fontWeight:activeCat===c.id?700:400}}>
                <span style={{fontSize:15}}>{c.emoji}</span>{c.label}
              </button>
            ))}
          </div>
          <div style={{padding:"14px",borderTop:"1px solid rgba(255,255,255,.07)"}}>
            <button onClick={()=>setSupportDlg(true)} style={{width:"100%",padding:"10px",background:"rgba(37,211,102,.12)",color:"#7dc88a",border:"1px solid rgba(37,211,102,.2)",borderRadius:10,fontSize:11,fontWeight:600,cursor:"pointer",marginBottom:8}}>💬 Customer Support</button>
            <button onClick={()=>{setMe(null);setCart([]);setPage("splash");}} style={{width:"100%",padding:"10px",background:"rgba(255,255,255,.05)",color:"rgba(255,255,255,.45)",border:"none",borderRadius:10,fontSize:11,cursor:"pointer"}}>🚪 Sign Out</button>
          </div>
        </div>

        <div className="main">
          {/* Header */}
          <div style={{background:`linear-gradient(135deg,${G.dark},${G.main})`,padding:"14px 16px 18px",borderBottomLeftRadius:24,borderBottomRightRadius:24,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-20,right:-20,width:130,height:130,background:"radial-gradient(circle,rgba(124,192,79,.15),transparent)",borderRadius:"50%"}}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,position:"relative",zIndex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <AyifLogo size={36}/>
                <div><AyifName size={22}/><div style={{color:"rgba(255,255,255,.4)",fontSize:9,letterSpacing:2.5,fontWeight:700,marginTop:1}}>FRESH & LOCAL · INDIA 🇮🇳</div></div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <button className="tap" onClick={()=>setPage("notifs")} style={{position:"relative",background:"rgba(255,255,255,.13)",border:"none",borderRadius:12,padding:"9px 11px",cursor:"pointer",color:"#fff",fontSize:18,lineHeight:1}}>
                  <span className={unread>0?"ring-bell":""} style={{display:"inline-block"}}>🔔</span>
                  {unread>0&&<span style={{position:"absolute",top:-3,right:-3,background:G.red,color:"#fff",borderRadius:"50%",minWidth:18,height:18,padding:"0 4px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800}}>{unread}</span>}
                </button>
                <button className="tap" onClick={()=>setPage("cart")} style={{position:"relative",background:"rgba(255,255,255,.13)",border:"none",borderRadius:12,padding:"9px 11px",cursor:"pointer",color:"#fff",fontSize:18,lineHeight:1}}>
                  🛒{cCount>0&&<span style={{position:"absolute",top:-4,right:-4,background:G.gold,color:G.dark,borderRadius:"50%",minWidth:18,height:18,padding:"0 4px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,animation:"pulse 1s 2"}}>{cCount}</span>}
                </button>
                <button className="tap" onClick={()=>setSupportDlg(true)} style={{background:"rgba(37,211,102,.22)",border:"none",borderRadius:12,padding:"9px 11px",cursor:"pointer",color:"#7dc88a",fontSize:16}}>💬</button>
                <button className="tap" onClick={()=>setDrawer(true)} style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${G.gold},${G.goldDark})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:G.dark}}>{me?.name?.[0]||"V"}</button>
              </div>
            </div>
            <div style={{background:"rgba(255,255,255,.13)",borderRadius:14,display:"flex",alignItems:"center",padding:"11px 14px",gap:10,position:"relative",zIndex:1}}>
              <span style={{color:"rgba(255,255,255,.45)",fontSize:16}}>🔍</span>
              <input value={searchQ} onChange={e=>{setSearchQ(e.target.value);setActiveCat(null);setActiveSub(null);}} placeholder="Search products, categories…" style={{background:"none",border:"none",color:"#fff",fontSize:14,flex:1,outline:"none"}}/>
              {searchQ&&<button onClick={()=>setSearchQ("")} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontSize:18}}>×</button>}
            </div>
          </div>

          {/* Change Password */}
          {page==="cpwd"&&(
            <div style={{padding:"18px 16px",animation:"fadeUp .3s",maxWidth:500,margin:"0 auto"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
                <button onClick={()=>setPage("catalog")} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:G.mid}}>←</button>
                <div className="logo-text" style={{fontSize:22,color:G.mid}}>Change Password</div>
              </div>
              <div style={{background:"#fff",borderRadius:18,padding:24,boxShadow:"0 4px 20px rgba(0,0,0,.06)"}}>
                <div style={{background:"#fff8e1",borderRadius:10,padding:13,marginBottom:18,fontSize:13,color:G.amber,lineHeight:1.6}}>🔐 Keep your account secure with a strong password.</div>
                <Field label="Current Password" req><Input type="password" placeholder="Current password" value={vpOld} onChange={e=>setVpOld(e.target.value)}/></Field>
                <Field label="New Password" req hint="min 6 chars"><Input type="password" placeholder="New password" value={vpNew} onChange={e=>setVpNew(e.target.value)}/></Field>
                <Field label="Confirm New Password" req><Input type="password" placeholder="Repeat new password" value={vpCon} onChange={e=>setVpCon(e.target.value)}/></Field>
                <Btn ch="Update Password" onClick={()=>{
                  if(vpOld!==me.pass){toast_("Current password incorrect","err");return;}
                  if(vpNew.length<6){toast_("Min 6 characters","err");return;}
                  if(vpNew!==vpCon){toast_("Passwords don't match","err");return;}
                  setVendors(p=>p.map(v=>v.id===me.id?{...v,pass:vpNew}:v));
                  setMe({...me,pass:vpNew});
                  push(me.id,"Password changed ✅","Your password has been updated successfully.","ok");
                  setVpOld("");setVpNew("");setVpCon("");
                  toast_("Password updated ✓");
                  setTimeout(()=>setPage("catalog"),1400);
                }}/>
              </div>
            </div>
          )}

          {/* Notifications */}
          {page==="notifs"&&(
            <div style={{padding:"18px 16px",animation:"fadeUp .3s"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <button onClick={()=>setPage("catalog")} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:G.mid}}>←</button>
                  <div className="logo-text" style={{fontSize:22,color:G.mid}}>Notifications</div>
                </div>
                {unread>0&&<button onClick={()=>{setNotifs(p=>p.map(n=>(n.to===me.id||n.to==="all")?{...n,read:true}:n));toast_("All read ✓");}} style={{background:G.mid,color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>Mark all read</button>}
              </div>
              {anns.length>0&&<div style={{marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:8}}>📢 ANNOUNCEMENTS</div>
                {anns.map(a=>(
                  <div key={a.id} style={{background:"linear-gradient(135deg,#fffde7,#fff8c4)",borderRadius:14,padding:14,marginBottom:10,border:`1.5px solid ${G.gold}`}}>
                    <div style={{fontWeight:700,fontSize:14,color:G.mid}}>📣 {a.title}</div>
                    <div style={{fontSize:13,color:"#555",marginTop:4,lineHeight:1.5}}>{a.body}</div>
                    <div style={{fontSize:11,color:"#aaa",marginTop:6}}>{ago(a.ts)}</div>
                  </div>
                ))}
              </div>}
              {myNotifs.length===0?<div style={{textAlign:"center",padding:60,color:"#bbb"}}><div style={{fontSize:48}}>🔔</div><div style={{marginTop:14,fontSize:14}}>No notifications yet</div></div>:myNotifs.map(n=>(
                <div key={n.id} onClick={()=>{setNotifs(p=>p.map(x=>x.id===n.id?{...x,read:true}:x));if(n.link)setPage(n.link);}}
                  style={{background:n.read?"#fff":"#f0fdf4",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,.05)",cursor:n.link?"pointer":"default",borderLeft:`4px solid ${n.type==="ok"?"#16a34a":n.type==="order"?"#2563eb":n.type==="warn"?G.amber:G.muted}`,position:"relative"}}>
                  {!n.read&&<div style={{position:"absolute",top:14,right:14,width:8,height:8,borderRadius:"50%",background:G.red}}/>}
                  <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:22}}>{n.type==="ok"?"✅":n.type==="order"?"📦":n.type==="warn"?"⚠️":n.type==="support"?"🎫":"ℹ️"}</span>
                    <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{n.title}</div><div style={{fontSize:13,color:"#666",marginTop:3,lineHeight:1.5}}>{n.body}</div><div style={{fontSize:11,color:"#aaa",marginTop:5}}>{ago(n.ts)}</div></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tickets */}
          {page==="tickets"&&(
            <div style={{padding:"18px 16px",animation:"fadeUp .3s",maxWidth:600,margin:"0 auto"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
                <button onClick={()=>setPage("catalog")} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:G.mid}}>←</button>
                <div className="logo-text" style={{fontSize:22,color:G.mid}}>Support Tickets</div>
              </div>
              <div style={{background:"#fff",borderRadius:18,padding:18,marginBottom:18,boxShadow:"0 4px 18px rgba(0,0,0,.06)"}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12,color:G.mid}}>🎫 Report an Issue</div>
                <Field label="Subject" req><Input placeholder="e.g. Order not received" value={newTkt.subj} onChange={e=>setNewTkt({...newTkt,subj:e.target.value})}/></Field>
                <Field label="Describe your issue" req>
                  <textarea value={newTkt.msg} onChange={e=>setNewTkt({...newTkt,msg:e.target.value})} placeholder="Tell us what went wrong…" style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${G.border}`,fontSize:14,resize:"none",height:90,background:"#fff"}}/>
                </Field>
                <Btn ch="📨 Submit Ticket" onClick={()=>{
                  if(!newTkt.subj||!newTkt.msg){toast_("Fill subject + message","err");return;}
                  const t={id:"TKT-"+Date.now().toString().slice(-5),vendorId:me.id,vendorName:me.name,vendorPhone:me.phone,subj:newTkt.subj,msgs:[{from:"vendor",text:newTkt.msg,ts:Date.now()}],status:"Open",created:Date.now()};
                  setTickets(p=>[t,...p]);
                  push("admin","New support ticket",`${t.id} from ${me.name}: ${newTkt.subj}`,"support");
                  setNewTkt({subj:"",msg:""});toast_("Ticket submitted ✓\nAYIF will respond shortly.");
                }}/>
              </div>
              {myTickets.length>0&&<>
                <div style={{fontSize:11,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:10}}>YOUR TICKETS</div>
                {myTickets.map(t=>(
                  <div key={t.id} style={{background:"#fff",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div><div style={{fontWeight:700,fontSize:14}}>{t.subj}</div><div style={{fontSize:11,color:"#aaa",marginTop:2}}>{t.id} · {ago(t.created)}</div></div>
                      <span style={{background:t.status==="Open"?"#fef9c3":t.status==="Replied"?"#dbeafe":"#dcfce7",color:t.status==="Open"?"#92400e":t.status==="Replied"?"#1e3a8a":"#166534",borderRadius:6,padding:"3px 9px",fontSize:10,fontWeight:700}}>{t.status}</span>
                    </div>
                    <div style={{borderTop:`1px dashed ${G.border}`,paddingTop:10,maxHeight:180,overflowY:"auto",marginBottom:8}}>
                      {t.msgs.map((m,i)=>(
                        <div key={i} style={{display:"flex",justifyContent:m.from==="vendor"?"flex-start":"flex-end",marginBottom:8}}>
                          <div style={{maxWidth:"78%",padding:"9px 13px",borderRadius:m.from==="vendor"?"12px 12px 12px 2px":"12px 12px 2px 12px",background:m.from==="vendor"?"#f5f0e8":`linear-gradient(135deg,${G.mid},${G.main})`,color:m.from==="vendor"?G.text:"#fff",fontSize:13}}>
                            {m.text}<div style={{fontSize:10,opacity:.6,marginTop:4}}>{m.from==="vendor"?"You":"AYIF"} · {ago(m.ts)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {t.status!=="Closed"&&<div style={{display:"flex",gap:8}}>
                      <input id={`reply-v-${t.id}`} placeholder="Reply…" style={{flex:1,padding:"9px 12px",borderRadius:10,border:`1.5px solid ${G.border}`,fontSize:13}} onKeyDown={e=>{if(e.key==="Enter"&&e.target.value){setTickets(p=>p.map(x=>x.id===t.id?{...x,msgs:[...x.msgs,{from:"vendor",text:e.target.value,ts:Date.now()}],status:"Open"}:x));e.target.value="";}}}/>
                      <button onClick={()=>{const inp=document.getElementById(`reply-v-${t.id}`);if(inp.value){setTickets(p=>p.map(x=>x.id===t.id?{...x,msgs:[...x.msgs,{from:"vendor",text:inp.value,ts:Date.now()}],status:"Open"}:x));inp.value="";}}} style={{padding:"9px 14px",background:G.mid,color:"#fff",border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer"}}>Send</button>
                    </div>}
                  </div>
                ))}
              </>}
            </div>
          )}

          {/* My Orders */}
          {page==="my_orders"&&(
            <div style={{padding:"14px 14px 20px",animation:"fadeUp .3s"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <button onClick={()=>setPage("catalog")} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:G.mid}}>←</button>
                <div className="logo-text" style={{fontSize:22,color:G.mid}}>My Orders</div>
              </div>
              {orders.filter(o=>o.vendorId===me?.id).length===0
                ?<div style={{textAlign:"center",padding:70}}><div style={{fontSize:54}}>📦</div><div style={{fontSize:14,color:"#aaa",marginTop:14}}>No orders yet. Start shopping!</div></div>
                :orders.filter(o=>o.vendorId===me?.id).map(o=>(
                  <div key={o.id} style={{background:"#fff",borderRadius:18,padding:16,marginBottom:14,boxShadow:"0 4px 16px rgba(0,0,0,.06)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                      <div><div className="logo-text" style={{fontSize:17,color:G.mid}}>{o.id}</div><div style={{fontSize:11,color:"#aaa",marginTop:2}}>{o.time}</div></div>
                      <div style={{textAlign:"right"}}><div style={{fontWeight:800,fontSize:18,color:G.mid}}>{R(o.total)}</div><StatusPill s={o.status}/><div style={{fontSize:11,color:G.muted,marginTop:2}}>{o.paymentMethod||"COD"}</div></div>
                    </div>
                    {o.savings>0&&<div style={{background:"#dcfce7",color:"#166534",padding:"7px 12px",borderRadius:8,fontSize:12,fontWeight:700,marginBottom:10}}>🎉 You saved {R(o.savings)} on this order!</div>}
                    <div style={{borderTop:`1px dashed ${G.border}`,paddingTop:12,marginBottom:12}}>
                      {["Order Placed","Confirmed","Dispatched","Delivered"].map((st,i)=>{const done=o.tracking?.find(t=>t.status===st);return(<div key={st} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}><div style={{width:24,height:24,borderRadius:"50%",flexShrink:0,marginTop:1,background:done?G.mid:"#e0d8cc",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",fontWeight:700}}>{done?"✓":i+1}</div><div><div style={{fontSize:13,fontWeight:done?700:400,color:done?G.mid:"#bbb"}}>{st}</div>{done&&<div style={{fontSize:11,color:"#aaa"}}>{done.time}</div>}</div></div>);})}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>openInvoice(o,adminCfg)} style={{flex:1,padding:"10px",background:`linear-gradient(135deg,${G.mid},${G.main})`,color:"#fff",border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer"}}>🧾 Invoice / Bill</button>
                      {adminCfg.phone&&<a href={`https://wa.me/91${adminCfg.phone}?text=Hi AYIF, query about ${o.id}`} target="_blank" rel="noreferrer" style={{flex:1,padding:"10px",background:"#25D366",color:"#fff",border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>💬 WhatsApp</a>}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Cart */}
          {page==="cart"&&(
            <div style={{padding:"14px 14px",animation:"fadeUp .3s",maxWidth:680,margin:"0 auto"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <button onClick={()=>setPage("catalog")} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:G.mid}}>←</button>
                <div className="logo-text" style={{fontSize:22,color:G.mid}}>Your Cart</div>
                <span style={{fontSize:12,color:G.muted}}>{cCount} items</span>
              </div>
              {cart.length===0
                ?<div style={{textAlign:"center",padding:80}}><div style={{fontSize:64}}>🛒</div><div style={{fontSize:15,color:"#aaa",marginTop:14}}>Your cart is empty</div><button className="tap" onClick={()=>setPage("catalog")} style={{marginTop:20,padding:"13px 32px",background:`linear-gradient(135deg,${G.mid},${G.main})`,color:"#fff",border:"none",borderRadius:50,cursor:"pointer",fontSize:14,fontWeight:700}}>Start Shopping</button></div>
                :<div>
                  {cart.map(item=>{
                    const d=disc(item.mrp,item.price);
                    const iSav=(item.mrp||item.price)*item.qty-item.price*item.qty;
                    return(
                      <div key={item.id} style={{background:"#fff",borderRadius:14,padding:14,marginBottom:12,display:"flex",gap:12,alignItems:"center",boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
                        <ProdImg img={item.img} name={item.name} sub={item.sub} cat={item.cat} cats={cats} size={62}/>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:700,fontSize:14}}>{item.name}</div>
                          <div style={{color:G.muted,fontSize:11}}>per {item.unit}</div>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:5,flexWrap:"wrap"}}>
                            <span style={{fontWeight:800,fontSize:16,color:G.mid}}>{R(item.price)}</span>
                            {item.mrp&&item.mrp>item.price&&<span style={{color:"#bbb",fontSize:12,textDecoration:"line-through"}}>{R(item.mrp)}</span>}
                            {d>0&&<DiscBadge mrp={item.mrp} price={item.price} size={9}/>}
                          </div>
                          {iSav>0&&<div style={{fontSize:11,color:"#16a34a",fontWeight:700,marginTop:3}}>💰 Saved {R(iSav)}</div>}
                        </div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                          <div style={{display:"flex",alignItems:"center",gap:4,background:"#e8f5e9",borderRadius:10,padding:"3px 6px"}}>
                            <button onClick={()=>chQty(item.id,-1)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:G.mid,fontWeight:700,width:22}}>−</button>
                            <span style={{fontSize:13,fontWeight:700,minWidth:20,textAlign:"center"}}>{item.qty}</span>
                            <button onClick={()=>chQty(item.id,1)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:G.mid,fontWeight:700,width:22}}>+</button>
                          </div>
                          <div style={{fontSize:13,fontWeight:800,color:G.mid}}>{R(item.price*item.qty)}</div>
                          <button onClick={()=>remCart(item.id)} style={{background:"none",border:"none",cursor:"pointer",color:G.red,fontSize:16}}>🗑</button>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{background:"#fff",borderRadius:16,padding:18,marginTop:6,boxShadow:"0 4px 16px rgba(0,0,0,.07)"}}>
                    <div className="logo-text" style={{fontSize:16,color:G.mid,marginBottom:12}}>Order Summary</div>
                    {cart.map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#666",marginBottom:6}}><span>{i.name} × {i.qty}</span><span style={{fontWeight:600}}>{R(i.price*i.qty)}</span></div>)}
                    {cSaved>0&&<>
                      <div style={{borderTop:`1px dashed ${G.border}`,marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between",fontSize:13,color:"#666"}}><span>MRP Total</span><span style={{textDecoration:"line-through"}}>{R(cMrp)}</span></div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#16a34a",fontWeight:700,marginTop:4}}><span>🎉 Your Savings</span><span>−{R(cSaved)} ({Math.round(cSaved/cMrp*100)}%)</span></div>
                    </>}
                    <div style={{borderTop:`2px solid ${G.mid}`,marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:18,color:G.mid}}><span>Total</span><span>{R(cTotal)}</span></div>
                    {cSaved>0&&<div style={{background:"#dcfce7",color:"#166534",padding:"8px 12px",borderRadius:8,fontSize:12,fontWeight:700,marginTop:10,textAlign:"center"}}>You saved {R(cSaved)} on this order!</div>}
                  </div>
                  {coStep===1&&(
                    <div style={{background:"#fff",borderRadius:16,padding:18,marginTop:12,animation:"fadeUp .2s",boxShadow:"0 4px 16px rgba(0,0,0,.07)"}}>
                      <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>📍 Delivery Address</div>
                      <div style={{background:"#e8f5e9",borderRadius:12,padding:"13px 15px",marginBottom:14}}><div style={{fontWeight:700,fontSize:14}}>{me?.name}</div><div style={{fontSize:13,color:"#555",marginTop:3}}>{me?.addr}</div><div style={{fontSize:12,color:G.muted,marginTop:2}}>{me?.state} · {me?.phone}</div></div>
                      <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>💳 Payment Method</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                        {["Cash on Delivery","UPI Payment"].map(pm=><button key={pm} onClick={()=>setPayMethod(pm)} className="tap" style={{padding:"14px 8px",borderRadius:14,border:`2px solid ${payMethod===pm?G.mid:G.border}`,background:payMethod===pm?"#e8f5e9":"#fff",cursor:"pointer",fontWeight:700,fontSize:12,color:payMethod===pm?G.mid:G.muted,textAlign:"center"}}><div style={{fontSize:24,marginBottom:4}}>{pm==="Cash on Delivery"?"💵":"💳"}</div>{pm}</button>)}
                      </div>
                      {payMethod==="UPI Payment"&&adminCfg.upiId&&<div style={{background:"linear-gradient(135deg,#fffde7,#fff8c4)",borderRadius:12,padding:14,marginBottom:14,textAlign:"center",border:`1.5px solid ${G.gold}`}}><div style={{fontSize:10,color:"#888",letterSpacing:2}}>PAY TO UPI</div><div className="logo-text" style={{fontSize:20,color:G.mid,marginTop:4}}>{adminCfg.upiId}</div></div>}
                      <Field label="Order Note (optional)"><textarea value={oNote} onChange={e=>setONote(e.target.value)} placeholder="Special instructions…" style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${G.border}`,fontSize:13,resize:"none",height:70,background:"#fff"}}/></Field>
                    </div>
                  )}
                  <div style={{marginTop:16}}>
                    {coStep===0?<Btn ch={`Proceed to Order · ${R(cTotal)} →`} onClick={()=>setCoStep(1)}/>:<Btn v="gold" ch="✅ Confirm & Place Order" onClick={placeOrder}/>}
                  </div>
                </div>
              }
            </div>
          )}

          {/* Install Guide */}
          {page==="install"&&(
            <div style={{padding:"18px 16px",animation:"fadeUp .3s"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
                <button onClick={()=>setPage("catalog")} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:G.mid}}>←</button>
                <div className="logo-text" style={{fontSize:22,color:G.mid}}>Install AYIF App</div>
              </div>
              {[{t:"Get the App Link",ic:"🔗",c:"#1565c0",s:["Admin shares link via WhatsApp","Tap to open in browser"]},
                {t:"Android — Chrome",ic:"🤖",c:"#1b5e20",s:["Open in Chrome","Tap ⋮ (3 dots)","Tap 'Add to Home Screen'","Done ✅"]},
                {t:"iPhone — Safari",ic:"🍎",c:"#7e1d1d",s:["MUST use Safari","Tap Share ↑","'Add to Home Screen'","Done ✅"]},
                {t:"Login & Order",ic:"🔑",c:G.amber,s:["Tap AYIF app icon","Vendor Login","Phone + password","Order away ✅"]},
              ].map((s,si)=>(
                <div key={si} style={{background:"#fff",borderRadius:18,padding:18,marginBottom:14,boxShadow:"0 4px 16px rgba(0,0,0,.06)",borderLeft:`4px solid ${s.c}`}}>
                  <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}><span style={{fontSize:26}}>{s.ic}</span><div style={{fontWeight:700,fontSize:16,color:s.c}}>{s.t}</div></div>
                  {s.s.map((st,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}><div style={{width:22,height:22,borderRadius:"50%",background:s.c,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{i+1}</div><div style={{fontSize:13,color:"#444",lineHeight:1.5}}>{st}</div></div>)}
                </div>
              ))}
            </div>
          )}

          {/* CATALOG */}
          {page==="catalog"&&(
            <div style={{paddingBottom:20}}>
              {activeCat&&<div style={{padding:"14px 16px 0",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                <button onClick={()=>{setActiveCat(null);setActiveSub(null);}} style={{background:"none",border:"none",cursor:"pointer",color:G.mid,fontSize:13,fontWeight:700}}>← All</button>
                <span style={{color:"#aaa",fontSize:14}}>›</span>
                <span style={{fontSize:13,fontWeight:700,color:G.mid}}>{cats.find(c=>c.id===activeCat)?.label}</span>
                {activeSub&&<><span style={{color:"#aaa",fontSize:14}}>›</span><span style={{fontSize:13,fontWeight:700,color:G.main}}>{activeSub}</span></>}
              </div>}

              {/* ── HOMEPAGE ── */}
              {!activeCat&&!searchQ&&(
                <div style={{padding:"14px 14px 0"}}>
                  {/* Hero banner */}
                  <div style={{background:`linear-gradient(135deg,${G.mid},${G.main})`,borderRadius:18,padding:"18px 20px",marginBottom:18,position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:-30,right:-30,width:130,height:130,background:"radial-gradient(circle,rgba(124,192,79,.25),transparent)",borderRadius:"50%"}}/>
                    <div style={{position:"relative",zIndex:1}}>
                      <div style={{color:G.light,fontSize:10,letterSpacing:2.5,fontWeight:700,marginBottom:5}}>TODAY'S WHOLESALE PRICES</div>
                      <div className="logo-text" style={{fontSize:22,color:"#fff",lineHeight:1.2}}>Fresh stock daily<br/>Best B2B rates</div>
                      <div style={{color:"rgba(255,255,255,.65)",fontSize:12,marginTop:6}}>📅 {today()} · Cash & UPI accepted</div>
                    </div>
                  </div>
                  {/* Quick stats */}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
                    {[{ic:"📦",lb:"Products",v:prods.length,c:G.mid},{ic:"🏷️",lb:"Categories",v:visCats.length,c:"#e65100"},{ic:"💰",lb:"Deals Today",v:prods.filter(p=>disc(p.mrp,p.price)>=10).length,c:G.red}].map(s=>(
                      <div key={s.lb} className="card" style={{background:"#fff",borderRadius:12,padding:"10px 8px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
                        <div style={{fontSize:20}}>{s.ic}</div>
                        <div className="logo-text" style={{fontSize:18,color:s.c,marginTop:2}}>{s.v}</div>
                        <div style={{fontSize:10,color:G.muted,fontWeight:600,marginTop:1}}>{s.lb}</div>
                      </div>
                    ))}
                  </div>
                  {/* Category sections */}
                  {visCats.map(section=>(
                    <div key={section.id} style={{marginBottom:28}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                        <div className="logo-text" style={{fontSize:17,color:G.mid}}>{section.emoji} {section.label}</div>
                        <button onClick={()=>{setActiveCat(section.id);setActiveSub(null);}} style={{background:"none",border:"none",color:G.main,fontSize:12,fontWeight:700,cursor:"pointer"}}>See all ›</button>
                      </div>
                      <div className="cat-grid">
                        {section.subs.map(sub=>(
                          <button key={sub.name} onClick={()=>{setActiveCat(section.id);setActiveSub(sub.name);}} className="tap card"
                            style={{background:"#fff",border:"none",borderRadius:14,padding:"12px 6px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                            <div style={{width:56,height:56,borderRadius:12,background:section.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{sub.emoji}</div>
                            <div style={{fontSize:9.5,fontWeight:700,color:"#444",textAlign:"center",lineHeight:1.3,minHeight:24}}>{sub.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Sub-category chips */}
              {activeCat&&<div style={{padding:"12px 14px 0"}}>
                <div style={{display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none",paddingBottom:8}}>
                  <button onClick={()=>setActiveSub(null)} className="tap" style={{padding:"7px 14px",borderRadius:50,border:"none",cursor:"pointer",fontSize:11.5,fontWeight:700,whiteSpace:"nowrap",background:!activeSub?G.mid:"#fff",color:!activeSub?"#fff":G.muted,boxShadow:"0 1px 4px rgba(0,0,0,.07)"}}>All</button>
                  {cats.find(c=>c.id===activeCat)?.subs.map(sub=>(
                    <button key={sub.name} onClick={()=>setActiveSub(sub.name)} className="tap" style={{padding:"7px 14px",borderRadius:50,border:"none",cursor:"pointer",fontSize:11.5,fontWeight:700,whiteSpace:"nowrap",background:activeSub===sub.name?G.mid:"#fff",color:activeSub===sub.name?"#fff":G.muted,boxShadow:"0 1px 4px rgba(0,0,0,.07)"}}>{sub.emoji} {sub.name}</button>
                  ))}
                </div>
              </div>}

              {/* Products */}
              {(activeCat||searchQ)&&(
                <div style={{padding:"12px 14px"}}>
                  {filtProds.length===0
                    ?<div style={{textAlign:"center",padding:60,color:"#bbb"}}><div style={{fontSize:42}}>🔍</div><div style={{marginTop:10,fontSize:14}}>No products found</div><button className="tap" onClick={()=>{setSearchQ("");setActiveCat(null);setActiveSub(null);}} style={{marginTop:14,padding:"9px 22px",background:G.mid,color:"#fff",border:"none",borderRadius:50,cursor:"pointer",fontSize:12,fontWeight:600}}>Browse Categories</button></div>
                    :<div className="prod-grid">{filtProds.map((p,i)=><VendorProdCard key={p.id} p={p} cats={cats} onAdd={addToCart} delay={Math.min(i*.03,.3)}/>)}</div>
                  }
                </div>
              )}
            </div>
          )}

          {/* Float cart bar */}
          {page==="catalog"&&cCount>0&&(
            <div style={{position:"fixed",bottom:62,left:"50%",transform:"translateX(-50%)",width:"calc(100% - 28px)",maxWidth:520,zIndex:50}}>
              <button className="tap" onClick={()=>setPage("cart")} style={{width:"100%",padding:"15px 20px",background:`linear-gradient(135deg,${G.mid},${G.main})`,color:"#fff",border:"none",borderRadius:18,fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:`0 8px 32px rgba(14,74,31,.55)`}}>
                <span style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"3px 10px",fontSize:12}}>{cCount} items</span>
                <span>View Cart →</span>
                <span style={{fontWeight:900}}>{R(cTotal)}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="bottom-nav">
        {[["🏠","Home","catalog"],["🛒","Cart","cart"],["📦","Orders","my_orders"],["🔔","Alerts","notifs"],["💬","Help",null]].map(([ic,lb,pg])=>(
          <button key={lb} onClick={()=>{if(!pg)setSupportDlg(true);else setPage(pg);}} style={{flex:1,padding:"10px 0",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,color:(page===pg&&pg)?G.mid:"#aaa",fontSize:9,fontWeight:700,position:"relative"}}>
            <span style={{fontSize:20}}>{ic}</span>{lb}
            {lb==="Cart"&&cCount>0&&<span style={{position:"absolute",top:5,right:"50%",marginRight:-18,background:G.gold,color:G.dark,borderRadius:"50%",minWidth:16,height:16,padding:"0 4px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800}}>{cCount}</span>}
            {lb==="Alerts"&&unread>0&&<span style={{position:"absolute",top:5,right:"50%",marginRight:-18,background:G.red,color:"#fff",borderRadius:"50%",minWidth:16,height:16,padding:"0 4px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800}}>{unread}</span>}
          </button>
        ))}
      </div>
      </>
    );
  }

  /* ════════════════════ ADMIN ══════════════════════════════════ */
  if(page==="admin") return (
    <AdminPortal
      adminCfg={adminCfg} setAdminCfg={setAdminCfg}
      adminTab={adminTab} setAdminTab={setAdminTab}
      cats={cats} setCats={setCats}
      prods={prods} setProds={setProds}
      vendors={vendors} setVendors={setVendors}
      orders={orders} filtOrders={filtOrders}
      oFilter={oFilter} setOFilter={setOFilter}
      updateStatus={updateStatus}
      tickets={tickets} setTickets={setTickets}
      anns={anns} setAnns={setAnns}
      notifs={adminNotifs} push={push}
      priceModal={priceModal} setPriceModal={setPriceModal}
      priceEdits={priceEdits} setPriceEdits={setPriceEdits}
      pendingCt={pendingCt} openTkts={openTkts}
      totalRev={totalRev} totalProfit={totalProfit}
      outStock={outStock} lowStock={lowStock}
      editP={editP} setEditP={setEditP}
      addPOpen={addPOpen} setAddPOpen={setAddPOpen}
      newP={newP} setNewP={setNewP}
      addVOpen={addVOpen} setAddVOpen={setAddVOpen}
      newV={newV} setNewV={setNewV}
      resetV={resetV} setResetV={setResetV}
      resetVPass={resetVPass} setResetVPass={setResetVPass}
      editCat={editCat} setEditCat={setEditCat}
      addCatOpen={addCatOpen} setAddCatOpen={setAddCatOpen}
      newCat={newCat} setNewCat={setNewCat}
      subInput={subInput} setSubInput={setSubInput}
      sOld={sOld} setSOld={setSOld} sUser={sUser} setSUser={setSUser}
      sPass={sPass} setSPass={setSPass} sPin={sPin} setSPin={setSPin}
      sPhone={sPhone} setSPhone={setSPhone} sUpi={sUpi} setSUpi={setSUpi}
      sGst={sGst} setSGst={setSGst}
      newAnn={newAnn} setNewAnn={setNewAnn}
      tktReply={tktReply} setTktReply={setTktReply}
      toast_={toast_} setPage={setPage}
    />
  );

  return null;
}

/* ─── Vendor Product Card ──────────────────────────────────────── */
function VendorProdCard({p,cats,onAdd,delay=0}) {
  const [qty,setQty]=useState(1);
  const [added,setAdded]=useState(false);
  const d=disc(p.mrp,p.price);
  const sec=cats.find(c=>c.id===p.cat);
  return(
    <div className="card" style={{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.07)",animation:`fadeUp .3s ease ${delay}s both`,display:"flex",flexDirection:"column"}}>
      <div style={{height:112,background:sec?.bg||"#e8f5e3",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",flexShrink:0}}>
        {p.img?<img src={p.img} style={{width:"100%",height:"100%",objectFit:"cover"}} alt={p.name}/>:<span style={{fontSize:50}}>{sec?.subs?.find(s=>s.name===p.sub)?.emoji||sec?.emoji||"📦"}</span>}
        {p.stock===0&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.48)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:10,fontWeight:700,background:G.red,padding:"3px 9px",borderRadius:6}}>Out of Stock</span></div>}
        {d>0&&<div style={{position:"absolute",top:6,left:6}}><DiscBadge mrp={p.mrp} price={p.price} size={9}/></div>}
      </div>
      <div style={{padding:"10px 12px",flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        <div>
          <div style={{fontWeight:700,fontSize:13,lineHeight:1.3,marginBottom:2}}>{p.name}</div>
          {p.desc&&<div style={{fontSize:10,color:G.muted,lineHeight:1.3,marginBottom:3}}>{p.desc}</div>}
          <div style={{fontSize:9,color:"#bbb",marginBottom:6}}>per {p.unit}</div>
          {/* Price block */}
          <div style={{background:"#f5f9f5",borderRadius:8,padding:"7px 8px",marginBottom:2}}>
            {p.mrp&&p.mrp>p.price&&<div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
              <span style={{fontSize:10,color:"#bbb",textDecoration:"line-through"}}>{R(p.mrp)}</span>
              <span style={{fontSize:9,color:G.muted}}>MRP</span>
            </div>}
            <div style={{display:"flex",alignItems:"baseline",gap:5}}>
              <span className="logo-text" style={{fontSize:17,color:G.mid}}>{R(p.price)}</span>
              {d>0&&<span style={{fontSize:10,color:"#16a34a",fontWeight:700}}>you save {R((p.mrp-p.price))}</span>}
            </div>
          </div>
        </div>
        {p.stock>0&&<div style={{display:"flex",alignItems:"center",gap:6,marginTop:8,justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",background:"#e8f5e9",borderRadius:8,overflow:"hidden"}}>
            <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{padding:"5px 9px",background:"none",border:"none",cursor:"pointer",fontSize:16,color:G.mid,fontWeight:700}}>−</button>
            <span style={{fontSize:12,fontWeight:700,padding:"0 3px",minWidth:18,textAlign:"center"}}>{qty}</span>
            <button onClick={()=>setQty(q=>q+1)} style={{padding:"5px 9px",background:"none",border:"none",cursor:"pointer",fontSize:16,color:G.mid,fontWeight:700}}>+</button>
          </div>
          <button onClick={()=>{onAdd(p,qty);setAdded(true);setTimeout(()=>setAdded(false),1200);}} className="tap"
            style={{padding:"7px 12px",background:added?G.gold:`linear-gradient(135deg,${G.mid},${G.main})`,color:added?G.dark:"#fff",border:"none",borderRadius:9,cursor:"pointer",fontSize:11,fontWeight:700,transition:"background .2s",flex:1,marginLeft:4}}>
            {added?"✓ Added":"Add to Cart"}
          </button>
        </div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   ADMIN PORTAL (separate component)
════════════════════════════════════════════════════════════════ */
function AdminPortal(p) {
  const {adminCfg,setAdminCfg,adminTab,setAdminTab,cats,setCats,prods,setProds,vendors,setVendors,orders,filtOrders,oFilter,setOFilter,updateStatus,tickets,setTickets,anns,setAnns,notifs,push,priceModal,setPriceModal,priceEdits,setPriceEdits,pendingCt,openTkts,totalRev,totalProfit,outStock,lowStock,editP,setEditP,addPOpen,setAddPOpen,newP,setNewP,addVOpen,setAddVOpen,newV,setNewV,resetV,setResetV,resetVPass,setResetVPass,editCat,setEditCat,addCatOpen,setAddCatOpen,newCat,setNewCat,subInput,setSubInput,sOld,setSOld,sUser,setSUser,sPass,setSPass,sPin,setSPin,sPhone,setSPhone,sUpi,setSUpi,sGst,setSGst,newAnn,setNewAnn,tktReply,setTktReply,toast_,setPage} = p;

  const tabs=[["📊","Dash","dash"],["📦","Products","prods"],["🛍","Orders","orders"],["👥","Vendors","vendors"],["🗂","Cats","cats"],["🎫","Support","support"],["📢","Broadcast","broadcast"],["⚙️","Settings","settings"]];

  const getSubsFor=catId=>cats.find(c=>c.id===catId)?.subs.map(s=>s.name)||[];

  /* Price update modal */
  const PriceModal = () => (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn .2s"}}>
      <div style={{background:"#fff",borderRadius:"24px 24px 0 0",padding:24,width:"100%",maxWidth:600,maxHeight:"85vh",overflowY:"auto",animation:"fadeUp .25s"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div><div className="logo-text" style={{fontSize:22,color:G.mid}}>⚡ Daily Price Update</div><div style={{fontSize:12,color:G.muted}}>{today()}</div></div>
          <button onClick={()=>{setPriceModal(false);setPriceEdits({});}} style={{background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:22}}>×</button>
        </div>
        {prods.map(pr=>(
          <div key={pr.id} style={{display:"flex",gap:10,alignItems:"center",marginBottom:10,background:"#f5f0e8",borderRadius:12,padding:"11px 12px"}}>
            <ProdImg img={pr.img} name={pr.name} sub={pr.sub} cat={pr.cat} cats={cats} size={42} r={8}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:13}}>{pr.name}</div>
              <div style={{fontSize:11,color:G.muted}}>MRP {R(pr.mrp)} · Sell {R(pr.price)} / {pr.unit}</div>
            </div>
            <input type="number" placeholder="New ₹" value={priceEdits[pr.id]||""} onChange={e=>setPriceEdits(prev=>({...prev,[pr.id]:e.target.value}))} style={{width:88,padding:"8px",borderRadius:8,border:`1.5px solid ${G.border}`,fontSize:13,textAlign:"right",fontWeight:700}}/>
          </div>
        ))}
        <Btn ch="✅ Apply & Notify Vendors" onClick={()=>{
          let n=0;
          setProds(prev=>prev.map(pr=>{if(priceEdits[pr.id]&&+priceEdits[pr.id]>0){n++;return{...pr,price:+priceEdits[pr.id]};}return pr;}));
          vendors.forEach(v=>push(v.id,"📢 New prices live!",`Today's updated prices are live — check the catalog.`,"info","catalog"));
          setPriceEdits({});setPriceModal(false);
          toast_(`${n} prices updated ✓\nVendors notified!`);
        }}/>
      </div>
    </div>
  );

  return (
    <><CSS/>
    {priceModal&&<PriceModal/>}

    {/* Vendor Reset Modal */}
    {resetV&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{background:"#fff",borderRadius:22,padding:26,maxWidth:380,width:"100%",animation:"pop .3s"}}>
          <div className="logo-text" style={{fontSize:20,color:G.mid,marginBottom:6}}>🔑 Reset Password</div>
          <div style={{fontSize:13,color:G.muted,marginBottom:14}}>For: <b>{resetV.name}</b></div>
          <Field label="New Password" req><Input placeholder="e.g. ayif2026" value={resetVPass} onChange={e=>setResetVPass(e.target.value)}/></Field>
          <div style={{display:"flex",gap:10}}>
            <Btn v="ghost" style={{flex:1}} ch="Cancel" onClick={()=>{setResetV(null);setResetVPass("");}}/>
            <Btn style={{flex:1}} ch="Reset & Notify" onClick={()=>{
              if(!resetVPass){toast_("Enter a new password","err");return;}
              setVendors(prev=>prev.map(v=>v.id===resetV.id?{...v,pass:resetVPass}:v));
              push(resetV.id,"Password reset","Your password has been reset by AYIF admin. Please log in with the new password.","warn");
              toast_(`Password reset for ${resetV.name}!\nNew: ${resetVPass}`);
              setResetV(null);setResetVPass("");
            }}/>
          </div>
        </div>
      </div>
    )}

    {/* Edit Cat Modal */}
    {editCat&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn .2s"}}>
        <div style={{background:"#fff",borderRadius:"24px 24px 0 0",padding:24,width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto",animation:"fadeUp .25s"}}>
          <div className="logo-text" style={{fontSize:20,color:G.mid,marginBottom:14}}>✏️ Edit Category</div>
          <Field label="Category Name" req><Input value={editCat.label} onChange={e=>setEditCat({...editCat,label:e.target.value})}/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <Field label="Emoji"><Input value={editCat.emoji} onChange={e=>setEditCat({...editCat,emoji:e.target.value})} maxLength={2}/></Field>
            <Field label="Background"><Input type="color" value={editCat.bg} onChange={e=>setEditCat({...editCat,bg:e.target.value})}/></Field>
          </div>
          <Field label={`Sub-categories (${editCat.subs.length})`}>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
              {editCat.subs.map((s,i)=><span key={i} style={{background:"#e8f5e9",color:G.mid,borderRadius:12,padding:"5px 10px",fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:5}}>{s.emoji} {s.name}<button onClick={()=>setEditCat({...editCat,subs:editCat.subs.filter((_,j)=>j!==i)})} style={{background:"none",border:"none",cursor:"pointer",color:G.red,fontSize:14}}>×</button></span>)}
            </div>
            <div style={{display:"flex",gap:8}}>
              <Input placeholder="Sub name" value={subInput.name} onChange={e=>setSubInput({...subInput,name:e.target.value})} style={{flex:1}}/>
              <Input placeholder="📦" maxLength={2} value={subInput.emoji} onChange={e=>setSubInput({...subInput,emoji:e.target.value})} style={{width:50,textAlign:"center",fontSize:14}}/>
              <button onClick={()=>{if(!subInput.name)return;setEditCat({...editCat,subs:[...editCat.subs,{...subInput}]});setSubInput({name:"",emoji:"📦"});}} style={{padding:"9px 14px",background:G.mid,color:"#fff",border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer"}}>＋</button>
            </div>
          </Field>
          <div style={{display:"flex",gap:10,marginTop:12}}>
            <Btn v="ghost" style={{flex:1}} ch="Cancel" onClick={()=>setEditCat(null)}/>
            <Btn style={{flex:2}} ch="💾 Save" onClick={()=>{setCats(prev=>prev.map(c=>c.id===editCat.id?editCat:c));setEditCat(null);toast_("Category updated ✓");}}/>
          </div>
        </div>
      </div>
    )}

    {/* Edit Prod Modal */}
    {editP&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn .2s"}}>
        <div style={{background:"#f5f0e8",borderRadius:"24px 24px 0 0",padding:22,width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto",animation:"fadeUp .25s"}}>
          <ProdForm data={editP} setData={setEditP} title="✏️ Edit Product" cats={cats} getSubsFor={getSubsFor}
            onSave={()=>{setProds(prev=>prev.map(x=>x.id===editP.id?{...editP,mrp:+(editP.mrp||editP.price),price:+editP.price,cost:+(editP.cost||0),stock:+editP.stock}:x));setEditP(null);toast_("Updated ✓");}}
            onCancel={()=>setEditP(null)} toast_={toast_}/>
        </div>
      </div>
    )}

    <div style={{maxWidth:1280,margin:"0 auto",minHeight:"100vh",background:G.cream,paddingBottom:80}}>
      {/* Admin header */}
      <div style={{background:`linear-gradient(135deg,${G.dark},${G.mid})`,padding:"16px 16px 0",borderBottomLeftRadius:24,borderBottomRightRadius:24,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:150,height:150,background:"radial-gradient(circle,rgba(124,192,79,.15),transparent)",borderRadius:"50%"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <AyifLogo size={40}/>
            <div><AyifName size={22}/><div style={{color:"rgba(255,255,255,.4)",fontSize:9,letterSpacing:2.5,fontWeight:700,marginTop:1}}>ADMIN · {adminCfg.user}</div></div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            {pendingCt>0&&<span style={{background:G.gold,color:G.dark,borderRadius:12,padding:"4px 11px",fontSize:11,fontWeight:800}}>🔔 {pendingCt}</span>}
            {openTkts>0&&<span style={{background:G.red,color:"#fff",borderRadius:12,padding:"4px 11px",fontSize:11,fontWeight:800}}>🎫 {openTkts}</span>}
            <button className="tap" onClick={()=>setPriceModal(true)} style={{background:"rgba(240,192,64,.22)",border:"none",borderRadius:12,padding:"7px 11px",color:G.gold,cursor:"pointer",fontSize:11,fontWeight:700}}>⚡ Prices</button>
            <button className="tap" onClick={()=>setPage("splash")} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"7px 11px",color:"rgba(255,255,255,.7)",cursor:"pointer",fontSize:11}}>Logout</button>
          </div>
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none",paddingBottom:14,position:"relative",zIndex:1}}>
          {tabs.map(([ic,lb,tb])=>(
            <button key={tb} onClick={()=>setAdminTab(tb)} className="tap"
              style={{padding:"8px 14px",borderRadius:22,border:"none",cursor:"pointer",fontSize:11.5,fontWeight:700,whiteSpace:"nowrap",background:adminTab===tb?`linear-gradient(135deg,${G.gold},${G.goldDark})`:"rgba(255,255,255,.1)",color:adminTab===tb?G.dark:"rgba(255,255,255,.7)"}}>
              {ic} {lb}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"16px 14px 10px",maxWidth:1100,margin:"0 auto"}}>

        {/* ── DASHBOARD ── */}
        {adminTab==="dash"&&(
          <div style={{animation:"fadeUp .3s"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:14}}>
              {[
                {ic:"💰",lb:"Revenue",v:R(totalRev),  sub:"Delivered orders",    c:G.mid,   bg:"#dcfce7"},
                {ic:"📈",lb:"Profit",  v:R(totalProfit),sub:`${pct(totalProfit,totalRev)}% margin`,c:G.blue, bg:"#dbeafe"},
                {ic:"🛍",lb:"Orders",  v:orders.length, sub:`${pendingCt} pending`, c:G.amber, bg:"#fef3c7"},
                {ic:"📦",lb:"Products",v:prods.length,  sub:`${outStock.length} out`, c:G.red,  bg:"#fee2e2"},
                {ic:"👥",lb:"Vendors", v:vendors.length,sub:"registered",          c:"#4a148c",bg:"#f3e8ff"},
                {ic:"🎫",lb:"Tickets", v:openTkts,     sub:"need response",       c:G.red,   bg:"#ffe4e1"},
              ].map(k=>(
                <div key={k.lb} className="card" style={{background:"#fff",borderRadius:16,padding:"14px",boxShadow:"0 4px 14px rgba(0,0,0,.06)",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:-15,right:-15,width:60,height:60,background:k.bg,borderRadius:"50%",opacity:.6}}/>
                  <div style={{position:"relative",zIndex:1}}>
                    <div style={{fontSize:24}}>{k.ic}</div>
                    <div className="logo-text" style={{fontSize:22,color:k.c,marginTop:4,lineHeight:1}}>{k.v}</div>
                    <div style={{fontSize:12,fontWeight:700,color:G.text,marginTop:5}}>{k.lb}</div>
                    <div style={{fontSize:11,color:G.muted,marginTop:1}}>{k.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            {(outStock.length>0||lowStock.length>0)&&(
              <div style={{background:"linear-gradient(135deg,#fff8e1,#fffde7)",borderRadius:16,padding:16,marginBottom:14,border:`1.5px solid ${G.gold}`}}>
                <div style={{fontWeight:700,fontSize:14,color:G.amber,marginBottom:10}}>⚠️ Stock Alerts</div>
                {outStock.map(pr=><div key={pr.id} style={{fontSize:12,color:G.red,marginBottom:5}}>🔴 <b>{pr.name}</b> — Out of stock</div>)}
                {lowStock.map(pr=><div key={pr.id} style={{fontSize:12,color:G.amber,marginBottom:5}}>🟡 <b>{pr.name}</b> — Only {pr.stock} left</div>)}
              </div>
            )}
            <div style={{background:"#fff",borderRadius:16,padding:16,boxShadow:"0 2px 12px rgba(0,0,0,.06)"}}>
              <div className="logo-text" style={{fontSize:18,marginBottom:14,color:G.mid}}>Recent Orders</div>
              {orders.length===0?<div style={{color:"#aaa",fontSize:13,textAlign:"center",padding:20}}>No orders yet</div>:orders.slice(0,5).map(o=>(
                <div key={o.id} style={{borderBottom:`1px solid ${G.cream}`,paddingBottom:10,marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontWeight:700,fontSize:13}}>{o.vendorName}</div><div style={{fontSize:11,color:"#aaa"}}>{o.id} · {o.time}</div></div>
                    <div style={{textAlign:"right"}}><div style={{fontWeight:800,fontSize:14,color:G.mid}}>{R(o.total)}</div><StatusPill s={o.status}/></div>
                  </div>
                  <div style={{display:"flex",gap:6,marginTop:8}}>
                    <button onClick={()=>openInvoice(o,adminCfg)} style={{flex:1,padding:"7px",background:`linear-gradient(135deg,${G.mid},${G.main})`,color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>🧾 Invoice</button>
                    {adminCfg.phone&&<a href={`https://wa.me/91${o.phone}?text=Order update: ${o.id}`} target="_blank" rel="noreferrer" style={{flex:1,padding:"7px",background:"#25D366",color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>💬 WA</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PRODUCTS ── */}
        {adminTab==="prods"&&(
          <div style={{animation:"fadeUp .3s"}}>
            <Btn v={addPOpen?"red":"gold"} ch={addPOpen?"✕ Cancel":"＋ Add New Product"} onClick={()=>setAddPOpen(!addPOpen)} style={{marginBottom:14}}/>
            {addPOpen&&<ProdForm data={newP} setData={setNewP} title="✨ Add Product" cats={cats} getSubsFor={getSubsFor} toast_={toast_}
              onSave={()=>{if(!newP.name||!newP.price||newP.stock===""){toast_("Fill required fields","err");return;}setProds(prev=>[...prev,{...newP,id:Date.now(),mrp:+(newP.mrp||newP.price),price:+newP.price,cost:+(newP.cost||0),stock:+newP.stock}]);setNewP({name:"",cat:"ce",sub:"Rice",unit:"kg",mrp:"",price:"",cost:"",stock:"",desc:"",img:""});setAddPOpen(false);toast_("Product added ✓");}}
              onCancel={()=>setAddPOpen(false)}/>}
            {prods.map(pr=>{
              const sec=cats.find(c=>c.id===pr.cat);
              const d=disc(pr.mrp,pr.price);
              const margin=pr.cost&&pr.price?Math.round((pr.price-pr.cost)/pr.price*100):0;
              return(
                <div key={pr.id} className="card" style={{background:"#fff",borderRadius:14,padding:14,marginBottom:12,display:"flex",gap:12,alignItems:"center",boxShadow:"0 2px 10px rgba(0,0,0,.06)",borderLeft:`4px solid ${pr.stock===0?G.red:pr.stock<=10?G.amber:G.main}`}}>
                  <ProdImg img={pr.img} name={pr.name} sub={pr.sub} cat={pr.cat} cats={cats} size={62}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:14}}>{pr.name}</div>
                    <div style={{fontSize:11,color:G.muted}}>{sec?.label||pr.cat} › {pr.sub} · {pr.unit}</div>
                    <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap",alignItems:"center"}}>
                      <span className="logo-text" style={{fontSize:16,color:G.mid}}>{R(pr.price)}</span>
                      {pr.mrp&&pr.mrp>pr.price&&<span style={{fontSize:11,color:"#bbb",textDecoration:"line-through"}}>{R(pr.mrp)}</span>}
                      {d>0&&<DiscBadge mrp={pr.mrp} price={pr.price} size={9}/>}
                      <span style={{fontSize:10,color:G.muted}}>Cost: {R(pr.cost||0)}</span>
                      <span style={{fontSize:10,fontWeight:700,color:G.main}}>+{R(pr.price-(pr.cost||0))} ({margin}%)</span>
                    </div>
                    <span style={{fontSize:11,padding:"3px 9px",borderRadius:6,fontWeight:700,marginTop:5,display:"inline-block",background:pr.stock===0?"#fee2e2":pr.stock<=10?"#fef3c7":"#dcfce7",color:pr.stock===0?G.red:pr.stock<=10?G.amber:"#166534"}}>{pr.stock===0?"Out of stock":pr.stock<=10?`⚠ Low: ${pr.stock}`:`✓ ${pr.stock} units`}</span>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    <button className="tap" onClick={()=>setEditP({...pr})} style={{padding:"8px 14px",background:"#dcfce7",color:G.mid,border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>✏️ Edit</button>
                    <button className="tap" onClick={()=>{if(window.confirm(`Delete ${pr.name}?`)){setProds(prev=>prev.filter(x=>x.id!==pr.id));toast_("Removed","warn");}}} style={{padding:"8px 14px",background:"#fee2e2",color:G.red,border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>🗑 Del</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── ORDERS ── */}
        {adminTab==="orders"&&(
          <div style={{animation:"fadeUp .3s"}}>
            <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
              {["All","Pending","Confirmed","Dispatched","Delivered"].map(f=><button key={f} onClick={()=>setOFilter(f)} className="tap" style={{padding:"7px 13px",borderRadius:22,border:"none",cursor:"pointer",fontSize:11.5,fontWeight:700,background:oFilter===f?G.mid:"#fff",color:oFilter===f?"#fff":G.muted,boxShadow:"0 1px 4px rgba(0,0,0,.07)"}}>{f}</button>)}
            </div>
            {filtOrders.length===0?<div style={{textAlign:"center",padding:60,color:"#bbb"}}><div style={{fontSize:42}}>🔔</div><div style={{marginTop:10}}>No orders</div></div>:filtOrders.map(o=>(
              <div key={o.id} style={{background:"#fff",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <div>
                    <div className="logo-text" style={{fontSize:17,color:G.mid}}>{o.id}</div>
                    <div style={{fontSize:13,fontWeight:700,marginTop:2}}>{o.vendorName}</div>
                    <div style={{fontSize:12,color:G.muted}}>📞 {o.phone}</div>
                    <div style={{fontSize:12,color:G.muted}}>📍 {o.shopAddr||o.shopAddress}, {o.state}</div>
                    <div style={{fontSize:11,color:"#aaa"}}>{o.time}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontWeight:900,fontSize:18,color:G.mid}}>{R(o.total)}</div>
                    <StatusPill s={o.status}/>
                    <div style={{fontSize:11,color:G.muted,marginTop:3}}>{o.paymentMethod||"COD"}</div>
                    {o.savings>0&&<div style={{fontSize:10,color:"#16a34a",fontWeight:700,marginTop:2}}>Saved {R(o.savings)}</div>}
                  </div>
                </div>
                <div style={{borderTop:`1px dashed ${G.border}`,paddingTop:10,marginBottom:10}}>
                  {o.items.map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4,color:"#555"}}><span>{i.name} × {i.qty} ({i.unit})</span><span style={{fontWeight:600}}>{R(i.price*i.qty)}</span></div>)}
                  {o.note&&<div style={{fontSize:12,color:G.muted,fontStyle:"italic",marginTop:6,background:"#f5f0e8",padding:"6px 10px",borderRadius:6}}>📝 {o.note}</div>}
                </div>
                <div style={{display:"flex",gap:6,marginBottom:8}}>
                  {["Confirmed","Dispatched","Delivered"].map(st=><button key={st} className="tap" onClick={()=>updateStatus(o.id,st)} style={{flex:1,padding:"9px 2px",border:"none",borderRadius:8,cursor:"pointer",fontSize:10.5,fontWeight:700,background:o.status===st?`linear-gradient(135deg,${G.mid},${G.main})`:"#dcfce7",color:o.status===st?"#fff":G.mid}}>{st}</button>)}
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>openInvoice(o,adminCfg)} style={{flex:1,padding:"9px",background:`linear-gradient(135deg,${G.mid},${G.main})`,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>🧾 Invoice</button>
                  {adminCfg.phone&&<a href={`https://wa.me/91${o.phone}?text=${encodeURIComponent(`Hi ${o.vendorName}, order ${o.id} is now ${o.status}.`)}`} target="_blank" rel="noreferrer" style={{flex:1,padding:"9px",background:"#25D366",color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>💬 WA Vendor</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── VENDORS ── */}
        {adminTab==="vendors"&&(
          <div style={{animation:"fadeUp .3s"}}>
            <Btn v={addVOpen?"red":"gold"} ch={addVOpen?"✕ Cancel":"＋ Add New Vendor"} onClick={()=>setAddVOpen(!addVOpen)} style={{marginBottom:14}}/>
            {addVOpen&&(
              <div style={{background:"#fff",borderRadius:18,padding:20,marginBottom:14,boxShadow:"0 4px 18px rgba(0,0,0,.08)",animation:"fadeUp .2s"}}>
                <Field label="Shop / Business Name" req><Input placeholder="e.g. Rahman General Store" value={newV.name} onChange={e=>setNewV({...newV,name:e.target.value})}/></Field>
                <Field label="Mobile Number (login ID)" req><Input type="tel" placeholder="10-digit" value={newV.phone} onChange={e=>setNewV({...newV,phone:e.target.value.replace(/\D/,"").slice(0,10)})}/></Field>
                <Field label="Full Shop Address" req><textarea value={newV.addr} onChange={e=>setNewV({...newV,addr:e.target.value})} placeholder="Door No., Street, Area, City, Pincode" style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${G.border}`,fontSize:13,resize:"none",height:70,background:"#fff"}}/></Field>
                <Field label="State"><Select opts={STATES} value={newV.state} onChange={e=>setNewV({...newV,state:e.target.value})}/></Field>
                <Field label="Password to share" req><Input placeholder="e.g. ayif123" value={newV.pass} onChange={e=>setNewV({...newV,pass:e.target.value})}/></Field>
                <Btn ch="✨ Add Vendor & Welcome" onClick={()=>{
                  if(!newV.name||!newV.phone||!newV.pass||!newV.addr){toast_("Fill required fields","err");return;}
                  if(vendors.find(v=>v.phone===newV.phone)){toast_("Phone already registered","err");return;}
                  const id="V"+String(vendors.length+1).padStart(3,"0");
                  const nv={...newV,id,joined:Date.now()};
                  setVendors(prev=>[...prev,nv]);
                  push(id,"Welcome to AYIF! 🎉",`Hi ${newV.name}, your account is ready. Login: ${newV.phone} / ${newV.pass}`,"ok");
                  toast_(`${id} added!\n📲 Login: ${newV.phone} / ${newV.pass}`);
                  setNewV({name:"",phone:"",addr:"",state:"Telangana",pass:""});setAddVOpen(false);
                }}/>
              </div>
            )}
            {vendors.map(v=>{
              const vt=orders.filter(o=>o.vendorId===v.id&&o.status==="Delivered").reduce((s,o)=>s+o.total,0);
              const vc=orders.filter(o=>o.vendorId===v.id).length;
              return(
                <div key={v.id} className="card" style={{background:"#fff",borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                      <div style={{width:48,height:48,borderRadius:"50%",background:`linear-gradient(135deg,${G.mid},${G.main})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:G.gold,fontFamily:"'Syne',sans-serif",fontWeight:800,flexShrink:0}}>{v.name[0]}</div>
                      <div><div style={{fontWeight:700,fontSize:15}}>{v.name}</div><div style={{fontSize:12,color:G.muted,marginTop:2}}>📞 {v.phone}</div><div style={{fontSize:12,color:G.muted,marginTop:1}}>📍 {v.addr}</div><div style={{fontSize:11,color:"#bbb",marginTop:2}}>{v.state} · {v.id}</div></div>
                    </div>
                    <div style={{textAlign:"right"}}><div className="logo-text" style={{fontSize:16,color:G.mid}}>{R(vt)}</div><div style={{fontSize:11,color:G.muted}}>{vc} orders</div></div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>setResetV(v)} style={{flex:1,padding:"8px",background:"#fff8e1",color:G.amber,border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>🔑 Reset Password</button>
                    <a href={`https://wa.me/91${v.phone}?text=Hi ${v.name}, AYIF here!`} target="_blank" rel="noreferrer" style={{flex:1,padding:"8px",background:"#25D366",color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",textDecoration:"none",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}>💬 WhatsApp</a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── CATEGORIES ── */}
        {adminTab==="cats"&&(
          <div style={{animation:"fadeUp .3s"}}>
            <div style={{background:"linear-gradient(135deg,#fffde7,#fff8c4)",borderRadius:14,padding:14,marginBottom:14,border:`1.5px solid ${G.gold}`,fontSize:13,color:G.amber,lineHeight:1.7}}>
              <b>🗂 Category Manager</b><br/>Add, edit categories. Sub-categories appear on the customer homepage grid.
            </div>
            <Btn v={addCatOpen?"red":"gold"} ch={addCatOpen?"✕ Cancel":"＋ Add New Category"} onClick={()=>setAddCatOpen(!addCatOpen)} style={{marginBottom:14}}/>
            {addCatOpen&&(
              <div style={{background:"#fff",borderRadius:18,padding:20,marginBottom:14,boxShadow:"0 4px 18px rgba(0,0,0,.08)"}}>
                <div className="logo-text" style={{fontSize:18,marginBottom:12,color:G.mid}}>✨ New Category</div>
                <Field label="Category Name" req><Input placeholder="e.g. Stationery" value={newCat.label} onChange={e=>setNewCat({...newCat,label:e.target.value})}/></Field>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <Field label="Emoji"><Input placeholder="📦" value={newCat.emoji} onChange={e=>setNewCat({...newCat,emoji:e.target.value})} maxLength={2}/></Field>
                  <Field label="Background"><Input type="color" value={newCat.bg} onChange={e=>setNewCat({...newCat,bg:e.target.value})}/></Field>
                </div>
                <Field label={`Sub-categories (${newCat.subs.length} added)`}>
                  <div style={{display:"flex",gap:8,marginBottom:10}}>
                    <Input placeholder="Sub name" value={subInput.name} onChange={e=>setSubInput({...subInput,name:e.target.value})} style={{flex:1}}/>
                    <Input placeholder="📦" maxLength={2} value={subInput.emoji} onChange={e=>setSubInput({...subInput,emoji:e.target.value})} style={{width:50,textAlign:"center",fontSize:14}}/>
                    <button onClick={()=>{if(!subInput.name)return;setNewCat({...newCat,subs:[...newCat.subs,{...subInput}]});setSubInput({name:"",emoji:"📦"});}} style={{padding:"9px 14px",background:G.mid,color:"#fff",border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer"}}>＋</button>
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {newCat.subs.map((s,i)=><span key={i} style={{background:"#e8f5e9",color:G.mid,borderRadius:12,padding:"5px 10px",fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:5}}>{s.emoji} {s.name}<button onClick={()=>setNewCat({...newCat,subs:newCat.subs.filter((_,j)=>j!==i)})} style={{background:"none",border:"none",cursor:"pointer",color:G.red,fontSize:14}}>×</button></span>)}
                  </div>
                </Field>
                <Btn ch="💾 Save Category" onClick={()=>{
                  if(!newCat.label){toast_("Enter a name","err");return;}
                  const id=newCat.label.toLowerCase().replace(/[^a-z]/g,"").slice(0,6)+uid();
                  setCats(prev=>[...prev,{...newCat,id,visible:true,subs:newCat.subs.length?newCat.subs:[{name:"General",emoji:newCat.emoji}]}]);
                  setNewCat({label:"",emoji:"📦",bg:"#f0f0f0",subs:[]});setAddCatOpen(false);toast_("Category added ✓");
                }}/>
              </div>
            )}
            {cats.map(c=>(
              <div key={c.id} className="card" style={{background:"#fff",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,.06)",opacity:c.visible?1:.55,transition:"opacity .2s"}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{width:52,height:52,borderRadius:12,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{c.emoji}</div>
                  <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{c.label}</div><div style={{fontSize:11,color:G.muted,marginTop:2}}>{c.subs.length} sub-categories · {c.id}</div></div>
                  <div style={{display:"flex",flexDirection:"column",gap:5}}>
                    <button onClick={()=>{setCats(prev=>prev.map(x=>x.id===c.id?{...x,visible:!x.visible}:x));toast_(c.visible?`${c.label} hidden`:`${c.label} shown`);}} style={{padding:"6px 10px",background:c.visible?"#dcfce7":"#f5f0e8",color:c.visible?"#166534":G.muted,border:"none",borderRadius:8,fontSize:10,fontWeight:700,cursor:"pointer"}}>{c.visible?"✅ Show":"○ Hide"}</button>
                    <button onClick={()=>setEditCat({...c})} style={{padding:"6px 10px",background:"#dbeafe",color:G.blue,border:"none",borderRadius:8,fontSize:10,fontWeight:700,cursor:"pointer"}}>✏️ Edit</button>
                    <button onClick={()=>{if(window.confirm(`Delete "${c.label}"?`)){setCats(prev=>prev.filter(x=>x.id!==c.id));toast_("Deleted","warn");}}} style={{padding:"6px 10px",background:"#fee2e2",color:G.red,border:"none",borderRadius:8,fontSize:10,fontWeight:700,cursor:"pointer"}}>🗑 Del</button>
                  </div>
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:10,paddingTop:10,borderTop:`1px dashed ${G.border}`}}>
                  {c.subs.map(s=><span key={s.name} style={{background:"#f5f0e8",color:"#555",borderRadius:6,padding:"3px 8px",fontSize:10,fontWeight:500}}>{s.emoji} {s.name}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SUPPORT ── */}
        {adminTab==="support"&&(
          <div style={{animation:"fadeUp .3s"}}>
            <div style={{background:"linear-gradient(135deg,#fff8e1,#fffde7)",borderRadius:14,padding:14,marginBottom:14,border:`1.5px solid ${G.gold}`,fontSize:13,color:G.amber,lineHeight:1.7}}>
              <b>🎫 Support Center</b><br/>Respond to vendor tickets. Closed tickets are archived below.
            </div>
            {tickets.length===0&&<div style={{textAlign:"center",padding:50,color:"#bbb"}}><div style={{fontSize:42}}>🎫</div><div style={{marginTop:10}}>No tickets yet</div></div>}
            {tickets.filter(t=>t.status!=="Closed").map(t=>(
              <div key={t.id} style={{background:"#fff",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 10px rgba(0,0,0,.06)",borderLeft:`4px solid ${t.status==="Open"?G.red:G.blue}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div><div style={{fontWeight:700,fontSize:14}}>{t.subj}</div><div style={{fontSize:12,color:G.muted,marginTop:2}}>{t.vendorName} · {t.vendorPhone}</div><div style={{fontSize:11,color:"#aaa",marginTop:1}}>{t.id} · {ago(t.created)}</div></div>
                  <span style={{background:t.status==="Open"?"#fee2e2":"#dbeafe",color:t.status==="Open"?G.red:G.blue,borderRadius:6,padding:"3px 9px",fontSize:10,fontWeight:700}}>{t.status}</span>
                </div>
                <div style={{borderTop:`1px dashed ${G.border}`,paddingTop:10,maxHeight:200,overflowY:"auto",marginBottom:10}}>
                  {t.msgs.map((m,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:m.from==="vendor"?"flex-start":"flex-end",marginBottom:8}}>
                      <div style={{maxWidth:"78%",padding:"9px 13px",borderRadius:m.from==="vendor"?"12px 12px 12px 2px":"12px 12px 2px 12px",background:m.from==="vendor"?"#f5f0e8":`linear-gradient(135deg,${G.mid},${G.main})`,color:m.from==="vendor"?G.text:"#fff",fontSize:13}}>
                        {m.text}<div style={{fontSize:10,opacity:.6,marginTop:4}}>{m.from==="vendor"?t.vendorName:"AYIF"} · {ago(m.ts)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:8,marginBottom:6}}>
                  <Input id={`adm-r-${t.id}`} placeholder="Reply to vendor…" style={{flex:1}} onKeyDown={e=>{if(e.key==="Enter"&&e.target.value){const txt=e.target.value;setTickets(p=>p.map(x=>x.id===t.id?{...x,msgs:[...x.msgs,{from:"admin",text:txt,ts:Date.now()}],status:"Replied"}:x));push(t.vendorId,"AYIF replied to your ticket",`${t.id}: ${txt.slice(0,50)}`,"support","tickets");e.target.value="";}}}/>
                  <button onClick={()=>{const inp=document.getElementById(`adm-r-${t.id}`);if(!inp.value)return;const txt=inp.value;setTickets(p=>p.map(x=>x.id===t.id?{...x,msgs:[...x.msgs,{from:"admin",text:txt,ts:Date.now()}],status:"Replied"}:x));push(t.vendorId,"AYIF replied to your ticket",`${t.id}: ${txt.slice(0,50)}`,"support","tickets");inp.value="";}} style={{padding:"9px 14px",background:G.mid,color:"#fff",border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer"}}>Reply</button>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <a href={`https://wa.me/91${t.vendorPhone}?text=Regarding ticket ${t.id}`} target="_blank" rel="noreferrer" style={{flex:1,padding:"8px",background:"#25D366",color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",textDecoration:"none",textAlign:"center"}}>💬 WA</a>
                  <button onClick={()=>{setTickets(p=>p.map(x=>x.id===t.id?{...x,status:"Closed"}:x));toast_("Ticket closed ✓");}} style={{flex:1,padding:"8px",background:"#fee2e2",color:G.red,border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>🔒 Close</button>
                </div>
              </div>
            ))}
            {tickets.filter(t=>t.status==="Closed").length>0&&<div style={{marginTop:10}}>
              <div style={{fontSize:11,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:8}}>CLOSED TICKETS</div>
              {tickets.filter(t=>t.status==="Closed").slice(0,5).map(t=><div key={t.id} style={{background:"#f5f0e8",borderRadius:10,padding:"10px 12px",marginBottom:6,fontSize:12,color:G.muted,display:"flex",justifyContent:"space-between"}}><span>{t.subj}</span><span style={{fontSize:10}}>{t.vendorName} · {ago(t.created)}</span></div>)}
            </div>}
          </div>
        )}

        {/* ── BROADCAST ── */}
        {adminTab==="broadcast"&&(
          <div style={{animation:"fadeUp .3s"}}>
            <div style={{background:"#fff",borderRadius:18,padding:20,marginBottom:18,boxShadow:"0 4px 18px rgba(0,0,0,.06)"}}>
              <div className="logo-text" style={{fontSize:20,color:G.mid,marginBottom:14}}>📢 Send Broadcast</div>
              <Field label="Title" req><Input placeholder="e.g. App Update Available" value={newAnn.title} onChange={e=>setNewAnn({...newAnn,title:e.target.value})}/></Field>
              <Field label="Message" req><textarea value={newAnn.body} onChange={e=>setNewAnn({...newAnn,body:e.target.value})} placeholder="Your message to all vendors…" style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${G.border}`,fontSize:14,resize:"none",height:90,background:"#fff"}}/></Field>
              <Field label="Type">
                <Select opts={[{v:"info",l:"ℹ️ Info"},{v:"ok",l:"✅ Success"},{v:"warn",l:"⚠️ Warning"}]} value={newAnn.type} onChange={e=>setNewAnn({...newAnn,type:e.target.value})}/>
              </Field>
              <Btn ch="📢 Broadcast to All Vendors" onClick={()=>{
                if(!newAnn.title||!newAnn.body){toast_("Fill title + message","err");return;}
                const a={id:uid(),title:newAnn.title,body:newAnn.body,type:newAnn.type,ts:Date.now()};
                setAnns(prev=>[a,...prev]);
                vendors.forEach(v=>push(v.id,newAnn.title,newAnn.body,newAnn.type,"notifs"));
                setNewAnn({title:"",body:"",type:"info"});
                toast_(`Broadcast sent to ${vendors.length} vendors ✓`);
              }}/>
            </div>
            {anns.length>0&&<>
              <div style={{fontSize:11,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:10}}>SENT BROADCASTS</div>
              {anns.map(a=>(
                <div key={a.id} style={{background:"#fff",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,.05)",borderLeft:`4px solid ${G.gold}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div><div style={{fontWeight:700,fontSize:14}}>{a.title}</div><div style={{fontSize:13,color:"#555",marginTop:3,lineHeight:1.5}}>{a.body}</div><div style={{fontSize:11,color:"#aaa",marginTop:6}}>{ago(a.ts)}</div></div>
                    <button onClick={()=>setAnns(prev=>prev.filter(x=>x.id!==a.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:16}}>×</button>
                  </div>
                </div>
              ))}
            </>}
          </div>
        )}

        {/* ── SETTINGS ── */}
        {adminTab==="settings"&&(
          <div style={{animation:"fadeUp .3s"}}>
            <div style={{background:"#fff",borderRadius:18,padding:20,marginBottom:14,boxShadow:"0 4px 18px rgba(0,0,0,.07)"}}>
              <div className="logo-text" style={{fontSize:20,color:G.mid,marginBottom:8}}>🔐 Admin Credentials</div>
              <div style={{background:"#e8f5e9",borderRadius:10,padding:12,marginBottom:14,fontSize:12,lineHeight:1.8}}>
                Current: <b>{adminCfg.user}</b> · WA: <b>{adminCfg.phone||"Not set"}</b> · UPI: <b>{adminCfg.upiId||"Not set"}</b>{adminCfg.gst&&<> · GST: <b>{adminCfg.gst}</b></>}
              </div>
              <Field label="Current Password (required)" req><Input type="password" value={sOld} onChange={e=>setSOld(e.target.value)}/></Field>
              <Field label="New Username"><Input placeholder={adminCfg.user} value={sUser} onChange={e=>setSUser(e.target.value)}/></Field>
              <Field label="New Password"><Input type="password" value={sPass} onChange={e=>setSPass(e.target.value)}/></Field>
              <Field label="New PIN (4 digits)"><Input type="password" maxLength={4} value={sPin} onChange={e=>setSPin(e.target.value.replace(/\D/,"").slice(0,4))}/></Field>
              <Field label="WhatsApp Number"><Input type="tel" placeholder={adminCfg.phone} value={sPhone} onChange={e=>setSPhone(e.target.value.replace(/\D/,"").slice(0,10))}/></Field>
              <Field label="UPI ID"><Input placeholder={adminCfg.upiId} value={sUpi} onChange={e=>setSUpi(e.target.value)}/></Field>
              <Field label="GST Number"><Input placeholder={adminCfg.gst||"optional"} value={sGst} onChange={e=>setSGst(e.target.value)}/></Field>
              <Btn ch="Update Settings" onClick={()=>{
                if(sOld!==adminCfg.pass){toast_("Current password incorrect","err");return;}
                setAdminCfg(prev=>({...prev,user:sUser||prev.user,pass:sPass||prev.pass,pin:sPin||prev.pin,phone:sPhone||prev.phone,upiId:sUpi||prev.upiId,gst:sGst||prev.gst}));
                setSOld("");setSUser("");setSPass("");setSPin("");setSPhone("");setSUpi("");setSGst("");
                toast_("Settings updated ✓");
              }}/>
            </div>
            <div style={{background:"#fff",borderRadius:18,padding:20,boxShadow:"0 4px 18px rgba(0,0,0,.07)"}}>
              <div className="logo-text" style={{fontSize:18,color:G.mid,marginBottom:14}}>📲 Publish & Share</div>
              {[["1","Publish the app","Artifact → ⋯ → Publish → Public → copy link"],["2","Share with vendors","WhatsApp the link. Same link forever."],["3","Auto-updates","Re-publish after changes — all vendors get the update."]].map(([n,t,d])=>(
                <div key={n} style={{display:"flex",gap:14,marginBottom:12,alignItems:"flex-start"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${G.mid},${G.main})`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,flexShrink:0}}>{n}</div>
                  <div><div style={{fontWeight:700,fontSize:13,marginBottom:3}}>{t}</div><div style={{fontSize:12,color:G.muted,lineHeight:1.6}}>{d}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Admin bottom nav */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:1280,background:"#fff",borderTop:`1px solid ${G.border}`,display:"flex",zIndex:99,boxShadow:"0 -4px 20px rgba(0,0,0,.06)"}}>
        {tabs.map(([ic,lb,tb])=>(
          <button key={tb} onClick={()=>setAdminTab(tb)} style={{flex:1,padding:"9px 0",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1,color:adminTab===tb?G.mid:"#aaa",fontSize:8,fontWeight:700}}>
            <span style={{fontSize:17}}>{ic}</span>{lb}
          </button>
        ))}
      </div>
    </div>
    </>
  );
}

/* ── Product Form (shared) ─────────────────────────────────────── */
function ProdForm({data,setData,title,cats,getSubsFor,onSave,onCancel,toast_}) {
  const d=disc(+(data.mrp||0),+(data.price||0));
  const margin=data.cost&&data.price?Math.round((+data.price-+data.cost)/+data.price*100):0;
  return(
    <div style={{background:"#fff",borderRadius:18,padding:20,marginBottom:14,boxShadow:"0 4px 18px rgba(0,0,0,.08)",animation:"fadeUp .2s"}}>
      <div className="logo-text" style={{fontSize:18,marginBottom:14,color:G.mid}}>{title}</div>
      <div style={{display:"flex",gap:14,marginBottom:14}}>
        <PickImg value={data.img} onChange={v=>setData({...data,img:v})} size={86}/>
        <div style={{flex:1}}>
          <Field label="Product Name" req><Input placeholder="e.g. Basmati Rice" value={data.name} onChange={e=>setData({...data,name:e.target.value})}/></Field>
          <textarea value={data.desc||""} onChange={e=>setData({...data,desc:e.target.value})} placeholder="Description (optional)" style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${G.border}`,fontSize:12,resize:"none",height:50,background:"#fff"}}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Field label="Category"><Select opts={cats.map(c=>({v:c.id,l:`${c.emoji} ${c.label}`}))} value={data.cat} onChange={e=>setData({...data,cat:e.target.value,sub:getSubsFor(e.target.value)[0]||""})}/></Field>
        <Field label="Sub-Category"><Select opts={getSubsFor(data.cat)} value={data.sub||""} onChange={e=>setData({...data,sub:e.target.value})}/></Field>
        <Field label="Unit"><Select opts={UNITS} value={data.unit} onChange={e=>setData({...data,unit:e.target.value})}/></Field>
        <Field label="Stock Qty" req><Input type="number" placeholder="0" value={data.stock} onChange={e=>setData({...data,stock:e.target.value})}/></Field>
        <Field label="MRP ₹" hint="actual price" req><Input type="number" placeholder="0" value={data.mrp} onChange={e=>setData({...data,mrp:e.target.value})}/></Field>
        <Field label="Sell Price ₹" hint="vendor pays" req><Input type="number" placeholder="0" value={data.price} onChange={e=>setData({...data,price:e.target.value})}/></Field>
        <Field label="Cost Price ₹" hint="your cost"><Input type="number" placeholder="0" value={data.cost||""} onChange={e=>setData({...data,cost:e.target.value})}/></Field>
        <div style={{padding:"12px",background:"#f0f9f0",borderRadius:10,fontSize:12,lineHeight:1.6,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          {d>0&&<span style={{color:G.red,fontWeight:700}}>📉 {d}% OFF</span>}
          {margin>0&&<span style={{color:G.main,fontWeight:700}}>💰 Margin: {margin}%</span>}
          {!d&&!margin&&<span style={{color:G.muted}}>Enter MRP & Sell price</span>}
        </div>
      </div>
      <div style={{display:"flex",gap:10,marginTop:8}}>
        <Btn ch="💾 Save" onClick={onSave} style={{flex:2}}/>
        <Btn v="ghost" ch="Cancel" onClick={onCancel} style={{flex:1}}/>
      </div>
    </div>
  );
}
