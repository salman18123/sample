const express=require("express")
const path=require('path')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

var recombee = require('recombee-api-client');
var rqs = recombee.requests;
var client = new recombee.ApiClient('vit', '4ETz4iYzKAvRNujVAWO1baqojMQ35XoLjbdvHuFUbcSiReXm4UE9Et8x9qc0XArt');
const purchases=require('./seed/browse.json')
var recpurchases=[]
const SERVER_PORT=process.env.PORT||3031
console.log(purchases.length)
for(var i=0;i<purchases.length;i++){
    recpurchases.push(new rqs.AddDetailView(purchases[i].User_id,purchases[i].SKU,{cascadeCreate:true}))
}
client.send(new rqs.Batch(recpurchases))
.then(()=>{
    client.send(new rqs.RecommendItemsToUser('7E3C464',5))
    .then((recommended)=>{
        console.log(recommended)
    })
})
.catch((e)=>{
    console.error(e)
})

app.use('/api',require('./routes').route)
app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(SERVER_PORT,()=>{
    console.log("started")
})
                 