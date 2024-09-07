/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites:async()=>{
        return[
            {
                source:'/weather-api/:path*',
                destination:'https://devapi.qweather.com/:path*',
            },
        ];
    },
};

export default nextConfig;
