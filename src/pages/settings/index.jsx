import React from 'react';
import { useSettingsPositions } from '../../hooks/settings';
import Buttons from '../../components/users/Buttons';
import Breadcrumbs from '../../components/shared/breadcrumbs';
import Loader from '../../components/shared/Loader';
import SettingList from 'pages/settings/_list'
import { useAuth } from '@/providers/AuthProvider';

function Index() {
    const { can } = useAuth();
    const whereIam = [{ "Dashboard": null }, { "Ustawienia": null }, { "Lista": null }]
    const { data: settingsPositions, isLoading } = useSettingsPositions();
    
console.log('positions' , settingsPositions?.data)
    if (isLoading) { return <Loader /> } else if (settingsPositions) {
        return (
            <div>
                <div className='w-full'>
                    <Breadcrumbs items={whereIam} />
                    <SettingList positions={settingsPositions?.data} header={"Lista użytkowników"}/>
                </div>
            </div>
        );
    }

}

export default Index;