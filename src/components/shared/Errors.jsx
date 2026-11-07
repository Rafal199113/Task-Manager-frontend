function Errors(props) {
   
    if(!props.name || props.name.length === 0) return null;
    
    return (
    <div className="flex items-start gap-3 w-2/6 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700">
        <span className="mt-0.5 text-red-500">
            ⚠️
        </span>

        <ul className="space-y-1 text-sm list-disc pl-4">
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