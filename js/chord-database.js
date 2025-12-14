/**
 * Chord Database - Contains fingerings for common chords
 */

export class ChordDatabase {
    constructor() {
        this.chords = this.initializeDatabase();
    }

    /**
     * Initialize the chord database with common chords
     */
    initializeDatabase() {
        return {
            // Major Chords
            'C': {
                root: 'C',
                quality: 'major',
                fingerings: [
                    {
                        name: 'C (Open)',
                        difficulty: 1,
                        frets: [null, 3, 2, 0, 1, 0],
                        fingers: [null, 2, 1, 0, 3, 0],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'C (Barre)',
                        difficulty: 4,
                        frets: [3, 3, 5, 5, 5, 3],
                        fingers: [1, 1, 2, 3, 4, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Cmaj7']
            },
            'D': {
                root: 'D',
                quality: 'major',
                fingerings: [
                    {
                        name: 'D (Open)',
                        difficulty: 1,
                        frets: [null, null, 0, 2, 3, 2],
                        fingers: [null, null, 0, 1, 3, 2],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'D (Barre)',
                        difficulty: 4,
                        frets: [5, 5, 7, 7, 7, 5],
                        fingers: [1, 1, 2, 3, 4, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Dmaj7']
            },
            'E': {
                root: 'E',
                quality: 'major',
                fingerings: [
                    {
                        name: 'E (Open)',
                        difficulty: 1,
                        frets: [0, 2, 2, 1, 0, 0],
                        fingers: [0, 2, 3, 1, 0, 0],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'E (Barre)',
                        difficulty: 4,
                        frets: [12, 12, 14, 14, 14, 12],
                        fingers: [1, 1, 2, 3, 4, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Emaj7']
            },
            'F': {
                root: 'F',
                quality: 'major',
                fingerings: [
                    {
                        name: 'F (Barre)',
                        difficulty: 4,
                        frets: [1, 3, 3, 2, 1, 1],
                        fingers: [1, 3, 4, 2, 1, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'F (Easy - 3 strings)',
                        difficulty: 2,
                        frets: [null, null, 3, 3, 1, 1],
                        fingers: [null, null, 2, 3, 1, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'Fmaj7 (Easier)',
                        difficulty: 2,
                        frets: [null, null, 3, 2, 1, 0],
                        fingers: [null, null, 3, 2, 1, 0],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Fmaj7']
            },
            'G': {
                root: 'G',
                quality: 'major',
                fingerings: [
                    {
                        name: 'G (Open)',
                        difficulty: 1,
                        frets: [3, 2, 0, 0, 3, 3],
                        fingers: [2, 1, 0, 0, 3, 4],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'G (Barre)',
                        difficulty: 4,
                        frets: [3, 3, 5, 5, 5, 3],
                        fingers: [1, 1, 2, 3, 4, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Gmaj7']
            },
            'A': {
                root: 'A',
                quality: 'major',
                fingerings: [
                    {
                        name: 'A (Open)',
                        difficulty: 1,
                        frets: [null, 0, 2, 2, 2, 0],
                        fingers: [null, 0, 1, 2, 3, 0],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'A (Barre)',
                        difficulty: 4,
                        frets: [5, 5, 7, 7, 7, 5],
                        fingers: [1, 1, 2, 3, 4, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Amaj7']
            },
            'B': {
                root: 'B',
                quality: 'major',
                fingerings: [
                    {
                        name: 'B (Barre)',
                        difficulty: 4,
                        frets: [7, 7, 9, 9, 9, 7],
                        fingers: [1, 1, 2, 3, 4, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'B (Easy - 3 strings)',
                        difficulty: 2,
                        frets: [null, null, 9, 9, 7, 7],
                        fingers: [null, null, 2, 3, 1, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Bmaj7']
            },

            // Minor Chords
            'Am': {
                root: 'A',
                quality: 'minor',
                fingerings: [
                    {
                        name: 'Am (Open)',
                        difficulty: 1,
                        frets: [null, 0, 2, 2, 1, 0],
                        fingers: [null, 0, 2, 3, 1, 0],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'Am (Barre)',
                        difficulty: 4,
                        frets: [5, 5, 7, 7, 6, 5],
                        fingers: [1, 1, 3, 4, 2, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Am7']
            },
            'Bm': {
                root: 'B',
                quality: 'minor',
                fingerings: [
                    {
                        name: 'Bm (Barre)',
                        difficulty: 4,
                        frets: [7, 7, 9, 9, 8, 7],
                        fingers: [1, 1, 3, 4, 2, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'Bm (Easy - 3 strings)',
                        difficulty: 2,
                        frets: [null, null, 9, 9, 8, 7],
                        fingers: [null, null, 2, 3, 1, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Bm7']
            },
            'Cm': {
                root: 'C',
                quality: 'minor',
                fingerings: [
                    {
                        name: 'Cm (Barre)',
                        difficulty: 4,
                        frets: [3, 3, 5, 5, 4, 3],
                        fingers: [1, 1, 3, 4, 2, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'Cm (Easy)',
                        difficulty: 2,
                        frets: [null, null, 5, 5, 4, 3],
                        fingers: [null, null, 2, 3, 1, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Cm7']
            },
            'Dm': {
                root: 'D',
                quality: 'minor',
                fingerings: [
                    {
                        name: 'Dm (Open)',
                        difficulty: 1,
                        frets: [null, null, 0, 2, 3, 1],
                        fingers: [null, null, 0, 2, 3, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'Dm (Barre)',
                        difficulty: 4,
                        frets: [5, 5, 7, 7, 6, 5],
                        fingers: [1, 1, 3, 4, 2, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Dm7']
            },
            'Em': {
                root: 'E',
                quality: 'minor',
                fingerings: [
                    {
                        name: 'Em (Open)',
                        difficulty: 1,
                        frets: [0, 2, 2, 0, 0, 0],
                        fingers: [0, 2, 3, 0, 0, 0],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'Em (Barre)',
                        difficulty: 4,
                        frets: [12, 12, 14, 14, 13, 12],
                        fingers: [1, 1, 3, 4, 2, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Em7']
            },
            'Fm': {
                root: 'F',
                quality: 'minor',
                fingerings: [
                    {
                        name: 'Fm (Barre)',
                        difficulty: 4,
                        frets: [1, 3, 3, 1, 1, 1],
                        fingers: [1, 3, 4, 1, 1, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'Fm (Easy)',
                        difficulty: 2,
                        frets: [null, null, 3, 1, 1, 1],
                        fingers: [null, null, 2, 1, 1, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Fm7']
            },
            'Gm': {
                root: 'G',
                quality: 'minor',
                fingerings: [
                    {
                        name: 'Gm (Barre)',
                        difficulty: 4,
                        frets: [3, 3, 5, 5, 4, 3],
                        fingers: [1, 1, 3, 4, 2, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'Gm (Easy)',
                        difficulty: 2,
                        frets: [null, null, 5, 5, 4, 3],
                        fingers: [null, null, 2, 3, 1, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['Gm7']
            },

            // Sharp/Flat variations
            'C#': {
                root: 'C#',
                quality: 'major',
                fingerings: [
                    {
                        name: 'C# (Barre)',
                        difficulty: 4,
                        frets: [4, 4, 6, 6, 6, 4],
                        fingers: [1, 1, 2, 3, 4, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['C#maj7']
            },
            'F#': {
                root: 'F#',
                quality: 'major',
                fingerings: [
                    {
                        name: 'F# (Barre)',
                        difficulty: 4,
                        frets: [2, 4, 4, 3, 2, 2],
                        fingers: [1, 3, 4, 2, 1, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    },
                    {
                        name: 'F# (Easy)',
                        difficulty: 2,
                        frets: [null, null, 4, 4, 2, 2],
                        fingers: [null, null, 2, 3, 1, 1],
                        strings: [6, 5, 4, 3, 2, 1]
                    }
                ],
                alternatives: ['F#maj7']
            }
        };
    }

    /**
     * Get chord data by name
     */
    getChord(chordName) {
        // Normalize chord name
        const normalized = this.normalizeChordName(chordName);
        return this.chords[normalized] || null;
    }

    /**
     * Normalize chord name for lookup
     */
    normalizeChordName(chordName) {
        if (!chordName) return '';
        
        // Handle enharmonic equivalents
        let normalized = chordName.trim();
        const enharmonics = {
            'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
        };
        
        for (const [flat, sharp] of Object.entries(enharmonics)) {
            if (normalized.startsWith(flat)) {
                normalized = normalized.replace(flat, sharp);
                break;
            }
        }
        
        return normalized;
    }

    /**
     * Get all available chord names
     */
    getAllChordNames() {
        return Object.keys(this.chords);
    }

    /**
     * Search for chords by partial name
     */
    searchChords(query) {
        if (!query) return [];
        
        const lowerQuery = query.toLowerCase();
        const normalizedQuery = this.normalizeChordName(query);
        
        return this.getAllChordNames().filter(name => {
            const lowerName = name.toLowerCase();
            return lowerName.includes(lowerQuery) || 
                   lowerName.includes(normalizedQuery.toLowerCase());
        }).slice(0, 10); // Limit to 10 suggestions
    }
}

