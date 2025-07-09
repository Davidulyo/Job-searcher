import { createStore } from "redux";
import { Provider } from "react-redux";
import { initializeApp } from "firebase/app";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from './App';

import {authReducer} from "./redux/authReducer";
import "./index.css";

const store = createStore(authReducer);

// const firebaseConfig = {
//     apiKey: "AIzaSyCvfoiSybe8t501LbF8AoD8DwCNBNdnbmY",
//     authDomain: "first-testing-9fede.firebaseapp.com",
//     projectId: "first-testing-9fede",
//     storageBucket: "first-testing-9fede.appspot.com",
//     messagingSenderId: "142129088408",
//     appId: "1:142129088408:web:499072fc62a4cbd5eb8ded",
//   };

//   initializeApp(firebaseConfig);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
  
  
  ,document.querySelector("#root")
);
