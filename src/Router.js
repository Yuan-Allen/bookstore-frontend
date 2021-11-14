import React from 'react';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import LoginView from "./view/LoginView";
import HomeView from "./view/HomeView";
import BookView from "./view/BookView";
import CartView from "./view/CartView";
import OrdersView from "./view/OrdersView";
import BookManageView from "./view/BookManageView";
import UserManageView from "./view/UserManageView";
import {history} from "./utils/history";
import OrderManageView from "./view/OrderManageView";
import BestSellView from "./view/BestSellView";
import BestConsumerView from "./view/BestConsumerView";
import UserStatisticsView from "./view/UserStatisticsView";
import RegisterView from "./view/RegisterView";
import ChatView from "./view/ChatView";
import FullTextSearchView from "./view/FullTextSearchView";
import LabelSearchView from "./view/LabelSearchView";

class BasicRoute extends React.Component{
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            console.log(location, action);
        });
    }
    render(){
        return(
            <BrowserRouter history={history}>
                <Switch>
                    <Route exact path="/" component={HomeView} />
                    <Route exact path="/login" component={LoginView} />
                    <Route exact path="/bookDetails" component={BookView} />
                    <Route exact path="/cart" component={CartView} />
                    <Route exact path="/orders" component={OrdersView} />
                    <Route exact path="/bookManage" component={BookManageView}/>
                    <Route exact path="/userManage" component={UserManageView}/>
                    <Route exact path="/orderManage" component={OrderManageView}/>
                    <Route exact path="/bestSell" component={BestSellView}/>
                    <Route exact path="/bestConsumer" component={BestConsumerView}/>
                    <Route exact path="/userStatistics" component={UserStatisticsView}/>
                    <Route exact path="/register" component={RegisterView}/>
                    <Route exact path="/chat" component={ChatView}/>
                    <Route exact path="/fullTextSearch" component={FullTextSearchView}/>
                    <Route exact path="/searchByLabel" component={LabelSearchView}/>
                    <Redirect from="/*" to="/" />
                </Switch>
            </BrowserRouter>
        )
    }


}

export default BasicRoute;