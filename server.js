const express = require('express');
const app = express();
app.use(express.json({limit:'10mb'}));

let PRODUCTS = [
{id:1,name:"Kakira Sugar 1kg",price:5500,img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400"},
{id:2,name:"Omo Detergent 2kg",price:18000,img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400"},
{id:3,name:"Blue Band Margarine 500g",price:9500,img:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400"},
{id:4,name:"Riara Cooking Oil 1L",price:12000,img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"},
{id:5,name:"Mukwano Oil 3L",price:22000,img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"},
{id:6,name:"Lato Milk 500ml",price:2500,img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400"},
{id:7,name:"Kasana Bread",price:4000,img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"},
{id:8,name:"Eggs Tray 30",price:15000,img:"https://images.unsplash.com/photo-1484464497494-90de2d8d791a?w=400"},
{id:9,name:"Coca Cola 500ml",price:1500,img:"https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=400"},
{id:10,name:"Posho 5kg",price:9500,img:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400"},
{id:11,name:"Super Rice 1kg",price:5000,img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"},
{id:12,name:"Salt 1kg",price:1500,img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400"},
{id:13,name:"Beans 1kg",price:4500,img:"https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400"},
{id:14,name:"Bar Soap Mukwano",price:3500,img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400"},
{id:15,name:"Toilet Paper 10 Rolls",price:12000,img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400"}
];

let ORDERS=[]; let TOTAL=0;

app.get('/api/products',(req,res)=>res.json(PRODUCTS));
app.post('/api/products',(req,res)=>{
  const {name,price,img}=req.body;
  if(!name||!price) return res.status(400).json({error:"name+price"});
  const p={id:Date.now(),name,price:Number(price),img:img||"https://cdn-icons-png.flaticon.com/512/3081/3081840.png"};
  PRODUCTS.unshift(p); res.json({ok:true,product:p});
});
app.post('/api/orders',(req,res)=>{ORDERS.unshift({id:Date.now(),time:new Date().toLocaleString(),...req.body}); TOTAL+=Number(req.body.total||0); res.json({ok:true});});

app.get('/monitor',(req,res)=>{
  if(req.query.pin!=='0988') return res.send('<h1>🔒 BOSS ONLY</h1><a href="/monitor?pin=0988">Open Monitor PIN 0988</a>');
  res.send(`<body style="font-family:Arial;padding:15px;background:#e8f5e9">
  <h1 style="color:green">🌿 BOSS CONTROL - ONE CODE</h1>
  <div style="background:white;padding:15px;border-radius:12px;border:2px solid green">
  <h3>➕ ADD PRODUCT MANUALLY</h3>
  <input id="n" placeholder="Name e.g. Pepsi 500ml" style="width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #ccc">
  <input id="p" type="number" placeholder="Price UGX" style="width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #ccc">
  <input id="i" placeholder="Image URL or blank" style="width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #ccc">
  <button onclick="addP()" style="background:green;color:white;padding:12px;border:none;border-radius:20px;width:100%;font-weight:900">✅ ADD TO SHOP</button>
  <p id="m" style="color:green;font-weight:bold"></p>
  </div>
  <div style="background:green;color:white;padding:12px;border-radius:10px;margin-top:12px">Sales UGX ${TOTAL.toLocaleString()} | Commission 5% UGX ${(TOTAL*0.05).toLocaleString()} | Orders ${ORDERS.length} | Products ${PRODUCTS.length}</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">${PRODUCTS.map(p=>`<div style="background:white;padding:8px;border-radius:10px;text-align:center"><img src="${p.img}" style="width:60px;height:60px;object-fit:contain"><br><small>${p.name}</small><br><b style="color:green">UGX ${p.price}</b></div>`).join('')}</div>
  <br><a href="/" style="background:green;color:white;padding:12px 25px;border-radius:25px;text-decoration:none">← Back to Shop</a>
  <script>async function addP(){let name=document.getElementById('n').value,price=document.getElementById('p').value,img=document.getElementById('i').value;if(!name||!price){alert('name+price');return;}let r=await fetch('/api/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,price,img})});let d=await r.json();if(d.ok){document.getElementById('m').innerText='✅ Added '+name;setTimeout(()=>location.reload(),800);}}</script></body>`);
});

app.get('/',(req,res)=>res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>KISAKYE MART GREEN</title><style>*{margin:0;padding:0;box-sizing:border-box;font-family:Arial}body{background:#f6f8f6;padding-bottom:130px}.header{background:#149444;color:white;padding:14px 14px 16px;border-radius:0 0 22px 22px}.topline{display:flex;justify-content:space-between;align-items:center}.brand{font-weight:900}.loc{font-size:12px;margin-top:8px}.search{margin-top:12px;background:white;border-radius:12px;display:flex;align-items:center;padding:11px 12px;gap:8px}.search input{border:none;outline:none;flex:1}.banner{margin:12px;background:#c8e6c9;border-radius:12px;padding:12px;display:flex;justify-content:space-between;align-items:center}.sec{padding:10px 14px;display:flex;justify-content:space-between;font-weight:800}.sec a{color:#149444;text-decoration:none;font-size:13px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px}.card{background:white;border-radius:16px;padding:12px 8px 10px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.06)}.card img{width:110px;height:110px;object-fit:contain;display:block;margin:0 auto}.card .name{font-size:13px;font-weight:600;margin:8px 4px 2px;height:30px}.card .price{color:#0e6b26;font-weight:900;margin-bottom:8px}.card button{background:#0e7a2b;color:white;border:none;width:90%;padding:9px;border-radius:20px;font-weight:800}.cartbar{position:fixed;bottom:58px;left:10px;right:10px;background:#0e2e18;color:white;border-radius:28px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center}.cartbar .chk{background:#2ec36b;border:none;color:white;padding:10px 18px;border-radius:20px;font-weight:900}.bottom{position:fixed;bottom:0;left:0;right:0;background:white;border-top:1px solid #e5e5e5;display:flex;justify-content:space-around;padding:7px 0}.bottom div{text-align:center;font-size:10px;color:#888}.bottom .active{color:#149444;font-weight:800}</style></head><body>
<div class="header"><div class="topline"><div class="brand">🛒 KISAKYE MART GREEN<br><small style="font-weight:500;font-size:12px">Uganda</small></div><div style="font-size:22px">♡ 🔔</div></div><div class="loc">📍 Uganda • Kampala, Mukono</div><div class="search">🔍 <input id="q" placeholder="Search Kakira, Omo, Blue Band" oninput="filterP()"> 🎤</div></div>
<div class="banner"><div><b>Fresh Groceries & Essentials</b><br><small>Up to 20% OFF</small><br><button style="background:#0f3315;color:white;border:none;padding:4px 10px;border-radius:6px;font-size:11px;margin-top:6px">Shop Deals</button></div><div style="font-size:42px">🌿</div></div>
<div class="sec"><span>Popular Products</span><a href="#" onclick="render(PRODUCTS)">See all ></a></div>
<div class="grid" id="grid"></div>
<div class="cartbar" id="cartbar" style="display:none"><div>🛒 <span id="count">0</span> <small>• <span id="items">0 items</span></small><br><b>Total: UGX <span id="total">0</span></b></div><button class="chk" onclick="checkout()">Checkout →</button></div>
<div class="bottom"><div class="active">🏠<br>Home</div><div>⊞<br>Categories</div><div>🛒<br>Cart</div><div>👤<br>Profile</div></div>
<script>
const FALL="https://cdn-icons-png.flaticon.com/512/3081/3081840.png";let PRODUCTS=[],cart=[];
async function load(){try{let r=await fetch('/api/products');let d=await r.json();if(d.length>0)PRODUCTS=d}catch(e){}render(PRODUCTS)}
function render(list){let g=document.getElementById('grid');g.innerHTML='';list.forEach(p=>{g.innerHTML+=\`<div class="card"><img src="\${p.img||FALL}" onerror="this.src='\${FALL}'"><div class="name">\${p.name}</div><div class="price">UGX \${Number(p.price).toLocaleString()}</div><button onclick="add(\${p.id})">+ Add to Cart</button></div>\`})}
function add(id){let p=PRODUCTS.find(x=>x.id==id),c=cart.find(x=>x.id==id);if(c)c.qty++;else cart.push({...p,qty:1});upd()}
function upd(){let t=0,n=0;cart.forEach(c=>{t+=c.price*c.qty;n+=c.qty});document.getElementById('count').innerText=n;document.getElementById('items').innerText=n+' items';document.getElementById('total').innerText=t.toLocaleString();document.getElementById('cartbar').style.display=n>0?'flex':'none'}
function filterP(){let s=document.getElementById('q').value.toLowerCase();render(PRODUCTS.filter(p=>p.name.toLowerCase().includes(s)))}
function checkout(){let total=0;cart.forEach(c=>total+=c.price*c.qty);let text=\`Hello KISAKYE MART%0A\${cart.map(c=>\`- \${c.name} x\${c.qty}\`).join('%0A')}%0ATOTAL UGX \${total.toLocaleString()}%0APay 07544590988\`;fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:cart,total:total})});window.open('https://wa.me/2567544590988?text='+text,'_blank')}
load();
</script></body></html>`));

app.listen(process.env.PORT||10000,()=>console.log('ONE CODE LIVE'));
