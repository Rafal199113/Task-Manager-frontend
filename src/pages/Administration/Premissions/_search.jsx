import React from 'react';

function Search({ filters, setFilters }) {
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