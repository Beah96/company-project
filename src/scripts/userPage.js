const baseUrl = "http://localhost:3333"
const logoutButton = document.querySelector(".logout__button")
const profileTitle= document.querySelector(".profile__title")
const profileDescription = document.querySelector(".profile__description")
const companySection= document.querySelector(".company__section")
const token = JSON.parse(localStorage.getItem("user:token"))
const isAdm = JSON.parse(localStorage.getItem("user:isAdm"))
const data = JSON.parse(localStorage.getItem("user:data"))
const requestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }

  const checkToken =()=>{
    if(!token|| isAdm == true){
      alert("Você não tem acesso a essa página, faça o login")
      window.location.replace("http://127.0.0.1:5500/index.html") 
    }
  }

logoutButton.addEventListener("click", ()=>{
    localStorage.clear()
    window.location.replace("http://127.0.0.1:5500/index.html")
})


const getEmployees = async()=>{
    const arrayOfEmployees = await fetch(`${baseUrl}/employees/profile`,{
        method: "GET",
        headers: requestHeaders,
    })
    .then((res)=>{
        return res.json()
    })
    return arrayOfEmployees
}

const listOfEmployees = await getEmployees()

const employeeInfo = (array, object)=>{
    let userInfo
    if(array.length>1){
        userInfo = array.filter((ev)=>{
        return ev.email == object.email
        })
    }else{
        userInfo = array
    }
   
    return userInfo
}

const employee = await employeeInfo(listOfEmployees, data)
profileTitle.innerText = employee.name
profileDescription.innerText = employee.email

const getDepartmentById = async (department_id) =>{
    const department = await fetch(`${baseUrl}/departments/readById/${department_id}`,{
        method: "GET",
        headers: requestHeaders,
    })
    .then((res)=>{return res.json()})
    return department
}

const filterEmployeesByCompany = async (object)=>{
    if(!object.company_id || !object.department_id){
        let noCompanyDiv = document.createElement("div")
        noCompanyDiv.classList.add("noCompany__div")
        let noCompanyDescription = document.createElement("h1")
        noCompanyDescription.classList.add("noCompany__title")
        noCompanyDescription.innerText = "Você ainda não foi contratado"
        noCompanyDiv.appendChild(noCompanyDescription)
        companySection.appendChild(noCompanyDiv)
        
    }else{

        const departmentInfo = await getDepartmentById(object.department_id)
        const departmentName = departmentInfo.name
        const departmentComany = departmentInfo.company.name
        const departmentEmployees = departmentInfo.employees

        let companyDiv = document.createElement("div")
        companyDiv.classList.add("company__div")
        let companyTitle =document.createElement("h1")
        companyTitle.classList.add("company__title")
        companyTitle.innerText =`${departmentComany} - ${departmentName}` 
        companyDiv.append(companyTitle)

        let employeesDiv = document.createElement("div")
        employeesDiv.classList.add("employee__div")
        let employeesList = document.createElement("ul")
        employeesList.classList.add("employee__ul")

        departmentEmployees.forEach(element => {
            let employeeCard = document.createElement("li")
                employeeCard.classList.add("employee__li")

            let employeeName = document.createElement("h3")
                employeeName.classList.add("employee__title")
                employeeName.innerText = element.name

                employeeCard.append(employeeName)
                employeesList.append(employeeCard)
        });

        employeesDiv.append(employeesList)

        companySection.append(companyDiv, employeesDiv)
    }

}

await filterEmployeesByCompany(employee)

checkToken()