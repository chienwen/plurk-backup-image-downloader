使用方法

1. 安裝 [node.js](https://nodejs.org/)
2. 下載噗浪備份檔，解壓縮到一個資料夾，確認資料夾內有 `index.html` 和 `data` 資料夾。
3. 下載這個程式 `backup_images.js` 放到那個資料夾內（跟 `index.html` 放一起）。
4. 開啟「命令提示字元」或 PowerShell，切換到那個資料夾。 [參考](https://blog.miniasp.com/post/2017/09/06/Windows-Explorer-tips-open-cmd-and-VSCode-quickly)
5. 執行 `npm install request`
6. 執行 `node backup_images.js`
7. 完成，他會建立一個資料夾叫 `plurk_images`，所有你在噗浪上傳的圖片都會下載好放在裡面。
