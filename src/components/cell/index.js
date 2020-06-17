import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

import { CELL_SIZE } from '../../lib'
import styles from './styles';
import mines from '../../assets/images/mine.png';

class Cell extends Component {
    constructor(props){
        super(props);

        this.state = {
            opened: false,
            isMine: Math.random() < 0.25, // 25% of the cells should mine
            neighbors: null,
            clickedMine: false
        }
    }

    unveil = () => {
        if (this.state.opened){
            return;
        }

        this.setState({
            opened: true
        })
    }

    onOpen = (userClicked) => {
        if (this.state.opened){
            return;
        }

        if (!userClicked && this.state.isMine){
            return;
        }

        this.setState({
            opened: true
        }, () => {
            if (this.state.isMine){
                this.props.onDie();
                this.setState({ clickedMine: true });
            } else {
                this.props.onOpen(this.props.x, this.props.y);
            }
        });
    }

    reset = () => {
        this.setState({
            opened: false,
            isMine: Math.random() < 0.2,
            neighbors: null,
            clickedMine: false
        })
    }

    render() {
        if (!this.state.opened){
            return (
                <TouchableOpacity onPress={() => { this.onOpen(true) }}>
                    <View style={[ styles.cell, { width: CELL_SIZE, height: CELL_SIZE }]}/>
                </TouchableOpacity>
            )
        } else {
            let cellContent = null;
            if (this.state.isMine){
                cellContent = (
                    <Image source={mines} style={{ width: CELL_SIZE / 2, height: CELL_SIZE / 2}} resizeMode="contain" />
                )
            } else if (this.state.neighbors){
                cellContent = (
                    <Text style={{color: this.state.neighbors === 1 ? 'blue' : this.state.neighbors === 2 ? 'green' : 'red' , fontWeight: 'bold'}}>{this.state.neighbors}</Text>
                )
            }

            return (
                <View style={[ styles.cellOpened, { width: CELL_SIZE, height: CELL_SIZE, backgroundColor : this.state.clickedMine ? 'red' : '#bdbdbd' }]}>
                    {cellContent}
                </View>
            )
        }
    }
}

export default Cell;


