import React from 'react'
import Header from './Header'
import PropTypes from 'prop-types'

const Layout = props => (
    <div>
        <Header />
        {props.children}
    </div>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout