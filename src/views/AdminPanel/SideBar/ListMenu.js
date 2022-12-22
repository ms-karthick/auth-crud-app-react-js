import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";

export const ListMenus = [
  {
    name: "Dashboard",
    exact: true,
    to: "/Dashboard",
    iconClassName: "bi bi-speedometer",
  },
  {
    name: "Employee",
    exact: true,
    to: `/Employee`,
    iconClassName: "bi bi-collection",
    // subMenus: [
    //   { name: "Create", to: "/Employee/Employee" },
    // ],
  },

  ];
  

const ListMenu = (props) => {
    const { name, subMenus, iconClassName, onClick, to, exact } = props;
    const [expand, setExpand] = useState(false);
  
    return (
        <li onClick={props.onClick}>
        <Link
          exact
          to={to}
          // onClick={() => {
          //   setExpand((e) => !e);
          // }}
          className={`menu-item`}
        >
          <div className="menu-icon">
            <i class={iconClassName}></i>
          </div>
          <span>{name}</span>
        </Link>
        {subMenus && subMenus.length > 0 ? (
          <ul className={`sub-menu`}>
            {subMenus.map((menu, index) => (
              <li key={index}>
                <NavLink to={menu.to}>{menu.name}</NavLink>
              </li>
            ))}
          </ul>
        ) : null}
      </li>

    )
}

export default ListMenu;