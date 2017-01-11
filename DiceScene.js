import React, { Component } from 'react';
import { StyleSheet, View, Navigator } from 'react-native';
import { Svg, Circle, Ellipse, G, LinearGradient, RadialGradient, Line, Path, Polygon, Polyline, Rect, Symbol, Text, Use, Defs, Stop } from 'react-native-svg';

export default class DiceScene extends Component {
  static get defaultProps() {
    return {
      title: 'Dice'
    };
  }
  
  constructor(props) {
    super(props);
    this.state = { rolling:false, roll: 6 };
  }

  handleTouchStart(event) {
    if (!this.state.rolling) {
      this.setState({
        rolling: true,
        roll: null,
      });
    }
  }
  
  handleTouchEnd(event) {
    if (this.state.rolling) {
      this.setState({
        rolling: false,
        roll: Math.floor(6*Math.random()) + 1,
      });
    }
  }

  render() {
    var w = 130;
    var h = 130;

    var scaleFactor = .75;
    var face;
    if (this.state.rolling) {
      face = <RollingFace  width={w} height={h} />
    } else {
      face = <DiceFace value={this.state.roll} width={w} height={h} />
    }
    return (
      <View onTouchEnd={this.handleTouchEnd.bind(this)} onTouchStart={this.handleTouchStart.bind(this)} style={styles.container}>
        <Svg height={h} width={w}>
          <Rect x="0" y="0" width={w} height={h} stroke="black" fill="white" />
          <G translateX={-w/2*(scaleFactor-1)} translateY={-h/2*(scaleFactor-1)} >
          <G scale={scaleFactor} > 
            {face}
          </G>
          </G>
        </Svg>
      </View>
    );
  }
}

export class RollingFace extends Component {
  constructor(props) {
    super(props);
    this._mounted = true; // kludge (can't seem to stop the requestAnimationFrame in time when unmounting)  
    this.state = {
      dotX: 0,
      dotY: 0,
      animationRequest: null,
    }
   }
  
  componentWillMount() {

  }
  animateDot() {
    if (this._mounted) {
      this.setDot(
        Math.round(Math.random() * this.props.width),
        Math.round(Math.random() * this.props.height),
        Math.round(110 + Math.random() * (128-110)) //shade of black
      );
    }
  }
  setDot(x,y,f) {
    this.setState({
      dotX: x,
      dotY: y,
      dotFill: "rgb("+f+","+f+","+f+")",
      animationRequest: GLOBAL.requestAnimationFrame(this.animateDot.bind(this))
    })
  }
  componentDidMount() {
    GLOBAL.requestAnimationFrame(this.animateDot.bind(this));
  }
  componentWillUnmount() {
    this._mounted = false;
    GLOBAL.cancelAnimationFrame(this.state.animationRequest);
  }

  render () {
    
    return <G>
      <Circle x={this.state.dotX} y={this.state.dotY} r={15} fill={this.state.dotFill} />
    </G>

  }
}

export class DiceFace extends Component {
  render() {
    var renderedDots = [];
    var radius = 15;
    var dots = [[],
      [null,[null,radius,null],null], // 1
      [[radius,null,null],null,[null,null,radius]], // 2
      [[radius,null,null],[null,radius,null],[null,null,radius]], // 3
      [[radius,null,radius],null,[radius,null,radius]], // 4
      [[radius,null,radius],[null, radius, null],[radius,null,radius]], // 5
      [[radius,radius,radius],null,[radius,radius,radius]], // 6
      ];
    var face = dots[this.props.value];
    var xSegment = this.props.width / face.length;
    var xOffset = xSegment/2;
    var key=0;
    for (var row = 0; row < face.length; row +=1) {
      if (face[row] == null ) continue;
      var ySegment = this.props.height / face[row].length;
      var yOffset = ySegment/2;
      for (var column = 0; column < face[row].length; column += 1) {
        if (face[row][column] == null) continue;
        var radius = face[row][column];
        var x = Math.round(xOffset + xSegment*row);
        var y = Math.round(yOffset + ySegment*column);  
        renderedDots.push(<Circle x={x} y={y} r={radius} key={key++} stroke="black" fill="black" />);
      }
    }
    return <G>{renderedDots}</G>
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header: {
    color: '#FFF',
  }
});
