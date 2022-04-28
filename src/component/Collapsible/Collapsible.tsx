import React from 'react';

interface Props {
    open: boolean
}

export default class Collapsible extends React.PureComponent<Props> {

    container!: HTMLDivElement | null;
    content!: HTMLDivElement | null;

    componentDidUpdate(prevProps: Readonly<Props>) {
        if(prevProps.open !== this.props.open) {
            this.props.open ? this.open() : this.close();
        }
    }

    open() {
        if(this.content && this.container) {
            this.container.style.height = this.content.clientHeight + "px";
        }
    }

    close() {
        if(this.container) {
            this.container.style.height = "0";
        }
    }

    render() {
        return (
            <div
                className="transition-all duration-300 ease-in-out h-0 overflow-hidden"
                ref={(ref) => this.container = ref}>
                <div ref={(ref) => this.content = ref}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
