import React, {Component} from 'react';

import './index.scss';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            value: '',
            type: '',
            array2: ['list1', 'list2', 'list3', 'list4', 'list5', 'list6', 'list7']
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
                array2: newLists
            })
        }
    };

    dragStart2 = (event, startValue) => {
        this.setState({startValue});
    };

    dragEnter2 = (event, endValue, endIndex) => {
        this.setState({endValue, endIndex});
    };

    drop2 = () => {
        const {startValue, endValue, endIndex, array2} = this.state;
        let arr2 = array2;
        const startIndex = array2.indexOf(startValue);
        arr2[startIndex] = endValue;
        arr2[endIndex] = startValue;
        this.setState({array2: arr2});
    };

    render() {
        const {lists = [], array2} = this.state;
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

                {/*开始拖动的那条数据 和路过的数据沿途都会交换  所以产生的中级效果举例来说就是 数据list1 list2 list3拖动list1到list3的位置 得到的结果是 list2 list3 list1也就是整体拖动数据到制定位置 中间的数据向上或下平移*/}
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

                {/*实现两条数据的位置交换  中间的数据都不变 只是开始拖动的那条数据和终止时指定的数据做交换*/}
                <div className="right" onDragOver={this.dragOver} onDrop={this.drop2}>
                    <ul>
                        {
                            array2.map((list, index) => (
                                <li key={index}
                                    draggable="true"
                                    onDragStart={event => this.dragStart2(event, list)}
                                    onDragEnter={event => this.dragEnter2(event, list, index)}
                                >{list}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
};