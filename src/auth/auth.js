
export const can = (permissions, permission) => {
    if (permissions) {
        let [key, value] = permission.split('.');
console.log(permissions)
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

