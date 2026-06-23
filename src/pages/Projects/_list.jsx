import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/providers/AuthProvider';

function _list(props) {
    const { can } = useAuth();
    const navigate = useNavigate();
    const onEdit = (id) => {
        navigate(`/projects/edit/${id}`);
    }
        return (
            <div>
                <div className='w-full'>
                    <div className='table-header'>{props.header} ({props.projects.length})</div>
                    <table className="table-default">
                        <thead>
                            <tr className='w-full'>
                                {can('projects.edit') && (
                                    <th className='table-col' style={{ width: '40px' }}></th>
                                )}
                                <th className='table-col' style={{ width: '40px' }}>Lp.</th>
                                <th className='table-col'>Nazwa</th>
                                <th className='table-col'>Właściciel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.projects.map((element, index) => (
                                <tr key={element.id}>
                                    {can('projects.edit') && (
                                         <td className='table-col p-1'><button onClick={() => onEdit(element.id_project)} ><FontAwesomeIcon icon={faPenToSquare} /></button></td>
                                    )}
                                    <td className='table-col'>{++index}</td>
                                    <td className='table-col'>{element.p_name}</td>
                                    <td className='table-col'>{element.user.name + "." + element.user.surname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

export default _list;