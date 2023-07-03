import axios from "axios";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
    // given or arrange
    const input = {
        segments: [
            { distance: 10, date: "2021-03-01T10:00:00" }
        ]
    };
    // when or act
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;
    // then or assert
    expect(output.price).toBe(21);
});