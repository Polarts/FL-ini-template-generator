const { globSync } = require("glob");
const { argv } = require("process");
const { getSectionsFromIni, turnIniObjToTypes } = require("./functions");

const folderPath = argv[2];
console.log("path:", folderPath);
const iniFiles = globSync(`${folderPath}/**/*.ini`, { ignore: ["INTRO/**", "IW09/**"], windowsPathsNoEscape: true  });
console.log(iniFiles);
const sectionTemplates = {};
iniFiles.forEach(file => {
    getSectionsFromIni(file).forEach(section => {
        const sectionName = Object.keys(section)[0];
        if (sectionName in sectionTemplates) {
            Object.assign(sectionTemplates[sectionName], turnIniObjToTypes(Object.values(section)[0]));
        } else {
            const [key, iniObj] = Object.entries(section)[0];
            sectionTemplates[key] = turnIniObjToTypes(iniObj);
        }
    });
});

console.log(sectionTemplates);
