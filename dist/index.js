var _a;
import dotenv from 'dotenv';
dotenv.config({
    path: [
        '.env.sample',
        '.env'
    ]
});
import app from './app.js';
import http from 'node:http';
const port = normalizePort(process.env.NODE_DOCKER_PORT || 3000);
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);
server.on("error", onError);
(_a = app.db) === null || _a === void 0 ? void 0 : _a.sequelize.authenticate({ logging: false }).then(() => {
    console.log("\n Connected to database. \n\n\n");
}).catch((err) => {
    console.error('\n Unable to reach database: \n\n\n' + err);
    process.exit(1);
});
function normalizePort(val) {
    let port;
    if (typeof val === 'string') {
        port = parseInt(val, 10);
    }
    else {
        port = val;
    }
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : typeof addr !== null ? `port ${addr === null || addr === void 0 ? void 0 : addr.port}` : `port `;
    console.log(`API Listening on ${bind}`);
}
function onError(error) {
    // @ts-ignore
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // @ts-ignore
    switch (error.code) {
        case "EACCES":
            console.error(bind + ' required elevated privileges');
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use, please use an other port or shutdown the running process");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
