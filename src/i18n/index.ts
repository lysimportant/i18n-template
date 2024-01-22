"use client"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Language from "i18next-browser-languagedetector"
import Zh from "./zh.json"
import En from "./en.json"
import Be from "./ru.json"
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
let i: typeof i18n | null = null
function Initi18n(lng = "zh") {
  // let language = localStorage.getItem("i18nextLng") ?? lng
  i18n
  .use(Language)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources:  {
      en: {
        translation: En
      },
      zh: {
        translation: Zh
      },
      ru: {
        translation: Be
      }
    },
    lng: lng, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
  return i18n
}
!i && (i = Initi18n())

export default i;