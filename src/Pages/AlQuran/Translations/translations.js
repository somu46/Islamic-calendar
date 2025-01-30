import React, { useEffect, useState } from "react";
import { getQuranTranslations } from "../../../apiServices/apiServices.js";
import TranslationSelector from "./TranslationUi.js"
import axios from "axios";

const Translations = () => {
  const [TranslationData, setTranslationData] = useState([]);

  useEffect(() => {
    const FetchTranslation = async () => {
      // In your component
      const source = axios.CancelToken.source();
      // Call the API function
      try {
        const translations = await getQuranTranslations(source.token) || [];
        const allowedLanguages = ["en", "bn", "ar", "hi"];
        
        const filteredTranslations = translations.filter(({ language }) => 
          language && allowedLanguages.includes(language.toLowerCase())
        );
        
        setTranslationData(filteredTranslations);
      } catch (error) {
        if (!axios.isCancel(error)) {
          // Handle non-cancellation errors
        }
      }

      // To cancel the request
      source.cancel("Component unmounted, canceling request");
    };
    FetchTranslation();
  }, []);

  // console.log("TranslationData:  ",TranslationData);
  
  return  <TranslationSelector translations={TranslationData} />;
};

export default Translations;
