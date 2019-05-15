import React, {Component} from 'react';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data : 'No data yet',
            word : this.props.word,
            app_id : '6972a67c',
            app_key : '81543de0fc18455b3106394b3513ff2a',
            found : false,
            selected : '0'
        };

        this.searchWord = this.searchWord.bind(this);
    }

    async searchWord() {
        // console.log("searchWord() called");
        var word_to_search = this.refs.word_to_search.value.toLowerCase();
        this.state.selected = '0';
        if(word_to_search !== '') {
            console.log("Search query received : " + word_to_search);
            
            const url = "https://cors-anywhere.herokuapp.com/od-api.oxforddictionaries.com/api/v2/entries/en/"+word_to_search;
            const res = await fetch(url, {
                headers: {
                    'app_id': this.state.app_id,
                    'app_key': this.state.app_key
                }
            });
            const object = await res.json();
            // console.log("##################################");
            console.log("Response received:-");
            console.log(object);
            if(object.error) {
                // console.log("inside if");
                object.found = false;
                this.setState({data: object, found: false});
            }
            else {
                // console.log("inside else");
                object.found = true;
                this.setState({data: object, found: true});
            }
            this.props.setWord(word_to_search);
            this.props.setObject(object);
        }
    }

    render() {
        // console.log("***** Inside Header.render() *****");
        return (
            <div className="SearchBar">
                {/* <!-- Font Awesome CDN --> */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
                integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous"/>

                <form id="search">
                    <label htmlFor="searchField" className="DictionaryText">Dictionary</label>
                    <input type="text" id="searchField" placeholder="Search Phase or Word" defaultValue={this.props.word} ref="word_to_search" autoFocus/>
                    <span type="button" className="SearchButton" onClick={this.searchWord}><i className="fas fa-search"></i></span>
                </form>
            </div>
        );
    }
}

export default Header;