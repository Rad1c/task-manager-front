import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locale/en.json";
import translationBS from "./locale/bs.json";

const resources = {
  en: {
    translation: translationEN,
  },
  bs: {
    translation: translationBS,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lng") || "en",
  fallbackLng: "en",
  useSuspense: false,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
