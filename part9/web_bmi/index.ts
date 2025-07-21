import express from 'express';
import qs from 'qs';
import {calculateBmi} from "./bmiCalculator";
import {getNumber} from "./utils/utils";
const app = express();
app.use(express.json());

app.set('query parser',
    (str: string) => qs.parse(str))

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const params = req.query
        const height = getNumber(params.height);
        const weight = getNumber(params.weight);
        const bmi = calculateBmi(height, weight);
        res.send({
            weight,
            height,
            bmi
        });
    } catch (err) {
        res.status(400).send({
            error: "malformatted parameters"
        });
    }

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});