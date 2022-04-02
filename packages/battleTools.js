
function checkLevelUp(level, xp) {
    const nextLevel = Math.pow((parseInt(level) + 1), 3);
    if(xp >= nextLevel) {
        return true;
    } else return false;
}

function levelCalc(xp) {
    return Math.floor(Math.cbrt(xp));
};

function inBetween(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
};

module.exports = { checkLevelUp, levelCalc, inBetween }
