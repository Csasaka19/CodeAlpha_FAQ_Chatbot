const { NlpManager } = require('node-nlp');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const manager = new NlpManager({ languages: ['en'] });
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load existing model 
(async () => {
    await manager.load('./models/model.nlp');
})();


// FAQ bot route
app.get('/bot', async (req, res) => {
    let response = await manager.process('en', req.query.message);
    res.json({ answer: response.answer || 'Question yet to be trained by our model' });
});

// Route to add new FAQ
app.post('/add-faq', async (req, res) => {
    const { question, answer } = req.body;

    // Add new document and answer to the model
    manager.addDocument('en', question, `custom.faq.${question}`);
    manager.addAnswer('en', `custom.faq.${question}`, answer);

    // Train the model with the new data without wiping out existing data
    await manager.train();
    
    // Save updated model
    await manager.save();
    
    res.json({ status: 'FAQ added successfully!' });
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
