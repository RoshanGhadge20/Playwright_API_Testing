import { test, expect } from '@playwright/test';

test(" Get Request with help of request fixture", async ({ request }) => {

    const response = await request.get("https://restful-booker.herokuapp.com/booking");
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
});