let desiredprompt = ''; // MAKE THIS THE INPUT SOMEHOW
const setprompt = 'Reword this toxic/harmful text into one that is nicer. Example 1: INPUT: Only males with large muscles are considered men. OUTPUT: Muscle size does not define gender, and everyone deserves recognition and respect regardless of their physical appearance or gender identity. Example2: INPUT: Fat girls should not eat more. OUTPUT: Everyone should focus on eating a balanced and healthy diet, regardless of their body size or shape. Example3: INPUT:' + desiredprompt + '. OUTPUT:';
const url = 'https://api.cohere.ai/gpt/generate';

const apiKey = 'm24CBlVWn5iiojSf5Ap9DmcoJmxFMSFj0Dd1xjg5'; 

const data = {
  model: '216d219d-c725-4b0c-ba89-6935d38b2998-ft',
  prompt: setprompt
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify(data)
};

fetch(url, options)
  .then(response => response.json())
  .then(responseJson => {
    const generations = responseJson.generations;
    const prediction = generations[0].text;
    console.log(`Prediction: ${prediction}`);
  })
  .catch(error => console.error(error));
