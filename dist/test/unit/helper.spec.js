"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const helper_1 = require("../../src/definations/helper");
const rimraf = require('rimraf');
describe('Test Helper constructor', () => {
    it('should CacheHelper be defined', () => {
        expect(helper_1.Helper).toBeDefined();
    });
    test('isAlreadyExist method', () => {
        const params = {
            isFile: true,
            startPath: config_1.Config.filesDir,
            val: 'collection'
        };
        const result = helper_1.Helper.isAlreadyExist(params.startPath, params.val, params.isFile);
        expect(result).toBeTruthy();
    });
    test('getTemplate method', () => {
        const templatePath = './src/templates/simpleText.mustache';
        const templateProps = {
            fileName: 'collection'
        };
        const result = helper_1.Helper.getTemplate(templatePath, templateProps);
        expect(result).not.toEqual('');
    });
    test('writeFile method', () => {
        const templatePath = './src/templates/simpleText.mustache';
        const templateProps = {
            fileName: 'test'
        };
        const simpleTextFilePath = `${config_1.Config.mockFilesDir}/test.txt`;
        const writeFileProps = {
            dirPath: simpleTextFilePath,
            getFileContent: () => helper_1.Helper.getTemplate(templatePath, templateProps),
            message: 'Created new file.'
        };
        const params = {
            isFile: true,
            startPath: config_1.Config.mockFilesDir,
            val: 'test'
        };
        const writeFile = helper_1.Helper.writeFile(writeFileProps);
        setTimeout(() => {
            const isExist = helper_1.Helper.isAlreadyExist(params.startPath, params.val, params.isFile);
            expect(isExist).toBeTruthy();
            rimraf(`${config_1.Config.mockFilesDir}/*`, () => { console.log('done'); });
        }, 600);
    });
    test('replaceContent method', () => {
        const templatePath = './src/templates/simpleText.mustache';
        const templateProps = {
            fileName: 'collection'
        };
        const result = helper_1.Helper.getTemplate(templatePath, templateProps);
        expect(result).not.toEqual('');
    });
});
//# sourceMappingURL=helper.spec.js.map