/**
 * - the counterController handles the navigation of the levels
 */

let countApplesForNav = 0;

/**
 *  - It consists of a getter,a setter,an increment and a listener
 */
const CounterController = () => {
    const listenerFunctions = [];
    const getCount = () => countApplesForNav;
    const setCount = newCounterIndex => {
        countApplesForNav = newCounterIndex;
        listenerFunctions.forEach(listenerFunction => listenerFunction(countApplesForNav));
    };
    const count = () => {
        setCount(countApplesForNav + 1);
    };
    const onCountChanged = listenerFunction => {
        listenerFunctions.push(listenerFunction);
        listenerFunction(countApplesForNav);
    };

    return {
        getCount,
        setCount,
        count,
        onCountChanged
    }
};

const counterCtrl = CounterController();

/**
 * - Checks which level it is and if all apples has been put into the grass or basket
 *  - Changes the screen with the navigation controller
 */
counterCtrl.onCountChanged(countNumber => {
    if (navCtrl.getScreen() === 0 && countNumber === 6) {
        navCtrl.nextScreen();
    } else if (navCtrl.getScreen() === 2 && countNumber === 11) {
        navCtrl.nextScreen();
    } else if (navCtrl.getScreen() === 4 && countNumber === 5) {
        navCtrl.nextScreen();
    }
});