import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { BrowserRouter as Router } from "react-router-dom";
import { PostContextProvider } from "./Contexts/PostContexts";
import { PhotoURLContextProvider } from "./Contexts/UserContexts/photoURL";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import PhotosListReducer from "./reducers/PhotosListReducer";
import UploadedPhotosReducer from "./reducers/UploadedPhotosReducer";
import config from "./config/config";
import { AuthProvider } from "./Contexts/AuthContext";

const rootReducer = combineReducers({
  photos: PhotosListReducer,
  uploadedPhotos: UploadedPhotosReducer,
});

const store = createStore(rootReducer);
const { cloud_name, upload_preset } = config;

ReactDOM.render(
  <Router>
    <AuthProvider>
      <Provider store={store}>
        <PostContextProvider>
          {/* <PhotoURLContextProvider> */}
          <App cloudName={cloud_name} uploadPreset={upload_preset} />
          {/* </PhotoURLContextProvider> */}
        </PostContextProvider>
      </Provider>
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
