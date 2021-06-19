import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import "./App.css";
// import ProtectedRoute from "./auth/protected-route";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CloudinaryContext } from 'cloudinary-react';
import { photosFetched } from './actions';
import { fetchPhotos } from './utils/CloudinaryService';
// import { AuthProvider } from "./Contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute"

class App extends Component {
  componentDidMount() {
    fetchPhotos(this.props.cloudName).then(this.props.onPhotosFetched);
  }
  render() {
    return (

      <CloudinaryContext
        cloudName={this.props.cloudName}
        uploadPreset={this.props.uploadPreset}
      >
        <Router>
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/password-reset" component={ResetPassword} exact />
            <PrivateRoute path="/settings" component={Settings} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
            <PrivateRoute path="/dashboard/:uid" component={Dashboard} exact />
          </Switch>
        </Router >
      </CloudinaryContext>

    );
  }
}

App.propTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
  onPhotosFetched: PropTypes.func,
};

const AppContainer = connect(
  null,
  { onPhotosFetched: photosFetched }
)(App);

export default AppContainer;