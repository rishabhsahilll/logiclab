document.getElementById("num_sets").addEventListener("input", (e) => {
    const num = parseInt(e.target.value) || 0;
    const setInputs = document.getElementById("setInputs");
    setInputs.innerHTML = "";
    for (let i = 0; i < num; i++) {
        setInputs.innerHTML += `
            <div class="mb-3">
                <label>Set ${String.fromCharCode(65 + i)} (comma-separated):</label>
                <input type="text" name="set_${i}" class="form-control" placeholder="e.g., 1,2,3" required>
            </div>`;
    }
});

// Google Translate supported languages (partial list for suggestions)
const languages = [
    { code: "af", name: "Afrikaans" }, { code: "sq", name: "Albanian" }, { code: "am", name: "Amharic" },
    { code: "ar", name: "Arabic" }, { code: "hy", name: "Armenian" }, { code: "as", name: "Assamese" },
    { code: "ay", name: "Aymara" }, { code: "az", name: "Azerbaijani" }, { code: "bm", name: "Bambara" },
    { code: "eu", name: "Basque" }, { code: "be", name: "Belarusian" }, { code: "bn", name: "Bengali" },
    { code: "bho", name: "Bhojpuri" }, { code: "bs", name: "Bosnian" }, { code: "bg", name: "Bulgarian" },
    { code: "ca", name: "Catalan" }, { code: "ceb", name: "Cebuano" }, { code: "ny", name: "Chichewa" },
    { code: "zh-CN", name: "Chinese (Simplified)" }, { code: "zh-TW", name: "Chinese (Traditional)" },
    { code: "co", name: "Corsican" }, { code: "hr", name: "Croatian" }, { code: "cs", name: "Czech" },
    { code: "da", name: "Danish" }, { code: "dv", name: "Dhivehi" }, { code: "doi", name: "Dogri" },
    { code: "nl", name: "Dutch" }, { code: "en", name: "English" }, { code: "eo", name: "Esperanto" },
    { code: "et", name: "Estonian" }, { code: "ee", name: "Ewe" }, { code: "fil", name: "Filipino" },
    { code: "fi", name: "Finnish" }, { code: "fr", name: "French" }, { code: "fy", name: "Frisian" },
    { code: "gl", name: "Galician" }, { code: "ka", name: "Georgian" }, { code: "de", name: "German" },
    { code: "el", name: "Greek" }, { code: "gn", name: "Guarani" }, { code: "gu", name: "Gujarati" },
    { code: "ht", name: "Haitian Creole" }, { code: "ha", name: "Hausa" }, { code: "haw", name: "Hawaiian" },
    { code: "iw", name: "Hebrew" }, { code: "hi", name: "Hindi" }, { code: "hmn", name: "Hmong" },
    { code: "hu", name: "Hungarian" }, { code: "is", name: "Icelandic" }, { code: "ig", name: "Igbo" },
    { code: "ilo", name: "Ilocano" }, { code: "id", name: "Indonesian" }, { code: "ga", name: "Irish" },
    { code: "it", name: "Italian" }, { code: "ja", name: "Japanese" }, { code: "jw", name: "Javanese" },
    { code: "kn", name: "Kannada" }, { code: "kk", name: "Kazakh" }, { code: "km", name: "Khmer" },
    { code: "rw", name: "Kinyarwanda" }, { code: "gom", name: "Konkani" }, { code: "ko", name: "Korean" },
    { code: "kri", name: "Krio" }, { code: "ku", name: "Kurdish (Kurmanji)" }, { code: "ckb", name: "Kurdish (Sorani)" },
    { code: "ky", name: "Kyrgyz" }, { code: "lo", name: "Lao" }, { code: "la", name: "Latin" },
    { code: "lv", name: "Latvian" }, { code: "ln", name: "Lingala" }, { code: "lt", name: "Lithuanian" },
    { code: "lg", name: "Luganda" }, { code: "lb", name: "Luxembourgish" }, { code: "mk", name: "Macedonian" },
    { code: "mai", name: "Maithili" }, { code: "mg", name: "Malagasy" }, { code: "ms", name: "Malay" },
    { code: "ml", name: "Malayalam" }, { code: "mt", name: "Maltese" }, { code: "mi", name: "Maori" },
    { code: "mr", name: "Marathi" }, { code: "mni-Mtei", name: "Meiteilon (Manipuri)" }, { code: "lus", name: "Mizo" },
    { code: "mn", name: "Mongolian" }, { code: "my", name: "Myanmar (Burmese)" }, { code: "ne", name: "Nepali" },
    { code: "no", name: "Norwegian" }, { code: "or", name: "Odia (Oriya)" }, { code: "om", name: "Oromo" },
    { code: "ps", name: "Pashto" }, { code: "fa", name: "Persian" }, { code: "pl", name: "Polish" },
    { code: "pt", name: "Portuguese" }, { code: "pa", name: "Punjabi" }, { code: "qu", name: "Quechua" },
    { code: "ro", name: "Romanian" }, { code: "ru", name: "Russian" }, { code: "sm", name: "Samoan" },
    { code: "sa", name: "Sanskrit" }, { code: "gd", name: "Scots Gaelic" }, { code: "nso", name: "Sepedi" },
    { code: "sr", name: "Serbian" }, { code: "st", name: "Sesotho" }, { code: "sn", name: "Shona" },
    { code: "sd", name: "Sindhi" }, { code: "si", name: "Sinhala" }, { code: "sk", name: "Slovak" },
    { code: "sl", name: "Slovenian" }, { code: "so", name: "Somali" }, { code: "es", name: "Spanish" },
    { code: "su", name: "Sundanese" }, { code: "sw", name: "Swahili" }, { code: "sv", name: "Swedish" },
    { code: "tg", name: "Tajik" }, { code: "ta", name: "Tamil" }, { code: "tt", name: "Tatar" },
    { code: "te", name: "Telugu" }, { code: "th", name: "Thai" }, { code: "ti", name: "Tigrinya" },
    { code: "ts", name: "Tsonga" }, { code: "tr", name: "Turkish" }, { code: "tk", name: "Turkmen" },
    { code: "tw", name: "Twi" }, { code: "uk", name: "Ukrainian" }, { code: "ur", name: "Urdu" },
    { code: "ug", name: "Uyghur" }, { code: "uz", name: "Uzbek" }, { code: "vi", name: "Vietnamese" },
    { code: "cy", name: "Welsh" }, { code: "xh", name: "Xhosa" }, { code: "yi", name: "Yiddish" },
    { code: "yo", name: "Yoruba" }, { code: "zu", name: "Zulu" }
];

document.getElementById("explorerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("/", {
        method: "POST",
        body: formData,
    });
    const data = await response.json();
    const selectedLang = document.getElementById("selectedLanguage").value || "en";

    const dropdown = document.getElementById("resultDropdown");
    const content = document.getElementById("resultContent");
    dropdown.innerHTML = "";
    content.innerHTML = "";

    // Translate function using Google Translate API
    async function translateText(text, targetLang) {
        const apiKey = "YOUR_GOOGLE_TRANSLATE_API_KEY"; // Replace with your API key
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    q: text,
                    target: targetLang,
                    source: "en"
                })
            });
            const result = await response.json();
            return result.data.translations[0].translatedText;
        } catch (error) {
            console.error("Translation error:", error);
            return text; // Fallback to English
        }
    }

    const tabs = [
        { id: "relations", label: "Relations" },
        { id: "definitions", label: "Definitions" },
        { id: "notes", label: "Notes" },
        { id: "possible_relations", label: "Possible Relations" },
        { id: "cartesian", label: "Cartesian Product" },
        { id: "all", label: "All" }
    ];

    dropdown.innerHTML = tabs.map((tab, i) => 
        `<option value="${tab.id}" ${i === 0 ? "selected" : ""}>${tab.label}</option>`
    ).join("");

    let allContent = "";
    if (data.relations) {
        let relContent = "";
        for (const [type, result] of Object.entries(data.relations)) {
            relContent += `
                <h3>${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <p><strong>Relations:</strong> ${result.relations.length ? result.relations.map(r => `(${r[0]}, ${r[1]})`).join(", ") : "None"}</p>`;
            if (type === "transitive" && result.is_identity) {
                relContent += `<p><strong>Note:</strong> This transitive relation includes the identity relation.</p>`;
            }
        }
        content.innerHTML += `<div id="relations" class="tab-pane">${relContent}</div>`;
        allContent += relContent;
    }

    if (data.definitions) {
        let defContent = "";
        for (const [type, def] of Object.entries(data.definitions)) {
            const translatedDef = selectedLang === "en" ? def : await translateText(def, selectedLang);
            defContent += `
                <h3>${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <p><strong>Definition:</strong> ${translatedDef}</p>`;
        }
        content.innerHTML += `<div id="definitions" class="tab-pane">${defContent}</div>`;
        allContent += defContent;
    }

    if (data.notes) {
        let noteContent = "";
        for (const [type, notes] of Object.entries(data.notes)) {
            if (notes.length) {
                noteContent += `<h3>${type.charAt(0).toUpperCase() + type.slice(1)}</h3>`;
                notes.forEach(note => {
                    noteContent += `<p class="note-highlight">${note}</p>`;
                });
            }
        }
        content.innerHTML += `<div id="notes" class="tab-pane">${noteContent}</div>`;
        allContent += noteContent;
    }

    if (data.possible_relations) {
        let possContent = `<p>Total Possible Relations: ${data.possible_relations.length}</p>`;
        possContent += `<p><strong>Formula:</strong> 2^(${data.num_elements}^2) = ${data.possible_relations.length}</p>`;
        possContent += `<div id="possRelations">`;
        const initialDisplay = data.possible_relations.slice(0, 10);
        initialDisplay.forEach((rel, i) => {
            possContent += `<p class="relation-item" data-index="${i}">${i + 1}. {${rel.length ? rel.map(r => `(${r[0]}, ${r[1]})`).join(", ") : "∅"}}</p>`;
        });
        possContent += `</div>`;
        if (data.possible_relations.length > 10) {
            possContent += `<button id="readMore" class="btn btn-custom mt-2">Read More</button>`;
        }
        content.innerHTML += `<div id="possible_relations" class="tab-pane">${possContent}</div>`;
        allContent += possContent;
    }

    if (data.cartesian) {
        const setLabel = data.set_labels.join(" × ");
        const cartContent = `
            <h3>Cartesian Product (${setLabel})</h3>
            <p><strong>Elements:</strong> ${data.cartesian.map(c => `(${c.join(", ")})`).join(", ")}</p>
            <p><strong>n(${setLabel}):</strong> ${data.cartesian_count}</p>`;
        content.innerHTML += `<div id="cartesian" class="tab-pane">${cartContent}</div>`;
        allContent += cartContent;
    }

    content.innerHTML += `<div id="all" class="tab-pane">${allContent}</div>`;

    function updateContent() {
        const selected = dropdown.value;
        document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
        document.getElementById(selected).classList.add("active");
        if (selected === "possible_relations" || selected === "all") {
            const readMoreBtn = document.getElementById("readMore");
            if (readMoreBtn) {
                let offset = 10;
                readMoreBtn.addEventListener("click", () => {
                    const nextBatch = data.possible_relations.slice(offset, offset + 10);
                    nextBatch.forEach((rel, i) => {
                        const item = document.createElement("p");
                        item.className = "relation-item";
                        item.dataset.index = offset + i;
                        item.textContent = `${offset + i + 1}. {${rel.length ? rel.map(r => `(${r[0]}, ${r[1]})`).join(", ") : "∅"}}`;
                        document.getElementById("possRelations").appendChild(item);
                    });
                    offset += 10;
                    if (offset >= data.possible_relations.length) {
                        readMoreBtn.remove();
                    }
                }, { once: false }); // Ensure listener persists
            }
        }
    }

    dropdown.addEventListener("change", updateContent);
    updateContent();
});

// Language Search Functionality
const languageSearch = document.getElementById("languageSearch");
const languageSuggestions = document.getElementById("languageSuggestions");
const selectedLanguage = document.getElementById("selectedLanguage");

languageSearch.addEventListener("input", () => {
    const query = languageSearch.value.toLowerCase();
    languageSuggestions.innerHTML = "";
    if (query) {
        const matches = languages.filter(lang => lang.name.toLowerCase().startsWith(query));
        matches.forEach(lang => {
            const item = document.createElement("li");
            item.className = "list-group-item";
            item.textContent = lang.name;
            item.dataset.code = lang.code;
            item.addEventListener("click", () => {
                languageSearch.value = lang.name;
                selectedLanguage.value = lang.code;
                languageSuggestions.style.display = "none";
                document.getElementById("explorerForm").dispatchEvent(new Event("submit"));
            });
            languageSuggestions.appendChild(item);
        });
        languageSuggestions.style.display = matches.length ? "block" : "none";
    } else {
        languageSuggestions.style.display = "none";
    }
});

document.addEventListener("click", (e) => {
    if (!languageSearch.contains(e.target) && !languageSuggestions.contains(e.target)) {
        languageSuggestions.style.display = "none";
    }
});

// Settings Toggle
document.getElementById("settingsBtn").addEventListener("click", () => {
    document.getElementById("settings").classList.toggle("active");
});

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    this.textContent = document.body.classList.contains("light-mode") ? "Dark Mode" : "Light Mode";
});

// Developer Info Toggle
document.getElementById("devInfoBtn").addEventListener("click", () => {
    document.getElementById("devInfo").classList.toggle("active");
});