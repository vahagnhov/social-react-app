export type FieldValidatorsType = (value: string) => string | undefined;

export const required: FieldValidatorsType = value => {
    if (value) return undefined;
    return 'Field is required';
}

export const maxLengthCreator = (maxLength: number): FieldValidatorsType => (value) => {
    if (value && value.length > maxLength) return `Max Length is ${maxLength} symbols`;
    return undefined;
}

export const minLengthCreator = (minLength: number): FieldValidatorsType => (value) => {
    if (value && value.length < minLength) return `Min Length is ${minLength} symbols`;
    return undefined;
}

export const validURL: FieldValidatorsType = value => {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    if (value && !pattern.test(value)) return `Invalid url format`;
    return undefined;
}