## OLX Test – Local Development & E2E Tests

### Run the app locally

1. Install dependencies (first time only):

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the URL shown by Vite (by default `http://localhost:5173/`) in your browser.

### Run Playwright end‑to‑end tests

Make sure the app is running locally (via `npm run dev`), then in another terminal run:

```bash
npm run test:e2e
```

This will execute the Playwright tests defined under the `tests` directory.

### Production deployment

The app is deployed to Vercel and can be accessed here:

`https://olx-test.vercel.app/`

## Description

This App have two pages, Home and Post Ads.

### Home
On this page i tried to mimic the olx website. I create a "fake header". All it can do is click on the Sell button and the translation button.
The Ads that you see on the Home page are static data. You can see when loading the data for the first time, You see Skeletons.
This App is responsive you can test it by shrinking the browser. Also this App can be translated to Arabic.
when you click on Sell, you will be taken to the Post page.

### Post
This page displays again the Categories. when you click on one you will see the categories and sub categories in a list view.
When you select a category you will see the dynamic form

### Post form
This Form is populated by the endpoint. I tried to mimic as much as possible the Olx form, Even though the backend returns the form in a weird way.
I put most of my effort on "Properties for Sale." I am using react hook form to manage the form. This form does not submit it just logs the data sent to the api. ( in the submit function we should use useMutation from tanstack query to submit the form)

### Architecture

You can see i used an modular and atomic approach. You have the modules folder that contains all reused components, functions, hooks.
these elements can be used in any page we want.

You have the ui folder, that contains the ui elements ( of course i don't have all things in there but i wanted to show you my way of doing things and that we can add on it)

You have the apiClients and queries folder. I am using Tanstack query to manage the data coming from the api and axios to make the calls.

You have the pages, that contains the pages of the app.

I added unit tests for some components, of course we can do more tests but for the sake of this excerise i chose couple of components to test them using jest and react testing library. 
I also created an e2e test using playwright, that tests the create post feature.



