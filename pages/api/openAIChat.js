import { Configuration, OpenAIApi } from "openai";
require("dotenv").config();
const configuration = new Configuration({
  organization: process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export default async function handler(req, res) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: req.body.messages,
  });
  res.status(200).json({ result: completion.data });
}
