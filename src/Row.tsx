import React from "react";
import { ChangeEvent, SyntheticEvent, MouseEvent } from "react";
import { SELECT } from "./Table";

export type RowProps = {
    title: any,
    children: any[],
    margin: number
}

export default class Row extends React.Component<RowProps> {
    constructor(props: RowProps) {
        super(props);
        this.select = this.select.bind(this)
        this.click = this.click.bind(this)
        this.changed = this.changed.bind(this)
    }

    select(event: SyntheticEvent) {
        if (SELECT) {
            (event.currentTarget as Element).classList.add('Selected')
        }
    }

    click(event: MouseEvent) {
        (event.currentTarget as Element).classList.add('Selected')
    }

    changed(event: ChangeEvent) {
        console.log(event)
    }

    render() {
        return (
            <div>
                <div className="Row"
                    onMouseMove={this.select}
                    onClick={this.click}
                >
                    <label style={{ marginRight: this.props.margin }} className="RowCheckbox">
                        <input onChange={this.changed} type="checkbox" />
                        <span className="RowCheckboxMark"></span>
                    </label>

                    <label>{this.props.title}</label>
                </div>
                <div className="RowContent">
                    {this.props.children.map((el: any) => (
                        <Row
                            key={Math.random()}
                            margin={this.props.margin + 15}
                            title={el.name}
                            children={el.children}
                        />
                    ))}
                </div>
            </div>
        );
    }
}