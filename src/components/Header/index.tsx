import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const Header = () => {
  return (
    <View style={styles.header}>
          <Image style={styles.headerLogo} source={require('../../assets/wacc-logo.png')} />
          <View style={styles.headerText}>
            <Text style={styles.title}>Digital Decisions</Text>
            <Text style={styles.subtitle}>Washtenaw Area Council for Children</Text>
          </View>
        </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal:20,
    paddingVertical: 10
  },
  headerLogo: {
    height: 100,
    width: 100
  },
  headerText: {
    paddingLeft: 20,
    paddingTop: 5
  },
  title: {
    fontSize: 36
  },
  subtitle: {
    fontSize: 24
  },
})
