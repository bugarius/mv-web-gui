const isStringNotBlank = (v) => ((v === false || v) && v.toString().replace(/\s+/g, "") && true);

export const StringValueValidator = {
  isNotBlank: isStringNotBlank,
  isBlank: (v) => (!isStringNotBlank(v)),
};