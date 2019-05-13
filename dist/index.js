#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
/* import * as clear from 'clear'; */
const program = require("commander");
const figlet = require("figlet");
const inquirer = require("inquirer");
const addCollection_1 = require("./src/definations/addCollection");
const simpleText_1 = require("./src/definations/simpleText");
console.clear();
console.log(chalk.default(figlet.textSync('plater-cli')));
const questions = [
    {
        choices: ['Create simple file', 'Create file and add to collection'],
        message: 'What would you like to do?',
        name: 'fileType',
        type: 'list'
    }
];
program
    .command('addFile')
    .alias('a')
    .description('Add a file')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    const answers = yield inquirer.prompt(questions);
    switch (answers.fileType) {
        case 'Create simple file':
            yield simpleText_1.simpleTextQuestion.showQuestions();
            break;
        case 'Create file and add to collection':
            yield addCollection_1.addCollectionQuestion.showQuestions();
            break;
        default:
            break;
    }
}));
program.parse(process.argv);
//# sourceMappingURL=index.js.map