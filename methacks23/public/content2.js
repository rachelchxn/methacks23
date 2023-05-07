const apiKey = '4Iu13lorghAGuBtMJgQ19aVUHfsdtexuX3meFpLN'; // Replace with your Cohere API key

async function rewordToxicText(desiredPrompt) {

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
    max_tokens: 6,
    return_likelihoods: 'NONE',
    truncate: 'END',
    // prompt: `Describe the harmful comment in a vague and neutral way. Example1: INPUT: You should eat less that 2000 calories a day. OUTPUT: An statement about daily food intake. Example2: INPUT: Fat girls should not eat more. OUTPUT: A harmful remark about different body sizes. Example3: INPUT: You should not eat too late in the night. OUTPUT: An opinion about eating habits. Example4: INPUT: ${desiredPrompt}. OUTPUT:`, 
    prompt: `"${desiredPrompt}" In one to a few words, this is a statement about `
})
  };

  try {
    const response = await fetch('https://api.cohere.ai/v1/generate', options);
    const json = await response.json();
    console.log(json.generations[0].text.trim())
    return `A statement about ${json.generations[0].text.trim()}. Hidden by ZenSphere`;
  } catch (err) {
    console.error(err);
    return 'Unthoughtful words hidden by ZenSphere.'; // Fallback text
  }
}

const sentences = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, tq, caption, span, a');

const sentenceIndices = [];
const inputtedText = Array.from(sentences)
  .map((sentence, index) => {
    if (sentence.textContent.length > 20) {
      sentenceIndices.push(index);
      return sentence.textContent;
    }
    return null;
  })
  .filter(text => text !== null)
  .slice(0, 96);

const options = createOptions(inputtedText);

fetch('https://api.cohere.ai/v1/classify', options)
  .then(response => response.json())
  .then(async (data) => {
    console.log('Data:', data);
    // Access the response data
    for (let i = 0; i < data.classifications.length; i++) {
      if (data.classifications[i].prediction === 'Toxic') {
        console.log('Toxic prediction found');
        const newSentence = await rewordToxicText(inputtedText[i]);
        console.log('New sentence:', newSentence);
        const originalText = inputtedText[i];
        const selection = sentences[sentenceIndices[i]];

        const spanElement = document.createElement('span');
        spanElement.className = 'blur-out';
        spanElement.innerHTML = newSentence;

        const buttonElement = document.createElement('button');
        buttonElement.innerText = 'Reveal Original Text';
        let isOriginalVisible = false;
        buttonElement.addEventListener('click', () => {
          if (isOriginalVisible) {
            spanElement.innerHTML = newSentence;
            buttonElement.innerText = 'Reveal Original Text';
            isOriginalVisible = false;
          } else {
            spanElement.innerHTML = originalText;
            buttonElement.innerText = 'Hide Original Text';
            isOriginalVisible = true;
          }
        });

        spanElement.appendChild(buttonElement);

        selection.innerHTML = '';
        selection.appendChild(spanElement);
      }
    }
  })
  .catch(err => console.error(err));





function createOptions(inputtedText) {
  return {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer 4Iu13lorghAGuBtMJgQ19aVUHfsdtexuX3meFpLN'
    },
    body: JSON.stringify({
      inputs: inputtedText,
      examples: [
        {text: 'You are so skinny! What is your secret?', label: 'Toxic'},
        {text: 'Sugar is bad for you', label: 'Toxic'},
        {text: 'Eat less, exercise more', label: 'Toxic'},
        {text: 'Being pretty means being skinny', label: 'Toxic'},
        {text: 'Apple cider vinegar is good for weight loss', label: 'Toxic'},
        {text: 'You would look better if you lost some weight', label: 'Toxic'},
        {text: 'You should try this new diet', label: 'Toxic'},
        {text: 'You must be starving yourself', label: 'Toxic'},
        {text: 'Eating complete, balanced meals is healthy', label: 'Benign'},
        {text: 'Types of eating disorders', label: 'Benign'},
        {text: 'Try that again', label: 'Benign'},
        {text: 'Hello everyone, excited to be here', label: 'Benign'},
        {text: 'I think I saw it first', label: 'Benign'},
        {text: 'That is an interesting point', label: 'Benign'},
        {text: 'I love this', label: 'Benign'},
        {text: 'We provide help and support', label: 'Benign'},
        {text: 'No one is perfect, go easy on yourself', label: 'Benign'}
        ],
      truncate: 'END',
      model: 'large'
    })
  };
}