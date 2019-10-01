import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignUpForm from './SignUp/SignUp';
import SignUpOwner from './SignUp/SignUpOwner';
import LoginForm from './Login/Login';
import Navbar from './LandingPage/Navbar';
import Home from './Home/Home';
import HomeOwner from './Home/HomeOwner';
import Restaurant from './Restaurant/RestaurantDetails';
import ViewProfileForm from './Profile/ViewProfile';
import EditProfileForm from './Profile/EditProfile';
import Cart from './Cart/Cart';
import PastOrder from './Orders/PastOrders';
import PastOrderRest from './Orders/PastOrdersRest';
import UpcomingOrders from './Orders/UpcomingOrders';
import OrderDetails from './Orders/OrderDetails';
import UserDetails from './Orders/UserDetails';
import OrderDetailsRest from './Orders/OrderDetailsRest';
import ViewProfileOwner from './Profile/ViewProfileOwner';
import EditProfileOwner from './Profile/EditProfileOwner';
import FoodMenuOwner from './Restaurant/FoodMenuOwner';
import FoodItemDetails from './Restaurant/FoodItemDetails'
import AddFoodItem from './Restaurant/AddFoodItem'
import FoodSectionOwner from './Restaurant/FoodSectionOwner'

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar} />
                <Route path="/signup" component={SignUpForm} />
                <Route path="/signupowner" component={SignUpOwner} />
                <Route path="/login" component={LoginForm} />
                <Route path="/home" component={Home} />
                <Route path="/homeowner" component={HomeOwner} />
                <Route path="/restaurant/:restid" component={Restaurant} />
                <Route path="/viewprofile" component={ViewProfileForm} />
                <Route path="/editprofile" component={EditProfileForm} />
                <Route path="/cart" component={Cart} />
                <Route path="/pastorder" component={PastOrder} />
                <Route path="/pastorderrest" component={PastOrderRest} />
                <Route path="/upcomingorder" component={UpcomingOrders} />
                <Route path="/orderdetails/:orderId/:status" component={OrderDetails} />
                <Route path="/userdetails/:buyeremail" component={UserDetails} />
                <Route path="/orderdetailsrest/:orderId/:status" component={OrderDetailsRest} />
                <Route path="/viewprofileowner" component={ViewProfileOwner} />
                <Route path="/editprofileowner" component={EditProfileOwner} />
                <Route path="/foodmenuowner" component={FoodMenuOwner} />
                <Route path="/fooditemdetails/:item_id" component={FoodItemDetails} />
                <Route path="/addfooditem" component={AddFoodItem} />
                <Route path="/foodsectionowner" component={FoodSectionOwner} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;