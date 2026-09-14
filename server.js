const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

app.get('/api/products', (req,res)=>{
  res.json([
    {id:1,name:"Kakira Sugar 1kg",price:5500},
    {id:2,name:"Omo 1kg",price:12000},
    {id:3,name:"Blue Band 500g",price:9000},
    {id:4,name:"Mukwano Oil 1L",price:7500},
    {id:5,name:"Bread",price:4000},
    {id:6,name:"Eggs Tray",price:15000}
  ]);
});

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,'public','index.html'));
});

app.listen(process.env.PORT||10000, ()=>console.log('GREEN LIVE'));
