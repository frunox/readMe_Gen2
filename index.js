

const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const appendFileAsync = util.promisify(fs.appendFile);
var avatar = "";
var email = "";

// create an array holding the questions to be asked of the user
const questions = [
  {
    type: "prompt",
    name: "username",
    message: "Enter your GitHub username:  "
  },
  {
    type: "prompt",
    name: "projectName",
    message: "Enter your GitHub project name:  "
  },
  {
    type: "input",
    name: "descriptionText",
    message: "Enter a project description:  "
  },
  {
    type: "input",
    name: "tocText",
    message: "Enter contents information:  "
  },
  {
    type: "input",
    name: "installText",
    message: "Enter installation information:  "
  },
  {
    type: "input",
    name: "usageText",
    message: "Enter usage information:  "
  },
  {
    type: "input",
    name: "licenseText",
    message: "Enter license information:  "
  },
  {
    type: "input",
    name: "contributorText",
    message: "Enter contributors:  "
  },
  {
    type: "input",
    name: "testText",
    message: "Enter a test description:  "
  },
  {
    type: "input",
    name: "questionText",
    message: "Enter questions:  "
  }
];


inquirer.prompt(questions).then(async function ({ username, projectName, descriptionText, tocText, installText, usageText, licenseText, contributorText, testText, questionText }) {
  // create variable holding the URL for the API containing the ${ username }
  const queryURL = `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;;

  await axios
    .get(queryURL) //use queryURL defined above
    .then(function (res) {
      //run function with the response as an argument
      // console.log(res);
      avatar = res.data.avatar_url;
      email = res.data.email;
      console.log(avatar)
    })
    .then(async function () {
      await appendFileAsync("README.md", "# _" + projectName + "_" + `\n` + "\n")
    })
    .then(async function () {
      await appendFileAsync("README.md", "## Project Description" + `\n` + `\n`)
    })
    .then(async function () {
      await appendFileAsync("README.md", descriptionText + `\n` + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", "## Table of Contents" + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", tocText + `\n` + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", "## Installation" + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", installText + `\n` + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", "## Usage" + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", usageText + `\n` + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", "## Licensing" + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", licenseText + `\n` + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", "## Contributing" + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", contributorText + `\n` + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", "## Tests" + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", testText + `\n` + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", "## Questions" + `\n`);
    })
    .then(async function () {
      await appendFileAsync("README.md", questionText + `\n` + `\n`);
    })
    .then(async function () {
      await appendFileAsync('README.md', `![](https://img.shields.io/badge/Project-Creator-brightgreen) ${username}  ${email}` + `\n`)
    })
    .then(async function () {
      await appendFileAsync('README.md', `![](${avatar})`)
    })
    .then(async function () {
      await appendFileAsync('README.md', `![](http://bestanimations.com/Animals/Birds/bird-animated-gif-26.gif)`)
    })

    .catch(function (err) {
      console.log(err);
    });
});
