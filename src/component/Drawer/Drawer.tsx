import React from 'react';
import clsx from "clsx";
import { Link } from "react-router-dom";

import './drawer.css';

interface DrawerItem {
  path: string;
  label: string;
  icon?: any;
  isSelected?: boolean;
  items?: DrawerItem[];
}

interface Props {
  items: DrawerItem[];
}

export default class Drawer extends React.PureComponent<Props> {


  renderItems = (items: DrawerItem[], depth = 0) => {
      return items.map((item, i) => {

          if(item.items) {
              return (
                  <div className="flex flex-col">
                      <li className={styles.navItemNested} key={i}>
                          {item.label}
                          <img
                              onClick={() => console.log("on click")}
                              width={20}
                              height={20}
                              src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22%232563eb%22%3E%3Cpath fill-rule=%22evenodd%22 d=%22M1.646 4.646a.5.5.0 01.708.0L8 10.293l5.646-5.647a.5.5.0 01.708.708l-6 6a.5.5.0 01-.708.0l-6-6a.5.5.0 010-.708z%22/%3E%3C/svg%3E"
                          />
                      </li>

                      <div className="drawer-nested__content">
                          {this.renderItems(item.items, depth + 1)}
                      </div>

                  </div>

              );
          }

          return (
              <li key={i} className={styles.navItemOuter}>
                  <Link
                      className={clsx(styles.navItem, {
                          [styles.navItemSelected]: item.isSelected,
                      })}
                      to={item.path}>{item.label}</Link>
              </li>);
      });
  }

  render() {
      return (
          <div className={styles.navMenu}>
              <ul>
                  {this.renderItems(this.props.items, 0)}
              </ul>
          </div>
      );
  }
}

const styles = {
    navMenu: "flex shrink-0 flex-col w-96 h-full border-r-2 border-grey-300 pl-4 pr-4 pt-4 pb-4 overflow-y-scroll no-scrollbar",
    navItemOuter: 'flex flex-1',
    navItemNested: "flex flex-1 flex-row justify-between pl-4 pr-4 pt-2 pb-2 mt-1 mb-1 text-xl rounded-md truncate hover:bg-gray-300 hover:text-white cursor-pointer",
    navItem: "flex flex-1 pl-4 pr-4 pt-2 pb-2 mt-1 mb-1 text-xl rounded-md truncate hover:bg-gray-300 hover:text-white cursor-pointer",
    navItemSelected: "bg-sky-500 hover:bg-sky-500 text-white",
};
