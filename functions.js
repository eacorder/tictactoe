 
const gameBoard = (() => {

    var f1 = [0 , 0 ,0];
    var f2 = [0 , 0 ,0];
    var f3 = [0 , 0 ,0];
    let board = [f1 , f2 ,f3] 
    let currentPlayer = 1;
    let checkFlags = 1; 
    
    const startGame = (x , y , player) => { 
       // currentPlayer == 1 ? currentPlayer = 2 : currentPlayer = 1 ;   
        if(board[x][y] == 0){
            board[x][y] = player;
           
        }
        if (checkFlags >= 5 ){
          
            if(_checkCol(y, player)) return 1;
            if(_checkRow(x,player))return  1;
            if(_checkDiagonal(x,y,player))return 1;
            if(_checkAntidiagonal(x,y,player))return 1;
            if(_checkDraw())return 1;

        } 
     
        checkFlags ++;  
    }

    const _checkRow = (x , player) => {
       
        for( i = 0; i < 3; i++){ 
            if(board[x][i] != player){
               return 0;                
            }                
            if(i == 2){   
                displayController.winingAction(player);  
               return 1;
            } 
        }
    }

    const _checkCol = (y , player) => {
        for( i = 0; i < 3; i++){
            if(board[i][y] != player)
                return 0;
            if(i == 2){
                displayController.winingAction(player);  
               return 1;
            } 
        }
    }

    const _checkDiagonal = (x , y , player) => {
        
        if(x == y){
            //we're on a diagonal
            for( i = 0; i < 3; i++){
                if(board[i][i] != player)
                   return 0;
                if(i == 2){
                    displayController.winingAction(player);  
                   return 1 
                } 
               
            }
        }
    }

    const _checkAntidiagonal = ( x, y, player) => {
        
        if(parseInt(x) + parseInt(y) == 2){
            
            for( i = 0; i < 3; i++){             
                if(board[i][(2)-i] != player)
                return 0
                if(i == 2){
                    displayController.winingAction(player);  
                    return 1;
                } 
                   
            }
        }
    }

    const _checkDraw = () => {
        if(checkFlags == 9){
            displayController.winingAction(0); 
            return 1
        }
    }


    const normalAiMovement = () => {
        const array = new Array();
        let cont = 0;  
        if ( checkFlags < 9 ) {
            for( i = 0; i < 3; i++){ 
                for ( p = 0; p < 3; p++  ) {
                    if (board[i][p] == 0 ) {                    
                        const arr = new Array(2);
                        arr[0] = i ;
                        arr[1] = p; 
                        array[cont] = arr;                   
                        cont ++;
                    }
                }
            } 
            const random = Math.floor(Math.random() * array.length);
            var aiMovement = array[random];
            return aiMovement;
        }
        else return 0;
       
    }

    const cleanBoard = () => {
        f1 = [0 , 0 ,0];
        f2 = [0 , 0 ,0];
        f3 = [0 , 0 ,0];
        board = [f1 , f2 ,f3]; 
        checkFlags = 1;
    }

    

    return { 
        startGame,
        cleanBoard,
        normalAiMovement
    }

})();

const displayController = (() => {
    const pOneButton = document.querySelector("#playerOne");
    const pTwoButton = document.querySelector("#playerTwo");
    const playersModal = document.querySelector("#playersModal"); 
    const closeModal = document.querySelector(".close");  
    const closeModal2 = document.querySelector("#close2");  
    const contentPlayer1 = document.querySelector("#contentPlayer1");
    const contentPlayer2 = document.querySelector("#contentPlayer2");
    const startLayout = document.querySelector(".start");
    const gameLayout = document.querySelector(".game");
    const saveSettings = document.querySelector(".save");
    const boardButton = document.querySelectorAll(".boardButton");
    const inputPlayer1 =  document.querySelector("#player1")  ;
    const difficulty = document.querySelector("#difficulty");
    const inputPlayer2 = document.querySelector("#player2");     
    const playerName1 = document.querySelector("#playerName1");
    const playerName2 = document.querySelector("#playerName2");
    const restartButton = document.querySelector("#restart")
    const newGameButton = document.querySelector("#newGame")
    const roundResult1 = document.querySelector("#roundResult1")
    const roundResult2 = document.querySelector("#roundResult2")
    const winnerText= document.querySelector(".winnerText")
    const imgWinner= document.querySelector(".imgWinner")
    const roundWinner = document.querySelector("#roundWinnerModal");
    const playAgainButton = document.querySelector(".playAgain"); 
    const ContinueButton = document.querySelector(".Continue"); 
    var audioWin= new Audio('sounds/win.wav');
    const firstTurn = 0 ;
    let player1 ="";
    let player2 ="";
    let currentPlayer = 1;
    let turn1 = 0;
    let turn2 = 0;
    const _showModal = (modal) => {
        modal.style.display = "block"
    }
    const _closeModal = (modal) => { 
        modal.style.display = "none";
        cleanBoxes();
        cleanScreen();

    }
    const _p1ButtonAction = () => {
        contentPlayer1.style.display = "flex";
        contentPlayer2.style.display = "none";
        _showModal(playersModal);
    }
    const _p2ButtonAction = () => {
        contentPlayer1.style.display = "none";
        contentPlayer2.style.display = "flex";
        _showModal(playersModal);
    }

    const _continue = () => {
        playAgainButton.style.display ="none"
        ContinueButton.style.display = "block"
    }

    const _playAgain = () => {
        playAgainButton.style.display ="block"
        ContinueButton.style.display = "none"
    }

    const _startGame = () => {   
        if ( inputPlayer1.value  == "" ) {
            alert("Por favor ingrese los datos")
        } 
        else
            {
                player1 =  Player(inputPlayer1.value , 1, 1);
                playerName1.innerHTML = player1.getName(); 
                if (inputPlayer2.value == "") {
                    playerName2.innerHTML = "PC (" + difficulty.value + ")"
                    player2 =  Player(playerName2.innerHTML , 2, 0 ); 
                    
                } 
                else {
                    
                    player2 =  Player(inputPlayer2.value , 2, 1 ); 
                    playerName2.innerHTML = player2.getName();
                    console.log(player2.getType())
        
                }        
                startLayout.style.display = "none"
                gameLayout.style.display = "grid"
                _closeModal(playersModal);
            }
      
       
    }

    const _aiAction = () =>{

        const movement = gameBoard.normalAiMovement();
        if (movement != 0) {
            const button = document.querySelector('[data-x="'+movement[0]+'"][data-y="'+movement[1]+'"]');
            gameBoard.startGame(movement[0],movement[1],2)
            button.classList.add("selected");
            button.innerHTML =  player2.getSign();                 
            currentPlayer = 1;     
        }         
    }
    
    const _boardButtonAction = ( button) => {  
        let win = 0;      
        if (!button.classList.contains("selected")){             
            if (currentPlayer == 1   ) {
                win = gameBoard.startGame(button.getAttribute('data-x'), button.getAttribute('data-y'), 1);
                button.classList.add("selected");
                button.innerHTML =  player1.getSign(); 
                currentPlayer = 2;   
                if ( firstTurn == 0 ) {
                    if ( win !=1  && player2.getType() == 0){
                        _aiAction();
                        firstTurn == 1;
                    }
                }            
            }
            else {
                if (player2.getType() == 0 ) {
                        _aiAction();     
                } 
                else {
                    gameBoard.startGame(button.getAttribute('data-x'), button.getAttribute('data-y'), 2);
                    button.classList.add("selected");
                    button.innerHTML =  player2.getSign(); 
                    currentPlayer = 1;             
                }
            }
        }      
    }    

    const winingAction = (player) => {
        const imgMedal = document.createElement('img');
        const imageWin = "images/medal.png";
        const imageThropy = "images/trophy.png";
        imgMedal.src = imageWin;         
        _showModal(roundWinner);   
        
        if (player == 1 &&  (turn1 < 3 || turn2 < 3) )
        {
            roundResult1.appendChild(imgMedal);
            winnerText.innerHTML = "The winner of this round is " + player1.getName();
            imgWinner.src = imageWin;
            turn1++;
            _continue();
        }
        else if (player == 0 &&  (turn1 < 3 || turn2 < 3)) {
            winnerText.innerHTML = "It's a Draw"; 
            imgWinner.src = "";
            _continue();
        }
        else if ( player == 2  &&  (turn1 < 3 || turn2 < 3) )
        {
            winnerText.innerHTML = "The winner of this round is " + player2.getName();
            roundResult2.appendChild(imgMedal);
            imgWinner.src = imageWin;
            turn2++;            
        }

        if (turn1 == 3) {
            closeModal2.style.display = "none";
            winnerText.innerHTML =   player1.getName() + " Wins the game!" ;
            imgWinner.src = imageThropy;
            roundResult1.appendChild(imgMedal);
            confetti.start();
            _playAgain();
            audioWin.play();
        }else 
        if (turn2 == 3) {
            closeModal2.style.display = "none";
            winnerText.innerHTML =  player2.getName() + " Wins the game!" ;
            imgWinner.src = imageThropy;
            roundResult2.appendChild(imgMedal);
            confetti.start()
            _playAgain();
            audioWin.play();
            
        }           
    }

    const cleanBoxes = () => {
        boardButton.forEach((button) => { 
            button.innerHTML = ""
            button.classList.remove('selected')
        }); 
    
    }

    const cleanScreen = () => {
        currentPlayer = 1;
        gameBoard.cleanBoard();
       
    }

    const restartGame = () => {
        location.reload();
        gameBoard.cleanBoard();
       
    }

    const restartRound = () => {
        cleanScreen();
        cleanBoxes();
    }

    const _init = (() => {       
        pOneButton.addEventListener('click', () => _p1ButtonAction() );
        pTwoButton.addEventListener('click', () => _p2ButtonAction() );
        closeModal.addEventListener('click', () => _closeModal(playersModal ) ); 
        closeModal2.addEventListener('click', () => _closeModal(roundWinner ) ); 
        saveSettings.addEventListener('click', () => _startGame() ); 
        boardButton.forEach((button) => { 
            button.addEventListener('click', () => _boardButtonAction(button) );
        });
        restartButton.addEventListener('click', () => restartRound());
        newGameButton.addEventListener('click', () => restartGame());
        playAgainButton.addEventListener('click', () => restartGame());
        ContinueButton.addEventListener('click', () => _closeModal(roundWinner ) ); 
    })();   

    return {
        winingAction
    }

})();

const Player = (name,sign, type) => { 
    const xImage = '<img src="images/x.png" />'; 
    const oImage = '<img src="images/0.png" />';
    let signImage = ""; 
    if  (sign == 1  ){
        signImage = xImage;
    }    
    else {
        signImage =  oImage;
    }
    const getSign = () => signImage;
    const getName  = () => name;
    const getType  = () => type;
   
    return {getSign, getName, getType};
};


/* confetti js found on CoderZ90 github publish in blogs */ 



var confetti = {
	maxCount: 150,		//set max confetti count
	speed: 2,			//set the particle animation speed
	frameInterval: 15,	//the confetti animation frame interval in milliseconds
	alpha: 1.0,			//the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
	gradient: false,	//whether to use gradients for the confetti particles
	start: null,		//call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
	stop: null,			//call to stop adding confetti
	toggle: null,		//call to start or stop the confetti animation depending on whether it's already running
	pause: null,		//call to freeze confetti animation
	resume: null,		//call to unfreeze confetti animation
	togglePause: null,	//call to toggle whether the confetti animation is paused
	remove: null,		//call to stop the confetti animation and remove all confetti immediately
	isPaused: null,		//call and returns true or false depending on whether the confetti animation is paused
	isRunning: null		//call and returns true or false depending on whether the animation is running
};

(function() {
	confetti.start = startConfetti;
	confetti.stop = stopConfetti;
	confetti.toggle = toggleConfetti;
	confetti.pause = pauseConfetti;
	confetti.resume = resumeConfetti;
	confetti.togglePause = toggleConfettiPause;
	confetti.isPaused = isConfettiPaused;
	confetti.remove = removeConfetti;
	confetti.isRunning = isConfettiRunning;
	var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
	var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
	var streamingConfetti = false;
	var animationTimer = null;
	var pause = false;
	var lastFrameTime = Date.now();
	var particles = [];
	var waveAngle = 0;
	var context = null;

	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.color2 = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = Math.random() * Math.PI;
		return particle;
	}

	function toggleConfettiPause() {
		if (pause)
			resumeConfetti();
		else
			pauseConfetti();
	}

	function isConfettiPaused() {
		return pause;
	}

	function pauseConfetti() {
		pause = true;
	}

	function resumeConfetti() {
		pause = false;
		runAnimation();
	}

	function runAnimation() {
		if (pause)
			return;
		else if (particles.length === 0) {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			animationTimer = null;
		} else {
			var now = Date.now();
			var delta = now - lastFrameTime;
			if (!supportsAnimationFrame || delta > confetti.frameInterval) {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				updateParticles();
				drawParticles(context);
				lastFrameTime = now - (delta % confetti.frameInterval);
			}
			animationTimer = requestAnimationFrame(runAnimation);
		}
	}

	function startConfetti(timeout, min, max) {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimationFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, confetti.frameInterval);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
			document.body.prepend(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
			context = canvas.getContext("2d");
		} else if (context === null)
			context = canvas.getContext("2d");
		var count = confetti.maxCount;
		if (min) {
			if (max) {
				if (min == max)
					count = particles.length + max;
				else {
					if (min > max) {
						var temp = min;
						min = max;
						max = temp;
					}
					count = particles.length + ((Math.random() * (max - min) + min) | 0);
				}
			} else
				count = particles.length + min;
		} else if (max)
			count = particles.length + max;
		while (particles.length < count)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		pause = false;
		runAnimation();
		if (timeout) {
			window.setTimeout(stopConfetti, timeout);
		}
	}

	function stopConfetti() {
		streamingConfetti = false;
	}

	function removeConfetti() {
		stop();
		pause = false;
		particles = [];
	}

	function toggleConfetti() {
		if (streamingConfetti)
			stopConfetti();
		else
			startConfetti();
	}
	
	function isConfettiRunning() {
		return streamingConfetti;
	}

	function drawParticles(context) {
		var particle;
		var x, y, x2, y2;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			x2 = particle.x + particle.tilt;
			x = x2 + particle.diameter / 2;
			y2 = particle.y + particle.tilt + particle.diameter / 2;
			if (confetti.gradient) {
				var gradient = context.createLinearGradient(x, particle.y, x2, y2);
				gradient.addColorStop("0", particle.color);
				gradient.addColorStop("1.0", particle.color2);
				context.strokeStyle = gradient;
			} else
				context.strokeStyle = particle.color;
			context.moveTo(x, particle.y);
			context.lineTo(x2, y2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle) - 0.5;
				particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= confetti.maxCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();





