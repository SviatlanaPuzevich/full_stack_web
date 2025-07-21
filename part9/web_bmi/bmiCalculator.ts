import {getNumber} from "./utils/utils";

interface BmiValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    return {
        value1: getNumber(args[2]),
        value2: getNumber(args[3])
    };
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight * 10000 / (height * height);
    if (bmi < 16) {
        return 'Underweight (Severe thinness)';
    } else if (bmi < 17) {
        return 'Underweight (Moderate thinness)';
    } else if (bmi < 18.5) {
        return 'Underweight (Mild thinness)';
    } else if (bmi < 25) {
        return 'Normal range';
    } else if (bmi < 30) {
        return 'Overweight (Pre-obese)';
    } else if (bmi < 35) {
        return 'Obese (Class I)';
    } else if (bmi < 40) {
        return 'Obese (Class II)';
    } else {
        return 'Obese (Class III)';
    }
};

if (require.main === module) {
    try {
        const {value1, value2} = parseArguments(process.argv);
        console.log(calculateBmi(value1, value2));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}
