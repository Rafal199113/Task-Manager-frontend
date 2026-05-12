
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function ListItem(props){
      const navigate = useNavigate();
    return (
      <div onClick={() => props.link && navigate(props.link)} className="flex items-center hover:bg-gray-600 gap-x-3 w-64 rounded-xl bg-gray-800 p-3">
        <div>
          <FontAwesomeIcon size="2x" icon={props.icon} />
        </div>

        <div>
          {props.label}
        </div>
      </div>
  );
}

export default ListItem