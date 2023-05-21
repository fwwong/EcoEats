const express = require("express");
const router = express.Router();

async function createImage(prompt) {
    try {
        const response = await axios.post('DALLE_API_ENDPOINT', {
            prompt
        });
        const generatedImageUrl = response.data.imageUrl;
        return generatedImageUrl;
    } catch (error) {
        console.error('Error generating image using DALLE API:', error);
        throw new Error('Failed to generate image using DALLE API');
    }
}


router.get('/recipe-img', async (req, res) => {
    res.render("chat", {
        placeholderText: "Write a prompt here...",
        img: ""
    });
});

router.post('/recipe-img', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const imageResponse = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "256x256",
        });
        const image_url = imageResponse.data.data[0].url;

        res.render("chat", {
            placeholderText: "Write a prompt here...",
            img: image_url
        });
    } catch (error) {
        console.error("Error creating image:", error);
    }
});