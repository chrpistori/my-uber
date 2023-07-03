// @ts-nocheck
import { isCpfValid, hasAllDigitsEqual, removeMaskCharacters, isCpfValidNumber } from './CpfValidationRules';
import { calculateDigits, calculateFirstFinalDigit, calculateSecondFinalDigit, isVerifierDigitValid } from './CpfDigitCalculator';

export function validate(cpf) {
  if (!isCpfValid(cpf) || hasAllDigitsEqual(cpf)) return false;
  cpf = removeMaskCharacters(cpf);
  if (!isCpfValidNumber(cpf)) return false;
  try {
    const [firstDigit, secondDigit] = calculateDigits(cpf);
    const firstFinalDigit = calculateFirstFinalDigit(firstDigit);
    const secondFinalDigit = calculateSecondFinalDigit(secondDigit, firstFinalDigit);
    return isVerifierDigitValid(cpf, firstFinalDigit, secondFinalDigit);
  } catch (e) {
    console.error("Erro: " + e);
    return false;
  }
}