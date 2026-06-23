import React, { useState } from 'react';
import { useAddProject} from '../../hooks/projects';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import FormValidator from '../../validators/FormValidator';
import _Form from './_Form';
import { useAuth } from '@/providers/AuthProvider';

function Create() {
    const whereIam = [{"Dashboard" : null}, {"Projekty": "/projects"}, {"Nowy projekt":null}]
    const { mutate: addProject } = useAddProject();
    const [errors, setErrors] = useState([]);
    const { user } = useAuth();

    const onSubmit = (e) => {
        e.preventDefault();

        let rules = [  { required: true },
            { minLength: 2 },
            { maxLength: 50 },
            { isEmpty: false }];

        const validator = new FormValidator('projects');
        validator.validateField("p_name", e.target.p_name.value, rules);
        validator.validateField("p_key", e.target.p_key.value, rules);
        validator.validateField("p_desc", e.target.p_desc.value, rules);
        validator.validateField("p_color", e.target.p_color.value, rules);

        const formData = {
            p_name: e.target.p_name.value,
            p_key: e.target.p_key.value,
            p_desc: e.target.p_desc.value,
            p_color: e.target.p_color.value,
            id_user: user.id_user,
        };

        if(Object.keys(validator.getErrors()).length > 0) {
            setErrors(validator.getErrors());
            return;
        }

        addProject(formData);
    }
    return (
         <div>
                <div className='w-full'> 
                    <Breadcrumbs items={whereIam} />
                    <div className='flex flex-col w-fit mt-3 border border-gray-300 gap-3 bg-white rounded-lg shadow-md'>
                        <div className='table-header rounded m-0'>
                            Dodawanie nowego projektu
                        </div>
                        <form onSubmit={onSubmit} className='p-5 rounded-lg shadow-md'>
                            <_Form errors={errors} isEdit={true} />
                        </form>
                    </div>
                </div>
            </div>
    )
 
}

export default Create;