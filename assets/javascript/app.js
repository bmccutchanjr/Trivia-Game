var questions = [{ text: "If there's a bustle in your hedgerow, don't be alarmed.  It's just a spring clean for who?",
                   options: ["The African Queen",
                             "The Queen Mary",
                             "The May Queen",
                             "Queen"
                            ],
                   answer: 2
                 },
                 { text: "Placeholder for question #2",
                   options: ["Option 1",
                             "Option 2",
                             "Option 3",
                             "Option 4"
                            ],
                   answer: 1
                 },
                 { text: "Placeholder for question #3",
                   options: ["Option 1",
                             "Option 2",
                             "Option 3",
                             "Option 4"
                            ],
                   answer: 2
                 },
                 { text: "Placeholder for question #4",
                   options: ["Option 1",
                             "Option 2",
                             "Option 3",
                             "Option 4"
                            ],
                   answer: 3
                 },
                 { text: "Placeholder for question #5",
                   options: ["Option 1",
                             "Option 2",
                             "Option 3",
                             "Option 4"
                            ],
                   answer: 0
                 },
                 { text: "Placeholder for question #6",
                   options: ["Option 1",
                             "Option 2",
                             "Option 3",
                             "Option 4"
                            ],
                   answer: 1
                 },
                 { text: "Placeholder for question #7",
                   options: ["Option 1",
                             "Option 2",
                             "Option 3",
                             "Option 4"
                            ],
                   answer: 2
                 },
                 { text: "Placeholder for question #8",
                   options: ["Option 1",
                             "Option 2",
                             "Option 3",
                             "Option 4"
                            ],
                   answer: 3
                 },
                 { text: "Placeholder for question #9",
                   options: ["Option 1",
                             "Option 2",
                             "Option 3",
                             "Option 4"
                            ],
                   answer: 0
                 },
                 { text: "Placeholder for question #10",
                   options: ["Option 1",
                             "Option 2",
                             "Option 3",
                             "Option 4"
                            ],
                   answer: 1
                 }
                ];

$(document).ready(function()
{   // set up the event listeners

    $(".click").click(function()
    {   // what do we do when an option is clicked
    });

    $(".key").click(function()
    {   // what do we do when a number is clicked (hint, it's the same as when an option is clicked)
    });

    $(document).keypress(function(event)
    {   // what do we do when a key is pressed on the keyboard

        var validKeys = [1, 2, 3, 4];

        validKeys.forEach(function(keyStroke)
        {   if (keyStroke == event.key)
            {   // do the deed
            }
        })
    });
});