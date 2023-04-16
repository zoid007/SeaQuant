import React from 'react'
import { Link } from 'react-router-dom';
import "./sidebar.css"
import {SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink } from '@carbon/react';
const Sidebar = () => {
  return (
    <SideNav
    isFixedNav
    expanded={true}
    isChildOfHeader={false}
    className="sidebar-container"
    aria-label="Side navigation">
    <SideNavItems>
      <SideNavLink href="/strategy">
        Strategy
      </SideNavLink>
      <SideNavLink href="/backtest">
        Backtest
      </SideNavLink>
      <SideNavLink href="/dataset">
        Dataset
      </SideNavLink>
      <SideNavLink href="/live">
        Live Trade
      </SideNavLink>
    </SideNavItems>
  </SideNav>
  )
}

export default Sidebar