import { useEffect } from "react";

const GoogleTranslator = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Optional: Hide powered by google after load
    setTimeout(() => {
      const powered = document.querySelector(".goog-logo-link");
      if (powered) powered.style.display = "none";
    }, 2000);

  }, []);

  // professional looking buttons
  const changeLanguage = (lang) => {
    const combo = document.querySelector(".goog-te-combo");
    if (!combo) return;
    combo.value = lang;
    combo.dispatchEvent(new Event("change"));
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className="px-3 py-1 rounded bg-green-500 text-white"
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className="px-3 py-1 rounded bg-green-500 text-white"
      >
        العربية
      </button>
    </div>
  );
};

export default GoogleTranslator;
