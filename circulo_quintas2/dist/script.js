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

 // Actualización del objeto majorScale para incluir las escalas relativas correctas
 majorScale = {
    'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#'], // Relativa menor: D#m
    'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B'], 
    'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#'],
    'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#'],
    'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#'], // Relativa menor: F#m
    'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#'], // Relativa menor: C#m
    'B': ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#'], // Relativa menor: G#m
    'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Ab'],
    'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'D'],
    'Ab': ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'G'],
    'Db': ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'C']
};

// Actualización del objeto minorScale para incluir las escalas relativas correctas
 minorScale = {
    'D#': ['D#m', 'E#', 'F#', 'G#m', 'A#m', 'B', 'C#'], // Relativa mayor: F#
    'F#': ['F#m', 'G#', 'A', 'Bm', 'C#m', 'D', 'E'], // Relativa mayor: A
    'C#': ['C#m', 'D#', 'E', 'F#m', 'G#m', 'A', 'B'], // Relativa mayor: E
    'G#': ['G#m', 'A#', 'B', 'C#m', 'D#m', 'E', 'F#'], // Relativa mayor: B
    'C': ['Cm', 'D', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb'],
    'G': ['Gm', 'A', 'Bb', 'Cm', 'Dm', 'Eb', 'F'],
    'D': ['Dm', 'E', 'F', 'Gm', 'Am', 'Bb', 'C'],
    'A': ['Am', 'B', 'C', 'Dm', 'Em', 'F', 'G'],
    'E': ['Em', 'F#', 'G', 'Am', 'Bm', 'C', 'D'],
    'B': ['Bm', 'C#', 'D', 'Em', 'F#m', 'G', 'A'],
    'Bb': ['Bbm', 'C', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab'],
    'Eb': ['Ebm', 'F', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db'], // Relativa mayor: Gb
    'Ab': ['Abm', 'Bb', 'Cb', 'Dbm', 'Ebm', 'Fb', 'Gb'], // Relativa mayor: Cb
    'Db': ['Dbm', 'Eb', 'Fb', 'Gbm', 'Abm', 'Bb', 'C'] // Relativa mayor: Fb
};

  /*************** EVENTS ***************/

  /*key.click(function(e) {
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

  });*/
    key.click(function(e) {
  e.preventDefault();

  // Si es una nota bemol, necesitamos agregar el símbolo bemol
  if ($(this).hasClass('flat')) {
    var note = $(this).find('SPAN').html() + 'b';
  }
  // Si es una nota sostenida, necesitamos agregar el símbolo sostenido
  else if ($(this).hasClass('sharp')) {
    var note = $(this).find('SPAN').html() + '#';
  } else {
    var note = $(this).find('SPAN').html();
  }

  // Toggle key active states
  $('.key.active').removeClass('active');
  $(this).addClass('active')

  // Establecer la nota activa y iniciar la función de la nota
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

    // Llamar a la función para mostrar los acordes relativos
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

  
// Actualización de la función showRelativeChords para manejar correctamente las conversiones
function showRelativeChords(note, mode) {
    let container = document.getElementById('relative-scales');
    if (!container) {
        container = document.createElement('div');
        container.id = 'relative-scales';
        document.querySelector('.component').appendChild(container);
    }
    container.innerHTML = '';

    const currentScale = mode === 'major' ? majorScale[note] : minorScale[note];
    
    if (!currentScale) {
        console.error(`No scale found for ${note} ${mode}`);
        return;
    }

    let relativeNote;
    let relativeScale;

    if (mode === 'major') {
        // Para escalas mayores, el relativo menor es el sexto grado
        relativeNote = currentScale[5].replace('m', '');
        
        // Manejo especial para las conversiones específicas
        switch(note) {
            case 'F#':
                relativeScale = minorScale['D#'];
                relativeNote = 'D#';
                break;
            case 'A':
                relativeScale = minorScale['F#'];
                relativeNote = 'F#';
                break;
            case 'E':
                relativeScale = minorScale['C#'];
                relativeNote = 'C#';
                break;
            case 'B':
                relativeScale = minorScale['G#'];
                relativeNote = 'G#';
                break;
            default:
                relativeScale = minorScale[relativeNote];
        }
    } else {
        // Para escalas menores, el relativo mayor es el tercer grado
        relativeNote = currentScale[2];
        
        // Manejo especial para las conversiones específicas
        switch(note) {
            case 'Eb':
                relativeScale = majorScale['Gb'];
                relativeNote = 'Gb';
                break;
            case 'Ab':
                relativeScale = majorScale['Cb'];
                relativeNote = 'Cb';
                break;
            case 'Db':
                relativeScale = majorScale['Fb'];
                relativeNote = 'Fb';
                break;
            default:
                relativeScale = majorScale[relativeNote];
        }
    }

    // Mostrar la escala actual
    const currentScaleDiv = document.createElement('div');
    currentScaleDiv.className = 'scale-display';
    currentScaleDiv.innerHTML = `
        <h3>${mode.charAt(0).toUpperCase() + mode.slice(1)} Scale (${note})</h3>
        <div class="scale-degrees">
            ${getScaleDegrees(mode)}
        </div>
        <div class="scale-notes">
            ${currentScale.join(' - ')}
        </div>
    `;
    container.appendChild(currentScaleDiv);

    // Mostrar la escala relativa
    if (relativeScale) {
        const relativeScaleDiv = document.createElement('div');
        relativeScaleDiv.className = 'scale-display relative';
        relativeScaleDiv.innerHTML = `
            <h3>Relative ${mode === 'major' ? 'Minor' : 'Major'} (${relativeNote})</h3>
            <div class="scale-degrees">
                ${getScaleDegrees(mode === 'major' ? 'minor' : 'major')}
            </div>
            <div class="scale-notes">
                ${relativeScale.join(' - ')}
            </div>
        `;
        container.appendChild(relativeScaleDiv);
    }
}

    function getScaleDegrees(mode) {
    if (mode === 'major') {
        return 'I - ii - iii - IV - V - vi - vii°';
    } else {
        return 'i - ii° - III - iv - v - VI - VII';
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