import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    state = {
        data : 'No data yet',
        word : this.props.word,
        app_id : 'e9b7fe71',
        app_key : '24da6b5ce0efef2afd49cc8ec758c954',
        found : false,
        selected : '0'
    };

    constructor(props) {
        super(props);
        this.searchWord = this.searchWord.bind(this);
    }

    async searchWord() {
        console.log("searchWord() called");
        var word_to_search = this.refs.word_to_search.value;
        //var word_to_search = this.state.word;
        console.log("Search query received : " + word_to_search);
        
        const url = "https://cors-anywhere.herokuapp.com/od-api.oxforddictionaries.com/api/v2/entries/en/"+word_to_search;
        const res = await fetch(url, {
            headers: {
                'app_id': this.state.app_id,
                'app_key': this.state.app_key
            }
        });
        const object = await res.json();
        if(!object)
            this.setState({found: false});
        console.log(object);
        object.found = 'true';
        console.log(object);

        this.setState({data: object, found: true});

        this.props.setWord(word_to_search);
        this.props.setObject(object);
    }

    render() {
        console.log("***** Inside Header.render() *****");
        return (
            <div className="SearchBar">
                {/* <!-- Font Awesome CDN --> */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
                integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous"/>

                <form id="search">
                    <label htmlFor="searchField" className="DictionaryText">Dictionary</label>
                    <input type="text" id="searchField" placeholder="Search Phase or Word" defaultValue={this.props.word} ref="word_to_search"/>
                    <span type="button" className="SearchButton" onClick={this.searchWord}><i className="fas fa-search"></i></span>
                </form>
            </div>
        );
    }

    // getWord = (e) => {
    //     this.setState({word: e.target.value});
    // }
}

export default Header;