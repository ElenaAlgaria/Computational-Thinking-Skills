/**
 * the scoreController handels the score
 *
 * Constraints:
 * - we expect that the URI of level follow the level1, level2, level3 pattern.
 * - the current score is stored in localStorage under the key "score".
 */
let score;
const scoreKey = "score";

/**
 *  - It consists of a getter,a setter,an increment, a reset and a listener
 */
const ScoreController = () => {
    const listenerFunctions = [];
    const getScore = () => score;
    const setScore = number => score = number;
    const notifyAllObservers = () => {
        listenerFunctions.forEach(listenerFunction => listenerFunction(score));
    };
    const incrementScore = () => {
        score++;
        notifyAllObservers();
    };
    const resetScore = () => {
        score = 0;
        notifyAllObservers();
    };
    const onScoreChanged = listenerFunction => {
        listenerFunctions.push(listenerFunction);
        listenerFunction(score);
    };

    return {
        getScore,
        setScore,
        incrementScore,
        resetScore,
        onScoreChanged,
    }
};

const scoreControllerOnThisLevel = ScoreController();

/**
 * - displays score when switching to the level
 * */
const showScore = () => {
    document.getElementById(scoreKey).innerHTML = `Punkte: ${localStorage.getItem(scoreKey) ?? 0}`;
};

/**
 * - data binding: update view, when dragging apples in basket
 * */
scoreControllerOnThisLevel.onScoreChanged(score => {
        /**
         * - note for mr. gruntz: With this approach the score is undefined when switching to the level
         * - the score is taken out of the local storage and set to the controller
         * -
         * */
        if (navCtrl.getScreen() === 2 && score === undefined) {
            score = localStorage.getItem(scoreKey);
            scoreControllerOnThisLevel.setScore(score);
        } else if (navCtrl.getScreen() === 4 && score === undefined) {
            score = localStorage.getItem(scoreKey);
            scoreControllerOnThisLevel.setScore(score);
        }
        /**
         * - display score when score increments
         * - set the new value to the local storage
         * */
        document.getElementById(scoreKey).innerHTML = `Punkte: ${score ?? scoreControllerOnThisLevel.setScore(0)}`;
        localStorage.setItem(scoreKey, String(score));
    }
);

/**
 * - remove score from local storage
 * - reset the score with the controller
 * */
const removePersistentScore = () => {
    localStorage.removeItem(scoreKey);
    scoreControllerOnThisLevel.resetScore();
};

/**
 * - gets the level
 * */
const weAreInLevel = levelIndex => window.location.pathname.match("level" + levelIndex);

/**
 * - if in level one then remove the old score from the last round
 * */
if (weAreInLevel(1)) {
    removePersistentScore()
}

/**
 * - show score in each level when switching to the level
 * */
if (weAreInLevel(1) || weAreInLevel(2) || weAreInLevel(3)) {
    showScore()
}
