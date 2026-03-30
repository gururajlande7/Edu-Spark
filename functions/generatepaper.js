const Question = require("../modles/Questions");
const { pickMany } = require("./questionHelpers");

async function generateqp(){
    const [mcq, obj, gr, two, three, five] = await Promise.all([
        Question.find({ questionType: "MCQ", difficulty: "easy" }).lean(),
        Question.find({ questionType: "obj" }).lean(),
        Question.find({ questionType: "gr" }).lean(),
        Question.find({ questionType: "2m" }).lean(),
        Question.find({ questionType: "3m" }).lean(),
        Question.find({ questionType: "5m" }).lean(),
    ]);

    return [
        "MCQ",
        ...pickMany(mcq, 5, "easy MCQ"),
        "OBJ",
        ...pickMany(obj, 5, "objective questions"),
        "GIVE REASON",
        ...pickMany(gr, 3, "give reason questions"),
        "Answer The Following",
        ...pickMany(two, 5, "2 mark questions"),
        "Answer The Following",
        ...pickMany(three, 8, "3 mark questions"),
        "Answer The Following",
        ...pickMany(five, 2, "5 mark questions"),
    ];
}

module.exports = generateqp;

