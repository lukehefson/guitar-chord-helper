/**
 * MIDI Player - Plays chord strums using Web Audio API
 */

export class MidiPlayer {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
    }

    /**
     * Initialize audio context (requires user interaction)
     */
    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioContext;
    }

    /**
     * Get frequency for a note on a specific string and fret
     * @param {number} stringNumber - String number (1-6, where 6 is low E)
     * @param {number} fret - Fret number (0 = open, null = muted)
     * @returns {number|null} Frequency in Hz, or null if muted
     */
    getNoteFrequency(stringNumber, fret) {
        if (fret === null || fret === undefined) {
            return null; // Muted string
        }

        // Standard guitar tuning frequencies (open strings)
        const openFrequencies = {
            6: 82.41,  // E2 (low E)
            5: 110.00, // A2
            4: 146.83, // D3
            3: 196.00, // G3
            2: 246.94, // B3
            1: 329.63  // E4 (high e)
        };

        const openFreq = openFrequencies[stringNumber];
        if (!openFreq) return null;

        // Each fret increases frequency by a semitone (12th root of 2)
        const semitoneRatio = Math.pow(2, 1/12);
        return openFreq * Math.pow(semitoneRatio, fret);
    }

    /**
     * Play a single note
     * @param {number} frequency - Frequency in Hz
     * @param {number} duration - Duration in seconds
     * @param {number} startTime - When to start (for strumming effect)
     * @param {AudioContext} audioContext - Audio context
     */
    playNote(frequency, duration, startTime, audioContext) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine'; // Use sine wave for cleaner sound

        // Envelope: quick attack, gradual decay
        const now = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now + startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, now + startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + startTime + duration);

        oscillator.start(now + startTime);
        oscillator.stop(now + startTime + duration);
    }

    /**
     * Play a chord strum
     * @param {Object} fingering - Chord fingering with frets array
     * @returns {Promise} Resolves when playback completes
     */
    async playChord(fingering) {
        if (this.isPlaying) {
            return; // Don't play if already playing
        }

        this.isPlaying = true;
        const audioContext = this.initAudioContext();

        // Resume audio context if suspended (required by some browsers)
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        const frets = fingering.frets || [];
        const strings = fingering.strings || [6, 5, 4, 3, 2, 1];
        
        // Collect notes to play
        const notes = [];
        for (let i = 0; i < 6; i++) {
            const stringNum = strings[i];
            const fret = frets[i];
            const frequency = this.getNoteFrequency(stringNum, fret);
            
            if (frequency !== null) {
                notes.push({
                    frequency,
                    stringNum,
                    index: i
                });
            }
        }

        if (notes.length === 0) {
            this.isPlaying = false;
            return;
        }

        // Strum effect: play notes with slight delay (low to high strings)
        const strumDelay = 0.03; // 30ms between strings
        const noteDuration = 0.8; // How long each note plays

        notes.forEach((note, index) => {
            const startTime = index * strumDelay;
            this.playNote(note.frequency, noteDuration, startTime, audioContext);
        });

        // Reset playing flag after all notes finish
        const totalDuration = (notes.length - 1) * strumDelay + noteDuration;
        setTimeout(() => {
            this.isPlaying = false;
        }, totalDuration * 1000);
    }

    /**
     * Stop current playback
     */
    stop() {
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        this.isPlaying = false;
    }
}

