import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignUp from './SignUp/SignUp';
import SignUpOwner from './SignUp/SignUpOwner';
import Login from './Login/Login';
import Navbar from './LandingPage/Navbar';
import Home from './Home/Home';
import HomeOwner from './Home/HomeOwner';
import Restaurant from './Restaurant/RestaurantDetails';
import ViewProfile from './Profile/ViewProfile';
import EditProfile from './Profile/EditProfile';
import Cart from './Cart/Cart';
import PastOrder from './Orders/PastOrders';
import PastOrderRest from './Orders/PastOrdersRest';
import UpcomingOrders from './Orders/UpcomingOrders';
import OrderDetails from './Orders/OrderDetails';
import OrderDetailsRest from './Orders/OrderDetailsRest';
import ViewProfileOwner from './Profile/ViewProfileOwner';
import EditProfileOwner from './Profile/EditProfileOwner';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signupowner" component={SignUpOwner} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/homeowner" component={HomeOwner} />
                <Route path="/restaurant/:restid" component={Restaurant} />
                <Route path="/viewprofile" component={ViewProfile} />
                <Route path="/editprofile" component={EditProfile} />
                <Route path="/cart" component={Cart} />
                <Route path="/pastorder" component={PastOrder} />
                <Route path="/pastorderrest" component={PastOrderRest} />
                <Route path="/upcomingorder" component={UpcomingOrders} />
                <Route path="/orderdetails/:orderId/:status" component={OrderDetails} />
                <Route path="/orderdetailsrest/:orderId/:status" component={OrderDetailsRest} />
                <Route path="/viewprofileowner" component={ViewProfileOwner} />
                <Route path="/editprofileowner" component={EditProfileOwner} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;