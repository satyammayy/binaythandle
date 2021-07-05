"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = require("@adiwajshing/baileys");
const wa_sticker_formatter_1 = require("wa-sticker-formatter");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'sticker',
            description: 'Converts images/videos into stickers',
            category: 'utils',
            usage: `${client.config.prefix}sticker [(as caption | tag)[video | image]]`,
            dm: true,
            baseXp: 30
        });
        this.run = (M, parsedArgs) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let buffer;
            if (((_c = (_b = (_a = M.quoted) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.imageMessage) || ((_f = (_e = (_d = M.quoted) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.message) === null || _f === void 0 ? void 0 : _f.videoMessage))
                buffer = yield this.client.downloadMediaMessage(M.quoted.message);
            if (((_g = M.WAMessage.message) === null || _g === void 0 ? void 0 : _g.imageMessage) || ((_h = M.WAMessage.message) === null || _h === void 0 ? void 0 : _h.videoMessage))
                buffer = yield this.client.downloadMediaMessage(M.WAMessage);
            if (!buffer)
                return void M.reply(`Photo/Video ama da reply Pibirkoh !`);
            parsedArgs.flags.forEach((flag) => (parsedArgs.joined = parsedArgs.joined.replace(flag, '')));
            const pack = parsedArgs.joined.split('|');
            const sticker = new wa_sticker_formatter_1.Sticker(buffer, {
                pack: pack[1] || '💞🐲𝕭𝖎𝖓𝖆💝𝕽𝖆𝖏𝖊𝖓🐉💞',
                author: pack[2] || '💥 🎀 𝕭𝖔𝖙🎀  💥 ',
                crop: parsedArgs.flags.includes('--stretch')
            });
            yield sticker.build();
            yield M.reply(yield sticker.get(), baileys_1.MessageType.sticker, baileys_1.Mimetype.webp);
        });
    }
}
exports.default = Command;
