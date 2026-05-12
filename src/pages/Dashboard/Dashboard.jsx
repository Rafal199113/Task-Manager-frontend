import React from 'react';
import { useAuth } from '../../providers/AuthProvider'
import Avatar from '../../components/dashboard/Avatar'
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const {logoutUser} =  useAuth();
  const { user, role } = useAuth(); 
  const { t } = useTranslation()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
        logoutUser();
    }

  return (
  <>
   <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3 py-4">
        <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center">
          <div>
              {user?.name?.charAt(0)}
              {user?.surname?.charAt(0)}
          </div>
        </div>

        <div className='col'>
          <strong>
            {user?.name} {user?.surname} 
          </strong>
          <div>
            {t(`roles.${role[0]?.name}`)}
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-4 px-6 rounded-md hover:bg-blue-600"
      >
        Wyloguj się
      </button>
    </div>
  </>
);
}

export default Dashboard;