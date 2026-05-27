
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUsers, faLayerGroup, faCheck } from '@fortawesome/free-solid-svg-icons'
import ListItem from "./ListItem";

import DropDownMenu from './DropDownMenu';
import { useAuth } from '../../../providers/AuthProvider'
import { useApp } from '../../../providers/AppProvider'
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/app/icon.png'
import adminIcon from '../../../assets/menu/icons/administration.png'

function Menu() {
    const { setActive} = useApp();
    const { user, roles, logoutUser } = useAuth();
    const { t } = useTranslation()
   
    const [adminOpen, setAdminOpen] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        logoutUser();
    }


    return (
        <div className="w-full bg-gray-800 rounded-xl p-3">
            <div className="w-64 min-h-[50vh] m-3 flex flex-col gap-2">
                <ListItem icon={faHouse} label="Dashboard" onClick={()=>{setActive("Dashboard")}}/>
                <ListItem icon={faUsers} label="Użytkownicy" link="/users" onClick={()=>{setActive("Użytkownicy")}}/>
                <ListItem icon={faUsers} label="Administracja" link="/administration" />
                <ListItem icon={faLayerGroup} label="Projekty" />
                <ListItem icon={faCheck} label="Zadania" />
            </div>

            <div className="w-64  min-h-[10vh] self-end m-3 flex flex-col gap-2">
                <div className="flex-col items-center gap-3 py-4">
                    <div className="flex gap-3 py-4">
                        <div className="flex justify-center items-center">
                            <div className="rounded-full border border-width:1px; border-color:white; bg-menu w-8 h-8 flex items-center justify-center">
                                <div>
                                    {user?.name?.charAt(0)}
                                    {user?.surname?.charAt(0)}
                                </div>
                            </div>
                        </div>

                        <div className='col'>

                            <strong style={{ fontSize: 14 }}>
                                {user?.name} {user?.surname}
                            </strong>

                            <div className="flex flex-col" >

                                {roles?.map((role, index) => (
                                    <span style={{ fontSize: 14 }}>
                                        {t(`roles.${role?.name}`)}
                                    </span>
                                ))}


                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-transparent text-white py-1 px-6 rounded-md hover:bg-gray-600"
                    >
                        Wyloguj się
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Menu