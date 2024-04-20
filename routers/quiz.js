const {Router} = require('express')
const QuizController = require('../controllers/quiz')

const QuizRouter = Router()

// creating the quiz 
QuizRouter.post(
    "/",
    (req,resp) => {
        new QuizController().create(req.body)
        .then(
            (success) => {
                resp.send(success)
            }
        ).catch(
            (err) => {
                console.log(err);
                resp.send(err)
            }
        )
    }
)

// getting quiz that are active
QuizRouter.get(
    "/active",
    (req,resp) => {
        new QuizController().getActiveQuiz()
        .then(
            (success) => {
                resp.send(success)
            }
        ).catch(
            (err) => {
                console.log(err);
                resp.send(err)
            }
        )
    }
)

// retreiving all quizzes
QuizRouter.get(
    "/all",
    (req,resp) => {
        new QuizController().getAllQuiz()
        .then(
            (success) => {
                resp.send(success)
            }
        ).catch(
            (err) => {
                console.log(err);
                resp.send(err)
            }
        )
    }
)


QuizRouter.get(
    "/:id/result",
    (req,resp) => {
        new QuizController().quizResult(req.params.id)
        .then(
            (success) => {
                resp.send(success)
            }
        ).catch(
            (err) => {
                console.log(err);
                resp.send(err)
            }
        )
    }
)

module.exports = QuizRouter;