let main = document.querySelector('#main')
let startGame = document.querySelector('#start')
let count = 0
let timerIntveral
let countDown = 75
let timerEl = document.querySelector('#timeEl')
let showWrongOrRight = document.querySelector("#show-right-or-wrong")
let scorekeeper = []
let questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];
timerEl.textContent = `Time: ${countDown}`
startGame.addEventListener('click', function(){
     timerIntveral = setInterval(function(){
        countDown--
        timerEl.textContent = `Time: ${countDown}`

        if(countDown <= 0){
            clearInterval(timerIntveral)
            results()
            sendMessage()
        }
    },1000)
    game()
})





let game = ()=>{
    
    main.innerHTML = ""
    const quizQuestion = document.createElement('h3')
    quizQuestion.textContent = questions[count].title
    main.appendChild(quizQuestion)
    const listAnswers = document.createElement('div')
    const ul = document.createElement('ul')
    listAnswers.appendChild(ul)
    
    


    questions[count].choices.forEach((answer)=>{
        const li = document.createElement('li')
        const quizAnswers = document.createElement('button')
        quizAnswers.setAttribute('class', 'button')
        quizAnswers.textContent = `${answer}`
        li.classList.add('list-item-button')
        li.appendChild(quizAnswers)
        ul.appendChild(li)

        

        quizAnswers.addEventListener('click', (e)=>{
            
        

            
            if(e.target.textContent === questions[count].answer){
              
               
                showWrongOrRight.innerHTML = `Previous answer was Correct! Keep it up!`
                
                
            }else{
              
                countDown-=10
                showWrongOrRight.innerHTML = `Previous answer was Wrong: the correct answer was ${questions[count].answer}`
            
            }
            count++
            if(count >= questions.length){
                results()
            }else{
            
            game()
        }
        })
        
        
    })
    main.append(listAnswers) 
    main.append(showWrongOrRight)
   
   
}




let sendMessage= ()=>{
    timerEl.textContent = 'Time is up'
}

startGame.addEventListener('click', game)


let results = ()=>{
    main.innerHTML= ''
    timerEl.innerHTML = ''
    let score

    let allDone = document.createElement('h1')
    allDone.textContent = 'ALL DONE'
    main.appendChild(allDone)

    if(countDown >= 0){
        score = countDown
        let showScore = document.createElement('p')
        clearInterval(timerIntveral)
        showScore.textContent = `Your final score is ${score}`
        main.appendChild(showScore)
    }

    let initialForm = document.createElement('form')
    initialForm.textContent = 'Enter your initials: '
    main.append(initialForm)

    let initialInput = document.createElement('input')
    initialInput.setAttribute('type', 'text')
    initialInput.textContent = ''
    
    initialForm.appendChild(initialInput)

    let submitButton = document.createElement('button')
    
    submitButton.textContent = 'Submit Name'
    initialForm.appendChild(submitButton)

    submitButton.addEventListener('click', (e)=>{
        e.preventDefault()
        let addToScore = initialInput.value
            getHighScoreList()
        if(addToScore.length > 0){
            scorekeeper.push({
                addToScore,
                score,
            })
            saveScore()
        }
        main.innerHTML= ''
        timerEl.innerHTML = ''
       renderHigh()
    })


}

let getHighScoreList = ()=>{
    const highScoreInitials = localStorage.getItem('HighScores')
    scorekeeper = highScoreInitials ? JSON.parse(highScoreInitials) : []
}

let saveScore = ()=>{
    localStorage.setItem('HighScores', JSON.stringify(scorekeeper))
}

let listOfHighScores = (scores)=> {
    const filteredScores = scores.sort((a,b)=>{
        if(a.score > b.score){
            return -1
        }else if(a.score < b.score){
            return 1
        }else{
            return 0
        }
})
console.log(scores)
console.log(filteredScores)
    if(filteredScores.length > 0){
        filteredScores.forEach((score)=>{
            
            main.appendChild(generateScoreList(score))
        })
    }else{
        const messageEL = document.createElement('p')
        messageEL.textContent = 'There are no scores'
        // messageEL.classList.add('empty-message')
        main.appendChild(messageEL)
    }

}

let generateScoreList =(score)=>{
    const scoreEl = document.createElement('label')
    const containerEl = document.createElement('div')
    containerEl.setAttribute('class', 'container')


    const scoreText = document.createElement('span')
    scoreText.textContent = `Name: ${score.addToScore.toUpperCase()}`
    containerEl.appendChild(scoreText)
    const scoreNumber = document.createElement('span')
    scoreNumber.textContent = `Score: ${score.score}`
    containerEl.appendChild(scoreNumber)

    scoreEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    scoreEl.appendChild(containerEl)

    const removeButton = document.createElement('button')
    removeButton.setAttribute('class', 'button')
    removeButton.textContent = 'X'
    removeButton.classList.add('button', 'button--text')
    scoreEl.appendChild(removeButton)
    removeButton.addEventListener('click', ()=>{
        containerEl.innerHTML = ''
        scoreEl.innerHTML   = ''
        removeScore(score.addToScore)  
        
    })


    return scoreEl

}



const removeScore = (initial) =>{
    const scoreFound = scorekeeper.findIndex((score)=>score.addToScore.includes(initial))
    
    if(scoreFound > -1){
        scorekeeper.splice(scoreFound, 1)
    }
    saveScore()
    renderHigh()

}

let renderHigh = ()=>{
    main.innerHTML = ''
    let highScore  = document.createElement('h1')
    highScore.textContent = 'High Score'
    main.appendChild(highScore)
    listOfHighScores(scorekeeper)
    let startGameOver = document.createElement('button')
    startGameOver.setAttribute('class', 'button')
    startGameOver.textContent = `Start Game Over`
    startGameOver.addEventListener('click',()=>{
        location.reload()
    })

    main.append(startGameOver)
}

