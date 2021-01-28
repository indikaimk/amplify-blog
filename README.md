## Node.js runs natively on M1 MacBook

This project is done on a M1 MacBook with Node.js running natively.
It is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install `nvm` according to [nvm installation instructions] (https://github.com/nvm-sh/nvm#installing-and-updating).
Then, install the latest Node.js LTS version.

```bash
nvm install v14.15.4
```

Since no precompiled binaries are availble for ARM64, `nvm` install Node.js from source. It takes a little time, but completes without any issues.

After Node.js is installed, we create the Next.js app and run.

```bash
npx create-next-app my-test-next-app
cd my-test-next-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with browser to see the result.

## Developing the app

Following the [tutoria](https://nextjs.org/learn/basics/create-nextjs-app) everything went smooth other than installing one Node.js package - `remark`.

### Native dependencies with remark

The tutorial uses npm packages `remark` and `remark-html` to parse markdown. However, `remark` has an optional dependency with another Node.js package `sharp` which fails to get installed. 

It seems `sharp` has a dependency with a native library `libvips`. There is not prebuilt `libvips` for ARM64, so during the installation process it attempts to compile and install the library, but fails with error `../src/common.cc:24:10: fatal error: 'vips/vips8' file not found`.

However, that did not affect the function of the app as `remark` was able to parse all the markdown syntax in this tutorial.

## Summing up

It's great to see Node.js working natively on M1.



