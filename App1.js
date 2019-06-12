import React, { Component } from "react";
import propTypes from "prop-types";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  Animated
} from "react-native";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

class App1 extends Component {
  constructor(props) {
    super(props);
    this.swipeValue = new Animated.Value(0);
    /*Only using Bubble Phase - Function are in order*/
    this.swipePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: this.isThisSwipeArea,
      onPanResponderGrant: this.isSwipePanResponding,
      onPanResponderMove: this.onPanResponderSwiping,
      onPanResponderRelease: this.isSwipePanReleased,
      onPanResponderTerminate: this.isSwipePanTerminated
    });
    this.tapPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.isThisTapArea,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onPanResponderGrant: this.isTapPanResponding,
      onPanResponderRelease: this.isTapPanReleased,
      onPanResponderTerminate: this.isTapPanTerminated
    });
    this.horizontalHeight = 100;
    this.verticalWidth = 50;
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: this.swipeValue
              }
            ]
          }
        ]}
      >
        <View
          style={[styles.swipeArea]}
          {...this.swipePanResponder.panHandlers}
        >
          <View style={styles.tapArea} {...this.tapPanResponder.panHandlers}>
            <View style={styles.touchableAreaContainer}>
              <TouchableOpacity
                onPress={() => {
                  console.debug("Pressed Touchable");
                }}
              >
                <Text>I'm Touchable</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }

  onPanResponderSwiping = (evt, gestureState) => {
    const isSwiped = this.isThisSwipeArea(evt, gestureState);
    if (isSwiped) {
      this.swipeValue.setOffset(gestureState.dx);
      this.swipeValue.setValue(0);
      console.debug("isSwiped in onPanResponderMove is ", isSwiped);
    }
  };

  isThisSwipeArea = (event, { moveX, moveY, dx, dy }) => {
    const isValidMoveX = 0 <= moveX && moveX <= windowWidth;
    const isValidMoveYTop = 0 <= moveY && moveY <= this.horizontalHeight;
    const isValidMoveYBottom =
      windowHeight - this.horizontalHeight <= moveY && moveY <= windowHeight;
    const isValidSwiped =
      isValidMoveX && (isValidMoveYTop || isValidMoveYBottom);
    return isValidSwiped;
  };

  isThisTapArea = (event, gestureState) => {
    const isATap = !this.isThisSwipeArea(event, {
      moveX: event.nativeEvent.locationX,
      moveY: event.nativeEvent.locationY
    });
    //TODO: Find difference b/w locationX and pageX
    if (isATap) {
      console.debug("isATap in onPanResponderMove is ", isATap);
    }
    return isATap;
  };

  isSwipePanResponding = (event, gestureState) => {
    console.debug("Swipe Pan Responding");
  };

  isSwipePanReleased = (event, gestureState) => {
    console.debug("Swipe Pan Released");
    this.translateContainerToOriginalState();
  };

  isSwipePanTerminated = (event, gestureState) => {
    console.debug(
      "Swipe Pan Terminated and Pan is stolen by another responder"
    );
    this.translateContainerToOriginalState();
  };

  isTapPanResponding = (event, gestureState) => {
    console.debug("Tap Pan Responding");
  };

  isTapPanReleased = (event, gestureState) => {
    console.debug("Tap Pan Released");
  };

  isTapPanTerminated = (event, gestureState) => {
    console.debug("Tap Pan Terminated and Pan is stolen by another responder");
  };

  translateContainerToOriginalState = () => {
    this.swipeValue.flattenOffset();
    this.swipeValue.setValue(0);
  };
}

App1.propTypes = {};

App1.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  },
  swipeArea: {
    flex: 1,
    backgroundColor: "green"
  },
  tapArea: {
    flex: 1,
    marginVertical: 100,
    backgroundColor: "blue"
  },
  touchableAreaContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App1;

/**
 *
 *
 * Diagram Representation
 *
 *
 * */

/**
 *
 *
 * -----------------
 * \  Swipe Area    \
 * \  ----------    \
 * \  \         \   \
 * \  \   Tap   \   \
 * \  \  Area   \   \
 * \  \   &     \   \
 * \  \ Content \   \
 * \  \         \   \
 * \  \         \   \
 * \  ----------    \
 * \                \
 * ------------------
 * */
