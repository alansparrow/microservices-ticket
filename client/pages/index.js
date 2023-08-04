import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>LandingPage</h1>;
};

LandingPage.getInitialProps = async () => {
  if (typeof window === "undefined") {
    // we are on the server!
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: 'ticket.dev'
        },
      }
    );

    return data;
  } else {
    // we are in the browser!
    // request can be made with base url of ''
    const res = await axios.get("/api/users/currentuser");
    return res.data;
  }

  return {};
};

export default LandingPage;
