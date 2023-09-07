const baseUrl = "http://localhost:3333"
const homePage = document.querySelector('.homePage__button')
const registerPage = document.querySelector(".registerPage__button")
const secondRegisterPage = document.querySelector('.secondRegisterPage__button')
const loginEmail = document.getElementById("loginEmail")
const loginPassword = document.getElementById("loginPassword")
const loginButton = document.querySelector(".login__button")
const loginMessage = document.querySelector(".login__message")


homePage.addEventListener("click", ()=>{
    window.location.replace("http://127.0.0.1:5500/index.html")
})

registerPage.addEventListener("click", ()=>{
    window.location.replace("http://127.0.0.1:5500/src/pages/register.html")
})

secondRegisterPage.addEventListener("click", ()=>{
    window.location.replace("http://127.0.0.1:5500/src/pages/register.html")
})

const doLogin = async(object)=>{
    const info ={
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    }

    const login = await fetch(`${baseUrl}/auth/login`,info)
    
    return login
}

loginButton.addEventListener("click", async ()=>{
    const email = loginEmail.value
    const password = loginPassword.value

    const data = {
         email: `${email}`,
         password: `${password}`
    }

    const logon = await doLogin(data)
    const logonJSON = await logon.json()
    
    
    if(logonJSON.message){
        loginMessage.innerText = logonJSON.message
    }else{
        localStorage.setItem("user:token", JSON.stringify(logonJSON.authToken))
        localStorage.setItem("user:isAdm", JSON.stringify(logonJSON.isAdm))
        localStorage.setItem("user:data", JSON.stringify(data))
       if(logonJSON.isAdm == true){
        window.location.replace("http://127.0.0.1:5500/src/pages/adm.html")
       } else{
        window.location.replace("http://127.0.0.1:5500/src/pages/userPage.html")
       }
    }

})