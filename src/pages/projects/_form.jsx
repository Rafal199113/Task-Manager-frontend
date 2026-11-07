import Required from '../../components/shared/Required';
import { useState, useEffect } from 'react';
import Errors from '../../components/shared/Errors';
import { useAuth } from '@/providers/AuthProvider';
import { Slider, Sketch, Material, Colorful, Compact, Circle, Swatch, Wheel, Block, Github, Chrome } from '@uiw/react-color';

function _Form(props) {
    const { can } = useAuth();
    const [hex, setHex] = useState("#fff");

    useEffect(()=>{
        setHex(props.project?.p_color)
    })

    return (
        <div className="flex flex-col gap-3 w-full">
            <input type="hidden" name="p_color" value={hex} />
            <div className="flex items-center gap-3 w-3/6 ">
                <label className="w-64 text-gray-600">Nazwa: <Required /></label>
                <input type="text"  name='p_name' defaultValue={props.project?.p_name} className={`form-control flex-1 w-80 ${props.errors['p_name'] && props.errors['p_name'].length > 0 ? 'border-red-500' : ''}`} />
            </div>
                <Errors name={props.errors['p_name']} /> 
            <div className="flex items-center gap-3 w-3/6">
            <label className="w-64 text-gray-600">Klucz projektu: <Required /></label>
            <input type="text" name='p_key' defaultValue={props.project?.p_key} className={`form-control flex-1 ${props.errors['p_key'] && props.errors['p_key'].length > 0 ? 'border-red-500' : ''}`} />
            </div>
                <Errors name={props.errors['p_key']} />
            <div className="flex items-center gap-3 w-3/6">
            <label className="w-64 text-gray-600">Opis: <Required /> </label>
            <textarea rows="5" cols="44" name='p_desc'  className={`form-control flex-1 ${props.errors['p_desc'] && props.errors['p_desc'].length > 0 ? 'border-red-500' : ''}`} >{props.project?.p_description}</textarea>
            </div>
                <Errors name={props.errors['p_desc']} />
            <div className="flex items-center gap-3 w-3/6">
                <label className="w-64 text-gray-600">Kierownik projektu: <Required /> </label>
                <select className={`form-control flex-1 ${props.errors['id_lead'] && props.errors['id_lead'].length > 0 ? 'border-red-500' : ''}`} name="id_lead">
                    {props.users?.data?.map((user) => (
                        <option key={user.id_user} value={user.id_user} selected={props.project?.id_lead === user.id_user}>
                            {user.name + " " + user.surname}
                        </option>
                    ))}
                </select>
            </div>
    

                <Errors name={props.errors['id_lead']} />        
            <div className="flex items-center gap-3 w-3/6">
                <label className="w-64 text-gray-600">Powiąż repozytorium:<Required /> </label>
                <select className={`form-control flex-1 ${props.errors['id_lead'] && props.errors['id_lead'].length > 0 ? 'border-red-500' : ''}`} name="p_repository">
                    <option value=""> ----- </option>
                    {props.repos?.data?.map((repo) => (
                        <option key={repo.id} value={repo.id} selected={Number(props.project?.p_repository) === Number(repo.id)}>
                            {repo.name}
                        </option>
                    ))}
                </select>
            </div>
                <Errors name={props.errors['id_lead']} />
            {props.isEdit && (
                <div className="flex items-center gap-3 w-3/6">
                    <label className="w-64 text-gray-600">Status projektu: <Required /></label>
                    <select className={`form-control flex-1 ${props.errors['id_project_statuses'] && props.errors['id_project_statuses'].length > 0 ? 'border-red-500' : ''}`} name="id_project_statuses">
                        {props.project?.statuses?.map((status) => (
                            <option key={status.id_project_statuses} value={status.id_project_statuses} selected={props.project?.id_project_statuses === status.id_project_statuses}>
                                {status.ps_name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
    
            <div className="flex justify-start">
                 {can('projects.update') && (
                    <button type="submit" className="text-white bg-gray-800 w-20 text-center hover:bg-gray-600 py-1 rounded">
                        {props.isEdit ? "Zapisz" : "Dodaj"}
                    </button>
                )}
            </div>
                    

        </div>
     
  );
}

export default _Form;