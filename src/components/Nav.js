import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Nav = () => {

    return (
        <Menu inverted secondary vertical>
            <Menu.Item header>Data Utilities</Menu.Item>
            <Menu.Item as={NavLink} to="/duplicates">Duplicates</Menu.Item>
            <Menu.Item as={NavLink} to="/compare">Compare</Menu.Item>
        </Menu>
    );
}

export default Nav;