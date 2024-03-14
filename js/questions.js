/**
 * - this file handles all the questions for each level
 */
window.onload = init;

const questionsRectsArr = [...document.querySelectorAll(".questionsWithRectsArr")];
const field2 = document.getElementById("field2");
const nextBtn = document.getElementById("next");
let numberOfQuestion = 0;
const questionsArray = ["Welche Dinge sind wichtig für das Spiel?",
    "Welche Dinge bewegen sich im Spiel?",
    "Welche Dinge verändern sich im Spiel?",
    "Welche Dinge treffen aufeinander im Spiel?"];

/**
 * - makes the question blink
 * - gets the question
 * - sizes the images right
 * - if it's the 3 & 4 question show the 8 rects
 * */
function init() {
    blinkingQuestion();
    document.getElementById("question").innerHTML = questionsArray.at(0);
    questionsRectsArr.forEach(e => e.style.display = 'none');
    field2.style.display = 'none';
    resizeImages();
    if (window.location.href.match("questions3.html")) {
        document.getElementById("item10").style.visibility = "hidden";
        document.getElementById("item11").style.visibility = "hidden";
        document.getElementById("item12").style.visibility = "hidden";
    }
}

/**
 * - gets all the items = images (apple, basket, rock, bush etc.) and the background-image = scene and resizes it
 * */
function resizeImages() {
    const elementsNames = [
        "item1", "item2", "item3", "item4",
        "item5", "item6", "item7", "item8",
        "item9", "item10", "item11", "item12",
        "item13", "item14", "item15", "item16", "scene"
    ];

    const factor = 5;
    const elements = elementsNames.map(e => document.getElementById(e));

    for (const e of elements) {
        if (e.alt.startsWith("Points")) {
            e.style.height = e.height / 8 + "px";
        } else if (e.id.match("scene")) {
            e.style.height = e.height / 13 + "px";
        } else {
            e.style.height = e.height / factor + "px";
        }
    }
}

/**
 * - onClick() on the "weiter" button
 * - new question blinks
 * - images go back to their start place
 * - depending on the question display other elements i.e. images and rects/arrows
 * */
function nextClick() {
    blinkingQuestion();
    resetImgs();
    /**
     * - handle question
     * */
    numberOfQuestion++;
    if (numberOfQuestion < questionsArray.length) {
        document.getElementById("question").innerHTML = questionsArray.at(numberOfQuestion);
        if (numberOfQuestion > 1) {
            questionsRectsArr.forEach(e => e.style.display = 'grid');
            field2.style.display = 'grid';
        }
    }
    /**
     * - display elements depending on which question should be displayed
     * */
    if (numberOfQuestion === 2) {
        document.getElementById("scene").style.gridArea = "row5 / line1 / row5 / line 1";
        document.getElementById("scene").style.justifySelf = "left";
        document.getElementById("field").style.gridArea = "row2 / line1 / row2 / span 4";
        document.getElementById("field2").style.gridArea = "row2 / line5 / row2 / span 4";
        document.getElementById("text1").style.display = 'none';
        if (window.location.href.match("questions3.html")) {
            document.getElementById("item10").style.visibility = "initial";
            document.getElementById("item11").style.visibility = "initial";
            document.getElementById("item12").style.visibility = "initial";
        }
        for (let i = 13; i < 17; i++) {
            document.getElementById("item" + i).style.visibility = "initial";
        }
        for (let i = 1; i < 5; i++) {
            document.getElementById("textArrow" + i).textContent = "Verändert sich zu";
        }
        document.getElementById("rectBig").style.display = 'none';
        document.getElementById("scene").style.display = 'none';

    } else if (numberOfQuestion === 3) {
        for (let i = 1; i < 5; i++) {
            document.getElementById("textArrow" + i).textContent = "Trifft auf";
        }
    } else if (numberOfQuestion === 4) {
        navCtrl.nextScreen();
    }
}

nextBtn.addEventListener("click", nextClick);

let currentLevel;
/**
 * - .object = image that needs to be dragged
 * - onDrag() light up the rects
 * - onDragEnd() get the answer so the image that is in the rect
 * */
Draggable.create(".object", {
    onDragStart: function () {
        this.inRectBig = false;
        this.currentAnswer = "";
    },
    onDrag: () => {
        if (numberOfQuestion < 2) {
            document.getElementById("rect").style.stroke = '#41A1B7';
            document.getElementById("rect").style.strokeWidth = "4px";
        } else {
            for (let i = 1; i < 9; i++) {
                document.getElementById("rect-small-" + i).style.stroke = '#41A1B7';
                document.getElementById("rect-small-" + i).style.strokeWidth = "4px";
            }
        }
    },
    onDragEnd: function () {
        if (!this.inRectBig && this.hitTest("#rectBig")) {
            this.inRectBig = true;
            gsap.to(this.target, {duration: 0.8});
            this.currentAnswer = this.target.alt;
        }
        let i = 9;
        while (--i > 0) {
            if (!this.inRectBig && this.hitTest(document.getElementById("rect-small-" + i.toString()))) {
                this.inRectBig = true;
                this.currentAnswer = +i + " " + this.target.alt;
            }
        }
        document.getElementById("rect").style.stroke = 'none';
        for (let i = 1; i < 9; i++) {
            document.getElementById("rect-small-" + i).style.stroke = 'none';
        }

        /**
         * - if image is not in a rect it goes back to its start position
         * */
        if (!this.inRectBig) {
            gsap.to(this.target, {x: 0, y: 0})
        } else {
            /**
             * - navCtrl.getScreen() === 1 = questions level 1
             * - navCtrl.getScreen() === 3 = questions level 2
             * - navCtrl.getScreen() === 5 = questions level 3
             * */
            if (navCtrl.getScreen() === 1) {
                currentLevel = 1;
            } else if (navCtrl.getScreen() === 3) {
                currentLevel = 2;
            } else if (navCtrl.getScreen() === 5) {
                currentLevel = 3;
            }
            /**
             * - save the answers in the local storage
             * - "frage" and "antworten" in german because it's the text that will be displayed in the file
             * - if question already exist write the answer their or else write the new question down
             * */
            const savedAnswers = JSON.parse(localStorage.getItem('savedAnswers')) || [];
            const existingQuestion = savedAnswers.find(e => e.frage === questionsArray[numberOfQuestion]
                && e.level === currentLevel);

            if (existingQuestion) {
                existingQuestion.antworten.push(this.currentAnswer);
            } else {
                savedAnswers.push({
                    frage: questionsArray[numberOfQuestion], level: currentLevel
                    , antworten: [this.currentAnswer]
                });
            }
            localStorage.setItem('savedAnswers', JSON.stringify(savedAnswers));
        }
    }
});

/**
 * - gsap animation moves the images back to its start place
 * */
function resetImgs() {
    gsap.to(".object", {duration: 0, x: 0, y: 0});
}


