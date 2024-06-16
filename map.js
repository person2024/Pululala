document.addEventListener('DOMContentLoaded', () => {
  const crops = document.querySelectorAll('.crops img');
  const updateBedButton = document.getElementById('updateBed');
  const gardenBed = document.getElementById('gardenBed');

  function createGardenBed(width, height) {
      gardenBed.innerHTML = '';
      gardenBed.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
      for (let i = 0; i < width * height; i++) {
          const cell = document.createElement('div');
          cell.classList.add('bed-cell');
          cell.addEventListener('dragover', dragOver);
          cell.addEventListener('drop', drop);
          gardenBed.appendChild(cell);
      }
  }

  function dragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.src);
  }

  function dragOver(e) {
      e.preventDefault();
  }

  function drop(e) {
      e.preventDefault();
      const src = e.dataTransfer.getData('text/plain');
      e.target.innerHTML = `<img src="${src}" alt="Crop" style="max-width: 100%; max-height: 100%;">`;
  }

  crops.forEach(crop => {
      crop.draggable = true;
      crop.addEventListener('dragstart', dragStart);
  });

  updateBedButton.addEventListener('click', () => {
      const width = document.getElementById('width').value;
      const height = document.getElementById('height').value;
      createGardenBed(width, height);
  });

  // Initialize with default values
  createGardenBed(5, 1);
});
