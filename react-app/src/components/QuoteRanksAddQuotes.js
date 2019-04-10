import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setQuoteVault,setAuthorQuotes} from '../redux.js';
import {
    BrowserRouter,
    Route,
    Link,
    Switch,
    Redirect
  } from "react-router-dom";
  import './../style/addquote.css'

 
  
class QuoteRanksAddQuotes extends Component {
  constructor(props){
    super(props);
    this.state={quote:"",
                error:"",
                quotevalidationerror:""}
  }
  validate=(name,value)=>{
    console.log(value);
    if(name==="quote"){
      if(value.length>3){
        return true;
      }else{
        return false;
      }
    }
    return false;
  }
  handleChange=(e)=>{

    this.setState({[e.target.name]:e.target.value});
    if(!this.validate(e.target.name,e.target.value)){
      this.setState({quotevalidationerror:"Please enter a quote with minimum 3 characters"});
    }else{
      this.setState({quotevalidationerror:""}); 
    }

  }

  addQuote=()=>{
     
    let copiedObj =  JSON.parse(JSON.stringify(this.props.authorquotes.quotes));
    const copiedQuotesArray = Object.values(copiedObj);
    copiedQuotesArray.push({quote:this.state.quote,votes:0})
    console.log("after vote",copiedQuotesArray);
    let updatedItem={id:this.props.authorquotes.id,
                    authorname:this.props.authorquotes.authorname,
                    quotes:copiedQuotesArray

    }
    console.log("updatedItem", updatedItem);
   
    axios.post(`http://localhost:5000/updateitem/`,{updatedItem})
         .then((response) => {

           console.log("updated the item", response.data);
           this.props.setAuthorQuotes({authorquotes:response.data.data});
           this.state.ready({ready:true});

        })
        .catch((error) => {
           this.setState({ error: "Server connection failed" });
        });


  }

  render() {
    const displayError=()=>{
      if(this.state.quotevalidationerror!==""){
       return <div className="errormessage">{this.state.quotevalidationerror}</div>
      }
    }
    
    return (
      <div >
           <div className="detailnaviouterdiv">
                <div className="detailnavibarohomestyle"><Link to="/home">Home</Link></div>
                            
           </div>
           <div className="textstyle">Provide a Quote by {this.props.authorquotes.authorname}:</div>
           <div><Link to="/home">Home</Link></div>
           <div className="addquoteouterdiv">
           {displayError()}
               <div className="quoteinputouterdiv"><div className="quotetext">Quote:</div>
               <input className="quoteinputboxtitle" type="text" name="quote" onChange={this.handleChange} value={this.state.quote}/></div>
               <div className=" addquotelinkouterdiv">
               <div className="addlinkstyle"><Link to={`/viewquotes/${this.props.authorquotes.id}`} onClick={()=>this.addQuote()} type="button">Add Quote</Link></div>
               <div className="cancellinkstyle"><Link to={`/viewquotes/${this.props.authorquotes.id}`}  type="button">Cancel</Link></div>
               </div>
           </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  quotevault:state.quotevault,
  authorquotes:state.authorquotes
})

const mapDispatchToProps = (dispatch) => ({
  setQuoteVault: (payload) => dispatch(setQuoteVault(payload)),
  setAuthorQuotes: (payload) => dispatch(setAuthorQuotes(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteRanksAddQuotes);