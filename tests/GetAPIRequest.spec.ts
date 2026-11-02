import { test, expect } from '@playwright/test';

/* 
test('Get API REquest', async ({ request }) => {

    const response = await request.get("https://restful-booker.herokuapp.com/booking");
    // console.log(response);

    console.log(response.status());
    const responseBody = await response.json();
    console.log(responseBody);
}); */

test('Get API Request', async ({ request }) => {
    const response = await request.get("https://restful-booker.herokuapp.com/booking", {
        params: {
            "firstname": "Sally",
            "lastname": "Brown"
        }

    });

    // expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(response.status());
    console.log(responseBody);
});