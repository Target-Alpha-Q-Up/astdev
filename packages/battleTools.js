
function checkLevelUp(level, xp) {
    const nextLevel = Math.pow((parseInt(level) + 1), 3);
    if(xp >= nextLevel) {
        return true;
    } else return false;
}

function levelCalc(xp) {
    return Math.floor(Math.cbrt(xp));
};

module.exports = { checkLevelUp, levelCalc }
