export const setItem=(token)=>{
    localStorage.setItem('TOKEN',token)
}
export const getItem=()=>{
    return localStorage.getItem('TOKEN')
}
