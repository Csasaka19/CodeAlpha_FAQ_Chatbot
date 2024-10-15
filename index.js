const { NlpManager } = require('node-nlp');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const manager = new NlpManager({ languages: ['en'] });
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

// Load initial FAQs from a file
let faqs = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/faqs.json'), 'utf-8'));

// FAQ bot route
app.get('/bot', async (req, res) => {
    const response = await manager.process('en', req.query.message);
    res.send(response.answer || 'This question has not been trained in the system yet.');
});

// Serve FAQs as JSON
app.get('/faqs', (req, res) => {
    res.json(faqs);
});

// Handle new FAQ submission
app.post('/submit-faq', (req, res) => {
    const { question, answer } = req.body;
    if (question && answer) {
        // Add the new FAQ to the list
        faqs.push({ question, answer });

        // Save the updated FAQs to the file
        fs.writeFileSync(path.join(__dirname, 'data/faqs.json'), JSON.stringify(faqs, null, 2));

        res.send('FAQ submitted successfully!');
    } else {
        res.send('Please provide both a question and an answer.');
    }
});

// Train and save the NLP model
(async() => {
    // Add your documents and answers here
    await manager.train();
    manager.save();
    
    app.listen(5000, () => {
        console.log('Server running on port 5000');
    });
})();
