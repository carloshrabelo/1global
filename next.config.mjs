/** @type {import('next').NextConfig} */

const exportConfig = {
  basePath: '/1global',
  output: 'export'
}

const nextConfig = process.env.BUILD_EXPORT ? exportConfig : {
  output: 'standalone',
};

export default nextConfig;
