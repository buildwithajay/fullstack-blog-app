export const setAuthToken = (token)=>{
    localStorage.setItem("authToken", token);
}
export const getAuthToken =()=>{
    return localStorage.getItem("authToken")
}
export const removeAuthToken =()=>{
    localStorage.removeItem('authToken')
}
export const isAuthenticate =()=>{
    const token = getAuthToken();
    if(!token) return false;
    try{
        let payload = JSON.parse(atob(token.split('.')[1]))
        let currentDate = Date.now() / 1000;

        if(payload.exp < currentDate){
            removeAuthToken();
            return false
        }
        return true

    }catch(e){
        removeAuthToken();
        console.log(e)
    }
}
export const getUserFromToken=()=>{
    const token = getAuthToken();
    if(!token) return false;
    try{
        let payload = JSON.parse(atob(token.split(".")[1]))
        return {
            Id: payload.sub || payload.Id,
            username: payload.Username || payload.name,
            email: payload.email,
            role: payload.role,
        }
    }catch(error){
        removeAuthToken();
        console.log(error)
    }
}
export const apiCall = async(url, options={})=>{
    const token = getAuthToken();
    const config = {
        ...options,
        headers:{
            "Content-Type":"application/json",
            ...options.headers
        }
    }
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    try{
        let response = await fetch(url, config)
        if(response.status == 401){
            removeAuthToken();
            window.location.href = "/login"
            return
        }
        return response;
    }catch(error){
        removeAuthToken();
        console.log(error)
    }
}