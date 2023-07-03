// @ts-nocheck
export default class CpfCalculator {
  cpf: string;

  constructor (readonly cpf: string) {
  }

  calculateDigits() {
    let [firstDigit, secondDigit] = [0, 0];
    for (let digitsIterator = 1; digitsIterator < this.cpf.length - 1; digitsIterator++) {
      const auxiliarDigit = parseInt(this.cpf.substring(digitsIterator - 1, digitsIterator));
      firstDigit += (11 - digitsIterator) * auxiliarDigit;
      secondDigit += (12 - digitsIterator) * auxiliarDigit;
    }
    return [firstDigit, secondDigit];
  }
  
  calculateRest(digit) {
    return digit % 11;
  }
  
  calculateSecondDigit(secondDigit, firstFinalDigit) {
    return secondDigit + 2 * firstFinalDigit;
  }
  
  calculateFinalDigit(rest) {
    return rest < 2 ? 0 : 11 - rest;
  }
  
  getProvidedVerifierDigit() {
    return this.cpf.substring(this.cpf.length - 2, this.cpf.length);
  }
  
  concatenateCalculatedVerifierDigit(firstFinalDigit, secondFinalDigit) {
    return `${firstFinalDigit}${secondFinalDigit}`;
  }
  
  calculateFirstFinalDigit(firstDigit) {
    const rest = this.calculateRest(firstDigit);
    return this.calculateFinalDigit(rest);
  }
  
  calculateSecondFinalDigit(secondDigit, firstFinalDigit) {
    const rest = this.calculateRest(this.calculateSecondDigit(secondDigit, firstFinalDigit));
    return this.calculateFinalDigit(rest);
  }
  
  isVerifierDigitValid(firstFinalDigit, secondFinalDigit) {
    const providedVerifierDigit = this.getProvidedVerifierDigit(this.cpf);
    const calculatedVerifierDigit = this.concatenateCalculatedVerifierDigit(firstFinalDigit, secondFinalDigit);
    return providedVerifierDigit === calculatedVerifierDigit;
  }
} 