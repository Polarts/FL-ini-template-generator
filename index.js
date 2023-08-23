const fs = require("fs");
const ini = require("js-ini");
const { globSync } = require("glob");
const { argv } = require("process");
const { getSectionsFromIni, turnIniObjToTypes } = require("./functions");

const folderPath = argv[2];
console.log("path:", folderPath);
const iniFiles = globSync(`${folderPath}/**/*.ini`, { windowsPathsNoEscape: true  });
console.log("Scanning a total of", iniFiles.length, "discovered files");
const sectionTemplates = {};
iniFiles.forEach(file => {
    try {

        getSectionsFromIni(file).forEach(section => {
            const sectionName = Object.keys(section)[0];
            if (sectionName in sectionTemplates) {
                Object.assign(sectionTemplates[sectionName], turnIniObjToTypes(Object.values(section)[0]));
            } else {
                const [key, iniObj] = Object.entries(section)[0];
                sectionTemplates[key] = turnIniObjToTypes(iniObj);
            }
        });
    } catch (e) {
        console.log("found error in", file, "and it will be ignored");        
    }
});

if (!fs.existsSync("out")) fs.mkdirSync("out")
if (argv.includes("json")) {
    fs.writeFileSync("out/templates.json", JSON.stringify(sectionTemplates, null, "\t"));
} else {
    fs.writeFileSync("out/templates.ini", ini.stringify(sectionTemplates, {
        spaceAfter: true,
        spaceBefore: true
    }));
}