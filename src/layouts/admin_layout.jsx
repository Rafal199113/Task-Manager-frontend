import { Outlet } from "react-router-dom";
import Tab from 'pages/administration/_tab';

function AdminLayout() {
    return (
        <div>
            <Tab />
            <Outlet />
        </div>
    );
}

export default AdminLayout;