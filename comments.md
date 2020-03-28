# Unit 09 Node.js and ES6+ Homework: Good README Generator

This is a command-line application that dynamically generates a README.md from a user's input. 

The user will be prompted for their GitHub username, which will be used to make a call to the GitHub API to retrieve their email and profile image. They will then be prompted with questions about their project.

The README will be populated with the following:

* At least one badge
* Project title
* Description
* Table of Contents
* Installation
* Usage
* License
* Contributing
* Tests
* Questions
  * User GitHub profile picture
  * User GitHub email

## Notes
This submission misses the requirements by not including the user's email address. I set the .env file, used what should be the correct url in the axios call, but the email still returned as null.

Some parts of the readMe.md were not formatted correctly, in that the Table of Contents, and some other categories, should include lists instead of plain text.