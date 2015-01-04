var isoLanguages = {"af": {"name": "Afrikaans", "nativeName": "Afrikaans"}, "sq": {"name": "Albanian", "nativeName": "Shqip"}, "ar": {"name": "Arabic", "nativeName": "\u0639\u0631\u0628\u064a"}, "hy": {"name": "Armenian", "nativeName": "\u0540\u0561\u0575\u0565\u0580\u0567\u0576"}, "az": {"name": "Azerbaijani", "nativeName": "\u0622\u0630\u0631\u0628\u0627\u06cc\u062c\u0627\u0646 \u062f\u06cc\u0644\u06cc"}, "eu": {"name": "Basque", "nativeName": "Euskara"}, "be": {"name": "Belarusian", "nativeName": "\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0430\u044f"}, "bg": {"name": "Bulgarian", "nativeName": "\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438"}, "ca": {"name": "Catalan", "nativeName": "Catal\u00e0"}, "zh-CN": {"name": "Chinese (Simplified)", "nativeName": "\u4e2d\u6587\u7b80\u4f53"}, "zh-TW": {"name": "Chinese (Traditional)", "nativeName": "\u4e2d\u6587\u7e41\u9ad4"}, "hr": {"name": "Croatian", "nativeName": "Hrvatski"}, "cs": {"name": "Czech", "nativeName": "\u010ce\u0161tina"}, "da": {"name": "Danish", "nativeName": "Dansk"}, "nl": {"name": "Dutch", "nativeName": "Nederlands"}, "en": {"name": "English", "nativeName": "English"}, "et": {"name": "Estonian", "nativeName": "Eesti keel"}, "tl": {"name": "Filipino", "nativeName": "Filipino"}, "fi": {"name": "Finnish", "nativeName": "Suomi"}, "fr": {"name": "French", "nativeName": "Fran\u00e7ais"}, "gl": {"name": "Galician", "nativeName": "Galego"}, "ka": {"name": "Georgian", "nativeName": "\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8"}, "de": {"name": "German", "nativeName": "Deutsch"}, "el": {"name": "Greek", "nativeName": "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac"}, "ht": {"name": "Haitian Creole", "nativeName": "Krey\u00f2l ayisyen"}, "iw": {"name": "Hebrew", "nativeName": "\u05e2\u05d1\u05e8\u05d9\u05ea"}, "hi": {"name": "Hindi", "nativeName": "\u0939\u093f\u0928\u094d\u0926\u0940"}, "hu": {"name": "Hungarian", "nativeName": "Magyar"}, "is": {"name": "Icelandic", "nativeName": "\u00cdslenska"}, "id": {"name": "Indonesian", "nativeName": "Bahasa Indonesia"}, "ga": {"name": "Irish", "nativeName": "Gaeilge"}, "it": {"name": "Italian", "nativeName": "Italiano"}, "ja": {"name": "Japanese", "nativeName": "\u65e5\u672c\u8a9e"}, "ko": {"name": "Korean", "nativeName": "\ud55c\uad6d\uc5b4"}, "lv": {"name": "Latvian", "nativeName": "Latvie\u0161u"}, "lt": {"name": "Lithuanian", "nativeName": "Lietuvi\u0173 kalba"}, "mk": {"name": "Macedonian", "nativeName": "\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438"}, "ms": {"name": "Malay", "nativeName": "Malay"}, "mt": {"name": "Maltese", "nativeName": "Malti"}, "no": {"name": "Norwegian", "nativeName": "Norsk"}, "fa": {"name": "Persian", "nativeName": "\u0641\u0627\u0631\u0633\u06cc"}, "pl": {"name": "Polish", "nativeName": "Polski"}, "pt": {"name": "Portuguese", "nativeName": "Portugu\u00eas"}, "ro": {"name": "Romanian", "nativeName": "Rom\u00e2n\u0103"}, "ru": {"name": "Russian", "nativeName": "\u0420\u0443\u0441\u0441\u043a\u0438\u0439"}, "sr": {"name": "Serbian", "nativeName": "\u0421\u0440\u043f\u0441\u043a\u0438"}, "sk": {"name": "Slovak", "nativeName": "Sloven\u010dina"}, "sl": {"name": "Slovenian", "nativeName": "Slovensko"}, "es": {"name": "Spanish", "nativeName": "Espa\u00f1ol"}, "sw": {"name": "Swahili", "nativeName": "Kiswahili"}, "sv": {"name": "Swedish", "nativeName": "Svenska"}, "th": {"name": "Thai", "nativeName": "\u0e44\u0e17\u0e22"}, "tr": {"name": "Turkish", "nativeName": "T\u00fcrk\u00e7e"}, "uk": {"name": "Ukrainian", "nativeName": "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430"}, "ur": {"name": "Urdu", "nativeName": "\u0627\u0631\u062f\u0648"}, "vi": {"name": "Vietnamese", "nativeName": "Ti\u1ebfng Vi\u1ec7t"}, "cy": {"name": "Welsh", "nativeName": "Cymraeg"}, "yi": {"name": "Yiddish", "nativeName": "\u05d9\u05d9\u05b4\u05d3\u05d9\u05e9"}};

var activeMenus = {},
  translatorTab = false,
  translatorWindow = false,
  translatorBehaviour, // opening  of the translator
  lastUsedLanguageMenu; // Used when clicked on the toolbar button

function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0;
}

function handleTranslatorOpened(tab) {
  /**
   * Tweak Google Translate page by removing header and footer which is very handy when using panels
   */
  chrome.tabs.executeScript(tab.id, {
    file: "page_tweak.js",
    runAt: "document_start"
  });
}

function openTranslator(info, tab) {
  lastUsedLanguageMenu = info.menuItemId;

  var translate_url = 'https://translate.google.com/#auto/' + activeMenus[info.menuItemId].langCode + '/' + encodeURIComponent(info.selectionText),
    settingsTab = {'url': translate_url};

  if (translatorTab && translatorBehaviour === 'tab_replace') {
    chrome.tabs.update(translatorTab, settingsTab, function (tab) {
      chrome.tabs.highlight({'windowId': tab.windowId, 'tabs': tab.index}, function () {
        chrome.windows.update(tab.windowId, {focused: true}, function () {});
      });
      handleTranslatorOpened(tab);
    });
  } else if (translatorBehaviour === 'panel') {
    chrome.windows.create({
      type: 'panel',
      url: translate_url,
      width: 1000,
      height: 382
    }, function (window) {
      handleTranslatorOpened(window.tabs[0].id);
    });
  } else { // At all it is a tabs_new case
    chrome.tabs.create(settingsTab, function (tab) {
      translatorWindow = tab.windowId;
      translatorTab = tab.id;

      chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
        if (tabId === translatorTab) {
          translatorWindow = false;
          translatorTab = false;
        }
      });
      handleTranslatorOpened(tab);
    });
  }
}

function openOptionsPage(info, tab) {
  chrome.tabs.create({
    url: 'chrome-extension://' + chrome.i18n.getMessage("@@extension_id") + '/options.html',
    active: true
  }, function(tab) {
    chrome.windows.update(tab.windowId, {focused: true}, function () {});
  });
}

function createMenus(languages) {
  chrome.contextMenus.removeAll();
  var langsLength = languages.length,
    parent;

  if (langsLength > 1) {
    parent = chrome.contextMenus.create({
      "title": chrome.i18n.getMessage("contextMenu_title"),
      "contexts": ["selection"],
      "onclick": openTranslator
    });
  }

  if (languages) {
    for (var i = 0; i < languages.length; i++) {
      var language = languages[i];

      var iso_lang = isoLanguages[language];
      var child_id = chrome.contextMenus.create({
        "title": (langsLength == 1 ? chrome.i18n.getMessage("contextMenu_title") + ' ' : '') + iso_lang.name + " (" + iso_lang.nativeName + ")",
        "parentId": parent,
        "contexts": ["selection"],
        "onclick": openTranslator
      });

      if (!lastUsedLanguageMenu) { // If this is first run - set first language as "last used"
        lastUsedLanguageMenu = child_id;
      }
      activeMenus[child_id] = {
        langCode: language,
        langName: iso_lang.name,
        langNativeName: language.nativeName
      };
    }

    if (langsLength > 1) {
      chrome.contextMenus.create({
        "type": "separator",
        "parentId": parent,
        "contexts": ["selection"],
        "onclick": openOptionsPage
      });

      chrome.contextMenus.create({
        "title": chrome.i18n.getMessage("contextMenu_edit"),
        "parentId": parent,
        "contexts": ["selection"],
        "onclick": openOptionsPage
      });
    }
  }
}

// Maybe this must be realized as some sort of the popup
chrome.browserAction.onClicked.addListener(function(tab) {
  openTranslator({
    menuItemId: lastUsedLanguageMenu,
    selectionText: ''
  }, tab);
});

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.storage.sync.get(null, function(items) {
    if (details.reason == "install") {
      if (isEmpty(items)) {
        var settings = {
            languages: [],
            translatorBehaviour: 'tab_new' // Because this is the default behaviour
          },
          default_language = chrome.i18n.getMessage("@@ui_locale").split("_")[0];

        if (isoLanguages[default_language] != "undefined") {
          settings.languages.push(default_language);
        }

        chrome.storage.sync.set(settings, function () {
          chrome.notifications.create("install", {
            type: "basic",
            iconUrl: "images/icon-128.png",
            title: chrome.i18n.getMessage("notification_installTitle"),
            message: chrome.i18n.getMessage("notification_installMessage"),
            isClickable: true
          }, function (id) {});
        });
      }
    } else if (details.reason == "update") { // Just a placeholder
      // Here is nothing to do at the moment
    }
  });
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
  console.log(changes, areaName);

  if (areaName == "sync"){
    if(changes.languages) {
      createMenus(changes.languages.newValue);
    }

    if(changes.translatorBehaviour) {
      translatorBehaviour = changes.translatorBehaviour.newValue;
    }
  }
});

chrome.storage.sync.get(null, function(items) {
  translatorBehaviour = items.translatorBehaviour;
  createMenus(items.languages);
});

chrome.notifications.onClicked.addListener(function(notification_id) {
  if(notification_id == 'install') {
    openOptionsPage();
  }
  chrome.notifications.clear(notification_id, function() {});
});