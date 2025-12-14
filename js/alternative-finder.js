/**
 * Alternative Finder - Finds easier alternatives for chords
 */

import { ChordDatabase } from './chord-database.js';
import { ChordParser } from './chord-parser.js';

export class AlternativeFinder {
    constructor(chordDatabase) {
        this.db = chordDatabase;
    }

    /**
     * Find easier alternatives for a chord
     * @param {string} chordName - The chord to find alternatives for
     * @returns {Array} Array of alternative fingerings sorted by difficulty
     */
    findAlternatives(chordName) {
        const parsed = ChordParser.parse(chordName);
        if (!parsed) {
            return [];
        }

        const alternatives = [];

        // Get the chord from database
        const normalizedName = this.db.normalizeChordName(chordName);
        const chordData = this.db.getChord(normalizedName);

        if (chordData) {
            // Add all fingerings from the chord
            chordData.fingerings.forEach(fingering => {
                alternatives.push({
                    ...fingering,
                    source: 'direct'
                });
            });

            // Add alternative chords (e.g., Fmaj7 for F)
            if (chordData.alternatives) {
                chordData.alternatives.forEach(altName => {
                    const altChord = this.db.getChord(altName);
                    if (altChord && altChord.fingerings) {
                        altChord.fingerings.forEach(fingering => {
                            alternatives.push({
                                ...fingering,
                                name: `${fingering.name} (alternative)`,
                                source: 'alternative'
                            });
                        });
                    }
                });
            }
        }

        // Generate simplified versions
        const simplified = this.generateSimplifiedVersions(parsed, chordData);
        alternatives.push(...simplified);

        // Sort by difficulty
        alternatives.sort((a, b) => {
            const diffA = a.difficulty || 5;
            const diffB = b.difficulty || 5;
            return diffA - diffB;
        });

        // Remove duplicates (same frets)
        const unique = this.removeDuplicates(alternatives);

        return unique;
    }

    /**
     * Generate simplified versions of a chord
     */
    generateSimplifiedVersions(parsed, chordData) {
        const simplified = [];

        // If it's a complex chord, suggest the basic triad
        if (parsed.extension || parsed.quality !== 'major' && parsed.quality !== 'minor') {
            const basicName = parsed.root + (parsed.quality === 'minor' ? 'm' : '');
            const basicChord = this.db.getChord(basicName);
            
            if (basicChord && basicChord.fingerings) {
                basicChord.fingerings.forEach(fingering => {
                    simplified.push({
                        ...fingering,
                        name: `${fingering.name} (simplified)`,
                        source: 'simplified'
                    });
                });
            }
        }

        // If it's a barre chord, try to find open chord alternatives
        if (chordData && chordData.fingerings) {
            const hasBarre = chordData.fingerings.some(f => f.difficulty >= 4);
            if (hasBarre) {
                // Look for open chord version
                const openVersion = chordData.fingerings.find(f => f.difficulty <= 2);
                if (openVersion) {
                    simplified.push({
                        ...openVersion,
                        name: `${openVersion.name} (easier)`,
                        source: 'open-version'
                    });
                }
            }
        }

        return simplified;
    }

    /**
     * Remove duplicate fingerings
     */
    removeDuplicates(alternatives) {
        const seen = new Set();
        const unique = [];

        for (const alt of alternatives) {
            const key = JSON.stringify(alt.frets);
            if (!seen.has(key)) {
                seen.add(key);
                unique.push(alt);
            }
        }

        return unique;
    }

    /**
     * Calculate difficulty score for a fingering
     */
    static calculateDifficulty(fingering) {
        let score = 0;
        const frets = fingering.frets || [];
        const fingers = fingering.fingers || [];

        // Count active fingers
        const activeFingers = frets.filter(f => f !== null && f !== undefined && f !== 0).length;
        score += activeFingers * 0.5;

        // Barre penalty
        const hasBarre = this.hasBarre(fingering);
        if (hasBarre) {
            score += 2;
        }

        // Stretch penalty (fret span)
        const nonNullFrets = frets.filter(f => f !== null && f !== undefined && f !== 0);
        if (nonNullFrets.length > 0) {
            const minFret = Math.min(...nonNullFrets);
            const maxFret = Math.max(...nonNullFrets);
            const span = maxFret - minFret;
            if (span > 3) {
                score += (span - 3) * 0.5;
            }
        }

        // Open strings bonus
        const openStrings = frets.filter(f => f === 0).length;
        score -= openStrings * 0.3;

        return Math.max(1, Math.min(5, Math.round(score)));
    }

    /**
     * Check if fingering uses barre
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
                        return true;
                    }
                    fingerPositions[key] = true;
                }
            }
        }
        
        return false;
    }
}

