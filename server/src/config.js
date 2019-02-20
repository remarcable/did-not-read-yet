import devConfig from '../config.sample.json';
import prodConfig from '../config.sample.json';

const isProduction = process.env.NODE_ENV === 'production';

const config = isProduction ? prodConfig : devConfig;

export default config;
