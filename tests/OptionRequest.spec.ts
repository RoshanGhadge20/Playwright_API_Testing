import { test, expect } from '@playwright/test'

test("To verify the OPtion call request", async ({ request }) => {

    const response = await request.fetch("https://restful-booker.herokuapp.com/booking", {
        method: "OPTIONS",
    });

    // console.log(await response.status());
    expect(response.status()).toBe(200);

    const allow = response.headers()["allow"];
    expect(allow).toBeDefined();
    console.log("Allow header:", allow);
    expect(allow).toContain("GET");
    expect(allow).toContain("POST");
    expect(allow).toContain("HEAD");

});