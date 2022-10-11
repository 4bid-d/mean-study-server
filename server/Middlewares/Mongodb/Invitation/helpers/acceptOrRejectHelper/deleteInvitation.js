const INVITAION_MODEL = require("../../../../../Schemas/Invitaion/invitaionSchema"); 
function deleteInvitation(index,array,username){
    let newArray =[]
        for(let i=0;i<array.length ; i++){
            if(i == index){
                continue
            }else{
                newArray.push(array[i])
            }
        }

    INVITAION_MODEL
    .updateOne(
        {
            username : username
        },
        {
            requests:[
                ...newArray
            ]
        })
    .then((result)=>{
        return
    })
}
module.exports = deleteInvitation