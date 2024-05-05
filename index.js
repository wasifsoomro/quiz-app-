#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Store api url in variable
let apiComputerEasy = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
let apiComputerMedium = "https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple";
let apiComputerHard = "https://opentdb.com/api.php?amount=30&category=18&difficulty=hard&type=multiple";
let apiScienceEasy = "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple";
let apiScienceMedium = "https://opentdb.com/api.php?amount=20&category=17&difficulty=medium&type=multiple";
let apiScienceHard = "https://opentdb.com/api.php?amount=30&category=17&difficulty=hard&type=multiple";
let apiGKEasy = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
let apiGKMedium = "https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple";
let apiGKHard = "https://opentdb.com/api.php?amount=30&category=9&difficulty=hard&type=multiple";
//create a fetch function that fetch data from url
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};
// Create asynchronous start quiz function for interct with uers
const startQuiz = async () => {
    try {
        const { Name } = await inquirer.prompt({
            type: "input",
            name: "Name",
            message: "What is your name?"
        });
        const { Confirm } = await inquirer.prompt({
            type: "list",
            name: "Confirm",
            message: "Are you ready for the quiz?",
            choices: ["Yes", "No"]
        });
        // create a conditions and get input from user if condition is true
        if (Confirm === "Yes") {
            let { Category } = await inquirer.prompt({
                type: "list",
                name: "Category",
                message: "Choose Category",
                choices: ["Computer", "Science & Nature", "General Knowledge"]
            });
            let { level } = await inquirer.prompt({
                type: "list",
                name: "level",
                message: "Choose your level",
                choices: ["Easy", "Medium", "Hard"]
            });
            // Now declare a variable and initialize it in if condition as per user input
            let apiData;
            if (Category === "Computer") {
                if (level === "Easy") {
                    apiData = await fetchData(apiComputerEasy);
                }
                else if (level === "Medium") {
                    apiData = await fetchData(apiComputerMedium);
                }
                else if (level === "Hard") {
                    apiData = await fetchData(apiComputerHard);
                }
                else {
                    console.log("Invalid difficulty level.");
                    return;
                }
            }
            else if (Category === "Science & Nature") {
                if (level === "Easy") {
                    apiData = await fetchData(apiScienceEasy);
                }
                else if (level === "Medium") {
                    apiData = await fetchData(apiScienceMedium);
                }
                else if (level === "Hard") {
                    apiData = await fetchData(apiScienceHard);
                }
                else {
                    console.log("Invalid difficulty level.");
                    return;
                }
            }
            else if (Category === "General Knowledge") {
                if (level === "Easy") {
                    apiData = await fetchData(apiGKEasy);
                }
                else if (level === "Medium") {
                    apiData = await fetchData(apiGKMedium);
                }
                else if (level === "Hard") {
                    apiData = await fetchData(apiGKHard);
                }
                else {
                    console.log("Invalid difficulty level.");
                    return;
                }
            }
            else {
                console.log("Invalid category");
            }
            if (!apiData || apiData.length === 0) {
                console.log("Error fetching quiz data. Please try again later.");
                return;
            }
            let score = 0;
            for (let i = 0; i < apiData.length; i++) {
                const answers = [...apiData[i].incorrect_answers, apiData[i].correct_answer];
                const quizAnswer = await inquirer.prompt({
                    type: "list",
                    name: "question",
                    message: apiData[i].question,
                    choices: answers.map(val => val)
                });
                if (quizAnswer.question === apiData[i].correct_answer) {
                    ++score;
                    console.log(chalk.green.italic.bold(`Correct`));
                }
                else {
                    console.log(chalk.red(`${chalk.red.bold("Incorrect \n")} ${chalk.green.bold("Correct Answer is")} ${chalk.bold.cyan(apiData[i].correct_answer)}`));
                }
            }
            console.log(`Dear ${chalk.yellow(Name)}, your score is ${chalk.cyanBright(score)} out of ${chalk.blue(apiData.length)}`);
        }
        else {
            console.log("Quiz exiting...");
        }
    }
    catch (error) {
        console.error("Error during quiz:", error);
    }
};
startQuiz();
