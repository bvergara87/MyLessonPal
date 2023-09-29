# Create classroom resources in seconds

This is a generative AI tool for teachers and professors.

[Live Demo](https://mylessonpal.com/)

## Overview

- 💻 [Stack](#stack)
- 🧠 [Quickstart](#quickstart)
- 👩‍💻 [How to contribute to this repo](#how-to-contribute-to-this-repo)

## Stack

The stack is based on the [AI Getting Started Stack](https://github.com/a16z-infra/ai-getting-started):

- Auth: [Clerk](https://clerk.com/)
- App logic: [Next.js](https://nextjs.org/)
- LLM orchestration: [Langchain.js](https://js.langchain.com/docs/)
- Text model: [OpenAI](https://platform.openai.com/docs/models)
- Generation history: [Upstash](https://upstash.com/)
- Deployment: [Fly](https://fly.io/)

## Quickstart

The following instructions should get you up and running with a fully
functional, local deployment of MyLessonPal, ready to generate resources right out the gate.

### 1. Fork and Clone repo

Fork the repo to your Github account, then run the following command to clone the repo:

```
git clone git@github.com:[YOUR_GITHUB_ACCOUNT_NAME]/MyLessonPal.git
```

### 2. Install dependencies

```
cd MyLessonPal
npm install
```

### 3. Fill out secrets

```
cp .env.local.example .env.local
```

Secrets mentioned below will need to be copied to `.env.local`

a. **Clerk Secrets**

Go to https://dashboard.clerk.com/ -> "Add Application" -> Fill in Application name/select how your users should sign in -> Create Application
Now you should see both `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` on the screen
<img width="1398" alt="Screen Shot 2023-07-10 at 11 04 57 PM" src="https://github.com/a16z-infra/companion-app/assets/3489963/449c40f1-2fc2-48bb-88e1-d2adf10a034e">

If you want to text your AI companion in later steps, you should also enable "phone number" under "User & Authentication" -> "Email, Phone, Username" on the left hand side nav:

<img width="1013" alt="Screen Shot 2023-07-10 at 11 05 42 PM" src="https://github.com/a16z-infra/companion-app/assets/3489963/4435c759-f33e-4e38-a276-1be6d538df28">

b. **OpenAI API key**

Visit https://platform.openai.com/account/api-keys to get your OpenAI API key if you're using OpenAI for your language model.

c. **Upstash API key**

- Sign in to [Upstash](https://upstash.com/)
- Under "Redis" on the top nav, click on "Create Database"
- Give it a name, and then select regions and other options based on your preference. Click on "Create"
  <img width="507" alt="Screen Shot 2023-07-10 at 11 06 36 PM" src="https://github.com/a16z-infra/companion-app/assets/3489963/2b8647f3-7242-448b-8db1-ec76f2d59275">

- Scroll down to "REST API" section and click on ".env". Now you can copy paste both environment variables to your `.env.local`
  <img width="866" alt="Screen Shot 2023-07-10 at 11 07 21 PM" src="https://github.com/a16z-infra/companion-app/assets/3489963/f8e6c43f-8810-423e-86b4-9e8aa70598c9">

### 4. Run app locally

Now you are ready to test out the app locally! To do this, simply run `npm run dev` under the project root.

You can connect to the project with your browser typically at http://localhost:3000/.

### 5. Deploy the app

#### Deploy to fly.io

- Register an account on fly.io and then [install flyctl](https://fly.io/docs/hands-on/install-flyctl/)
- **If you are using Github Codespaces**: You will need to [install flyctl](https://fly.io/docs/hands-on/install-flyctl/) and authenticate from your codespaces cli by running `fly auth login`.

- Run `fly launch` under project root. This will generate a `fly.toml` that includes all the configurations you will need
- Run `fly scale memory 512` to scale up the fly vm memory for this app.
- Run `fly deploy --ha=false` to deploy the app. The --ha flag makes sure fly only spins up one instance, which is included in the free plan.
- For any other non-localhost environment, the existing Clerk development instance should continue to work. You can upload the secrets to Fly by running `cat .env.local | fly secrets import`
- If you are ready to deploy to production, you should create a prod environment under the [current Clerk instance](https://dashboard.clerk.com/). For more details on deploying a production app with Clerk, check out their documentation [here](https://clerk.com/docs/deployments/overview). **Note that you will likely need to manage your own domain and do domain verification as part of the process.**
- Create a new file `.env.prod` locally and fill in all the production-environment secrets. Remember to update `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` by copying secrets from Clerk's production instance -`cat .env.prod | fly secrets import` to upload secrets.

## How to contribute to this repo

### Code contribution workflow

You can fork this repo, make changes, and create a PR. Add **@bvergara87 as a reviewer.

If you are new to contributing on github, here is a step-by-step guide:

1. Click on `Fork` on the top right of this page
2. Work on your change and push it to your forked repo. Now when you navigate to the forked repo's UI, you should see something like the following:
   <img width="904" alt="pr-preview" src="https://github.com/a16z-infra/ai-getting-started/assets/3489963/631e5f45-39ec-4b54-b9d1-b963e279dcc6">

3. Click on "Contribute" -> "Open Pull Request".
4. Once you have a PR, you can add reviewers.

### Other contributions

Feel free to open feature requests, bug reports etc under Issues.
