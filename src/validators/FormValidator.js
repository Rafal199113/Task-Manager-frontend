
class FormValidator {
    constructor() {
        this.errors = {};
    }

    validateField(fieldName, text, rules) {
        rules.forEach(rule => {
            const [key, value] = Object.entries(rule)[0];

            switch (key) {
                case "required":
                    this.errors[fieldName] ??= [];
                    if (!text || text.trim() === "") {
                        this.errors[fieldName].push(`Pole "${fieldName}" jest wymagane.`);
                    }
                break;
                case "minLength":
                    this.errors[fieldName] ??= [];  

                    if (text.length < value) {
                        this.errors[fieldName].push(`Pole "${fieldName}" musi mieć co najmniej ${value} znaków.`);
                    }
                break;
                case "maxLength":
                    this.errors[fieldName] ??= [];
                
                    if (text.length > value) {
                        this.errors[fieldName].push(`Pole "${fieldName}" może mieć maksymalnie ${value} znaków.`);
                    }
                break;
                case "isEmail":
                    this.errors[fieldName] ??= [];
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(text)) {
                        this.errors[fieldName].push(`Pole "${fieldName}" musi być poprawnym adresem email.`);
                    }
                break;
            }
        });
    
           
    }

    getErrors() {
        const errors = Object.fromEntries(
            Object.entries(this.errors).filter(
                ([key, value]) => value && value.length > 0
            )
        );
        return errors;
    }

    checkPasswords(password, confirmPassword) {
        this.errors['password'] ??= [];
        if (password !== confirmPassword) {
            this.errors['password'].push("Hasła muszą być takie same.");
        }
    }


}

export default FormValidator;