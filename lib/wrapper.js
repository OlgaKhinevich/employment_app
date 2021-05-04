/* Module for routes safe wrapping */

function safe_wrapper(func){
    return async function(req, res){
        try{
            await func(req, res);
        }
        catch(err){
          console.log(err);
          const err_message = (err.name === "AlertError") ? err.message : "Error during process!";
          res.statusMessage = err_message;
          res.status(400).send(err_message);
        }
    }

}

function staticMethods (input) {
    if (!input) return [];
    return Object.getOwnPropertyNames(input).filter(
        name => name !== "name"
             && name !== "length"
             && name !== "prototype"
             && typeof input[name] === "function"
    );
}

function wrap_class(wrap_class){
    const static_methods = staticMethods(wrap_class);
    if(!static_methods || !static_methods.length) return;
    static_methods.map((method)=>{
        wrap_class[method] = safe_wrapper(wrap_class[method]);
    });
    return wrap_class;
}

module.exports.wrap_class = wrap_class;