export const required = value => {
    if (value) return undefined;
    return 'Field is required';
}

export const maxLengthCreator = maxLength => (value) => {
    if (value && value.length > maxLength) return `Max Length is ${maxLength} symbols`;
    return undefined;
}

export const minLengthCreator = minLength => (value) => {
    if (value && value.length < minLength) return `Min Length is ${minLength} symbols`;
    return undefined;
}