var fs = require('fs');

var test = {
    className: null,
    imports: null
}

fs.readFile('/Users/rafael.tavares/projects-mp/github/inLoco-2.0/src/components/Charts/ExampleHighcharts.js', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    data = data.split(" ");
    for (var index = 0; index < data.length; index++) {
        var element = data[index];
        if (element === "class"){
            test.className = data[index+1];
            console.log(test.className);
        }
    }
});

fs.readFile('/Users/rafael.tavares/projects-mp/github/inLoco-2.0/tests/tests-boilerplate.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    data = JSON.parse(data);
    for (var index = 0; index < data.imports.length; index++) {
        var what = data.imports[index].what;
        var where = data.imports[index].where;
        test.imports = "import "+ what + " from " + where + "\n";
    }
    for (var index = 0; index < data.tests.length; index++) {
        var element = data.tests[index];
        if (element.name === "snapshot"){
            var varName = test.className.charAt(0).toLowerCase() + test.className.slice(1);
            element.testString =
            `it('componente renderiza corretamente', () => {
    const ${varName} = shallow(<${test.className}/>);
    expect(${varName}).toMatchSnapshot();
})`;
            test.testString = element.testString;
        }
    }
    writeTest(test);
});



function writeTest(data){
    fs.writeFile("/Users/rafael.tavares/projects-mp/github/inLoco-2.0/src/test.js", data.imports + data.testString, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}
