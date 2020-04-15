export const useFieldValidator = ({name, parentName, currentSchema, index, errors}) =>
{
    const nameChecked = index !== undefined ? name + index : name;
    const fieldError = errors && errors[nameChecked];
    const parentFieldError = errors && errors[parentName] && errors[parentName][nameChecked];
    const fieldSchema = currentSchema && (parentName ?
            (currentSchema[parentName] && currentSchema[parentName][name]) : currentSchema[name]);
    const fieldName = parentName ? parentName + '.' + nameChecked : nameChecked;

    return [fieldSchema, fieldError, parentFieldError, fieldName]
};