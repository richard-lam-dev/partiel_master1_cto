const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const nodemailer = require('nodemailer');
const cors = require('cors');

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

// Relation entre Adherent et Cours
Adherent.belongsToMany(Cours, { through: 'AdherentCours' });
Cours.belongsToMany(Adherent, { through: 'AdherentCours' });

// Synchronisation des modèles et peuplement de la base de données
const initializeDatabase = async () => {
  await sequelize.sync({ force: true });

  // Peuplement de la base de données
  const adherents = await Adherent.bulkCreate([
    { name: 'Patoche', email: 'damien.dasilva@eemi.com', age: 30 },
    { name: 'Marketa', email: 'victor.dane@eemi.com', age: 15, parentalContact: 'sebastian.onise@eemi.com' },
    { name: 'Richard Lam', email: 'richard.lam1998@gmail.com', age: 13,  parentalContact: 'richard.lam@eemi.com'}
  ]);

  const courses = await Cours.bulkCreate([
    { name: 'Cours de danse', category: 'Danse' },
    { name: 'Entrainement de football', category: 'Sports' },
    { name: 'Entrainement de basket', category: 'Sports'},
    { name: 'Cours de chant', category: 'Musique'},
  ]);

  // Assignation des adhérents aux cours
  const patoche = adherents[0];
  const marketa = adherents[1];
  const richard = adherents[2];
  const dance = courses[0];
  const soccer = courses[1];
  const basket = courses[2];
  const chant = courses[3];

  await patoche.addCours(dance);
  await marketa.addCours(dance);
  await richard.addCours(dance);
  await patoche.addCours(soccer);
  await richard.addCours(soccer);
  await marketa.addCours(basket);
  await richard.addCours(chant);

};

initializeDatabase();

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'richard.lam1998@gmail.com',
    pass: 'nohn mszk yobj qciu'
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
      from: 'richard.lam1998@gmail.com',
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
