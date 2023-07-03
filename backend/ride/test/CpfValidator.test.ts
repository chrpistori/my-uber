import { validate } from "../src/CpfValidator";

test("Deve informar que o CPF informado é válido", function () {
    const cpf = "07959873909";
    const result = validate(cpf);
    expect(result).toBeTruthy();
});

test("Deve informar que o CPF informado é inválido", function () {
    const cpf = "07959873908";
    const result = validate(cpf);
    expect(result).toBeFalsy();
});

test("Deve informar que o CPF informado é inválido porque tem todos os dígitos iguais", function () {
    const cpf = "99999999999";
    const result = validate(cpf);
    expect(result).toBeFalsy();
});

test("Deve informar que o CPF informado com caracteres da máscara é um CPF válido.", function () {
    const cpf = "635.656.769-49";
    const result = validate(cpf);
    expect(result).toBeTruthy();
});

test("Deve informar que o CPF informado com caracteres da máscara é um CPF inválido.", function () {
    const cpf = "635.656.769-49";
    const result = validate(cpf);
    expect(result).toBeTruthy();
});

test("Deve informar que o CPF informado é composto apenas por números.", function () {
    const cpf = "635.656.769-49";
    const result = validate(cpf);
    expect(result).toBeTruthy();
});

test("Deve informar que o CPF informado não é composto apenas por números.", function () {
    const cpf = "635.656.769-4O";
    const result = validate(cpf);
    expect(result).toBeFalsy();
});