const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const play = document.querySelector('.play');
const game_over = document.querySelector('.game-over');
const pontos = document.querySelector('.pontos');


let isJumping = false;
let isGameOver = false;
let position = 0;
let totalPoints = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  } else if (isGameOver) {
	  game_over.style.display = 'none';
	  play.style.display = 'block';
	  isGameOver = false;
	  totalPoints = 0;
	  pontos.innerHTML = totalPoints;
	  createCactus();
  }
}

function jump() {
  isJumping = true;
//  console.log("Junping");

  let upInterval = setInterval(() => {
    if (position >= 170) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = (Math.random() * 3000) + 500;
  let overCactus = false;
  
//  let timeout = undefine;
  
//  console.log("cactus: " + randomTime);
  let timeout = setTimeout(createCactus, randomTime);
//  console.log("set timeout: " + timeout);

  if (isGameOver) {
//      background.removeChild(cactus);
    clearTimeout(timeout);
	return;
  }

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
		if (overCactus) {
			overCactus = false;
			totalPoints += 10;
			pontos.innerHTML = totalPoints;
		}
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60) {
		if (position < 60) {
		  // Game over
		  isGameOver = true;
		  
		  play.style.display = 'none';
		  game_over.style.display = 'block';
		  
	//      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
		} else {
			overCactus = true;
            cactusPosition -= 5;
            cactus.style.left = cactusPosition + 'px';
		}
    } else {
      cactusPosition -= 5;
      cactus.style.left = cactusPosition + 'px';
    }
	if (isGameOver) {
		  clearInterval(leftTimer);
		  background.removeChild(cactus);
		  if (typeof timeout === 'number') {
//			console.log("clear timeout: " + timeout);
			clearTimeout(timeout);
		  }
	}
	
  }, 20);

  
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
