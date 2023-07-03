// @ts-nocheck
function calculateRest(digit) {
  return digit % 11;
}

function calculateSecondDigit(secondDigit, firstFinalDigit) {
  return secondDigit + 2 * firstFinalDigit;
}

function calculateFinalDigit(rest) {
  return rest < 2 ? 0 : 11 - rest;
}

function getProvidedVerifierDigit(cpf) {
  return cpf.substring(cpf.length - 2, cpf.length);
}

function concatenateCalculatedVerifierDigit(firstFinalDigit, secondFinalDigit) {
  return `${firstFinalDigit}${secondFinalDigit}`;
}

export function calculateFirstFinalDigit(firstDigit) {
  const rest = calculateRest(firstDigit);
  return calculateFinalDigit(rest);
}

export function calculateSecondFinalDigit(secondDigit, firstFinalDigit) {
  const rest = calculateRest(calculateSecondDigit(secondDigit, firstFinalDigit));
  return calculateFinalDigit(rest);
}

export function calculateDigits(cpf) {
  let [firstDigit, secondDigit] = [0, 0];
  for (let digitsIterator = 1; digitsIterator < cpf.length - 1; digitsIterator++) {
    const auxiliarDigit = parseInt(cpf.substring(digitsIterator - 1, digitsIterator));
    firstDigit += (11 - digitsIterator) * auxiliarDigit;
    secondDigit += (12 - digitsIterator) * auxiliarDigit;
  }
  return [firstDigit, secondDigit];
}

export function isVerifierDigitValid(cpf, firstFinalDigit, secondFinalDigit) {
  const providedVerifierDigit = getProvidedVerifierDigit(cpf);
  const calculatedVerifierDigit = concatenateCalculatedVerifierDigit(firstFinalDigit, secondFinalDigit);
  return providedVerifierDigit === calculatedVerifierDigit;
}

