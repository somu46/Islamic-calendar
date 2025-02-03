import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import { FaArrowLeft } from 'react-icons/fa';
// import Quran from '../WholeQuran';


const TranslationSelector = ({ translations }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const navigate = useNavigate();

 const handleNavigate = (selectedidentifier) => {
  setSelectedTranslation(selectedidentifier);
  // console.log("selectedidentifier: ",selectedidentifier);
  const identifier=translations.find(t => t.identifier === selectedidentifier)?.identifier;
  // console.log("identifier: ",identifier);
  navigate(`/essentials/quran/translations/${identifier}`);

  
 
  };

  const allowedLanguages = {
    en: "English",
    bn: "বাংলা",
    ar: "عربي",
    hi: "हिन्दी"
  };
  // Group translations by language
  const languages = Array.from(new Set(translations.map(t => t.language)));
  const filtered = translations.filter(t => t.language === selectedLanguage);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
    <div className="max-w-4xl mx-auto p-4">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  className="flex justify-between items-center w-full mb-6"
>
  <Breadcrumb pageName='Translations'/>
  <button
    onClick={goBack}
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-emerald-200/50"
  >
    <FaArrowLeft className="text-lg" />
    Go Back
  </button>
</motion.div>
  <h1 className="text-2xl font-bold mb-6 text-[#2a5f3e]">
    Quran Translations
  </h1>

  {/* Language Tabs */}
  <div className="flex gap-2 mb-6 overflow-x-auto">
    {languages.map(lang => (
      <button
        key={lang}
        onClick={() => setSelectedLanguage(lang)}
        className={`px-4 py-2 rounded-md font-medium text-sm transition-colors
          ${
            selectedLanguage === lang 
              ? 'bg-[#2a5f3e] text-white shadow-sm'
              : 'bg-[#e9f0e5] text-[#2a5f3e] hover:bg-[#d4e0cd]'
          }`}
      >
        {allowedLanguages[lang]}
      </button>
    ))}
  </div>

  {/* Translation Cards Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {filtered.map(translation => (
      <div
        key={translation.identifier}
        onClick={() => handleNavigate(translation.identifier)}
        className={`p-4 rounded-lg border cursor-pointer transition-all
          ${
            selectedTranslation === translation.identifier
              ? 'border-[#2a5f3e] bg-[#f5f8f3] shadow-sm'
              : 'border-[#dde7d5] hover:border-[#b8ccad] bg-white'
          }`}
        style={{ direction: translation.direction }}
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg text-[#2a5f3e]">
            {translation.name}
          </h3>
          <p className="text-sm text-[#4a725c]">
            {translation.englishName}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs px-2 py-1 rounded-full bg-[#e9f0e5] text-[#2a5f3e]">
              {translation.format}
            </span>
            <span className="text-xs text-[#6b8979]">
              {allowedLanguages[translation.language]}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </>
  );
};

export default TranslationSelector;