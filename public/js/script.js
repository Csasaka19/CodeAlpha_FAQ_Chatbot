document.getElementById('ask-button').onclick = async function() {
    const question = document.getElementById('user-question').value;
    
    const response = await fetch(`/bot?message=${encodeURIComponent(question)}`);
    const data = await response.json();
    
    document.getElementById('response').innerText = data.answer || 'Question not recognized.';
};

document.getElementById('add-faq-button').onclick = async function() {
    const newQuestion = document.getElementById('new-question').value;
    const newAnswer = document.getElementById('new-answer').value;

    await fetch('/add-faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer })
    });

    // Optionally refresh or update the FAQ list here.
};


