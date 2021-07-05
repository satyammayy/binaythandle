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
const redditFetcher_1 = __importDefault(require("../../lib/redditFetcher"));
const request_1 = __importDefault(require("../../lib/request"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'subred',
            description: 'Fetches post from reddit',
            aliases: ['sr', 'reddit'],
            category: 'utils',
            usage: `${client.config.prefix}subred [subredit_name]`,
            dm: true,
            baseXp: 30
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void (yield M.reply(`Please provide the subreddit you want to fetch`));
            const response = yield redditFetcher_1.default(joined.toLowerCase().trim());
            if (response.error)
                return void (yield M.reply('Invalid Subreddit'));
            const res = response;
            if (res.nsfw && !(yield this.client.getGroupData(M.from)).nsfw)
                return void M.reply(`Cannot Display NSFW content before enabling. Use ${this.client.config.prefix}activate nsfw to activate nsfw`);
            const thumbnail = this.client.assets.get('spoiler');
            return void M.reply(yield request_1.default.buffer(res.url), baileys_1.MessageType.image, undefined, undefined, `🖌️ *Title: ${res.title}*\n👨‍🎨 *Author: ${res.author}*\n🎏 *Subreddit: ${res.subreddit}*\n🌐 *Post: ${res.postLink}*`, thumbnail && res.spoiler ? thumbnail : undefined);
            
        });
    }
}
exports.default = Command;
