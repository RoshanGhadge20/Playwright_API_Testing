import { test, expect } from '@playwright/test';

const baseURL = "https://restful-booker.herokuapp.com";

test.describe("End to End API Flow", () => {
    test.describe.configure({ mode: 'serial' });

    let token: string;
    let bookingId: number;

    test("Generate Token", async ({ request }) => {
        const tokenResponse = await request.post(`${baseURL}/auth`,
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
        console.log(await tokenResponse.status());
        const tokenResponseBody = await tokenResponse.json();
        console.log(tokenResponseBody);
        token = tokenResponseBody.token;
    });

    test("Create Booking", async ({ request }) => {
        const bookingResponse = await request.post(`${baseURL}/booking`, {
            headers:
            {
                contentType: "application/json"
            },
            data: {
                "firstname": "Roshan",
                "lastname": "Ghadge",
                "totalprice": 224,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2026-06-11",
                    "checkout": "2026-07-11"
                },
                "additionalneeds": "Breakfast"
            }
        });
        // console.log(bookingResponse);
        console.log(await bookingResponse.status());
        const bookingResponseBody = await bookingResponse.json();
        console.log(bookingResponseBody);
        bookingId = bookingResponseBody.bookingid;
    });

    test('Fetching the booking Details', async ({ request }) => {
        const getResponse = await request.get(`${baseURL}/booking/${bookingId}`,);
        console.log(getResponse.status());
        const getResponseBody = await getResponse.json();
        console.log(getResponseBody);
    });

    test('update booking with put api call', async ({ request }) => {
        const putResponse = await request.put(`${baseURL}/booking/${bookingId}`,
            {
                headers:
                {
                    contentType: "application/json",
                    accept: "application/json",
                    cookie: `token=${token}`
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

        console.log(await putResponse.status());
        const putResponseBody = await putResponse.json();
        console.log(putResponseBody);
    });

    test('Update booking with patch api call', async ({ request }) => {
        const patchResponse = await request.patch(`${baseURL}/booking/${bookingId}`, {
            headers:
            {
                contentType: 'application/json',
                Accept: 'application/json',
                Cookie: `token=${token}`
            },
            data:
            {
                "firstname": "Sample",
                "lastname": "Sample"
            }
        });

        console.log(await patchResponse.status());
        expect(await patchResponse.status()).toBe(200); // Validation for api status code to  be as 200 only 
        const patchReponseBody = await patchResponse.json();
        console.log(patchReponseBody);
    });

    test("Delete Booking Request", async ({ request }) => {
        const deleteResponse = await request.delete(`${baseURL}/booking/${bookingId}`, {
            headers: {
                contentType: 'application/json',
                Cookie: `token=${token}`
            }
        });

        console.log(await deleteResponse.status());

        const verifyDeleteResponse = await request.get(`${baseURL}/booking/${bookingId}`);
        expect(await verifyDeleteResponse.status()).toBe(404); // Not found
    });
});