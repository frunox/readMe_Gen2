// require packages
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
// access promisified version of appendFile from 'util' package
const appendFileAsync = util.promisify(fs.appendFile);
// declare global variables
var avatar = "";
var email = "";
// declare variables inside nested functions as global
let count = 0;
let moreTextIndicator;

// create an array with the possible headers to add to the readMe
const headers = [
    "Description",
    "Table of Contents",
    "Installation",
    "Usage",
    "License",
    "Contributing",
    "Tests",
    "Questions"
];

// create a series of arrays holding the questions to be asked of the user
// define the questions for the github API call and to enter the project name
// and project description header
const questions1 = [
    {
        type: "prompt",
        name: "username",
        message: "Enter your GitHub username:  "
    },
    {
        type: "prompt",
        name: "projectName",
        message: "Enter your GitHub project name:  "
    }
];

const textEnter = [
    {
        type: "confirm",
        name: "textConfirm",
        message: "Do you want to enter text now?  "
    }
];

const textToEnter = [
    {
        type: "input",
        name: "textContent",
        message: "Enter text: "
    }
];

const moreTextConfirm = [
    {
        type: "confirm",
        name: "moreText",
        message: "Do you want to add another paragraph"
    }
];


// Step 1 - initial call from github API.  Have the user enter their gitHub username to retrieve info to be included in the readMe.
// { varName } stringifies the object recalled from .prompt
inquirer.prompt(questions1).then(async function ({ username, projectName }) {
    // create variable holding the URL for the API containing the ${ username }
    const queryURL = `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
    // call axios to query the github API
    await axios
        .get(queryURL) //use queryURL defined above
        // capture the response object in 'res'
        .then(function (res) {
            //run function with the response as an argument
            // console.log(res);
            avatar = res.data.avatar_url;
            email = res.data.email;
            // console.log(avatar)  // confirm data received
        })
        .then(async function () {
            // write the project name to readme.md as the title
            await appendFileAsync(
                "README.md",
                "# _" + projectName + "_" + `\n` + "\n"
            );
            console.log("Project name added to readMe.md");
        })
        .catch(function (err) {
            console.log(err);
        });
    //  start the process of adding additional headers
    enterHeaders();
});

// enterHeaders() starts the process of building the rest of the readMe file by asking the user
// which of 8 headers to include
async function enterHeaders() {
    console.log("count at start of enterHeaders:  " + count);
    // ask user if they want to add the next header in the headers array
    //  if count = headers.length, call endProgram() and end the program
    if (count === headers.length) {
        await endProgram();
    }
    // set up prompt asking if the user wants to add the next header in the array
    var headerList = [
        {
            type: "confirm",
            name: "headerChoice",
            message: `Do you want to add a ${headers[count]} header?`
        }
    ];
    inquirer
        .prompt(headerList)
        .then(async function ({ headerChoice }) {
            // console.log("line 125:  " + headerChoice);
            if (!headerChoice) {
                // if the user decides to skip the current header, provide feedback, increment 'count' and 
                // start enterHeaders() again
                console.log("No " + headers[count] + " header entered");
                count++;
                await enterHeaders();
            } else {
                // if the user chooses to add the current header, append it to the readMe file
                await appendFileAsync(
                    "README.md",
                    "## " + headers[count] + `\n` + "\n"
                );
                count++;
                // call confirmText() to ask if the user wants to add text under the current header
                await confirmText();
            }
        })
        .catch(function (err) {
            console.log(err);
        });
    // }
}

// confirmText() gets a prompt 'textConfirm' which asks if the user wants to enter another paragraph
// If yes (true), go to enterText(), if no (false), go back to enterHeaders()
// enterHeaders();
async function confirmText() {
    console.log("in confirmText()");
    inquirer
        .prompt(textEnter)
        .then(async function ({ textConfirm }) {
            if (textConfirm) {
                // if the user wants to add text, call enterText()
                console.log("Time to go to enterText()");
                await enterText();
            } else {
                // if not, return to enterHeaders() to process the next header in the array
                console.log("return to enterHeaders()");
                await enterHeaders();
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

// enterText() prompts the user for a block of text to be entered under the current header as a paragraph.
async function enterText() {
    console.log("in enterText()");
    // prompt the user for a block of text (paragraph)
    await inquirer
        .prompt(textToEnter)
        .then(async function ({ textContent }) {
            // add the text under the current header in the readMe file
            await appendFileAsync("README.md", textContent + `\n` + "\n");
        })
        .catch(function (err) {
            console.log(err);
        });
    // call moreText to ask if the user wants to enter additional text
    await moreText();
}

// moreText() asks the user if they want to add additional text under the current header
async function moreText() {
    console.log("in moreText()");
    await inquirer
        .prompt(moreTextConfirm)
        .then(async function ({ moreText }) {
            // if the user doesn't want to add more text, return to enterHeaders() to process the next header
            if (!moreText) {
                await enterHeaders();
            }
            // if the user wants to add more text, return to enterText
            await enterText();
        })
        .catch(function (err) {
            console.log(err);
        });
}

// endProgram() provides feedback to the user and ends the program
async function endProgram() {
    console.log("ReadMe.md complete.");
    process.exit();
}



//       await appendFileAsync('README.md', `![](https://img.shields.io/badge/Project-Creator-brightgreen) ${username}  ${email}` + `\n`)
//     })
//     .then(async function () {
//       await appendFileAsync('README.md', `![](${avatar})`)
//     })
//     .then(async function () {
//       await appendFileAsync('README.md', `![](http://bestanimations.com/Animals/Birds/bird-animated-gif-26.gif)`)
//     })

//     .catch(function (err) {
//       console.log(err);
//     });
// })
