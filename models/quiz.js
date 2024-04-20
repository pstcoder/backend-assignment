const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')

const QuizSchema = new mongoose.Schema(
    {
        question:{
            type: String,
            required: true
        },
        options:[{
            type : String,
            required: true
        }],
        rightAnswer:{
            type : Number,
            required:true
        },
        startDate:{
            type: Date,
            required:true
        },
        endDate:{
            type:Date,
            default:null
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'finished'],
            default: 'inactive'
        }
    },
    {
        timestamps:true
    }
)

const Quiz = mongoose.model("Quiz",QuizSchema)

module.exports = Quiz;