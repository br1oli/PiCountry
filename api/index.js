//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const db = require('./src/db.js');
const { conn } = require('./src/db.js');
const { countryDataBase } = require('./CountryDB/countryDB')

// Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
//   server.listen(3001, () => {
//     countryDataBase()
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    countryDataBase()
    console.log("%s listening at 3001"+ process.env.PORT); // eslint-disable-line no-console
  });
});
