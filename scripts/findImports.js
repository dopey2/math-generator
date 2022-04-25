const { findImportsSync} = require('find-imports-ts');
const { getFiles } = require('./utils')

async function main(){
    const path = "src/math/operation"
    const files = await getFiles(path)

    for(const file of files) {
        const res = findImportsSync(file);
        console.log(res);
    }
}

main();


