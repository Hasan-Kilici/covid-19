const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fetch  = require("node-fetch")

app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.set('view engine', 'ejs')

app.get("/", (req,res) => {
  res.render("index");
});

app.post('/api',(req,res)=>{
  res.redirect(`/ulke/${req.body.ulke}`);
})

app.get('/ulke/:ulke', async (req,res)=>{
  fetch(`https://disease.sh/v3/covid-19/countries/${req.params.ulke}`).then(async (api)=>{
  let ulke = await api.json();
    
  res.render("api",{
    data : ulke,
  })
  });
})

app.listen(3000, ()=>{
  
});
