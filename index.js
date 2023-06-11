const express = require('express');
const sgMail = require('@sendgrid/mail');
const path = require('path')
require('dotenv').config();
const app = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
app.post('/api/send-email', async (req, res) => {
    const {name, phone, email, message} = req.body;

    try{
        const msg = {
            to: 'silascoley3@gmail.com',
            from: 'silascoley3@gmail.com',
            subject: 'Client Message',
            text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
            `
        }
        await sgMail.send(msg);
        console.log('Email sent successfully');
        res.status(200).send('Email sent successfully');
    }catch (error){
        console.error('Error sending email (Backend):', error);
        res.status(500).send('Error sending email (Backend)');
    }
}) 

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
    console.log(process.env.SENDGRID_API_KEY)
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



