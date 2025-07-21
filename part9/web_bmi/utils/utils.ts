export const isNotNumber = (argument: string | number): boolean =>
    isNaN(Number(argument));

export const getNumber = (argument: string | number): number => {
    if (!isNotNumber(argument)) {
        return Number(argument);
    } else {
        throw new Error('Provided values were not numbers!');
    }
};