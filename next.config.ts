import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    rehypePlugins: [
      [rehypePrettyCode, { theme: "one-dark-pro", keepBackground: false }], // or any theme you like
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
