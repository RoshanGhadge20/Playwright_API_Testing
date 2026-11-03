import { test, expect } from '@playwright/test';

test("Post API Call", async ({ request }) => {

    const response = await request.post("https://restful-booker.herokuapp.com/booking", {
        headers:
        {
            contentType: "application/json"
        },
        data: {
            "firstname": "Lavnaya",
            "lastname": "Ghadge",
            "totalprice": 222,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-02-11",
                "checkout": "2026-03-11"
            },
            "additionalneeds": "Breakfast"
        }
    });

    // console.log(response);
    console.log(await response.status());
    const responseBody = await response.json();
    console.log(responseBody);

});