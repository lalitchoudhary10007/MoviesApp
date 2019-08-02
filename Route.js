import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from "./src/components/HomeScreen";
import MovieDetails from "./src/components/MovieDetails";
const Project= createStackNavigator({
  Home: {
   screen: HomeScreen
  },
  MovieDetails: {
   screen: MovieDetails
  }
});
export default createAppContainer(Project);