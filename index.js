const express = require("express");
const app = express();

app.use(express.json({extended:true}));

const router = require("./routes/router");
  
app.use("/",router);

app.listen(4000,()=>{
    console.log("o servidor está rodando..");
});
