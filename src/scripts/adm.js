const baseUrl = "http://localhost:3333"
const logoutButton = document.querySelector(".logout__button")
const select = document.getElementById("companySelection")

const modalCreate = document.getElementById("createDepartment")
const modalCreateDepartmentButton = document.querySelector(".department__button--create")
const closeModalButton = document.querySelector(".closeModal__button")
const selectDepartmentCreate = document.getElementById("companySelectionForDepartment")
const createDepartmentButton = document.querySelector(".create__button")


const modalVisualizeDepartment = document.getElementById("visualizeDepartment")
const closeVisualizeModalButton = document.querySelector(".visualizeDepartment__button--close")
const departmentNameModal = document.querySelector(".visualizeDepartment__title")
const departmentDescriptionModal = document.querySelector(".visualizeDepartment__description__title")
const departmentCompanyModal = document.querySelector(".visualizeDepartment__company__p")
const selectEmployeesToHire = document.getElementById("hireEmployeeList")
const hireEmployeeButton = document.querySelector(".hireEmployee__button")
const dismissEmployeeDiv = document.querySelector(".dismissEmployee__div")
const dismissEmployeeButton = document.querySelector(".dismissEmployee__button")


const editDepartment = document.getElementById("editDepartment")
const closeEditDepartment = document.querySelector(".editDepartment__button--close")
const updatedDepartmentButton = document.querySelector(".updateDepartment__button")
const updateDepartmentName = document.getElementById("updateDepartmentName")
const updateDepartmentDescription = document.getElementById("updateDepartmentDescription")


const deleteDepartmentModal = document.getElementById("deleteDepartment")
const deleteDepartmentName = document.querySelector(".deleteDepartment__span")
const closeDeleteDepartmentModal = document.querySelector(".deleteDepartment__button--close")
const closeDeleteDepartmentButton = document.querySelector(".deleteDepartment__button")


const editUserModal =  document.getElementById("editUser")
const closeEditUserModal = document.querySelector(".editUser__button--close")
const updateUserName = document.getElementById("updateUserName")
const updateUserEmail = document.getElementById("updateUserEmail")
const updateUserButton = document.querySelector(".updateUser__button")


const deleteUserModal = document.getElementById("deleteUser")
const deleteUserName = document.querySelector(".deleteUser__span")
const closeDeleteUserModal = document.querySelector(".deleteUser__button--close")
const closeDeleteUserButton = document.querySelector(".deleteUser__button")


const departmentDiv = document.querySelector(".departmentCard__div")
const employeeDiv = document.querySelector(".employeeCard__div")
const token = JSON.parse(localStorage.getItem("user:token"))
const isAdm = JSON.parse(localStorage.getItem("user:isAdm"))
const requestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }

const checkToken =()=>{
  if(!token|| isAdm == false){
    alert("Você não tem acesso a essa página, faça o login")
    window.location.replace("http://127.0.0.1:5500/index.html") 
  }
}


const getAllCompanies = async ()=>{
  let companiesList = await fetch(`${baseUrl}/companies/readAll`)
  .then((res)=> {return res.json()})
  return companiesList
}
const allCompanies = await getAllCompanies()

const getCompaniesById = async(companyId)=>{
    let companyById = await fetch(`${baseUrl}/companies/readById/${companyId}`,{
      method:"GET",
      headers: requestHeaders
    })
    .then((res) =>{return res.json()})

    return companyById
}


const getAllDepartments = async ()=>{
  let departmentsList = await fetch(`${baseUrl}/departments/readAll`,{
    method:"GET",
    headers: requestHeaders
  })
  .then((res)=>{return res.json()})
  return departmentsList
}
const allDepartmentsList = await getAllDepartments()

const getDepartmentsByCompany = async (companyId)=>{
  let departmentsList = await fetch(`${baseUrl}/departments/readByCompany/${companyId}`,{
    method:"GET",
    headers: requestHeaders
  })
  .then((res)=>{return res.json()})
  return departmentsList
}
const createDepartment = async(object)=>{
    let newDepartment = await fetch(`${baseUrl}/departments/create`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(object)
    })
    .then((res)=> {return res.json()})
    return newDepartment
}
const updateDepartment = async(department_id,object)=>{
  let updatedDepartment = await fetch(`${baseUrl}/departments/update/${department_id}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(object)
  })
  .then((res)=> {return res.json()})
  return updatedDepartment
}
const deleteDepartment = async(department_id)=>{
  let deletedDepartment = await fetch(`${baseUrl}/departments/delete/${department_id}`, {
    method: "DELETE",
    headers: requestHeaders
  })
  .then((res)=> {return res.json()})
  return deletedDepartment
}


const getAllEmployees = async ()=>{
  let employeeList = await fetch(`${baseUrl}/employees/readAll`,{
    method:"GET",
    headers: requestHeaders
  })
  .then((res)=>{return res.json()})
  return employeeList
}
const allEmployeesList = await getAllEmployees()

const getEmployeesOutOfWork = async()=>{
    let unemployed = await fetch(`${baseUrl}/employees/outOfWork`,{
      method:"GET",
      headers: requestHeaders
    })
  .then((res) =>{return res.json()})
    return unemployed
}
const allUnemployedList = await getEmployeesOutOfWork()

const getEmployeesByCompany = async (array,companyId)=>{
      let companyEmployees = array.filter((element)=>{return element.company_id == companyId})
      return companyEmployees
}
const getEmployeesByDepartment = async (array,departmentId)=>{
  let departmentEmployees = array.filter((element)=>{return element.department_id == departmentId})
  return departmentEmployees
}

const updateEmployee = async(employee_id, object)=>{
  let updatedEmployee = await fetch(`${baseUrl}/employees/updateEmployee/${employee_id}`,{
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(object)
  })
  .then((res)=>{return res.json()})
  return updatedEmployee
}

const hireEmployee = async(employee_id, department_id)=>{
  let hiredEmployee = await fetch(`${baseUrl}/employees/hireEmployee/${employee_id}`,{
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(department_id)
  })
  .then((res)=>{return res.json()})
  return hiredEmployee
}

const dismissEmployee = async(employee_id)=>{
  let dismissedEmployee = await fetch(`${baseUrl}/employees/dismissEmployee/${employee_id}`,{
    method: "PATCH",
    headers: requestHeaders,
  })
  .then((res)=>{return res.json()})
  return dismissedEmployee
}

const deleteEmployee =  async(employee_id)=>{
  let deletedEmployee = await fetch(`${baseUrl}/employees/deleteEmployee/${employee_id}`, {
    method: "DELETE",
    headers: requestHeaders
  })
  .then((res)=> {return res.json()})
  return deletedEmployee
}


const renderOptions = (array, button)=>{
      array.forEach(element => {
        let option = document.createElement("option")
        option.value = element.id
        option.innerText = `${element.name}`
        button.appendChild(option)
      });
}

const createDepartmentCard =(array)=>{
      let oldDepartmentList = document.querySelector(".departmentCard__list")
      oldDepartmentList.remove()

      let newDepartmentList = document.createElement("ul")
      newDepartmentList.classList.add('departmentCard__list')

      if(array.length<1){
        let noDepartmentMessage = document.createElement("p")
        noDepartmentMessage.classList.add("noDepartment__p")
        noDepartmentMessage.innerText = "Não há departamentos para essa empresa"
        newDepartmentList.append(noDepartmentMessage)
      }else{
         array.forEach(async element =>{
        let departmentCard = document.createElement("li")
        departmentCard.classList.add("departmentCard__li")

        let departmentInfoDiv = document.createElement("div")
        departmentInfoDiv.classList.add("departmentInfoCard__div")

        let departmentName = document.createElement("h4")
        departmentName.classList.add("departmentCard__title")
        departmentName.innerText = element.name

        let departmentDescription = document.createElement("p")
        departmentDescription.classList.add("departmentCard__p")
        departmentDescription.innerText = element.description

        let companyName = document.createElement("p")
        companyName.classList.add("departmentCard__p")
        let nameCompany = await getCompaniesById(element.company_id)
        companyName.innerText = nameCompany.name

        departmentInfoDiv.append(departmentName, departmentDescription, companyName)

        let departmentButtonDiv = document.createElement("div")
        departmentButtonDiv.classList.add("departmentButton__div")

        let visualizeButton = document.createElement("button")
        visualizeButton.innerHTML = ("afterbegin",`<img src="../assets/img/visualizar.svg" alt="visualizar">` )
        visualizeButton.addEventListener("click", async ()=>{
          departmentNameModal.innerText = element.name
          departmentDescriptionModal.innerText = element.description
          departmentCompanyModal.innerText = nameCompany.name

          let departmentEmployeesList = await getEmployeesByDepartment(allEmployeesList, element.id) 
          renderEmployeesDismissList(departmentEmployeesList,nameCompany.name)

          localStorage.setItem("visualizeDeparment:id", JSON.stringify(element.id))
          modalVisualizeDepartment.showModal()
        })

        let editButton = document.createElement("button")
        editButton.innerHTML = ("afterbegin",`<img src="../assets/img/editar.svg" alt="editar">` )
        editButton.addEventListener("click", ()=>{
          updateDepartmentName.value = element.name
          updateDepartmentDescription.value = element.description
          localStorage.setItem("editDeparment:id", JSON.stringify(element.id))  
          editDepartment.showModal()
        })

        let deleteButton = document.createElement("button")
        deleteButton.innerHTML = ("afterbegin",`<img src="../assets/img/excluir.svg" alt="excluir">`)
        deleteButton.addEventListener("click",async ()=>{
          deleteDepartmentName.innerText = element.name
          localStorage.setItem("deleteDeparment:id", JSON.stringify(element.id)) 
          deleteDepartmentModal.showModal()
        })

        departmentButtonDiv.append(visualizeButton,editButton,deleteButton)

        departmentCard.append(departmentInfoDiv, departmentButtonDiv)

        newDepartmentList.appendChild(departmentCard)
      })
      }

     
      departmentDiv.appendChild(newDepartmentList)
}

const createEmployeeCard =(array)=>{
  let oldEmployeeList = document.querySelector(".employeeCard__list")
      oldEmployeeList.remove()

      let newEmployeeList = document.createElement("ul")
      newEmployeeList.classList.add('employeeCard__list')

      if(array.length<1){
        let noEmployeeMessage = document.createElement("p")
        noEmployeeMessage.classList.add("noEmployee__p")
        noEmployeeMessage.innerText = "Não há usuários cadastrados"
        newEmployeeList.append(noEmployeeMessage)
      }else{
        array.forEach(async element =>{
        let employeeCard = document.createElement("li")
        employeeCard.classList.add("employeeCard__li")

        let employeeInfoDiv = document.createElement("div")
        employeeInfoDiv.classList.add("employeeInfoCard__div")

        let employeeName = document.createElement("h4")
        employeeName.classList.add("employeeCard__title")
        employeeName.innerText = element.name

        let companyName = document.createElement("p")
        companyName.classList.add("employeeCard__p")
        if(!element.company_id){
          companyName.innerText = "Usuário não Contratado"
        }else{
          let nameCompany = await getCompaniesById(element.company_id)
          companyName.innerText = nameCompany.name
        }

        employeeInfoDiv.append(employeeName, companyName)

        let employeeButtonDiv = document.createElement("div")
        employeeButtonDiv.classList.add("employeeButton__div")

        let editButton = document.createElement("button")
        editButton.innerHTML = ("afterbegin",`<img src="../assets/img/editar.svg" alt="editar">`)
        editButton.addEventListener("click", ()=>{
          localStorage.setItem("editUser:id", JSON.stringify(element.id))
          editUserModal.showModal()
        })

        let deleteButton = document.createElement("button")
        deleteButton.innerHTML = ("afterbegin",`<img src="../assets/img/excluir.svg" alt="excluir">`)
        deleteButton.addEventListener("click", ()=>{
          deleteUserName.innerText = element.name
          localStorage.setItem("deleteUser:id", JSON.stringify(element.id))
          deleteUserModal.showModal()
        })

        employeeButtonDiv.append(editButton,deleteButton)

        employeeCard.append(employeeInfoDiv, employeeButtonDiv)

        newEmployeeList.appendChild(employeeCard)
      })
      }

      
      employeeDiv.appendChild(newEmployeeList)

}

const renderEmployeesDismissList = (array, company)=>{
  let oldDismissEmployeeList = document.querySelector(".dismissEmployee__list")
  oldDismissEmployeeList.remove()

  let newDismissEmployeeList = document.createElement("ul")
  newDismissEmployeeList.classList.add("dismissEmployee__list")

  array.forEach((element)=>{
    let dismissEmployeeCard = document.createElement("li")
    dismissEmployeeCard.classList.add("dismissEmployee__li")

    let dismissEmployeeName = document.createElement("h2")
    dismissEmployeeName.classList.add("dismissEmployee__title")
    dismissEmployeeName.innerText = element.name

    let dismissEmployeeCompany = document.createElement("p")
    dismissEmployeeCompany.classList.add("dismissEmployee__p")
    dismissEmployeeCompany.innerText = company

    let dismissEmployeeButton = document.createElement("button")
    dismissEmployeeButton.classList.add("dismissEmployee__button")
    dismissEmployeeButton.innerText = "Desligar"
    dismissEmployeeButton.addEventListener("click", async ()=>{
      let resultMessage = document.querySelector(".resultDepartmentVisualize__p")
      let dismissed = await dismissEmployee(element.id)
      if(dismissed.message){
        resultMessage.innerText = dismissed.message
        setTimeout(() => {
          modalVisualizeDepartment.close()
          window.location.reload()
        }, 2000)
      }
    })

    dismissEmployeeCard.append(dismissEmployeeName, dismissEmployeeCompany, dismissEmployeeButton)
    
    newDismissEmployeeList.appendChild(dismissEmployeeCard)
  })
  dismissEmployeeDiv.appendChild( newDismissEmployeeList)
}

logoutButton.addEventListener("click", ()=>{
  localStorage.clear()
  window.location.replace("http://127.0.0.1:5500/index.html")
})

select.addEventListener("change", async ()=>{
  let companyID = select.options[select.selectedIndex].value

  if(companyID == "all"){
    createDepartmentCard(allDepartmentsList)
    createEmployeeCard(allEmployeesList)
  }else{
    let employees = await getEmployeesByCompany(allEmployeesList,companyID)
    let departments = await getDepartmentsByCompany(companyID)
    createDepartmentCard(departments)
    createEmployeeCard(employees)
  }

})

modalCreateDepartmentButton.addEventListener("click",()=>{
    modalCreate.showModal()
})

closeModalButton.addEventListener("click",()=>{
  modalCreate.close()
})

createDepartmentButton.addEventListener("click",async ()=>{
  let resultMessage = document.querySelector(".resultCreate__p")
    resultMessage.innerText = ""
  let companyId = selectDepartmentCreate.options[selectDepartmentCreate.selectedIndex].value
  let nameInput = document.getElementById("newDepartmentName")
  let newDepartmentName = nameInput.value
  let descriptionInput = document.getElementById("newDepartmentDescription")
  let newDepartmentDescription = descriptionInput.value

  let newDepartment = {
    "name": `${newDepartmentName}`,
    "description": `${newDepartmentDescription}`,
    "company_id": `${companyId}`
  }

  let result =  await createDepartment(newDepartment)
  if(!companyId || !nameInput || !descriptionInput){
    resultMessage.innerText = "Preencha Todos os Campos"
  } else if(result.message){
    resultMessage.innerText = result.message
  }else{
    resultMessage.innerText = "Departamento criado com sucesso"
    setTimeout(() => {
      modalCreate.close()
      window.location.reload()
    }, 2000)
  }
})

closeVisualizeModalButton.addEventListener("click", ()=>{
  modalVisualizeDepartment.close()
})

hireEmployeeButton.addEventListener("click", async ()=>{
  let resultMessage = document.querySelector(".resultDepartmentVisualize__p")
  let employeeId = selectEmployeesToHire.options[selectEmployeesToHire.selectedIndex].value
  let department = JSON.parse(localStorage.getItem("visualizeDeparment:id"))
  let data ={
    "department_id": `${department}`
  }

  let hired = await hireEmployee(employeeId, data)
  if(hired.message){
    resultMessage.innerText = hired.message
    setTimeout(() => {
      modalVisualizeDepartment.close()
      window.location.reload()
    }, 1000)
  }
})

closeEditDepartment.addEventListener("click", ()=>{
  editDepartment.close()
})

updatedDepartmentButton.addEventListener("click", async ()=>{
  let newDescription = updateDepartmentDescription.value
  let newName = updateDepartmentName.value
  let resultMessage = document.querySelector(".resultDepartmentEdit__p")
  let idDepartment = JSON.parse(localStorage.getItem("editDeparment:id"))
  let object = {}

  if(!newName && !newDescription){
    editDepartment.close()
  } else if(!newDescription){
    object = {
    "name": `${newName}`
  }
  } else if(!newName){
    object ={
      "description": `${newDescription}`,
    }
  }else{
    object={
      "description": `${newDescription}`,
      "name": `${newName}`
    }
  }

  let result = await updateDepartment(idDepartment, object)
  
    resultMessage.innerText = result.message
    localStorage.removeItem("editDeparment:id") 
    setTimeout(()=>{
      editDepartment.close()
      window.location.reload()
    }, 1000)

})

closeDeleteDepartmentModal.addEventListener("click",()=>{
  deleteDepartmentModal.close()
})

closeDeleteDepartmentButton.addEventListener("click", async ()=>{
    let resultMessage = document.querySelector(".resultDepartmentDelete__p")
    let deleteId = JSON.parse(localStorage.getItem("deleteDeparment:id"))
    let departmentEmployees = await getEmployeesByDepartment(allEmployeesList, deleteId)
    
    if(departmentEmployees.length>=1){
     for(let i=0;  i<departmentEmployees.length; i++){
        await dismissEmployee(departmentEmployees[i].id)
     }
    }
    let deletedDepartment = await deleteDepartment(deleteId)

    if(deletedDepartment.message){
      resultMessage.innerText = deletedDepartment.message
      localStorage.removeItem("deleteDeparment:id")
      setTimeout(()=>{
        deleteDepartmentModal.close()
        window.location.reload()
      }, 2000)
    }

})

closeEditUserModal.addEventListener("click", ()=>{
  editUserModal.close()
})

updateUserButton.addEventListener("click", async ()=>{
  let newUserName = updateUserName.value.trim()
  let newUserEmail = updateUserEmail.value.trim()
  let userId = JSON.parse(localStorage.getItem("editUser:id"))
  let resultMessage = document.querySelector(".resultUserEdit__p")

  let object ={}
  
  if(!newUserName && !newUserEmail){
    editUserModal.close()
    
  } else if(!newUserEmail){
    object = {
      "name": `${newUserName}`
    }
  } else if(!newUserName){
    object ={
      "email": `${newUserEmail}`
    }
  }else{
    object={
      "name": `${newUserName}` ,
      "email": `${newUserEmail}`
    }
  }

  let userUpdated = await updateEmployee(userId,object)
  
  if(userUpdated.message){
    resultMessage.innerText = userUpdated.message
  }else{
    resultMessage.innerText = "Usuário Atualizado"
    localStorage.removeItem("editUser:id") 
    setTimeout(()=>{
      editUserModal.close()
      window.location.reload()
    }, 1000)
  }
})

closeDeleteUserModal.addEventListener("click", ()=>{
  deleteUserModal.close()
})

closeDeleteUserButton.addEventListener("click",async ()=>{
  let resultMessage = document.querySelector(".resultUserDelete__p")
  let deleteUserId = JSON.parse(localStorage.getItem( "deleteUser:id"))

  let usedExcommunicado = await deleteEmployee(deleteUserId)
  if(usedExcommunicado.message){
    resultMessage.innerText = usedExcommunicado.message
    localStorage.removeItem("deleteUser:id")
    setTimeout(()=>{
     deleteUserModal.close()
      window.location.reload()
    }, 2000)
  }
 
})

checkToken()
renderOptions(allCompanies, select)
createDepartmentCard(allDepartmentsList)
createEmployeeCard(allEmployeesList)
renderOptions(allCompanies, selectDepartmentCreate)
renderOptions(allUnemployedList,selectEmployeesToHire )

