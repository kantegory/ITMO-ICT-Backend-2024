"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_js_1 = __importDefault(require("amqplib/callback_api.js"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite = sqlite3_1.default.verbose();
const db = new sqlite.Database('logs.db');
db.exec(`CREATE TABLE IF NOT EXISTS logs (id integer primary key autoincrement, path text, code integer, method TEXT);`);
callback_api_js_1.default.connect('amqp://rabbitmq', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        const queue = 'logs_queue';
        channel.assertQueue(queue, {
            durable: false,
        });
        console.log('[*] Waiting for messages in %s. To exit press CTRL+C', queue);
        channel.consume(queue, function (msg) {
            if (!msg)
                return;
            const log = JSON.parse(msg.content.toString());
            console.log(`Received: ${msg.content.toString()}`);
            db.run(`INSERT INTO logs (path, code, method) VALUES (?, ?, ?)`, [log.path, log.code, log.method], function (error) {
                if (error) {
                    console.log('Failed to save a log: %s', error);
                }
            });
        }, {
            noAck: true,
        });
    });
});
//# sourceMappingURL=index.js.map