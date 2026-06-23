import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEditUser, useUpdateUser } from "../../hooks/users";
import { useRoles } from "hooks/roles";
import Loader from "../../components/shared/Loader";
import FormValidator from "../../validators/FormValidator";
import _Form from "./_Form";
import Breadcrumbs from "../../components/shared/Breadcrumbs";

function Edit() {
    const whereIam = [{ "Dashboard": null }, { "Użytkownicy": "/users" }, { "Edytuj użytkownika": null }]
    const { id } = useParams();
    const { data: roles, isLoading: isRoleLoading } = useRoles();
    const { data: editedUser, isLoading: isUserLoading } = useEditUser(id);
    const [selectedRole, setSelectedRole] = useState(null);

    const {
        mutate: updateUser,
        isPending: isUpdating,
    } = useUpdateUser();

    const [errors, setErrors] = useState([]);

    const isPageLoading = isUserLoading || isRoleLoading || isUpdating;

    useEffect(() => {
        if (editedUser?.data?.roles?.length) {
            setSelectedRole(editedUser.data.roles[0].id);
        }
    }, [editedUser]);

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
        validator.validateField("surname", e.target.surname.value, rules);
        validator.validateField("email", e.target.email.value, rules);

        if (e.target.password.value) {
            validator.checkPasswords(
                e.target.password.value,
                e.target.confirmPassword.value
            );
        }

        if (validator.getErrors().length > 0) {
            setErrors(validator.getErrors());
            return;
        }

        const formData = {
            name: e.target.name.value,
            surname: e.target.surname.value,
            email: e.target.email.value,
            password: e.target.password.value,
            roles: selectedRole
        };

        updateUser({
            id,
            userData: formData,
        });
    };

    if (isPageLoading) { return <Loader /> } else {
        return (
            <div className='w-full'>
                <Breadcrumbs items={whereIam} />
                <div className='flex flex-col  mt-3 border border-gray-300 gap-3 bg-white rounded-lg shadow-md'>
                    <div className='table-header rounded m-0'>
                        Edycja nowego użytkownika
                    </div>
                    <div className="p-2">
                        <form onSubmit={onSubmit}>
                            <_Form errors={errors} user={editedUser?.data} isEdit />
                        </form>
                    </div>
                </div>

                <div className='flex flex-col mt-3 border border-gray-300 gap-3 bg-white rounded-lg shadow-md'>
                    <div className='table-header rounded m-0'>
                        Role ({roles?.data.length})
                    </div>
                    <div className="p-2 space-y-2">
                        {roles?.data?.map((rolee, index) => (
                    <label key={index} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="role"
                            checked={selectedRole === rolee.id}
                            onChange={() => setSelectedRole(rolee.id)}
                            value={rolee.id}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                            {rolee.label}
                        </span>
                    </label>
))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;