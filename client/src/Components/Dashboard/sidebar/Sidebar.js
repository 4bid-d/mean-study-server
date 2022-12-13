import AllServers from "../sub-component/displayServers/AllServers";
import "./sidebar.css"
function SideMenu() {
  return (
    <>
      <div className="sidebar">
        <AllServers/>
      </div>
    </>
  );
}

export default SideMenu