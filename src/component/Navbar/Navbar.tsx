import React from 'react';

export default class Navbar extends React.PureComponent {

    render() {
        return (
            <nav className="flex h-16 flex-row bg-blue-400 items-center justify-center">
                <a href="/select/0">
                    <span className="text-white text-xl">Select</span>
                </a>
            </nav>
        );
    }
}
