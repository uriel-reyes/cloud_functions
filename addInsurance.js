exports.addMandatoryInsurance = (req, res) => {
  	// Use an ID from your project!
    var taxCategoryId = "1aba7f86-aa97-4649-8cac-fcde18798699";

    var cart = req.body.resource.obj;
    // If the cart contains any line item that is worth more than $500,
    // mandatory insurance needs to be added.
    var itemRequiresInsurance = cart.lineItems.find( (lineItem) => {
        return lineItem.totalPrice.centAmount > 50000;
    });
    var insuranceItem = cart.customLineItems.find( (customLineItem) => {
        return customLineItem.slug == "mandatory-insurance";
    });

    var cartRequiresInsurance = itemRequiresInsurance != undefined;
    var cartHasInsurance = insuranceItem != undefined

    
    if (cartRequiresInsurance && !cartHasInsurance) {
        res.status(200).json({
          actions : [{
            action: "addCustomLineItem",
            name: { en: "Mandatory Insurance for Items above $500" },
            money: {
              currencyCode: cart.totalPrice.currencyCode,
              centAmount: 100000
            },
            slug: "mandatory-insurance",
            taxCategory: {
              typeId: "tax-category",
              id: taxCategoryId
            }
          }]
        });
    }
    else if (!cartRequiresInsurance && cartHasInsurance) {
        res.status(200).json({
          actions : [{
            action: "removeCustomLineItem",
            customLineItemId: insuranceItem.id
          }]
        });
    }
    else {
        res.status(200).end();
    }
};