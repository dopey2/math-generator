import React from "react";
import clsx from "clsx";

interface Props {
    rotate: boolean;
    fill: string
}

export default class DrawerItemArrow extends React.PureComponent<Props> {

    render() {
        return (
            <svg
                className={clsx(
                    "transition-all duration-300 ease-in-out",
                    { "rotate-180": this.props.rotate }
                )}
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill={this.props.fill}
            >
                <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5.0 01.708.0L8 10.293l5.646-5.647a.5.5.0 01.708.708l-6 6a.5.5.0 01-.708.0l-6-6a.5.5.0 010-.708z"
                />
            </svg>
        );
    }
}
