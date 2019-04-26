import * as inquirer from 'inquirer';
import { Config } from '../../config';
import { DefinationsModel } from './Defination';
import { Helper } from './helper';

export const addCollectionQuestion = {
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
							return 'Already added. Use new file name';
						}

						return true;
					}

					return 'Cannot be empty';
				}
			},
			{
				default: false,
				message: 'Do you want to add file name into file?',
				name: 'isFileNameAdd',
				type: 'confirm'
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
				type: 'list',
				when: ({ isFileNameAdd }) => isFileNameAdd
			},
			{
				message: 'Enter custom name',
				name: 'customFileName',
				type: 'input',
				when: ({ isCustomFileName }) => isCustomFileName
			}
		];

		// tslint:disable-next-line:max-line-length
		const answers: DefinationsModel.IAnswers = await inquirer.prompt<{ fileName: string, isFileNameAdd: boolean, isCustomFileName: boolean, customFileName?: string}>(questions);

		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());

		const opt: DefinationsModel.ICreateFileOptions = {
			isCustomFileName: answers.isCustomFileName,
			isFileNameAdd: answers.isFileNameAdd
		};

		if (answers.isCustomFileName) {
			opt.customFileName = answers.customFileName;
		}

		Helper.createNewAddCollecton(answers, opt);
	}
};
