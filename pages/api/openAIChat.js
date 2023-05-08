import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  //   organization: process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION,
  //   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: "org-6HJV7f0t2RwkNElcUTHLgz8r",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
export default async function handler(req, res) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: req.body.messages,
    // messages: [{ role: "user", content: "hello" }],
  });
  res.status(200).json({ result: completion.data.choices[0].message });
}
