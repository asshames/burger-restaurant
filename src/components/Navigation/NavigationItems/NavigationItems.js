import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>User</NavigationItem>
        <NavigationItem link="/BurgerBuilder" active>Burger Builder</NavigationItem>
    </ul>
);

export default navigationItems;