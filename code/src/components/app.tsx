import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Header from './common/header';
import reducers  from '../reducers';

interface Props extends React.Props<App> {
}

const store = createStore(
  reducers
  , applyMiddleware(reduxThunk)
);

export default class App extends React.Component<Props, {}> {
  public render() {
    return (
     <Provider store={store}>
        <div className="">
          <Header
            logoImgSrc={"../images/logo.svg"}
          />
          <div className="c-body">
            {this.props.children}
          </div>
        </div>
     </Provider>
    );
  }
}
