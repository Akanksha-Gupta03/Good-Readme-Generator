const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
//
//const path = require("path");

async function main(){
    console.log(`starting`)
    //const url = "https://github.com/Akanksha-Gupta03";
    const userResponse = await inquirer.prompt([
        {
            type:"input",
            message:"What is your github username?",
            name:"username"
        },
        {
            type:"input",
            message:"What would you like your project title to be?",
            name:"projectTitle"
        },
        {
            type:"input",
            message:"Provide description for your project?",
            name:"description"
        },
        {
            type:"input",
            message:"Table content for your readme?",
            name:"contents"
        },
        {
            type:"input",
            message:"What are the steps required to install your project?",
            name:"installation"
        },
        {
            type:"input",
            message:"Provide instructions  for use. Include screenshots as needed",
            name:"instructions"
        },
        {
            type:"input",
            message:"Provide instructions  examples for use. Include screenshots as needed",
            name:"instructionExample"
        },
        {
            type:"input",
            message:"Your License name?",
            name:"licenseName"
        },
        {
            type:"input",
            message:"Your license URL",
            name:"licenseURL"
        },
        {
            type:"input",
            message:"How many contributors are in your readme?",
            name:"contributors_no"
        },
        {
            type:"input",
            message:"Provide the name of the contributors",
            name:"contributors_name"
        },
        {
            type:"input",
            message:"Provide the github username of the contributors",
            name:"contributorGitUsername"
        },
        {
            type:"input",
            message:" write tests for your application. Then provide examples on how to run them.",
            name:"tests"
        }
    ]);
    console.log(`starting`);
    console.log(userResponse);
    const gitUserName = userResponse.username;
    const projectTitle = userResponse.projectTitle;
    const projectDescription = userResponse.description;
    const tableOfContent = userResponse.contents;
    const installationProcess = userResponse.installation;
    const instructions = userResponse.instructions;
    const instructionExample= userResponse.instructionExample;
    const licenseName= userResponse.licenseName;
    const licenseURL = userResponse.licenseURL;
    const contributorsNo = userResponse.contributors_no;
    const contributorsName = userResponse.contributors_name;
    const contributorGitName = userResponse.contributorGitUsername;
    const tests = userResponse.tests;
    const gitResponse = await axios.get(`https://api.github.com/users/${username}`);
    const gitData = gitResponse.data;
    const gitName = gitData.login;
    const gitEmail = gitData.email;
    const gitlocation = gitData.location;
    const gitUrl = gitData.html_url;
    const gitProfileImage = gitData.avatar_url;

var result = (`
${projectTitle}
${projectDescription}
${tableOfContent}
## Installation
\`\`\`
${installationProcess}
\`\`\`
## Instructions 
${instructions}
\`\`\`
${instructionExample}
\`\`\`
## License
This project is licensed under the ${licenseName} - see the ${licenseURL} file for details.
## contributors
${contributorsName}
${contributorGitUsername}
\n![ProfileImage](${gitContributorProfileImage})
\nLink: ${gitConributorUrl}
## Author
\n![Profile](${gitProfileImage})
**${gitName}**
\nEmail: ${gitlocation}
\nGitHub: ${gitUrl}

`)
var writeResult = fs.writeFileSync( 'readme.md',result )
console.log("file generated...")
}
main();