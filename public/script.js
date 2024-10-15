// Function to ask the bot a question
async function askBot() {
  const question = document.getElementById('user-question').value;
  const response = await fetch(`/bot?message=${encodeURIComponent(question)}`);
  const answer = await response.text();
  document.getElementById('bot-response').innerText = `Bot: ${answer}`;
}

// Function to submit a new FAQ
async function submitFAQ() {
  const question = document.getElementById('new-faq-question').value;
  const answer = document.getElementById('new-faq-answer').value;

  const response = await fetch('/submit-faq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question, answer })
  });
  const result = await response.text();
  document.getElementById('submission-response').innerText = result;
}

// Function to load FAQs dynamically
async function loadFAQs() {
  const response = await fetch('/faqs');
  const faqs = await response.json();
  const faqList = document.getElementById('faq-list');
  faqList.innerHTML = '';
  faqs.forEach(faq => {
    const listItem = document.createElement('li');
    listItem.innerText = faq.question;
    faqList.appendChild(listItem);
  });
}

// Load FAQs when the page loads
window.onload = loadFAQs;
