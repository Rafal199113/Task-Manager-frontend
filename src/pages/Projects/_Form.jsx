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
        <div className="flex flex-col gap-3 w-full max-w-md">
            <input type="hidden" name="p_color" value={hex} />
            <div className="flex items-center gap-3">
                <label className="w-32 text-gray-600">Nazwa: <Required /></label>
                <input type="text"  name='p_name' defaultValue={props.project?.p_name} className={`form-control flex-1 ${props.errors['p_name'] && props.errors['p_name'].length > 0 ? 'border-red-500' : 'border-gray-800'}`} />
            </div>
                <Errors name={props.errors['p_name']} /> 
            <div className="flex items-center gap-3">
            <label className="w-32 text-gray-600">Klucz projektu: <Required /></label>
            <input type="text" name='p_key' defaultValue={props.project?.p_key} className={`form-control flex-1 ${props.errors['p_key'] && props.errors['p_key'].length > 0 ? 'border-red-500' : ''}`} />
            </div>
                <Errors name={props.errors['p_key']} />
            <div className="flex items-center gap-3">
            <label className="w-32 text-gray-600">Opis: <Required /> </label>
            <textarea rows="5" cols="44" name='p_desc'  className={`form-control flex-1 ${props.errors['p_desc'] && props.errors['p_desc'].length > 0 ? 'border-red-500' : ''}`} >{props.project?.p_desc}</textarea>
            </div>
                <Errors name={props.errors['p_desc']} />
            <div className="flex items-center gap-3">
            <label className="w-32 text-gray-600">Kolor: <Required /></label>
                <Sketch
                    style={{ marginLeft: 50, minWidth:100 }}
                    color={hex}
                    onChange={(color) => {
                        setHex(color.hex);
                    }}
                    />
            </div>
                <Errors name={props.errors['p_color']} />
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