exports.ensureMinimumQty = (req, res) => {
    // Extract the cart object from the request body.
    var cart = req.body.resource.obj;

    // Actions array to hold all the update actions we need to perform.
    var actions = [];

    // Go through each line item in the cart.
    cart.lineItems.forEach((lineItem) => {
        // Check if the quantity of the line item is less than 5.
        if (lineItem.quantity < 5) {
            // Add an action to update the quantity of the line item to 5.
            actions.push({
                action: "changeLineItemQuantity",
                lineItemId: lineItem.id,
                quantity: 5
            });
        }
    });

    // If there are actions to perform, send them back as a response.
    // Otherwise, end the request with no changes.
    if (actions.length > 0) {
        res.status(200).json({ actions: actions });
    } else {
        res.status(200).end();
    }
};
