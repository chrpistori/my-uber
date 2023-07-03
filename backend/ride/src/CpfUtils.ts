// @ts-nocheck
export default class CpfUtils {
  cpf: string;
  MIN_CPF_LENGTH = 11;
  MAX_CPF_LENGTH = 14;

  constructor (readonly cpf: string) {
    if (!this.isCpfValid()) throw new Error("Invalid CPF - The pattern 999.999.999-99 must be followed. Please try again.");
    if (!this.isCpfValidNumber()) throw new Error("Invalid CPF - Only numbers and mask characters are allowed (e.g: '999.999.999-99'). Please try again.");
    if (this.hasAllDigitsEqual()) throw new Error("Invalid CPF - All numbers are equal. Please try again.");
  }
  
  isCpfValid() {
    return this.cpf && this.cpf.length >= this.MIN_CPF_LENGTH && this.cpf.length <= this.MAX_CPF_LENGTH;
  }
  
  isCpfValidNumber() {
    return !isNaN(this.removeMaskCharacters());
  }

  hasAllDigitsEqual() {
    return this.cpf.split("").every(digit => digit === this.cpf[0]);
  }
  
  removeMaskCharacters() {
    return this.cpf.replace(/[.-\s]/g, "");
  }
}