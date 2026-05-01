import { useState } from "react";

function Error({ message, onClose }) {
     if (!message) return null;
    return (
        <div className="bg-red-100 border border-red-400 m-3 text-red-700 px-4 py-3 rounded flex justify-between items-center mt-4">
            <span>{message}</span>
            <button onClick={onClose}>✕</button>
        </div>
  );
}

export default Error;