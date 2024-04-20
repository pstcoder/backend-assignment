const cron = require('node-cron');
const Quiz = require('./models/quiz');

// Cron job updating quiz status every minute
const cronJob = cron.schedule('* * * * *', async () => {
  try {
    const currentDate = new Date();

    // Finding quizzes that have started but not ended
    const activeQuizzes = await Quiz.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    // Updating status of active quizzes to 'active'
    activeQuizzes.forEach(async (quiz) => {
      quiz.status = 'active';
      await quiz.save();
    });

    // Find quizzes that have ended
    const finishedQuizzes = await Quiz.find({
      endDate: { $lt: currentDate },
    });

    // Update status of finished quizzes to 'finished'
    finishedQuizzes.forEach(async (quiz) => {
      quiz.status = 'finished';
      await quiz.save();
    });

    console.log('Quiz statuses updated successfully.');
  } catch (err) {
    console.error( err.message);
  }
});

module.exports = cronJob;
