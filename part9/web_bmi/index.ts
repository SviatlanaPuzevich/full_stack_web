import express from 'express';
import qs from 'qs';
import {calculateBmi} from "./bmiCalculator";
import {getNumber} from "./utils/utils";
import {calculateExercises} from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.set('query parser',
    (str: string) => qs.parse(str));

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const params = req.query;
        // @ts-ignore
        const height = getNumber(params.height);
        // @ts-ignore
        const weight = getNumber(params.weight);
        const bmi = calculateBmi(height, weight);
        res.send({
            weight,
            height,
            bmi
        });
    } catch (_err) {
        res.status(400).send({
            error: "malformatted parameters"
        });
    }

});

app.post('/exercises', (req, res) => {
    try {
        const body = req.body;
        if (!body.daily_exercises || !body.target) {
            res.status(400).send({error: "parameters missing"})
            return;
        }
        res.send(calculateExercises(body.daily_exercises, body.target));
    } catch (_err) {
        res.status(400).send({
            error: "malformatted parameters"
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});