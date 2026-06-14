import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pl: {
    translation: {
      roles: {
        admin: 'Administrator',
        user: 'Użytkownik',
      },
      permissions : {
        'create': "Utwórz",
        'edit' : "Edytuj",
        'view' : "Wyświetl", 
        'update' : "Aktualizuj"
      }
    },
  },

  en: {
    translation: {
      roles: {
        admin: 'Administrator',
        user: 'User',
      },

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