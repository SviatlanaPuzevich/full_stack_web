import express from 'express';
import diagnosesRoute from './routes/diagnoses';
import patientsRoute from './routes/patients';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRoute);
app.use('/api/patients', patientsRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});