import React from 'react';
import { Button, View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchMovieDetails } from '../redux/actions/movieDetailsActions';

class MovieDetails extends React.Component {
    static navigationOptions = {
        //title: 'Details'
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const id = this.props.navigation.state.params.movieID;
        this.props.fetchMovieDetails(id);
    }


    getGenres(res) {
        console.log("genres:- ", res);
        console.log("genres:- ", res.genres);
        if (res.genres !== undefined) {
            let names = []
            for (let genre of res.genres) {
                names.push(genre.name);
            }
            console.log("genres:- " , names.toString());
            return names.toString();
        }

    }


    render() {
        if (this.props.result.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                </View>
            )
        }
        console.log("Details Response:- ", this.props.result);
        let detailResult = this.props.result.details;
        // let genres = []
        // for (let genre of detailResult.genres) {
        //     genres.push(genre.name);
        // }


        return (
            <React.Fragment>

                <View style={{ flex: 1, backgroundColor: 'aqua' }}>

                    <View style={{ flex: 3, backgroundColor: 'black', bottom: 0.5 }}>
                        <Image source={{ uri: "https://image.tmdb.org/t/p/w780/" + detailResult.backdrop_path }}
                            style={styles.backdrop_image} />
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('./../img/back-arrow.png')} style={{ width: 40, height: 40, padding: 10, margin: 10 }} />
                        </TouchableOpacity>


                        <View style={styles.bottomRight}>
                            <View style={{ flex: 1 }}>
                                <Image source={{ uri: "https://image.tmdb.org/t/p/w780/" + detailResult.poster_path }} style={styles.poster_image} />
                            </View>
                            <View style={styles.name_genre_layout}>
                                <Text style={styles.titleText}>{detailResult.title}</Text>
                                <Text numberOfLines={1} style={styles.genreText}>{this.getGenres(detailResult)}</Text>
                                <Text style={styles.genreText}>{detailResult.status + ":- " + detailResult.release_date}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ flex: 1, backgroundColor: 'black', flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.genreText}>{"Runtime"}</Text>
                            <Text style={styles.overview_text1}>{(Math.floor(detailResult.runtime / 60)) + "hrs " + (detailResult.runtime % 60) + "mins"}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.genreText}>{"Rating"}</Text>
                            <Text style={styles.overview_text1}>{detailResult.vote_average + "/10 (" + detailResult.vote_count + " votes)"}</Text>
                        </View>
                    </View>


                    <View style={{ flex: 2, backgroundColor: 'black', top: 0.5 }} >
                        <Text style={styles.overview_text}>{"OVERVIEW"}</Text>
                        <Text style={styles.overview_text1}>{detailResult.tagline}</Text>
                        <Text numberOfLines={5} style={styles.overview_text2}>{detailResult.overview}</Text>
                    </View>

                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    poster_image: {
        position: 'absolute',
        top: 10,
        left: 10,
        bottom: 10,
        right: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    genreText: {
        fontSize: 15,
        fontWeight: 'normal',
        color: 'white',
        top: 5
    },
    overview_text: {
        fontSize: 20,
        fontWeight: 'normal',
        color: 'white',
        left: 10,
    },
    overview_text1: {
        fontSize: 15,
        fontWeight: 'normal',
        color: 'white',
        left: 10,
        top: 5
    },
    overview_text2: {
        fontSize: 12,
        fontWeight: 'normal',
        color: 'white',
        left: 10,
        right: 10,
        top: 5
    },
    bottomRight: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        top: "40%",
        flexDirection: 'row'
    },
    backdrop_image: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "60%"
    },
    name_genre_layout: {
        flex: 2,
        justifyContent: 'center',
        top: 20
    }
});


//export default MovieDetails;

//Map the redux state to your props.
const mapStateToProps = state => {
    return {
        result: state.movieDetailsReducer
    };
}


export default connect(mapStateToProps, { fetchMovieDetails })(MovieDetails);
