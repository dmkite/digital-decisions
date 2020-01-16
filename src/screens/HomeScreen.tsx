import React, {useReducer} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import TitleCard from '../components/TitleCard'
import { ITitleCardProps } from '../components/TitleCard/TitleCard.props';
import SelectionModal from '../components/SelectionModal/'
import { NavigationStackProp } from 'react-navigation-stack';

interface IState {
  selectedStory: null | ITitleCardProps
}

export interface IAction {
  type: string
  payload?: IState
}

const initialState: IState = { selectedStory: null };

const reducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case 'open':
      return action.payload || {selectedStory: null}
    case 'close':
      return initialState
    default:
      return initialState
  }
}

const stories: ITitleCardProps[] = [
  {
    title: 'Cyber Bullying',
    moduleNumber: 2,
    gradientValues: ['#ED386C', '#F5BC53'],
    description: 'Guide Hannah, a high school sophomore, through the challenges of an interconnected social life and the pressures to become a cyber bully.',
  },
  {
    title: 'Online Predators',
    moduleNumber: 3,
    gradientValues: ['#33A07A', '#229AAA'],
    description: 'Here\'s another description that you can read'
  }
]

export interface INavigationProps{ 
  navigation: NavigationStackProp<string>
}

const HomeScreen = (props: INavigationProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <LinearGradient colors={['#bbb', '#fff']} style={styles.linearGradient} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
        <View style={styles.header}>
          <Image style={styles.headerLogo} source={require('../assets/wacc-logo.png')} />
          <View style={styles.headerText}>
            <Text style={styles.title}>Digital Decisions</Text>
            <Text style={styles.subtitle}>Washtenaw Area Council for Children</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.main}>
          {stories.map((story: any, i: number): JSX.Element => <TitleCard dispatch={dispatch} key={i} {...story} />)}
        </ScrollView>
      </LinearGradient>
      {console.log(state.selectedStory)}
      {state.selectedStory && <SelectionModal description={state.selectedStory.description} title={state.selectedStory.title} dispatch={dispatch} navigation={props.navigation}/>
        }
    </>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 20
  },
  header: {
    flexDirection: 'row',
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
  main: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    paddingTop: 50
  }
});

export default HomeScreen
