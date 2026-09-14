const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

const PRODUCTS = [
{id:1,name:"Kakira Sugar 1kg",price:5500,img:"https://cdn-icons-png.flaticon.com/512/3081/3081840.png"},
{id:2,name:"Omo Detergent 2kg",price:18000,img:"https://cdn-icons-png.flaticon.com/512/1581/1581579.png"},
{id:3,name:"Blue Band Margarine 500g",price:9500,img:"https://cdn-icons-png.flaticon.com/512/3157/3157977.png"},
{id:4,name:"Riara Cooking Oil 1L",price:12000,img:"https://cdn-icons-png.flaticon.com/512/2553/2553691.png"},
{id:5,name:"Kakira Sugar 2kg",price:10500,img:""},
{id:6,name:"Mukwano Oil 3L",price:22000,img:""},
{id:7,name:"Bread",price:4000,img:""},
{id:8,name:"Eggs Tray",price:15000,img:""},
{id:9,name:"Coca Cola 500ml",price:1500,img:""},
{id:10,name:"Posho 5kg",price:9500,img:""}
];

let ORDERS = [];
let TOTAL = 0;

// PRODUCTS API
app.get('/api/products',(req,res)=>res.json(PRODUCTS));

// ORDERS API
app.post('/api/orders',(req,res)=>{
  const o = {id:Date.now(),time:new Date().toLocaleString(),...req.body};
  ORDERS.unshift(o);
  TOTAL += Number(req.body.total||0);
  console.log('ORDER',o);
  res.json({ok:true});
});

// *** SECRET MONITOR - FIXED ***
app.get('/monitor',(req,res)=>{
  if(req.query.pin !== '0988'){
    return res.send('<h1>🔒 PRIVATE</h1><p>BOSS ONLY. Add ?pin=0988 to link<br><a href="/monitor?pin=0988">Click here with PIN</a></p>');
  }
  let html = `
  <body style="font-family:Arial;padding:10px;background:#f0f7f0">
  <h1 style="color:green">🌿 KISAKYE MART - BOSS MONITOR</h1>
  <div style="background:green;color:white;padding:15px;border-radius:10px">
  <b>Total Sales: UGX ${TOTAL.toLocaleString()} | Commission 5%: UGX ${(TOTAL*0.05).toLocaleString()} | Orders: ${ORDERS.length}</b><br>
  Pay to: Airtel 07544590988 | MTN MoMo<br>
  </div><hr>`;
  if(ORDERS.length==0) html+='<p>No orders yet - Share shop link!</p>';
  ORDERS.forEach(o=>{
    html+=`<div style="background:white;margin:10px 0;padding:10px;border-left:5px solid green"><b>${o.time}</b> - UGX ${o.total}<br>Items: ${JSON.stringify(o.items).slice(0,200)}<br>Customer: ${o.customerName||'WhatsApp'}</div>`;
  });
  html+=`<br><a href="/" style="background:green;color:white;padding:10px 20px;border-radius:20px;text-decoration:none">← Back to Shop</a></body>`;
  res.send(html);
});

app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));

app.listen(process.env.PORT||10000,()=>console.log('MART WITH MONITOR LIVE'));
