/**
 * - this file handles the drag and drop of apples
 */

let containerSpoiledAppleNumber = 1;
let draggedApple;
/**
 * - init variables
 * */
const initialize = apple => {
    draggedApple = apple;
    draggedApple.inbasket = false;
    draggedApple.ongrass = false;

};
/**
 * - Methods to check if an apple is in the grass, on the tree or in the basket
 * - sets boolean
 * */
const isInBasket = () => draggedApple.inbasket;
const isOnGrass = () => draggedApple.ongrass;
const isOnTree = () => !isInBasket() && !isOnGrass();

/**
 * - Methods to check if an apple is collided with the grass or the basket
 * - sets boolean
 * - executes method
 * */
const isCollidedWithBasket = hitTestSelector => {
    if (isOnTree() && draggedApple.hitTest(hitTestSelector)) {
        onCollisionWithBasket();
        draggedApple.inbasket = true;
    }
};
const isCollidedWithGrass = spoiledAppleColor => {
    if (isOnTree() && draggedApple.hitTest(".grass")) {
        onCollisionWithGrass(spoiledAppleColor);
        draggedApple.ongrass = true;
    }
};

/**
 * - when apple is collided with basket, gsap animation
 * - increases the score
 * - counts the apple for the nav
 * */
const onCollisionWithBasket = () => {
    gsap.to(draggedApple.target, {duration: 0.8, opacity: 0, scale: 1, svgOrigin: "675 600"});
    scoreControllerOnThisLevel.incrementScore();
    counterCtrl.count();
};
/**
 * - when collided with grass it generates the spoiled apple svg and puts it into the grass at the right position
 * - counts apple
 * */
const onCollisionWithGrass = spoiledAppleColor => {
    const applePosition = draggedApple.target.getBoundingClientRect();
    const appleX = applePosition.x;
    const appleY = applePosition.y;
    const newsvg = generateSvg(spoiledAppleColor);
    const svgContainer = document.getElementById(`apple${containerSpoiledAppleNumber}-spoiled`);
    svgContainer.innerHTML = newsvg;
    gsap.set(svgContainer, {x: appleX, y: appleY});
    gsap.to(draggedApple.target, {duration: 0, opacity: 0, scale: 1});
    containerSpoiledAppleNumber++;
    counterCtrl.count();
};

/**
 * - if the apple collides with wrong basket it goes back to its position at the tree with a gsap animation
 * */
const isCollidedWithWrongBasket = hitTestSelector => {
    const wrongBasket = hitTestSelector === ".basket" ? "#basketYellow" : ".basket";

    if (isOnTree() && draggedApple.hitTest(wrongBasket)) {
        draggedApple.inbasket = true;
        if (navCtrl.getScreen() === 0) {
            gsap.to(draggedApple.target, {x: 0, y: 0});
        } else {
            gsap.to(draggedApple.target, {x: 120, y: 0});
        }
    }
}
/**
 * - generates red and yellow svg for spoiled apples
 * */
const generateSvg = spoiledAppleColor => {
    if (spoiledAppleColor === "#A84930") {
        return "<svg width=\"38\" height=\"37\" viewBox=\"0 0 38 37\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
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
    } else if ("#A7991B") {
        return "<svg width=\"37\" height=\"37\" viewBox=\"0 0 37 37\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<path d=\"M0.0379343 22.0063C1.03989 26.5063 4.42911 33.0088 9.53971 35.0063C10.5601 35.4041 10.5397 35.5063 11.5397 35.5063C12.0397 35.5063 11.5401 35.5168 13.5381 36.0054C14.2238 36.1731 15.6474 35.9043 15.941 36.0176C21.5378 37.0054 25.4734 37.4834 30.7137 32.3728C38.0251 25.2301 37.5397 14.0063 35.0397 10.5063C34.5397 9.80635 33.6978 9.36335 32.9491 8.83904C32.0807 8.25023 31.131 7.79139 30.13 7.47708C28.3011 6.87609 26.0485 6.61235 22.9008 6.61235C22.7971 6.61235 22.6803 6.61235 22.5766 6.61235C18.5123 2.86372 14.3696 2.54775 10.0373 3.00606C4.03773 4.50635 -0.461944 11.0054 0.0379343 22.0063Z\" fill=\"#A7991B\"/>\n" +
            "<path d=\"M22.1338 9.26037C22.1641 6.22264 22.388 3.18993 22.804 0.180664L25.8305 1.521C25.8305 1.521 23.1888 4.26653 23.5606 9.95648L22.1338 9.26037Z\" fill=\"#AE7461\"/>\n" +
            "<path d=\"M28.5541 9.48515C28.4346 9.59353 28.299 9.68252 28.152 9.74889C27.7605 9.95369 27.3409 10.0994 26.9067 10.1813C25.4576 10.4307 23.9666 10.2095 22.6523 9.55001C21.3628 8.88432 20.1867 8.01899 19.1674 6.98607C18.7696 6.60558 18.4626 6.28131 18.2508 6.05648C18.1304 5.9491 18.0256 5.82539 17.9395 5.68896C18.0752 5.77604 18.2001 5.87911 18.3113 5.99595L19.2755 6.86068C20.3075 7.84347 21.4717 8.67733 22.7344 9.33815C24.0111 9.97489 25.4502 10.2115 26.8635 10.017C27.4463 9.90795 28.0138 9.7294 28.5541 9.48515Z\" fill=\"#263238\"/>\n" +
            "<g opacity=\"0.1\">\n" +
            "<path d=\"M20.2177 9.62896C15.3795 4.98966 16.4042 4.17681 13.5419 2.86242C11.8125 2.08848 9.70251 2.51652 8.09411 3.53691C6.4857 4.55729 5.27074 6.08787 4.17253 7.64872C3.26024 8.94582 2.68951 10.7272 2.23552 12.2361C1.78153 13.7451 2.07122 15.2108 2.75869 16.629C3.12188 17.377 4.66974 18.687 6.21762 18.3325C7.82603 17.9607 8.85074 16.4171 9.59009 14.9427C10.3294 13.4684 11.0342 11.847 12.4394 10.9909C13.381 10.4579 14.4734 10.254 15.5438 10.4115C16.6016 10.5719 17.6249 10.9095 18.5704 11.4103C18.9067 11.6016 19.2717 11.7374 19.6513 11.8124C19.8421 11.8492 20.0393 11.8337 20.222 11.7674C20.4047 11.7012 20.566 11.5868 20.689 11.4362C21.0781 10.8915 20.7019 10.1002 20.2177 9.62896Z\" fill=\"#6F4439\"/>\n" +
            "</g>\n" +
            "<path d=\"M25.8346 1.48611C25.7222 1.7412 24.9699 1.64608 24.1354 1.27425C23.301 0.90241 22.7302 0.409518 22.8383 0.145774C22.9464 -0.11797 23.7031 -0.0098821 24.5419 0.35763C25.3806 0.725142 25.9471 1.23534 25.8346 1.48611Z\" fill=\"#6F4439\"/>\n" +
            "<path d=\"M16.5108 7.58563C16.4286 8.98907 15.0795 8.42124 13.1549 7.58585C11.2302 6.75047 9.43424 5.91486 9.51639 4.51141C9.59853 3.10797 11.218 2.60671 13.1544 3.4421C15.0908 4.27748 16.5812 6.14876 16.5108 7.58563Z\" fill=\"#6F4439\"/>\n" +
            "<path d=\"M17.0168 31.7912C17.1576 32.9608 19.9541 33.3506 23.2534 32.6545C26.5528 31.9583 29.1481 30.3989 29.0072 29.2294C28.8664 28.0599 26.0901 27.6421 22.7706 28.3383C20.0127 31 16.8961 30.5939 17.0168 31.7912Z\" fill=\"#6F4439\"/>\n" +
            "</svg>\n";
    }
};

/**
 * - explanation for mr. gruntz: .apple is standing for apple red (for us an apple is red)
 * - .basket because basket occurs several times in the levels
 * - #basketYellow occurs just in Level 2
 * */
initializeDraggable(".apple", ".basket", "#A84930");
initializeDraggable(".appleYellow", "#basketYellow", "#A7991B");


/**
 * - selector = apple
 * - hitTestSelector = the basket or the grass
 * - onDragStart() init of apple, basket and grass
 * - onDrag() test if apple collides with grass or basket or in level 2 with the wrong basket
 * - onDragEnd() if apple is no longer dragged and not in the grass or in the basket than it goes back to its
 *   position on the tree
 * */
function initializeDraggable(selector, hitTestSelector, spoiledAppleColor) {
    Draggable.create(selector, {
        bounds: "svg",
        onDragStart: function () {
            initialize(this);
        },
        onDrag: () => {
            isCollidedWithBasket(hitTestSelector);
            isCollidedWithGrass(spoiledAppleColor);
            if (navCtrl.getScreen() === 2) {
                isCollidedWithWrongBasket(hitTestSelector);
            }
        },
        onDragEnd: function () {
            if (isOnTree()) {
                if (navCtrl.getScreen() === 0) {
                    gsap.to(this.target, {x: 0, y: 0});
                } else {
                    gsap.to(this.target, {x: 120, y: 0});
                }
            }
        }
    })
}