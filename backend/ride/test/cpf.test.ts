import { validate } from "../src/cpf";


test("Deve informar que o CPF informado é válido", function () {
    const cpf = "07959873909";
    const result = validate(cpf);
    expect(result).toBeTruthy();
});

test("Deve informar que o CPF informado não é válido", function () {
    const cpf = "07959873908";
    const result = validate(cpf);
    expect(result).toBeFalsy();
});