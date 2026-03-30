const Question = require("../modles/Questions");
const { pickOne } = require("./questionHelpers");

async function eqp(){
    const [unitThreeCatOne, unitThreeCatTwo, unitFourCatTwo, unitFourCatOne] = await Promise.all([
        Question.find({ subject: "Engineering Mathematics-II", chapter: "Unit III", category: 1 }).lean(),
        Question.find({ subject: "Engineering Mathematics-II", chapter: "Unit III", category: 2 }).lean(),
        Question.find({ subject: "Engineering Mathematics-II", chapter: "Unit IV", category: 2 }).lean(),
        Question.find({ subject: "Engineering Mathematics-II", chapter: "Unit IV", category: 1 }).lean(),
    ]);

    return [
        pickOne(unitThreeCatOne, "Engineering Mathematics-II Unit III category 1"),
        pickOne(unitThreeCatTwo, "Engineering Mathematics-II Unit III category 2"),
        pickOne(unitFourCatOne, "Engineering Mathematics-II Unit IV category 1"),
        pickOne(unitFourCatTwo, "Engineering Mathematics-II Unit IV category 2"),
    ];
}
module.exports = eqp;
