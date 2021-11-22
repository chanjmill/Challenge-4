var questionIndex = 0;
var score = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startQuiz");
var questions = document.querySelector("questions");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 75; 
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

var questions = 
    [
        {
            title: "One of the following asnwers is correct",
            choices: ["Not correct", "Also not correct", "Don't click this", "Correct"],
            answer: "Correct"
        },
        {
            title: "What is the capital of Idaho?",
            choices: ["Do you mean Ohio", "Potatoes", "Tater Tots", "Yes"],
            answer: "Potatoes"
        },
        {
            title: "Which dog is the goodest boy",
            choices: ["Golden retriever", "Golden Doodle", "Noodle the pug", "All of the Above"],
            answer: "All of the Above"
        }
    ];

    timer.addEventListener("click", function() {
        if (holdInterval === 0) {
            holdInterval = setInterval(function() {
                secondsLeft--;
                currentTime.textContent = "Time: " + secondsLeft;

                if (secondsLeft <= 0) {
                    clearInterval(holdInterval);
                    allDone();
                    currentTime.textContent = "Time's Up!";
                }
            }, 1000);
        }
        displayQuestion(questionIndex)
    });

    function displayQuestion(questionIndex) {
        questionsDiv.innerHTML = "";
        ulCreate.innerHTML = "";
        for (var i = 0; i < questions.length; i++) {
            var userQuestion = questions[questionIndex].title;
            var userChoices = questions[questionIndex].choices;
            questionsDiv.textContent = userQuestion;
        }

        userChoices.forEach(function (newItem) {
            var listItem = document.createElement("li");
            listItem.textContent= newItem;
            questionsDiv.appendChild(ulCreate);
            ulCreate.appendChild(listItem);
            listItem.addEventListener("click", (compare));           
        })
    };


    function compare(event) {
        var element = event.target;
        if (element.matches("li")) {
    
            var createDiv = document.createElement("div");
            createDiv.setAttribute("id", "createDiv");
            if (element.textContent == questions[questionIndex].answer) {
                score++;
                createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            } else {
                secondsLeft = secondsLeft - penalty;
                createDiv.textContent = "Incorrect! The correct answer is:  " + questions[questionIndex].answer;
            }
    
        }
        
        questionIndex++;
    
        if (questionIndex >= questions.length) {
            allDone(); 
            createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
        } else {
            displayQuestion(questionIndex);
        }
        questionsDiv.appendChild(createDiv);
    }

    function allDone() {
        questionsDiv.innerHTML = "";
        currentTime.innerHTML = "";
        var createH1 = document.createElement("h1");
        createH1.setAttribute("id", "createH1");
        createH1.textContent = "All Done!"

        questionsDiv.appendChild(createH1);

        var createP = document.createElement("p");
        createP.setAttribute("id", "createP");

        questionsDiv.appendChild(createP);

        if (secondsLeft >= 0) {
            var timeRemaining = secondsLeft;
            var createP2 = document.createElement("p");
            clearInterval(holdInterval);
            createP.textContent = "Your final score is: " + timeRemaining;

            questionsDiv.appendChild(createP2);
        }
    

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your Initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "Submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }

            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./high-scores.html");
        }
    });
}
