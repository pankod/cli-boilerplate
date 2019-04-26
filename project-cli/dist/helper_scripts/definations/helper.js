"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const logSymbols = require("log-symbols");
const mustache = require("mustache");
const path = require("path");
const config_1 = require("../../config");
exports.Helper = {
    isAlreadyExist: (startPath, val, isFile) => {
        val = val.replace(/\b\w/g, foo => foo.toUpperCase());
        const _path = isFile ? `${startPath}/${val}.txt` : `${startPath}/${val}`;
        return fs.existsSync(path.resolve('', _path));
    },
    getTemplate: (templatePath, templateProps) => (mustache.render(fs.readFileSync(path.resolve('', templatePath), 'utf8'), templateProps)),
    createFile: (dirPath) => {
        try {
            fs.mkdirSync(path.resolve('', dirPath));
        }
        catch (error) {
            console.log(error);
        }
    },
    writeFile: (params) => {
        fs.writeFile(path.resolve('', params.dirPath), params.getFileContent(), err => {
            if (err)
                throw err;
            console.log(logSymbols.success, params.message);
        });
    },
    replaceContent: (params) => {
        const replaceFile = params.filetoUpdate.replace(params.regexKey, params.getFileContent());
        const writeFileProps = {
            dirPath: params.fileDir,
            getFileContent: () => replaceFile,
            message: params.message
        };
        exports.Helper.writeFile(writeFileProps);
    },
    addToCollection: (params) => {
        const collectionPath = `${config_1.Config.filesDir}/collection.txt`;
        const collectionTemplatePath = './helper_scripts/templates/collection.mustache';
        const replaceParams = {
            fileDir: collectionPath,
            filetoUpdate: fs.readFileSync(path.resolve('', collectionPath), 'utf8'),
            getFileContent: () => exports.Helper.getTemplate(collectionTemplatePath, params.templateProps),
            message: 'Added to collection',
            regexKey: /This projects includes files which is specified at the below[.\n]/g
        };
        exports.Helper.replaceContent(replaceParams);
    },
    createSimpleText: (answers, opt) => {
        const templatePath = './helper_scripts/templates/simpleText.mustache';
        const templateProps = {
            fileName: answers.fileName,
            isFileNameAdd: answers.isFileNameAdd
        };
        const simpleTextFilePath = `${config_1.Config.filesDir}/${answers.fileName}.txt`;
        const writeFileProps = {
            dirPath: simpleTextFilePath,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Created new file.'
        };
        exports.Helper.writeFile(writeFileProps);
    },
    createNewAddCollecton: (answers, opt) => {
        const templatePath = './helper_scripts/templates/simpleText.mustache';
        const templateProps = {
            fileName: answers.fileName,
            isCustomFileName: answers.isCustomFileName,
            isFileNameAdd: answers.isFileNameAdd
        };
        if (opt.isCustomFileName) {
            templateProps.customFileName = opt.customFileName;
        }
        const simpleTextFilePath = `${config_1.Config.filesDir}/${answers.fileName}.txt`;
        const writeFileProps = {
            dirPath: simpleTextFilePath,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Created new file.'
        };
        const addCollParams = {
            templateProps
        };
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToCollection(addCollParams);
    }
};
//# sourceMappingURL=helper.js.map