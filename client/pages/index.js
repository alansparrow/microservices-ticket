import BuildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>LandingPage</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = BuildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
