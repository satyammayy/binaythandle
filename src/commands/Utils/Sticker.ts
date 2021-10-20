import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { Sticker } from 'wa-sticker-formatter'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'sticker',
            description: 'Video/image se sticker onaba command ne!',
            category: 'utils',
            usage: `${client.config.prefix}sticker [(as caption | tag)[video | image]]`,
            dm: true,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
        M.reply(` 🎀_*ɴɢᴀᴋ ɴɢᴀɪʙɪʏᴜᴋᴏ......*_*!*🎀`)
        let buffer
        if (M.quoted?.message?.message?.imageMessage || M.quoted?.message?.message?.videoMessage)
            buffer = await this.client.downloadMediaMessage(M.quoted.message)
        if (M.WAMessage.message?.imageMessage || M.WAMessage.message?.videoMessage)
            buffer = await this.client.downloadMediaMessage(M.WAMessage)
        if (!buffer) return void M.reply(`Image/video caption oina ntra repply twbirkoh!`)
        parsedArgs.flags.forEach((flag) => (parsedArgs.joined = parsedArgs.joined.replace(flag, '')))
        const pack = parsedArgs.joined.split('|')
        const sticker = new Sticker(buffer, {
            pack: pack[1] || '✒️••¤(`×[¤ вιиα ℓσνєѕ яαנєи ¤]×´)¤••💠 ',
            author: pack[2] || '💟••.•´¯`•.•• ωнєи кαкα ωαѕ уσυиg ••.•´¯`•.••💟 ',
            crop: parsedArgs.flags.includes('--stretch')
        })
        await sticker.build()
        await M.reply(await sticker.get(), MessageType.sticker, Mimetype.webp)
    }
}
