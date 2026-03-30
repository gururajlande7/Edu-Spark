const Question = require("../modles/Questions");
const { pickMany } = require("./questionHelpers");

async function emcq(){
    const [unitThreeMcq, unitFourMcq] = await Promise.all([
        Question.find({ questionType: "MCQ", subject: "Engineering Chemistry", chapter: "Unit III" }).lean(),
        Question.find({ questionType: "MCQ", subject: "Engineering Chemistry", chapter: "Unit IV" }).lean(),
    ]);

    return [
        ...pickMany(unitThreeMcq, 10, "Engineering Chemistry Unit III MCQ"),
        ...pickMany(unitFourMcq, 10, "Engineering Chemistry Unit IV MCQ"),
    ];
}
module.exports = emcq;
