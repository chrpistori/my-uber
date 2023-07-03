import { calculate } from "../src/RideCalculator";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", function () {
    // given or arrange
    const segments = [
        { distance: 10, date: new Date("2021-03-01T10:00:00") }
    ];
    // when or act
    const price = calculate(segments);
    // then or assert
    expect(price).toBe(21);
});

test("Deve fazer o cálculo do preço de uma corrida durante a noite", function () {
    const segments = [
        { distance: 10, date: new Date("2021-03-01T23:00:00") }
    ];
    const price = calculate(segments);
    expect(price).toBe(39);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de dia", function () {
    const segments = [
        { distance: 10, date: new Date("2021-03-07T10:00:00") }
    ];
    const price = calculate(segments);
    expect(price).toBe(29);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de noite", function () {
    const segments = [
        { distance: 10, date: new Date("2021-03-07T23:00:00") }
    ];
    const price = calculate(segments);
    expect(price).toBe(50);
});

test("Deve retornar -1 se a distanceância for inválida", function () {
    const segments = [
        { distance: -10, date: new Date("2021-03-07T10:00:00") }
    ];
    const price = calculate(segments);
    expect(price).toBe(-1);
});

test("Deve retornar -2 se a data for inválida", function () {
    const segments = [
        { distance: 10, date: new Date("bla") }
    ];
    const price = calculate(segments);
    expect(price).toBe(-2);
});

test("Deve fazer o cálculo do preço de uma corrida durante o dia com preço mínimo", function () {
    const segments = [
        { distance: 3, date: new Date("2021-03-01T10:00:00")}
    ];
    const price = calculate(segments);
    expect(price).toBe(10);
});

test("Deve fazer o cálculo do preço de uma corrida com múltiplos segmentos", function () {
    const segments = [
        { distance: 10, date: new Date("2021-03-01T10:00:00")},
        { distance: 10, date: new Date("2021-03-01T12:00:00")}
    ];
    const price = calculate(segments);
    expect(price).toBe(42);
});