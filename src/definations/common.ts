import * as inquirer from 'inquirer';
import { Helper } from '../definations/helper';
import { Config } from '../../config';

export module Common {

	export const commonValues = {
		st_message: 'Enter file name',
		st_name: 'fileName',
		st_type: 'input',
		ac_message: 'Enter file name',
		ac_name: 'fileName',
		ac_type: 'input'
	}

	export const simpleTextQuestions = [
		{
			message: Common.commonValues.st_message,
			name: Common.commonValues.st_name,
			type: Common.commonValues.st_type,
			validate(val: string): string | boolean {
				return Common.validate(val);
			}
		},
		{
			default: false,
			message: 'Do you want to add file name into file content ?',
			name: 'isFileNameAdd',
			type: 'confirm'
		}
	];

	export const addCollectionQuestions = [
		{
			message: Common.commonValues.ac_message,
			name: Common.commonValues.st_name,
			type: Common.commonValues.st_type,
			validate(val: string): string | boolean {
				return Common.validate(val);
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
			message: 'Would you like save file to collection.ts with a custom name?',
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

	export const validate = (val: string): string | boolean => {
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
}

export default Common;