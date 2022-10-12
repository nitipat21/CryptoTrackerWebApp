import { Client } from "twitter-api-sdk";

const fetchTwitterData = async () => {
  const client = new Client(process.env.TWITTER_BEARER_TOKEN as string);

  const response = await client.tweets.tweetsRecentSearch({
    "query": "bitcoin"
  });
  
  return response.data
}

export default fetchTwitterData;