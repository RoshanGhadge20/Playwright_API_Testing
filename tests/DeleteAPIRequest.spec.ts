import { test, expect } from '@playwright/test';

test("Delete API Request", async ({ request }) => {

    const response = await request.delete("https://restful-booker.herokuapp.com/booking/3893", {
        headers: {
            contentType: 'application/json',
            Cookie: 'token=f3dfe5a5d2850e5'
        }
    });

    console.log(await response.status());
});