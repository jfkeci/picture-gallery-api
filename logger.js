import winston from 'winston'
import { transports } from 'winston'

const customFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
        const {
            timestamp, level, message, ...args
        } = info;
        const timestamps = timestamp.slice(0, 19).replace('T', ' ');
        return `${timestamps} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
);

export const logger = winston.createLogger({
    format: customFormat,
    transports: [
        new transports.Console()
    ],
});

