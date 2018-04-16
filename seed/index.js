const db=require('../db').db
const users=require('../db').users
const browse=require('../db').browses
const purchases=require('../db').purchases
const skus=require('../db').skus
 const promise=require('bluebird')
 const userdata=require('./users.json')
 const browsedata=require('./browse.json')  
 const purchasedata=require('./purchases.json') 
 const skudata=require('./sku.json')
 console.log(userdata)
db.sync({force:true})
.then(()=>{
    users.bulkCreate(userdata)
    .then(()=>{
        console.log("done")
    })
    browse.bulkCreate(browsedata)
    .then(()=>{
        console.log("done2")
    })
    purchases.bulkCreate(purchasedata)
    .then(()=>{
        console.log("done3")
    })
    skus.bulkCreate(skudata)
    .then(()=>{
        console.log("done4")
    })
    
})