import { test, expect } from '@playwright/test'

const categoriesResponse = [
  {
    id: 1,
    name: 'Cars',
    name_l1: 'سيارات',
    externalID: 'cars',
    slug: 'cars',
    level: 0,
    parentID: null,
    displayPriority: 0,
    purpose: 'for-sale',
    roles: [],
    locationDepthLimits: { min: 0, max: 0 },
    configurations: {},
    statistics: { activeCount: 0 },
    paaSections: null,
    templateConfigs: null,
    templateHashes: null,
    children: [
      {
        id: 10,
        name: 'Sedan',
        name_l1: 'سيدان',
        externalID: 'sedan',
        slug: 'sedan',
        level: 1,
        parentID: 1,
        displayPriority: 0,
        purpose: 'for-sale',
        roles: [],
        locationDepthLimits: { min: 0, max: 0 },
        configurations: {},
        statistics: { activeCount: 0 },
        paaSections: null,
        templateConfigs: null,
        templateHashes: null,
        children: [],
      },
    ],
  },
]

const categoryFieldsResponse = {
  '10': {
    flatFields: [],
    childrenFields: [],
    parentFieldLookup: {},
  },
  common_category_fields: {
    flatFields: [],
    childrenFields: [],
    parentFieldLookup: {},
  },
}

test('user can create a post from home through to post form submit', async ({
  page,
}) => {
  // Mock categories and category fields API responses
  await page.route('**/api/categories', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(categoriesResponse),
    })
  })

  await page.route('**/api/categoryFields**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(categoryFieldsResponse),
    })
  })

  // Start from home
  await page.goto('/')

  // Click Sell in the home header to go to /post
  await page.getByRole('button', { name: 'Sell' }).click()
  await expect(page).toHaveURL(/\/post$/)

  // Select root category (card view)
  await page.getByRole('button', { name: /Cars/ }).click()

  // Now in list view: select sub category "Sedan"
  await page.getByRole('button', { name: /Sedan/ }).click()

  // We should be on the post form
  await expect(page).toHaveURL(/\/post-form$/)

  // Fill required contact fields
  await page
    .getByPlaceholder('Enter your name')
    .fill('John Doe')
  await page
    .getByPlaceholder('Enter mobile phone number')
    .fill('12345678')

  // Optionally choose a contact method (not required, but closer to real usage)
  await page.getByRole('button', { name: /Phone Number/ }).click()

  // Submit the form
  await page.getByRole('button', { name: 'Submit' }).click()

  // After submit there should be no visible "required" validation errors
  await expect(page.getByText('This field is required')).toHaveCount(0)
})


