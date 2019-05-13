# helper-cli-boilerplate

Project folders and files creator boilerplate with predefined content for all type of file extensions.

 By using the CLI tool, you may easily: 

    - Create new files and folders with any file extension,
    - Add predefined content to newly created file by using built-in mustache templating engine.
    - Append new line of content in the desired position to files which is already exist by using regex algorithms.


## Getting Started


1. run one of the following method:

**npm**

```sh
npm install
```

2. Once the installation is done, you should run the following command for compile typescript:

 ```
 npm run build
 ```

 It saves javascript files to dist folder.
 <br/>

3. Run the following command for compile typescript code anytime you made changes in code:

 ```
 npm run watch
 ```

 Once the installation is done, you can run the following command to start CLI.

 ```
 npm run start
 ```

<br/>


To customize helper-cli-boilerplate according to the needs of your project:

- Add a new mustache template to templates folder and define file path to methods in helper.ts.

  Usage of mustache file content:

  https://github.com/janl/mustache.js

- Define file or folder path in to config.ts

- You should define new regex keys in order to catch existing content and append new content to spesicific position in the file which is already exist.



Outline of some logics behind the methods:

To create new file:

-> get the file name from user
    -> send filename and properties to template engine -> get the content of new file from mustache as a string 
     -> Define folder or file paths 
       -> send the string content to fs  module method and create to desired paths. 

To append content to existing file :

  -> set regex key for catch spesific position in file content.
    -> send filename or properties to template engine -> get the content of new file from mustache as a string 
      -> send the string content to fs module method and add to spesific content.


