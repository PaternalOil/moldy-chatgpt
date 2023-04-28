const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const key = process.env['api'];
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: key,
});
const openai = new OpenAIApi(configuration); // openai api
app.use(bodyParser.json()); // stackoverflow 'post request issue' fix


app.use('/', express.static(path.join(__dirname, 'src')))

app.get('/', (req, res) => {
  res.render('index.html')
});

app.post('/ai', async (req, res) => {
  console.log(req.body) // returns [{role: 'user', content: 'hi'}]
  try {
    const messages = req.body  ; 
    console.log(messages, " the messages in question <<") // returns undefined  the messages in question <<
    let aiRes = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    }); 
    /* 
      OpenAI API
    */
    
    console.log(aiRes.data.choices[0].message);
    res.send(aiRes.data.choices[0].message)
  } catch (e) {
    console.log('openai shit itself')
  }
});


app.listen(PORT, () => {
  console.log(`App online at ${ PORT }`);
});


