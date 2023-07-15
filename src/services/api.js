import axios from "axios"

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1"

const api_key = 'AIzaSyApSgbgMtjoulth7rTaP8QAlahiRXANWp0'

const REGISTER_URL = `/accounts:signUp?key=${api_key}`

const LOGIN_API = `accounts:signInWithPassword?key=${api_key}`

export const registerapi = (inputs)=>{
    let data = {
        displayName: inputs.name,
        email: inputs.email,
        password : inputs.password
    }

   return axios.post(REGISTER_URL,data);

}

export const loginapi = (inputs)=>{
    let data = {
        email : inputs.email,
        password : inputs.password
    }

    return axios.post()
}