import React, {Component} from "react";
import Route from "./Route";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers } from 'redux'
import movieReducer from "./src/redux/reducers/movieReducer";
import movieDetailsReducer from "./src/redux/reducers/movieDetailsReducer";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
rootReducer = combineReducers({
  movieReducer,
  movieDetailsReducer
})
const store = createStoreWithMiddleware(rootReducer);

//const App = () => <Route/>

//export default App;
export default class App extends React.Component {
    render() {
      return <Provider store={store}><Route />
      </Provider>
    }
  }
