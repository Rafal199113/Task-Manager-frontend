import React, { useEffect } from 'react';
import { useAuth } from '../../providers/AuthProvider'
import Avatar from '../../components/dashboard/Avatar'
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Buttons from '../../components/users/Buttons';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { useNavigate } from "react-router-dom";
import Loader from '../../components/shared/Loader';
import UsersList from 'pages/users/_list'

function Index() {
    const whereIam = [{ "Dashboard": null }, { "Użytkownicy": null }, { "Lista": null }]
    const { data: users, isLoading } = useUsers();
    const navigate = useNavigate();

    const onEdit = (id) => {
        navigate(`/users/edit/${id}`);
    }

    if (isLoading) { return <Loader /> } else if (users) {
        return (
            <div>
                <div className='w-full'>
                    <Breadcrumbs items={whereIam} />
                    <Buttons />
                    <UsersList users={users?.data} header={"Lista użytkowników"}/>
                </div>
            </div>
        );
    }

}

export default Index;