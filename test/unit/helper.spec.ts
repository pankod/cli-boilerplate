import * as inquirer from 'inquirer';
import { Config } from '../../config';
import { DefinationsModel } from '../../src/definations/Defination';
import { Helper } from '../../src/definations/helper';

const MemoryFileSystem = require("memory-fs");
const fs = new MemoryFileSystem();

fs.mkdirpSync("/files/mock");
fs.writeFileSync("/files/mock/collection.txt", "Hello World");
fs.writeFileSync("/files/mock/test.txt", "Hello World");

fs.mkdirpSync("/src/templates/mock");
fs.writeFileSync("/src/templates/mock/simpleText.mustache", "Hello World");

describe('Test Helper constructor', () => {

	test('isAlreadyExist method', () => {
		const params = {
			isFile: true,
			startPath: Config.mockFilesDir,
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
		const templatePath = './src/templates/mock/simpleText.mustache';

		const templateProps = {
			fileName: 'test'
		};

		const simpleTextFilePath = `${Config.mockFilesDir}/test.txt`;

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: simpleTextFilePath,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Created new file.'
		};

		Helper.writeFile(writeFileProps);

		const params = {
			isFile: true,
			startPath: Config.mockFilesDir,
			val: 'test'
		};

		const isExist = Helper.isAlreadyExist(params.startPath, params.val, params.isFile);

		expect(isExist).toBeTruthy();

	});

	
	test('replaceContent method', () => {
		const templatePath = './src/templates/mock/simpleText.mustache';

		const templateProps = {
			fileName: 'collection'
		};

		const result = Helper.getTemplate(templatePath, templateProps);

		expect(result).not.toEqual('');
	});

});
