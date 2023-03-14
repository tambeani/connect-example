const connect = require('connect');
const app = connect();
const env = process.env.NODE_ENV || 'development';
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

// setup function - can be configured multiple times

function logger(format){
    const regexp = /:(\w+)/g;

    return function createLogger(req,res,next){
        const str = format.replace(regexp, (match,property) => {
            return req[property];
        });

        console.log(str);
        next();
    }
}

// hello middeware component - ends the request, hence doesn't need next
function hello(res,res){
    res.setHeader('Content-Type','text/plain');
    res.end("Hello World!");
}

function errorHandler(err,req,res,next){
    res.statusCode = 500;
    switch(env){
        case 'development':
            console.error('Error:');
            console.error(err);
            res.setHeader('Content-Type');
            res.end(JSON.stringify(err));
            break;
        default:
            res.end('Server Error');
    }
}

app
.use(logger(':method :url'))
.use(hello)
.use(errorHandler)
.listen(3000);