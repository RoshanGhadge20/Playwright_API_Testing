import { test, expect } from '@playwright/test';

test('Patch API Request', async ({ request }) => {

    const response = await request.patch('https://restful-booker.herokuapp.com/booking/1641', {
        headers:
        {
            contentType: 'application/json',
            Accept: 'application/json',
            Cookie: 'token=e6ba8e8e9eec184'
        },
        data:
        {
            "firstname": "James",
            "lastname": "Brown"
        }
    });

    console.log(await response.status());
    expect(await response.status()).toBe(200); // Validation for api status code to  be as 200 only 
    const reponseBody = await response.json();
    console.log(reponseBody);
});