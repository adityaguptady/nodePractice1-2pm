var express = require('express');
var app = express();

var server = app.listen(8081, function()
{
    var port = server.address().port
    console.log("Hello, the node server is listening to http://localhost:%s", port)
})

//API - /
app.get('/', function(request, response)
{
    response.send("Hello Node world!!!")
})

app.get('/testing', function(request, response)
{
    response.json(
        {
            status:"Success",
            data: "Your request has been submitted successfully!"
        })
})
//Static DB
const products = 
[
    {
        id:1,
        title: "Product 1 title comes here",
        description: "Description of the product comes here",
        codStatus: true
    },
    {
        id:2,
        title: "Product 2 title comes here",
        description: "Description of the product comes here",
        codStatus: true
    },
    {
        id:3,
        title: "Product 3 title comes here",
        description: "Description of the product comes here",
        codStatus: true
    },
    {
        id:4,
        title: "Product 4 title comes here",
        description: "Description of the product comes here",
        codStatus: true
    },
    {
        id:5,
        title: "Product 5 title comes here",
        description: "Description of the product comes here",
        codStatus: true
    },
    {
        id:6,
        title: "Product 6 title comes here",
        description: "Description of the product comes here",
        codStatus: true
    },
    {
        id:7,
        title: "Product 7 title comes here",
        description: "Description of the product comes here",
        codStatus: true
    }
]

const orders = 
[
    {
        orderId:1,
        productId:12,
        deliveryDate: "11-02-2024",
        paymentMode: "COD"
    },
    {
        orderId:2,
        productId:22,
        deliveryDate:"11-02-2024",
        paymentMode: "Online"
    },
    {
        orderId:3,
        productId:32,
        deliveryDate:"11-02-2024",
        paymentMode: "Net banking"
    },
    {
        orderId:4,
        productId:42,
        deliveryDate:"11-02-2024",
        paymentMode: "COD"
    }
]

app.get('/getProducts', function(request, response)
{
    response.json(
        {
            status: "success",
            data: products
        })
})

app.get('/getOrders', function(request, response)
{
    response.json(
        {
            status: "Success",
            data: orders
        })
})


app.get('/getProduct', function(request, response)
{
    console.log(request)
    response.json(
        {
            status: "success",
            data: products
        })
})

//----------------------

//DB
const todo = 
[
]

let count= 0

app.get('/addTodo', function(request, response)
{
    console.log(request.query)
    console.log(request.query.title)
    let title = request.query.title

    if(title==="")
    {
        response.json(
            {
                status: "Failure",
                message: "Please provide a valide todo title!"
            })
    }
    else
    {
        let todoObject = {
            id: count++,
            title: title
        }
    
        let todoPreviousLength = todo.length
    
        todo.push(todoObject)
    
        if(todoPreviousLength + 1 === todo.length)
        {
            response.json(
                {
                    status: "Success",
                    message: "Todo added successfully!!",
                    todoList: todo
                })
        }
        else
        {
            response.json(
                {
                    status: "Failure",
                    message: "Todo could not be added at the moment!"
                })
        }
    }

    
})

app.get('/getAllTodos', function(request, response)
{
    response.json(
        {
            status: "Success",
            todoList: todo
        })
})

app.get('/editTodo', function(request, response)
{
    response.json(
        {
            
        })
})

app.get('/deleteTodo', function(request, response)
{
    response.json(
        {
            
        })
})

app.get('/completeTodo', function(request, response)
{
    response.json(
        {
            
        })
})
