// If we even want to include some global CSS into our project,
// we can only import global CSS into this app file.
import 'bootstrap/dist/css/bootstrap.css';

const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default MyApp;