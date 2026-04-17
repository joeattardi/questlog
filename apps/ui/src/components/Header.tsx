import { NavLink } from 'react-router';
import logo from '../assets/images/logo.svg';
import classes from './Header.module.css';
import UserMenu from './UserMenu';

export default function Header() {
    return (
        <header className={classes.header}>
            <NavLink to="/app" className={classes.titleLink}>
                <img src={logo} alt="QuestLog Logo" className={classes.logo} />
                <h1 className={classes.productName}>QuestLog</h1>
            </NavLink>
            <div className={classes.topNav}>
                <UserMenu />
            </div>
        </header>
    );
}
