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
    userid:{
        type:Sequelize.STRING,
        unique:false
    },
    age:{
        type:Sequelize.STRING
    }
})
const browses=db.define('browses',{
    userid:{
        type:Sequelize.STRING
    },
    date:{
        type:Sequelize.STRING
    },
  sku:{
      type:Sequelize.STRING
  }

    
})
const purchases=db.define('purchases',{
    userid:{
        type:Sequelize.STRING
    },
    date:{
        type:Sequelize.STRING
    },
    sku:{
      type:Sequelize.STRING
  }

    
})
const skus=db.define('skus',{
    sku:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.STRING
    },
    categorydescription:{
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