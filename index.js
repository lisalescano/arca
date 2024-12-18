const server = require("./src/server")
const { conn } = require('./src/db');

const PORT = 3000;


conn.sync({ force: true }).then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    })
    }).catch(error => console.error(error))
    