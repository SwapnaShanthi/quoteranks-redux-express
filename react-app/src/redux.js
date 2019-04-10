import {
    createStore,
} from 'redux';
import update from 'react-addons-update';

export const setQuoteVault = (payload) => ({
   
    type:"SET_QUOTE_VAULT",
    payload
});
export const setAuthorQuotes = (payload) => ({
    type:"SET_AUTHOR_QUOTES",
    payload
});
export const setReadyFlag = (payload) => ({
    type:"SET_READY_FLAG",
    payload
});



export const quoteRanksReducer=(state =initialState, action)=>{
    console.log("reducer state",state,action.type,action.payload);
    switch (action.type) {
        
      case 'SET_QUOTE_VAULT':
            return Object.assign({},
                                state,
                                {quotevault:action.payload,authorquotes:state.authorquotes,ready:state.ready})
     
      case 'SET_AUTHOR_QUOTES':
            return Object.assign({},
                                state,
                                {quotevault:state.quotevault,authorquotes:action.payload.authorquotes,ready:state.ready})
      case 'SET_AUTHOR_QUOTES':
            return Object.assign({},
                                state,
                                {quotevault:state.quotevault,authorquotes:state.authorquotes,ready:true})                          
       default:
             return state;
    }

}



const initialState = { 
    quotevault:[],
    authorquotes:{},
    ready:false
};

export function configureStore(initialState = initialState) { // initialState = initialState | {}
    const store = createStore(quoteRanksReducer,initialState);
    return store;
};

export const store = configureStore();
