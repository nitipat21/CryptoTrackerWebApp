import { NextApiRequest, NextApiResponse } from "next"
import fetchTwitterData from "../../twitterAPI/api"

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
    try {
        const result = await fetchTwitterData(request);
        response.status(200).json({ result })
    } catch (err) {
        response.status(500).json({ error: err })
    }
}