
import "dotenv/config";
import fetch from "node-fetch";//lets us call the API

console.log("Current working directory:", process.cwd());
console.log("Loaded ENV keys:", Object.keys(process.env).filter(key => key.includes("HUGGING")));
console.log("HUGGINGFACE_API_KEY:", process.env.HUGGINGFACE_API_KEY);

const APIurl = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn";//for summarization
const TEXTGENurl = "https://router.huggingface.co/v1/chat/completions";// for topics and quiz functions

//make a function to ask the HF model a prompt
async function askModel(prompt) {
    const res = await fetch(TEXTGENurl, {
        method: "POST",//bc we are sending data to the server
        headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,//add api key
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "deepseek-ai/DeepSeek-R1:fastest", // Officially supported on router v1
            messages: [
                { role: "system", content: "You are a helpful study assistant." },
                { role: "user", content: prompt }
            ],
            max_tokens: 2000
        })
    });

    const data = await res.json();//convert response to js object
    console.log("full response: ",data);

    if (data.error) { throw new Error(data.error);}//if api returned error, throw exception

    if (data.choices && data.choices[0]?.message?.content) {
        let content = data.choices[0].message.content;
        content = content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
        return content;
    }

    throw new Error("Unexpected response format")//throw error if prompt response not available

}

//create summarizeNotes function
export async function summarizeNotes(text) {
    console.log("Will send", JSON.stringify({inputs:text}))
    console.log("API KEY is ", process.env.HUGGINGFACE_API_KEY)
    const res = await fetch(APIurl, {
        method:"POST", //this is a post request
        headers:{
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,//tells HF i am sending the request
            "Content-type": "application/json"//tells API we're sending json data
        },
        body:JSON.stringify({inputs:text})//converts js object to json string
    });

    const data = await res.json();//convert api response to js obj
    console.log("full response: ", data);

    if (data.error) { throw new Error(data.error);}//if api returned error, throw exception

    if (Array.isArray(data) && data[0]?.summary_text) {//safe check
        return data[0].summary_text;
    }
    
    throw new Error("unexpected response format")

}

//create generateTopics function
export async function generateTopics(text) {
    return await askModel(`Notes: ${text}
    
    Return a numbered list of the main topics to study from these notes`)
}

//create makeQuiz function
export async function makeQuiz(text) {
    return await askModel(`Notes: ${text}
    
    Return ten quiz questions with 4 answer options to chose from and only one right answer. 
    After listing out all the questions and answer options, put an answer key at the bottom.
    Follow the below format:
    
    Question: _
    Answers: 
    A)_
    B)_
    C)_
    D)_

    etc.

    Answer key: answer 1, answser 2, etc.
    `)
}