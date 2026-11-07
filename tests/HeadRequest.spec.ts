import { test, expect } from '@playwright/test'

test(" Working with Head Request", async ({ request }) => {

    const response = await request.head("https://restful-booker.herokuapp.com/booking");

    console.log(response.status());
    console.log(response);
    expect(response.status()).toBe(200);
    expect(response.headers()).toBeDefined();
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');

    // const responseBody = await response.json();
    // console.log(responseBody);

});