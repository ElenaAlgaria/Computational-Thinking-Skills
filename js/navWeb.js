/**
 * - An attempt to stop the accidentally reloading and movement of the whole screen when touching it
 * - from the internet because of that not mentioned in the documentation
 **/

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }
    const xDiff = xDown - evt.touches[0].clientX;
    const yDiff = yDown - evt.touches[0].clientY;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /**
         * - prevent page changes
         */
        evt.preventDefault();
    } else {
        /**
         * - prevent dragging down
         */
        evt.preventDefault();
    }

    /**
     * - Resetting the starting positions for the next touch
     */
    xDown = null;
    yDown = null;
}