import { test, expect } from '@playwright/test'

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


