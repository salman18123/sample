const purchases=require('./seed/browse.json')
let user_id=null;
let obj=[]

for(var i=0;i<purchases.length;i++){
    user_id=purchases[i].User_id
    let puser_id=user_id
    if(puser_id.done){
        continue
    }
    else{
        puser_id.done=true
        console.log(puser_id.done)
    }
    
    for(var j=i;j<purchases.length;j++){
        
        
       
        if(purchases[j].User_id==user_id){
            var item_id=purchases[j].SKU
            console.log(item_id)
            if(!puser_id.item_id){
                puser_id.item_id.count=0;
            }
            else{
                puser_id.purchases[j].SKU.count++;
            }
           
            
        }
    }
    obj.push(puser_id)
    


}
console.log(obj)