const { NlpManager } = require('node-nlp');
const express = require('express');
const manager = new NlpManager({ languages: ['en'] });

const app = express();


// Adds the utterances and intents for the NLP
manager.addDocument('en', 'What is artificial intelligence?', 'ai.definition');
manager.addDocument('en', 'Explain AI', 'ai.definition');
manager.addDocument('en', 'What does AI mean?', 'ai.definition');
manager.addDocument('en', 'What is machine learning?', 'ai.machineLearning');
manager.addDocument('en', 'Explain machine learning', 'ai.machineLearning');
manager.addDocument('en', 'What is the difference between AI and ML?', 'ai.differenceAIvsML');
manager.addDocument('en', 'What are neural networks?', 'ai.neuralNetworks');
manager.addDocument('en', 'Explain neural networks', 'ai.neuralNetworks');
manager.addDocument('en', 'What is deep learning?', 'ai.deepLearning');
manager.addDocument('en', 'How does deep learning work?', 'ai.deepLearning');
manager.addDocument('en', 'What is cybersecurity?', 'security.cybersecurity');
manager.addDocument('en', 'Explain cybersecurity', 'security.cybersecurity');
manager.addDocument('en', 'What is the role of cybersecurity?', 'security.cybersecurity');
manager.addDocument('en', 'What is a firewall?', 'security.firewall');
manager.addDocument('en', 'Explain firewalls', 'security.firewall');
manager.addDocument('en', 'What is encryption?', 'security.encryption');
manager.addDocument('en', 'How does encryption work?', 'security.encryption');
manager.addDocument('en', 'What is phishing?', 'security.phishing');
manager.addDocument('en', 'Explain phishing', 'security.phishing');
manager.addDocument('en', 'What is programming?', 'programming.definition');
manager.addDocument('en', 'Explain programming', 'programming.definition');
manager.addDocument('en', 'What is coding?', 'programming.definition');
manager.addDocument('en', 'What is the difference between coding and programming?', 'programming.differenceCodingVsProgramming');
manager.addDocument('en', 'What is Python used for?', 'programming.pythonUses');
manager.addDocument('en', 'What is JavaScript used for?', 'programming.javascriptUses');
manager.addDocument('en', 'What is an algorithm?', 'programming.algorithm');
manager.addDocument('en', 'Explain algorithms in programming', 'programming.algorithm');

// Train also the NLG
manager.addAnswer('en', 'ai.definition', 'Artificial Intelligence (AI) is the simulation of human intelligence in machines programmed to think like humans and mimic their actions.');
manager.addAnswer('en', 'ai.machineLearning', 'Machine learning is a subset of AI that focuses on building systems that learn from and make decisions based on data.');
manager.addAnswer('en', 'ai.differenceAIvsML', 'AI is a broad concept of machines being able to carry out tasks in a way that we would consider "smart". ML is a subset of AI, focusing on systems that learn from data.');
manager.addAnswer('en', 'ai.neuralNetworks', 'Neural networks are algorithms inspired by the structure and functioning of the human brain, used in machine learning to recognize patterns.');
manager.addAnswer('en', 'ai.deepLearning', 'Deep learning is a subset of ML that uses neural networks with many layers (hence "deep") to analyze various levels of data abstraction.');
manager.addAnswer('en', 'security.cybersecurity', 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks.');
manager.addAnswer('en', 'security.firewall', 'A firewall is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules.');
manager.addAnswer('en', 'security.encryption', 'Encryption is the process of encoding information so only authorized parties can access it, ensuring data security.');
manager.addAnswer('en', 'security.phishing', 'Phishing is a type of social engineering attack where attackers deceive people into revealing sensitive information, often via fraudulent emails.');
manager.addAnswer('en', 'programming.definition', 'Programming is the process of designing and building executable computer software to accomplish specific computing tasks.');
manager.addAnswer('en', 'programming.differenceCodingVsProgramming', 'Coding refers to writing code, while programming involves a broader process of planning, designing, and implementing software.');
manager.addAnswer('en', 'programming.pythonUses', 'Python is a versatile language used for web development, data analysis, artificial intelligence, scientific computing, automation, and more.');
manager.addAnswer('en', 'programming.javascriptUses', 'JavaScript is mainly used for web development, enabling interactive elements on websites, server-side scripting, and app development.');
manager.addAnswer('en', 'programming.algorithm', 'An algorithm is a step-by-step set of instructions for solving a problem or performing a task in programming.');


(async() => {
    await manager.train();
    manager.save();
    // FAQ bot route
    app.get('/bot', async (req, res) => {
        let response = await manager.process('en', req.query.message);
        res.send(response.answer || 'Question yet to be trained by our model');
    })
    app.listen(5000)
})();