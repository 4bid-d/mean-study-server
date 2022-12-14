import AllServers from "../sub-component/dropdown/Dropdown";
import "./sidebar.css"
function SideMenu({array ,members}) {
  console.log(array)
  return (
    <>
      <div className="sidebar">
        <AllServers array={array} members={members}/>
      </div>
    </>
  );
}

export default SideMenu