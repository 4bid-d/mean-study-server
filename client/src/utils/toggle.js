function setFormOn(){
    const createFormEntireDiv = document.querySelector(".background")
    const formDiv = document.querySelector(".form-div")
    createFormEntireDiv.classList.toggle("active")
    formDiv.classList.add("animate")
}

function sideBarToggler(){

    return function (){
        let sidebar = document.querySelector(".sidebar-wrapper")
        let navbar= document.querySelector(".navbar")
        sidebar.classList.toggle("off")
        navbar.classList.toggle("short")        
    }
} 

export  {
    setFormOn,
    sideBarToggler
}