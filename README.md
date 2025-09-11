# 📞 Kodianic Contact Form API with WhatsApp Notification

This project is a **Node.js + Express + MongoDB** backend that stores contact form submissions in a MongoDB database and sends a **WhatsApp notification** via [CallMeBot API](https://www.callmebot.com/).

---

## 🚀 Features

* Save contact form submissions (`name`, `email`, `phone`, `description`) into MongoDB.
* Automatically send a WhatsApp notification when a new contact is saved.
* Uses **Mongoose** schema validation.
* Environment variable support with `dotenv`.
* REST API (`/api/contact`) ready for frontend integration.

---

## 🛠️ Tech Stack

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB + Mongoose](https://mongoosejs.com/)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [CallMeBot WhatsApp API](https://www.callmebot.com/)

---

## 📂 Project Structure

```
📦 project
 ┣ 📂 models
 ┃ ┗ 📜 contactModel.js
 ┣ 📂 routes
 ┃ ┗ 📜 contactRoutes.js
 ┣ 📂 utils
 ┃ ┗ 📜 sendToWhatsapp.js
 ┣ 📜 server.js
 ┣ 📜 .env
 ┣ 📜 package.json
 ┗ 📜 README.md
```

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/maluki65/kodianic-backend.git
   cd contact-api
   ```

2. **Install dependencies**

   ```bash
   npm install express mongoose cors nodemon dotenv
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root:

   ```ini
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourdb
   WHATSAPP_PHONE=+254700000000   # Your WhatsApp number with country code
   WHATSAPP_API_KEY=123456        # CallMeBot API key
   ```

---

## ▶️ Running the Server

Start in development mode with **nodemon**:

```bash
npm run dev
```

Or with Node:

```bash
node server.js
```

---

## 📜 API Endpoints

### **POST** `/api/contact`

Submit a new contact request.

#### Request Body:

```json
{
  "name": "John Doe",
  "Email": "johndoe@example.com",
  "phone": 254712345678,
  "description": "I’d like to know more about your services."
}
```

#### Response:

```json
{
  "saved": {
    "_id": "650c8a5f87...",
    "name": "John Doe",
    "Email": "johndoe@example.com",
    "phone": 254712345678,
    "description": "I’d like to know more about your services.",
    "createdAt": "2025-09-11T09:00:00.000Z"
  },
  "waResponse": {
    "success": true,
    "result": "Message sent successfully."
  }
}
```

---

## 📦 Files Explained

### `models/contactModel.js`

Defines the Mongoose schema:

---

### `routes/contactRoutes.js`

Handles saving contact and sending WhatsApp notification:

---

### `utils/sendToWhatsapp.js`

Utility to send WhatsApp message using CallMeBot:
---

## 🛡️ Notes

* Even if the WhatsApp API fails, the contact data is still saved.
* If you want to **only save when WhatsApp succeeds**, move the `contact.save()` after `sendToWhatsapp`.
* CallMeBot sometimes takes a few minutes to activate a new API key (you may need to send a test message manually first).

---

## 📜 License

MIT License – feel free to use and modify.

---