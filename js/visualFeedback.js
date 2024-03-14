/**
 * - a file for the visual feedback so for the blinking of the apples and the basket
 */

window.onload = init;
const basketGame = document.getElementById("basketGame");
const question = document.getElementById("question");

/**
 * - checks if the apples or the basket needs to blink it depends on the elements in the svg
 */
function init() {
    if (question == null) {
        if (basketGame !== null) {
            blinkingBasketGame();
        } else {
            blinkingApple();
        }
    }
}

/**
 * - makes the question blink 3 times
 */
function blinkingQuestion() {
    const tl = new TimelineMax({repeat: 2});

    tl.to(question, 0.5, {alpha: 0, duration: 1});
    tl.to(question, 0.5, {alpha: 1, duration: 1});
}

/**
 * - makes the apples from level 1 and level 2 blink 3 times
 */
function blinkingApple() {
    const apples = [...document.querySelectorAll(".apple")];
    const applesYellow = [...document.querySelectorAll(".appleYellow")];

    const tl = new TimelineMax({repeat: 1});

    tl.to(apples, 0.5, {alpha: 0, duration: 1});
    tl.to(apples, 0.5, {alpha: 1, duration: 1});

    if (applesYellow.length > 0) {
        tl.to(applesYellow, 0.5, {alpha: 0, duration: 1});
        tl.to(applesYellow, 0.5, {alpha: 1, duration: 1});
    }
}

/**
 * - makes the basket in level 3 blink 3 times
 */
function blinkingBasketGame() {
    const tl = new TimelineMax({repeat: 2});

    tl.to(basketGame, 0.5, {alpha: 0, duration: 1});
    tl.to(basketGame, 0.5, {alpha: 1, duration: 1});
}
