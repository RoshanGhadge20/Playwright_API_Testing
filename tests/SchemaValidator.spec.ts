import { test, expect } from '@playwright/test'
import Ajv from 'ajv';


test("Schema Validation", async ({ request }) => {

    const response = await request.get("https://restful-booker.herokuapp.com/booking");
    // console.log(response);

    console.log(response.status());
    const responseBody = await response.json();
    // console.log(responseBody);

    const bookingSchema =

    {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "bookingid": {
                    "type": "string"
                }
            },
            "required": [
                "bookingid"
            ]
        }
    }

    const AJVObj = new Ajv();
    const validate = AJVObj.compile(bookingSchema);
    const result = validate(responseBody);
    console.log(result);

    expect(result, JSON.stringify(validate.errors)).toBe(true);

});