function Errors(props) {
   
    if(!props.name || props.name.length === 0) return null;
    
    return (
        <div className="bg-red-600 p-3 rounded">
            <ul className="space-y-1 ml-3  text-sm text-white list-disc">
                {props.name?.map((error, index) => (
                    <li key={index}>
                        {error}
                </li>
                ))}
            </ul> 
        </div>      
  );
}

export default Errors;