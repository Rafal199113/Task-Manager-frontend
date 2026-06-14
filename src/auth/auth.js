import { useAuth } from '@/providers/AuthProvider';

export const can = (permission) => {
    const { permissions } = useAuth();

    if (permissions) {
        let [key, value] = permission.split('.');

        let exists = Object.hasOwn(permissions, key);
        const modulePermissions = permissions?.[key];
        if (exists) {
            console.log(key, value)
            switch (value) {
                case 'edit':
                    if (modulePermissions?.['edit']) {
                        return true;
                    }
                    break;
                case 'update':
                    if (modulePermissions?.['update']) {
                        return true;
                    }

                    break;
                case 'create':
                    if (modulePermissions?.['create']) {
                        return true;
                    }

                    break;
                default:
                    break;
            }
        }
    }
    return false;
};

