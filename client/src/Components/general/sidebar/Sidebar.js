import Button from "../../Server/create-form/button/Button";
import AllServers from "../sub-component/dropdown/Dropdown";
import "./sidebar.css"
function SideMenu({array ,members,button,form}) {

  function createFormbutton(obj){
    return (
      button
    )
  }
  
  function membersDropDown(arrayOfMembers){
    return (
      <AllServers members={arrayOfMembers} 
        title={"members"} />
    )
  }

  function serversDropDown(arrayOfServerObjects){
    return (
      arrayOfServerObjects.map(serverObj=>(
        <AllServers array={serverObj.servers} 
          title={serverObj.head}/>
      ))
    )
  }

  return (
    <>
      <div className="sidebar-wrapper" >
        <div className="sidebar">
          {array ? serversDropDown(array) : ""} 
          {members ? membersDropDown(members) : ""} 
          {form}
          {
            button ? 
            createFormbutton(button)
            : ""
          }
        </div>
        <div className="toggle-sidebar">
        {/* <i class="fa-solid fa-angles-left" style={{color: "#ffff  "}}></i> */}
        </div>
      </div>
    </>
  );
}

export default SideMenu