const connect = require('connect');
const app = connect();

/*
    use() - used for combining the middleware 
    components. 

    Middleware convention:

    function setup(options){
        // setup logic

        return function(req,res,next){
            //middleware logic
        }
    }

    Usage:
    app.use(setup({ some: 'options'}));

    This makes the components resuable and configurable.
*/

// logger middleware component - logs the request, calls next() function giving the control back to
// the dispatcher.
function logger(res,res,next){
    console.log("New request received!");
    next();
}

// hello middeware component - ends the request, hence doesn't need next
function hello(res,res){
    res.end("Hello World!");
}

app
.use(logger)
.use(hello)
.listen(3000);