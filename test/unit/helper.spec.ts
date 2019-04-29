import * as inquirer from 'inquirer';
import { Config } from '../../config';
import { DefinationsModel } from '../../src/definations/defination';
import { Helper } from '../../src/definations/helper';
const rimraf = require('rimraf');

describe('Test Helper constructor', () => {
	it('should CacheHelper be defined', () => {
		expect(Helper).toBeDefined();
	});

	test('isAlreadyExist method', () => {
		const params = {
			isFile: true,
			startPath: Config.filesDir,
			val: 'collection'
		};

		const result = Helper.isAlreadyExist(params.startPath, params.val, params.isFile);

		expect(result).toBeTruthy();
	});

	test('getTemplate method', () => {
		const templatePath = './src/templates/simpleText.mustache';

		const templateProps = {
			fileName: 'collection'
		};

		const result = Helper.getTemplate(templatePath, templateProps);

		expect(result).not.toEqual('');
	});

	test('writeFile method', () => {
		const templatePath = './src/templates/simpleText.mustache';

		const templateProps = {
			fileName: 'test'
		};

		const simpleTextFilePath = `${Config.mockFilesDir}/test.txt`;

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: simpleTextFilePath,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Created new file.'
		};

		const params = {
			isFile: true,
			startPath: Config.mockFilesDir,
			val: 'test'
		};

		const writeFile = Helper.writeFile(writeFileProps);

		setTimeout( () => {
			const isExist = Helper.isAlreadyExist(params.startPath, params.val, params.isFile);

			expect(isExist).toBeTruthy();

			rimraf(`${Config.mockFilesDir}/*`, () => { console.log('done'); });
		},          600);

	});

	test('replaceContent method', () => {
		const templatePath = './src/templates/simpleText.mustache';

		const templateProps = {
			fileName: 'collection'
		};

		const result = Helper.getTemplate(templatePath, templateProps);

		expect(result).not.toEqual('');
	});

});
