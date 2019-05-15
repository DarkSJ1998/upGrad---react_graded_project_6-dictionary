import React, {Component} from 'react';
import Header from './Header';
import Result from './Result';
import './SearchResult.css';

class SearchResult extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            word: this.props.word,
            object: this.props.object,
            selected: this.props.selected
        }
    }

    setWord = (word_to_search) => {
        // console.log("setWord() called."+word_to_search);
        this.setState({
            word: word_to_search
        });
    }

    setObject = (result) => {
        // console.log("setObject() called.");
        // console.log(result);
        this.setState({
            object: result
        })
    }
    
    render() {
        // console.log("***** Inside SearchResult.render() *****");
        // console.log("this.state.word : "+this.state.word);
        // console.log("this.state.object : ");
        // console.log(this.state.object);
        return (
            <div>
                <div className="topBar">
                    <Header word={this.state.word} setWord={this.setWord} setObject={this.setObject}/>
                </div>
                <div className="resultWindow">
                    <div className="resultData">
                        <Result word={this.state.word} object={this.state.object} selected={this.state.selected}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResult;