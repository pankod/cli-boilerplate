var fs = require("memfs")

process.chdir('/');
fs.mkdirSync('/dir');
fs.writeFileSync('/dir/simpleText.mustache', 'Hello World!');

jest.mock('fs', () => require('memfs'));