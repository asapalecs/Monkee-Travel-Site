module.exports = (req,res,next) => {
    const {cart} = req.session;
    if(!cart) return next();
    if(cart.items.some(items => item.product.requiresWaiver)){
        cart.warnings.push('One or more of your selected' + 'tours requiers a wavier')
    }
    next();
}