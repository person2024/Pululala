document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('gardenForm');
    const gardenGrid = document.getElementById('gardenGrid');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const width = parseInt(document.getElementById('width').value);
        const height = parseInt(document.getElementById('height').value);
        
        createGrid(width, height);
    });

    function createGrid(width, height) {
        gardenGrid.innerHTML = ''; // Clear previous grid
        
        // Set CSS custom properties for grid dimensions
        gardenGrid.style.setProperty('--width', width);
        gardenGrid.style.setProperty('--height', height);

        for (let i = 0; i < width * height; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gardenGrid.appendChild(gridItem);
        }
    }

    // Additional code for drag and drop functionality would go here
});

