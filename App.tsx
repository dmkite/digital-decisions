
import React, { useReducer, createContext } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import TitleCard from './src/components/TitleCard'
import { ITitleCardProps } from './src/components/TitleCard/TitleCard.props';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Modal
} from 'react-native';

interface IState {
  selectedStory: null | ITitleCardProps
}

interface IAction {
  type: string
  payload?: IState
}

const initialState: IState = { selectedStory: null };

const reducer = (state: IState = initialState, action: IAction): IState => {
  console.log('reducer firin')
  switch (action.type) {
    case 'open':
      return action.payload || {selectedStory: null}
    case 'close':
      return state
    default:
      return state
  }
}
const [state, dispatch] = useReducer(reducer, initialState)

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

const App: () => JSX.Element = () => {
  return (
    <>
      <LinearGradient colors={['#bbb', '#fff']} style={styles.linearGradient} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
        <View style={styles.header}>
          <Image style={styles.headerLogo} source={require('./src/assets/wacc-logo.png')} />
          <View style={styles.headerText}>
            <Text style={styles.title}>Digital Decisions</Text>
            <Text style={styles.subtitle}>Washtenaw Area Council for Children</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.main}>
          {stories.map((story: any, i: number): JSX.Element => <TitleCard dispatch={dispatch} key={i} {...story} />)}
        </ScrollView>
      </LinearGradient>
      {state.selectedStory && 
        <Modal 
          animationType='slide' 
          transparent={true} 
          visible={!!state.selectedStory} 
          onRequestClose={():void => dispatch({type: 'close'}) } >
          <Text>woohoo!</Text>
      </Modal>}
    </>
  );
};

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

export default App;
