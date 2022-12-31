import { useRef } from "react";
import { useParams } from "react-router-dom";
import "./dropdown.css"

function Dropdown({title,array ,members}) {
  const { serverId } = useParams();
  const elm = useRef()
  function loadDropDownList( obj, arr, key){

    function loadList(object,key){
      return (
        <>
          <div key={key}>
            {
              (object) ? <a  href={`/server/${object._id ?? serverId}`} >
                <h5>
                  {(typeof object == "object") ?  object.name : object}
                </h5>
              </a>:""
            } 
          </div>
        </>
      )      
    }

    if(obj){
      console.log("arrayOfObject")
      return loadList(obj,key)
    }else{
      console.log("array")
      return loadList(arr,key)
    }
  }
  
  function clickHandler(e){
      e.preventDefault()
      elm.current.classList.toggle("hide")
  }
  return (
    <> 
      <div>  
          <div className="drop-down" >
            <div>
              <h3 onClick={clickHandler} >{title}</h3>
            </div>
            <div className="dropdown-content hide" ref={elm}>
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
      </div>
    </>
  )  
}

export default Dropdown