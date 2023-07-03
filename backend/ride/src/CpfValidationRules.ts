// @ts-nocheck
export function isCpfValid(cpf) {
    return cpf && cpf.length >= 11 && cpf.length <= 14;
  }
  
  export function hasAllDigitsEqual(cpf) {
    return cpf.split("").every(digit => digit === cpf[0]);
  }
  
  export function isCpfValidNumber(cpf) {
    return !isNaN(cpf);
  }
  
  export function removeMaskCharacters(cpf) {
    return cpf.replace(/[.-\s]/g, "");
  }