import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "components/shared/Loader";
import Breadcrumbs from "components/shared/Breadcrumbs";
import { useRole, useUpdateRole } from "hooks/roles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Required from "components/shared/Required";
import Errors from "components/shared/Errors";
import FormValidator from "validators/FormValidator";
import UsersList from "pages/users/_list";
import { useTranslation } from "react-i18next";

function RoleEdit() {
    const { id } = useParams();
    const { data: role, isLoading: isRoleLoading } = useRole(id);
    const [errors, setErrors] = useState([]);
    const [modulesPermissions, setModulesPermissions] = useState({});
    const { t } = useTranslation();

    const { mutate: updateRole, isPending: isUpdating } = useUpdateRole();

    const updatePermissions = (permissionId, isChecked, moduleCode) => {
        setModulesPermissions(prev => {
            const current = prev[moduleCode] || [];

            return {
                ...prev,
                [moduleCode]: isChecked
                    ? [...current, permissionId]
                    : current.filter(id => id !== permissionId)
            };
        });
    };

    useEffect(() => {
        if (!role?.data?.permissions) return;

        const grouped = {};

        role.data?.roles?.permissions?.forEach(permission => {
            const moduleCode = permission.name.split(".")[0];

            if (!grouped[moduleCode]) {
                grouped[moduleCode] = [];
            }

            grouped[moduleCode].push(permission.id);
        });

        setModulesPermissions(grouped);
        console.log(modulesPermissions)
    }, [role]);

    useEffect(() => {
        console.log('modulesPermissions:', modulesPermissions);
    }, [modulesPermissions]);

    const onSubmit = e => {
        e.preventDefault();
        const rules = [
            { required: true },
            { minLength: 2 },
            { maxLength: 50 },
            { isEmpty: false }
        ];
        const validator = new FormValidator();
        validator.validateField("name", e.target.name.value, rules);
        if (Object.values(validator.getErrors()).flat().length > 0) {
            setErrors(validator.getErrors());
            return;
        }
        const formData = {
            label: e.target.name.value,
            permissions: modulesPermissions

        };
        updateRole({
            id,
            roleData: formData
        });
       
    };

    if (isRoleLoading || isUpdating)
        return <Loader />;

    const whereIam = [
        { Dashboard: null },
        { Administracja: null },
        { Role: "/admin/roles" },
        { Edycja: null },
        { [role?.data?.roles?.label]: null }
    ];

    return (
        <div className="w-full">
            <Breadcrumbs items={whereIam} />
            <div className="flex flex-col mt-3 border border-gray-300 gap-3 bg-white rounded-lg shadow-md">
                <div className="table-header m-0">Rola: {role?.data?.roles?.label}</div>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-3 m-3">
                        <label className="w-32 text-gray-600">
                            Nazwa: <Required />
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={role?.data?.roles?.label}
                            className={`form-control flex-1 ${errors["name"] && errors["name"].length > 0 ? "border-red-500" : "border-gray-800"}`}
                        />
                        <Errors name={errors["name"]} />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-gray-800 w-20 text-center hover:bg-gray-600 py-1 m-3 rounded"
                    >
                        Zapisz
                    </button>
                </form>
            </div>

            {role?.data?.roles?.users?.length > 0 && (
                <UsersList users={role?.data.roles.users} header={"Przypisani użytkownicy"} />
            )}

            <div className="w-full">
                <div className="table-header">Moduły({role?.data?.modules?.length})</div>
                <table className="table-default">
                    <thead>
                        <tr className="w-full">
                            <th className="table-col" style={{ width: "40px" }}>Lp.</th>
                            <th className="table-col">Nazwa</th>
                            <th className="table-col">Dostęp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {role?.data?.modules?.map((module, index) => (
                            <tr key={module.id_module}>
                                <td className="table-col">{index + 1}</td>
                                <td className="table-col">{module.m_name}</td>
                                <td className="table-col">
                                    {role?.data
                                        ?.permissions?.filter(
                                            permission =>
                                                permission.name.split(".")[0] === module.m_code
                                        )
                                        .map(permission => (
                                            <label
                                                key={permission.id}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        modulesPermissions[module.m_code]?.includes(
                                                            permission.id
                                                        ) || false
                                                    }
                                                    onChange={e =>
                                                        updatePermissions(
                                                            permission.id,
                                                            e.target.checked,
                                                            module.m_code
                                                        )
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300"
                                                />

                                                <span className="text-sm text-gray-700">
                                                    {t(
                                                        "permissions." +
                                                            permission.name.split(".")[1]
                                                    )}
                                                </span>
                                            </label>
                                        ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RoleEdit;