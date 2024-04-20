# backend-assignment
Welcome to the Quiz Application Backend! This project provides a RESTful API for a quiz application, allowing users to create and participate in timed quizzes.

Features --
  Create a Quiz: Users can create quizzes with questions, options, and correct answers.
  Get Active Quiz: Retrieve the currently active quiz.
  Get Quiz Result: Obtain quiz results after the quiz has ended.
  Get All Quizzes: Retrieve all quizzes, including inactive and finished ones.
  
Technologies Used --
  Node.js
  Express.js
  MongoDB
  Mongoose
  Cron Job
  JWT(Json Web Tokens)

Endpoints --
Create a Quiz: POST /quizzes
Get Active Quiz: GET /quizzes/active
Get Quiz Result: GET /quizzes/:id/result
Get All Quizzes: GET /quizzes/all
