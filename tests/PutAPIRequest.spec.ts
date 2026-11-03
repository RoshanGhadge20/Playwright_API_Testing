import { test, expect } from '@playwright/test';

/* test('Put API Request', async ({ request }) => {

    const response = await request.put("https://restful-booker.herokuapp.com/booking/3907",
        {
            headers:
            {
                contentType: "application/json",
                accept: "application/json",
                cookie: "token=22ef7902d7a9290"
            },
            data: {
                "firstname": "James",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            }
        });

    console.log(await response.status());
    const responseBody = await response.json();
    console.log(responseBody);

}); */


test("Generate Token", async ({ request }) => {
    const postResponse = await request.post("https://restful-booker.herokuapp.com/auth",
        {
            headers:
            {
                contentType: "application/json"
            },
            data: {
                "username": "admin",
                "password": "password123"
            }
        }
    );
    console.log(await postResponse.status());
    const responseBody = await postResponse.json();
    console.log(responseBody);

}); 