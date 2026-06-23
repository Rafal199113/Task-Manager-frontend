import React from 'react';
import { useProjects} from '../../hooks/projects';
import Buttons from './Buttons';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import Loader from '../../components/shared/Loader';
import ProjectList from 'pages/Projects/_list'
import { useAuth } from '@/providers/AuthProvider';

function Index() {
    const { can } = useAuth();
    const whereIam = [{ "Dashboard": null }, { "Projekty": null }, { "Lista": null }]
    const { data: projects, isLoading } = useProjects();
    console.log(projects)

    if (isLoading) { return <Loader /> } else if (projects) {
        return (
            <div>
                <div className='w-full'>
                    <Breadcrumbs items={whereIam} />
                    {can('projects.create') && (
                        <Buttons />       
                    )}
                    <ProjectList projects={projects?.data} header={"Lista projetków"}/>
                </div>
            </div>
        );
    }

}

export default Index;