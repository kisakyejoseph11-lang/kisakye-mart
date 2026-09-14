const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;
app.use(express.json());
app.use(express.static(__dirname));
let products = [
  {id:1,name:"Bananas",price:2000,category:"groceries",image:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e"},
  {id:2,name:"Matooke",price:15000,category:"groceries",image:"https://images.unsplash.com/photo-1597362925123-77861d3fbac7"}
];
let orders = [];
app.get('/api/products', (req,res)=> res.json(products));
app.post('/api/products', (req,res)=>{ const p={id:Date.now(),...req.body}; products.push(p); res.json(p); });
app.delete('/api/products/:id',(req,res)=>{ products=products.filter(p=>p.id!=req.params.id); res.json({ok:true}); });
app.get('/api/orders', (req,res)=> res.json(orders));
app.post('/api/orders', (req,res)=>{ const o={id:Date.now(),...req.body,date:new Date()}; orders.push(o); console.log("NEW ORDER:",o); res.json(o); });
app.get('/', (req,res)=> res.sendFile(path.join(__dirname,'index.html')));
app.listen(PORT, ()=> console.log("KISAKYE MART LIVE on "+PORT));
