import React, {Component} from 'react';
import './Result.css';

class Result extends Component {
    state = {
        data : 'No data yet',
        word : this.props.word,
        app_id : 'e9b7fe71',
        app_key : '24da6b5ce0efef2afd49cc8ec758c954',
        found : false,
        selected : '0',
    };

    constructor(props) {
        super(props);
        this.setState({object: this.props.object});
    }

    render() {
        console.log("***** Inside Result.render() *****");
        console.log("this.props.word : "+this.props.word);
        console.log(this.props.object);
        if(this.props.object.found === false || this.props.object.error !== undefined) {
            return (
                <div className="noResultFound">
                    <p>No exact matches found for <strong><i>"{this.props.word}"</i></strong></p>
                </div>
            );
        } else {
            console.log("******************************************");
            console.log(this.props.object.results[0].lexicalEntries[0].entries[0]);
            return (
                <div>
                    <div className="tabs">
                    {
                        this.props.object.results[0].lexicalEntries[0].entries[0] !== undefined
                        ? <span className="selected" ref="noun" onClick={this.showNoun}>Noun</span>
                        : null
                    }{
                        this.props.object.results[0].lexicalEntries[1].entries[0] !== undefined
                        ? <span ref="verb" onClick={this.showVerb}>Verb</span>
                        : null
                    }
                    </div>
                    
                    <div className="searchResult">
                        <h1>{this.props.object.id} <sup>1</sup></h1>
                        <ol>
                            {
                                this.props.object.results[0].lexicalEntries[this.state.selected].entries[0].senses.map(this.printMeaning)
                            }
                        </ol>
                    </div>
                </div>
            );
        }
    }
    
    async componentDidMount() {
        console.log("componentDidMount() called");
        const url = "https://cors-anywhere.herokuapp.com/od-api.oxforddictionaries.com/api/v2/entries/en/"+this.props.word;
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
        this.setState({data: object, found: true});
    }
    
    printMeaning = (item) => {
        //console.log(JSON.parse(JSON.stringify(item)));
        var definitions;
        var examples;
        var subsenses;
        if(item.definitions)
        definitions = item.definitions[0];
        if(item.examples)
            examples = item.examples;
        if(item.subsenses)
            subsenses = item.subsenses;
        
        return (
            <li key={item.id}>
                <strong>{definitions}</strong>
                <ul>
                    {examples ? examples.map(this.printExample) : null}
                </ul>
                <ol className="innerList">
                    {subsenses ? subsenses.map(this.printSubsenses) : null}                    
                </ol>
            </li>
        )
    }
    printExample = (item) => {
        return <li key={item.text}>'{item.text}'</li>;
    }
    printSubsenses = (item) => {
        return <li key={item.id}>{item.definitions}</li>;
    }

    showNoun = () => {
        this.refs.noun.setAttribute('class','selected');
        this.refs.verb.removeAttribute('class');
        this.setState({selected: '0'});
    }

    showVerb = () => {
        this.refs.noun.removeAttribute('class');
        this.refs.verb.setAttribute('class','selected');
        this.setState({selected: '1'});
    }
}

export default Result;