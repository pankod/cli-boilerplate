import * as inquirer from 'inquirer';
import { Config } from '../../config';
import { DefinationsModel } from './Defination';
import { Helper } from './helper';

export const simpleTextQuestion = {
	showQuestions: async (): Promise<void> => {
		const questions = [
			{
				message: 'Enter file name',
				name: 'fileName',
				type: 'input',
				validate(val: string): string | boolean {
					if (val.length) {
						if (
							Helper.isAlreadyExist(
								Config.filesDir,
								val,
								true
							)
						) {
							return 'This file name already used before, enter new name.';
						}

						return true;
					}

					return 'Can not be empty';
				}
			},
			{
				default: false,
				message: 'Do you want to add file name into file content ?',
				name: 'isFileNameAdd',
				type: 'confirm'
			}
		];

		const answers: DefinationsModel.IAnswers = await inquirer.prompt<{ fileName: string, isFileNameAdd: boolean}>(questions);

		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());

		const opt: DefinationsModel.ICreateFileOptions = {
			isFileNameAdd: answers.isFileNameAdd
		};

		Helper.createSimpleText(answers, opt);
	}
};
