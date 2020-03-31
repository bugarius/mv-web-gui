const isStringNotBlank = (v) => ((v === false || v) && v.toString().replace(/\s+/g, "") && true);

const hasStringValidLength = (s, length) => (s && s.toString().length === length);

const hasStringValidLengthOrIsBlank = (s, length) =>
{
  return hasStringValidLength(s, length) || StringValueValidator.isBlank(s)
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
  hasStringValidLengthOrIsBlank: hasStringValidLengthOrIsBlank
};