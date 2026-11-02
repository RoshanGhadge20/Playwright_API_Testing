// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

import { test, expect } from '@playwright/test';

test.describe('Restful Booker - GET Booking', () => {

  // Example 1: all IDs (no params)
  // test('Get all booking ids', async ({ request }) => {
  //   const response = await request.get('https://restful-booker.herokuapp.com/booking');
  //   expect(response.status()).toBe(200);

  //   const body = await response.json();
  //   expect(Array.isArray(body)).toBeTruthy();
  //   expect(body[0]).toHaveProperty('bookingid');
  // });

  // Example 2: filter by name (query params)
  test('Get bookings filtered by firstname and lastname', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking', {
      params: {
        firstname: 'Sally',
        lastname: 'Brown',
      },
    });
    // Resulting URL: /booking?firstname=sally&lastname=brown
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log(body);
  });

  // Example 3: filter by checkin/checkout date (format CCYY-MM-DD)
  test('Get bookings filtered by checkin and checkout', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking', {
      params: {
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
    });
    expect(response.status()).toBe(200);
  });

  // All query params together
  test('Get bookings with all query params', async ({ request }) => {
    const response = await request.get('/booking', {
      params: {
        firstname: 'sally',
        lastname: 'brown',
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
    });
    expect(response.status()).toBe(200);
  });

  // Path parameter: GET /booking/:id
  test('Get booking by id (path parameter)', async ({ request }) => {
    const bookingId = 1;
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('firstname');
    expect(body).toHaveProperty('lastname');
    expect(body).toHaveProperty('totalprice');
    expect(body).toHaveProperty('bookingdate');
  });

  // Better: create a booking first, then fetch it by its real id
  test('Create booking then get it by id', async ({ request }) => {
    const create = await request.post('/booking', {
      data: {
        firstname: 'Sally',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Breakfast',
      },
    });
    const { bookingid } = await create.json();

    const get = await request.get(`/booking/${bookingid}`);
    expect(get.status()).toBe(200);
    expect((await get.json()).firstname).toBe('Sally');
  });
});


test('Create booking', async ({ request }) => {
  const response = await request.post('https://restful-booker.herokuapp.com/booking',
    {
      headers:
      {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data:
      {
        "firstname": "Sally",
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

  console.log(response.status());
  const responseBody = await response.json();
  console.log(responseBody);
});