/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites:async()=>{
        return[
            {
                source:'/weather-api/:path*',
                destination:'https://devapi.qweather.com/:path*',
            },
            {
                source:'/city-api/:path*',
                destination:'https://geoapi.qweather.com/:patn*',
            },
        ];
    },
};

export default nextConfig;
