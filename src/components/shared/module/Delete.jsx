import { useAuth } from '@/providers/AuthProvider';
import { useDelete } from "../../../hooks/api";

function Delete(props) {
    const { can } = useAuth();
    const {mutate: deleteElement, isPending: isDeleted} = useDelete();
    const onDelete = (id) => {
        if (window.confirm(props.confirm_text)) {
            deleteElement({
            id: props.id_element,
            url: props.url,
            navigateTo: props.navigateTo,
            element: props.element,
            returnElement: props.returnElement
            });
        }
    }
    return (
        <div className='w-full'>
            <div className='flex flex-col  mt-3 border border-gray-300 gap-3 bg-white rounded-lg shadow-md'>
                <div className='table-header rounded m-0'>
                    Usuń {props.element}
                </div>
                <div className="p-2">
                    {can(props.permission) && (
                        <button type="submit" onClick={() => { onDelete() }} className="text-white bg-red-600 w-20 text-center hover:bg-gray-600 py-1 rounded">
                            Usuń
                        </button>
                    )}
                </div>
            </div>
        </div>
    )

}

export default Delete;