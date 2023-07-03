// @ts-nocheck
import CpfUtils from "./CpfUtils";
import CpfCalculator from "./CpfCalculator";

export default class CpfValidator {
  cpfUtils: CpfUtils;
  cpfCalculator: CpfCalculator; 
  validCpf: string;
  cpf: string;

  constructor (readonly cpf: string) {
    this.cpfUtils = new CpfUtils(this.cpf);
    if (!this.cpfUtils.isCpfValid() || this.cpfUtils.hasAllDigitsEqual()) return false;
    this.validCpf = this.cpfUtils.removeMaskCharacters();
    if (!this.cpfUtils.isCpfValidNumber()) return false;
  }

  validate () {
    try {
      this.cpfCalculator = new CpfCalculator(this.validCpf);
      const [firstDigit, secondDigit] = this.cpfCalculator.calculateDigits();
      const firstFinalDigit = this.cpfCalculator.calculateFirstFinalDigit(firstDigit);
      const secondFinalDigit = this.cpfCalculator.calculateSecondFinalDigit(secondDigit, firstFinalDigit);
      return this.cpfCalculator.isVerifierDigitValid(firstFinalDigit, secondFinalDigit);
    } catch (e) {
      console.error("Erro: " + e);
      return false;
    }
  }
}