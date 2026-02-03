// i18next main library
import i18n from "i18next";

// react binding
import { initReactI18next } from "react-i18next";

// browser language detect করবে
import LanguageDetector from "i18next-browser-languagedetector";

// language files import
import en from "./locales/en.json";
import ar from "./locales/ar.json";

// init function
i18n
  .use(LanguageDetector) // user er browser language detect
  .use(initReactI18next) // react connect
  .init({
    fallbackLng: "en", // default language English
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    }
  });

// Arabic হলে RTL layout হবে
i18n.on("languageChanged", (lang) => {
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
});

export default i18n;
