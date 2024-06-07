export const transformString = (input: string) => {
    let result = input.replace(/ /g, '_');

    result = result.replace(/&/g, '20join20');

    return result;
};
