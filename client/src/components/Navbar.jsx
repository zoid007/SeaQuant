
import { Link, Navigate } from 'react-router-dom';
import React from "react";
import { render } from "react-dom";
import { Search, Notification, Logout } from "@carbon/icons-react";
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  Theme
} from "@carbon/react";

const Navbar = () => {

  const user = JSON.parse(localStorage.getItem("profile"))

  const handlelogout = (e) => {
    e.preventDefault();
    console.log(user);
    localStorage.clear();
    setisLoggedin(false)
    Navigate('/login')
  }
  return (
    <>
  <div className="container">
    <Theme theme="g100">
      <Header aria-label="SeaQuant">
        <HeaderName href="#" prefix="SeaQuant">
          [Development]
        </HeaderName>
        <HeaderGlobalBar>
          {/* <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
            <Search />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
            <Notification />
          </HeaderGlobalAction> */}
          <HeaderGlobalAction aria-label="Logout" onClick={handlelogout}>
          <Logout />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </Theme>
  </div>
  </>
  )

}

export default Navbar