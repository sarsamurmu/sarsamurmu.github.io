/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  }
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /react-spring/,
  //     sideEffects: true,
  //   })

  //   return config
  // }
};

export default nextConfig;
