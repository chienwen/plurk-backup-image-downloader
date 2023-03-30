const fs = require('fs');
const request = require('request');
const PLURKS_DIR = './data/plurks/';
const IMAGE_OUTPUT_DIR = './plurk_images/';

function download(url, fileName, callback){
    request(url).pipe(fs.createWriteStream(fileName)).on('close', callback);
};

if (fs.existsSync(PLURKS_DIR)) {
    const jsFiles = fs.readdirSync(PLURKS_DIR);
    const imageUrls = [];
    jsFiles.forEach(jsFile => {
        const rawData = fs.readFileSync(PLURKS_DIR + jsFile, 'utf8');
        const matched = rawData.match(/^BackupData\.plurks\["\d\d\d\d_\d\d"\]=(.+);$/);
        const plurks = JSON.parse(matched[1]);
        plurks.forEach(plurk => {
            const matches = plurk.content.match(/alt="https:\/\/images\.plurk\.com\/[\d\w]+\.jpg"/g);
            if (matches) {
                matches.forEach(raw => {
                    imageUrls.push(raw.substring(5, raw.length - 1));
                });
            }
        });
    });
    console.log('抓取到的噗浪圖片網址', imageUrls);
    if (!fs.existsSync(IMAGE_OUTPUT_DIR)) {
        fs.mkdirSync(IMAGE_OUTPUT_DIR);
    }
    imageUrls.forEach(imageUrl => {
        const matched = imageUrl.match(/\/([^\/]+\.jpg)$/);
        const outputFilePath = IMAGE_OUTPUT_DIR + matched[1];
        download(imageUrl, outputFilePath, () => {
            console.log('下載完成', outputFilePath);
        });
    });
} else {
    console.log('錯誤：這個程式必須放在噗浪的備份資料夾中執行。');
}



