
// to import React and get access to it in this file
// this is basically we are telling,go find the library called "react" installed in my application as dependency (which
// is installed in my application in nodes_modules folder) as assign it to variable "React".
// the transpiler (the same library that is turning our JSX into normal Javascript) runs this file will make sure that
// this file has access to 'react' via assigned variable 'React'
// core 'react' library knows how to work with 'react' components.So it knows how to render them,how to nest them
// together and so on.The functionality to render them to the DOM(take a component and insert it into DOM ) however is
// now a separate library called 'react-dom'

import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

// 'react' -> to create ann manage components
// 'react-dom' -> to interact with actual DOM

// access SearchBar component from search_bar.js
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import YTSearch from 'youtube-api-search';

// whenever we import any file that the developer have written,we have to give an actual file reference to that file
// that we are trying to import.We don't have to do that with the libraries that we import because of their namespace.

// Youtube API key
const API_KEY = 'AIzaSyDuVS1grlPYdjWaziSyTwb5HLxR8oWuVTE';

YTSearch({key : API_KEY, term : 'surfboards'},function(data){
    console.log(data);
});
// create e new component and this component should produce some HTML
// this is called a 'class' and not an 'instance'.So we can this of this as a factory which produces instances of the
// actual components that gets rendered to the DOM
// we need to instantiate a component before it is being rendered to the DOM.

// const App = function(){
//   return <div>Hello World !</div>;
// };

// this is a component.A React application is made up of different components.
// a components is a function or an object that returns some amount of HTML.
// so it makes sense that we can have different components for different functions or different purposes within our
// application

// ES6 Syntax
// new way of declaring a function
// const App = () => {
//     return (
//         <div>
//             <SearchBar />
//         </div>
//         );
// };

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            videos : [],
            selectedVideo: null
        };
        this.videoSearch('surfboard');
    }

    videoSearch(term){
        YTSearch({key : API_KEY, term : term},(videos) => {
            this.setState({
                videos:videos,
                selectedVideo:videos[0]
            });
        });
    }

    render() {
        const videoSearch= _.debounce((term) => {this.videoSearch(term)},300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video = {this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    };
}

// This component needs to be put into the DOM somehow.Even though we write multiple components,none of them are inserted
// into the HTML DOM automatically.
// So take this component's generated HTML and put it ont the page(in the DOM).
// we use 'ReactDOM' here because we are trying to render something on the DOM (Remember,We can not use 'React' here).

// By doing this we are passing a class which is not legal we have to pass instance so
// ReactDOM.render(App);
// General rule -> whenever we are trying to render a component , just convert it into instance.
ReactDOM.render(<App />,document.querySelector('.container'));

