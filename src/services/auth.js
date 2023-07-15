import { getUserData } from "./storage"

export const isAuthemticated = ()=>{
    return getUserData()!= null?true:false
}