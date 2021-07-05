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
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'unban',
            description: 'Unbans the tagged users',
            category: 'dev',
            usage: `${client.config.prefix}unban [@tag]`
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!((_a = this.client.config.mods) === null || _a === void 0 ? void 0 : _a.includes(M.sender.jid)))
                return void null;
            if ((_b = M.quoted) === null || _b === void 0 ? void 0 : _b.sender)
                M.mentioned.push(M.quoted.sender);
            if (!M.mentioned.length || !M.mentioned[0])
                return void M.reply('Please mention the user whom you want to unban');
            let text = '*STATE*\n\n';
            for (const user of M.mentioned) {
                const data = yield this.client.getUser(user);
                const info = this.client.getContact(user);
                const username = info.notify || info.vname || info.name || user.split('@')[0];
                if (!(data === null || data === void 0 ? void 0 : data.ban)) {
                    text += `🟨 ${username}: Not Banned\n`;
                    continue;
                }
                yield this.client.unbanUser(user);
                text += `🟩 ${username}: Unbanned\n`;
            }
            M.reply(text);
        });
    }
}
exports.default = Command;
