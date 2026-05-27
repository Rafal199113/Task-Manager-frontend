import React, { useEffect } from 'react';
import { useAuth } from '../../../providers/AuthProvider'
import Avatar from '../../../components/dashboard/Avatar'
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../../hooks/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Buttons from '../../../components/users/Buttons';
import Breadcrumbs from '../../../components/shared/Breadcrumbs';
import { useNavigate } from "react-router-dom";
import Loader from '../../../components/shared/Loader';
import Required from 'components/shared/Required';
import Errors from 'components/shared/Errors';

function Search({ filters, setFilters }) {
    const whereIam = [{"Dashboard" : null}, {"Użytkownicy": null}, {"Lista":null}]
    const {data:users, isLoading} = useUsers();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setFilters({
            ...filters, [e.target.name]: e.target.value
        })
    }
 
    return (
        <div className='flex flex-col searcher p-0'>
            <div className='table-header m-0'>Wyszukiwarka</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-3">
            <div className="flex flex-row gap-1 items-center">
                <label className="text-gray-600">Imię:</label>
                <input type="text" name="name" className="form-control w-full"  value={filters.name}
                    onChange={handleSearch}/>
            </div>

            <div className="flex flex-row gap-1 items-center">
                <label className="text-gray-600">Nazwisko:</label>
                <input type="text" name="surname" className="form-control w-full"   value={filters.surname}
                    onChange={handleSearch}/>
            </div>

            <div className="flex flex-row gap-1 items-center">
                <label className="text-gray-600">Email:</label>
                <input type="email" name="email" className="form-control w-full"  value={filters.email}
                    onChange={handleSearch}/>
            </div>
        </div>
        </div>
        );
 
}

export default Search;