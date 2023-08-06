import { useRef } from "react";
import { useParams } from "react-router-dom";
import "./dropdown.css"

function Dropdown({title,array ,members}) {
  const { serverId } = useParams();
  const dropdownContent = useRef()
  const wantMoreImg = useRef()
  const metaDropown = useRef()
  function loadDropDownList( obj, arr, key){

    function loadList(object,key){
      return (
        <>
          <div key={key}>
            {
              (object) ? 
              <>
              <a  href={`/server/${object._id ?? serverId}`} >
                <h6>
                  { object.name ?? ( object.memberName && object.you ? "You" : object.memberName) }
                </h6>
                {(object.name) ? <i class="fa-solid fa-arrow-right" style={{color:"#ffff"}}></i> : ""} 
                {
                  (object.adminStatus) ? 
                  <img title="Admin" src="../images/admin.svg"/> :
                  (!object.name) ? <img title="Member" src="../images/member.svg"/>:""
                } 
                </a>
              </>
              :""
            } 
          </div>
        </>
      )      
    }

    if(obj){
      return loadList(obj,key)
    }else{
      return loadList(arr,key)
    }
  }
  
  function clickHandler(e){
      e.preventDefault()
      metaDropown.current.classList.toggle("on")
      setTimeout(()=>{
        const divs  = [...dropdownContent.current.querySelectorAll("div")]
        divs.forEach(div=>{
          div.classList.toggle("slide")
        })
        dropdownContent.current.classList.toggle("active")
        wantMoreImg.current.classList.toggle("down")
      },150)
  }
  
  return (
    <> 
      <div className="drop-down" >
            <div className="metadata-dropdown" ref={metaDropown}
             onClick={clickHandler}>
              <h3>{title}</h3>
              <img src="../images/more.svg" 
                ref={wantMoreImg} />
            </div>
            <div className="dropdown-content" ref={dropdownContent}>
              {
                array ?
                  array.map((obj,key)=>(
                    loadDropDownList(obj,null,"dfd")
                  ))
                :members ? 
                  members.map((member,key)=>(
                    loadDropDownList(null ,member,key)
                  ))
                :"not available"
              }
            </div>
          </div>
       </>
  )  
}

export default Dropdown