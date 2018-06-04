import React, { Component } from 'react';

/*
Libraries
*/
import { Redirect, Route, Switch } from 'react-router-dom';

/*
Material UI
*/
import './Main.css';

/*
Components
*/
import Header from '../../components/header/Header';
import Offcanvas from '../../components/offcanvas';

/*
Page components
*/
import HomePage from '../../pages/home-page/HomePage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import PostPage from '../../pages/post-page/PostPage';
import PostsPage from '../../pages/posts-page/PostsPage';
import SignInPage from '../../pages/sign-in-page/SignInPage';
import SignOutPage from '../../pages/sign-out-page/SignOutPage';
import SignupPage from '../../pages/signup-page/SignupPage';

import PostCreatePage from '../../pages/post-create-page/PostCreatePage';
import PostsTablePage from '../../pages/posts-table-page/PostsTablePage';

import BillingAccountsPage from '../../pages/billingAccountsPage/BillingAccountsPage'
import BillingAccountPage from '../../pages/billing-account-page/BillingAccountPage'
import BillingAccountCreatePage from '../../pages/billingAccount-create-page/BillingAccountCreatePage';

import LoyaltyCardsPage from '../../pages/loyalty-cards-page/LoyaltyCardsPage'
//import BillingAccountPage from '../../pages/billing-account-page/BillingAccountPage'
import LoyaltyCardCreatePage from '../../pages/loyalty-card-create-page/LoyaltyCardCreatePage';

import ExpensesPage from '../../pages/expensesPage/ExpensesPage'
import ExpenseCreatePage from '../../pages/expense-create-page/ExpenseCreatePage';

import CategoryCreatePage from '../../pages/category-create-page/CategoryCreatePage';
import CategoryTablePage from '../../pages/categories-table-page/CategoriesTablePage';

import SubCategoryCreatePage from '../../pages/sub-category-create-page/SubCategoryCreatePage';
import SubCategoryTablePage from '../../pages/sub-categories-table-page/SubCategoriesTablePage';



class Main extends Component {
  render() {    
    return (
      <div className="container">
        <Offcanvas />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Redirect from="/home" to="/"/>

         
          <Route exact path='/billingAccounts' component={BillingAccountsPage} />
          <Route exact path='/billingAccounts/:id' component={BillingAccountPage} />
          <Route path='/billingAccount-create' component={BillingAccountCreatePage} />

          <Route exact path='/loyaltyCards' component={LoyaltyCardsPage} />
          {/* <Route exact path='/loyaltyCards/:id' component={LoyaltyCardPage} /> */}
          <Route path='/loyaltyCard-create' component={LoyaltyCardCreatePage} />

          <Route exact path='/expenses' component={ExpensesPage} />
          <Route path='/expense-create' component={ExpenseCreatePage} />

          <Route path='/posts/:id' component={PostPage}/>
          <Route path='/signin' component={SignInPage}/>
          <Route path='/signout' component={SignOutPage}/>
          <Route path='/signup' component={SignupPage}/>
          <Route path='/backoffice/posts-table' component={PostsTablePage} />
          <Route path='/backoffice/post-create' component={PostCreatePage}/>
          <Route path='/backoffice/categories-table' component={CategoryTablePage} />
          <Route path='/backoffice/category-create' component={CategoryCreatePage} />

          <Route path='/backoffice/sub-categories-table' component={SubCategoryTablePage} />
          <Route path='/backoffice/sub-category-create' component={SubCategoryCreatePage} />
          <Route path="*" component={NotFoundPage}/>
          
        </Switch>
      </div>
    );
  }
}

export default Main;
