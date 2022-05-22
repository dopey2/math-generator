import React from 'react';
import clsx from "clsx";
import { Link } from "react-router-dom";

import Collapsible from "../Collapsible/Collapsible";
import DrawerItemArrow from "./DrawerItemArrow";

export interface DrawerItem {
  path: string;
  label: string;
  icon?: any;
  isSelected?: boolean;
  items?: DrawerItem[];
  data?: {}
}

interface Props {
  items: DrawerItem[];
}

interface State {
  selectedByKey: {[key: string]: boolean}
}

export default class Drawer extends React.PureComponent<Props, State> {

  state: State = {
      selectedByKey: {},
  }


  onClickToggle = (key: string) => {
      this.setState((prevState) => ({
          selectedByKey: {
              ...prevState.selectedByKey,
              [key]: !prevState.selectedByKey[key],
          },
      }));
  }

  renderItems = (items: DrawerItem[]) => {
      return items.map((item) => {


          if(item.items && item.items.length) {
              return (
                  <div className="flex flex-col" key={item.path}>
                      <li
                          onClick={this.onClickToggle.bind(this, item.path)}
                          className={clsx(
                              styles.navItemNested,
                              { [styles.navItemSelected]: item.isSelected }
                          )}
                      >
                          {item.label}
                          <DrawerItemArrow
                              rotate={this.state.selectedByKey[item.path]}
                              fill={item.isSelected && this.state.selectedByKey[item.path] ? "white" : "#2563eb"}
                          />
                      </li>

                      <Collapsible open={this.state.selectedByKey[item.path]} key={item.path}>
                          <div className="flex flex-1 flex-col border-0 border-l-4 border-grey-600 ml-4 pl-4">
                              {this.renderItems(item.items)}
                          </div>
                      </Collapsible>
                  </div>

              );
          }

          return (
              <li key={item.path} className={styles.navItemOuter}>
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
                  {this.renderItems(this.props.items)}
              </ul>
          </div>
      );
  }
}

const styles = {
    navMenu: "flex shrink-0 flex-col w-96 h-full border-r-2 border-grey-300 pl-4 pr-4 pt-4 pb-4 overflow-y-scroll no-scrollbar",
    navItemOuter: 'flex flex-1',
    navItemNested: "flex flex-1 flex-row justify-between pl-4 pr-4 pt-2 pb-2 mt-1 mb-1 text-md rounded-md truncate hover:bg-gray-300 hover:text-white cursor-pointer",
    navItem: "flex flex-1 pl-4 pr-4 pt-2 pb-2 mt-1 mb-1 text-md rounded-md truncate hover:bg-gray-300 hover:text-white cursor-pointer",
    navItemSelected: "bg-sky-500 hover:bg-sky-500 text-white",
};
