const express = require('express');
const app = express();
app.use(express.json({limit:'50mb'}));

let PRODUCTS = [
// === LOCAL FRESH FOODS - UGANDA MARKET ===
{id:1,name:"Matooke Bunch (Small)",price:15000,old:18000,img:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500",badge:"FRESH UG"},
{id:2,name:"Matooke Bunch (Big)",price:25000,img:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500",badge:"BEST"},
{id:3,name:"Sweet Potatoes 1kg",price:2000,img:"https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=500",badge:"FRESH"},
{id:4,name:"Irish Potatoes 1kg",price:3000,img:"https://images.unsplash.com/photo-1518977676608-bd36c7a59a0a?w=500",badge:"FRESH"},
{id:5,name:"Cassava 1kg",price:2000,img:"https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=500",badge:"LOCAL"},
{id:6,name:"Yams 1kg",price:3500,img:"https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=500",badge:"LOCAL"},
{id:7,name:"Tomatoes 1kg",price:3000,old:4000,img:"https://images.unsplash.com/photo-1561136594-7f68413baa99?w=500",badge:"-25%"},
{id:8,name:"Onions 1kg",price:4000,img:"https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=500",badge:"FRESH"},
{id:9,name:"Cabbage 1pc",price:2000,img:"https://images.unsplash.com/photo-1594282486552-05b4d80f67c9?w=500",badge:"FRESH"},
{id:10,name:"Dodo (Greens) Bunch",price:1000,img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",badge:"UGANDA"},
{id:11,name:"Fresh Beans (Bihogo) 1kg",price:3500,img:"https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500",badge:"FRESH"},
{id:12,name:"Dry Beans 1kg",price:4500,img:"https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500",badge:"BEST"},
{id:13,name:"G-Nuts 1kg",price:6000,img:"https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?w=500",badge:"BEST"},
{id:14,name:"Mukene Dry 1kg",price:8000,img:"https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=500",badge:"LOCAL"},
{id:15,name:"Eggs Local Tray 30",price:15000,old:17000,img:"https://images.unsplash.com/photo-1484464497494-90de2d8d791a?w=500",badge:"UGANDA"},

// === MUKWANO PRODUCTS - OFFICIAL UGANDA ===
{id:16,name:"Mukwano Oil 1L",price:6500,img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500",badge:"MUKWANO"},
{id:17,name:"Mukwano Oil 3L",price:18500,old:21000,img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500",badge:"20% OFF"},
{id:18,name:"Mukwano Oil 5L",price:29000,img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500",badge:"MUKWANO"},
{id:19,name:"Mukwano Bar Soap 1kg",price:4000,img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500",badge:"MUKWANO"},
{id:20,name:"Mukwano Laundry Bar",price:3500,img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500",badge:"HOT"},

// === SUGAR, FLOUR, RICE - KAKIRA UGANDA ===
{id:21,name:"Kakira Sugar 1kg",price:5500,old:6500,img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=500",badge:"KAKIRA"},
{id:22,name:"Kakira Sugar 2kg",price:10500,img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=500",badge:"KAKIRA"},
{id:23,name:"Posho (Maize Flour) 5kg",price:9500,img:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500",badge:"UGANDA"},
{id:24,name:"Posho 1kg",price:2000,img:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500",badge:"LOCAL"},
{id:25,name:"Super Rice 1kg",price:5000,img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",badge:"NEW"},
{id:26,name:"Super Rice 5kg",price:23000,img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",badge:"HOT"},
{id:27,name:"Wheat Flour Azam 2kg",price:8000,img:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500",badge:"AZAM"},

// === DETERGENTS & SOAP - FMCG UGANDA ===
{id:28,name:"Omo 500g",price:4500,img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500",badge:"OMO"},
{id:29,name:"Omo 2kg",price:18000,old:20000,img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500",badge:"UNILEVER"},
{id:30,name:"Nomi Washing Powder 1kg",price:5000,img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500",badge:"NOMI"},
{id:31,name:"Blue Band 250g",price:5000,img:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500",badge:"BLUE BAND"},
{id:32,name:"Blue Band 500g",price:9500,old:11000,img:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500",badge:"BLUE BAND"},
{id:33,name:"Sunlight Bar Soap",price:3000,img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500",badge:"HOT"},
{id:34,name:"Mama Soap",price:2500,img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500",badge:"LOCAL"},

// === MILK, BREAD, DRINKS ===
{id:35,name:"Lato Milk 500ml",price:2500,img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500",badge:"LATO"},
{id:36,name:"Lato Milk 1L",price:4500,img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500",badge:"LATO"},
{id:37,name:"Jesa Milk 500ml",price:2700,img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500",badge:"JESA"},
{id:38,name:"Fresh Dairy Yoghurt 500ml",price:3500,img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500",badge:"FRESH DAIRY"},
{id:39,name:"Kasana Bread",price:4000,img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500",badge:"FRESH"},
{id:40,name:"Supa Loaf Bread",price:4500,img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500",badge:"SUPA LOAF"},
{id:41,name:"Coca Cola 500ml",price:1500,old:2000,img:"https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500",badge:"-25%"},
{id:42,name:"Pepsi 500ml",price:1500,img:"https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500",badge:"PEPSI"},
{id:43,name:"Rwenzori Water 500ml",price:1000,img:"https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500",badge:"RWENZORI"},
{id:44,name:"Rwenzori Water 1.5L",price:2000,img:"https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500",badge:"RWENZORI"},

// === ESSENTIALS ===
{id:45,name:"Salt 1kg (Kakira)",price:1500,img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500",badge:"KAKIRA"},
{id:46,name:"Royco Mchuzi Mix 100g",price:2000,img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500",badge:"ROYCO"},
{id:47,name:"Curry Powder 50g",price:1500,img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500",badge:"LOCAL"},
{id:48,name:"Cooking Charcoal Sack",price:35000,img:"https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500",badge:"UGANDA"},
{id:49,name:"Toilet Paper 10 Rolls",price:12000,img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500",badge:"HOT"},
{id:50,name:"Sanitary Pads Always",price:4500,img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500",badge:"ALWAYS"}
];

let ORDERS=[]; let TOTAL=0;

app.get('/api/products',(req,res)=>res.json(PRODUCTS));
app.post('/api/products',(req,res)=>{
  const {name,price,img}=req.body;
  if(!name||!price) return res.status(400).json({error:"name+price"});
  PRODUCTS.unshift({id:Date.now(),name,price:Number(price),img:img||"https://cdn-icons-png.flaticon.com/512/3081/3081840.png",badge:"NEW UGANDA"});
  res.json({ok:true});
});
app.post('/api/orders',(req,res)=>{ORDERS.unshift({id:Date.now(),time:new Date().toLocaleString(),...req.body}); TOTAL+=Number(req.body.total||0); res.json({ok:true});});

app.get('/monitor',(req,res)=>{
  if(req.query.pin!=='0988') return res.send('<h1>🔒 BOSS ONLY 0988<br><a href="/monitor?pin=0988">Open</a></h1>');
  res.send(`<body style="font-family:Arial;padding:12px;background:#e8f5e9"><h2>🇺🇬 REAL UGANDA MARKET - 0744590988</h2><div style="background:white;padding:14px;border-radius:14px;border:2px solid green"><h3>📸 ADD REAL UGANDA PRODUCT</h3><input id="n" placeholder="Name e.g. Matooke, Cassava, Mukwano" style="width:100%;padding:12px;margin:6px 0;border-radius:8px;border:1px solid #ccc"><input id="p" type="number" placeholder="Price UGX" style="width:100%;padding:12px;margin:6px 0;border-radius:8px;border:1px solid #ccc"><input type="file" id="cam" accept="image/*" capture="environment" style="display:none" onchange="readFile(this)"><button onclick="document.getElementById('cam').click()" style="background:#ff9800;color:white;padding:12px;border:none;border-radius:20px;width:100%;font-weight:900">📷 TAKE REAL MARKET PHOTO + LOGO</button><div id="preview" style="text-align:center"></div><canvas id="canvas" style="display:none"></canvas><input id="i" placeholder="Or image URL" style="width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #ddd"><button onclick="addP()" style="background:green;color:white;padding:14px;border:none;border-radius:20px;width:100%;font-weight:900">✅ ADD TO UGANDA SHOP</button><p id="m" style="color:green;font-weight:bold"></p></div><div style="background:linear-gradient(135deg,#149444,#2ecc71);color:white;padding:14px;border-radius:14px;margin-top:12px;font-weight:bold">💰 Sales UGX ${TOTAL.toLocaleString()}<br>💸 Your 5%: UGX ${(TOTAL*0.05).toLocaleString()}<br>📦 Orders ${ORDERS.length} | Products ${PRODUCTS.length}<br>📍 Kampala | Wakiso | Entebbe | Mukono<br>📱 Airtel 0744590988</div><h3>Orders by Area</h3>${ORDERS.map(o=>`<div style="background:white;margin:6px 0;padding:10px;border-left:5px solid green;border-radius:8px"><b>${o.time}</b> - ${o.area||'N/A'}<br>UGX ${o.total} - ${o.phone||''}<br><small>${(o.items||[]).map(i=>i.name).join(', ').slice(0,120)}</small></div>`).join('')||'<p>No orders yet</p>'}<h3>Products ${PRODUCTS.length}</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${PRODUCTS.map(p=>`<div style="background:white;padding:8px;border-radius:10px;text-align:center"><img src="${p.img}" style="width:60px;height:60px;object-fit:contain"><br><small>${p.name}</small><br><b style="color:green">UGX ${p.price}</b></div>`).join('')}</div><br><a href="/" style="background:green;color:white;padding:12px 25px;border-radius:25px;text-decoration:none">← Shop</a>
  <script>let photoData="";function readFile(i){let f=i.files[0];if(!f)return;let r=new FileReader();r.onload=e=>{let img=new Image();img.onload=()=>{let c=document.getElementById('canvas'),ctx=c.getContext('2d');c.width=img.width;c.height=img.height;ctx.drawImage(img,0,0);ctx.fillStyle="rgba(13,122,47,0.9)";ctx.fillRect(0,c.height-70,c.width,70);ctx.fillStyle="white";ctx.font="bold 28px Arial";ctx.textAlign="center";ctx.fillText("KISAKYE MART GREEN",c.width/2,c.height-28);ctx.font="bold 13px Arial";ctx.fillText("Kampala/Wakiso/Entebbe/Mukono - 0744590988",c.width/2,c.height-8);photoData=c.toDataURL('image/jpeg',0.85);document.getElementById('preview').innerHTML='<img src="'+photoData+'" style="width:200px;height:200px;object-fit:cover;border-radius:12px;border:2px solid green"><br><small style="color:green;font-weight:800">✅ Logo added!</small>';};img.src=e.target.result;};r.readAsDataURL(f);}async function addP(){let name=document.getElementById('n').value,price=document.getElementById('p').value,urlImg=document.getElementById('i').value,finalImg=photoData||urlImg||"";if(!name||!price){alert('Name+Price');return;}let r=await fetch('/api/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,price,img:finalImg})});if((await r.json()).ok){document.getElementById('m').innerText='✅ Added '+name;setTimeout(()=>location.reload(),800);}}</script></body>`);
});

app.get('/',(req,res)=>res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>KISAKYE MART - Real Uganda Market</title><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',Arial}body{background:#f5f7f5;padding-bottom:160px}.header{background:linear-gradient(135deg,#0d7a2f,#2ecc71);color:white;padding:14px 14px 18px;border-radius:0 0 26px 26px}.top{display:flex;justify-content:space-between}.logo{font-weight:900;font-size:17px}.logo small{font-size:10px;display:block}.loc-pill{margin-top:10px;background:rgba(0,0,0,.2);display:inline-flex;padding:6px 14px;border-radius:30px;font-size:11px;font-weight:700}.search-wrap{margin-top:14px;background:white;border-radius:18px;display:flex;align-items:center;padding:4px 6px 4px 14px}.search-wrap input{border:none;outline:none;flex:1;padding:10px;font-size:14px}.search-wrap button{background:#0d7a2f;color:white;border:none;padding:10px 18px;border-radius:14px;font-weight:900}.hero{margin:14px 12px;background:linear-gradient(135deg,#fff9c4,#c8e6c9);border-radius:20px;padding:16px;display:flex;justify-content:space-between;border:2px dashed #2ecc71}.hero h2{color:#0d3b1a;font-size:17px;font-weight:900}.cats{display:flex;gap:8px;overflow-x:auto;padding:12px;scrollbar-width:none}.cats::-webkit-scrollbar{display:none}.cat{min-width:70px;background:white;border-radius:16px;padding:10px 6px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.06);flex-shrink:0}.cat .em{font-size:24px}.cat small{font-size:9px;font-weight:700;display:block;margin-top:4px}.areas{display:flex;gap:6px;flex-wrap:wrap;margin:10px 12px}.areas span{background:#e8f5e9;border:1px solid #2ecc71;color:#0d7a2f;padding:6px 12px;border-radius:20px;font-size:11px;font-weight:800}.flash{margin:12px;background:white;border-radius:18px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;border-left:5px solid #ff6f00}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px}.card{background:white;border-radius:20px;padding:10px;position:relative;box-shadow:0 6px 18px rgba(0,0,0,.06);border:1px solid #f0f0f0;overflow:hidden}.badge{position:absolute;top:8px;left:8px;background:linear-gradient(135deg,#ff6f00,#ff3d00);color:white;font-size:8px;font-weight:900;padding:4px 8px;border-radius:20px;z-index:3}.card .badge.FRESH,.card .badge.UGANDA,.card .badge.LOCAL{background:linear-gradient(135deg,#0d7a2f,#2ecc71)}.img-wrap{position:relative;width:120px;height:120px;margin:10px auto 6px}.img-wrap img{width:100%;height:100%;object-fit:contain;display:block;border-radius:8px}.logo-watermark{position:absolute;bottom:0;left:0;right:0;background:rgba(13,122,47,0.92);color:white;font-size:7px;font-weight:900;text-align:center;padding:4px 2px;border-radius:4px}.name{font-size:11.5px;font-weight:700;color:#222;height:32px;overflow:hidden;margin:4px 2px;line-height:1.2}.stars{font-size:9px;color:#ffb300}.price-row{display:flex;gap:6px;justify-content:center;margin:6px 0}.price{color:#0d7a2f;font-weight:900;font-size:14px}.old{font-size:9px;color:#999;text-decoration:line-through}.card button{background:linear-gradient(135deg,#0d7a2f,#2ecc71);color:white;border:none;width:100%;padding:10px;border-radius:14px;font-weight:900;font-size:12px;margin-top:4px}.trust{margin:14px 12px;background:white;border-radius:16px;padding:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;font-size:10px}.trust b{font-size:14px;display:block}.cartbar{position:fixed;bottom:62px;left:12px;right:12px;background:linear-gradient(135deg,#0e2e18,#1a5d2a);color:white;border-radius:30px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;z-index:9;box-shadow:0 10px 25px rgba(0,0,0,.3)}.cartbar .chk{background:linear-gradient(135deg,#2ecc71,#27ae60);border:none;color:white;padding:12px 22px;border-radius:20px;font-weight:900}.modal{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:20;padding:15px}.modalbox{background:white;border-radius:22px;padding:18px;width:100%;max-width:400px}.modalbox select,.modalbox input{width:100%;padding:13px;margin:7px 0;border-radius:12px;border:1.5px solid #ddd}.bottom{position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,.97);display:flex;justify-content:space-around;padding:8px 0;backdrop-filter:blur(10px)}.bottom div{text-align:center;font-size:10px;color:#888}.bottom .active{color:#0d7a2f;font-weight:900}</style></head><body>
<div class="header"><div class="top"><div class="logo">🛒 KISAKYE MART GREEN<small>Real Uganda Market • 50 Products</small></div><div>🔔</div></div><div class="loc-pill">🇺🇬 Real Uganda Market: Matooke, Cassava, Mukwano, Kakira - Kampala/Wakiso/Entebbe/Mukono ⚡ 2hrs</div><div class="search-wrap">🔍 <input id="q" placeholder="Search Matooke, Cassava, Mukwano, Omo..." oninput="filterP()"> <button onclick="filterP()">Search</button></div></div>

<div class="hero"><div><h2>🇺🇬 Real Uganda Market<br>Fresh From Farm & Factory!</h2><p>✅ 50 Real Products - Like in Owino & Kikubo</p><p>🚚 Free delivery >30k - Kampala, Wakiso, Entebbe, Mukono</p></div><div style="font-size:48px">🥬</div></div>

<div class="cats">
<div class="cat"><div class="em">🍌</div><small>Matooke</small></div>
<div class="cat"><div class="em">🍠</div><small>Cassava</small></div>
<div class="cat"><div class="em">🥔</div><small>Irish</small></div>
<div class="cat"><div class="em">🍅</div><small>Tomatoes</small></div>
<div class="cat"><div class="em">🏭</div><small>Mukwano</small></div>
<div class="cat"><div class="em">🍚</div><small>Rice/Posho</small></div>
<div class="cat"><div class="em">🧴</div><small>Omo</small></div>
<div class="cat"><div class="em">🥛</div><small>Milk</small></div>
<div class="cat"><div class="em">🍞</div><small>Bread</small></div>
<div class="cat"><div class="em">🥜</div><small>G-Nuts</small></div>
</div>

<div class="areas"><span>📍 Kampala</span><span>📍 Wakiso</span><span>📍 Entebbe</span><span>📍 Mukono</span><span>🇺🇬 50 Real Products</span></div>

<div class="flash"><div><b>🇺🇬 Real Uganda Market 🔥</b><br><small style="font-size:11px;color:#666">Matooke, Cassava, Mukwano, Kakira, Lato - Fresh Daily</small></div><div style="background:#0d7a2f;color:white;padding:6px 12px;border-radius:20px;font-weight:900;font-size:11px">50 ITEMS</div></div>

<div class="grid" id="grid"></div>

<div class="trust"><div><b>🇺🇬 Real</b>Uganda Market</div><div><b>🚚 2hrs</b>Kampala Area</div><div><b>📱 0744590988</b>WhatsApp Order</div></div>

<div class="cartbar" id="cartbar" style="display:none"><div><div>🛒 <span id="count">0</span> • <span id="items">0 items</span></div><div style="font-weight:900">Total: UGX <span id="total">0</span></div></div><button class="chk" onclick="openCheckout()">Checkout →</button></div>

<div class="modal" id="checkoutModal"><div class="modalbox"><h3 style="color:#0d7a2f;text-align:center">🚚 Delivery - Real Uganda Market</h3><select id="area"><option value="">Select Area *</option><option>Kampala - Central</option><option>Kampala - Kawempe</option><option>Kampala - Makindye</option><option>Kampala - Nakawa</option><option>Wakiso - Town</option><option>Wakiso - Nansana</option><option>Wakiso - Kira</option><option>Entebbe - Town</option><option>Mukono - Town</option><option>Mukono - Seeta</option></select><input id="custName" placeholder="Your Name"><input id="custPhone" placeholder="Phone 0744590988"><input id="custLoc" placeholder="Exact Location"><div style="background:#e8f5e9;padding:10px;border-radius:10px;margin:8px 0;font-size:11px"><b>Pay:</b> Airtel Money <b>0744590988</b> - KISAKYE JOSEPH<br><b>Delivery:</b> 3k-5k in Kampala/Wakiso/Entebbe/Mukono</div><div style="display:flex;gap:8px;margin-top:10px"><button onclick="document.getElementById('checkoutModal').style.display='none'" style="flex:1;padding:13px;border-radius:14px;border:1.5px solid #ddd;background:white">Cancel</button><button onclick="doCheckout()" style="flex:1;padding:13px;border-radius:14px;border:none;background:linear-gradient(135deg,#0d7a2f,#2ecc71);color:white;font-weight:900">Order via WhatsApp 0744590988</button></div></div></div>

<div class="bottom"><div class="active">🏠<br>Home</div><div>⊞<br>Market</div><div>🛒<br>Cart</div><div>👤<br>Profile</div></div>

<script>
const FALL="https://cdn-icons-png.flaticon.com/512/3081/3081840.png";let PRODUCTS=[],cart=[];
async function load(){try{let r=await fetch('/api/products');let d=await r.json();if(d.length>0)PRODUCTS=d}catch(e){}render(PRODUCTS)}
function render(list){
  let g=document.getElementById('grid');g.innerHTML='';
  list.forEach(p=>{
    g.innerHTML+=\`<div class="card">
      <div class="badge">\${p.badge||'UGANDA'}</div>
      <div class="img-wrap">
        <img src="\${p.img||FALL}" onerror="this.src='\${FALL}'">
        <div class="logo-watermark">KISAKYE MART GREEN • 0744590988</div>
      </div>
      <div class="name">\${p.name}</div>
      <div class="stars">⭐⭐⭐⭐⭐ (4.9) • Real Uganda</div>
      <div class="price-row"><div class="price">UGX \${Number(p.price).toLocaleString()}</div>\${p.old?'<div class="old">'+Number(p.old).toLocaleString()+'</div>':''}</div>
      <button onclick="add(\${p.id})">🛒 Add to Cart</button>
    </div>\`
  })
}
function add(id){let p=PRODUCTS.find(x=>x.id==id),c=cart.find(x=>x.id==id);if(c)c.qty++;else cart.push({...p,qty:1});upd();let b=event.target;b.innerText='✅ Added!';setTimeout(()=>b.innerText='🛒 Add to Cart',900)}
function upd(){let t=0,n=0;cart.forEach(c=>{t+=c.price*c.qty;n+=c.qty});document.getElementById('count').innerText=n;document.getElementById('items').innerText=n+' items';document.getElementById('total').innerText=t.toLocaleString();document.getElementById('cartbar').style.display=n>0?'flex':'none'}
function filterP(){let s=document.getElementById('q').value.toLowerCase();render(PRODUCTS.filter(p=>p.name.toLowerCase().includes(s)))}
function openCheckout(){document.getElementById('checkoutModal').style.display='flex'}
function doCheckout(){let area=document.getElementById('area').value;let phone=document.getElementById('custPhone').value;let name=document.getElementById('custName').value;let loc=document.getElementById('custLoc').value;if(!area){alert('Select Area Kampala/Wakiso/Entebbe/Mukono');return;}if(!phone){alert('Enter phone');return;}let total=0;cart.forEach(c=>total+=c.price*c.qty);let text=\`NEW ORDER KISAKYE MART GREEN 🇺🇬%0AArea: \${area}%0AName: \${name}%0APhone: \${phone}%0ALocation: \${loc}%0AItems:%0A\${cart.map(c=>\`- \${c.name} x\${c.qty} = UGX \${(c.price*c.qty).toLocaleString()}\`).join('%0A')}%0ATOTAL UGX \${total.toLocaleString()}%0APay Airtel 0744590988\`;fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:cart,total:total,area:area,phone:phone,customerName:name,location:loc})});window.open('https://wa.me/256744590988?text='+text,'_blank');document.getElementById('checkoutModal').style.display='none';}load();
</script></body></html>`));

app.listen(process.env.PORT||10000,()=>console.log('REAL UGANDA 50 PRODUCTS LIVE 0744590988'));
