"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.connectToRabbitMQ = void 0;
const amqp = __importStar(require("amqplib/callback_api"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq";
function connectToRabbitMQ(callback, retries = 5) {
    amqp.connect(RABBITMQ_URL, (err, connection) => {
        if (err) {
            console.error('Failed to connect to RabbitMQ:', err);
            if (retries > 0) {
                console.log(`Retrying in 5 seconds... (${retries} retries left)`);
                setTimeout(() => connectToRabbitMQ(callback, retries - 1), 5000);
            }
            else {
                throw err;
            }
        }
        else {
            console.log('Connected to RabbitMQ');
            callback(connection);
        }
    });
}
exports.connectToRabbitMQ = connectToRabbitMQ;
function sendMessage(queue, message) {
    connectToRabbitMQ((connection) => {
        connection.createChannel((err, channel) => {
            if (err)
                throw err;
            channel.assertQueue(queue, { durable: false });
            channel.sendToQueue(queue, Buffer.from(message));
            console.log(`[x] Sent ${message} to ${queue}`);
            setTimeout(() => {
                connection.close();
            }, 500);
        });
    });
}
exports.sendMessage = sendMessage;
