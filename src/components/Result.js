import React, {Component} from 'react';
import './Result.css';

class Result extends Component {
    state = {
        data : 'No data yet',
        word : this.props.word,
        app_id : '6972a67c',
        app_key : '81543de0fc18455b3106394b3513ff2a',
        found : false,
        selected : '0',
    };

    constructor(props) {
        super(props);
        this.setState({object: this.props.object});
    }

    render() {
        console.log("***** Inside Result.render() *****");
        // console.log("this.props.word : "+this.props.word);
        console.log(this.props.object);
        if(this.props.object.found === false || this.props.object.error !== undefined) {
            return (
                <div className="noResultFound">
                    <p>No exact matches found for <strong><i>"{this.props.word}"</i></strong></p>
                </div>
            );
        } else {
            // console.log("******************************************");
            // console.log(this.props.object.results[0].lexicalEntries[0].entries[0]);
            return (
                <div className="container">
                    <div className="tabs">
                        {
                            this.props.object.results[0].lexicalEntries.map( (item, index) => {
                                var id = item.lexicalCategory.id;
                                var text = item.lexicalCategory.text;

                                return <span ref="txt" id={index} onClick={this.show} key={id+""+Math.random()}>{text}</span>
                            })
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

    componentDidUpdate() {
        if(this.props.object.found === true)
            document.getElementById(this.state.selected).setAttribute('class','selected');
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
        // console.log("##################################");
        console.log(object);
        if(object.error) {
            object.found = false;
            this.setState({data: object, found: false});
        }
        else {
            object.found = true;
            this.setState({data: object, found: true});
        }
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

    // showNoun = () => {
    //     this.refs.noun.setAttribute('class','selected');
    //     this.refs.verb.removeAttribute('class');
    //     this.setState({selected: '0'});
    // }

    // showVerb = () => {
    //     this.refs.noun.removeAttribute('class');
    //     this.refs.verb.setAttribute('class','selected');
    //     this.setState({selected: '1'});
    // }
    
    show = (e) => {
        // console.log(e.target);
        // console.log(e.target.id);
        e.target.setAttribute('class','selected');
        this.setState({selected: e.target.id});
    }
}

export default Result;