import React, {Component} from 'react';

import './index.scss';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            value: '',
            type: ''
        };
    }

    dragStart = (event, value, type = 'add') => {
        event.dataTransfer.setData("value", value);
        event.dataTransfer.setData("type", type);
        this.setState({value, type});
    };

    dragOver = event => {
        event.preventDefault();
    };

    drop = event => {
        event.preventDefault();
        const value = event.dataTransfer.getData('value');
        const type = event.dataTransfer.getData('type');
        if(!value) return;
        const {lists} = this.state;
        if(type === 'add') {
            this.setState({
                lists: [...lists, value]
            })
        }
    };

    dragEnter = (event, targetList, targetIndex) => {
        const {type, value, lists} = this.state;
        if(type === 'change') {
            let newLists = lists;
            const originIndex = newLists.indexOf(value);
            newLists[originIndex ] = targetList;
            newLists[targetIndex] = value;
            this.setState({
                lists: newLists
            })
        }
    };

    render() {
        const {lists=[]} = this.state;
        return (
            <div className="area">
                <div className="left">
                    <ul>
                        {
                            Array(7).fill(1).map((list, index) => (
                                <li key={index} draggable="true" onDragStart={event => this.dragStart(event, `列表${index + 1}`)}>列表{index + 1}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="right" onDragOver={this.dragOver} onDrop={this.drop}>
                    <ul>
                        {
                            lists && lists.map((list, index) => (
                                <li key={index}
                                    draggable="true"
                                    onDragStart={event => this.dragStart(event, list, 'change')}
                                    onDragEnter={event => this.dragEnter(event, list, index)}
                                >{list}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
};