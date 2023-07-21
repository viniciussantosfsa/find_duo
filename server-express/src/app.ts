import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

import { convertHourStringToMinutes } from "./utils/convert_hours_to_minutes_string"
import { convertMinutesToHourString } from "./utils/convert_minutes_to_hours_string"

export const app = express();
const prisma = new PrismaClient({
    log: ["query"]
});

app.use(express.json())
app.use(cors())

app.get("/games", async (_req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: { ads: true }
            }
        }
    })
    return res.json(games)
})

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    try {
        const ad = await prisma.ad.create({
            data: {
                gameId,
                name: body.name,
                yearsPlaying: body.yearsPlaying,
                discord: body.discord,
                weekDays: body.weekDays.join(','),
                hourStart: convertHourStringToMinutes(body.hourStart),
                hourEnd: convertHourStringToMinutes(body.hourEnd),
                useVoiceChannel: body.useVoiceChannel,
            }
        })

        return response.status(201).json(ad);
    } catch (err) {
        console.log(err)
        throw new Error("Deu erro oh")
    } finally {
        prisma.$disconnect();
    }
})

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;

    try {
        const ads = await prisma.ad.findMany({
            select: {
                id: true,
                name: true,
                weekDays: true,
                useVoiceChannel: true,
                yearsPlaying: true,
                hourStart: true,
                hourEnd: true,
            },
            where: { gameId },
            orderBy: { createAt: 'desc' }
        })

        return res.json(ads.map(ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinutesToHourString(ad.hourStart),
                hourEnd: convertMinutesToHourString(ad.hourEnd),
            }
        }))
    } catch (err) {
        console.log({ Error: err })
    } finally {
        prisma.$disconnect()
    }
})

app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: { discord: true },
        where: { id: adId }
    })

    return res.json({
        discord: ad.discord,
    })
})