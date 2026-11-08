import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test("Post API Call", async ({ request }) => {

    const payload = {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 100, max: 1000 }),
        depositpaid: faker.datatype.boolean(),
        bookingdates: {
            checkin: faker.date.past({ years: 1 }).toISOString().split('T')[0],
            checkout: faker.date.future({ years: 1 }).toISOString().split('T')[0],
        },
        additionalneeds: faker.helpers.arrayElement(["Breakfast", "Lunch", "Dinner", "None"])
    }

    const response = await request.post("https://restful-booker.herokuapp.com/booking", {
        headers:
        {
            contentType: "application/json"
        },
        data: payload
    });

    // console.log(response);
    console.log(await response.status());
    const responseBody = await response.json();
    console.log(responseBody);
});