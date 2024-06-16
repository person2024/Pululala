// map.js

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('updateBed').addEventListener('click', function() {
        let widthInput = document.getElementById('width');
        let heightInput = document.getElementById('height');
        
        let width = parseInt(widthInput.value);
        let height = parseInt(heightInput.value);
        
        if (!isNaN(width) && !isNaN(height) && width >= 1 && width <= 10 && height >= 1 && height <= 10) {
            generateGrid(width, height);
        } else {
            alert('Please enter valid width and height (1-10).');
        }
    });
});

function generateGrid(width, height) {
    let gardenBed = document.getElementById('gardenBed');
    gardenBed.innerHTML = ''; // Clear previous grid if any
    
    for (let i = 0; i < height; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        
        for (let j = 0; j < width; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        
        gardenBed.appendChild(row);
    }
}
