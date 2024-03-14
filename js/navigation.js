/**
 * - the navigationController handels the navigation of all screens
 * - It consists of a getter,a setter,an increment and a listener
 */

const NavigationController = () => {
    let screenIndex = 0;
    const listenerFunctions = [];
    const getScreen = () => screenIndex;
    const setScreen = newScreenIndex => {
        screenIndex = newScreenIndex;
        listenerFunctions.forEach(listenerFunction => listenerFunction(screenIndex));
    };
    const nextScreen = () => {
        setScreen(screenIndex + 1);
    };
    const onScreenChanged = listenerFunction => {
        listenerFunctions.push(listenerFunction);
        listenerFunction(screenIndex);
    };

    return {
        getScreen,
        setScreen,
        nextScreen,
        onScreenChanged
    }
};

const navCtrl = NavigationController();


/**
 * -  when switching between screens, us the screenIndex from the local storage
 */
const storedScreenIndex = localStorage.getItem("screenIndex");
if (storedScreenIndex) {
    navCtrl.setScreen(Number(storedScreenIndex));
}

/**
 * - data binding: update local storage
 */
navCtrl.onScreenChanged(screenIndex =>
    localStorage.setItem("screenIndex", String(screenIndex))
);

/**
 * - all the links to the screens in a list
 * - change screen if you're not already on the screen
 */
navCtrl.onScreenChanged(screenIndex => {
    const hrefs = [
        "/html/level1.html",
        "/html/questions1.html",
        "/html/level2.html",
        "/html/questions2.html",
        "/html/level3.html",
        "/html/questions3.html",
        "/html/end.html"
    ];
    if (!window.location.href.match(hrefs[screenIndex])) {
        window.location.pathname = "/ip5_ctskills" + hrefs[screenIndex];
    }
});


