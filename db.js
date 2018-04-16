const Sequelize=require('sequelize')
var db
if(process.env.DATABASE_URL){
    db=new Sequelize(process.env.DATABASE_URL,{
        dialect:'postgres',
        protocol:'postgres',
        logging:false
    })

}
else{
    db=new Sequelize('tcsdatabase','user','mypass',{
        dialect:'mysql',
        host:'localhost',
        pool:{
            min:0,
            max:5
        }
    })

}


const users=db.define('users',{
    User_id:{
        type:Sequelize.STRING,
        unique:false
    },
    Age:{
        type:Sequelize.STRING
    }
})
const browses=db.define('browses',{
    User_id:{
        type:Sequelize.STRING
    },
    Date:{
        type:Sequelize.STRING
    },
  SKU:{
      type:Sequelize.STRING
  }

    
})
const purchases=db.define('purchases',{
    User_id:{
        type:Sequelize.STRING
    },
    Date:{
        type:Sequelize.STRING
    },
  SKU:{
      type:Sequelize.STRING
  }

    
})
const skus=db.define('skus',{
    SKU:{
        type:Sequelize.STRING
    },
    Description:{
        type:Sequelize.STRING
    },
    Category_Description:{
        type:Sequelize.STRING
    }


})
db.sync()
.then(()=>{
    console.log("started successfully")
})
exports=module.exports={
    users,db,browses,purchases,skus
}