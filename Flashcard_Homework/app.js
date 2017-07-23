var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var deckCards = [];
var counter = 0;
var number = 0;

inquirer.prompt([{
    name: "number",
    message: "How many cards do you wanna make?"
}]).then(function(answer) {
    number = parseInt(answer.number);

    function makeCards() {
        if (counter < number) {
            inquirer.prompt([{
                name: "list",
                type: "list",
                message: "Make a BasicCard or ClozeCard",
                choices: ["BasicCard", "ClozeCard", "End"]
            }]).then(function(answers) {
                if (answers.list === "BasicCard") {
                    inquirer.prompt([{
                        name: "frontCard",
                        message: "Write a question for the front side."
                    }, {
                        name: "backCard",
                        message: "Write an answer for the back side."
                    }]).then(function(answers) {
                        var newCard = new BasicCard(answers.frontCard, answers.backCard);
                        deckCards.push(newCard);
                        console.log(newCard.front);
                        console.log(newCard.back);
                        makeCards();
                    })
                }
                if (answers.list === "ClozeCard") {
                    inquirer.prompt([{
                        name: "fullText",
                        message: "Write what statement you'd like on the card."
                    }, {
                        name: "cloze",
                        message: "Write which part should be hidden."
                    }]).then(function(answers) {
                        var newCard = new ClozeCard(answers.fullText, answers.cloze);
                        deckCards.push(newCard);
                        console.log(newCard.cloze);
                        console.log(newCard.partial);
                        console.log(newCard.fullText);
                        makeCards();
                    })
                }
                if (answers.list === "End") {
                    return;
                }
            })
            counter++;
        } else {
            inquirer.prompt([{
                name: "view",
                type: "confirm",
                message: "View your cards?"
            }]).then(function(answer) {
                if (answer.view) {
                    var count = 0;

                    function game() {
                        if (count < deckCards.length) {
                            if (deckCards[count].type === "basic") {
                                inquirer.prompt([{
                                    name: "question",
                                    message: "Card " + (count + 1) + ": " + deckCards[count].front
                                }]).then(function(answer) {
                                    if (answer.question === deckCards[count - 1].back) {
                                        console.log("Correct!")
                                    } else {
                                        console.log("Incorrect! " + deckCards[count - 1].back);
                                    }
                                    game();
                                })
                            }
                            if (deckCards[count].type === "cloze") {
                                inquirer.prompt([{
                                    name: "question",
                                    message: "Card " + (count + 1) + ": " + deckCards[count].partial
                                }]).then(function(answer) {
                                    if (answer.question === deckCards[count - 1].cloze) {
                                        console.log("Correct!");
                                    } else {
                                        console.log("Incorrect! " + deckCards[count - 1].fullText);
                                    }
                                    game();
                                })
                            }
                            count++;
                        } else {
                            inquirer.prompt([{
                                name: "again",
                                type: "confirm",
                                message: "Wanna play again?"
                            }]).then(function(answer) {
                                count = 0;
                                if (answer.again) {
                                    game();
                                } else {
                                    return; }
                            })
                        }
                    }
                    game();
                } else {
                    return; }
            })

        }
    }
    makeCards();
})