import React from 'react'
import { Animated, Text, StyleSheet } from 'react-native'
import ISnackbarProps from './ISnackbarProps'


const Snackbar = (props: ISnackbarProps) => {
  const [slideAnim] = React.useState (new Animated.Value(-100))
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 10,
      duration: 500
    }).start()
    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 500
      }).start()
    }, 5000)
  }, [])

  return (
    <Animated.View style={
      [
        styles.body, {left: slideAnim},
        props.severity === 'ERROR' ? styles.warning : null,
        props.severity === 'SUCCESS' ? styles.success : null,
      ]}>
      <Text style={styles.message} >{props.message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
    borderRadius: 5,
    left: 10,
    padding: 20,
    fontSize: 18,
    zIndex: 10,
    backgroundColor: '#55aaef',
  },
  message: {
    color: 'white'
  },
  warning: {
    backgroundColor: '#ef55aa'
  },
  success: {
    backgroundColor: '#55efaa'
  }
})

export default Snackbar
