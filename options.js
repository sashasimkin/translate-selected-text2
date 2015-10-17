var bgPage = chrome.extension.getBackgroundPage(),
  isoLanguages = bgPage.isoLanguages,
  getMsg = chrome.i18n.getMessage;

// region helper functions

function populateHtml(data) {
  for (var selector in data) {
    if(!data.hasOwnProperty(selector)) continue;

    var msgKey = data[selector];
    $(selector).html(msgKey == '' ? '' : getMsg(msgKey));
  }
}

function notify_saved() {
  var $save = $('#save');
  $save.fadeIn();

  setTimeout(function () {
    $save.fadeOut();
  }, 2000);
}

function addLanguage(language, cnt) {
  $('<li/>', {
    'class': 'language',
    'id': language
  }).html(isoLanguages[language].name + ' (' + isoLanguages[language].nativeName + ')')
    .appendTo(cnt);
}

// endregion

function init() {
  populateHtml({
    '#welcome': 'options_welcome',
    '#introduction': 'options_introduction',
    '#languages-select-header': 'options_languagesSelectHeader',
    '#languages-selected-header': 'options_languagesSelectedHeader',
    '#behaviour-options-header': 'options_behaviourOptionsHeader',
    '#save': 'options_savedMessage'
  });

  var behaviourOptions = ['tab_new', 'tab_replace', 'panel'],
    behaviourOptionsEl = $('#behaviour-options');

  for (var i=0; i<behaviourOptions.length; i++) {
    var name = behaviourOptions[i],
      id = 'id_' + name,
      input = $('<input/>', {
        type: 'radio',
        name: 'translatorBehaviour',
        value: name,
        id: id
      }),
      label = $('<label/>', {'for': id});

    if (bgPage.translatorBehaviour == name) {
      input.attr('checked', true);
    }

    label.html(getMsg('options_translatorBehaviour_' + name));

    behaviourOptionsEl.append(input, label, $('<br/>'));
  }

  chrome.storage.sync.get(null, function(items) {
    $('[name="' + items.translatorBehaviour + '"]').attr('checked', true);

    // Replace with something more generic
    $('[data-new-tab]').on('click', function (e) {
      chrome.tabs.create({url: this.href});
      e.preventDefault();
    });

    for (var language in isoLanguages) {
      if(!isoLanguages.hasOwnProperty(language)) continue;

      addLanguage(language, '#languages');
    }

    for (var i=0; i<items.languages.length; i++) {
      addLanguage(items.languages[i], '#selected-languages');
    }

    var $available = $( "#languages"),
      $selected = $( "#selected-languages" );

    $($available).add($selected).sortable({
      connectWith: ".ul-connected"
    }).disableSelection();
    // Make same height
    $selected.height($available.height());
  });
  
  // Link every change with options updater
  $('[name="translatorBehaviour"]').on('change', save_options);
  $('#selected-languages').on('sortstop sortreceive sortupdate', save_options);
}

function save_options() {
  var options = {
    translatorBehaviour: $('[name="translatorBehaviour"]:checked').val(),
    languages: $( "#selected-languages" ).sortable("toArray")
  };

  // Changes from this actions will be propagated to the background page by onChanged event
  chrome.storage.sync.set(options, function() {
    bgPage.translator_tab = false;
    bgPage.translator_window = false;

    // Notify user that settings are saved
    notify_saved();
  });
}

window.addEventListener('load', init);
