import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import YT from '../../lib/YT'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'ytv',
            description: 'Youtube Video Donwload Twnabne!',
            category: 'media',
            aliases: ['ytvideo'],
            usage: `${client.config.prefix}ytv [URL]`,
            dm: true,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.urls.length) return void M.reply('URL hapirkoh youtube ki video download twnaba!')
        const video = new YT(M.urls[0], 'video')
        if (!video.validateURL()) return void M.reply(`Youtube ki url ntrdi yaday!`)
        const { videoDetails } = await video.getInfo()
        M.reply(
            await video.getThumbnail(),
            MessageType.image,
            Mimetype.jpeg,
            undefined,
            `Made By Satyam Mayengbam \n\n🍥 *Title:* ${videoDetails.title}\n🕰️ *Duration:* ${videoDetails.lengthSeconds}\n🗒️ *Description:* ${videoDetails.description}`
        )
        if (Number(videoDetails.lengthSeconds) > 1500)
            return void M.reply('Cannot Download videos longer than 25 Minutes')
        M.reply(await video.getBuffer(), MessageType.video).catch(() => M.reply('Yoiza! Yadiye Try again...'))
    }
}
