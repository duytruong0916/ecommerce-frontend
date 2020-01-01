import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { startLogOut } from '../redux-store/actions/auth';
import { connect } from 'react-redux';
import Cart from './Cart';
const Menu = (props) => {
    const menuRef = React.createRef();
    const cartRef = React.createRef();
    const handleClick = () => {
        menuRef.current.click();
    }
    const cartClick = ()=>{
        console.log('clicked')
        cartRef.current.click();
    }
    const renderToggle = () => (
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <div className='pt-5 pb-5' onClick={handleClick}>
                <NavLink to='/search'><i className="fa fa-search" aria-hidden="true"></i></NavLink>
            </div>
            <div className='pb-5' onClick={handleClick}>
                <NavLink to={props.islogin ? '/user/dashboard' : '/signin'} activeClassName='is-active' className='link-nav'>ACCOUNT</NavLink>
            </div>
            {props.userrole == 1 && <div className='pb-5'><NavLink to={props.islogin ? '/admin/dashboard' : '/signin'} className='link-nav'>ADMIN</NavLink></div>}
            <div className='pb-5' onClick={handleClick}>
                <NavLink to='/men' activeClassName='is-active' className='link-nav'>MENS</NavLink>
            </div>
            <div className='pb-5' onClick={handleClick}>
                <NavLink to='/women' activeClassName='is-active' className='link-nav'>WOMENS</NavLink>
            </div>
            <div className='pb-5' onClick={handleClick}>
                <NavLink to='/shop' activeClassName='is-active' className='link-nav'>ALL PRODUCTS</NavLink>
            </div>

            {props.islogin && (
                <div className='text-danger pb-5' onClick={handleClick}>
                    <span onClick={() => props.startLogout()}>LOG OUT</span>
                </div>
            )}
        </div>
    )
    const renderMain = () => (
        <div className="navbar">
            <span className="navbar_brand" >
                <NavLink to='/home' className='unlink'>
                    <img src='/asset/fish1.png' className='profile_image mr-4' />
                    <span className='profile_name'>TIMEFOX</span>
                </NavLink>
            </span>
            <div className="main ">
                <span className='ml-5 mr-5' onClick={handleClick}>
                    <NavLink to='/men' activeClassName='is-active' className='link-nav'>MENS</NavLink>
                </span>
                <span className='ml-5 mr-5'>
                    <NavLink to='/women' activeClassName='is-active' className='link-nav'>WOMENS</NavLink>
                </span>
                <span className='ml-5 mr-5'>
                    <NavLink to='/shop' activeClassName='is-active' className='link-nav'>All Products</NavLink>
                </span>
            </div>
            <span className='account-dropdown'>
                <span className="navbar-toggle ml-4 mr-4" data-toggle="collapse" data-target="#collapsibleNavbar" ref={menuRef}>
                    <i className="fa fa-bars"></i>
                </span>
                <span className='ml-4 mr-4 search'>
                    <NavLink to='/search'><i className="fa fa-search" aria-hidden="true"></i></NavLink>
                </span>
            </span>
            <div className='cart-search'>
                <span className='ml-4 mr-4 account'>
                    <NavLink to={props.islogin ? '/user/dashboard' : '/signin'} ><i className="fa fa-user-o" aria-hidden="true"></i></NavLink>
                </span>
                {props.userrole == 1 && <span className='ml-4 mr-4 account'>
                    <NavLink to={props.islogin ? '/admin/dashboard' : '/signin'} ><i className="fa fa-user-secret" aria-hidden="true"></i></NavLink>
                </span>}
                <span className='ml-4 mr-4' data-toggle="modal" data-target="#myModal"  ref={cartRef}>
                    <i className="fa fa-shopping-bag" aria-hidden="true"></i>{props.numberOfItem > 0 && <sup><small className='cart-badge'>{props.numberOfItem}</small></sup>}
                </span>
            </div>
        </div>
    )

    const showCart = () => (
        <div className="modal fade" id="myModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                        <div className="modal-title">REVIEW YOUR CART</div>
                        <button type="button" className ='button button-white' data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <Cart cartClick ={cartClick}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    )
    return (
        <Fragment>
            <div className='w-100 position-fixed ' style={{ zIndex: '1', top: 0 }}>
                {renderMain()}
                {renderToggle()}
            </div>

            {showCart()}
        </Fragment>
    )
}

const mapStatetoProps = (state) => ({
    AuthError: state.auth.authError,
    islogin: !!state.auth.user,
    userrole: state.auth.userrole,
    numberOfItem: state.cart.item
})
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogOut())
});

export default connect(mapStatetoProps, mapDispatchToProps)(Menu);