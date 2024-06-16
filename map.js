// map.js 파일 내용
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
        
        // Set CSS custom property for grid width
        gardenGrid.style.setProperty('--width', width);

        // Set up grid-template-columns and grid-template-rows
        gardenGrid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
        gardenGrid.style.gridTemplateRows = `repeat(${height}, 1fr)`;

        for (let i = 0; i < width * height; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gardenGrid.appendChild(gridItem);
        }
    }

    // Additional code for drag and drop functionality would go here
});

