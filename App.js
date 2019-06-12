/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 *
 */

import React, { Component } from "react";
import { PanResponder, StyleSheet, View } from "react-native";

const CIRCLE_SIZE = 80;

class App extends Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: this
        ._handleStartShouldSetPanResponderCapture,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onMoveShouldSetPanResponderCapture: this
        ._handleMoveShouldSetPanResponderCapture,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd
    });
    this.isTap = false;
    this._previousLeft = 0;
    this._previousTop = 0;
    this._circleStyles = { style: {} };
    this._containerStyles = { style: {} };
    this.circle = null;
  }

  _handleStartShouldSetPanResponder = (event, gestureState) => {
    // Should we become active when the user presses down on the circle?
    console.debug("Receiving Start ");
    this.isTap = true;
    return true;
  };

  _handleStartShouldSetPanResponderCapture = (event, gestureState) => {
    // Should we become active when the user presses down on the circle?
    console.debug("Receiving Start Capture ");
    this.isTap = true;
    return true;
  };

  _handleMoveShouldSetPanResponder = (event, gestureState) => {
    // Should we become active when the user moves a touch over the circle?
    console.debug("Receiving Move ");
    this.isTap = false;
    return true;
  };

  _handleMoveShouldSetPanResponderCapture = (event, gestureState) => {
    // Should we become active when the user moves a touch over the circle?
    console.debug("Receiving Move Capture");
    this.isTap = false;
    return true;
  };

  _handlePanResponderGrant = (event, gestureState) => {
    console.debug("The Pan Responder is received");
    this._highlight();
  };

  _handlePanResponderMove = (event, gestureState) => {
    console.debug("Receiving handlePanResponderMove");
    if (!this.isTap) {
      this._circleStyles.style.left = this._previousLeft + gestureState.dx;
      this._circleStyles.style.top = this._previousTop + gestureState.dy;
      this._updateNativeStyles();
    }
  };

  _handlePanResponderEnd = (event, gestureState) => {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  };

  UNSAFE_componentWillMount() {
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
        backgroundColor: "green"
      }
    };
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  _highlight() {
    this._circleStyles.style.backgroundColor = "blue";
    this._containerStyles.style.backgroundColor = "black";
    this._updateNativeStyles();
  }

  _unHighlight() {
    this._circleStyles.style.backgroundColor = "green";
    this._containerStyles.style.backgroundColor = "white";
    this._updateNativeStyles();
  }

  _updateNativeStyles() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
    this.container && this.container.setNativeProps(this._containerStyles);
  }

  render() {
    return (
      <View
        style={styles.container}
        ref={container => {
          this.container = container;
        }}
      >
        <View
          ref={circle => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    left: 0,
    top: 0
  },
  container: {
    flex: 1
    //paddingTop: 64
  }
});

export default App;
