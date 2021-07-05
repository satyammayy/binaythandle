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
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const YT_1 = __importDefault(require("../../lib/YT"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'yta',
            description: 'Downloads given YT Video and sends it as Audio',
            category: 'media',
            aliases: ['ytaudio'],
            usage: `${client.config.prefix}ytv [URL]`,
            dm: true,
            baseXp: 20
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            if (!M.urls.length)
                return void M.reply('URL pibirkoh! Donload twrkke audio format ta');
            const audio = new YT_1.default(M.urls[0], 'audio');
            if (!audio.validateURL())
                return void M.reply(`YT gi URL oina twbirkoh PLease`);
            const { videoDetails } = yield audio.getInfo();
            M.reply(yield audio.getThumbnail(), baileys_1.MessageType.image, baileys_1.Mimetype.jpeg, undefined, `🍥BNA (YT HANDLER) *Title:* ${videoDetails.title}\n🕰️ *Duration:* ${videoDetails.lengthSeconds}\n🗒️ *Description:* ${videoDetails.description}`);
            M.reply(yield audio.getBuffer(), baileys_1.MessageType.audio).catch(() => M.reply('An error occurred...'));
        });
    }
}
exports.default = Command;
