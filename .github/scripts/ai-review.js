import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const diff = fs.readFileSync("pr-diff.txt", "utf-8");
// const eslint = fs.readFileSync("eslint-report.json", "utf-8");
const biome = fs.readFileSync("biome-report.json", "utf-8");

const prompt = `
${fs.readFileSync(".github/prompts/architecture-review.txt", "utf-8")}

### DIFF DO PR
${diff}

### BIOME
${biome}
`;

const res = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.2,
});

const output = res.choices[0].message.content;
console.log(output);

const parsed = JSON.parse(output);

if (parsed.bloquear_merge) {
  console.error("🚫 Merge bloqueado pela IA Arquitetural");
  process.exit(1);
}
