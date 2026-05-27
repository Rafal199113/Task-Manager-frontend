import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ListItem(props) {
    return (
        <NavLink
            to={props.link || "#"}
           className={({ isActive }) =>
            `flex items-center gap-x-3 w-64 rounded-xl p-3 ${
                isActive && props.link ? "bg-gray-700 border-red-500" : "bg-gray-800"
            }`
        }
        >
            {props.fileIcon && (
                <img src={props.fileIcon} alt="Logo" width={props.size} />
            )}

            {props.icon && (
                <FontAwesomeIcon size="2x" icon={props.icon} />
            )}

            <div>{props.label}</div>
        </NavLink>
    );
}

export default ListItem;