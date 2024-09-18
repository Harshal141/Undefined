import axios from 'axios';

const generateContent = async (prompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const requestData = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };
    try {
      const response = await axios.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return error;
    }
};

export default generateContent;