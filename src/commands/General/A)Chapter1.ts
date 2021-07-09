import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import YT from '../../lib/YT'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'A',
            description: 'dwnload chp1!',
            category: 'general',
            aliases: ['Chapter1'],
            usage: `${client.config.prefix}A`,
            dm: true,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void M.reply('🎀_*ɴɢᴀᴋ ɴɢᴀɪʙɪʏᴜᴋᴏ......*_*!*🎀')
                                 
        
    }
        
}




