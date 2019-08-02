import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieActions';
import { updateSearch } from '../redux/actions/movieActions';
import PropTypes from 'prop-types';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Movie App'
  };


  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    this.props.fetchMovies();
  }

  FilterItem = search => {
    this.props.updateSearch(search);
  };

  render() {
    console.log("Props Res :- ", this.props.result);
    const moviesData = this.props.result.movies;
    this.arrayholder = moviesData;
    
    if (this.props.result.isFetching) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      )
    }

    return (
      <React.Fragment>
        
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          onChangeText={text => this.FilterItem(text)}
          autoCorrect={false}
          value={this.props.result.searchQuery}
        />

        <FlatGrid
          itemDimension={130}
          items={moviesData}
          style={styles.gridView}
          spacing={20}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MovieDetails', { movieID: item.id })}>
              <View>
                <Image source={{ uri: "https://image.tmdb.org/t/p/w780/" + item.poster_path }} style={styles.itemContainer} />
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.itemName}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

      </React.Fragment>
    );
  }
}

HomeScreen.propTypes = {
 // fetchMovies: PropTypes.func.isRequired,
 // updateSearch: PropTypes.func.isRequired
}


const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    flex: 1,
    backgroundColor: 'black'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  search_container: {
    backgroundColor: 'black'
  },
  search_input_container: {
    backgroundColor: 'black'
  }
});

//Map the redux state to your props.
const mapStateToProps = state => {
  return {
    result: state.movieReducer
  };
}


//export default HomeScreen;
export default connect(mapStateToProps, { fetchMovies, updateSearch })(HomeScreen);
