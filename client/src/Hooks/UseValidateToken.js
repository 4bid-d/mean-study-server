import {
    getLocalstorage, setLocalstorage,
  } from "./useLocalstorage"
import {useNavigate} from "react-router-dom"
export function UseValidateToken() {
    const navigate = useNavigate()
    const token = getLocalstorage("Token") 
   
    if(token){
        return token
    }else{
        return false
    }

}

