const baseUrl = "http://localhost:3333"
const loginPage = document.querySelector('.loginPage__button')
const homePage = document.querySelector(".homePage__button")
const secondHomePage = document.querySelector(".secondHomePage__button")
const registerName = document.getElementById("registerName")
const registerEmail = document.getElementById("registerEmail")
const registerPassword = document.getElementById("registerPassword")
const registerButton = document.querySelector(".doRegister__button")
const registerMessage = document.querySelector(".register__p")



homePage.addEventListener("click", ()=>{
    window.location.replace("http://127.0.0.1:5500/index.html")
})

secondHomePage.addEventListener("click", ()=>{
    window.location.replace("http://127.0.0.1:5500/index.html")
})

loginPage.addEventListener("click", ()=>{
    window.location.replace("http://127.0.0.1:5500/src/pages/login.html")
})

const doRegister = async (object)=>{
    const info ={
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    }

    const register = await fetch(`${baseUrl}/employees/create`,info)
    
    return register
}


registerButton.addEventListener('click', async ()=>{
    const newName = registerName.value 
    const newEmail = registerEmail.value
    const newPassword = registerPassword.value

    if(newName == ""|| newEmail==""||newPassword==""){
        registerMessage.innerText = "Preencha todos os campos"
    }else{
         const data = {
        name:`${newName}`,
        email: `${newEmail}`,
        password: `${newPassword}`
        }

        const newRegister = await doRegister(data)
        const newRegisterJSON = await newRegister.json()
    
        if(newRegisterJSON.message){
            registerMessage.innerText = newRegisterJSON.message
        } else{
            registerMessage.innerText = "Cadastro realizado com sucesso"
            setTimeout(() => {
                location.replace('http://127.0.0.1:5500/src/pages/login.html')
              }, 2000)
        }
    }
})
