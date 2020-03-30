const isStringNotBlank = (v) => ((v === false || v) && v.toString().replace(/\s+/g, "") && true);

const isStringLessThanMaxSize = (s, max) => (s && s.toString().length <= max);

const isStringGreaterThanMaxSize = (s, max) => (s && s.toString().length > max);

const hasStringValidLength = (s, length) => (s && s.toString().length === length);

const isStringLessThanMaxSizeOrBlank = (s, max) =>
{
  return isStringLessThanMaxSize(s, max) || StringValueValidator.isBlank(s)
};

const hasStringValidLengthOrIsBlank = (s, length) =>
{
  return hasStringValidLength(s, length) || StringValueValidator.isBlank(s)
};

const checkInputErrors = (s, max) =>
{
  return StringValueValidator.isBlank(s) || isStringGreaterThanMaxSize(s, max);
};

const checkInputLengthErrors = (s, length) =>
{
  return StringValueValidator.isBlank(s) || !hasStringValidLength(s, length);
};

const checkNumberInputErrors = (s, max) =>
{
  return StringValueValidator.isBlank(s) || isStringGreaterThanMaxSize(s, max) || isNegative(s);
};

const isInputValid = (s, max) =>
{
  return StringValueValidator.isNotBlank(s) && StringValueValidator.isLessThanMax(s, max);
};

const isNumberInputValid = (s, max) =>
{
  return StringValueValidator.isNotBlank(s) && StringValueValidator.isLessThanMax(s, max) && isPositive(s);
};

const isPositive = (s) =>
{
  return !isNegative(s);
};

const isNegative = (s) =>
{
  return s && s.toString().startsWith("-");
};

const startWith = (str, regex) =>
{
  return str && str.startsWith(regex);
};

export const ParcelValidator = {
  isValid: isStringNotBlank,
};

export const GrapevineValidator = {
  isValid: isStringNotBlank,
};

export const HarvestValidator = {
  isValid: isStringNotBlank,
};

export const WineValidator = {
  isValid: isStringNotBlank,
};

export const StringValueValidator = {
  isNotBlank: isStringNotBlank,
  isBlank: (v) => (!isStringNotBlank(v)),
  isLessThanMax: (s, max) => isStringLessThanMaxSize(s, max),
  isGreaterThanMax: (s, max) => isStringGreaterThanMaxSize(s, max),
  allNotBlank: (values) => (values.every(isStringNotBlank)),
  validInputs: (s, max) => checkInputErrors(s, max),
  validInputsLength: (s, length) => checkInputLengthErrors(s, length),
  validNumberInputs: (s, max) => checkNumberInputErrors(s, max),
  isNegative: (s) => isNegative(s),
  hasStringValidLengthOrIsBlank: hasStringValidLengthOrIsBlank
};