// @ts-nocheck
function isCpfValid (cpf) {
    return cpf && cpf.length >= 11 && cpf.length <= 14;
}

function hasAllDigitsEqual (cpf) {
    return cpf.split("").every(digit => digit === cpf[0]);
}

function isCpfValidNumber (cpf) {
    return !isNaN(cpf);
}

function calculateRest (digit) {
    return digit % 11;
}

function calculateFirstFinalDigit (firstDigit) {
    let rest = calculateRest(firstDigit)
    return calculateFinalDigit(rest);
}

function calculateSecondFinalDigit (secondDigit, firstFinalDigit) {
    let rest = calculateRest(calculateSecondDigit(secondDigit, firstFinalDigit));
    return calculateFinalDigit(rest);
}

function calculateFinalDigit (rest) {
    return rest < 2 ? 0 : 11 - rest;
}

function calculateSecondDigit (secondDigit, firstFinalDigit) {
    return secondDigit + 2 * firstFinalDigit;
}

function removeMaskCharacters(cpf) {
    return cpf.replace(/[.-\s]/g, '');
}

function getProvidedVerifierDigit (cpf) {
    return cpf.substring(cpf.length-2, cpf.length)
}

function concatenateCalculatedVerifierDigit(firstFinalDigit, secondFinalDigit) {
    return `${firstFinalDigit}${secondFinalDigit}`;
}

function isVerifierDigitValid (cpf, firstFinalDigit, secondFinalDigit) {
    const providedVerifierDigit = getProvidedVerifierDigit(cpf);
    const calculatedVerifierDigit = concatenateCalculatedVerifierDigit(firstFinalDigit, secondFinalDigit);
    return providedVerifierDigit == calculatedVerifierDigit;
}

function calculateDigits(cpf) {
    let [firstDigit, secondDigit] = [0, 0];
    for (let digitsIterator = 1; digitsIterator < cpf.length - 1; digitsIterator++) {
      const auxiliarDigit = parseInt(cpf.substring(digitsIterator - 1, digitsIterator));
      firstDigit += (11 - digitsIterator) * auxiliarDigit;
      secondDigit += (12 - digitsIterator) * auxiliarDigit;
    }
    return [firstDigit, secondDigit];
  }

export function validate (cpf) {
	if (!isCpfValid(cpf) || hasAllDigitsEqual(cpf)) return false;
    cpf = removeMaskCharacters(cpf);
    if (!isCpfValidNumber(cpf)) return false;
    try{
        const [firstDigit, secondDigit] = calculateDigits(cpf);
        const firstFinalDigit = calculateFirstFinalDigit(firstDigit);
        const secondFinalDigit = calculateSecondFinalDigit(secondDigit, firstFinalDigit);
        return isVerifierDigitValid(cpf, firstFinalDigit, secondFinalDigit);
    } catch (e) {
        console.error("Erro: "+e);
        return false;
    }
}