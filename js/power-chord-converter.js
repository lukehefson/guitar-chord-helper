/**
 * Power Chord Converter - Converts chords to power chords
 */

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export class PowerChordConverter {
    /**
     * Convert a chord to power chord positions
     * @param {string} root - Root note of the chord
     * @returns {Array} Array of power chord fingerings
     */
    static convertToPowerChord(root) {
        const rootIndex = NOTE_NAMES.indexOf(root);
        if (rootIndex === -1) return [];

        const positions = [];

        // Power chord positions on 6th string (E string)
        const positions6thString = [
            { fret: 0, name: 'E' },   // Open E
            { fret: 1, name: 'F' },
            { fret: 2, name: 'F#' },
            { fret: 3, name: 'G' },
            { fret: 4, name: 'G#' },
            { fret: 5, name: 'A' },
            { fret: 6, name: 'A#' },
            { fret: 7, name: 'B' },
            { fret: 8, name: 'C' },
            { fret: 9, name: 'C#' },
            { fret: 10, name: 'D' },
            { fret: 11, name: 'D#' },
            { fret: 12, name: 'E' }
        ];

        // Power chord positions on 5th string (A string)
        const positions5thString = [
            { fret: 0, name: 'A' },   // Open A
            { fret: 1, name: 'A#' },
            { fret: 2, name: 'B' },
            { fret: 3, name: 'C' },
            { fret: 4, name: 'C#' },
            { fret: 5, name: 'D' },
            { fret: 6, name: 'D#' },
            { fret: 7, name: 'E' },
            { fret: 8, name: 'F' },
            { fret: 9, name: 'F#' },
            { fret: 10, name: 'G' },
            { fret: 11, name: 'G#' },
            { fret: 12, name: 'A' }
        ];

        // Find position on 6th string
        const pos6th = positions6thString.find(p => p.name === root);
        if (pos6th) {
            positions.push({
                name: `${root}5 (6th string)`,
                difficulty: 1,
                frets: pos6th.fret === 0 
                    ? [0, 0, null, null, null, null]
                    : [pos6th.fret, pos6th.fret + 2, null, null, null, null],
                fingers: pos6th.fret === 0
                    ? [0, 0, null, null, null, null]
                    : [1, 3, null, null, null, null],
                strings: [6, 5, 4, 3, 2, 1]
            });

            // Also add 3-string version (root, 5th, octave)
            if (pos6th.fret > 0) {
                positions.push({
                    name: `${root}5 (6th string - 3 strings)`,
                    difficulty: 1,
                    frets: [pos6th.fret, pos6th.fret + 2, pos6th.fret + 2, null, null, null],
                    fingers: [1, 3, 4, null, null, null],
                    strings: [6, 5, 4, 3, 2, 1]
                });
            }
        }

        // Find position on 5th string
        const pos5th = positions5thString.find(p => p.name === root);
        if (pos5th) {
            positions.push({
                name: `${root}5 (5th string)`,
                difficulty: 1,
                frets: [null, pos5th.fret === 0 ? 0 : pos5th.fret, pos5th.fret === 0 ? 0 : pos5th.fret + 2, null, null, null],
                fingers: [null, pos5th.fret === 0 ? 0 : 1, pos5th.fret === 0 ? 0 : 3, null, null, null],
                strings: [6, 5, 4, 3, 2, 1]
            });

            // 3-string version
            if (pos5th.fret > 0) {
                positions.push({
                    name: `${root}5 (5th string - 3 strings)`,
                    difficulty: 1,
                    frets: [null, pos5th.fret, pos5th.fret + 2, pos5th.fret + 2, null, null],
                    fingers: [null, 1, 3, 4, null, null],
                    strings: [6, 5, 4, 3, 2, 1]
                });
            }
        }

        // Add open string power chords for common roots
        if (root === 'E') {
            positions.unshift({
                name: 'E5 (Open)',
                difficulty: 1,
                frets: [0, 2, 2, null, null, null],
                fingers: [0, 1, 2, null, null, null],
                strings: [6, 5, 4, 3, 2, 1]
            });
        } else if (root === 'A') {
            positions.unshift({
                name: 'A5 (Open)',
                difficulty: 1,
                frets: [null, 0, 2, 2, null, null],
                fingers: [null, 0, 1, 2, null, null],
                strings: [6, 5, 4, 3, 2, 1]
            });
        } else if (root === 'D') {
            positions.unshift({
                name: 'D5 (Open)',
                difficulty: 1,
                frets: [null, null, 0, 2, null, null],
                fingers: [null, null, 0, 1, null, null],
                strings: [6, 5, 4, 3, 2, 1]
            });
        }

        return positions;
    }

    /**
     * Get power chord for a parsed chord
     */
    static getPowerChordForChord(parsedChord) {
        if (!parsedChord || !parsedChord.root) {
            return [];
        }
        return this.convertToPowerChord(parsedChord.root);
    }
}

