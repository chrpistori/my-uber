import axios from "axios";
import { response } from "express";


test("Deve fazer o cálculo do preço de uma corrida", async function () {
    // given, when, then
    // arrange, act, assert
    
    // given or arrange
    const input = [
        { dist: 10, ds: "2021-03-01T10:00:00" }
    ];

    // when or act
    const response = await axios.post("http://localhost:3000/calc", input);
    const output = response.data;
    
    // then or assert
    expect(output.result).toBe(21);
});