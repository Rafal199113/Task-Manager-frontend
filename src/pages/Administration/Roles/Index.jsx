import React, { useEffect, useState } from 'react';
import Breadcrumbs from 'components/shared/Breadcrumbs';
import Loader from 'components/shared/Loader';
import { useRoles } from "../../../hooks/roles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function Roles() {
    const whereIam = [{ "Dashboard": null }, { "Uprawnienia": null }, { "Role": null }]
    const { data: roles, isLoading: isRoleLoading } = useRoles();
    const navigate = useNavigate();
    const onEdit = (id) => {
        navigate(`edit/${id}`);
    }
    if (isRoleLoading) { return <Loader /> } else if (roles) {
        return (
            <div>
                <div className='w-full'>
                    <Breadcrumbs items={whereIam} />
                    <div className='table-header'>Lista ról ({roles?.data.length})</div>
                    <table className="table-default">
                        <thead>
                            <tr className='w-full'>
                                <th className='table-col' style={{ width: '40px' }}></th>
                                <th className='table-col' style={{ width: '40px' }}>Lp.</th>
                                <th className='table-col'>Nazwa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles?.data.map((element, index) => (
                                <tr key={element.id}>
                                    <td className='table-col p-1'><button onClick={() => onEdit(element.id)} ><FontAwesomeIcon icon={faPenToSquare} /></button></td>
                                    <td className='table-col'>{++index}</td>
                                    <td className='table-col'>{element.label}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Roles;