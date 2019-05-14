
import { Config } from '../../config';
import { DefinationsModel } from '../../src/definations/Defination';
import { Helper } from '../../src/definations/helper';

describe('Test Helper constructor', () => {

	 test('getTemplate method', () => {
		const templatePath = '/dir/simpleText.mustache';

		const templateProps = {
			fileName: 'collection'
		};

		const result = Helper.getTemplate(templatePath, templateProps);

		expect(result).not.toEqual('');
	});

	test('writeFile method', () => {
		const templatePath =  `${Config.mockDir}/simpleText.mustache`;

		const templateProps = {
			fileName: 'Test'
		};

		const simpleTextFilePath = `${Config.mockDir}/Test.txt`;

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: simpleTextFilePath,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Created new file.'
		};

		Helper.writeFile(writeFileProps);

		const params = {
			isFile: true,
			startPath: Config.mockDir,
			val: 'test'
		};

		const isExist = Helper.isAlreadyExist(params.startPath, params.val, params.isFile);

		expect(isExist).toBeTruthy();

	});

	test('isAlreadyExist method', () => {
		const params = {
			isFile: true,
			startPath: Config.mockDir,
			val: 'test'
		};

		const result = Helper.isAlreadyExist(params.startPath, params.val, params.isFile);
		expect(result).toBeTruthy();
	});

	test('replaceContent method', () => {
		const templatePath = `${Config.mockDir}/simpleText.mustache`;

		const templateProps = {
			fileName: 'collection'
		};

		const result = Helper.getTemplate(templatePath, templateProps);

		expect(result).not.toEqual('');
	});

});
