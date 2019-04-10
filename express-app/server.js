const express = require( 'express');
const app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const axios = require( 'axios');

app.use(express.static("./../react-app/build/")); 

app.post("/addauthor/",(request, response)=>{
    axios.post(`http://5c99215a423656001439321e.mockapi.io/api/v1/quotevault`,request.body.newAuthor)
         .then(function (mockApiAddAuthorPostResponse) {
            
             axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/quotevault`)
                  .then(function (mockApiGetQuotevaultResponse) {
                       return response.json({
                               data: mockApiGetQuotevaultResponse.data,
                               status:true
                           })
                   
                    })
                    .catch(error => {
                        console.log("get quotevault call failed"+error);
                        return response.json({
                            data: mockApiGetQuotevaultResponse.data,
                            status:false
                        })
                   });
                    
        })
        .catch(error => {
                console.log("add author  post call failed"+error);
                return response.json({
                    data: mockApiAddAuthorPostResponse.data,
                    status:false
                })
        });
    

})
app.post("/updateauthor/",(request, response)=>{
    console.log("update ", request.body.updatedItem);
    axios.put(`http://5c99215a423656001439321e.mockapi.io/api/v1/quotevault/${request.body.updatedItem.id}`,request.body.updatedItem)
         .then(function (mockApiUpdateAuthorPostResponse) {
            
             axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/quotevault`)
                  .then(function (mockApiGetQuotevaultResponse) {
                       return response.json({
                               data: mockApiGetQuotevaultResponse.data,
                               status:true
                           })
                   
                    })
                    .catch(error => {
                        console.log("get quotevault call failed"+error);
                        return response.json({
                            data: mockApiGetQuotevaultResponse.data,
                            status:false
                        })
                   });
                    
        })
        .catch(error => {
                console.log("update author  post call failed"+error);
                return response.json({
                    data: mockApiUpdateAuthorPostResponse.data,
                    status:false
                })
        });
    

})
app.get("/getquotevault/",(request, response)=>{

    axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/quotevault`)
         .then(function (mockApiGetQuotevaultResponse) {
                      return response.json({
                                data: mockApiGetQuotevaultResponse.data,
                                status:true
                            })
                       
                    
        })
        .catch(error => {
                console.log("get quotevault call failed"+error);
                return response.json({
                    data: mockApiGetQuotevaultResponse.data,
                    status:false
                })
        });
    

})
app.post("/updateitem/",(request, response)=>{
    console.log("PRE SAVE ", request.body.updatedItem);
    axios.put(`http://5c99215a423656001439321e.mockapi.io/api/v1/quotevault/${request.body.updatedItem.id}`,request.body.updatedItem)
         .then(function (mockApiUpdatetQuoteListResponse) {
            axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/quotevault/${request.body.updatedItem.id}`)
                 .then(function (mockApiGetAuthorQuotesResponse) {
                           return response.json({
                                   data: mockApiGetAuthorQuotesResponse.data,
                                   status:true
                               })
                       
                  })
                 .catch(error => {
                    console.log("get edit product  call failed"+error);
                    return response.json({
                        data: mockApiAuthorQuotes.data,
                        status:false
                    })
                 });
            })
            .catch(error => {
                console.log("Failed update")
                console.log("update quote list   call failed"+error);
                return response.json({
                    data: mockApiUpdatetQuoteListResponse.data,
                    status:false
                })
        });
    

})
app.get("/getauthorquotes/:id",(request, response)=>{
    console.log(" getting quotes for na author")
    axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/quotevault/${request.params.id}`)
         .then(function (mockApiGetAuthorQuotesResponse) {
                        return response.json({
                                data: mockApiGetAuthorQuotesResponse.data,
                                status:true
                            })
                    
        })
        .catch(error => {
                console.log("get edit product  call failed"+error);
                return response.json({
                    data: mockApiAuthorQuotes.data,
                    status:false
                })
        });
    

})



app.listen(5000 ,()=>{

});