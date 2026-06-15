import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
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
                                <tr key={element.id}>
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