// @ts-nocheck
function isCpfValid (cpf) {
    return cpf && cpf.length >= 11 && cpf.length <= 14 && !hasAllDigitsEqual(cpf);
}

function hasAllDigitsEqual (cpf) {
    return cpf.split("").every(digit => digit === cpf[0]);
}

function calculateRest (digit) {
    return digit % 11;
}

function calculateFinalDigit (rest) {
    return rest < 2 ? 0 : 11 - rest;
}

function calculateSecondDigit (digit2, finalDigit1) {
    return digit2 + 2 * finalDigit1;
}

export function validate (cpf) {
	if (!isCpfValid(cpf)) return false;
    cpf=cpf
        .replace('.','')
        .replace('.','')
        .replace('-','')
        .replace(" ","");
    try{
        let [digit1, digit2, finalDigit1, finalDigit2, rest, auxiliarDigit] = [0, 0, 0, 0, 0, 0];

        for (let digitsIterator = 1; digitsIterator < cpf.length -1; digitsIterator++) {
            auxiliarDigit = parseInt(cpf.substring(digitsIterator -1, digitsIterator));
            digit1 = digit1 + ( 11 - digitsIterator ) * auxiliarDigit;
            digit2 = digit2 + ( 12 - digitsIterator ) * auxiliarDigit;
        };
        rest = calculateRest(digit1);
        finalDigit1 = calculateFinalDigit(rest);
        digit2 = calculateSecondDigit(digit2, finalDigit1);
        rest = calculateRest(digit2);
        finalDigit2 = calculateFinalDigit(rest);
        const providedVerifierDigit = cpf.substring(cpf.length-2, cpf.length);
        const calculatedVerifierDigit = "" + finalDigit1 + "" + finalDigit2;
        return providedVerifierDigit == calculatedVerifierDigit;
    } catch (e) {
        console.error("Erro !"+e);
        return false;
    }
}