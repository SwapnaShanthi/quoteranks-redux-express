import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setQuoteVault} from '../redux.js';
import {
    BrowserRouter,
    Route,
    Link,
    Switch,
    Redirect
  } from "react-router-dom";
  import './../style/quoteshome.css'

class QuoteRanksHome extends Component {

  constructor(props){
    super(props);
    this.state={}

  }

  render() {
    const displayQuoteVault=this.props.quotevault.map((item,index)=>{
      return (<div className="quotesvaultdisplayinnerdiv">
                <div className="authorname">{item.authorname}</div>
                <div className="buttonouterdiv">
                  <div className="linkstyle1"><Link to={`/viewquotes/${item.id}`}>View Quotes</Link></div>
                  <div className="linkstyle2"><Link to={`/authoredit/${index}`}>Edit</Link></div>
                </div>
              </div>
               )

    })
    return (
      <div className="outerdiv">
          <div className="naviouterdiv">
                  <div className="navibarstyle" ><Link to="/addauthor">Add quotable author</Link></div>
                  <div className="plantextdiv">We have Quotes by:</div>
          </div>  
          <div className="quotesvaultdisplayouterdiv">
            <div className="quotesvaultdisplayinnerdiv"><div className="authorname">Author</div><div className="buttonouterdiv">Actions Available</div></div>
            { displayQuoteVault}
          </div>
        
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  quotevault:state.quotevault
})

const mapDispatchToProps = (dispatch) => ({
  setQuoteVault: (payload) => dispatch(setQuoteVault(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteRanksHome);