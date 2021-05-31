let arr = ["<img id='img1' src='image/picture1.jpg'/>","<img id='img1' src='image/picture1.jpg'/>",
    "<img id='img2' src='image/picture2.png'/>","<img id='img2' src='image/picture2.png'/>",
    "<img id='img3' src='image/picture3.png'/>","<img id='img3' src='image/picture3.png'/>",
    "<img id='img4' src='image/picture4.png'/>","<img id='img4' src='image/picture4.png'/>",
    "<img id='img5' src='image/picture5.png'/>","<img id='img5' src='image/picture5.png'/>",
    "<img id='img6' src='image/picture6.png'/>","<img id='img6' src='image/picture6.png'/>",
    "<img id='img7' src='image/picture7.png'/>","<img id='img7' src='image/picture7.png'/>",
    "<img id='img8' src='image/picture8.png'/>","<img id='img8' src='image/picture8.png'/>",
    "<img id='img9' src='image/picture9.png'/>","<img id='img9' src='image/picture9.png'/>",
    "<img id='img10' src='image/picture10.png'/>","<img id='img10' src='image/picture10.png'/>"]
function shuffleImg(arr) {
    let currentIndex = arr.length, temporaryValue, randomIndex;
    while (currentIndex!==0) {
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex-=1;
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue
    }
    return arr;
}


class FlipCard {
    constructor(number) {
        this.number = number
    }
    createCard() {
        let numberOfCard = this.number;
        let str = '';
        let arrImg = shuffleImg(arr);
        for (let i = 0; i < numberOfCard; i++) {
            let srcback = arrImg[i];
            str += `<div class="flip-card">
                                <div class="flip-card-inner" id="card">
                                    <div id="front" class="flip-card-front">
                                        <img src="image/code.png" />
                                    </div>
                                    <div id="back" class="flip-card-back">
                                        ${srcback}
                                    </div>
                                </div>
                            </div>` ;
        } document.getElementById("game-board").innerHTML = str;
    }
}



let gameBoard = new FlipCard(20);
gameBoard.createCard();

