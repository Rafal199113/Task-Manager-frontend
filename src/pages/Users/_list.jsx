import React, { useEffect } from 'react';
import { useAuth } from '../../providers/AuthProvider'
import Avatar from '../../components/dashboard/Avatar'
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Buttons from '../../components/users/Buttons';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { useNavigate } from "react-router-dom";
import Loader from '../../components/shared/Loader';
import { can } from '@/auth/auth';

function _list(props) {
    const navigate = useNavigate();
    const onEdit = (id) => {
        navigate(`/users/edit/${id}`);
    }

        return (
            <div>
                <div className='w-full'>
                    <div className='table-header'>{props.header} ({props.users.length})</div>
                    <table className="table-default">
                        <thead>
                            <tr className='w-full'>
                                {can('users.edit') && (
                                    <th className='table-col' style={{ width: '40px' }}></th>
                                )}
                                <th className='table-col' style={{ width: '40px' }}>Lp.</th>
                                <th className='table-col'>Imie</th>
                                <th className='table-col'>Nazwisko</th>
                                <th className='table-col'>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.users.map((element, index) => (
                                <tr key={element.id} key={index}>
                                    {can('users.edit') && (
                                         <td className='table-col p-1'><button onClick={() => onEdit(element.id_user)} ><FontAwesomeIcon icon={faPenToSquare} /></button></td>
                                    )}
                                    <td className='table-col'>{++index}</td>
                                    <td className='table-col'>{element.name}</td>
                                    <td className='table-col'>{element.surname}</td>
                                    <td className='table-col'>{element.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

export default _list;