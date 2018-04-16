const route=require("express").Router()
const sequelize=require('./db').db

const skus=require('./db').skus
const purchases=require('./db').purchases
const browse=require('./db').browses
const users=require('./db').users


route.post('/login',(req,res)=>{
    users.findOne({
        where:{
            userid:req.body.userid
        }
    })
    .then((data)=>{
        res.send({user:data})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})


route.get('/search/:thing',(req,res)=>{
    skus.findAll({
        where:{
            $or:[
                {
                    description:{
                        $like:`%${req.params.thing}%`
                    }
                },
                {
                    categorydescription:{
                        $like:`%${req.params.thing}%`
                    }
                }
            ]
        }
    })
    .then((data)=>{
        console.log(data)
        res.send(data)

    })
    
})
route.get('/recommend/:userId',(req,res)=>{
    skus.findAll({
        where:{
            sku:{
                $in:[sequelize.literal(`SELECT sku FROM browses AS browses WHERE browses.userid='`+req.params.userId+`' ORDER BY browses.sku DESC`)]
            }
        },
        limit:5
    })
  
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send({error:err})
    })


})
route.get('/recommendpurchases',(req,res)=>{
    skus.findAll({
        where:{
            sku:{
                $in:[sequelize.literal(`SELECT sku FROM purchases AS purchases ORDER BY purchases.sku DESC`)]
            }
        },
        limit:5
    })
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send({error:err})
    })
})


exports=module.exports={
    route
}