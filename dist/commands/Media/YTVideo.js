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
            command: 'ytv',
            description: 'Downloads given YT Video',
            category: 'media',
            aliases: ['ytvideo'],
            usage: `${client.config.prefix}ytv [URL]`,
            dm: true,
            baseXp: 10
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            if (!M.urls.length)
                return void M.reply('YT video download twningbado URL hapirkoh');
            const video = new YT_1.default(M.urls[0], 'video');
            if (!video.validateURL())
                return void M.reply(`Valid YT URL pibirkoh `);
            const { videoDetails } = yield video.getInfo();
            M.reply(yield video.getThumbnail(), baileys_1.MessageType.image, baileys_1.Mimetype.jpeg, undefined, `🍥 *BINA (YT HANDLER)* *Title:* ${videoDetails.title}\n🕰️ *Duration:* ${videoDetails.lengthSeconds}\n🗒️ *Description:* ${videoDetails.description}`);
            if (Number(videoDetails.lengthSeconds) > 1500)
                return void M.reply('25minutes henba video di yade !');
            M.reply(yield video.getBuffer(), baileys_1.MessageType.video).catch(() => M.reply('An error occured...'));
        });
    }
}
exports.default = Command;
