import { test, expect } from '@playwright/test'

test("Ping API Call", async ({ request }) => {

    const response = await request.get("https://restful-booker.herokuapp.com/ping");

    console.log(await response.status());
    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();
});