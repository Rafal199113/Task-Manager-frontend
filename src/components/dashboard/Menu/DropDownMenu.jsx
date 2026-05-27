
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUsers, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";
import ModuleIcon from 'assets/menu/icons/module.png'

function DropDownMenu(props){
    const navigate = useNavigate();
    const [adminOpen, setAdminOpen] = useState(false);
    return (
        <div>
            <div onClick={() => setAdminOpen(!adminOpen)}>
                <ListItem size={50} fileIcon={props.fileIcon} label={props.label} />
            </div>

           <div
    className={`
        ml-2
        overflow-hidden
        transition-all
        duration-300
        ${adminOpen ? "max-h-40 mt-2" : "max-h-0"}
    `}
>
    <div className="w-48 border-b border-white/20">
        <ListItem
            label="Uprawnienia"
            link="/administration/permissions/index"
        />
    </div>
</div>
        </div>
  );
}

export default DropDownMenu