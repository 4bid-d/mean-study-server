import Button from "../../Server/create-form/button/Button";
import AllServers from "../sub-component/dropdown/Dropdown";
import "./sidebar.css"
function SideMenu({array ,members,button}) {
  function createFormbutton(obj){
    return(
      <Button
        state={obj.state}
        stateToggleFunction={obj.onclick}
      />
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
      <div className="sidebar">
        {array ? serversDropDown(array) : ""} 
        {members ? membersDropDown(members) : ""} 
        {
          button ? 
            createFormbutton(button)
          : ""
        }
      </div>
    </>
  );
}

export default SideMenu