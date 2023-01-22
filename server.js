
const express = require("express");


const app = express();

app.get("/",(req,res)=>{
    res.json("data test")
})



app.listen(3000, () => {
  console.log(`Server listening on port number 3000`);
});