import React from 'react';

interface Props {
    open: boolean
}

export default class Collapsible extends React.PureComponent<Props> {

    static instanceId = 0;

    container!: HTMLElement | null;
    content!: HTMLElement | null;

    private readonly containerId!: string;
    private readonly contentId!: string;

    constructor(props: Props) {
        super(props);

        this.containerId = `collapsible-container-${Collapsible.instanceId}`;
        this.contentId = `collapsible-content-${Collapsible.instanceId}`;
        Collapsible.instanceId += 1;

    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if(prevProps.open !== this.props.open) {
            this.props.open ? this.open() : this.close();
        }
    }

    getElements() {
        if(!this.container) {
            this.container = document.getElementById(this.containerId);
        }
        if(!this.content) {
            this.content = document.getElementById(this.contentId);
        }
    }

    getClosestParents(container: HTMLElement | Element) {
        let parentContent = container.closest(".collapsible-container > .collapsible-content") as HTMLElement;
        let parentContainer = null;

        if(parentContent) {
            parentContainer = parentContent.closest(".collapsible-container") as HTMLElement;
        }

        return [parentContent, parentContainer];
    }

    open() {
        this.getElements();

        if(this.content && this.container) {
            let totalHeight = this.content.clientHeight;
            this.container.style.height = totalHeight + "px";

            let [parentContent, parentContainer] = this.getClosestParents(this.container);

            while(parentContent && parentContainer) {
                totalHeight += parentContent.clientHeight;
                parentContainer.style.height = totalHeight + "px";
                [parentContent, parentContainer] = this.getClosestParents(parentContainer);
            }
        }
    }

    close() {
        this.getElements();

        if(this.container && this.content) {
            this.container.style.height = "0";

            let totalHeight = this.content.clientHeight;

            let [parentContent, parentContainer] = this.getClosestParents(this.container);

            while(parentContent && parentContainer) {
                totalHeight -= parentContainer.clientHeight;
                parentContainer.style.height = Math.abs(totalHeight) + "px";
                [parentContent, parentContainer] = this.getClosestParents(parentContainer);
            }
        }
    }

    render() {
        return (
            <div
                className="transition-all duration-300 ease-in-out h-0 overflow-hidden collapsible-container"
                id={this.containerId}
            >
                <div id={this.contentId} className={"collapsible-content"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
