import devConfig from '../config.dev.json';
import prodConfig from '../config.prod.json';

const isProduction = process.env.NODE_ENV === 'production';

const config = isProduction ? prodConfig : devConfig;

export default config;
