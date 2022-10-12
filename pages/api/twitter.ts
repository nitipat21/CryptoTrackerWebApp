import { NextApiRequest, NextApiResponse } from "next"
import fetchTwitterData from "../../twitter/fetchAPI"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        const result = await fetchTwitterData();
        res.status(200).json({ result })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}