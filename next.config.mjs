import createMDX from "@next/mdx"

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

export default withMDX(nextConfig)