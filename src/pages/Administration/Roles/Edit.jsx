import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "components/shared/Loader";
import Breadcrumbs from "components/shared/Breadcrumbs";
import { useRole, useUpdateRole } from "hooks/roles.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Required from 'components/shared/Required';
import Errors from 'components/shared/Errors';
import FormValidator from "validators/FormValidator";
import UsersList from 'pages/users/_list'

function RoleEdit() {
    const { id } = useParams();
    const { data: role, isLoading: isRoleLoading } = useRole(id);
    const [errors, setErrors] = useState([]);

    const {
        mutate: updateRole,
        isPending: isUpdating,
    } = useUpdateRole();

    const onSubmit = (e) => {
        e.preventDefault();

        const rules = [
            { required: true },
            { minLength: 2 },
            { maxLength: 50 },
            { isEmpty: false },
        ];

        const validator = new FormValidator();

        validator.validateField("name", e.target.name.value, rules);


        if (Object.values(validator.getErrors()).flat().length > 0) {
            setErrors(validator.getErrors());
            return;
        }

        const formData = {
            label: e.target.name.value,
        };

        updateRole({
            id,
            roleData: formData,
        });
    }

    if (isRoleLoading && isUpdating) return <Loader />;
    const whereIam = [{ "Dashboard": null }, { "Administracja": null }, { "Role": '/administration/roles' }, { "Edycja": null }, { [role?.data?.label]: null }]
    return (
        <div className='w-full'>
            <Breadcrumbs items={whereIam} />
            <div className='w-full'>
                <div className='flex flex-col  mt-3 border border-gray-300 gap-3 bg-white rounded-lg shadow-md'>
                    <div className='table-header m-0'>Rola: {role?.data?.label} </div>
                    <form onSubmit={onSubmit}>
                        <div className="flex flex-col  gap-3 m-3">
                            <label className="w-32 text-gray-600">Nazwa: <Required /></label>
                            <input type="text" name='name' defaultValue={role?.data?.label} className={`form-control flex-1 ${errors['name'] && errors['name'].length > 0 ? 'border-red-500' : 'border-gray-800'}`} />
                            <Errors name={errors['name']} />
                        </div>
                        <button type="submit" className="text-white bg-gray-800 w-20 text-center hover:bg-gray-600 py-1 m-3 rounded">
                            Zapisz
                        </button>
                    </form>
                </div>
                {role?.data?.users?.length > 0 && (
                    <UsersList users={role?.data.users} header={"Przypisani użytkownicy"}/>
                )}
            </div>
        </div>
    );
}

export default RoleEdit;