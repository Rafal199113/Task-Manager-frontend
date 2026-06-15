import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

function Buttons() {
    const navigate = useNavigate();
     const handleSubmit = async (e) => {
      e.preventDefault();
          navigate('/users/create');
      }
    return (
        <div className="flex place-content-end gap-x-3 hover:point cursor-pointer mb-3 mt-3" onClick={handleSubmit}>
           <FontAwesomeIcon size="2x"  icon={faPlusCircle} />
        </div>
    );
}

export default Buttons;