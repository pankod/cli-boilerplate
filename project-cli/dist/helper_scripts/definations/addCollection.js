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
const inquirer = require("inquirer");
const config_1 = require("../../config");
const helper_1 = require("./helper");
exports.addCollectionQuestion = {
    showQuestions: () => __awaiter(this, void 0, void 0, function* () {
        const questions = [
            {
                message: 'Enter file name',
                name: 'fileName',
                type: 'input',
                validate(val) {
                    if (val.length) {
                        if (helper_1.Helper.isAlreadyExist(config_1.Config.filesDir, val, true)) {
                            return 'Already added. Use new file name';
                        }
                        return true;
                    }
                    return 'Cannot be empty';
                }
            },
            {
                choices: [
                    new inquirer.Separator(),
                    {
                        name: 'Yes, I want to enter custom name file.',
                        value: true
                    },
                    {
                        name: 'No, use default file name.',
                        value: false
                    }
                ],
                default: false,
                message: 'Would you like save file to collection.ts with a custom name ?',
                name: 'isCustomFileName',
                type: 'list'
            },
            {
                message: 'Enter custom name',
                name: 'customFileName',
                type: 'input',
                when: ({ isCustomFileName }) => isCustomFileName
            }
        ];
        // tslint:disable-next-line:max-line-length
        const answers = yield inquirer.prompt(questions);
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        const opt = {
            isCustomFileName: answers.isCustomFileName,
            isFileNameAdd: true
        };
        if (answers.isCustomFileName) {
            opt.customFileName = answers.customFileName;
        }
        helper_1.Helper.createNewAddCollecton(answers, opt);
    })
};
//# sourceMappingURL=addCollection.js.map