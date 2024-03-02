exports.adjustQuantityToMinimum = (req, res) => {
    // Extract the cart object from the request body.
    var cart = req.body.resource.obj;

    // Actions array to hold all the update actions we need to perform.
    var actions = [];

    // Go through each line item in the cart.
    cart.lineItems.forEach((lineItem) => {
        // Find the 'minimo' attribute within the line item's attributes.
        var minimoAttribute = lineItem.variant.attributes.find(attr => attr.name === "Minimo");

        // Log the found 'minimo' attribute for debugging.
        console.log(`Found 'minimo' attribute for lineItem ${lineItem.id}:`, minimoAttribute);

        // Ensure the 'minimo' attribute exists and has a valid integer value.
        if (minimoAttribute && Number.isInteger(minimoAttribute.value)) {
            // Check if the quantity of the line item is less than the 'minimo' value.
            if (lineItem.quantity < minimoAttribute.value) {
                // Add an action to update the quantity of the line item to the 'minimo' value.
                actions.push({
                    action: "changeLineItemQuantity",
                    lineItemId: lineItem.id,
                    quantity: minimoAttribute.value
                });
            }
        }
    });

    // Log the actions to be applied for debugging purposes.
    console.log("Prepared actions for the cart:", JSON.stringify(actions, null, 2));

    // If there are actions to perform, send them back as a response.
    // Otherwise, end the request with no changes.
    if (actions.length > 0) {
        res.status(200).json({ actions: actions });
    } else {
        res.status(200).end();
    }
};
