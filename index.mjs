import dotenv from "dotenv"
dotenv.config({
   path: './.env'
})
import * as fs from "fs"
import { GoogleGenerativeAI } from "@google/generative-ai";

 const input = "make qiuzz of 5 questions"
const image = "ques.jpeg";
const genAI = new  GoogleGenerativeAI(process.env.API_KEY);

function fileToGenrativePart (path , mimeType) {
    return{
        inlineData:
        {
          data: Buffer.from(fs.readFileSync(path)).toString("base64"),
          mimeType,
        },
    }
}
async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision"});
    const prompt = `${input}.make qiuzz of mcq having 4 options and answer seperatly in following json
    format.{"question":[{"id":0,"question":"","options":[],"answer":""}, ...]} `
    
    const imageParts = [fileToGenrativePart(`${image}`, "image/jpeg")];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
      console.log("Can't generate Because of the internal error",error);
  }
   
}
run();