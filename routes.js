const route=require("express").Router()
const sequelize=require('./db').db

const skus=require('./db').skus
const purchases=require('./db').purchases
const browse=require('./db').browses
const users=require('./db').users


route.post('/login',(req,res)=>{
    users.findOne({
        where:{
            User_id:req.body.userid
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
                    Description:{
                        $like:`%${req.params.thing}%`
                    }
                },
                {
                    Category_Description:{
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
            SKU:{
                $in:[sequelize.literal(`SELECT SKU FROM browses AS browses WHERE browses.User_id='`+req.params.userId+`' ORDER BY browses.SKU DESC`)]
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
            SKU:{
                $in:[sequelize.literal(`SELECT SKU FROM purchases AS purchases ORDER BY purchases.SKU DESC`)]
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