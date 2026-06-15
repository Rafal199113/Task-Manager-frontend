import React from 'react';
import Breadcrumbs from 'components/shared/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function Permissions() {
    const whereIam = [{ "Dashboard": null }, { "Uprawnienia": null }, { "Dostępy": null }]
    const navigate = useNavigate();
    const onEdit = (id) => {
        navigate(`edit/${id}`);
    }
    
    return (
            <div>
                <div className='w-full'>
                    <Breadcrumbs items={whereIam} />
                    <div className='table-header'>Moduły({modules?.data?.length})</div>
                    <table className="table-default">
                        <thead>
                            <tr className='w-full'>
                                <th className='table-col' style={{ width: '40px' }}></th>
                                <th className='table-col' style={{ width: '40px' }}>Lp.</th>
                                <th className='table-col'>Nazwa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modules?.data?.map((element, index) => (
                                <tr key={element.id}>
                                    <td className='table-col p-1'><button onClick={() => onEdit(element.id)} ><FontAwesomeIcon icon={faPenToSquare} /></button></td>
                                    <td className='table-col'>{++index}</td>
                                    <td className='table-col'>{element.m_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );

}
   
        
    



export default Permissions;