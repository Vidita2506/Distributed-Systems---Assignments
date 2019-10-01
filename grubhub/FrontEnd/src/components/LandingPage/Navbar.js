import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
   
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        localStorage.removeItem('token');
    }
    render() {
        let getMenu = () => {
            return (
                <ul className="nav navbar-nav">
                    <li className="active"><Link to="/home">Home</Link></li>
                    <li><Link to="/editprofile">Profile</Link></li>
                    <li><Link to="/pastorder">Past Orders</Link></li>
                    <li><Link to="/upcomingorder">Upcoming Orders</Link></li>
                    <li><Link to="/cart">My Cart</Link></li>
                </ul>
            )
        };

        let getMenuOwner = () => {
            return (
                <ul className="nav navbar-nav">
                    <li className="active"><Link to="/home">Home</Link></li>
                    <li><Link to="/editprofileowner">Profile</Link></li>
                    <li><Link to="/pastorderrest">Past Orders</Link></li>
                    <li><Link to="/foodmenuowner">Food Menu</Link></li>
                    <li><Link to="/foodsectionowner">Food Sections</Link></li>
                </ul>
            )
        };

        let navLogin = null;
        if (cookie.load('cookie') === 'buyer') {
            let useremail = localStorage.getItem('grubhub_user');
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/viewprofile" ><span className="glyphicon glyphicon-user"></span>{useremail}</Link></li>
                    <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else if (cookie.load('cookie') === 'owner') {
            let useremail = localStorage.getItem('grubhub_user');
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/viewprofileowner" ><span className="glyphicon glyphicon-user"></span>{useremail}</Link></li>
                    <li><Link to="/" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );        
        } else{
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Sign In</Link></li>
                </ul>
            )
        }
        let menu = '';
        if (cookie.load('cookie') ===  'buyer') {
            menu = getMenu();
        } else if (cookie.load('cookie') === 'owner') {
            menu = getMenuOwner();
        } 
        return(
            <div>
                <nav className="navbar navbar-custom">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/home">GRUBHUB</a>
                    </div>
                        {menu}
                    {navLogin}
                </div>
            </nav>
        </div>
        );
    }
}

export default Navbar;