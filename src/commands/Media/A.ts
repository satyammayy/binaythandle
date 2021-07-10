import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import YT from '../../lib/YT'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'a',
            description: 'dwnload chp1!',
            category: 'media',
            aliases: ['Chapter1'],
            usage: `${client.config.prefix}A`,
            dm: true,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        { url: 'https://giphy.com/gifs/11JTxkrmq4bGE0/html5' }, // send directly from remote url!
          MessageType.video, 
        { mimetype: Mimetype.gif, caption: "hello!" }
      }
        
}
