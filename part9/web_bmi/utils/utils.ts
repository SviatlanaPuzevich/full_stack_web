export const isNotNumber = (argument: any): boolean =>
    isNaN(Number(argument));

export const getNumber = (argument: any): number => {
    if (!isNotNumber(argument)) {
        return  Number(argument);
    } else {
        throw new Error('Provided values were not numbers!');
    }
}