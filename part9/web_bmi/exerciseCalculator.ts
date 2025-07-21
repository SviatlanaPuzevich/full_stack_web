import {getNumber} from "./utils/utils";

type RatingDescription = 'not too bad but could be better' | 'you are on the right way' | 'perfect'

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: RatingDescription,
    target: number,
    average: number
}

interface ExercisesArgs {
    dailyTargetHours: number,
    weekTrainingHours: number[]
}

const parseArguments = (args: string[]): ExercisesArgs => {
    let exercisesArgs: ExercisesArgs = {
        dailyTargetHours: 0,
        weekTrainingHours: []
    }
    if (args.length < 4) throw new Error('Not enough arguments');
    exercisesArgs.dailyTargetHours = getNumber(args[2])
    exercisesArgs.weekTrainingHours = [];
    for (let i = 3; i < args.length; i++) {
        exercisesArgs.weekTrainingHours.push(getNumber(args[i]));
    }
    return exercisesArgs;
}

function calculateExercises(weekTrainingHours: number[], dailyTargetHours: number): Result {
    const average = weekTrainingHours.reduce((acc, h) => acc + h, 0) / weekTrainingHours.length;
    return {
        periodLength: weekTrainingHours.length,
        trainingDays: weekTrainingHours.reduce((acc, h) => acc + (h > 0 ? 1 : 0), 0),
        success: average >= dailyTargetHours,
        rating: average < dailyTargetHours
            ? 1
            : average === dailyTargetHours
                ? 2
                : 3,
        ratingDescription: average < dailyTargetHours
            ? 'not too bad but could be better'
            : average === dailyTargetHours
                ? 'you are on the right way'
                : "perfect",
        target: dailyTargetHours,
        average
    }
}


try {
    const {dailyTargetHours, weekTrainingHours} = parseArguments(process.argv);
    console.log(calculateExercises(weekTrainingHours, dailyTargetHours))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
