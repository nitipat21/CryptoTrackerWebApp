import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "twitter-api-sdk";

const fetchTwitterData = async (request?:NextApiRequest, response?:NextApiResponse) => {

  const client = new Client(process.env.TWITTER_BEARER_TOKEN as string);

  const next_token = request?.query?.next_token;

  const hashtag = request?.query?.hashtag;

  const result = await client.tweets.tweetsRecentSearch({
    "query": `cryptocurrency cryptonews crypto blockchain lang:en ${hashtag ? hashtag : ""}`,
    "max_results": 10,
    "sort_order": "recency",
    "next_token": `${next_token ? next_token : ""}`
  });
  
  return result
}

export default fetchTwitterData;