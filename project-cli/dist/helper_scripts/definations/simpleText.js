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
exports.simpleTextQuestion = {
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
                default: false,
                message: 'Do you want to add file name into file',
                name: 'isFileNameAdd',
                type: 'confirm'
            }
        ];
        const answers = yield inquirer.prompt(questions);
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        const opt = {
            isFileNameAdd: answers.isFileNameAdd
        };
        helper_1.Helper.createSimpleText(answers, opt);
    })
};
//# sourceMappingURL=simpleText.js.map