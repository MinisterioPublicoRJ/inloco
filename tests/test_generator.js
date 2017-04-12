var fs = require('fs');

var tests = [];

var test = {
    className: "",
    imports: ""
}

var dataConfig;

var dir = "/Users/rafael.tavares/projects-mp/github/inLoco-2.0/src/components";

function readConfigFile(){
    fs.readFile('/Users/rafael.tavares/projects-mp/github/inLoco-2.0/tests/tests-boilerplate.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        dataConfig = JSON.parse(data);
        dive(dir, dataConfig);
    });
}



var dive = function (dir, dataConfig) {
    fs.readdir(dir, function (err, list) {
        // Return the error if something went wrong
        if (err)
            return err;

        // For every file in the list
        list.forEach(function (file) {
            // Full path of that file
            var path = dir + "/" + file;
            var extension = file.split(".")[1];
            if(extension === "js"){
                read(path, dataConfig);
            }
            // Get the file's stats
            fs.stat(path, function (err, stat) {
                // If the file is a directory
                if (stat && stat.isDirectory())
                    // Dive into the directory
                    dive(path, dataConfig);
                // else
                    // Call the action
                    // action(null, path);
            });
        });
    });
};

function read(pathToFile, dataConfig){
    fs.readFile(pathToFile, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(" ");
        for (var index = 0; index < data.length; index++) {
            var element = data[index];
            if (element === "class"){
                var className = data[index+1];
                test = {
                    "className": "",
                    "imports": `import ${className} from "../../src/components/${className}/${className}.js"\n`
                };
                test.className = className;
                tests.push(test);
            }
        }
        //console.log(test);
        writeTest(test, dataConfig);
    });
}
readConfigFile();

function writeTest(test, dataConfig){
    for (var index = 0; index < dataConfig.imports.length; index++) {
            var what = dataConfig.imports[index].what;
            var where = dataConfig.imports[index].where;
            test.imports += "import "+ what + " from " + where + "\n";
        }
        for (var index = 0; index < dataConfig.tests.length; index++) {
            var element = dataConfig.tests[index];
            if (element.name === "snapshot"){
                var varName = test.className.charAt(0).toLowerCase() + test.className.slice(1);
                element.testString =
            `it('componente renderiza corretamente', () => {
    const ${varName} = shallow(<${test.className}/>);
    expect(${varName}).toMatchSnapshot();
})\n`;
                test.testString = element.testString;
            }
        }
        console.log(test);
        //writeTest(test);
    fs.writeFile(`/Users/rafael.tavares/projects-mp/github/inLoco-2.0/tests/auto/${test.className}.test.js`, test.imports + test.testString, { flag: "wx" }, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}
