import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import vn from '../locales/vn.json';

i18n
    .use(LanguageDetector) // t? ??ng detect ng�n ng? tr�nh duy?t
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            vn: { translation: vn },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // react ?� x? l� XSS
        },
    });

export default i18n;
