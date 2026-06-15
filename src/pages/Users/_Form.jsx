import Required from '../../components/shared/Required';
import Errors from '../../components/shared/Errors';
import { can } from '@/auth/auth';

function _Form(props) {
    return (
        <div className="flex flex-col gap-3 w-full max-w-md">
            <div className="flex items-center gap-3">
                <label className="w-32 text-gray-600">Imię: <Required /></label>
                <input type="text"  name='name' defaultValue={props.user?.name} className={`form-control flex-1 ${props.errors['name'] && props.errors['name'].length > 0 ? 'border-red-500' : 'border-gray-800'}`} />
            </div>
                <Errors name={props.errors['name']} /> 
            <div className="flex items-center gap-3">
            <label className="w-32 text-gray-600">Nazwisko: <Required /></label>
            <input type="text" name='surname' defaultValue={props.user?.surname} className={`form-control flex-1 ${props.errors['surname'] && props.errors['surname'].length > 0 ? 'border-red-500' : ''}`} />
            </div>
                <Errors name={props.errors['surname']} />
            <div className="flex items-center gap-3">
            <label className="w-32 text-gray-600">Email: <Required /> </label>
            <input type="email" name='email' defaultValue={props.user?.email} className={`form-control flex-1 ${props.errors['email'] && props.errors['email'].length > 0 ? 'border-red-500' : ''}`} />
            </div>
                <Errors name={props.errors['email']} />
            <div className="flex items-center gap-3">
            <label className="w-32 text-gray-600">Hasło: <Required /></label>
            <input type="password" name='password' className={`form-control flex-1 ${props.errors['password'] && props.errors['password'].length > 0 ? 'border-red-500' : ''}`} />
            </div>
                <Errors name={props.errors['password']} />
            <div className="flex items-center gap-3">
            <label className="w-32 text-gray-600">Powtórz hasło: <Required /></label>
            <input type="password" name='confirmPassword' className={`form-control flex-1 ${props.errors['confirmPassword'] && props.errors['confirmPassword'].length > 0 ? 'border-red-500' : ''}`} />
            </div>
                <Errors name={props.errors['confirmPassword']} />
            <div className="flex justify-start">
                 {can('users.update') && (
                    <button type="submit" className="text-white bg-gray-800 w-20 text-center hover:bg-gray-600 py-1 rounded">
                        {props.isEdit ? "Zapisz" : "Dodaj"}
                    </button>
                )}
            </div>
                    

        </div>
     
  );
}

export default _Form;