exports.confirmOrder = (req, res) => {
    // Extract the order object from the request body.
    const order = req.body.resource.obj;

    // Initialize an actions array to hold any update actions needed.
    const actions = [];

    // Check if there are payments linked to the order
    const hasPayments = order.paymentInfo && order.paymentInfo.payments.length > 0;

    // Check the current orderState and determine the appropriate state change based on the payment information
    if (order.orderState === "Open") {
        if (hasPayments) {
            // If there are payments, change the state to 'Confirmed'
            actions.push({
                action: "changeOrderState",
                orderState: "Confirmed"
            });
            console.log("Order is open and has payments, changing state to Confirmed:", JSON.stringify(actions, null, 2));
        } else {
            // If there are no payments, change the state to 'Cancelled'
            actions.push({
                action: "changeOrderState",
                orderState: "Cancelled"
            });
            console.log("Order is open but has no payments, changing state to Cancelled:", JSON.stringify(actions, null, 2));
        }
        // Send the actions back as a response to trigger the update in commercetools.
        res.status(200).json({ actions: actions });
    } else {
        // If the order state is not 'Open', log the state and end the function without changes.
        console.log(`Order state is not open, current state: ${order.orderState}`);
        res.status(200).send(`No action required as order state is ${order.orderState}.`);
    }
};
