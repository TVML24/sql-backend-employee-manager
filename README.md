# sql-backend-employee-manager

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

The motivation behind this project was to practice and clarify concepts and understanding related to the use of SQL queries, the SQL2 package and to further cement understanding of the enquirer package in the construction of an SQL based node application that tracks the employees of a company. This was challenging and required significant time and effort. When I have more time I will come back and refactor it to make use of classes, but it was not possible in the time available to me. Aside from my own demands of myself it meets all acceptance criteria.

## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [Deployment](#deployment)
- [Credits](#credits)
- [License](#license)


## Installation

If running from integrated terminal remember to run NPM install prior to use.

## Usage

The user can open the application by inputting node index.js into the terminal.
The user will be taken to the main menu and will be directed to choose an option from a list.
When the user has selected how they wish to continue, the application will gather information so that the user's desires can be actioned in the underlying database.
The application will tell the user that their request has been successful and bring the user back to the main menu so that they may select another option if they desire. 

Screenshot:
![My SQL Employee Manager](./Assets/screen.jpg)

## Deployment

The video demonstration of the application:
(https://drive.google.com/file/d/1koJzPgQXEp6rfDZqhS8posOtOIwuoqyE/view)

## Credits

This project is almost entirely my own work.

It also makes use of nodeJS, SQL, mysql2, console.table, inquirer. 

I did get some assistance with the function that turns the db.query() into a promise.

Credit also to my teachers, as without them this would not have been possible.

## License

Licensed under the MIT license.

