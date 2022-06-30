import jwt from "jsonwebtoken";

export const validateAccessToken = ( token) => {
 try{
  const decoded = jwt.verify(token, "seckret123")
  const {_id} = decoded
  return _id;
 }catch(e){
   return undefined
 }
}