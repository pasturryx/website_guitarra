// Definición de escalas
const major_scale = [0, 2, 4, 5, 7, 9, 11, 12];
const minor_nat_scale = [0, 2, 3, 5, 7, 8, 10, 12];
const minor_arm_scale = [0, 2, 3, 5, 7, 8, 11, 12];
const ionic_scale = [0, 2, 3, 5, 7, 9, 10, 12];
const phrygian_scale = [0, 1, 3, 5, 7, 8, 10, 12];
let chosen_scale = major_scale;

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const change_scale = document.getElementById('change_scale');
    const notes = [
        document.getElementById('a'), document.getElementById('bb'), 
        document.getElementById('b'), document.getElementById('c'),
        document.getElementById('db'), document.getElementById('d'),
        document.getElementById('eb'), document.getElementById('e'),
        document.getElementById('f'), document.getElementById('gb'),
        document.getElementById('g'), document.getElementById('ab')
    ];

    const scales = [
        document.getElementById('A'), document.getElementById('Bb'), 
        document.getElementById('B'), document.getElementById('C'),
        document.getElementById('Db'), document.getElementById('D'),
        document.getElementById('Eb'), document.getElementById('E'),
        document.getElementById('F'), document.getElementById('Gb'),
        document.getElementById('G'), document.getElementById('Ab')
    ];

    // Función para actualizar la visualización de la escala
    function updateScale(index) {
        // Limpiar colores previos
        notes.forEach(note => note.style.fill = "black");
        scales.forEach(sc => sc.style.fill = "black");
        
        // Colorear la escala seleccionada
        scales[index].style.fill = "green";
        
        // Colorear las notas correspondientes
        for (let i = 0; i < 8; i++) {
            const noteIndex = (chosen_scale[i] + index) % 12;
            if (notes[noteIndex]) {
                notes[noteIndex].style.fill = "green";
            }
        }
    }

    // Listener para el cambio de escala
    change_scale.addEventListener('change', function() {
        const value = this.value;
        switch(value) {
            case "minor_nat_scale":
                chosen_scale = minor_nat_scale;
                break;
            case "minor_arm_scale":
                chosen_scale = minor_arm_scale;
                break;
            case "major_scale":
                chosen_scale = major_scale;
                break;
            case "ionic_scale":
                chosen_scale = ionic_scale;
                break;
            case "phrygian_scale":
                chosen_scale = phrygian_scale;
                break;
            default:
                console.error("Escala no reconocida:", value);
                return;
        }

        // Actualizar la visualización si hay una escala actualmente seleccionada
        const activeScale = document.querySelector('.scale[style*="green"]');
        if (activeScale) {
            const index = scales.indexOf(activeScale);
            if (index !== -1) {
                updateScale(index);
            }
        }
    });

    // Listener para el click en las escalas
    scales.forEach((scale, index) => {
        scale.addEventListener('click', () => updateScale(index));
    });
});