import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/languageSelector.css";

function LanguageSelector({ compact = false }) {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className={`language-selector ${compact ? "compact" : ""}`}>
      <Languages size={18} />

      <select value={language} onChange={handleChange}>
        <option value="en">English</option>
        <option value="te">తెలుగు</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  );
}

export default LanguageSelector;