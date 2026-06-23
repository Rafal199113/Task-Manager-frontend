import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pl: {
    translation: {
      roles: {
        admin: 'Administrator',
        user: 'Użytkownik',
      },

      permissions: {
        create: "Utwórz",
        edit: "Edytuj",
        view: "Wyświetl",
        update: "Aktualizuj",
        delete: "Usuń"
      },

      projects: {
        p_name: 'Nazwa projektu',
        p_key: 'Klucz projektu',
        p_desc: 'Opis projektu',
        p_color: 'Kolor projektu',
      },

      validation: {
        required: "Pole {{field}} jest wymagane",
        minLength: "Pole {{field}} musi mieć co najmniej {{value}} znaków",
        maxLength: "Pole {{field}} może mieć maksymalnie {{value}} znaków",
        email: "Pole {{field}} musi być poprawnym adresem email",
        passwordMatch: "Hasła muszą być takie same"
      }
    },
  },

  en: {
    translation: {
      roles: {
        admin: 'Administrator',
        user: 'User',
      },

      permissions: {
        create: "Create",
        edit: "Edit",
        view: "View",
        update: "Update"
      },

      projects: {
        p_name: 'Project name',
        p_key: 'Project key',
        p_desc: 'Description',
        p_color: 'Project color',
      },

      validation: {
        required: "Field {{field}} is required",
        minLength: "Field {{field}} must have at least {{value}} characters",
        maxLength: "Field {{field}} can have max {{value}} characters",
        email: "Field {{field}} must be a valid email",
        passwordMatch: "Passwords must match"
      }
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;