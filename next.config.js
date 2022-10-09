/** @type {import('next').NextConfig} */

/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withPlugins = require("next-compose-plugins");

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  // TYPESCRIPT CHEATSHEAT : https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
  // SUGGESTIONS : https://www.smashingmagazine.com/2021/11/maintain-large-nextjs-application/
  // HUGE DEPLOYMENT WORKFLOW : https://colinwilson.uk/2020/12/25/deploy-a-hugo-website-to-vercel-using-github-actions-a-simple-workflow/

  reactStrictMode: true,

  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/trendy",
  //       permanent: process.env.NODE_ENV === "production",
  //     },
  //   ];
  // },
  images: {
    domains: [
      "storage.googleapis.com",
      "cdn.ab2c.xyz",
      "localhost",
      "127.0.0.1",
      // "ab2c.vercel.app",
      // your domain
    ],
  },

  // pwa & i18n
  pwa: {
    disable: process.env.NODE_ENV !== "production",
    dest: "public",
    runtimeCaching,
    publicExcludes: ["!robots.txt", "!sitemap.xml.gz"],
  },
  i18n,
  ...(process.env.NODE_ENV === "production" && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};

module.exports = withPlugins([[withPWA, withBundleAnalyzer]], nextConfig);
