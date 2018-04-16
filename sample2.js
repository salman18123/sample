const purchases=require('./seed/browse.json')
let user_id=null;
let objs=[]
let ob=[]

for(var i=0;i<purchases.length;i++){
    user_id=purchases[i].user_id
    let obj={}
obj.user_id=user_id

for(var j=0;j<purchases.length;j++){
    if(purchases[j].User_id==obj.user_id){
        var item_id=purchases[j].SKU
         if(!obj.item_id){
             obj.item_id.count=0;
         }        
         else{
             obj.item_id.count++
         }
    }
}
objs.push({user_id:obj})

}
console.log(objs)