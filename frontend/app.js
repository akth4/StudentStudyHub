document.addEventListener("DOMContentLoaded", () => {//make sure JS only runs after HTML is loaded
    //get diff elements
    const notesInput = document.getElementById("notes");
    const submitButton = document.getElementById("submitButton");
    const output = document.getElementById("featureOutputs");
    const topicsButton = document.getElementById("topicsBtn");
    const summaryButton = document.getElementById("summarizeBtn");
    const quizButton = document.getElementById("quizBtn");

    console.log("Button:", submitButton);
    console.log("Notes input:", notesInput);

    //add action to button
    submitButton.addEventListener("click", async () => {
        console.log("BUTTON CLICKED!") 
    })

    summaryButton.addEventListener("click", async () => {
        const notes = notesInput.value;
        try {
            const response = await fetch("http://localhost:3000/api/summary", {
                method: "POST",//tells server im sending data
                headers: { "Content-Type": "application/json"}, //says im sending JSON data specifically
                body: JSON.stringify({text:notes})//makes notes json string
            })

            const data = await response.json();//converts server response to JS object
            console.log("data = ", data);
                
            output.innerText = data.mysummary || data.error || "no response";
        } catch (error) {
            output.innerText = "ERROR: unable to summarize!"
            console.error(error)
        }
    })

    topicsButton.addEventListener("click", async () => {
        const notes = notesInput.value;
        try{
            const response = await fetch("http://localhost:3000/api/topics", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({text:notes})
            })

            const data = await response.json();//converts server response to JS object

            output.innerText = data.mytopics || data.error || "no response";
        } catch (error) {
            output.innerText = "ERROR: unable to get topics!"
            console.error(error)
        }
    })

    quizButton.addEventListener("click", async () => {
        const notes = notesInput.value;
        try{
            const response = await fetch("http://localhost:3000/api/quiz", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({text:notes})
            })

            const data = await response.json();

            output.innerText = data.myquiz || data.error || "no response";
        } catch(error) {
            output.innerText = "ERROR: unable to generate quiz!"
            console.error(error)
        }
    })

})
