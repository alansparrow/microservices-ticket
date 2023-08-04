// If we even want to include some global CSS into our project,
// we can only import global CSS into this app file.
import "bootstrap/dist/css/bootstrap.css";
import BuildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <div>
      <Header currentUser={pageProps.currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
//   const client = BuildClient(appContext.ctx);

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

//   console.log(pageProps);

  /*
{ pageProps: { currentUser: null }, currentUser: null }
{
   pageProps: {
     currentUser: {
       id: '64cc633fc764cc124f56c122',
       email: 'aaa@aaa.com',
       iat: 1691127575
     }
   },
   currentUser: {
     id: '64cc633fc764cc124f56c122',
     email: 'aaa@aaa.com',
     iat: 1691127575
   }
}
  */

  return {
    pageProps
  };
};

export default AppComponent;
