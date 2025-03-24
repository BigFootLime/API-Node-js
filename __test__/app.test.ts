import request from "supertest";
import {app} from "../src/app";
import {describe, expect, test} from '@jest/globals'

describe("Test du point d'entrée!", () => {
    test("Catch all route", async () => {
        const response = await request(app).get("/");
        expect(response.body)
        .toEqual({message:"Bienvenue sur mon API Express avec TypeScript ✨"});
    });
});


