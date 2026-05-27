import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Tab() {
    return (
        <div>
            {/* NAV */}
            <div className="flex border-b">
                <NavLink
                    to="/administration/roles"
                    className={({ isActive }) =>
                        `px-4 py-2 ${
                            isActive
                                ? "border-b-2 border-gray-800 text-gray-800"
                                : "text-gray-500"
                        }`
                    }
                >
                    Role
                </NavLink>
            </div>
        </div>
    );
}

export default Tab;