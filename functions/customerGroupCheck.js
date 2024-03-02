exports.customerGroupCheck = (req, res) => {
    // Use an ID from your project for the retailer customer group!
    const retailerCustomerGroupId = "b0ca3896-936b-41fe-a5a4-f2dfdbde52b8";

    var cart = req.body.resource.obj;

    // Check if the cart belongs to a customer in the "retailer" customer group.
    var isRetailerCustomer = cart.customerGroup && cart.customerGroup.id === retailerCustomerGroupId;

    if (!isRetailerCustomer) {
        // Check if there are products currently in the cart.
        if (cart.lineItems.length === 0) {
            // If no products are in the cart, respond with a 200 and do nothing.
            console.log("No products in the cart to remove. Customer is not in 'retailer' group.");
            res.status(200).end();
            return;
        }

        // If the customer is not in the "retailer" group, prepare to clear the cart by removing all line items.
        const actions = cart.lineItems.map(lineItem => ({
            action: "removeLineItem",
            lineItemId: lineItem.id,
            quantity: lineItem.quantity,
        }));

        // Log the reason for removal.
        console.log("Removing all items from the cart because the customer is not in the 'retailer' customer group.");

        res.status(200).json({
            actions: actions // Adjusted to match the specified format
        });
        return;
    }

    // End with a 200 OK status if no modifications are made to the cart.
    res.status(200).end();
};
