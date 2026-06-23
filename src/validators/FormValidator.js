import i18n from "../../i18n"
class FormValidator {
  t = i18n.t.bind(i18n);

  path = "projects";

  constructor() {
    this.errors = {};
  }

  getLabel(fieldName) {
    return this.t(`${this.path}.${fieldName}`, {
      defaultValue: fieldName
    });
  }

  validateField(fieldName, text, rules) {
    rules.forEach(rule => {
      const [key, value] = Object.entries(rule)[0];

      switch (key) {

        case "required":
          this.errors[fieldName] ??= [];

          if (!text || text.trim() === "") {
            this.errors[fieldName].push(
              this.t("validation.required", {
                field: this.getLabel(fieldName)
              })
            );
          }
          break;

        case "minLength":
          this.errors[fieldName] ??= [];

          if (text.length < value) {
            this.errors[fieldName].push(
              this.t("validation.minLength", {
                field: this.getLabel(fieldName),
                value
              })
            );
          }
          break;

        case "maxLength":
          this.errors[fieldName] ??= [];

          if (text.length > value) {
            this.errors[fieldName].push(
              this.t("validation.maxLength", {
                field: this.getLabel(fieldName),
                value
              })
            );
          }
          break;

        case "isEmail":
          this.errors[fieldName] ??= [];

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!emailRegex.test(text)) {
            this.errors[fieldName].push(
              this.t("validation.email", {
                field: this.getLabel(fieldName)
              })
            );
          }
          break;
      }
    });
  }

  checkPasswords(password, confirmPassword) {
    this.errors["password"] ??= [];

    if (password !== confirmPassword) {
      this.errors["password"].push(
        this.t("validation.passwordMatch")
      );
    }
  }

  getErrors() {
    return Object.fromEntries(
      Object.entries(this.errors).filter(
        ([, value]) => value && value.length > 0
      )
    );
  }
}

export default FormValidator;