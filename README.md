# Socialgorithm Website

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a5d4d744738b42fc841770d9f936fcb0)](https://www.codacy.com/app/socialgorithm/socialgorithm.github.io?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=socialgorithm/socialgorithm.github.io&amp;utm_campaign=Badge_Grade)

Welcome humans, or robots.

This is the source repository for the Socialgorithm website, built and served using Jekyll.

## Making Updates

To make updates to the website, clone this repository and do the following:

### Prerequisites

You will need to have the following build tooling installed:

- Node

### Install Dependencies

Run the following to install dependencies:

`npm install`

### Serve the local website

To view the local website:
 
`gulp serve`

You can now make changes and they should automatically display on the running website (http://localhost:3000), if not, Ctrl/Cmd+C and re-run `gulp serve`

### Developer FAQ

###### Vulnerability Patching / Updating Packages

`npm update --save` will update node packages and save to package.json

`gem update --save` will update ruby gems