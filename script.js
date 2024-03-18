var img_current=null
let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;
function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateTimerDisplay();
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const timerElement = document.getElementById('score');
  timerElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
function pad(value) {
  return value < 10 ? '0' + value : value;
}
    const pieces = document.querySelectorAll('.puzzle-piece');
    pieces.forEach(piece => {
      piece.addEventListener('click', () => {
        if (isAdjacent(piece)) {
          swapPieces(piece);
          if (checkInitialPositions()) {
            stopTimer()
            alert('Congratulations! You solved the puzzle.');
            cinema = img_current.split('/');
            cinema=cinema[1].split('.')
            cinema  = 'video/' + cinema[0] + '.mp4'
        
            document.getElementById('source_attack').src=cinema 
        
            document.getElementById('attack-container').style.display = 'block'
            document.getElementById('puzzle-container').style.display = 'none';
            video = document.getElementById("background-attack");
            video.load();
            video.addEventListener('loadedmetadata', function() {
              // Lancer la vidéo une fois que les métadonnées sont chargées
              video.play();
            });
          }
        }
      });
    });
  
    function isAdjacent(piece) {
      const emptyPiece = document.querySelector('.empty');
      const pieceIndex = Array.from(pieces).indexOf(piece);
      const emptyIndex = Array.from(pieces).indexOf(emptyPiece);

      const adjacentIndexes = [
        pieceIndex - 1,
        pieceIndex + 1,
        pieceIndex - 4,
        pieceIndex + 4
      ];
  
      return adjacentIndexes.includes(emptyIndex);
    }
  
    function swapPieces(piece) {
      const emptyPiece = document.querySelector('.empty');
      piece.classList.add('empty');
      emptyPiece.classList.remove('empty');
      swapStyles(emptyPiece,piece)
    }
    function swapStyles(element1, element2) {
        // Stocker les styles de l'élément 1
        const tempStyles = {
            backgroundColor: getComputedStyle(element1).getPropertyValue('background-color'),
            backgroundImage: getComputedStyle(element1).getPropertyValue('background-image'),
            backgroundPosition: getComputedStyle(element1).getPropertyValue('background-position'),
            // Ajoutez d'autres propriétés de style selon vos besoins
        };
    

        // Assigner les styles de l'élément 2 à l'élément 1
        element1.style.backgroundColor = getComputedStyle(element2).getPropertyValue('background-color');
        element1.style.backgroundImage = getComputedStyle(element2).getPropertyValue('background-image');
        element1.style.backgroundPosition= getComputedStyle(element2).getPropertyValue('background-position'),
          
        // Assurez-vous d'attribuer toutes les propriétés nécessaires
    
        // Assigner les styles stockés de l'élément 1 à l'élément 2
        element2.style.backgroundColor = tempStyles.backgroundColor;
        element2.style.backgroundImage = tempStyles.backgroundImage;
        element2.style.backgroundPosition= tempStyles.backgroundPosition
        // Assurez-vous d'attribuer toutes les propriétés nécessaires
      
 }

     // Positions initiales des pièces du puzzle
     const initialPositions = {
      piece1: { x: 0, y: 0 },
      piece2: { x: -200, y: 0 },
      piece3: { x: -400, y: 0 },
      piece4: { x: -600, y: 0 },
      piece5: { x: 0, y: -200 },
      piece6: { x: -200, y: -200 },
      piece7: { x: -400, y: -200 },
      piece8: { x: -600, y: -200 },
      piece9: { x: 0, y: -400 },
      piece10: { x: -200, y: -400 },
      piece11: { x: -400, y: -400 },
      piece12: { x: -600, y: -400 },
      piece13: { x: 0, y: -600 },
      piece14: { x: -200, y: -600 },
      piece15: { x: -400, y: -600 },
      piece16: { x: -600, y: -600 }
  };

  // Fonction pour vérifier si les positions initiales correspondent aux positions actuelles
  function checkInitialPositions() {
      let allMatch = true;
      for (const pieceId in initialPositions) {
          const piece = document.getElementById(pieceId);
          const computedStyle = window.getComputedStyle(piece);
          const backgroundPosition = computedStyle.getPropertyValue('background-position');
          const currentPosition = {
              x: parseInt(backgroundPosition.split(' ')[0]),
              y: parseInt(backgroundPosition.split(' ')[1])
          };
          const initialPosition = initialPositions[pieceId];
          if (currentPosition.x !== initialPosition.x || currentPosition.y !== initialPosition.y) {
              allMatch = false;
              break;
          }
      }
      return allMatch;
  }
  function shufflePieces() {
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 100) {
        clearInterval(interval);
        
        startTimer()
        return;
      }
      
      const emptyPieceIndex = document.querySelector('.empty').id.slice(5);
      const movablePieces = getMovablePieces(emptyPieceIndex);
      const randomIndex = Math.floor(Math.random() * movablePieces.length);
      const targetPieceId = movablePieces[randomIndex];
      
      const emptyPiece = document.querySelector('.empty');
      const piece = document.getElementById(targetPieceId);
      
      emptyPiece.classList.remove('empty');
      piece.classList.add('empty');
  
      swapStyles(emptyPiece, piece);
      
      count++;
    }, 100); // Changez cette valeur pour ajuster la vitesse du mélange (en millisecondes)
  }
  
  // Fonction pour obtenir les pièces pouvant être déplacées
  function getMovablePieces(emptyIndex) {
    const emptyRow = Math.ceil(emptyIndex / 4);
    const emptyCol = emptyIndex % 4 === 0 ? 4 : emptyIndex % 4;
    const movablePieces = [];
    const pieceIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    
    for (let index of pieceIndexes) {
      const row = Math.ceil(index / 4);
      const col = index % 4 === 0 ? 4 : index % 4;
      if (row === emptyRow && Math.abs(col - emptyCol) === 1) {
        movablePieces.push('piece' + index);
      } else if (col === emptyCol && Math.abs(row - emptyRow) === 1) {
        movablePieces.push('piece' + index);
      }
    }
    
    return movablePieces;
  }
  
    

  function createpuzzle(src)
  {
    
    pieces.forEach((piece, index) => {
      if (index !== pieces.length - 1) {
        piece.style.backgroundImage = `url('${src}')`;
      }
    });
      document.getElementById('model').style.backgroundImage = `url('${src}')`;
      shufflePieces()
  }
  
  function skipVideo(src=null) {
  
  
    if (document.getElementById('video-container').style.display == 'block') {
  
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('image-container').style.display = 'block';
      document.getElementById('puzzle-container').style.display = 'none';
      document.getElementById('attack-container').style.display = 'none'
      document.getElementById('model').style.display = 'none'
      resetTimer()
  
    }
    else if (document.getElementById('image-container').style.display == 'block' && src!=null) {
  
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('image-container').style.display = 'none';
      document.getElementById('puzzle-container').style.display = '';
      document.getElementById('attack-container').style.display = 'none'
      document.getElementById('model').style.display = 'none'
      img_current=src
      createpuzzle(src)
    }
    else if (document.getElementById('attack-container').style.display == 'block') {
  
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('image-container').style.display = 'block';
      document.getElementById('puzzle-container').style.display = 'none';
      document.getElementById('attack-container').style.display = 'none'
      document.getElementById('model').style.display = 'none'
  
    }
    else if (document.getElementById('puzzle-container').style.display == ''){
      
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('image-container').style.display = 'none';
      document.getElementById('puzzle-container').style.display = 'none';
      document.getElementById('attack-container').style.display = 'none';
      document.getElementById('model').style.display = 'block'
  
    }   else if (document.getElementById('model').style.display == 'block'){
      
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('image-container').style.display = 'none';
      document.getElementById('puzzle-container').style.display = '';
      document.getElementById('attack-container').style.display = 'none';
      document.getElementById('model').style.display = 'none'
  
    }
    else{
      
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('image-container').style.display = 'block';
      document.getElementById('puzzle-container').style.display = 'none';
      document.getElementById('attack-container').style.display = 'none'
      document.getElementById('model').style.display = 'none'
     
  const timerElement = document.getElementById('score');
  timerElement.textContent = `00:00:00`;
  
    }
  }
  