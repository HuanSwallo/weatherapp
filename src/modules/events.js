import { getSuggestions } from './api.js';

let debounceTimer;

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('location');
    const suggestions = document.getElementById('suggestions');

    if (!input) return;

    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);

        const query = input.value.trim();

        if (query.length < 2) {
            suggestions.innerHTML = '';
            return;
        }

        debounceTimer = setTimeout(() => {
            getSuggestions(query);
        }, 300);
    });
});