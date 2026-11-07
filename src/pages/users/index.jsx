import React from 'react';
import { useUsers } from '../../hooks/users';
import Buttons from '../../components/users/Buttons';
import Breadcrumbs from '../../components/shared/breadcrumbs';
import Loader from '../../components/shared/Loader';
import UsersList from 'pages/users/_list'
import { useAuth } from '@/providers/AuthProvider';

function Index() {
    const { can } = useAuth();
    const whereIam = [{ "Dashboard": null }, { "Użytkownicy": null }, { "Lista": null }]
    const { data: users, isLoading } = useUsers();

    if (isLoading) { return <Loader /> } else if (users) {
        return (
            <div>
                <div className='w-full'>
                    <Breadcrumbs items={whereIam} />
                    {can('users.create') && (
                        <Buttons />       
                    )}
                    <UsersList users={users?.data} header={"Lista użytkowników"}/>
                </div>
            </div>
        );
    }

}

export default Index;