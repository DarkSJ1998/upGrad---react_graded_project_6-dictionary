import React,{Component} from 'react';
import './App.css';
import Header from './components/Header';
import SearchResult from './components/SearchResult';

class App extends Component {
  state = {
    firstRun: 'yes'
  }

  setWord = (word_to_search) => {
    console.log("setWord() called : "+word_to_search);
    this.setState({
        word: word_to_search
    });
  }

  setObject = (result) => {
    console.log("setObject() called.");
    console.log(result);
    this.setState({
        object: result,
        firstRun: 'no'
    })
  }

  render() {
    if(this.state.firstRun === 'yes') {
      return (
        <div className="App-Home">
          <Header setObject={this.setObject} setWord={this.setWord}/>
        </div>
      );
    } else {
      return (
        <div className="App-Result">
          <SearchResult word={this.state.word} object={this.state.object}/>
        </div>
      );
    }
  }
}

export default App;
