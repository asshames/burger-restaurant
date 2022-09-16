import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import UserInfo from './containers/UserInformation/UserInfo';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/BurgerBuilder" component={BurgerBuilder} />
            <Route path="/" exact component={UserInfo} />
          </Switch>
        </Layout>
      </div>
        
    );
}

export default App;
