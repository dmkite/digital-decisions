import React from 'react'
import { View, Text } from 'react-native'
import {connect} from 'react-redux'
import {AppState} from '../store'

const Story = (props: any) => {
    return (
        <View>
            <Text>{props.selectedStory}, hey </Text>
        </View>
    )
}

const mapStateToProps = (state: AppState) => {
    console.log(state)
    return ({selectedStory: state.story.selectedStory})
}

export default connect(mapStateToProps)(Story)
