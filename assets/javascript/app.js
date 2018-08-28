var questions =
    [   {   text: "If there's a bustle in your hedgerow, don't be alarmed.  It's just a spring clean for who?",
            options:
            [   "The African Queen",
                "The Queen Mary",
                "The May Queen",
                "Queen"
            ],
            answer: 2,
            explain: "'Stairway to Heaven' by Led Zeppelin was released in 1971."
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
        {   text: "One of theses is a Powerpuff Girl.  Can you pick her out?",
            options:
            [   "Butterscotch",
                "Buttercup",
                "Strawberry",
                "Daisy"
            ],
            answer: 1,
            explain: "'The Powerpuff Girls' were Bubbles, Buttercup and Blossom.  The show ran on Cartoon Network from 1998 to 2005"
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

var qIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var questionCount = 0;

// the quiz statistics
var correctAnswers = 0;
var wrongAnswers = 0;
var timedOut = 0;

// variables for the question timer
var counter = 20;                  // The count down limit -- 20 seconds
var questionInterval;              // The interval for the question timeout counter
var questionActive = false;

// Audio
var beep = new Audio("assets/audio/beep.mp3");
var buzz = new Audio("assets/audio/buzz.mp3");
var ting = new Audio("assets/audio/ting.mp3");

function randomizeIndex()
{   // randomize the order of the question index so the quiz isn't exectly the same every time

    for (var i=9; i>=0; i--)
    {
        // randomly select some index from the first i elements in the array
        var randomIndex = Math.floor(Math.random(i) * 10);

        // save the value of the element at randomIndex
        var saveIndex = qIndex[randomIndex];

        // remove the randomly selected index from qIndex
        qIndex.splice(randomIndex, 1);

        // and push the saved value to the end of qIndex
        qIndex.push(saveIndex);
    }
}

function gameOver()
{   // The game is over, display the game statistics...

    $("#game-stats").empty();

    if (timedOut > 5)
        $("#game-stats").append("<h3>Hello!  Are you awake?</h2>");
    if (correctAnswers > 8)
        $("#game-stats").append("<h3>Whoa!  You're good!</h3>");
    if (wrongAnswers > 8)
        $("#game-stats").append("<h3>Are you guessing?</h3>");

    $("#game-stats").append("<p>You got " + correctAnswers + " questions correct.</p>");
    $("#game-stats").append("<p>You got " + wrongAnswers + " questions wrong.</p>");
    $("#game-stats").append("<p>You didn't answer " + timedOut + " questions.</p>");

    // hide the quiz
    $("#quiz").css("display", "none");
    
    // display the game statistics
    $("#game-over").css("display", "block");
    
}

function countDown()
{   counter--;

    if (counter > 0)
    {   // There's nothing to do here yet
        if (counter < 4)
        {   beep.load();
            beep.play();
        }
    }
    else
    {   // Whatever else happens here...the interval should be cleared

        clearInterval(questionInterval);
      
        buzz.load();
        buzz.play();

        ++timedOut;

        // the interval timed out without the player selecting an answer -- display the answer

        $("#explanation").html("<h2>You didn't answer</h2>");
        $("#explanation").html($("#explanation").html() + "<p>The correct answer is '" + $(".click[answer=correct]").text() + "'</p>");
        $("#explanation").html($("#explanation").html() + "<p>" + questions[qIndex[questionCount - 1]].explain + "</p>");
        $(".click[answer=correct]").css("background", "#88ff88");
        $(".key[answer=correct]").css("background", "#88ff88");

        // and then do the next question or end the game
        if (questionCount < qIndex.length)
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

//     counter = 20;
    counter = 5;
    questionInterval = setInterval(countDown, 1000);
}

function displayQuestion()
{   //

    if (questionCount<0)
    {   // game over

        clearInterval(questionInterval);
    }
    else
    {   // change the question <h2> text
        $("#quiz h2").text("Question #" + (questionCount + 1));

        // Display the question
        $("#question").text(questions[qIndex[questionCount]].text);
        $("#explanation").text("");

        // randomize the answers

        var tempArray = [];
        for (var i=0; i<questions[qIndex[questionCount]].options.length; i++)
        {   tempArray[i] = questions[qIndex[questionCount]].options[i];
        };

        // save the text for the correct answer
        var saveText = questions[qIndex[questionCount]].options[questions[qIndex[questionCount]].answer];

        questionCount++;

        for (var i=0; i<4; i++)
        {   var randomIndex = Math.floor(Math.random() * tempArray.length);

            $(".click[option=" + i + "]").text(tempArray[randomIndex]);

            // create an attribute "answer" to identify the correct option

            if (tempArray[randomIndex] === saveText)
            {   $(".click[option=" + i + "]").attr("answer", "correct");
                $(".click[option=" + i + "]").css("background", "#ffff88");
                $(".key[option=" + i + "]").attr("answer", "correct");
                $(".key[option=" + i + "]").css("background", "#ffff88");
            }
            else
            {   $(".click[option=" + i + "]").attr("answer", "wrong");
                $(".click[option=" + i + "]").css("background", "#ffff88");    
                $(".key[option=" + i + "]").attr("answer", "wrong");
                $(".key[option=" + i + "]").css("background", "#ffff88");
            }

            tempArray.splice(randomIndex, 1);
        }

        // next to last...make sure the quiz is properly displayed...I can't put this in readyCount()
        // because the setTimeout() causes the script to pause after setting the display attribute to
        // show the 1st question.  The first question hasn't been set up yet (that's done here) so
        // the placeholder text appears on the screen.  This doesn't have to be done for every question,
        // but it doesn't hurt...

        // hide the introduction and game-over screen
        $("#game-over").css("display", "none");
        $("#intro").css("display", "none");
    
        // un-hide the quiz
        $("#quiz").css("display", "block");
    
        // Set up the timer

        setTimer();

        questionActive = true;
    }
}

var readyCounter = 4;

function readyCount()
{   // count down to the first question

    beep.load();
    beep.play();    
        
    $(".intro-count").text(readyCounter);
    
    if (readyCounter > 1)
        setTimeout(readyCount, 1000);
    else
        setTimeout(displayQuestion, 1000);

    readyCounter--;
}

function initReadyCount()
{   // initialize the ready counter...

    beep.load();
    beep.play();    
        
    $(".intro-count").text("GET READY!");
    
    readyCounter = 3;
    setTimeout(readyCount, 1000);
}

function newGame()
{   // hide the introduction screen
    // $("#intro").css("display", "none");

    // Initialize the game
    randomizeIndex();

    // reset game statistics
    questionCount = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    timedOut = 0;

//     // count down to the first question
//     $(".intro-count").text("Get ready!");
// 
//     readyCounter = 4;
// 
//     beep.load();
//     beep.play();    
//         
//     setTimeout(readyCount, 1000);
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

    // we have a number representing the players selection...is that selection correct?
    if ($(".click[option=" + selected + "]").attr("answer") === "correct")
    {   // the answer is correct

        ++correctAnswers;

        $("#explanation").html("<h2>Hooray!  You got this one right</h2>");
        $("#explanation").html($("#explanation").html() + "<p>" + questions[qIndex[questionCount - 1]].explain + "</p>");
        $(".click[answer=correct]").css("background", "#88ff88");
        $(".key[answer=correct]").css("background", "#88ff88");

        ting.load();
        ting.play();
    }
    else
    {   // the answer is correct

        ++wrongAnswers;

        $("#explanation").html("<h2>Oh no!  You got this one wrong!</h2>");
        $("#explanation").html($("#explanation").html() + "<p>The correct answer is '" + $(".click[answer=correct]").text() + "'</p>");
        $("#explanation").html($("#explanation").html() + "<p>" + questions[qIndex[questionCount - 1]].explain + "</p>");
        $(".click[option=" + selected + "]").css("background", "#ff8888");
        $(".click[answer=correct]").css("background", "#88ff88");
        $(".key[option=" + selected + "]").css("background", "#ff8888");
        $(".key[answer=correct]").css("background", "#88ff88");

        buzz.load();
        buzz.play();
    }

    // and then do the next question or end the game
    if (questionCount < qIndex.length)
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