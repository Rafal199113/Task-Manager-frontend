import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/providers/AuthProvider';
import { useStoreSettings, useUserSettings } from '../../hooks/settings';
import Loader from '../../components/shared/Loader';

function _list(props) {
    const { user } = useAuth();
    const { mutate: store } = useStoreSettings();
    const { data: settings, isLoading } = useUserSettings(user.id_user);
    const navigate = useNavigate();
       
    const onSave = (settings) => {
         settings.preventDefault();

   

    const formData = new FormData(settings.currentTarget);
    const data = Object.fromEntries(formData.entries());

       store(data);
    }

     if (isLoading) { return <Loader /> } else if (settings) {
console.log(settings.data.find(item => item.id_user === 1).setting_short_name);
    return (
        <div className="w-full">
            <div className="flex w-full">
                <div className="w-full mt-3 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">

                    <div className="table-header px-5 py-3 text-lg font-semibold">
                        Ustawienia
                    </div>

                    <form onSubmit={onSave} className="p-6">

                        <div className="space-y-4">
                            {props.positions.map((element, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 items-center gap-2 md:grid-cols-3"
                                >
                                
                                    <input type="hidden" name="id_setting_position" value={element.id_settings_positions}></input>
                                    <label className="font-medium text-gray-600 md:col-span-1">
                                        {element.settings_positions_key}:
                                    </label>

                                    <div className="md:col-span-2">
                                        <input
                                            type="text"
                                            name="setting_value"
                                            defaultValue={
                                                settings?.data?.find(
                                                    item => item.id_setting_position === element.id_settings_positions
                                                )?.setting_value ?? ''
                                            }
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm
                                               focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end border-t border-gray-200 pt-4">
                          
                                <button
                                    type="submit"
                                    className="rounded-md bg-gray-800 px-5 py-2 text-sm font-medium text-white
                                       shadow-sm transition hover:bg-gray-600"
                                >
                                    Zapisz
                                </button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
}
export default _list;