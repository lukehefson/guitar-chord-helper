/**
 * Main Application - Wires everything together
 */

import { ChordParser } from './chord-parser.js';
import { ChordDatabase } from './chord-database.js';
import { FretboardRenderer } from './fretboard-renderer.js';
import { AlternativeFinder } from './alternative-finder.js';
import { PowerChordConverter } from './power-chord-converter.js';
import { MidiPlayer } from './midi-player.js';

class GuitarChordHelper {
    constructor() {
        this.db = new ChordDatabase();
        this.finder = new AlternativeFinder(this.db);
        this.midiPlayer = new MidiPlayer();
        this.settings = this.loadSettings();
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateSuggestions();
    }

    initializeElements() {
        // Input elements
        this.chordInput = document.getElementById('chordInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.suggestions = document.getElementById('suggestions');
        
        // Results elements
        this.resultsSection = document.getElementById('resultsSection');
        this.resultsTitle = document.getElementById('resultsTitle');
        this.alternativesGrid = document.getElementById('alternativesGrid');
        this.errorMessage = document.getElementById('errorMessage');
        
        // Settings elements
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettingsBtn = document.getElementById('closeSettingsBtn');
        this.powerChordMode = document.getElementById('powerChordMode');
        this.enableMidi = document.getElementById('enableMidi');
    }

    attachEventListeners() {
        // Search functionality
        this.searchBtn.addEventListener('click', () => this.searchChord());
        this.chordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchChord();
            }
        });
        this.chordInput.addEventListener('input', () => {
            this.updateSuggestions();
            this.hideError();
        });

        // Settings modal
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettings();
            }
        });

        // Settings toggles
        this.powerChordMode.addEventListener('change', () => this.saveSettings());
        this.enableMidi.addEventListener('change', () => this.saveSettings());
    }

    loadSettings() {
        const saved = localStorage.getItem('guitarChordHelperSettings');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            powerChordMode: false,
            enableMidi: true
        };
    }

    saveSettings() {
        this.settings = {
            powerChordMode: this.powerChordMode.checked,
            enableMidi: this.enableMidi.checked
        };
        localStorage.setItem('guitarChordHelperSettings', JSON.stringify(this.settings));
    }

    applySettings() {
        this.powerChordMode.checked = this.settings.powerChordMode;
        this.enableMidi.checked = this.settings.enableMidi !== false; // Default to true
    }

    openSettings() {
        this.applySettings();
        this.settingsModal.style.display = 'flex';
    }

    closeSettings() {
        this.settingsModal.style.display = 'none';
    }

    updateSuggestions() {
        const query = this.chordInput.value.trim();
        this.suggestions.innerHTML = '';

        if (query.length < 1) {
            return;
        }

        const matches = this.db.searchChords(query);
        if (matches.length > 0) {
            matches.forEach(chordName => {
                const chip = document.createElement('div');
                chip.className = 'suggestion-chip';
                chip.textContent = chordName;
                chip.addEventListener('click', () => {
                    this.chordInput.value = chordName;
                    this.searchChord();
                });
                this.suggestions.appendChild(chip);
            });
        }
    }

    searchChord() {
        const chordName = this.chordInput.value.trim();
        
        if (!chordName) {
            this.showError('Please enter a chord name');
            return;
        }

        // Parse the chord
        const parsed = ChordParser.parse(chordName);
        if (!parsed) {
            this.showError(`Invalid chord name: "${chordName}"`);
            return;
        }

        this.hideError();

        // Get alternatives or power chords
        let fingerings = [];
        
        if (this.settings.powerChordMode) {
            // Convert to power chords
            fingerings = PowerChordConverter.getPowerChordForChord(parsed);
        } else {
            // Find alternatives
            fingerings = this.finder.findAlternatives(chordName);
            
            // Also add power chord as an option
            const powerChords = PowerChordConverter.getPowerChordForChord(parsed);
            if (powerChords.length > 0) {
                fingerings.push(...powerChords);
            }
        }

        if (fingerings.length === 0) {
            this.showError(`No fingerings found for "${chordName}"`);
            return;
        }

        // Display results
        this.displayResults(chordName, fingerings);
    }

    displayResults(chordName, fingerings) {
        this.resultsTitle.textContent = this.settings.powerChordMode 
            ? `Power Chords for "${chordName}"`
            : `Easy Alternatives for "${chordName}"`;
        
        this.alternativesGrid.innerHTML = '';

        fingerings.forEach(fingering => {
            const card = this.createChordCard(fingering);
            this.alternativesGrid.appendChild(card);
        });

        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    createChordCard(fingering) {
        const card = document.createElement('div');
        card.className = 'chord-card';

        // Header with name
        const header = document.createElement('div');
        header.className = 'chord-card-header';

        const name = document.createElement('div');
        name.className = 'chord-name';
        name.textContent = fingering.name || 'Chord';

        header.appendChild(name);
        card.appendChild(header);

        // Chord diagram
        const diagram = FretboardRenderer.render(fingering, {
            showTabNotation: false,
            showFretNumbers: true
        });
        card.appendChild(diagram);

        // MIDI play button (if enabled)
        if (this.settings.enableMidi) {
            const playButton = document.createElement('button');
            playButton.className = 'play-chord-btn';
            playButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Play
            `;
            playButton.addEventListener('click', async () => {
                if (this.midiPlayer.isPlaying) {
                    return;
                }
                playButton.disabled = true;
                playButton.classList.add('playing');
                try {
                    await this.midiPlayer.playChord(fingering);
                } catch (error) {
                    console.error('Error playing chord:', error);
                } finally {
                    playButton.disabled = false;
                    playButton.classList.remove('playing');
                }
            });
            card.appendChild(playButton);
        }

        return card;
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.resultsSection.style.display = 'none';
    }

    hideError() {
        this.errorMessage.style.display = 'none';
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GuitarChordHelper();
    });
} else {
    new GuitarChordHelper();
}

