import express from "express";//create routes like /summarize
import {summarizeNotes, generateTopics, makeQuiz} from "../services/huggingface.js"; //imports summary function

const router = express.Router();//create router

//post all tools
//asynch lets us use await
router.post("/summary", async (req, res) => {
    try {
        const {text} = req.body;//get notes
        const mysummary= await summarizeNotes(text); //get summary
        res.json({mysummary})//send back mysummary as json
    } catch (error) {
        console.error("real error", error);
        res.status(500).json({error: error.message})//set status to 500 so you mark the server error
    }
}) 
router.post("/topics", async (req, res) => {
    try {
        const {text} = req.body;//get notes
        const mytopics= await generateTopics(text); //get summary
        res.json({mytopics})
    } catch (error) {
        console.error("real error", error);
        res.status(500).json({error: error.message})//set status to 500 so you mark the server error
    }
}) 
router.post("/quiz", async (req, res) => {
    try {
        const {text} = req.body;//get notes
        const myquiz= await makeQuiz(text); //get summary
        res.json({myquiz})
    } catch (error) {
        console.error("real error", error);
        res.status(500).json({error: error.message})//set status to 500 so you mark the server error
    }
}) 


export default router;//export so it can be used in server.js