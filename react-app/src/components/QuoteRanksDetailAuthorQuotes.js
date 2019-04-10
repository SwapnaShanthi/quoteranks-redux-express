import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setQuoteVault,setAuthorQuotes } from '../redux.js';
import {
    BrowserRouter,
    Route,
    Link,
    Switch,
    Redirect
} from "react-router-dom";
import './../style/detailauthorquotes.css'
class QuoteRanksDetailAuthorQuotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready:"",
            error:""
        }

    }
    getAuthorQuotes=()=>{
        axios.get(`http://localhost:5000/getauthorquotes/${this.props.match.params.id}`)
            .then((response) => {
                console.log("authorquotes", response.data.data);
                
                this.props.setAuthorQuotes({authorquotes:response.data.data});
                this.setState({ready:true});
            })
            .catch((error) => {
                console.log(error);
                this.setState({ error: "Server connection failed" });
            });
     }
   
    componentDidMount() {
        this.getAuthorQuotes();
    }

    updateVotes = (index,counterType) => {
         let copiedObj =  JSON.parse(JSON.stringify(this.props.authorquotes.quotes));
         const copiedQuotesArray = Object.values(copiedObj);
         const changedQuotesVotes= copiedQuotesArray.map((item,indx)=>{
            if(index===indx){
                if(counterType==="increment"){
                 item.votes= parseInt(item.votes)+1;
                }else{
                  item.votes= parseInt(item.votes)-1;
                }
            }
           return item
         })
         let updatedItem={id:this.props.authorquotes.id,
                         authorname:this.props.authorquotes.authorname,
                         quotes:changedQuotesVotes

         }
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
        return (
            <div >
                {this.state.ready ?
                    <div>
                        <div className="detailnaviouterdiv">
                            <div className="detailnavibarohomestyle"><Link to="/home">Home</Link></div>
                            <div className="detailnavibarstyle"><Link to={`/addquotes/${this.props.match.params.id}`}>Add a quote</Link></div>
                            
                        </div>
                        <div className="textstyle"> Quotes by {this.props.authorquotes.authorname}</div>
                        <div className="authorquotesdisplayouterdiv">
                            <div className="authorquotesdisplayinnerdiv"><div className="detailauthorname">Quotes</div><div className="detailvotes">Votes</div><div className="detailbuttonouterdiv">Actions Available</div></div>
                           { this.props.authorquotes.quotes.map((item, index) => {
                             return (<div key={index} className="authorquotesdisplayinnerdiv">
                                     <div className="detailauthorname">{item.quote}</div>
                                     <div className="detailvotes">{item.votes}</div>
                                     <div className="detailbuttonouterdiv">
                                        <div className="detailbuttoninnerdiv"><button className="detailbuttonvoteup" onClick={()=>this.updateVotes(index,"increment")} type="button">Vote Up</button></div>
                                        <div className="detailbuttoninnerdiv"><button className="detailbuttonvotedown" onClick={()=>this.updateVotes(index,"decrement")} type="button">Vote Down</button></div>
                                    </div>
                                    </div>
                              )})
                           }
                        </div>
                    </div>
                    :
                    <div>Loading ..</div>
                }
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
    setAuthorQuotes: (payload) => dispatch(setAuthorQuotes(payload))
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuoteRanksDetailAuthorQuotes);