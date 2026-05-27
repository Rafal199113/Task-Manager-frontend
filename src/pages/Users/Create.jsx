import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider'
import Avatar from '../../components/dashboard/Avatar'
import { useTranslation } from 'react-i18next';
import { useAddUser, useUsers } from '../../hooks/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Buttons from '../../components/users/Buttons';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import Required from '../../components/shared/Required';
import FormValidator from '../../validators/FormValidator';
import Errors from '../../components/shared/Errors';
import _Form from './_Form';

function Create() {
    const whereIam = [{"Dashboard" : null}, {"Użytkownicy": "/users"}, {"Nowy użytkownik":null}]
    const { mutate: addUser } = useAddUser();
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();

        let rules = [  { required: true },
            { minLength: 2 },
            { maxLength: 50 },
            { isEmpty: false }];

        const validator = new FormValidator();
        validator.validateField("name", e.target.name.value, rules);
        validator.validateField("surname", e.target.surname.value, rules);
        validator.validateField("email", e.target.email.value, rules);
        validator.validateField("password", e.target.password.value, rules);
        validator.validateField("confirmPassword", e.target.confirmPassword.value, rules);

        validator.checkPasswords(e.target.password.value, e.target.confirmPassword.value);


        const formData = {
            name: e.target.name.value,
            surname: e.target.surname.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        if(Object.keys(validator.getErrors()).length > 0) {
            setErrors(validator.getErrors());
            return;
        }
        addUser(formData);
    }
    return (
         <div>
                <div className='w-full'> 
                    <Breadcrumbs items={whereIam} />
                    <div className='flex flex-col w-fit mt-3 border border-gray-300 gap-3 bg-white rounded-lg shadow-md'>
                        <div className='table-header rounded m-0'>
                            Dodawanie nowego użytkownika
                        </div>
                        <form onSubmit={onSubmit} className='p-5 rounded-lg shadow-md'>
                            <_Form errors={errors} isEdit={false} />
                        </form>
                    </div>
                </div>
            </div>
    )
 
}

export default Create;