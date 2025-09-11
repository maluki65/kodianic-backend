const dotenv = require('dotenv');
dotenv.config();

async function sendToWhatsapp(contact) {
  const phone = process.env.WHATSAPP_PHONE;
  const apiKey = process.env.WHATSAPP_API_KEY;

  try { 
    const title = contact.budget || contact.serviceName
     ? 'New service request'
     : 'New contact request';

    let message = `${title}:\n\nName: ${contact.name}\nEmail: ${contact.Email}\nPhone: ${contact.phone}\nDescription: ${contact.description}`;

    if (contact.budget) {
      message += `\nBudget: ${contact.budget}`;
    }

    if (contact.serviceName) {
      message += `\nService: ${contact.serviceName}`;
    }

    const text = encodeURIComponent(message);
    const apiUrl = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    const result = await response.text();

    console.log('WHatsApp API response:', result);
    return { success: true, result };

  } catch (error) {
    console.log('WhatsApp API failed:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = sendToWhatsapp;