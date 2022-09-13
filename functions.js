const displayController = (() => {
    const pOneButton = document.querySelector("#playerOne");
    const pTwoButton = document.querySelector("#playerTwo");
    const playersModal = document.querySelector("#playersModal");
    const closeModal = document.querySelector("#closeModal");
    const contentPlayer1 = document.querySelector("#contentPlayer1");
    const contentPlayer2 = document.querySelector("#contentPlayer2");
    const startLayout = document.querySelector(".start");
    const gameLayout = document.querySelector(".game");
    const saveSettings = document.querySelector(".save");
    const boardButton = document.querySelectorAll(".boardButton");
    const xImage = '<img src="images/x.png" />'; 
    const oImage = '<img src="images/0.png" />';
    const _showModal = (modal) => {
        modal.style.display = "block"
    }
    const _closeModal = (modal) => {
        modal.style.display = "none";
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

    const _startGame = () => {
        startLayout.style.display = "none"
        gameLayout.style.display = "grid"
        _closeModal(playersModal);
    }

    const boardButtonAction = ( button) => { 
       
        if (!button.classList.contains("selected")){
            button.innerHTML = oImage;
            button.classList.add("selected")
        } 
    }

    const _init = (() => {       
        pOneButton.addEventListener('click', () => _p1ButtonAction() );
        pTwoButton.addEventListener('click', () => _p2ButtonAction() );
        closeModal.addEventListener('click', () => _closeModal(playersModal) );
        saveSettings.addEventListener('click', () => _startGame() ); 
        boardButton.forEach((button) => { 
            button.addEventListener('click', () => boardButtonAction(button) );
        });
         
    })();   
  

})();