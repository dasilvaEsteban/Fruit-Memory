const board = document.getElementById("game-board");
      const symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥝", "🍓"];
      let cards = [...symbols, ...symbols];
      let flippedCards = [];
      let lockBoard = false;

      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      function createBoard() {
        shuffle(cards);
        cards.forEach(symbol => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.dataset.symbol = symbol;
          card.textContent = "";
          card.addEventListener("click", flipCard);
          board.appendChild(card);
        });
      }

      function flipCard() {
        if (lockBoard || this.classList.contains("flipped") || this.classList.contains("matched")) return;

        this.textContent = this.dataset.symbol;
        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
          checkMatch();
        }
      }

      function checkMatch() {
        const [first, second] = flippedCards;

        if (first.dataset.symbol === second.dataset.symbol) {
          first.classList.add("matched");
          second.classList.add("matched");
          flippedCards = [];
        } else {
          lockBoard = true;
          setTimeout(() => {
            first.classList.remove("flipped");
            second.classList.remove("flipped");
            first.textContent = "";
            second.textContent = "";
            flippedCards = [];
            lockBoard = false;
          }, 1000);
        }
      }

      createBoard();