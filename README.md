# Nuxt Form Demo with Serverless Function

This project is a Nuxt application demonstrating a form component that submits data to a serverless function. The app is deployed via Vercel, meaning the form submits to a vercel function that sends email using [Resend](https://resend.com/).

> **NOTE**
>
> Because it's a demo project and I'm using the free version of Resend, all emails from form submissions will be send to my email address.


## Project Setup and Requirements

- Node.js: v22.17.0 (LTS July 2025)
- npm: v11.4.2 (the latest stable release as of June 2025)

```sh
npm install
npm run dev
```

The development server will run on port 3000. Open https://localhost:3000/ in your browser. You should see a form with validation that sends an email upon successful submission.


## Technologies

This application is primarily built with Nuxt. Below is a table of tools used, their versions, and why they were chosen:

| Tool | version | Why? |
|----------|----------|----------|
| nuxt    | 3.17.6     | The main technology to build this frontend application |
| zod    | 3.25.76     | TypeScript-first schema validation with static type inference, installed as the validation library for the form |
| resend    | 4.6.0     | Simple email API without overhead, free to development tests, and decent integration with Nuxt and Vercel |
| Vitest    | 3.2.4     | Recommended unit test framework |
| @nuxt/ui    | 3.2.0     | One of the best UI libraries that works seamlessly with Nuxt and offers responsiveness, a11y, theme-ing, and highly flexible |
| vue-router    | 4.5.1     | Comes with Nuxt Ui for auto imports |
| @antfu/eslint-config    | 4.16.2     | My favorite formatter and addition to eslint |


## Decisions

This is a simple, focused demo project. I chose Nuxt because it integrates well with serverless functions and is my preferred framework for building demo frontend apps.
For the UI, I opted for [NuxtUI](https://ui.nuxt.com/). Benefits of the library:
- Reka UI component library
- Tailwind CSS integration
- Easy themes and colors

The form components in Nuxt UI have built-in validation lib support and submission handling. I selected Zod to manage schema validation across the project.

To send emails after form submission, I made use of [Resend](https://resend.com/). It's a simple email provider that provides APIs for developers and has good quickstart guides for Nuxt and Vercel projects. I made an account and got an API key and added it to my project to connect to Resend. 

### Structure

The root route `App.vue` imports a Form component from `/components` directory.
The `Form.vue` component uses a few elements from NuxtUI library to construct the form. Semantically the form is a `form` element with a `@submit` handler that listens to when the `button` element with `type=submit` is triggered. Zod handles the validation of the values of the form fields. When `onSubmit` is triggered, a server api route is called to handle the submission logic. If submission is successful, user sees a success toast message. If submission goes wrong, user sees an error message.

The `server/api/send-email.post.ts` acts as the serverless function. It checks if the validations pass once more and then uses the email API from Resend. This file acts as a serverless function when deployed to platforms like Vercel, Netlify, or Cloudflare Workers. No manual server is managed or deployed (Nitro the server engine from Nuxt handles the logic), just an API file is written and the cloud provider (Vercel in my case) runs the function on demand (when the form is submitted).

### Deployment with Vercel

The github repo if this app is connected to a Vercel account to show a real cloud serverless form submission. Please check: https://nuxt-form-serverless-demo.vercel.app/ 


## Unit Tests with [Vitest](https://vitest.dev/)

The testing in this project is not extensive but to demonstrate an example, I used vitest and testing library to make a quick unit test.

```sh
npm run test
```
