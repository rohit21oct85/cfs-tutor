import axios from 'axios'
import {apiUrl, authAxios} from '../config/config'

export default async function setLogin(formdata){
    try {
    return await axios.post(apiUrl + "auth/login", formdata)
    }
    catch(e){
        return e.response
    }
}

export async function setSignup(formdata){
    try {
    return await axios.post(apiUrl + "auth/register", formdata)
    }
    catch(e){
        return e.response
    }
}

export async function setLogout(){
    try {
    return await authAxios.delete(apiUrl + "auth/logout")
    }
    catch(e){
        return e.response
    }
}
