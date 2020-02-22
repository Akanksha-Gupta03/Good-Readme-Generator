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
            message:"What are the steps required to install your project?",
            name:"installation"
        },
        {
            type:"input",
            message:"Provide instructions and examples for use.",
            name:"usage"
        },
        {
            type:"input",
            message:"Would you like to add a license for your repository? Please input here.",
            name:"licenseName"
        },
        {
            type:"input",
            message:"Provide ypur License URL.",
            name:"licenseURL"
        },
        {
            type:"input",
            message:"Would you like to add the contributors for your repository? please enter the names of contributors here.",
            name:"contributorsName"
        },
        {
            type:"input",
            message:"Provide the github username of the contributors",
            name:"contributorGitUsername"
        },
        {
            type:"input",
            message:"If you would like write tests for your application. Then provide examples on how to run them.",
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
    const usage = userResponse.usage;
    const licenseName= userResponse.licenseName;
    const licenseURL = userResponse.licenseURL;
    const contributorsName = userResponse.contributorsName;
    const tests = userResponse.tests;
    const gitResponse = await axios.get(`https://api.github.com/users/${gitUserName}`);
    const gitData = gitResponse.data;
    // const gitName = gitData.login;
    // const gitEmail = gitData.email;
    // const gitlocation = gitData.location;
    // const gitUrl = gitData.html_url;
    // const gitProfileImage = gitData.avatar_url;
    console.log(gitData)

      //convert contributors section into an array
      var contributorGitName = userResponse.contributorGitUsername.split(",");
      console.log(contributorGitName);
      
      var info = "";
      for (var i = 0; i < contributorGitName.length; i++){   
          console.log(contributorGitName[i]);
          var contriInfo = await axios.get(`https://api.github.com/users/${contributorGitName[i]}`);
          var contributorProfile = contriInfo.data.avatar_url;
          var contributorURL = contriInfo.data.html_url;
          info = info + `\n[![ProfilePicture](${contributorProfile})](${contributorURL})`
      }
      console.log(info);

var result = (`
![badge](https://img.shields.io/badge/<Badge>-<${gitUserName}>-<ff69b4>)
# ${projectTitle}
\n ${projectDescription}

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Contributors](#Contributors)
* [Tests](#Tests)
* [License](#license)

\n## Installation
\`\`\`
${installationProcess}
\`\`\`

\n## Usage
\`\`\`
${usage}
\`\`\`

\n## Contributors
${info}

\n## Tests
\n${tests}


\n## License
This project is licensed under the ${licenseName} 
\n[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)](${licenseURL})

\n ##Author
\n${gitData.name}

\n![ProfilePicture](${gitData.avatar_url})
\nGithub Email: ${gitData.email}
\nGithub Repos URL: ${gitData.repos_url}


`)
fs.writeFileSync( 'Readme.md',result )
console.log("file generated...")
}
main();