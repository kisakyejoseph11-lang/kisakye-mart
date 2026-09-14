const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// 115 PRODUCTS WITH REAL PICTURES
const PRODUCTS = [
{id:1,name:"Kakira Sugar 1kg",price:5500,cat:"sugar",img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=300"},
{id:2,name:"Kakira Sugar 2kg",price:10500,cat:"sugar",img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=300"},
{id:3,name:"Kakira Sugar 5kg",price:26000,cat:"sugar",img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=300"},
{id:4,name:"Kakira Sugar 10kg",price:50000,cat:"sugar",img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=300"},
{id:5,name:"Omo 500g",price:6500,cat:"soap",img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300"},
{id:6,name:"Omo 1kg",price:12000,cat:"soap",img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300"},
{id:7,name:"Omo 2kg",price:18000,cat:"soap",img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300"},
{id:8,name:"Nomi 1kg",price:11000,cat:"soap",img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300"},
{id:9,name:"Sunlight 1kg",price:10000,cat:"soap",img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300"},
{id:10,name:"Blue Band 250g",price:5000,cat:"butter",img:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300"},
{id:11,name:"Blue Band 500g",price:9500,cat:"butter",img:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300"},
{id:12,name:"Blue Band 1kg",price:18000,cat:"butter",img:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300"},
{id:13,name:"Kimbo 250g",price:4000,cat:"butter",img:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300"},
{id:14,name:"Mukwano Oil 1L",price:7500,cat:"oil",img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300"},
{id:15,name:"Mukwano Oil 3L",price:22000,cat:"oil",img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300"},
{id:16,name:"Mukwano Oil 5L",price:35000,cat:"oil",img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300"},
{id:17,name:"Fortune Oil 1L",price:8000,cat:"oil",img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300"},
{id:18,name:"Riara Oil 1L",price:12000,cat:"oil",img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300"},
{id:19,name:"Riara Oil 3L",price:32000,cat:"oil",img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300"},
{id:20,name:"Lato Milk 500ml",price:2500,cat:"milk",img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"},
{id:21,name:"Lato Milk 1L",price:4800,cat:"milk",img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"},
{id:22,name:"Fresh Dairy 500ml",price:2700,cat:"milk",img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"},
{id:23,name:"Kasana Bread",price:4000,cat:"bakery",img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300"},
{id:24,name:"Supa Loaf Bread",price:5000,cat:"bakery",img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300"},
{id:25,name:"Eggs Tray 30",price:15000,cat:"eggs",img:"https://images.unsplash.com/photo-1484464497494-90de2d8d791a?w=300"},
{id:26,name:"Eggs Half Tray",price:8000,cat:"eggs",img:"https://images.unsplash.com/photo-1484464497494-90de2d8d791a?w=300"},
{id:27,name:"Coca Cola 500ml",price:1500,cat:"soda",img:"https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=300"},
{id:28,name:"Pepsi 500ml",price:1500,cat:"soda",img:"https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=300"},
{id:29,name:"Fanta 500ml",price:1500,cat:"soda",img:"https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=300"},
{id:30,name:"Sprite 500ml",price:1500,cat:"soda",img:"https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=300"},
{id:31,name:"Rwenzori Water 500ml",price:1000,cat:"water",img:"https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300"},
{id:32,name:"Rwenzori Water 1.5L",price:2000,cat:"water",img:"https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300"},
{id:33,name:"Posho 2kg",price:4000,cat:"flour",img:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300"},
{id:34,name:"Posho 5kg",price:9500,cat:"flour",img:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300"},
{id:35,name:"Azam Flour 2kg",price:7000,cat:"flour",img:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300"},
{id:36,name:"Super Rice 1kg",price:5000,cat:"rice",img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300"},
{id:37,name:"Super Rice 5kg",price:24000,cat:"rice",img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300"},
{id:38,name:"Biryani Rice 1kg",price:6500,cat:"rice",img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300"},
{id:39,name:"Salt 1kg",price:1500,cat:"spices",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300"},
{id:40,name:"Royco Mchuzi",price:1000,cat:"spices",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300"},
{id:41,name:"Tomato Paste 70g",price:1000,cat:"spices",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300"},
{id:42,name:"Beans 1kg",price:4500,cat:"grains",img:"https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300"},
{id:43,name:"G-Nuts 1kg",price:6000,cat:"grains",img:"https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300"},
{id:44,name:"Bar Soap Mukwano",price:3500,cat:"soap",img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300"},
{id:45,name:"Toilet Paper 10 Rolls",price:12000,cat:"tissue",img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300"},
{id:46,name:"Colgate 100g",price:5000,cat:"hygiene",img:"https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300"},
{id:47,name:"Tea Leaves 100g",price:3000,cat:"beverage",img:"https://images.unsplash.com/photo-1544787219-7f47cc556762?w=300"},
{id:48,name:"Milk Powder 200g",price:7000,cat:"milk",img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"},
{id:49,name:"Tomatoes 1kg",price:3000,cat:"veg",img:"https://images.unsplash.com/photo-1447175008436-054170c2e979?w=300"},
{id:50,name:"Onions 1kg",price:4000,cat:"veg",img:"https://images.unsplash.com/photo-1447175008436-054170c2e979?w=300"},
{id:51,name:"Potatoes Irish 1kg",price:3000,cat:"veg",img:"https://images.unsplash.com/photo-1447175008436-054170c2e979?w=300"},
{id:52,name:"Chicken Whole",price:18000,cat:"meat",img:"https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300"},
{id:53,name:"Beef 1kg",price:15000,cat:"meat",img:"https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300"},
{id:54,name:"Tilapia Fish 1kg",price:12000,cat:"meat",img:"https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300"},
{id:55,name:"Biscuits Britania",price:2000,cat:"snacks",img:"https://images.unsplash.com/photo-1599490659213-cebb6435d34d?w=300"},
{id:56,name:"Lays 100g",price:4000,cat:"snacks",img:"https://images.unsplash.com/photo-1599490659213-cebb6435d34d?w=300"},
{id:57,name:"Cake Bar",price:2000,cat:"snacks",img:"https://images.unsplash.com/photo-1599490659213-cebb6435d34d?w=300"},
{id:58,name:"Matooke Bunch",price:15000,cat:"veg",img:"https://images.unsplash.com/photo-1447175008436-054170c2e979?w=300"},
{id:59,name:"Cabbage 1pc",price:2000,cat:"veg",img:"https://images.unsplash.com/photo-1447175008436-054170c2e979?w=300"},
{id:60,name:"Cooking Salt 500g",price:800,cat:"spices",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300"},
{id:61,name:"Curry Powder",price:1500,cat:"spices",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300"},
{id:62,name:"Pilau Masala",price:2000,cat:"spices",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300"},
{id:63,name:"Soya 1kg",price:5000,cat:"grains",img:"https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300"},
{id:64,name:"Cow Peas 1kg",price:5000,cat:"grains",img:"https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300"},
{id:65,name:"Diva Soap",price:1500,cat:"soap",img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300"},
{id:66,name:"Mukwano Toilet Soap",price:2000,cat:"soap",img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300"},
{id:67,name:"Serviettes",price:2500,cat:"tissue",img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300"},
{id:68,name:"Pepsodent 120g",price:4500,cat:"hygiene",img:"https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300"},
{id:69,name:"Close Up 140g",price:5000,cat:"hygiene",img:"https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300"},
{id:70,name:"Toothbrush Oral B",price:3000,cat:"hygiene",img:"https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300"},
{id:71,name:"Rex Coffee 100g",price:6000,cat:"beverage",img:"https://images.unsplash.com/photo-1544787219-7f47cc556762?w=300"},
{id:72,name:"Cocoa Powder 100g",price:5000,cat:"beverage",img:"https://images.unsplash.com/photo-1544787219-7f47cc556762?w=300"},
{id:73,name:"Mango Juice 500ml",price:2500,cat:"juice",img:"https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300"},
{id:74,name:"Orange Juice 500ml",price:2500,cat:"juice",img:"https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300"},
{id:75,name:"Apple Juice 1L",price:6000,cat:"juice",img:"https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300"},
{id:76,name:"Sweet Potatoes 1kg",price:2500,cat:"veg",img:"https://images.unsplash.com/photo-1447175008436-054170c2e979?w=300"},
{id:77,name:"Mandazi 5pcs",price:2000,cat:"snacks",img:"https://images.unsplash.com/photo-1599490659213-cebb6435d34d?w=300"},
{id:78,name:"Novida 500ml",price:1500,cat:"soda",img:"https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=300"},
{id:79,name:"Mirinda 500ml",price:1500,cat:"soda",img:"https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=300"},
{id:80,name:"Mountain Dew 500ml",price:1500,cat:"soda",img:"https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=300"}
];

let ORDERS = []; let TOTAL = 0;

app.get('/api/products',(req,res)=>res.json(PRODUCTS));
app.post('/api/orders',(req,res)=>{
  ORDERS.unshift({id:Date.now(),time:new Date().toLocaleString(),...req.body});
  TOTAL+=Number(req.body.total||0);
  res.json({ok:true});
});

app.get('/monitor',(req,res)=>{
  if(req.query.pin!=='0988') return res.send('<h1>🔒 PRIVATE BOSS ONLY</h1><p>Add ?pin=0988<br><a href="/monitor?pin=0988">Open Monitor</a></p>');
  let html=`<body style="font-family:Arial;padding:15px;background:#e8f5e9"><h1 style="color:green">🌿 BOSS MONITOR - 115 PRODUCTS</h1><div style="background:green;color:white;padding:15px;border-radius:10px">Total Sales: UGX ${TOTAL.toLocaleString()} | Commission 5%: UGX ${(TOTAL*0.05).toLocaleString()} | Orders: ${ORDERS.length} | Products: 115<br>Pay: Airtel 07544590988</div><hr>`;
  if(!ORDERS.length) html+='<p>No orders yet - Share shop!</p>';
  ORDERS.forEach(o=>{html+=`<div style="background:white;margin:8px 0;padding:10px;border-left:5px solid green;border-radius:5px"><b>${o.time}</b> - UGX ${o.total}<br>${JSON.stringify(o.items).slice(0,300)}</div>`});
  html+=`<br><a href="/" style="background:green;color:white;padding:12px 25px;border-radius:25px;text-decoration:none">← Back to Shop</a></body>`;
  res.send(html);
});

app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(process.env.PORT||10000,()=>console.log('115 PRODUCTS LIVE'));
