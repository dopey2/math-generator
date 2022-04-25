import React from 'react';
import clsx from "clsx";
import { Link } from "react-router-dom";

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
    render() {
        return (
            <div className={styles.navMenu}>
                <ul>
                    {this.props.items.map((item, i) => (
                        <li key={i} className={styles.navItemOuter}>
                            <Link
                                className={clsx(styles.navItem, {
                                    [styles.navItemSelected]: item.isSelected,
                                })}
                                to={item.path}>{item.label}</Link>
                        </li>))
                    }
                </ul>
            </div>
        );
    }
}

const styles = {
    navMenu: "flex shrink-0 flex-col w-96 h-full border-r-2 border-grey-300 pl-4 pr-4 pt-4 pb-4 overflow-y-scroll no-scrollbar",
    navItemOuter: 'flex flex-1',
    navItem: "flex flex-1 pl-4 pr-4 pt-4 pb-4 text-xl font-bold",
    navItemSelected: "bg-sky-500 text-white rounded-md",
};
