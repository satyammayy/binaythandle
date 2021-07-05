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
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const canvas_1 = __importDefault(require("canvas"));
const gifencoder_1 = __importDefault(require("gifencoder"));
const lib_1 = require("wa-sticker-formatter/lib");
const baileys_1 = require("@adiwajshing/baileys");
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'trigger',
            description: 'Triggers you.',
            aliases: ['triggered'],
            category: 'fun',
            usage: `${client.config.prefix}trigger [image | @mention]`
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const getImage = (image, timeout = 15) => __awaiter(this, void 0, void 0, function* () {
                const img = yield canvas_1.default.loadImage(image);
                const GIF = new gifencoder_1.default(256, 310);
                GIF.start();
                GIF.setRepeat(0);
                GIF.setDelay(timeout);
                const canvas = canvas_1.default.createCanvas(256, 310);
                const ctx = canvas.getContext(`2d`);
                const BR = 20;
                const LR = 10;
                for (let i = 0; i < 9; i++) {
                    ctx.clearRect(0, 0, 256, 310);
                    ctx.drawImage(img, Math.floor(Math.random() * BR) - BR, Math.floor(Math.random() * BR) - BR, 256 + BR, 310 - 54 + BR);
                    ctx.fillStyle = `#FF000033`;
                    ctx.fillRect(0, 0, 256, 310);
                    ctx.drawImage(yield canvas_1.default.loadImage(this.client.assets.get('triggered') || Buffer.from('')), Math.floor(Math.random() * LR) - LR, 310 - 54 + Math.floor(Math.random() * LR) - LR, 256 + LR, 54 + LR);
                    GIF.addFrame(ctx);
                }
                GIF.finish();
                return GIF.out.getData();
            });
            try {
                const image = yield (((_b = (_a = M.WAMessage) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.imageMessage)
                    ? this.client.downloadMediaMessage(M.WAMessage)
                    : ((_e = (_d = (_c = M.quoted) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.imageMessage)
                        ? this.client.downloadMediaMessage(M.quoted.message)
                        : M.mentioned[0]
                            ? this.client.getProfilePicture(M.mentioned[0])
                            : this.client.getProfilePicture(((_f = M.quoted) === null || _f === void 0 ? void 0 : _f.sender) || M.sender.jid));
                const sticker = new lib_1.Sticker(yield getImage(image), {
                    pack: `Triggered`,
                    author: M.sender.username || this.client.config.name,
                    crop: false
                });
                yield sticker.build();
                return void (yield M.reply(yield sticker.get(), baileys_1.MessageType.sticker));
            }
            catch (err) {
                console.log(err);
                M.reply(`Couldn't fetch the required Image`);
            }
        });
    }
}
exports.default = Command;
