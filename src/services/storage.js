export const store_userdata = (data)=>{
    localStorage.setItem('idToken',data)
}

export const getUserData = ()=>{
    return localStorage.getItem('idToken')
}