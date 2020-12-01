import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const menus = {
  user: [
    {
      to: "/account/orders",
      name: "My Orders",
    },
    {
      to: "/account/profile",
      name: "Profile",
    },
  ],
  admin: [
    // {
    //   to: "/admin/dashboard",
    //   name: "Dashboard",
    // },
    {
      to: "/admin/users",
      name: "Users",
    },
    {
      to: "/admin/orders",
      name: "Orders",
    },
    {
      to: "/admin/products",
      name: "Products",
    },
    {
      to: "/admin/categories",
      name: "Product Categories",
    },
    // {
    //   to: "/admin/settings",
    //   name: "Settings",
    // },
  ],
};

const UserAccount = ({ children }) => {
  const location = useLocation();

  return (
    <div className="container">
      <div className="columns my-4">
        <div className="column is-3">
          <div className="box">
            <aside className="menu">
              <ul className="menu-list">
                {location.pathname.split("/")[1] === "admin" &&
                  menus.admin.map((menu, i) => {
                    return (
                      <li key={i}>
                        <NavLink to={menu.to} activeClassName="is-active">
                          {menu.name}
                        </NavLink>
                      </li>
                    );
                  })}
                {location.pathname.split("/")[1] === "account" &&
                  menus.user.map((menu, i) => {
                    return (
                      <li key={i}>
                        <NavLink to={menu.to} activeClassName="is-active">
                          {menu.name}
                        </NavLink>
                      </li>
                    );
                  })}
              </ul>
            </aside>
          </div>
        </div>
        <div className="column">
          <div className="box">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
