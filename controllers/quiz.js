const Quiz = require("../models/quiz");

class QuizController {
    create({ question, options, rightAnswer, startDate, endDate }) {
        return new Promise(
            (res, rej) => {
                try {
                    if (!question || !options || rightAnswer == null || rightAnswer == undefined || !startDate || !endDate) {
                        console.log(question, options, rightAnswer, startDate, endDate);
                        rej({
                            msg: "Missing required fields.",
                            status: 0
                        })
                    } else {
                        // checking if endDate falls before the start Date
                        if(new Date(startDate) > new Date(endDate)){
                            rej({
                                msg:"Start date is falling after the end date",
                                status:0
                            })
                        }
                        // checking weather quiz is starting after the current date
                        else if(new Date(startDate) < new Date()){
                            rej({
                                msg: "Quiz cannot start before the current date",
                                status:0
                            })
                        }
                        else{

                            const quiz = new Quiz({
                                question: question,
                                options: options,
                                rightAnswer: rightAnswer,
                                startDate: startDate,
                                endDate: endDate
                            })
                            quiz.save()
                            .then(
                                (success) => {
                                    res({
                                        msg: "Quiz added",
                                        status: 1
                                    })
                                }
                            ).catch(
                                (err) => {
                                    console.log(err);
                                    rej({
                                        msg: "Unable to add quiz",
                                        status: 0
                                    })
                                }
                            )
                        }
                    }
                } catch (err) {
                    console.log(err);
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
    getActiveQuiz() {
        return new Promise(
            async (res, rej) => {
                try {
                    const activeQuiz = await Quiz.findOne({ status: "active" })
                    if (activeQuiz) {
                        res({
                            msg: "Active quiz found",
                            status: 1,
                            activeQuiz
                        })
                    } else {
                        rej({
                            msg: "No active quiz found",
                            status: 0
                        })
                    }
                } catch (err) {
                    console.log(err);
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
    getAllQuiz() {
        return new Promise(
            async (res, rej) => {
                try {
                    const allQuizzes = await Quiz.find()
                    if (allQuizzes) {
                        res({
                            msg: "Quizzes found",
                            status: 1,
                            totalQuizzes: allQuizzes.length,
                            allQuizzes
                        })
                    } else {
                        rej({
                            msg: "No quiz found",
                            status: 0
                        })
                    }
                } catch (err) {
                    console.log(err);
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
    quizResult(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    //finding the quiz with respective id
                    const quiz = await Quiz.findOne({_id : id});

                    if (!quiz) {
                        rej({
                            msg: "Quiz not found",
                            status: 0
                        });
                    } else {
                        // Checking if the current time is 5 minutes after the quiz's end time
                        const currentTime = new Date();
                        const quizEndTime = new Date(quiz.endDate);
                        const fiveMinutesAfterEndTime = new Date(quizEndTime.getTime() + 5 * 60000);

                        if (currentTime < fiveMinutesAfterEndTime) {
                            rej({
                                msg: "Quiz result is not available yet",
                                status: 0
                            });
                        } else {
                            const quizResult = {
                                correctAnswer: quiz.options[quiz.rightAnswer],
                                question: quiz.question
                            };

                            res({
                                msg:"Quiz result",
                                quizResult,
                                status:1
                            });
                        }
                    }
                } catch (error) {
                    console.error(error);
                    rej({
                        msg: "Internal server error",
                        status:0
                    });
                }

            }
        )
    }
}

module.exports = QuizController;