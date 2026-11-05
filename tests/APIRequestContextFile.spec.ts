import { test, expect, request } from '@playwright/test';

test(" Get Request with help of request fixture", async () => {
    const APIContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            accept: "application/json",
        }
    });

    const response = await APIContext.get('/booking');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    await APIContext.dispose();

});