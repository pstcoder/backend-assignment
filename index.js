const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const QuizRouter = require('./routers/quiz')
const cronJob = require('./cron')
const Auth = require('./middlewares/auth')
const { getTokens } = require('./helper')


const app = express()
app.use(express.json())
app.use(cors())


app.use("/quizzes",
    // middleware for api authorization applies to all api of Quiz Router
    Auth,
    QuizRouter
)

// user login to get the token 
app.post(
    "/login",
    (req, resp) => {
        try {
            const { username, password } = req.body;
            if (username && password) {
                if (username == "jaipur" && password == "jaipur") {

                    const token = getTokens({ username: username, password: password })
                    resp.send({
                        msg: "Login successful",
                        status: 1,
                        token
                    })
                } else {
                    resp.send({
                        msg: "Invalid credentials",
                        status: 0
                    })
                }
            } else {
                resp.send({
                    msg: "Credentials not provided",
                    status: 0
                })
            }
        } catch (err) {
            resp.send({
                msg: "Internal server error",
                status: 0
            })
        }
    }
)

// Connection with the database
mongoose.connect(
    "mongodb://localhost:27017",
    {
        dbName: "backend-assignment"
    }
)
    .then(
        (success) => {
            console.log('db connected')
            app.listen(5000, () => { console.log("Server started") })
            // cronJob starts when the server is started
            cronJob.start()
        }
    ).catch(
        (err) => {
            console.log(err)
        }
    )