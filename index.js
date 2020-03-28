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
    message: "Do you want to enter descriptive text now?  "
  }
];

const addParagraph = [
  {
    type: "input",
    name: "textContent",
    message: "Enter text: "
  },
  {
    type: "confirm",
    name: "moreText",
    message: "Do you want to enter another paragraph?  "
  }
];

// const addParagraph = [
//   {
//     type: "confirm",
//     name: "textConfirm",
//     message: "Do you want to enter descriptive text now?  "
//   }
// ];

//   {
//     type: "input",
//     name: "descriptionText",
//     message: "Enter a project description:  "
//   },
//   {
//     type: "input",
//     name: "tocText",
//     message: "Enter contents information:  "
//   },
//   {
//     type: "input",
//     name: "installText",
//     message: "Enter installation information:  "
//   },
//   {
//     type: "input",
//     name: "usageText",
//     message: "Enter usage information:  "
//   },
//   {
//     type: "input",
//     name: "licenseText",
//     message: "Enter license information:  "
//   },
//   {
//     type: "input",
//     name: "contributorText",
//     message: "Enter contributors:  "
//   },
//   {
//     type: "input",
//     name: "testText",
//     message: "Enter a test description:  "
//   },
//   {
//     type: "input",
//     name: "questionText",
//     message: "Enter questions:  "
//   },
//   {
//     type: "confirm",
//     name: "enterList",
//     message: "Enter questions:  "
//   },
//   {
//     type: "confirm",
//     name: "enterLines",
//     message: "Enter questions:  "
//   }
// ];

// Step 1 - initial call from github API
// { varName } stringifies the object recalled from .prompt
inquirer.prompt(questions1).then(async function({ username, projectName }) {
  // create variable holding the URL for the API containing the ${ username }
  const queryURL = `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
  // call axios to query the github API
  await axios
    .get(queryURL) //use queryURL defined above
    // capture the response object in 'res'
    .then(function(res) {
      //run function with the response as an argument
      // console.log(res);
      avatar = res.data.avatar_url;
      email = res.data.email;
      // console.log(avatar)  // confirm data received
    })
    .then(async function() {
      // write the project name to readme.md as the title
      await appendFileAsync(
        "README.md",
        "# _" + projectName + "_" + `\n` + "\n"
      );
      console.log("Project name added to readMe.md");
    })
    // append the header 'Project Description' to the readme.md file
    .then(async function() {
      await appendFileAsync(
        "README.md",
        "## Project Description" + `\n` + `\n`
      );
      console.log("Project description header added");
    })
    .catch(function(err) {
      console.log(err);
    });
  confirmText();
});

async function confirmText() {
  inquirer.prompt(textEnter).then(async function({ textConfirm }) {
    if (textConfirm) {
      enterText();
    }
    return;
  });
}

async function enterText() {
  await inquirer
    .prompt(addParagraph)
    .then(async function({ textContent }) {
      await appendFileAsync("README.md", textContent + `\n` + "\n");
    })
    .then(async function({ moreText }) {
      console.log(moreText);
      if (!moreText) {
        return;
      } else {
        enterText();
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

// async function textAdd() {
//   await inquirer
//     .prompt(addText)
//     .then(async function({ textContent }) {
//       await appendFileAsync("README.md", textContent + `\n` + "\n");
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// }

//     .then(async function () {
//       await appendFileAsync("README.md", "# _" + projectName + "_" + `\n` + "\n")
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", "## Project Description" + `\n` + `\n`)
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", descriptionText + `\n` + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", "## Table of Contents" + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", tocText + `\n` + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", "## Installation" + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", installText + `\n` + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", "## Usage" + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", usageText + `\n` + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", "## Licensing" + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", licenseText + `\n` + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", "## Contributing" + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", contributorText + `\n` + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", "## Tests" + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", testText + `\n` + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", "## Questions" + `\n`);
//     })
//     .then(async function () {
//       await appendFileAsync("README.md", questionText + `\n` + `\n`);
//     })
//     .then(async function () {
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
// });
