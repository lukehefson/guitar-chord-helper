/**
 * Fretboard Renderer - Renders chord diagrams
 */

export class FretboardRenderer {
    /**
     * Render a chord diagram
     * @param {Object} fingering - Chord fingering data
     * @param {Object} options - Rendering options
     * @returns {HTMLElement} - Rendered diagram element
     */
    static render(fingering, options = {}) {
        const {
            showFretNumbers = true,
            maxFrets = 5
        } = options;

        const container = document.createElement('div');
        container.className = 'chord-diagram-container';
        
        const diagram = document.createElement('div');
        diagram.className = 'chord-diagram';

        const fretboard = document.createElement('div');
        fretboard.className = 'fretboard';

        // Determine the fret range to display
        const frets = fingering.frets || [];
        const nonNullFrets = frets.filter(f => f !== null && f !== undefined);
        const minFret = nonNullFrets.length > 0 ? Math.min(...nonNullFrets) : 0;
        const startFret = minFret > 0 ? minFret - 1 : 0;
        const endFret = Math.min(startFret + maxFrets, Math.max(...nonNullFrets, 0) + 2);

        // Create rows for each string (6 strings, E to e)
        const stringNames = ['E', 'A', 'D', 'G', 'B', 'e'];
        const stringNumbers = [6, 5, 4, 3, 2, 1];

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('div');
            row.className = 'fretboard-row';

            // String label
            const label = document.createElement('div');
            label.className = 'string-label';
            label.textContent = stringNames[i];
            row.appendChild(label);

            // Create frets
            for (let fret = startFret; fret <= endFret; fret++) {
                const fretEl = document.createElement('div');
                fretEl.className = 'fret';
                
                if (fret === startFret && startFret > 0) {
                    // Show fret number for first displayed fret
                    const fretNum = document.createElement('div');
                    fretNum.className = 'fret-number';
                    fretNum.textContent = startFret;
                    fretEl.appendChild(fretNum);
                }

                // Get the fret value for this string
                const stringIndex = stringNumbers[i] - 1;
                const fretValue = frets[stringIndex];

                // Only show indicators in the first fret column
                if (fret === startFret) {
                    if (fretValue === null || fretValue === undefined) {
                        // Muted string
                        const muted = document.createElement('span');
                        muted.className = 'muted-string';
                        muted.textContent = '×';
                        fretEl.appendChild(muted);
                    } else if (fretValue === 0) {
                        // Open string
                        const open = document.createElement('span');
                        open.className = 'open-string';
                        open.textContent = '○';
                        fretEl.appendChild(open);
                    }
                }

                // Show finger position if this is the correct fret
                if (fretValue !== null && fretValue !== undefined && fretValue !== 0 && fretValue === fret) {
                    const finger = fingering.fingers ? fingering.fingers[stringIndex] : null;
                    const dot = document.createElement('div');
                    dot.className = 'finger-dot';
                    if (finger !== null && finger !== undefined) {
                        dot.textContent = finger;
                    }
                    fretEl.appendChild(dot);
                }

                row.appendChild(fretEl);
            }

            fretboard.appendChild(row);
        }

        diagram.appendChild(fretboard);
        container.appendChild(diagram);

        // Add tab notation if requested
        if (options.showTabNotation) {
            const tab = this.generateTabNotation(fingering);
            if (tab) {
                const tabEl = document.createElement('div');
                tabEl.className = 'tab-notation';
                tabEl.textContent = tab;
                container.appendChild(tabEl);
            }
        }

        return container;
    }

    /**
     * Generate tab notation for a fingering
     */
    static generateTabNotation(fingering) {
        const frets = fingering.frets || [];
        const stringNames = ['E', 'A', 'D', 'G', 'B', 'e'];
        
        let tab = '';
        for (let i = 0; i < 6; i++) {
            const fret = frets[i];
            if (fret === null || fret === undefined) {
                tab += `${stringNames[i]}|---\n`;
            } else if (fret === 0) {
                tab += `${stringNames[i]}|---0\n`;
            } else {
                tab += `${stringNames[i]}|---${fret}\n`;
            }
        }
        
        return tab.trim();
    }

    /**
     * Check if a fingering uses a barre
     */
    static hasBarre(fingering) {
        const frets = fingering.frets || [];
        const fingers = fingering.fingers || [];
        
        // Check if same finger is used on multiple strings at same fret
        const fingerPositions = {};
        for (let i = 0; i < frets.length; i++) {
            if (frets[i] !== null && frets[i] !== undefined && frets[i] !== 0) {
                const finger = fingers[i];
                if (finger !== null && finger !== undefined) {
                    const key = `${finger}-${frets[i]}`;
                    if (fingerPositions[key]) {
                        return true; // Same finger on multiple strings = barre
                    }
                    fingerPositions[key] = true;
                }
            }
        }
        
        return false;
    }
}

