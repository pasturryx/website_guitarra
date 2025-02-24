(function() {
  /*************** VARIABLES ***************/
  var button = $('#cn-button'),
    title = $('h1'),
    wrapper = $('#cn-wrapper'),
    overlay = $('#cn-overlay'),

    //Scale and keys
    keys = $('#keys'),
    key = $(".key"),
    scale = $('#scale'),

    //Major/minor buttons and modes
    majorB = $('#major'),
    minorB = $('#minor'),
    mode = $('#mode'),
    modeMaj = $('#mode .major'),
    modeMin = $('#mode .minor'),

    //Is nav open?
    open = false,
    //Currently active mode
    activeMode = 'major',
    activeKey = 'C', // Default set to C

    majorScale = {
      'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'E'],
      'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B'],
      'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#'],
      'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#'],
      'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#'],
      'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#'],
      'B': ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#'],
      'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#'],
      'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Ab'],
      'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'D'],
      'Ab': ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'G'],
      'Db': ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'C']
    },
    minorScale = {
      'F': ['Fm', 'G', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb'],
      'C': ['Cm', 'D', 'Eb', 'Fm', 'Gm', 'Ab', 'B'],
      'G': ['Gm', 'A', 'Bb', 'Cm', 'Dm', 'Eb', 'F'],
      'D': ['Dm', 'E', 'F', 'Gm', 'Am', 'Bb', 'C'],
      'A': ['Am', 'B', 'C', 'Dm', 'Em', 'F', 'G'],
      'E': ['Em', 'F#', 'G', 'Am', 'Bm', 'C', 'D'],
      'B': ['Bm', 'C#', 'D', 'Em', 'F#m', 'G', 'A'],
      'F#': ['F#m', 'G#', 'A', 'Bm', 'C#m', 'D', 'E'],
      'Bb': ['Bbm', 'C', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab'],
      'Eb': ['Ebm', 'F', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db'],
      'Ab': ['Abm', 'Bb', 'Cb', 'Dbm', 'Ebm', 'Fb', 'Gb'],
      'Db': ['Dbm', 'Eb', 'Fb', 'Gbm', 'Abm', 'Bb', 'C']
    };

  /*************** EVENTS ***************/

  key.click(function(e) {
    e.preventDefault();

    //If it's a flat key, need to append flat symbol for index
    if ($(this).hasClass('flat')) {
      var note = $(this).find('SPAN').html() + 'b';
    }
    //If it's a sharp key, need to append sharp symbol for index
    else if ($(this).hasClass('sharp')) {
      var note = $(this).find('SPAN').html() + '#';
    } else {
      var note = $(this).find('SPAN').html();
    }

    //Toggle key active states
    $('.key.active').removeClass('active');
    $(this).addClass('active')

    //Set the avtivekey and initiate key funct
    activeKey = note;
    console.log(note);
    setKey(note);

  });

  button.click(handler);
  wrapper.click(cnhandle);
  majorB.click({
    mode: "major"
  }, changeMode);
  minorB.click({
    mode: "minor"
  }, changeMode);

  /*************** FUNCTIONS ***************/

  function cnhandle(e) {
    e.preventDefault();
  }

  function setKey(note) {
    scale.empty();

    if (activeMode === 'major') {
        var notes = majorScale[note];
    } else {
        var notes = minorScale[note];
    }

    $.each(notes, function(note, v) {
        scale.append("<span class='note'>" + v + '</span>');
    });

    // Mostrar los acordes relativos
    showRelativeChords(note, activeMode);
}

 /* function setKey(note) {
    //Empty out the current scale
    scale.empty();

    // If it's the major scale
    if (activeMode === 'major') {
      var notes = majorScale[note];
    } else { //Else it's the minor scale
      var notes = minorScale[note];
    }

    //Append the scale notes to the scale
    $.each(notes, function(note, v) {
      scale.append("<span class='note'>" + v + '</span>');
    });
  }*/

  function changeMode(e) {
    //Set the active mode to major 
    if (e.data.mode === 'major') {
      activeMode = 'major';
      //Activate button and mode
      majorB.addClass('active');
      modeMaj.addClass('active');
      keys.addClass('major');

      if (minorB.hasClass('active')) {
        //Disable active button and mode
        minorB.removeClass('active');
        modeMin.removeClass('active');
        keys.removeClass('minor');
      }

    } else { //Set the active mode to minor 
      activeMode = 'minor';
      //Activate button and mode
      minorB.addClass('active');
      modeMin.addClass('active');
      keys.addClass('minor');

      if (majorB.hasClass('active')) {
        //Disable active button and mode
        majorB.removeClass('active');
        modeMaj.removeClass('active');
        keys.removeClass('major');
      }
    }
    //Update the key
    setKey(activeKey);
  }

  //Toggle the nav open or closed
  function handler(e) {
    if (!open) {
      openNav();
    } else {
      closeNav();
    }
  }

  //Open the nav
  function openNav() {
    open = true;
    button.html("-");
    overlay.addClass('on-overlay');
    wrapper.addClass('opened-nav');
    scale.addClass('active');
    mode.addClass('active');
    title.addClass('active');

  }

  function showRelativeChords(note, mode) {
    const chordsContainer = document.getElementById('chords-container');
    chordsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos acordes

    const scale = mode === 'major' ? majorScale[note] : minorScale[note];

    if (scale) {
        scale.forEach((chord, index) => {
            const chordElement = document.createElement('div');
            chordElement.className = 'chord';
            chordElement.textContent = `${index + 1}: ${chord}`;
            chordsContainer.appendChild(chordElement);
        });
    }
}

  //Close the nav
  function closeNav() {
    open = false;
    button.html("+");

    overlay.removeClass('on-overlay');
    wrapper.removeClass('opened-nav');
    mode.removeClass('active');
    title.removeClass('active');
  }

  //Initiate key on load
  setKey(activeKey);
})();