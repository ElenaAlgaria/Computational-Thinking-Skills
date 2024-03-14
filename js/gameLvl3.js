/**
 * - this file handles the level 3 interactions
 */

const apples = [...document.querySelectorAll(".apple")];
const leafs = [...document.querySelectorAll(".leaf")];
const basket = document.getElementById("basketGame");
let number = 1;

let currentIndexApple = 0;
let currentIndexLeaf = 0;


/**
 * - Interval
 * - all 4 seconds an apple falls and all 5.5 a leaf
 */
const intervalApple = setInterval(fallingApples, 4000);

const intervalLeaf = setInterval(fallingLeafs, 5500);

/**
 * - add apple after apple to the falling class
 */
function fallingApples() {
    if (currentIndexApple < apples.length) {

        const apple = apples[currentIndexApple];
        apple.classList.add("falling");

        currentIndexApple++;

    } else {
        /**
         * - stop the interval
         */
        clearInterval(intervalApple);
    }
}

/**
 * - add leaf after leaf to the falling class
 */
function fallingLeafs() {
    if (currentIndexLeaf < leafs.length) {

        const leaf = leafs[currentIndexLeaf];
        leaf.classList.add("falling");
        currentIndexLeaf++;

    } else {
        // stop interval
        clearInterval(intervalLeaf);
    }
}

/**
 * - check if an apple is in the basket
 */
const isAppleInBasket = apple => {

    const appleRect = apple.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (appleRect.bottom < basketRect.top) return false;
    if (appleRect.left + (appleRect.width / 2) > basketRect.right) return false;
    if (appleRect.right - (appleRect.width / 2) < basketRect.left) return false;
    return appleRect.bottom > basketRect.top && appleRect.right - (appleRect.width / 2) > basketRect.left
        && appleRect.left + (appleRect.width / 2) < basketRect.right;
};

/**
 * - check if a leaf is in the basket
 */
const isLeafInBasket = leaf => {
    const leafRect = leaf.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (leafRect.top < basketRect.top) return false;
    if (leafRect.left + (leafRect.width / 2) < basketRect.left) return false;
    return leafRect.left - (leafRect.width / 2) <= basketRect.left + basketRect.width;

};

/**
 * - check if an apple is in the grass
 */
const isAppleOnGras = apple => {
    const appleRect = apple.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    return appleRect.bottom > basketRect.top && !isAppleInBasket(apple);
};

/**
 * - interval for checking if an apple is in the grass or in the basket
 */
setInterval(() => {
    const apple = apples[currentIndexApple - 1];
    const basketRect = basket.getBoundingClientRect();
    /**
     * - if apple in basket than incrementScore and apple stops falling and disappears
     * or the apple touches the grass and the svg will be switched if the spoiled apple svg
     */
    if (apple && isAppleInBasket(apple)) {
        scoreControllerOnThisLevel.incrementScore();
        apple.classList.remove("falling");
        apple.style.display = 'none';
        counterCtrl.count();
    } else if (apple && isAppleOnGras(apple)) {
        const newsvg = "<svg width=\"38\" height=\"37\" viewBox=\"0 0 38 37\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<path d=\"M0.999848 22.001C2.00181 26.501 5.39102 33.0034 10.5016 35.001C11.522 35.3988 11.5016 35.501 12.5016 35.501C13.0016 35.501 12.502 35.5114 14.5 36C15.1857 36.1677 16.6093 35.899 16.9029 36.0123C22.4997 37 26.4353 37.478 31.6756 32.3674C38.987 25.2247 38.5016 14.001 36.0016 10.501C35.5016 9.80098 34.6598 9.35798 33.911 8.83367C33.0426 8.24486 32.0929 7.78602 31.0919 7.47171C29.263 6.87072 27.0104 6.60698 23.8628 6.60698C23.759 6.60698 23.6423 6.60698 23.5385 6.60698C19.4742 2.85835 15.3315 2.54238 10.9992 3.00069C4.99964 4.50098 0.49997 11 0.999848 22.001Z\" fill=\"#A84930\"/>\n" +
            "<path d=\"M23.0957 9.255C23.126 6.21727 23.3499 3.18456 23.7659 0.175293L26.7924 1.51563C26.7924 1.51563 24.1507 4.26116 24.5225 9.95111L23.0957 9.255Z\" fill=\"#AE7461\"/>\n" +
            "<path d=\"M29.516 9.47978C29.3965 9.58816 29.2609 9.67715 29.1139 9.74352C28.7224 9.94832 28.3028 10.094 27.8687 10.1759C26.4195 10.4253 24.9285 10.2041 23.6142 9.54464C22.3247 8.87894 21.1486 8.01362 20.1293 6.9807C19.7315 6.60021 19.4245 6.27594 19.2127 6.05111C19.0923 5.94372 18.9875 5.82002 18.9014 5.68359C19.0372 5.77067 19.162 5.87373 19.2732 5.99058L20.2374 6.85531C21.2694 7.83809 22.4337 8.67196 23.6963 9.33277C24.973 9.96952 26.4121 10.2061 27.8254 10.0116C28.4082 9.90258 28.9758 9.72403 29.516 9.47978Z\" fill=\"#263238\"/>\n" +
            "<g opacity=\"0.1\">\n" +
            "<path d=\"M21.1796 9.62359C16.3414 4.98429 17.3661 4.17144 14.5038 2.85705C12.7744 2.08311 10.6644 2.51115 9.05602 3.53154C7.44761 4.55192 6.23266 6.0825 5.13444 7.64334C4.22215 8.94045 3.65142 10.7218 3.19743 12.2308C2.74345 13.7397 3.03314 15.2054 3.7206 16.6236C4.08379 17.3716 5.63166 18.6817 7.17953 18.3271C8.78794 17.9553 9.81266 16.4117 10.552 14.9374C11.2914 13.463 11.9961 11.8416 13.4013 10.9855C14.3429 10.4525 15.4353 10.2487 16.5057 10.4062C17.5635 10.5665 18.5868 10.9042 19.5323 11.4049C19.8686 11.5962 20.2336 11.732 20.6132 11.807C20.804 11.8438 21.0012 11.8283 21.1839 11.7621C21.3666 11.6958 21.528 11.5814 21.6509 11.4309C22.04 10.8861 21.6638 10.0949 21.1796 9.62359Z\" fill=\"#6F4439\"/>\n" +
            "</g>\n" +
            "<path d=\"M26.7966 1.48074C26.6841 1.73583 25.9318 1.64071 25.0973 1.26887C24.2629 0.897039 23.6921 0.404147 23.8002 0.140403C23.9083 -0.123341 24.665 -0.0152532 25.5038 0.352259C26.3426 0.719771 26.909 1.22996 26.7966 1.48074Z\" fill=\"#6F4439\"/>\n" +
            "<path d=\"M17.4727 7.58026C17.3906 8.9837 16.0414 8.41587 14.1168 7.58048C12.1921 6.7451 10.3962 5.90949 10.4783 4.50604C10.5604 3.1026 12.18 2.60134 14.1163 3.43673C16.0527 4.27211 17.5431 6.14339 17.4727 7.58026Z\" fill=\"#6F4439\"/>\n" +
            "<path d=\"M17.9787 31.7859C18.1195 32.9554 20.916 33.3453 24.2153 32.6491C27.5147 31.9529 30.11 30.3936 29.9691 29.224C29.8283 28.0545 27.052 27.6368 23.7325 28.3329C20.9746 30.9946 17.858 30.5885 17.9787 31.7859Z\" fill=\"#6F4439\"/>\n" +
            "</svg>\n";
        const svgContainer = document.getElementById(`apple${number}-spoiled`);
        svgContainer.innerHTML = newsvg;
        gsap.set(svgContainer, {x: apple.getBoundingClientRect().left, y: basketRect.bottom});
        apple.classList.remove("falling");
        apple.style.display = 'none';
        number++;
        counterCtrl.count();
    }
}, 1000 / 10);

/**
 * - check if leaf is in basket if yes stop the falling and disappear
 */
setInterval(() => {
    const leaf = leafs[currentIndexLeaf - 1];
    if (leaf && isLeafInBasket(leaf)) {
        leaf.classList.remove("falling");
        leaf.style.display = 'none';
    }
}, 1000 / 4);

/**
 * - move basket on x-axis when dragged with finger / mouse
 */
Draggable.create("#basketGame", {
    type: "x",
    bounds: "#game",
    edgeResistance: 1
});




