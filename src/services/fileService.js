const path = require('path');
const uploadSingleFile = async (fileObject) => {
    let uploadPath = path.resolve(__dirname, "../public/images/upload")
    let exName = path.extname(fileObject.name);
    let baseName = path.basename(fileObject.name, exName);
    let finalName = `${baseName}-${Date.now()}${exName}`;
    let finalPath = `${uploadPath}/${finalName}`;
    try {
        await fileObject.mv(finalPath);
        return {
            status: "success",
            path: finalName,
            error: null
        }
    }
    catch (error) {
        console.log(">>> check error ", error);
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(error)
        }
    }

}
const uploadMultiFiles = async (fileArr) => {
    try {

        let uploadPath = path.resolve(__dirname, "../public/images/upload")
        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < fileArr.length; i++) {
            let exName = path.extname(fileArr[i].name);
            let baseName = path.basename(fileArr[i].name, exName);
            let finalName = `${baseName}-${Date.now()}${exName}`;
            let finalPath = `${uploadPath}/${finalName}`;
            try {
                await fileArr[i].mv(finalPath);
                resultArr.push({
                    status: "success",
                    path: fileArr[i].name,
                    error: null
                })
                countSuccess++;

            }
            catch (error) {
                await fileArr[i].mv(finalPath);
                resultArr.push({
                    status: 'failed',
                    path: null,
                    error: JSON.stringify(error)
                })
            }
        }
        return {
            countSuccess: countSuccess,
            detail: resultArr
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    uploadSingleFile,
    uploadMultiFiles
}