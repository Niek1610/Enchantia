import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const KEY = process.env.KEY

const configuration = new Configuration({
  apiKey: KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "testing servesdfr",
  });
});

app.options("/", cors());




app.post("/", async (req, res) => {

let raadsels = req.body.raadselvoorbot
let antwoord = req.body.antwoordvoorbot

const geheugen = [
  {
    role: "system",
    content:
      `Je bent een hulp van de Efteling, jouw naam is Pardoes en je gedraagt je ook als Pardoes van de Efteling. Je moet helpen met het oplossen van een raadel. Het raadsel is: ${raadsels}. en het antwoord is: ${antwoord}. je mag het antwoord niet verklappen, alleen als de gebruiker het antwoord goed geraden heeft. je geeft alleen maar hele duidelijke hints wanneer er om hulp gevraagd woord. je geeft 1 hint per antwoord.` ,
  },
];

  try {
    const prompt = req.body.prompt;

    geheugen.push({ role: "user", content: `${prompt}` });

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: geheugen,
      temperature: 1,
      max_tokens: 2048,
      presence_penalty: 1,
      frequency_penalty: 1,
    });

    const antwoord = response.data.choices[0].message.content;

    geheugen.push({ role: "assistant", content: antwoord });

    res.status(200).send({
      bot: response.data.choices[0].message.content
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error || "Er is iets fout gegaan");
  }

});

app.listen(5000, () =>
  console.log("server is running at http://localhost:5000")
);



