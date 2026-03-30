const Question = require("../modles/Questions");
const { pickOne } = require("./questionHelpers");

async function pps(){
    const [unitThreeQuestions, unitFourQuestions] = await Promise.all([
        Question.find({ subject: "PPS", chapter: "Unit III" }).lean(),
        Question.find({ subject: "PPS", chapter: "Unit IV" }).lean(),
    ]);

    return [
        pickOne(unitThreeQuestions, "PPS Unit III"),
        pickOne(unitFourQuestions, "PPS Unit IV"),
    ];
}
module.exports = pps;
