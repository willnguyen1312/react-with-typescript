import React from "react";
import { Router, Link, RouteComponentProps } from "@reach/router";

const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
    </nav>
    <Router>
      <Home path="/" />
      <Dashboard path="dashboard" />
    </Router>
  </div>
);

const Home: React.SFC<RouteComponentProps> = props => {
  // props.navigate!("/dashboard");
  return (
    <div>
      <h2>Welcome</h2>
    </div>
  );
};

const Dashboard: React.SFC<RouteComponentProps> = () => (
  <div>
    <h2>Dashboard</h2>
    <textarea>Hello</textarea>>
  </div>
);

export default App;
