var express = require('express');
const req = require('express/lib/request');
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
var todo = 
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
        let todoPreviousLength = todo.length
    
        todo.push(getNewTodo(title))
    
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

app.get('/completeTodo1',function(req,res){
    const id=req.query.id
    const status=req.query.status
    if(todo.length===0){
        res.json(
            {
                status:"failure",
                message:"please add some todo first"
            })
    }
    else if(id===""||status===""){
        res.json(
            {
                status:"failure",
                message:"please add some todo first"
            })
    }
    else{
        let flagFound=0
        todo=todo.map(tempTodo=>{
            if(tempTodo.id===parseInt(id)){
                flagFound=1
                tempTodo.status=status;
                return tempTodo
            }
           else{
            return tempTodo
           }
        })
        if(flagFound===0){
            res.json(
                {
                status:"failure",
                message:"todo not found"
            })
        }
        else{
            res.json(
                {
                    status:"success",
                    message:"todo updated successfully",
                    todoList:todo
                })
        }
    }
})

app.get('/editTodo', function(request, response)
{
    //Req param - id, text
    
    //validation 
    //-- param blank --
    //-- list blank --
    //-- id exsit or not in the list
    //-- param[title] if that is equal to existing title -> please provide some different title for todo

    //find todo on the basis of ID --
    //todo object -> update title --
    //todo list update -> updated object --
    //respond with success and list --

    const id = request.query.id
    const title = request.query.title

    if(id === "" || title === "")
    {
        response.json(
            {
                status:"Failure",
                message: "ID or Title cannot be blank!"
            })
    }
    else
    {
        if(todo.length === 0)
        {
            response.json(
                {
                    status:"Failure",
                    message: "No todo exists in the list!"
                })
        }
        else
        {
            let flagFound = 0
            todo = todo.map(todoTemp => 
            {
                if(todoTemp.id === parseInt(id))
                {
                    flagFound = 1
                    todoTemp.title = title
                    return todoTemp
                }
                else
                {
                    return todoTemp
                }
            })

            if(flagFound === 0)
            {
                response.json(
                    {
                        status:"Failure",
                        message: "Todo not found!"
                    })
            }
            else
            {
                response.json(
                    {
                        status: "Success",
                        message: "Successfully updated the todo!",
                        todoList: todo
                    })
            }
        }
    }
})

app.get('/deleteTodo', function(request, response)
{
    const id = request.query.id
    if(id === "")
    {
        response.json(
        {
            status: "Failure",
            message: "Id cannot be blank!"
        })
    }
    else
    {
        let flagFound = 0
        todo = todo.filter(todoTemp => 
            {
                if(parseInt(id) === todoTemp.id)    
                {
                    flagFound = 1
                    return false
                }
                else
                {
                    return true
                }
            })
    
        if(flagFound === 0)
        {
            response.json(
            {
                status: "Failiure",
                message: "Todo cannot be found!",
                todoList: todo
            })
        }
        else
        {
            response.json(
            {
                status: "Success",
                message: "Successfully deleted the Todo!",
                todoList: todo
            })
        }        
    }    
})

app.get('/completeTodo', function(request, response)
{
    const id = request.query.id
    const status = request.query.status

    console.log("id: ", id)
    console.log("status: ", status)

    if(todo.length === 0)
    {
        response.json(
            {
                status: "Failure",
                message: "Please add some todo first!"
            })
    }
    else if(id === "" || status === "")
    {
        response.json(
            {
                status: "Failure",
                message: "Please provide valid ID & status"
            })
    }
    else
    {
        let flagFound = 0
        todo = todo.map(tempTodo =>
        {
            if(tempTodo.id === parseInt(id))
            {
                flagFound = 1
                tempTodo.status = status
                return tempTodo
            }
            else
            {
                return tempTodo
            }
        })
        if(flagFound === 0)
        {
            response.json(
            {
                status: "Failure",
                message: "Todo not found!"
            })
        }
        else
        {
            response.json(
            {
                status: "Success",
                message: "Todo updated successfully!",
                todoList: todo
            })
        }   
    }
})

function getNewTodo(title)
{
    let todoObject = {
        id: count++,
        title: title,
        status: false
    }

    return todoObject;
}

// function updateTodo(todo, status)
// {
//     todo.status = status

//     return todoObject;
// }


