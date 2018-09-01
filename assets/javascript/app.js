var questions =
    [   {   text: "If there's a bustle in your hedgerow, don't be alarmed.  It's just a spring clean for who?",
            options:
            [   "The African Queen",
                "The Queen Mary",
                "The May Queen",
                "Queen"
            ],
            answer: 2,
            explain: "Led Zeppelin released 'Stairway to Heaven' in 1971."
        },
        {   text: "Who 'jumped so high and then lightly touched down'?",
            options:
            [   "Bobby McGee",
                "The Rubber Band Man",
                "Mr. Bojangles",
                "Mikhail Barishnikov"
            ],
            answer: 2,
            explain: "'Mr. Bojangles' by the Nitty Gritty Dirt Band was released in 1970."
        },
        {   text: "According to Zager & Evans, what happens in the year 3535?",
            options:
            [   "Everything you think, do and say is in a pill",
                "You won't need your teeth or your eyes",
                "Your arms hang limp at your side because they have nothing to do",
                "You'll pick your son from the bottom of a long glass tube"
            ],
            answer: 0,
            explain: "'In the Year 2525' by Zager and Evans was released in 1969."
        },
        {   text: "Everyone knows Captain James T. Kirk.  The question is, what does the 'T' stand for?",
            options:
            [   "Theodore",
                "Tiberius",
                "Thomas",
                "Nothing, it's just a 'T'"
            ],
            answer: 1,
            explain: ""
        },
        {   text: "One of these is a Powerpuff Girl.  Can you pick her out?",
            options:
            [   "Butterscotch",
                "Buttercup",
                "Strawberry",
                "Daisy"
            ],
            answer: 1,
            explain: "'The Powerpuff Girls' was a cartoon that ran on Cartoon Network from 1998 to 2005.  Their names were Bubbles, Buttercup and Blossum"
        },
        {   text: "Which one is a daughter of Shakespeare's 'King Lear'",
            options:
            [   "Kate",
                "Regan",
                "Juliette",
                "Ophelia"
            ],
            answer: 1,
            explain: "King Lear had three daughters; Regan, Goneril and Cordelia"
        },
        {   text: "Not everyone knows, but Sherlock Holmes had a brother.  What was his name?",
            options:
            [   "Michael",
                "Mycroft",
                "Shylock",
                "Moriarty"
            ],
            answer: 1,
            explain: "'Sherlock Holmes' was created by Sir Arthur Conan Doyle and first appeared in 'A Study in Scarlet' in 1887"
        },
        {   text: "Who was the first host of the 'Tonight Show'?",
            options:
            [   "Johnny Carson",
                "Jay Leno",
                "Jack Parr",
                "Steve Allen"
            ],
            answer: 3,
            explain: "Steve Allen hosted the 'Tonight Show' from 1954 to 1957.  Other hosts were Jack Parr, Johnny Carson, Jay Leno, Conan O'Brien and Jimmy Fallon."
        },
        {   text: "Who was President of the United States at the beginning of the Great Depression?",
            options:
            [   "Woodrow Wilson",
                "James A Garfield",
                "Franklin Roosevelt",
                "Herbert Hoover"
            ],
            answer: 3,
            explain: "Herbert Hoover served fom March 1929 to March 1933.  He was replaced by Franklin Roosevelt"
        },
        {   text: "'She's real fine...' what?",
            options:
            [   "that girl of mine",
                "my 409",
                "my Clementine",
                "my valentine"
            ],
            answer: 1,
            explain: "The Beach Boys released '409' in 1962.  It was the B-side to 'Surfin' Safari'"
        }
    ];

// index array to the questions.  This lets me randomize the order of questions when the player
// replays the quiz.

var qCount = 0;
var qIndex = [];                    // An array of indices used to randomize the order of the questions
var qLength = questions.length;     // the length of the questions array.  This is used repeatedly
                                    // throughout the script 

// the quiz statistics
var correctAnswers = 0;
var wrongAnswers = 0;
var timedOut = 0;

// variables for the question timer
var defaultCounter = 15;           // used to reset the counter
var counter = 15;                  // The count down timer
var questionInterval;              // The interval for the question timeout counter
var questionActive = false;

// miscellaneous
var readyCounter = 4;

// Audio
var beep = new Audio("assets/audio/beep.mp3");
var buzz = new Audio("assets/audio/buzz.mp3");
var ting = new Audio("assets/audio/ting.mp3");

function randomizeIndex()
{   // randomize the order of the question index so the quiz isn't exectly the same every time

    // To make the application more scalable, the qIndex array is created dynamically rather than
    // hardcoding it.  This makes it possible to add or remove questions without having to change
    // any of the code.

    for (var i=0; i<qLength; i++)
    {   qIndex [i] = i;
    }

    for (var i=qLength; i>=0; i--)
    {   // randomly select some index from the first i elements in the array
        //
        // i is initialized to qLength and decrements with each iteration.  A random number from 0 to 9
        // is chosen on the first iteration, 0 to 8 on the second, and so on.
        //
        // Remove the element from qIndex at the randomly selected index and .push() that value to the
        // end of the array.  The loop iterates, the range of the random number is reduced by 1 so that
        // the next randomly selected element is one that has not been selected previously.  The values
        // pushed to the end of the array cannot be chosen again

        var randomIndex = Math.floor(Math.random() * (i));

        // save the value of the element at randomIndex
        var saveIndex = qIndex[randomIndex];

        // remove the randomly selected index from qIndex
        qIndex.splice(randomIndex, 1);

        // and push the saved value to the end of qIndex
        qIndex.push(saveIndex);
    }
}

function displayGameElements (gameElement)
{   // this function places all of the code to display or hide game elements in one place

    var theElements = ["#intro", "#quiz", "#game-over"];

    theElements.forEach (function(e)
    {   $(e).css("display", ((gameElement === e) ? "block" : "none"));
        $(e).css("display", ((gameElement === e) ? "block" : "none"));
        $(e).css("display", ((gameElement === e)  ? "block" : "none"));
    })
}

function playAudio(sound)
{   // simple function that makes sure the Audio.load() and Audio.play() methods are called
    // each time I want to play an audio.  Without Audio.load() the audio file does not always get
    // played properly.

    sound.load();
    sound.play();
}

function gameOver()
{   // The game is over, display the game statistics...

    var quizStats = $("#game-stats");
    quizStats.empty();

    if (timedOut > 5)
        quizStats.append("<h3>Hello!  Are you awake?</h2>");
    if (correctAnswers > 8)
        quizStats.append("<h3>Whoa!  You're good!</h3>");
    if (wrongAnswers > 5)
        quizStats.append("<h3>Come now, are you guessing?</h3>");

    quizStats
        .append("<p>You got " + correctAnswers + " questions correct.</p>")
        .append("<p>You got " + wrongAnswers + " questions wrong.</p>")
        .append("<p>You didn't answer " + timedOut + " questions.</p>");

    displayGameElements("#game-over");    
}

function timer()
{   // the question timer...
    
    if (counter > 0)
    {   if (counter < 4)
        {   playAudio(beep);
        }

        $(".counter")
            .text(counter + " seconds")
            .css("display", "block");
        --counter;
    }
    else
    {   // Whatever else happens here...the interval should be cleared
        clearInterval(questionInterval);
      
        playAudio(buzz);

        ++timedOut;     // increment the question timed out counter

        // hide the count down timer
        $(".counter").css("display", "none");

        // the interval timed out without the player selecting an answer -- display the answer

        $("#explanation")
            .html("<h2>You didn't answer</h2>")
            .html($("#explanation").html() + "<p>The correct answer is '" + $(".click[answer=correct]").text() + "'</p>")
            .html($("#explanation").html() + "<p>" + questions[qIndex[qCount - 1]].explain + "</p>");
        $(".click[answer=correct]").css("background", "#88ff88");
        $(".key[answer=correct]").css("background", "#88ff88");

        // and then do the next question or end the game
        if (qCount < qLength)
        {   // the quiz isn't over -- next question
            setTimeout(displayQuestion, 5000);
        }
        else
        {   // game over
            setTimeout(gameOver, 5000);
        }
    }
}

function setTimer()
{   clearInterval(questionInterval);

    counter = defaultCounter;

    questionInterval = setInterval(timer, 1000);
}

function displayQuestion()
{   // This function loads each question on the screen and performs some additional functions
    // to clean up the screen

    // I don't want .get-ready-counter on the screen any longer, but I can't hide it in readyCounter() 
    // because of the delay before executing this function.  I'll have to hide it here, even though this
    // line of code will execute each time any question is loaded -- even when .get-ready-counter is
    // already hidden.  I could code for that, but the over head to hide the element is small, so I'll
    // leave it
    $(".get-ready-counter").css("display", "none");

    if (qCount<0)
    {   // The game is over once the player responds to the last question, or the last question
        // times out.  Neither on those events occurs here, so there really isn't anything to do here

        clearInterval(questionInterval);
    }
    else
    {   // change the question <h2> text
        $("#quiz h2").text("Question #" + (qCount + 1));
        $(".counter").text(counter + " seconds");

        // Display the question
        $("#question").text(questions[qIndex[qCount]].text);
        $("#explanation").text("");

        // randomize the answers

        var tempArray = [];
        for (var i=0; i<questions[qIndex[qCount]].options.length; i++)
        {   tempArray[i] = questions[qIndex[qCount]].options[i];
        };

        // save the text of the correct answer
        var saveText = questions[qIndex[qCount]].options[questions[qIndex[qCount]].answer];

        qCount++;

        for (var i=0; i<4; i++)
        {   var randomIndex = Math.floor(Math.random() * tempArray.length);

            $(".click[option=" + i + "]").text(tempArray[randomIndex]);

            // create an attribute "answer" to identify the correct option

            if (tempArray[randomIndex] === saveText)
            {   $(".click[option=" + i + "]")
                    .attr("answer", "correct")
                    .css("background", "#ffff88");
                $(".key[option=" + i + "]")
                    .attr("answer", "correct")
                    .css("background", "#ffff88");
            }
            else
            {   $(".click[option=" + i + "]")
                    .attr("answer", "wrong")
                    .css("background", "#ffff88");    
                $(".key[option=" + i + "]")
                    .attr("answer", "wrong")
                    .css("background", "#ffff88");
            }

            tempArray.splice(randomIndex, 1);
        }

        // next to last...make sure the quiz is properly displayed...I can't put this in readyCount()
        // because the setTimeout() causes the script to pause after setting the display attribute to
        // show the 1st question.  The first question hasn't been set up yet (that's done here) so
        // the placeholder text appears on the screen.  This doesn't have to be done for every question,
        // but it doesn't hurt...

        displayGameElements("#quiz");    
    
        // Set up the timer

        setTimer();

        questionActive = true;
    }
}

function readyCount()
{   // count down to the first question

    playAudio(beep);

        
    $(".get-ready-counter")
        .text(readyCounter)
        .css("opacity", 1.0)
        .css("font-size", "50px")
        .animate({opacity: 0.1, fontSize: "20px"}, 800);
    
    if (readyCounter > 1)
    {   setTimeout(readyCount, 1000);
    }
    else
    {   // I don't need (or want) .get-ready-counter any longer, but I can't hide it here because of the
        // delay before loading the first question.  I'll have to hide it in displayQuestion() even though
        // that means hiding a hidden element every time after the first.
    
        // get the first question
        setTimeout(displayQuestion, 1000);
    }

    readyCounter--;
}

function initReadyCount()
{   // initialize the ready counter...

    playAudio(beep);

    $(".get-ready-counter")
        .css("display", "block")
        .text("GET READY!")
        .css("opacity", 1.0)
        .css("fontSize", "50px")
        .animate({opacity: 0.1, fontSize: "20px"}, 800);
    
    readyCounter = 3;
    setTimeout(readyCount, 1000);
}

function newGame()
{   // Initialize the game

    randomizeIndex();

    // reset game statistics
    qCount = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    timedOut = 0;

    initReadyCount();
}

function answerIt (selected)
{   // the event handler for responces to the quiz...whether that is a click on the actual answer, it's 
    // associated "bullet" or a keypress

    // It's possible for the player to click on options between questions (the time the answer is displayed
    // on the screen).  That's not good, so prevent it...
    if (!questionActive) return;

    questionActive = false;

    // first...if this fired, the player beat the timer...make sure of it
    clearInterval(questionInterval);

    // and hide the timer, we don't need it now
    $(".counter").css("display", "none");

    // we have a number representing the players selection...is that selection correct?
    if ($(".click[option=" + selected + "]").attr("answer") === "correct")
    {   // the answer is correct -- let the player know

        ++correctAnswers;       // increment the correct answer count

        $("#explanation")
            .html("<h2>Hooray!  You got this one right</h2>")
            .html($("#explanation").html() + "<p>" + questions[qIndex[qCount - 1]].explain + "</p>");
        $(".click[answer=correct]").css("background", "#88ff88");
        $(".key[answer=correct]").css("background", "#88ff88");

        playAudio(ting);
    }
    else
    {   // the answer is incorrect -- let the player know

        ++wrongAnswers;     // increment the wrond answer count

        $("#explanation")
            .html("<h2>Oh no!  You got this one wrong!</h2>")
            .html($("#explanation").html() + "<p>The correct answer is '" + $(".click[answer=correct]").text() + "'</p>")
            .html($("#explanation").html() + "<p>" + questions[qIndex[qCount - 1]].explain + "</p>");
        $(".click[option=" + selected + "]").css("background", "#ff8888");
        $(".click[answer=correct]").css("background", "#88ff88");
        $(".key[option=" + selected + "]").css("background", "#ff8888");
        $(".key[answer=correct]").css("background", "#88ff88");

        playAudio(buzz);
    }

    // and then do the next question or end the game
    if (qCount < qLength)
    {   // the quiz isn't over -- next question
        setTimeout(displayQuestion, 5000);
    }
    else
    {   // game over
        setTimeout(gameOver, 5000);
    }
}

$(document).ready(function()
{   // set up the event listeners

    $("#start-quiz").click(function()
    {   // what do we do when a the PLAY GAME button is clicked
        newGame();
    });

    $("#try-again").click(function()
    {   // what do we do when a the TRY AGAIN button is clicked
        newGame();
    });

    $(".click").click(function()
    {   // what do we do when an option is clicked

        answerIt($(this).attr("option"));
    });

    $(".key").click(function()
    {   // what do we do when a number is clicked (hint, it's the same as when an option is clicked)

        answerIt($(this).attr("option"));
    });

    $(document).keypress(function(event)
    {   // what do we do when a key is pressed on the keyboard

        var validKeys = [1, 2, 3, 4];

        validKeys.forEach(function(keyStroke)
        {   if (keyStroke == event.key)
            {   // do the deed
                answerIt(keyStroke-1);
            }
        })
    });
});