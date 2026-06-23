import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProject, useUpdateProjct, useDeleteProject } from "../../hooks/projects";
import Loader from "../../components/shared/Loader";
import FormValidator from "../../validators/FormValidator";
import _Form from "./_Form";
import Breadcrumbs from "../../components/shared/Breadcrumbs";
import { useAuth } from '@/providers/AuthProvider';
import Delete from "../../components/shared/module/Delete"

function Edit() {
    const whereIam = [{ "Dashboard": null }, { "Projekty": "/projects" }, { "Edytuj projekt": null }]
    const { id } = useParams();
    const { data: project, isLoading: isProjectLoaded } = useProject(id);
    const {mutate: updateProject, isPending: isProjectUpdated} = useUpdateProjct();
    const { user, can } = useAuth();
    const [errors, setErrors] = useState([]);
  
    const isPageLoading = isProjectLoaded;

   

    const onSubmit = (e) => {
        e.preventDefault();

        const rules = [
            { required: true },
            { minLength: 2 },
            { maxLength: 50 },
            { isEmpty: false },
        ];

        const validator = new FormValidator('projects');

        validator.validateField("p_name", e.target.p_name.value, rules);
        validator.validateField("p_key", e.target.p_key.value, rules);
        validator.validateField("p_desc", e.target.p_desc.value, rules);
        validator.validateField("p_color", e.target.p_color.value, rules);

        if (validator.getErrors().length > 0) {
            setErrors(validator.getErrors());
            return;
        }

        const formData = {
            p_name: e.target.p_name.value,
            p_key: e.target.p_key.value,
            p_desc: e.target.p_desc.value,
            p_color: e.target.p_color.value,
            id_user: user.id_user,
        };

        updateProject({
            id,
            projectData: formData,
        });
    };

    if (isPageLoading) { return <Loader /> } else {
        return (
            <div>

                <div className='w-full'>
                    <Breadcrumbs items={whereIam} />
                    <div className='flex flex-col  mt-3 border border-gray-300 gap-3 bg-white rounded-lg shadow-md'>
                        <div className='table-header rounded m-0'>
                            Edycja projektu
                        </div>
                        <div className="p-2">
                            <form onSubmit={onSubmit}>
                                <_Form errors={errors} project={project?.data} isEdit />
                            </form>
                        </div>
                    </div>
                </div>
                <Delete
                    id_element = {id}
                    url = "/projects/"
                    navigateTo = "/projects"
                    element = "project"
                    returnElement = "projects"
                    permission = "projects.delete"
                    confirm_text = "Czy napewno chcesz usunąć projekt?"
                />
            </div>
        );
    }
}

export default Edit;