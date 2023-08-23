const fs = require("fs");
const ini = require("js-ini");

function getSectionsFromIni(filePath, ...sectionNames) {
    const text = fs.readFileSync(filePath, 'utf-8');
    const sections = [];
    text.split(/(^\[)/gm).forEach(section => {
        if (section && section !== "[") {
            const parsed = ini.parse("[" + section);
            if (sectionNames.includes(Object.keys(parsed)[0]))
                sections.push(parsed);
            else if (sectionNames.length === 0)
                sections.push(parsed);
        }
    });

    return sections;
}

function getDetailedType(val) {
    const isInt = parseInt(val);
    if (isInt) return "int";
    const isFloat = parseFloat(val);
    if (isFloat) return "float";
    val = val.toString();
    if (val.includes("\\")) return `file_path.${val.split('.').at(-1)}`;
    return "string"
}

function turnIniObjToTypes(iniObj) {
    const keyTypePairs = {};
    Object.entries(iniObj).forEach(([key, value]) => {
        let type = getDetailedType(value);
        value = value.toString(); // needed because "getDetailedType" converts the og reference
        if (type === "string" && value.includes(",")) {
            const values = value.replaceAll(" ", "").split(",");
            type = values.reduce((accum, curr, idx) => {
                accum += getDetailedType(curr) + (idx === values.length-1? "" : ", ");
                return accum;
            }, "");
        }
        keyTypePairs[key] = type;
    })
    return keyTypePairs;
}

module.exports = {
    getSectionsFromIni,
    getDetailedType,
    turnIniObjToTypes
}