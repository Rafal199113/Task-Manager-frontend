import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
      {items.map((element, index) => {
          const [key, value] = Object.entries(element)[0];
        
        return (
          <React.Fragment key={index}>
            <button className={`${!value ? 'pointer' : 'cursor-pointer'}`}   onClick={() => value && navigate(value)}><span >{key}</span></button>

            {index < items.length - 1 && (
              <span>/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}