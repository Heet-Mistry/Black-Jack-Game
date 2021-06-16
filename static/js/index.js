function ageInDays() {
    //onReset();
    var birthYear = prompt('Enter your birth year');
    var days = (2021 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode(`You are ${days} days old`);
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function onReset() {

    document.getElementById('ageInDays').remove();
}

function generateCat() {
    var img = document.createElement('img');
    var div = document.getElementById('generatedCat');
    img.setAttribute('src', 'http://api.thecatapi.com/api/images/get?format=src&type=gif&size=small');
    div.appendChild(img);
}

function rpsGame(yourChoice) {
    //console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt());
    //alert(botChoice);

    var results = decideWinner(yourChoice.id, botChoice);
    //alert(results)

    message = finalMessage(results);
    //console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);


}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, botChoice) {
    var rpsDatabase = {
        'rock': {
            'scissors': 1,
            'rock': 0.5,
            'paper': 0
        },
        'paper': {
            'rock': 1,
            'paper': 0.5,
            'scissors': 0
        },
        'scissors': {
            'paper': 1,
            'scissors': 0.5,
            'rock': 0
        },
    }
    var yourScore = rpsDatabase[yourChoice][botChoice];
    var computerScore = rpsDatabase[botChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {
            'message': 'You lost!',
            'color': 'red'
        };
    } else if (yourScore === 0.5) {
        return {
            'message': 'You tied!',
            'color': 'yellow'
        };
    } else {
        return {
            'message': 'You won!',
            'color': 'green'
        };
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messsageDiv = document.createElement('div');

    humanDiv.innerHTML = " <img src='" + imagesDatabase[humanImageChoice] + " ' height=150 width=150 style='box-shadow: 0 10px 50px rgba(37,50,233,1)';>"
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);

    messsageDiv.innerHTML = " <h1 style='color: " + finalMessage['color'] + " ; font-size:60px ;  padding:30px;' >" + finalMessage['message'] + "<\h1>"
    document.getElementById('flex-box-rps-div').appendChild(messsageDiv);

    botDiv.innerHTML = " <img src='" + imagesDatabase[botImageChoice] + " ' height=150 width=150 style='box-shadow: 0 10px 50px rgba(243,38,233,1)';>"
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];

for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    // console.log(buttonThingy.value);
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else {
        randomColors();
    }
}

function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');

    }
}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');

    }
}

function buttonColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    var randomColor = ['btn-danger', 'btn-success', 'btn-primary', 'btn-warning']
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(randomColor[Math.floor(Math.random() * 4)]);
    }
}

let blackjackGame = {
    'you': {
        'scorespan': '#your-blackjack-result',
        'div': '#your-box',
        'score': 0
    },
    'dealer': {
        'scorespan': '#dealer-blackjack-result',
        'div': '#dealer-box',
        'score': 0
    },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'K': 10,
        'Q': 10,
        'J': 10,
        'A': [1, 11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitAudio = new Audio('sounds/swish.m4a');
const winAudio = new Audio('sounds/cash.mp3');
const lossAudio = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        //console.log(card);
        showCard(YOU, card);
        updateScore(card, YOU);
        console.log(YOU['score']);
        showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(activePlayer, card) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = 'images/' + card + '.png';
        cardImage.style.width = '100px';
        cardImage.style.height = 'auto';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitAudio.play();
    }
}

function blackjackDeal() {

    if (blackjackGame['turnOver']) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        //console.log(yourImages);

        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scorespan']).textContent = 0;
        document.querySelector(YOU['scorespan']).style.color = 'white';

        document.querySelector(DEALER['scorespan']).textContent = 0;
        document.querySelector(DEALER['scorespan']).style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnOver'] = false;
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scorespan']).textContent = 'BUST!'
        document.querySelector(activePlayer['scorespan']).style.color = 'red'

    } else {
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function dealerLogic() {

    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

// compute the winner
// update the wins and loss of a player

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }

        // condition when you bust but dealer doesn't bust
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        //console.log('YOU LOST');
        winner = DEALER;

        // when both of you bust
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        //console.log('YOU DREW!');
    }

    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnOver'] === true) {

        // alert('we are here')
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won';
            messageColor = 'green';
            winAudio.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost';
            messageColor = 'red';
            lossAudio.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Drew';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }

}