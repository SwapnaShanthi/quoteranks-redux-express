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
  import './../style/addauthor.css';

class QuoteRanksAuthorEdit extends Component {
  constructor(props){
    super(props);
    this.state={authorname:"",
                authornamevalidationerror:"" }
  }
                           
  validate=(name,value)=>{
    console.log(value);
    if(name==="authorname"){
      if(value.length<3){
        return false;
      }else{
        return true;
      }
    }
    return false;
  }
  handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
    if(!this.validate(e.target.name,e.target.value)){
      this.setState({authornamevalidationerror:"Please enter a quote with minimum 3 characters"});
    }else{
      this.setState({authornamevalidationerror:""}); 
    }

  }
  editAuthor=()=>{
    let updatedItem={id:this.props.quotevault[this.props.match.params.id].id,
                  authorname:this.state.authorname,
                  quotes:this.props.quotevault[this.props.match.params.id].quotes
    }
    console.log("updated",updatedItem)
    axios.post(`http://localhost:5000/updateauthor/`,{updatedItem})
         .then((response) => {

          console.log("updated the item", response.data);
          this.props.setQuoteVault(response.data.data);
         })
        .catch((error) => {
          this.setState({ error: "Server connection failed" });
         });

  }

  componentDidMount(){
    this.setState({authorname:this.props.quotevault[this.props.match.params.id].authorname})
  }
  render() {
    const displayError=()=>{
      if(this.state.authornamevalidationerror!==""){
       return <div className="errormessage">{this.state.authornamevalidationerror}</div>
      }
    }
    return (
      <div >
           <div className="detailnaviouterdiv">
                <div className="detailnavibarohomestyle"><Link to="/home">Home</Link></div>
                            
           </div>
           <div className="textstyle">Edit quotable author: </div>
           <div className="addauthorquoteouterdiv">
               {displayError()}
               <div className="quoteinputouterdiv">
                  <div className="quotetext">Name:</div>
                  <input className="quoteinputboxtitle" type="text" name="authorname" onChange={this.handleChange} value={this.state.authorname}/>
               </div>
               <div className=" addquotelinkouterdiv">
               <div className="addlinkstyle"><Link to={`/home`} onClick={()=>this.editAuthor()} type="button">Submit</Link></div>
               <div className="cancellinkstyle"><Link to={`/home`}  type="button">Cancel</Link></div>
               </div>
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
)(QuoteRanksAuthorEdit);
