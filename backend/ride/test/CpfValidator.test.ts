import CpfValidator from "../src/CpfValidator";

test("Deve informar que o CPF informado é válido", function () {
    const cpfValidator = new CpfValidator("07959873909");
    const result = cpfValidator.validate();
    expect(result).toBeTruthy();
});

test("Deve informar que o CPF informado é inválido", function () {
    const cpfValidator = new CpfValidator("07959873908");
    const result = cpfValidator.validate();
    expect(result).toBeFalsy();
});

test("Deve informar que o CPF informado é inválido porque tem todos os dígitos iguais", function () {
    const myTestFunction = () => new CpfValidator("88888888888");
    expect(myTestFunction).toThrow(new Error("Invalid CPF - All numbers are equal. Please try again."))
});

test("Deve informar que o CPF informado com caracteres da máscara é um CPF válido.", function () {
    const cpfValidator = new CpfValidator("635.656.769-49");
    const result = cpfValidator.validate();
    expect(result).toBeTruthy();
});

test("Deve informar que o CPF informado com caracteres da máscara é um CPF inválido.", function () {
    const cpfValidator = new CpfValidator("635.656.769-48");
    const result = cpfValidator.validate();
    expect(result).toBeFalsy();
});

test("Deve informar que o CPF informado é composto apenas por números.", function () {
    const cpfValidator = new CpfValidator("079.598.739-09");
    const result = cpfValidator.validate();
    expect(result).toBeTruthy();
});

test("Deve informar que o CPF informado não é composto apenas por números.", function () {
    const myTestFunction = () => new CpfValidator("079.598.739-0O");
    expect(myTestFunction).toThrow(new Error("Invalid CPF - Only numbers and mask characters are allowed (e.g: '999.999.999-99'). Please try again."));
});

test("Deve informar que o CPF informado não segue o padrão da máscara 999.999.999-99", function () {
    const myTestFunction = () => new CpfValidator("079.598.739-0O0");
    expect(myTestFunction).toThrow(new Error("Invalid CPF - The pattern 999.999.999-99 must be followed. Please try again."));
});