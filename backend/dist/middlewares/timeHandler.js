"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeZoneFormatter = void 0;
function timeZoneFormatter(req, res, next) {
    const timestamp = req.timestamp || new Date().getTime();
    const date = new Date(timestamp);
    const timeZone = req.query.timeZone || 'Europe/Paris';
    const formatTime = (date) => {
        const options = {
            timeZone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return date.toLocaleString('fr-FR', options);
    };
    res.locals.formatTime = formatTime;
    next();
}
exports.timeZoneFormatter = timeZoneFormatter;
