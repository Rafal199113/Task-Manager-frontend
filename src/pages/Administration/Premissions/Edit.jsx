import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "components/shared/Loader";
import FormValidator from "validators/FormValidator";
import Breadcrumbs from "components/shared/Breadcrumbs";
import { useEditUser, useUpdateUser, useUsers, useUpdateModulesPermissions } from "../../../hooks/users";
import { usePermissions } from "../../../hooks/permissions";
import { useModules } from 'hooks/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../../providers/AuthProvider'

function PremissionEdit() {
    const { id } = useParams();
    const { data: modules, isLoading: isModulesLoading } = useModules();
    const { data: permissionsDownloaded, isLoading: isPermissionsLoading } = usePermissions();
    const {
        mutate: updatedUserModules,
        isPending: isUpdating,
    } = useUpdateModulesPermissions();

    const { data: user, isLoading: isUserLoading } = useEditUser(id);
    const [permissions, setPermissions] = useState({});
    const { access } = useAuth();

    const isLoading = isModulesLoading && isUserLoading && isPermissionsLoading;

    

    const sendPermissions = () => {
        updatedUserModules({id, userData: permissions});
    }

    const onChangePremissions = (e, id_module) => {
        setPermissions(prev => ({
            ...prev,
            [id_module]: e.target.value
        }))
    }

    useEffect(() => {
        if (!isModulesLoading && !isUserLoading && modules?.data && user?.data) {

            const prem = access(user.data);

            if (prem.permissions.length === 0) {
                const defaultPermissions = {};

                modules.data.forEach((module) => {
                    defaultPermissions[module.id_module] = 'false';
                });

                setPermissions(defaultPermissions);
            }
        }
    }, [modules, user, isModulesLoading, isUserLoading]);

    if (isLoading) return <Loader />;
    const whereIam = [{ "Dashboard": null }, { "Administracja": null }, { "Uprawnienia": "/administration/permissions/index" }, { [user?.data?.name + ' ' + user?.data?.surname]: null }]
    console.log(permissionsDownloaded)
    return (
        <div className='w-full'>
            <Breadcrumbs items={whereIam} />
            <div className='w-full'>
                <div className='table-header'>Lista modułów</div>
                <table className="table-default">
                    <thead>
                        <tr className='w-full'>
                            <th className='table-col' style={{ width: '40px' }}>Lp.</th>
                            <th className='table-col'>Moduł</th>
                            <th className='table-col'>Dostęp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules?.data?.map((module, index) => (
                            <tr key={module.id}>
                                <td className='table-col'>{++index}</td>
                                <td className='table-col'>{module.m_name}</td>
                                <td className='table-col'>
                                    
                                    <select value={permissions[module.id_module] === 'true' ? 'true' : 'false'} onChange={(e) => onChangePremissions(e, module.id_module)
                                    } class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                      {permissionsDownloaded?.data?.map((permission, index) => (
                                        <option key={index} value={permission.name}>
                                            premi
                                            {permission.name}
                                        </option>
                                    ))}
                                        
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-start mt-3">
                    <button
                        type="button" onClick={() => sendPermissions()}
                        className="text-white bg-gray-800 w-20 text-center hover:bg-gray-600 py-1 rounded"
                    >
                        Zapisz
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PremissionEdit;