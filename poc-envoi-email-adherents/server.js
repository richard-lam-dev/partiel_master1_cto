const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Charger les variables d'environnement

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuration de la base de données SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Modèle Adherent
const Adherent = sequelize.define('Adherent', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  parentalContact: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Modèle Cours
const Cours = sequelize.define('Cours', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relation entre adherent et cours
Adherent.belongsToMany(Cours, { through: 'AdherentCours' });
Cours.belongsToMany(Adherent, { through: 'AdherentCours' });

// Synchronisation des modèles et peuplement de la base de données
const initializeDatabase = async () => {
  await sequelize.sync({ force: true });

  // Peuplement de la base de données
  const adherents = await Adherent.bulkCreate([
    { name: 'Patoche', email: process.env.TEST_EMAIL1, age: 30 },
    { name: 'Vic', email: process.env.TEST_EMAIL2, age: 15, parentalContact: process.env.TEST_PARENTAL_CONTACT1 },
    { name: 'Richard Lam', email: process.env.TEST_EMAIL3, age: 13, parentalContact: process.env.TEST_PARENTAL_CONTACT2 }
  ]);

  const courses = await Cours.bulkCreate([
    { name: 'Cours de danse', category: 'Danse' },
    { name: 'Entrainement de football', category: 'Sports' },
    { name: 'Entrainement de basket', category: 'Sports'},
    { name: 'Cours de chant', category: 'Musique'},
  ]);

  // Assignation des adhérents aux cours
  const patoche = adherents[0];
  const vic = adherents[1];
  const richard = adherents[2];
  const dance = courses[0];
  const soccer = courses[1];
  const basket = courses[2];
  const chant = courses[3];

  await patoche.addCours(dance);
  await vic.addCours(dance);
  await richard.addCours(dance);
  await patoche.addCours(soccer);
  await richard.addCours(soccer);
  await vic.addCours(basket);
  await richard.addCours(chant);

};

initializeDatabase();

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Route pour récupérer les cours
app.get('/courses', async (req, res) => {
  try {
    const courses = await Cours.findAll();
    res.send(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Error fetching courses');
  }
});

// Route pour envoyer des emails
app.post('/sendEmails', async (req, res) => {
  const { courseId, subject, message } = req.body;

  try {
    console.log('Received request to send emails');
    const course = await Cours.findByPk(courseId, {
      include: Adherent
    });

    if (!course) {
      return res.status(404).send('Course not found');
    }

    const recipients = course.Adherents.flatMap(adherent => {
      const emails = [adherent.email];
      if (adherent.age < 18 && adherent.parentalContact) {
        emails.push(adherent.parentalContact);
      }
      return emails;
    });

    console.log('Recipients:', recipients);

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: recipients.join(','),
      subject: subject,
      text: message
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Error sending emails: ' + error.message);
  }
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
