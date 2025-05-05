








const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || "SPARK-X-2025;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0hQWHdhTUJBZmw2T09VSlZ2K2RDQ2tyS2RIVXNTWk5pU2JEeitNdzJXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUy9EZllKR3F4bzNaMzRGNWJMQUZ6TjdnM1QxTDlGL1d5K1BBempaOUNDYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxT1N2cnVXR3RuRXJLWUsvYmZxZ3dxQzJsOWExcjRvRHhrN2ZyN1VuU2tVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJST2lJNStlMGlyQy9Qb2xITkJsNlZjSGpRTGprU25WL2VudUYrVVRtbHd3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdPRGJRK1lycU9vNmhvV2NKT3M2UVdUd2hONUZZQXQ4blBLdUlZVFJxa1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRKN2l4NGdmMDBCQ1JPaThGbXNMU1V2TnFZaTRHT2Jma2oxVEk0S0RpeUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib013QkxJN1kvYjdPZmErakhFY0RwNkdxZFlUU2IzbTZoQlJwMWFCSzNGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMndHalZMK21MK3R0c0NOM29RTVhzaUkvb2ZRbUFrWUFzUXE1VGJ5eVVqND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxLdHBKN1VBeWhPVHdiSjNkWUZOSUE0dFdKLy9RK0dZMWI5Mzk3eUUyOWpDVUtHSmlVa29WZHBGaHB3SFJaL2dvLzFMRThtNzQ4bmJDV1VlNTNTdWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTgsImFkdlNlY3JldEtleSI6InpPT3B2MzNlbzhUVlJZUGo0QjZZWUZEYVBROGVieDdpcDdpTVpmTHA3Wkk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0Nzg4NDA5MTA1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijk2QTkxODYyMzlERDQ5MzNGRjdDMDJDNzI3QzkwNDlDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDQ5OTc2MTR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc4ODQwOTEwNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDMDNFMDg3NEE3MDkxNUI0RjczNzYyRjNBMEZEMjVBOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ0OTk3NjMyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnY01SbDlFbVF2S19idThDbm8ybGZRIiwicGhvbmVJZCI6ImI1ZjRlYWY4LWE4OGQtNDg4Ni1hMTQ5LWRjNTgxZTY3YzQ1MSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpNGk1K29UN1llTy9EeERONUdOaUo1eE5QeFE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFRmSysxTGJCQ28zL2RLWEQ1OElOQnk1bkcwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVNTVFaRTFOIiwibWUiOnsiaWQiOiIyNTQ3ODg0MDkxMDU6NjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU8OuZ3RyeWdnciBFeXN0ZWlubiBTaWd1csOwYXJzb24ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09XN3A3TUNFTm1aaXNBR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlY3V0w4Y2tTTlJISHpadWhSaXptVUlFLy84N2RrVEF6SFR0cnJhOVB3eW89IiwiYWNjb3VudFNpZ25hdHVyZSI6IlZsR0hlZkFjOXhtOXdBUkxuOFI4UHVlR09PQmY5Z3BUUkJJRTVmNVNHR0lLNFl1Y0phc0VWNHAwOFJsN1RMR1g5RHBkN2FFRzdSWDdQUGVRWDdpeUR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJQSXpPb0hFYUEvYXlLTVNEVW5xNWpJdndUZFdkRDBMQzdIcnhLako5M0ZiYXJKUk95eXlJR2hLbkM0OUZYNFRuY0YvUEFmOWRTbktkc1Q2R3RBYlNqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc4ODQwOTEwNTo2N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWZTFpL0hKRWpVUng4MmJvVVlzNWxDQlAvL08zWkV3TXgwN2E2MnZUOE1xIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ0OTk3NjA3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlzZyJ9",
    PREFIXE: process.env.PREFIX || "@",
    OWNER_NAME: process.env.OWNER_NAME || "sîgtryggr",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254788409105",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'EMINEm-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/rfd8e6.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '2',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    CHATBO : process.env.CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'no',
    ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
    ANTI_CALL : process.env.ANTI_CALL || 'yes',
                  MENUTYPE : process.env.MENUTYPE || '',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_SAVE_CONTACTS_NAME: "SPARK-X", // Default name prefix for new contacts
                  AUTO_REPLY_MESSAGE: "", 
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
