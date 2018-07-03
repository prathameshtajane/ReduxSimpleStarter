import React, { Component } from 'react';

// this JSX converts into react call like React.createElement
// we call this as a react functional component.Because it is a literally a function.


/*
const SearchBar = () => {
  // this will generate HTML input where user can type into
  return <input />
};
*/
// there is another type of component in react which is known as 'class component'
// a 'class component' is used whenever we want a component ot have some type of internal record keeping.Some ability
// for it to be aware of itself and what's happened to it since it's been rendered because users are going to be typing
// into this input.So now we will refactor this functional component to a class component.

// declaring new class with name sa SearchBar (which is a plain Javascript)
class SearchBar extends Component{

    // What is State ?
    // State is a plain javascript object that is used to record and react to user events.
    // Each class based component that we define has its own state object.Whenever a component is changed the component
    // immediately re-renders and also forces all of its children to render as well.
    // E.g. If search bar has some states and it changed the render function would be re-ran and If we had other components
    // inside it then those will also be re-rendered as well.
    // Before we use state in any of the component,we need to first initialise state object.
    // REMEMBER that functional components do not have state only class based components do.

    // constructor
    // all javascript classes have a special function called 'constructor'.
    // the constructor function is the first and only function called automatically whenever a new instance of the class
    // is created.
    constructor(props){
        super(props);
        // Component itself has a 'constructor' function.

        this.state = {term: ''};
        // so whenever we use state we initialise it by creating a new object and assigning it to this start state
        // the object we pass will also contain properties that we want tio record on the state.In this case
        // we want to record the term 'term' means whenever we change the input text this 'term' will be the one to be
        // updated or record that change on.
        // only in constructor function we update the 'state' as shown above,everywhere else inside of all of our
        // components we use method this.setState
    }

    // every React component that we create which is class based must have a defined render method
    render() {

        // return <input onChange={this.onInputChange}/>;

        // onInputChange(event) {
        //     console.log(event.target.value);
        // }

        // ES6 Syntax
        // return <input onChange={(event) => console.log(event.target.value)}/>;
        // update state
        // this.state.term = event.target.value //BAD !!!!!
        return(
            <div className="search-bar">
                <input
                    value={this.state.term}
                    onChange={(event) => this.onInputChange(event.target.value)}/>
                {/*Value of the input : {this.state.term}*/}
                {/*Now the input is a controlled component whose value only ever changes when the state changes*/}
            </div>
        );
    }

    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

    // Event Handling
    // this is a 2 step process :
    // 1. We declare a event handler.Event handler is a function that should be ran whenever the event occurs.
    // 2. We pass the event handler to the element that we want to monitor for events.
    //    e.g. In our case,we want to get notified when text inside <input> is modified.

    // Control Field
    // a control field is a a form element like an input whose value is set by the state rather that the other way
    // round.In the ideal world,the state should tell the input.
}




export default SearchBar;
// now any file in put application that imports search bar will get our SearchBar component.