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

test('user can create a post from home through to post form submit', async ({
  page,
}) => {
  // Use mocked categories so the category tree is deterministic,
  // but let the real /categoryFields API drive the dynamic form.
  await page.route('**/api/categories', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(categoriesResponse),
    })
  })

  await page.goto('/')

  await page.getByRole('button', { name: 'Sell' }).click()
  await expect(page).toHaveURL(/\/post$/)

  await page.getByRole('button', { name: /Cars/ }).click()

  await page.getByRole('button', { name: /Sedan/ }).click()

  await expect(page).toHaveURL(/\/post-form$/)

  await page
    .getByPlaceholder('Enter your name')
    .fill('John Doe')
  await page
    .getByPlaceholder('Enter mobile phone number')
    .fill('12345678')

  await page.getByRole('button', { name: /Phone Number/ }).click()

  await page.getByRole('button', { name: 'Submit' }).click()

  const errorLocator = page.getByText('This field is required')
  const errorCount = await errorLocator.count()

  for (let i = 0; i < errorCount; i++) {
    const error = errorLocator.nth(i)
    const row = error.locator('..').locator('..')

    const input = row.locator('input').first()
    if (await input.count()) {
      await input.fill('123')
      continue
    }

    const button = row.getByRole('button').first()
    if (await button.count()) {
      await button.click()
    }
  }

  await page.getByRole('button', { name: 'Submit' }).click()

  await expect(page.getByText('This field is required')).toHaveCount(0)
})


