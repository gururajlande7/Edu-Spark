const Question = require("../modles/Questions");
const { pickOne } = require("./questionHelpers");

async function apm(){
    const [unitThreeCatOne, unitThreeCatTwo, unitFourCatOne, unitFourCatTwo] = await Promise.all([
        Question.find({ subject: "Applied Mechanics", chapter: "Unit III", category: 1 }).lean(),
        Question.find({ subject: "Applied Mechanics", chapter: "Unit III", category: 2 }).lean(),
        Question.find({ subject: "Applied Mechanics", chapter: "Unit IV", category: 1 }).lean(),
        Question.find({ subject: "Applied Mechanics", chapter: "Unit IV", category: 2 }).lean(),
    ]);

    return [
        pickOne(unitThreeCatOne, "Applied Mechanics Unit III category 1"),
        pickOne(unitThreeCatTwo, "Applied Mechanics Unit III category 2"),
        pickOne(unitFourCatOne, "Applied Mechanics Unit IV category 1"),
        pickOne(unitFourCatTwo, "Applied Mechanics Unit IV category 2"),
    ];
}
module.exports = apm;


    
