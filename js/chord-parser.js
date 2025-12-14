/**
 * Chord Parser - Parses chord names into structured data
 */

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const ENHARMONIC_EQUIVALENTS = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
};

export class ChordParser {
    /**
     * Parse a chord name into components
     * @param {string} chordName - e.g., "C#m7", "Fmaj7", "Dm"
     * @returns {Object} { root, quality, extension, bass }
     */
    static parse(chordName) {
        if (!chordName || typeof chordName !== 'string') {
            return null;
        }

        const trimmed = chordName.trim();
        if (!trimmed) return null;

        // Handle enharmonic equivalents
        let normalized = trimmed;
        for (const [flat, sharp] of Object.entries(ENHARMONIC_EQUIVALENTS)) {
            if (trimmed.startsWith(flat)) {
                normalized = trimmed.replace(flat, sharp);
                break;
            }
        }

        // Extract root note
        let root = '';
        let remaining = normalized;
        
        // Check for sharp/flat in root
        if (normalized.length > 1 && (normalized[1] === '#' || normalized[1] === 'b')) {
            root = normalized.substring(0, 2);
            remaining = normalized.substring(2);
        } else {
            root = normalized[0];
            remaining = normalized.substring(1);
        }

        // Normalize root to sharp notation
        if (ENHARMONIC_EQUIVALENTS[root]) {
            root = ENHARMONIC_EQUIVALENTS[root];
        }

        if (!NOTE_NAMES.includes(root)) {
            return null;
        }

        // Parse quality and extensions
        const quality = this.parseQuality(remaining);
        const extension = this.parseExtension(remaining);
        const bass = this.parseBass(remaining);

        return {
            root,
            quality,
            extension,
            bass,
            original: trimmed
        };
    }

    /**
     * Parse chord quality (major, minor, etc.)
     */
    static parseQuality(str) {
        const lower = str.toLowerCase();
        
        if (lower.startsWith('m') && !lower.startsWith('maj') && !lower.startsWith('min')) {
            return 'minor';
        }
        if (lower.startsWith('maj') || lower.startsWith('M')) {
            return 'major';
        }
        if (lower.startsWith('min') || lower.startsWith('m')) {
            return 'minor';
        }
        if (lower.startsWith('dim')) {
            return 'diminished';
        }
        if (lower.startsWith('aug')) {
            return 'augmented';
        }
        if (lower.startsWith('sus')) {
            return 'suspended';
        }
        
        // Default to major if no quality specified
        return 'major';
    }

    /**
     * Parse extension (7, 9, sus2, sus4, etc.)
     */
    static parseExtension(str) {
        const lower = str.toLowerCase();
        
        // Remove quality indicators
        let cleaned = lower
            .replace(/^maj/, '')
            .replace(/^min/, '')
            .replace(/^m/, '')
            .replace(/^dim/, '')
            .replace(/^aug/, '');

        // Extract numbers
        const match = cleaned.match(/(\d+)/);
        if (match) {
            return parseInt(match[1]);
        }

        // Check for sus
        if (cleaned.includes('sus2')) return 'sus2';
        if (cleaned.includes('sus4')) return 'sus4';
        if (cleaned.includes('sus')) return 'sus4'; // default sus is sus4

        // Check for add
        if (cleaned.includes('add')) {
            const addMatch = cleaned.match(/add(\d+)/);
            if (addMatch) return `add${addMatch[1]}`;
        }

        return null;
    }

    /**
     * Parse bass note (slash chords like C/E)
     */
    static parseBass(str) {
        if (!str.includes('/')) return null;
        
        const parts = str.split('/');
        if (parts.length < 2) return null;
        
        const bassStr = parts[parts.length - 1].trim();
        
        // Handle enharmonic
        let bass = bassStr;
        if (ENHARMONIC_EQUIVALENTS[bassStr]) {
            bass = ENHARMONIC_EQUIVALENTS[bassStr];
        }
        
        // Check for sharp/flat
        if (bassStr.length > 1 && (bassStr[1] === '#' || bassStr[1] === 'b')) {
            bass = bassStr.substring(0, 2);
        } else {
            bass = bassStr[0];
        }
        
        return NOTE_NAMES.includes(bass) ? bass : null;
    }

    /**
     * Get note index (0-11)
     */
    static getNoteIndex(note) {
        return NOTE_NAMES.indexOf(note);
    }

    /**
     * Get intervals for a chord
     */
    static getIntervals(root, quality, extension) {
        const intervals = {
            'major': [0, 4, 7],
            'minor': [0, 3, 7],
            'diminished': [0, 3, 6],
            'augmented': [0, 4, 8],
            'suspended': [0, 5, 7] // sus4
        };

        let baseIntervals = intervals[quality] || intervals['major'];

        // Add extensions
        if (extension) {
            if (typeof extension === 'number') {
                if (extension === 7) {
                    baseIntervals = [...baseIntervals, 10]; // minor 7th
                    if (quality === 'major') {
                        baseIntervals[baseIntervals.length - 1] = 11; // major 7th
                    }
                } else if (extension === 9) {
                    baseIntervals = [...baseIntervals, 10, 14];
                }
            }
        }

        return baseIntervals;
    }

    /**
     * Validate chord name
     */
    static isValid(chordName) {
        const parsed = this.parse(chordName);
        return parsed !== null;
    }
}

