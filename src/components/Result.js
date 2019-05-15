import React, {Component} from 'react';
import './Result.css';

class Result extends Component {

    constructor(props) {
        super(props);
        this.changed = false;
        this.state = {
            object: this.props.object,
            data : 'No data yet',
            word : this.props.word,
            app_id : '6972a67c',
            app_key : '81543de0fc18455b3106394b3513ff2a',
            found : false,
            selected : this.props.selected,
        };
    }

    render() {
        // console.log("***** Inside Result.render() *****");
        // console.log("this.props.word : "+this.props.word);
        // console.log(this.props.object);

        // console.log("* render() called...");
        // console.log("this.state.selected : "+this.state.selected);
        // console.log("this.changed : "+this.changed);

        if(this.props.object.found === false || this.props.object.error !== undefined) {
            return (
                <div className="noResultFound">
                    <p>No exact matches found for <strong><i>"{this.props.word}"</i></strong></p>
                </div>
            );
        } else {
            // console.log("******************************************");
            // console.log(this.props.object.results[0].lexicalEntries[0].entries[0]);
            
            if(this.props.object.results[0].lexicalEntries.length <= 1 && this.changed === true) {
                this.changed = false;
                this.state.selected = this.props.selected;
            }
            
            return (
                <div className="container">
                    {/* <!-- Font Awesome CDN --> */}
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
                    integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous"/>

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
                        <h1>
                            {this.props.object.id} <sup>1</sup>
                            { this.props.object.results[0].lexicalEntries[this.props.selected].pronunciations !== undefined
                                ? <i className="fas fa-volume-up audio-icon" onClick={this.playSound}>
                                    <audio src={this.props.object.results[0].lexicalEntries[this.props.selected].pronunciations[0].audioFile} id="aud"></audio>
                                </i>
                                : null
                            }
                        </h1>
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
        // console.log("componentDidMount() called");
        const url = "https://cors-anywhere.herokuapp.com/od-api.oxforddictionaries.com/api/v2/entries/en/"+this.props.word;
        const res = await fetch(url, {
            headers: {
                'app_id': this.state.app_id,
                'app_key': this.state.app_key
            }
        });

        const object = await res.json();
        // console.log("##################################");
        // console.log(object);
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
        var crossReferenceMarkers;

        if(item.definitions)
            definitions = item.definitions[0];
        if(item.examples)
            examples = item.examples;
        if(item.subsenses)
            subsenses = item.subsenses;
        if(item.crossReferenceMarkers)
            crossReferenceMarkers = item.crossReferenceMarkers;
        
        return (
            <li key={item.id}>
                <strong>{definitions}</strong>
                <ul>
                    {examples ? examples.map(this.printExample) : null}
                </ul>
                <ol className="innerList">
                    {subsenses ? subsenses.map(this.printSubsenses) : null}
                </ol>
                <ul>
                    {crossReferenceMarkers ? crossReferenceMarkers.map( (item) => {
                        return <li key={item}>{item}</li>;
                    }) : null }
                </ul>
            </li>
        )
    }
    printExample = (item) => {
        return <li key={item.text}>'{item.text}'</li>;
    }
    printSubsenses = (item) => {
        return <li key={item.id}>{item.definitions}</li>;
    }
    show = (e) => {
        e.target.setAttribute('class','selected');
        this.changed = true;

        // console.log("* show() called...");
        // console.log("Set this.changed to true");

        this.setState({selected: e.target.id});
    }

    playSound = () => {
        document.getElementById("aud").play();
    }
}

export default Result;