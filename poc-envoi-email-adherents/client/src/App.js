import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function App() {
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const handleSendEmails = async () => {
        if (!courseId || !subject || !message) {
            setAlertMessage('Veuillez sélectionner un cours, entrer un sujet et un message.');
            setAlertVariant('warning');
            return;
        }

        try {
            await axios.post('http://localhost:3000/sendEmails', { courseId, subject, message });
            setAlertMessage('Emails envoyés avec succès !');
            setAlertVariant('success');
            setCourseId('');
            setSubject('');
            setMessage('');
        } catch (error) {
            setAlertMessage('Erreur lors de l\'envoi des emails : ' + error.message);
            setAlertVariant('danger');
        }
    };

    return (
        <Container>
            <h1 className="my-4">Envoyer un mail aux adhérents</h1>
            {alertMessage && (
                <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <Form>
                <Form.Group controlId="formCourse">
                    <Form.Label>Sélectionnez un cours</Form.Label>
                    <Form.Control
                        as="select"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                    >
                        <option value="">Sélectionnez un cours</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formSubject">
                    <Form.Label>Sujet</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Sujet"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Group>
                <Button className="mt-3" variant="primary" onClick={handleSendEmails}>
                    Envoyer le mail
                </Button>
            </Form>
        </Container>
    );
}

export default App;
