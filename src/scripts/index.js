const baseUrl = "http://localhost:3333"
const loginPage = document.querySelector('.loginPage__button')
const registerPage = document.querySelector(".registerPage__button")
const companyDiv = document.querySelector('.company__div')
const select = document.getElementById('sectorSelection')



loginPage.addEventListener("click", ()=>{
    window.location.replace("http://127.0.0.1:5500/src/pages/login.html")
})

registerPage.addEventListener("click", ()=>{
    window.location.replace("http://127.0.0.1:5500/src/pages/register.html")
})


const categories = async()=>{
    const categoriesData = await fetch(`${baseUrl}/categories/readAll`)
    .then((res)=>{return res.json()})
    return categoriesData
}
const categoryInfo = await categories()

const renderCategories = (array)=>{    
    array.forEach(element => {
        let option = document.createElement("option")
        option.value = element.name
        option.innerText = `${element.name}`
        select.appendChild(option)
    });
    
}


const companies = async()=>{
    const companiesData = await fetch(`${baseUrl}/companies/readAll`)
    .then((res)=>{return res.json()})
    return companiesData
}
const allCompaniesInfo = await companies()

const companiesByCategory = async(string)=>{
    const companiesByCategory = await fetch(`${baseUrl}/companies/readByCategory/${string}`)
    .then((res)=>{return res.json()})
    return companiesByCategory
}


const renderCompanies = (array)=>{
    let oldCompanyList = document.querySelector(".company__list")
    oldCompanyList.remove()

    let newCompanyList = document.createElement('ul')
    newCompanyList.classList.add("company__list")
    
    array.forEach(element =>{
        let companyCard = document.createElement('li')
        companyCard.classList.add("company__li")
        
        let companyTitle = document.createElement('h3')
        companyTitle.classList.add("company__title")
        companyTitle.innerText = element.name

        let companyCategory = document.createElement('p')
        companyCategory.classList.add("company__category__p")
        let category = categoryInfo.find((elem) => {if (elem.id === element.category_id){
            return elem
        }})
        companyCategory.innerText = category.name
            
            companyCard.append(companyTitle, companyCategory)
            newCompanyList.appendChild(companyCard)
        })
        
        companyDiv.appendChild(newCompanyList)
    }
    
    
select.addEventListener("change",async ()=>{
    const categoryValue = select.options[select.selectedIndex].value

    if(categoryValue == 'all' || categoryValue == '' ){
         renderCompanies(allCompaniesInfo)
    }else{
       const companiesInfoByCategory = await companiesByCategory(categoryValue)
        renderCompanies(companiesInfoByCategory)
    }
    
})


renderCategories(categoryInfo)
renderCompanies(allCompaniesInfo)
