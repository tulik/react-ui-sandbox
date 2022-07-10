import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '_store';

export { Nav };

function Nav() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    const register = () => dispatch(authActions.register());
    const login = () => dispatch(authActions.login());
    // only show nav when logged in
    // if (!authUser) return null;

    const navbarLogout = () => {
        if (authUser) {
            return (
                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
            )}
    };


    const navbarLogin = () => {
        if (!authUser) {
            return (
                <button onClick={login} className="btn btn-link nav-item nav-link">Login</button>
            )}
    };

    const navbarRegister = () => {
        if (!authUser) {
            return (
                <button onClick={register} className="btn btn-link nav-item nav-link">Register</button>
            )}
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                {navbarLogout()}
                {navbarRegister()}
                {navbarLogin()}
            </div>
        </nav>
    );
}