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
    console.log("Summary:", summary);

    //add action to button
    submitButton.addEventListener("click", async () => {
        console.log("BUTTON CLICKED!")

        const notes = notesInput.value;
        
        summaryButton.addEventListener("click", async () => {
            try {
                const response = await fetch("http://localhost:3000/api/summary", {
                    method: "POST",//tells server im sending data
                    headers: { "Content-Type": "application/json"}, //says im sending JSON data specifically
                    body: JSON.stringify({text:notes})
                })

                const data = await response.json();//converts server response to JS object
                if (data.error) { output.innerText = data.error;}
                else if (data.summary) { output.innerText = data.summary;}
                else { output.innerText = "no response"}
            } catch (error) {
                output.innerText = "ERROR: unable to summarize!"
                console.error(error)
            }
        })

        
    })
})
