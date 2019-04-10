import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setQuoteVault,setAuthorQuotes,setReadyFlag} from '../redux.js';
import {
    BrowserRouter,
    Route,
    Link,
    Switch,
    Redirect
  } from "react-router-dom";
  import './../style/quotesmain.css'
import QuoteRanksAddAuthor from './QuoteRanksAddAuthor.js';
import QuoteRanksDetailAuthorQuotes from './QuoteRanksDetailAuthorQuotes.js';
import QuoteRanksAddQuotes from './QuoteRanksAddQuotes.js';
import QuoteRanksHome from './QuoteRanksHome.js';
import QuoteRanksAuthorEdit from './QuoteRanksAuthorEdit.js';

class QuoteRanksMain extends Component {

  constructor(props){
    super(props);
    this.state={error:""}

  }
 
  componentDidMount(){
    console.log("calling the getquotevault")
        axios.get(`http://localhost:5000/getquotevault/`)
             .then((response) => {
                console.log("getquotevault",response.data.data);
                this.props.setQuoteVault(response.data.data);
             })
             .catch((error) => {
                 console.log(error);
                 this.setState({error:"Server connection failed"});
             });

  }

  render() {
    return (
      <div className="quotesmainouterdiv">
         <BrowserRouter>
          <h1>Quote Ranks</h1>
          <Switch>
                    <Route exact path="/" render={() => (<Redirect to="/home" /> )} />
                    <Route path="/home" component={QuoteRanksHome}/>
                    <Route path="/addauthor" render={() => { return <QuoteRanksAddAuthor />}}/>
                    <Route path="/viewquotes/:id" render={(props) => { return <QuoteRanksDetailAuthorQuotes {...props}  />}}/>
                    <Route path="/addquotes/:id" render={(props) => { return <QuoteRanksAddQuotes {...props} />}}/>
                    <Route path="/authoredit/:id" render={(props) => { return <QuoteRanksAuthorEdit {...props} />}}/>
          </Switch>  
        </BrowserRouter>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  quotevault:state.quotevault,
  authorquotes:state.authorquotes,
  ready:state.ready
})

const mapDispatchToProps = (dispatch) => ({
  setQuoteVault: (payload) => dispatch(setQuoteVault(payload)),
  setAuthorQuotes: (payload) => dispatch(setAuthorQuotes(payload)),
  setReadyFlag: (payload) => dispatch(setReadyFlag(payload))
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteRanksMain);