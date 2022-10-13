import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "twitter-api-sdk";

const fetchTwitterData = async (request?:NextApiRequest, response?:NextApiResponse) => {
  const client = new Client(process.env.TWITTER_BEARER_TOKEN as string);

  const next_token = request?.query.next_token

  const result = await client.tweets.tweetsRecentSearch({
    "query": "bitcoin lang:en",
    "max_results": 10,
    "sort_order": "relevancy",
    "next_token": `${next_token ? next_token: ""}`
  });
  
  return result
}

export default fetchTwitterData;