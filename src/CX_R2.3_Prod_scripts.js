
    const CreateAddressPayload = () => {
        var BUS=context.session.BotUserSession;
koreDebugger.log("Form payload" + context.forms?.AddressDetails);

var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
if(eCommercePlatform == "Shopify") {
    context.addAddressPayload=JSON.stringify({
        storeAdminUrl : context.session.BotUserSession.ShopifyAdmin.storeAdminUrl,
        storeAdminToken : context.session.BotUserSession.ShopifyAdmin.storeAdminToken,
        queryParams: {
            customerId: BUS.UserInfo.id
        },
        "address": {
            "addressId": Date.now().toString(),
            "address1": context.forms?.AddressDetails.addressLine1,
            "address2": context.forms?.AddressDetails.state,
            "city": context.forms?.AddressDetails.city,
            "first_name": BUS.UserInfo.first_name,
            "last_name": BUS.UserInfo.last_name,
            "phone": BUS.UserInfo.phone,
            "zip": context.forms?.AddressDetails.zipcode,
            "name": BUS.UserInfo.first_name+BUS.UserInfo.last_name,
            // "province":context.forms.AddressDetails?.state,
            "country":context?.forms.AddressDetails?.country
        }
    });
} else if (eCommercePlatform == "SFCC") {
    context.addAddressPayload=JSON.stringify({
        "addressUrl": "https://"+env.shortCode+".api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/"+env.organizationId+"/customers/"+BUS.UserInfo.id+"/addresses?siteId="+env.siteId,
        "auth":"Bearer "+BUS.SfccAccessToken?.accessToken,
        "address": {
            "addressId": Date.now().toString(),
            "address1": context.forms?.SFCCAddressDetails.addressLine1,
            "address2": context.forms?.SFCCAddressDetails.state,
            "city": context.forms?.SFCCAddressDetails.city,
            "first_name": BUS.UserInfo.first_name,
            "last_name": BUS.UserInfo.last_name,
            "phone": BUS.UserInfo.phone,
            "zip": context.forms?.SFCCAddressDetails.zipcode,
            "name": BUS.UserInfo.first_name+BUS.UserInfo.last_name,
            // "province":context.forms.AddressDetails?.state,
            "country":context?.forms.SFCCAddressDetails?.countryCode
        }
    });
}



if(context.entities?.hActionDecider=="Add Address"){ //Required in Update profile information dialog
    delete context.entities.hActionDecider
}
koreDebugger.log("Address payload" + context.addAddressPayload);
    }


    const noUserLoginTries = () => {
        context.noUserLoginTries = (context?.noUserLoginTries || 0) + 1;

koreDebugger.log("username :: "+context.entities.userName);
    }


    const checkItemRefundEligibity = () => {
        orderStatus=context.getOrderStatus?.response?.body

if(["Cancelled", "Return Requested", "Return Inprogress", "Return Rejected", "Return Declined", "Returned"].includes(orderStatus[context.entities.showTitleMatchItems].status)){
    context.itemEligible=true
}

    }


    const prepDeleteAddressPayload = () => {
        var BUS=context.session.BotUserSession
var addressId=context?.entities?.showAllDeliveryAddresses||context.fetchDeliveryAddressDetails?.response?.body?.addresses[0]?.id
context.deleteAddressPayload={
    "customerId": BUS.UserInfo.id,
    "addressId": addressId
}
if(context.entities?.hActionDecider=="Delete Address"){
    delete context.entities.hActionDecider
}
    }


    const sfccPrepareTokenBody = () => {
        let body = context.sfccAuthorizeCustomer.response.body;
let location = body?.errors[0]?.responseHeaders?.location;
const usid = location.split("&")[0].split('=')[1];
const auth_code = location.split("&")[1].split('=')[1];

const redirectUri = env.redirectUri;
const siteId = env.siteId;
const shortCode = env.shortCode;
const organizationId = env.organizationId;
const client_id = env.client_id;
const hint = env.hint;
const accesstokenurl = `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${organizationId}/oauth2/token`;
context.accesstokenurl = accesstokenurl;
context.accessTokenBody = {
    code: auth_code,
    usid,
    grant_type: "authorization_code_pkce",
    redirect_uri: redirectUri,
    code_verifier: context.verifier,
    client_id,
    channel_id: siteId
};


    }


    const sfccCstructEnums = () => {
        var orderDetails = context.sfccGetOrdersDetails?.response?.body?.orders.slice(0,10)
items = []
for(i=0 ; i<orderDetails.length ; i++){
    for(j=0;j<orderDetails[i]?.line_items.length ; j++){
        items.push(orderDetails[i]?.line_items[j]?.id+'&'+orderDetails[i]?.id)
    }
}
context.itemsId = convertToEnumObj(items)
context.productTitle = convertToEnumObj(orderDetails?.flatMap(order => order.line_items.map(item => item.name)));
// context.itemsId.push({
//     name: 'Show More',
//     val: 'Show More',
//     syn: [ 'Show More' ]
// })


    }


    const sfccCreateOrderPayload = () => {
        var BUS=context.session.BotUserSession
var userId=BUS?.UserInfo?.id;
if(context.cartDetails){
    var info=context.sfccGetProductId.response.body.data?.products?.edges;
    var cartInfo=context.getCartItems.response.body.data?.cart?.lines?.edges
    var cartDetails=context.cartDetails.selectedItems
    
    var productItems=[]
    for(let i=0;i<cartDetails.length;i++){
          lineItems.push({
                "title": cartDetails[i].title,
                "price": parseFloat(cartDetails[i].price),
                "grams": "1300",
                "sku":cartDetails[i].sku,
                "quantity": cartDetails[i].quantity,
                "tax_lines": [
                    {
                        "price": 13.5,
                        "rate": 0.06,
                        "title": "State tax"
                    }
                ]
            })    
        
    }
}else{
var item=context.productDetails||{}
var productItems=[
            {
                "productId": item.ItemId,
                "quantity": item?.quantity
            }
            
        ]
}
context.orderPayload={
    "customerInfo": {
        "email": BUS.UserInfo.email,
        "customerNo": BUS.UserInfo.id
    },
    "billingAddress": {
        "firstName": BUS.UserInfo.first_name,
        "lastName": BUS.UserInfo.last_name,
        "address1": context.shippingAddress.address1,
        "city": context.shippingAddress.city,
        "postalCode": "01801",
        "stateCode": "MA",
        "countryCode": "US"
    },
    "shipments": [
        {
            "shippingMethod": {
                "id": "001"
            },
            "shippingAddress": {
                "firstName": BUS.UserInfo.first_name,
                "lastName": BUS.UserInfo.last_name,
                "address1": context.shippingAddress.address1,
                "city": context.shippingAddress.city,
                "postalCode": "01801",
                "stateCode": "MA",
                "countryCode": "US"
            }
        }
    ],
    "paymentInstruments": [
        {
            "amount": 1,
            "paymentCard": {
                "expirationYear": 1990,
                "expirationMonth": 7,
                "validFromMonth": 8,
                "validFromYear": 2007,
                "issueNumber": "i117",
                "maskedNumber": "*********4242",
                "holder": "Miller",
                "cardType": "Visa"
            },
            "paymentMethodId": "CREDIT_CARD"
        }
    ],
    "productItems": productItems
}
context.orderHeaders={
    auth:"Bearer "+context.session.BotUserSession?.SfccAccessToken?.accessToken,
    createOrderUrl:"https://"+env.shortCode+".api.commercecloud.salesforce.com/checkout/shopper-orders/v1/organizations/"+env.organizationId+"/orders?siteId="+env.siteId,
    createBasketUrl:"https://"+env.shortCode+".api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/"+env.organizationId+"/baskets?siteId="+env.siteId
}
koreDebugger.log(JSON.stringify(context.orderPayload))









// {
//     "order": {
//         "line_items":lineItems ,
//         "billing_address": {
//             "id":context.shippingAddress.id,
//             "first_name": BUS.UserInfo.first_name,
//             "last_name":BUS.UserInfo.last_name,
//             "address1": context.shippingAddress.address1,
//             "address2":context.shippingAddress.address2,
//             "phone": BUS.UserInfo.phone,
//             "city": context.shippingAddress.city,
//             //"province": context.shippingAddress.province,
//             "country": context.shippingAddress.country,
//             "zip": context.shippingAddress.zip
//         },
//         "shipping_address": {
//             "id":context.shippingAddress.id,
//             "first_name": BUS.UserInfo.first_name,
//             "last_name":BUS.UserInfo.last_name,
//             "address1": context.shippingAddress.address1,
//             "address2":context.shippingAddress.address2,
//             "phone": BUS.UserInfo.phone,
//             "city": context.shippingAddress.city,
//             //"province": context.shippingAddress.province,
//             "country": context.shippingAddress.country,
//             "zip": context.shippingAddress.zip
//         },
//         "customer": {
//     "first_name": BUS.UserInfo.first_name,
//     "last_name":BUS.UserInfo.last_name,
//     "email":BUS.UserInfo.email,
//     "phone":BUS.UserInfo.phone
//   },
//   "email":BUS.UserInfo.email,
//   "phone":BUS.UserInfo.phone,
//   "note_attributes": 
//             {
//                 "stripe_id": context.stripe_id
//             },
//         "transactions": [
//             {
//                 "kind": "sale",
//                 "status": "success",
//                 "amount": context.totalPrice
//             }
//         ],
//         "total_tax": 13.5,
//         "currency": "USD"
//     }
// }
    }


    const validateUserInput = () => {
        var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
if (eCommercePlatform === "Shopify") {

    if (context.logIn.response.body?.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
        context.isValidCredentials = true
    } else {
        delete context.entities.password
        context.noOfUserLogInAttempts = (context?.noOfUserLogInAttempts || 0) + 1;
    }
} else if (eCommercePlatform === "SFCC") {
    if (context.usid && context.auth_code) {
        context.isValidCredentials = true
    } else {
        delete context.entities.password
        context.noOfUserLogInAttempts = (context?.noOfUserLogInAttempts || 0) + 1;
    }
}
    }


    const parsingData = () => {
        var identifiedIntent = context.intentIdentifier.response.body?.choices[0]?.message?.content
identifiedIntent = identifiedIntent.match(/\d+/)

var intentNumber = parseInt(identifiedIntent)
var mPromptIdentifiedIntentVsActualDialogName = {
    "1":"Search and Order a Product",
    "2":"View Cart",
    "3":"View Cart",
    "4":"Find an Order",
    "5":"Cancel an Order",
    "6":"Exchange or Return an Order",
    "7":"Get Return, Exchange or Refund Status",
    "8":"Store Locator",
    "9":"Document Search",
    "10":"View Profile Information",
    "11":"Update Profile Information",
    "12":"Sign Up",
    "13":"Log In",
    "14":"Agent Transfer",
    "15":"Search and Order a Product"
}

context.identifiedIntent = mPromptIdentifiedIntentVsActualDialogName[intentNumber];
koreDebugger.log("Open ai response"+identifiedIntent+ " Identified Intent : " +intentNumber +", MappedTo : "+mPromptIdentifiedIntentVsActualDialogName[intentNumber])
context.intentIdentifier.response.statusCode=200
    }


    const prepOtpPayload = () => {
        context.OTP = getRandomNumber(1000,9999);//botFunc
let firstName = context.session.BotUserSession.UserInfo.first_name
if(context.action=="Phone Number"){
    payload = {
      "phone": context.forms.UpdatePhoneNo.phone,
      "message":  `Hi ${firstName}, your one-time code for updating the mobile number is ${context.OTP}. Please use this code within the next 5 minutes to complete the process. If you did not initiate this change, kindly reach out to us immediately.
      
      - ${env.displayStoreName}`
    };
    context.otpBody = JSON.stringify(payload);
context.notificationUrl=env.SMTHost+"/sendSMS"
koreDebugger.log(context.smsBody)
}else{
    emailBody={
      "content": `Hi ${firstName}, your one-time code for updating the email is ${context.OTP}. Please use this code within the next 5 minutes to complete the process. If you did not initiate this change, kindly reach out to us immediately.
      
      - ${env.displayStoreName}`,
      "to": context.forms.UpdateEmail.email,
      "subject": `Retail Assist: One-time code for Authentication`
    }
    context.otpBody = JSON.stringify(emailBody);
context.notificationUrl=env.SMTHost+"/sendEmail"
koreDebugger.log("Type : "+context.forms.UpdateEmail.email)
}
    }


    const checkOrderIdCapturedByGenAi = () => {
        if (context?.GenerativeAINode?.GenAIPromptFindAnOrder?.text) {
    var text = context.GenerativeAINode.GenAIPromptFindAnOrder.text
    var jsonString = text.replace(/^```json\n/, '').replace(/\n```$/, '');
    var parsedData = JSON.parse(jsonString);
    //if (parsedData.entities.length == 1) {
        var orderId = parsedData.entities[0].Order_ID[0];
        koreDebugger.log("Order id is " + orderId)
        if (orderId != "[null]")
            context.entities.orderId = orderId
    //}
}
    }


    const setCustomDataOnBus = () => {
        context.session.BotUserSession.UserInfo=JSON.parse(context.getCustomData.response.body.records[0].userInfo)
lastIntent={
    "IVROrderCancelation":"Cancel an Order",
    "IVRFindanOrder":"Find an Order",
    "IVR Return and Refund Status":"Get Return, Exchange or Refund Status"
}
context.lastIntent=lastIntent[context?.getCustomData?.response?.body?.records[0]?.lastIntent]
    }


    const passInfoToAgent = () => {
        // bus= context.session.BotUserSession
// agentUtils.setUserInfo(bus?.UserInfo);


var bus = context.session.BotUserSession;
koreDebugger.log("bus :"+JSON.stringify(bus?.UserInfo));
var agentInfo={}
if (bus?.UserInfo?.first_name) {
    var userInfo= bus.UserInfo;
    agentInfo = {
        "firstName": userInfo.first_name,
        "lastName": userInfo.last_name,
        "email": userInfo.email,
        "phoneNumber": userInfo.phone
        // ...bus["OrderMetaInfo"]
    }
}

agentUtils.setUserInfo(agentInfo);
koreDebugger.log('agentInfo : '+JSON.stringify(agentInfo))
context.isSentiment = context.session.BotUserSession?.isFromSentiment || null;
BotUserSession.delete("isFromSentiment");


    }


    const prepMainAppPayload = () => {
        var bus = context.session.BotUserSession;

let mainAppPayload = {
    //Context.actualQuery is set in the cacheappPayload. so When Cache is disabled user Query is retrieved from the last message.
    "query": context.session.BotUserSession.DocSearchSettings.isCacheEnabled == true ? context.actualQuery : bus.lastMessage?.messagePayload?.message?.body || bus.lastMessage?.messagePayload?.message?.text || " user input not found ",
    "answerSearch":true,
}

//When User Dislikes the Cache App result ,  We need to retreive the last user Query from the bus because last message may get altered in between.
if(bus.DislikesCachedResponse){
    mainAppPayload.query = bus.UserQuery;
    BotUserSession.delete("DislikesCachedResponse");
}
context.mainAppPayload = JSON.stringify(mainAppPayload);
    }


    const resetAddress = () => {
        context.displayAddressCount =context.displayAddressCount+5
delete context.entities.selectAddress
    }


    const parseGetAllOrders = () => {
        orders=context.getOrdersDetails.response.body.orders
for(i=0;i<orders.length;i++){
    for(j=0;j<orders.line_items;j++){
        obj=context.getAllOrdersTrackingInfo.response.body.find(order=>order.id==orders[i].id).line_items.find(item=>item.id==orders[i].line_items[j].id)
       orders[i].line_items[j]=copyObjectFields(obj,orders[i].line_items[j])
    }
}
context.getOrdersDetails.response.body.orders=orders
    }


    const resetCart = () => {
        delete context.entities.displayCart
delete context.cartAction
    }


    const prepOpenAIPayload = () => {
        context.searchResults = context.cacheAppSearch.response.body.template.results?.data?.data || context.cacheAppSearch.response.body.template.results?.default_group?.data || null;
let userQuery = context.cacheAppSearch.response.body.template.originalQuery;
if(context.searchResults){
    let targetPrompt = `Given Question : ${userQuery} \n Shortlisted Questions : \n`;
    for(let i = 0; i < context.searchResults.length; i++){
        targetPrompt += `${i+1}.${context.searchResults[i].query}\n`;
    }
    // koreDebugger.log(targetPrompt);
    context.openAIPayload =  JSON.stringify({
        "messages": [
            {
                "role": "system",
                "content": "You are an inference expert. Your task is to leverage your knowledge and expertise to identify the most similar question from the shortlisted questions for the given question. When generating your response, please adhere to the following guidelines:\n1: Use only the list of options provided to you in Shortlisted Questions and DO NOT fabricate new questions. 2:Restrict your information source to the content given in the input and refrain from using external references.\n3: Respond with only one question number if there is a match.\n4: Do not try to abbreviate acronyms or assume synonyms for any parts of speech.\nIf you find a match for the given question in the given shortlisted questions, return ONLY the index number of the shortlisted question. If you cannot find a relevant or similar match among the shortlisted questions, or are faced with an out of domain, reply with \"I don't know\"."
            },
            {
                "role": "user",
                "content": "Given Question : What is the price for a fridge?\nShortlisted Questions: 1.what is the price of a tv\n2.What is the conversion for miles to kilometers"
            },
            {
                "role": "assistant",
                "content": "I don't know"
            },
            {
                "role": "user",
                "content": "Given Question : how much does a tv cost?\nShortlisted Questions: 1.what is the price of a tv\n2.What is the conversion for miles to kilometers"
            },
            {
                "role": "assistant",
                "content": "1"
            },
            {
                "role" : "user",
                "content" : targetPrompt
            }
        ],
        "temperature": 0.1,
        "max_tokens": 10,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
        });
}

    }


    const prepTrackingInfoPayload = () => {
        context.orderId  = context.orderDetails?.id
if(context.entities.titleName){
    context.orderId = context.orderDetails[0].orderId
}

    }


    const prepEditOrderpayload = () => {
        var id = context.calculatedOrders.response.body?.data?.orderEditBegin?.calculatedOrder?.id
var calculatedId = id.split('/').pop()
var lineItemPayload = []
if(context.orderIdToCancel){
    order=context.getCancelableItems.response.body.eligibleOrders.find(order=>order.id==parseInt(context.orderIdToCancel))
    for(i=0;i<order.line_items.length;i++){
      lineItemPayload.push({
        "id": "gid://shopify/CalculatedLineItem/"+order.line_items[i].id,
        "quantity": 0
    })  
    }
   koreDebugger.log(JSON.stringify(lineItemPayload));
}
if(context.line_itemIdToCancel){
    lineItemPayload.push({
        "id": "gid://shopify/CalculatedLineItem/"+context.line_itemIdToCancel,
        "quantity": 0
    })  
}
var cancelReason=""
if(context.entities?.cancelReason){
    
cancelReason = context.entities.cancelReason
}else{
    cancelReason=context.session.BotUserSession?.lastMessage?.messagePayload?.message?.body||context.session.BotUserSession?.lastMessage?.messagePayload?.message?.text
}

context.editOrder = JSON.stringify({
    "calculatedOrderId" : calculatedId,
    "lineItems":lineItemPayload,
    "cancelreason" : cancelReason
    
})

   koreDebugger.log(context.editOrder);

    }


    const captureAccessTokenAndResetContext = () => {
        var bus = context.session.UserSession.callerId
var bus = context.session.BotUserSession
context.userId = getUserId()
if(context.isAudioCodes){
    bus.phnNumber = context.session.UserSession.Caller
    bus.callerId = context.session.UserSession.callerId
}
var cd = context.session.UserContext;
koreDebugger.log("BUS: "+JSON.stringify(cd))
// if(context.session.BotUserSession?.UserInfo?.id){
//     context.session.BotUserSession.UserInfo = undefined;
// }
    }


    const prepGetCartItems = () => {
        if(context?.getCartId?.response?.body?.metafields[0]?.value){
context.getCartItemsPayload=JSON.stringify({
    "cartId": context.getCartId.response.body.metafields[0].value
})
}
    }


    const isValidOTP = () => {
        if(context.entities.oneTimePasscode == context.OTP){
    context.isValidOTP=true;
}else{
    delete context.entities.oneTimePasscode;
    context.noOfOTPAttempts = (context?.noOfOTPAttempts || 0) + 1;
}
    }


    const prepQueryForProductId = () => {
        var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
var sku = context.entities.searchResults.indexOf(" ") != -1 ? context.entities.searchResults.split(" ")[0] : context.entities.searchResults.split("#")[0];

if(eCommercePlatform == "Shopify") {
    context.skuQuery = JSON.stringify({
        "skus": [sku]
    })
} else if(eCommercePlatform == "SFCC") {
    
    context.skuQuery = JSON.stringify({
        "getProductsUrl": "https://"+env.shortCode+".api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/"+env.organizationId+"/products?siteId="+env.siteId+"&ids="+sku,
        auth:"Bearer "+context.session.BotUserSession.SfccAccessToken.accessToken
    })
}
koreDebugger.log("payload"+context.skuQuery);
    }


    const prepBuyNow = () => {
        // Parse the commerce platform configuration from environment variables and retrieve the platform name
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName

if (eCommercePlatform == "Shopify") {
    // Extract product details from the Shopify response using optional chaining
    var productId = context.getProductId.response.body.data?.products?.edges[0]?.node?.variants?.edges[0]?.node?.id;
    var product=context.getProductId.response.body.data?.products?.edges[0].node
    var imageUrl=context.getProductId.response.body.data?.products?.edges[0]?.node?.images?.edges[0]?.node?.src;
    var arrProductId = productId.split("/")
    sku = context.entities.searchResults.indexOf(" ") !== -1 ? context.entities.searchResults.split(" ")[0] : context.entities.searchResults.split("#")[0]
    var bus = context.session.BotUserSession
    // Extract the last message payload, checking various possible paths for the message content.
    var msg=bus?.lastMessage?.messagePayload?.message?.payload ||bus?.lastMessage?.messagePayload?.message?.body||bus?.lastMessage?.messagePayload?.message?.text|| bus.lastMessage?.messagePayload?.entry[0]?.messaging[0]?.postback?.payload
    koreDebugger.log("payload: " + msg)
    // If the message contains "buy now" (case insensitive), construct the product details object.
    if(msg.match(/\bbuy now\b/gi)){
        context.productDetails ={
            "ItemId"     : arrProductId[4],
            "itemTitle"  : product.title,
            "itemImgUrl" : imageUrl,
            "itemPrice"  : product.variants.edges[0].node.price,
            "itemCatogery": product?.categories,
            "sku": context.entities.searchResults?.split("#")[0],
            "quantity":parseInt(context.entities.searchResults.split("#")[1])
        }
    }
} else if (eCommercePlatform == "SFCC") {
    // Get the product details directly from the response body.
    var product=context.getProductId.response.body
    // Extract the product ID and corresponding data using object keys and values.    
    var productId = Object.keys(product)[0];
    var productIdData = Object.values(product)[0];
    // Determine SKU based on the presence of a space or hash in the search results
    sku = context.entities.searchResults.indexOf(" ") !== -1 ? context.entities.searchResults.split(" ")[0] : context.entities.searchResults.split("#")[0]
    var bus = context.session.BotUserSession
    var msg=bus?.lastMessage?.messagePayload?.message?.payload ||bus?.lastMessage?.messagePayload?.message?.body||bus?.lastMessage?.messagePayload?.message?.text|| bus.lastMessage?.messagePayload?.entry[0]?.messaging[0]?.postback?.payload
    koreDebugger.log("payload: "+msg)
    if(msg.match(/\bbuy now\b/gi)){
        context.productDetails ={
            "ItemId"     : productId,
            "itemTitle"  : productIdData.productName,
            "itemImgUrl" : productIdData.imageUrl,
            "itemPrice"  : productIdData.price,
            "itemCatogery": productIdData.categories,
            "sku": productId,
            "quantity":parseInt(context.entities.searchResults.split("#")[1])
        }
    }
    koreDebugger.log(JSON.stringify(msg))
}
koreDebugger.log("Product Details is " + JSON.stringify(context.productDetails))

    }


    const parseTitleDetails = () => {
        orderDetails = context.getOrdersDetails.response.body.orders
orderList = []
noOfOrder = []
cnt = 1
if(context.entities.titleName){
    for(i=0;i<orderDetails.length ; i++){
        for(j=0 ;j<orderDetails[i].line_items.length ;j++){
            lineItem = orderDetails[i].line_items[j]
            if(context.entities.titleName.includes(lineItem.name)){
                lineItem["orderDate"] = orderDetails[i].created_at.split("T")[0] // we are storing only order Id and order Date since because we have title
                lineItem["orderId"] = orderDetails[i].id
                orderList.push(lineItem)
                noOfOrder.push({
                    "name":cnt,
                    "val":cnt,
                    "syn":cnt
                })
                cnt+=1
            }
        }
    }
    context.orderDetails = orderList
    context.noOfOrder = noOfOrder
    koreDebugger.log(context.orderDetails)
}


var orderDetails = context.orderDetails
context.cnfProductNodeTxt = "I see your order for "+orderDetails[0].name+", placed on "+orderDetails[0].orderDate.split("T")[0]+".Would you like an update on the status of this particular order?"

    }


    const Script0008 = () => {
        context.line_itemIdToCancel=context.lineItemId[parseInt(context.entities.similarProductNameOrders)-1]
    }


    const removeCartPayload = () => {
        var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
// Determine the SKU by checking if search results contain a space or not and splitting accordingly.
// var sku = context.entities.searchResults.indexOf(" ") != -1 ? context.entities.searchResults.split(" ")[0] : context.entities.searchResults.split("#")[0];

if(context.cartDetails){
    ids=[]
    // Retrieve selected items from cart details.    
var cartDetails=context.cartDetails.selectedItems
    // Loop through each cart detail item to extract the IDs.
    for(i=0;i<cartDetails.length;i++){
        ids.push(cartDetails[i]?.id)
    }
    // Prepare the payload for removing cart items by stringifying the cartId and lineIds.
    context.removeCartItemsPayload=JSON.stringify({
        "cartId": context.cartDetails.cartId,
        "lineIds": ids
    })
}

// Retrieve order details from the createAnOrder response.
var orderDetails = context.createAnOrder.response.body.order
var sku = []
for(i=0;i<orderDetails.line_items.length ; i++){
    sku.push(orderDetails.line_items[i].sku)
    
}
if(eCommercePlatform == "Shopify") {
// Prepare the SKU query payload for Shopify by stringifying the SKUs array.    
context.skuQuery =JSON.stringify({
    "skus":sku
})

koreDebugger.log(context.sku)
} else if(eCommercePlatform == "SFCC") {
    // Prepare the SKU query payload for SFCC by constructing the products URL with necessary parameters and token.
    context.skuQuery = JSON.stringify({
        "getProductsUrl": "https://"+env.shortCode+".api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/"+env.organizationId+"/products?siteId="+env.siteId+"&ids="+sku.join(','),
        auth:"Bearer "+context.session.BotUserSession.SfccAccessToken.accessToken
    })
}
    }


    const prepSetCartID = () => {
        customerId=context.session.BotUserSession.UserInfo.id
cartId=context.addToCart.response.body.data.cartCreate?.cart?.id

context.setCartIdPayload=JSON.stringify({
    "customerId":customerId ,
    "cartId": cartId
})
    }


    const parsingItemsAndOrders = () => {
        context.orders = context.getOrdersDetails?.response?.body.orders
context.productItems = [];
if(context.entities?.productTitles||context.entities?.hProductName){
    // Assigning the product name by checking productTitles,hProductName, and assign it to 'name'.
    name=context.entities?.productTitles||context.entities?.hProductName
    orders = []
    skus=[]
    itemIds=[]
    for(i=0 ; i<context.orders.length ; i++){
        // Initialize an array to hold line items that match the product name.
         line_items = []
        for(j=0;j<context.orders[i].line_items.length ; j++){
            lineItem = context.orders[i].line_items[j]
            // Check if the current line item's name matches either productTitles or hProductName.
            if((context.entities.productTitles == lineItem.name)||(context.entities.hProductName==lineItem.name)){
                line_items.push(lineItem)
                skus.push(lineItem.sku)
                itemIds.push(lineItem.id)
            }
        }
        if(line_items.length>0){
         // If there are matching items, add this order to the orders array with the matched items.
        orders.push({
            "id": context.orders[i].id,
            "created_at" : context.orders[i].created_at,
            "line_items" : line_items
        })
        }
    }
    // Once all orders are processed, check if we found any orders with matching line items.
    if(orders.length !=0){
        context.orders = orders
    }
    
    context.skuQuery=JSON.stringify({
    "skus":skus
})
    context.itemIds=convertToEnumObj(itemIds)
    
    context.itemIds.push({
    name: 'Show More',
    val: 'Show More',
    syn: ['Show More']
})
}


if(context?.GenerativeAINode?.GenAIPromptReturnOrRefundStatus) {
    var text = context.GenerativeAINode.GenAIPromptReturnOrRefundStatus.text
    var jsonString = text.replace(/^```json\n/, '').replace(/\n```$/, '');
    var parsedData = JSON.parse(jsonString);
    //if(parsedData.entities.length == 1) {
        var orderId = parsedData.entities[0].Order_ID[0];
        koreDebugger.log("Order id is " + orderId)
        if(orderId != "[null]")
            context.entities.hOrderId = orderId
    //}
}



    }


    const sfccParseAccessToken = () => {
        let access_token=context.sfccGetAccessToken.response.body.access_token;
context.access_token=`Bearer ${access_token}`;


    }


    const composeWBData = () => {
        //The below code will work when we use work bench ready to integrate. 
if(context.intentName === "Cancel_an_order"){
        context.cancelOrder = {
      "CurrFlow": { "enable": true, "FLWUP": {} },
      "CusMsg": { "enable": false, "FLWUP": {} },
      "AT": { "enable": false },
      "CusFlow": { "enable": false }
    }
}
else if(context.intentName === "Refund_Status"){
        context.refundStatus = {
      "CurrFlow": { "enable": true, "FLWUP": {} },
      "CusMsg": { "enable": false, "FLWUP": {} },
      "AT": { "enable": false },
      "CusFlow": { "enable": false }
    }
}

// else if(context.intentName === "Return_Order"){
//         context.exchangeOrder = {
//       "CurrFlow": { "enable": true, "FLWUP": {} },
//       "CusMsg": { "enable": false, "FLWUP": {} },
//       "AT": { "enable": false },
//       "CusFlow": { "enable": false }
//     },
//     context.returnOrder = {
//       "CurrFlow": { "enable": true, "FLWUP": {} },
//       "CusMsg": { "enable": false, "FLWUP": {} },
//       "AT": { "enable": false },
//       "CusFlow": { "enable": false }
//     }
// }
//koreDebugger.log()

//koreDebugger.log("Platform is " + JSON.parse(env.commercePlatformConfig).platformName)
context.eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
    }


    const resetSkuId = () => {
        delete context.entities.hSkuId
    }


    const prepProductTitlesEnum = () => {
        var orders = context.getOrdersDetails?.response?.body?.orders
context.titles = []
titles = orders.flatMap(order => order.line_items.map(item => item.name));
var arr = [... new Set(titles)].map(ele => ele.trim())
for(i=0;i<arr.length ; i++){
    context.titles.push({
        name:arr[i],
        val:arr[i],
        syn : [arr[i]]
    })
}

itemId = []
for(i=0;i<orders.length ; i++){
    for(j=0;j<orders[i].line_items.length ; j++){
        itemId.push(orders[i].line_items[j].id+"&"+orders[i].id)
    }
}
context.itemId = convertToEnumObj(itemId) //botFunc
context.displayOrdersCount = 0;
context.itemId.push({
    name: 'Show More',
    val: 'Show More',
    syn: [ 'Show More' ]
})

koreDebugger.log(context.titles)
    }


    const prepDelCachePayload = () => {
        
context.deletePayload=JSON.stringify({
  "docIds": [
     context.session.BotUserSession.DocId
  ]
})

if(context.session.BotUserSession.IsPrevAnsFromCache && context.entities.captureFeedback == "0"){
    context.session.BotUserSession.DislikesCachedResponse = true;
}
if(context.session.BotUserSession.IsResponseLiked){
    context.isResponseLiked = context.session.BotUserSession.IsResponseLiked;
    BotUserSession.delete("IsResponseLiked");
}

    }


    const sfccSetUserInfoOnBus = () => {
        const bus = context.session.BotUserSession;
const userInfo = context?.sfccCreateAccount?.response?.body||context.sfccGetProfileInfo?.response?.body;
koreDebugger.log('userInfo'+JSON.stringify(userInfo));
if (userInfo) {
  const formattedUserInfo = {
    "id": userInfo?.customerId||userInfo?.customer_id,
    "email": userInfo?.email,
    "first_name": userInfo?.firstName||userInfo?.given_name,
    "last_name": userInfo?.lastName||userInfo?.family_name,
    "phone":  userInfo?.phoneMobile || userInfo?.phone || userInfo?.phoneMobile ||  context.forms?.sfccSignUp?.PhoneNumber
  };
  BotUserSession.put("UserInfo", formattedUserInfo);

}
const SfccAccessToken = {
    "accessToken":context.getSFCCAccessToken.response.body?.access_token
 }

BotUserSession.put("SfccAccessToken", SfccAccessToken);
    }


    const setCustomerInfoOnBus = () => {
        var bus = context.session.BotUserSession;
var userInfo;
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
if (eCommercePlatform == "Shopify") {

userInfo = context.getCustomerInfo?.response?.body?.customers[0];
} else if(eCommercePlatform == "SFCC") {
    userInfo = context.updateProfile?.response?.body?.customer;
}
if (userInfo) {
  var formattedUserInfo = {
    "id": userInfo.id,
    "email": userInfo.email,
    "first_name": userInfo.first_name,
    "last_name": userInfo.last_name,
    "phone": userInfo.phone
  };

  bus.UserInfo=formattedUserInfo
}
if(context.entities?.hUpdateProfileOrAddress){
context.entities.hUpdateProfileOrAddress.shift()
if(context.entities.hUpdateProfileOrAddress.length==0){
    context.isEod=true
}else{
 delete context.entities.oneTimePasscode   
 delete context.noOfOTPAttempts
 delete context.isValidOTP
 delete context.forms.UpdatePhoneNo
 delete context.forms.UpdateEmail
 delete context.forms.UpdateName
}
}else{
    context.isEod=true
}
    }


    const prepProductNamesEnums = () => {
        orders = context.orderStatus;
productTitles = [];

for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < orders[i].result.length; j++) {
        productTitles.push(orders[i].result[j].name);
    }
}

context.prodNameAndIds = convertToEnumObj(productTitles);

    }


    const prepReturnOrderPayload = () => {
        var RegxExp = /^\d{14}$/;
if (context.entities.recentItems) {
    var selectedItems=JSON.parse(context.selectedItems).selectedItems
   var items=[]
    for(i=0;i<selectedItems.length;i++){
        items.push(selectedItems[i].id)
    }
} else {
    var items = [context.orderData.line_items[0].id];
}

var fullfilments = context.fullfilmentRequest.response.body.fulfillments;

customerNote ="Modes of return: "+ context.entities.modeOfReturn
if(context.entities.otherReasonForReturn){
    customerNote = context?.entities?.otherReasonForReturn+ "Modes of return: "+context.entities.modeOfReturn
}

const fullfilmentLookup = {};
// fullfilments.forEach((fulfillment) => {
//   fullfilmentLookup[fulfillment.id] = fulfillment.fulfillment_line_item_id;
// });
for(i=0;i<fullfilments.length ; i++){
    for(j=0;j<fullfilments[i].line_items.length ; j++){
        fullfilmentLookup[fullfilments[i].line_items[j].id] = fullfilments[i].line_items[j].fulfillment_line_item_id;
    }
}
koreDebugger.log("LookUp"+JSON.stringify(fullfilmentLookup))
var returnLineItems = items.map((itemId) => {
  if (fullfilmentLookup[itemId]) {
      koreDebugger.log("FullfillemntId"+itemId)
    return {
      fulfillmentLineItemId: "gid://shopify/FulfillmentLineItem/" + fullfilmentLookup[itemId],
      quantity: 1,
      returnReason: context.entities?.returnReason,
      customerNote: customerNote
    };
  }
});


context.returnOrder = JSON.stringify({
    "query": "mutation ReturnRequest($input: ReturnRequestInput!) { returnRequest(input: $input) { userErrors { field message } return { id status returnLineItems(first: 10) { edges { node { id returnReason customerNote } } } order { id } } } }",
    "variables": {
        "input": {
            "orderId": "gid://shopify/Order/" + JSON.parse(context.orderInfoPayload).orderId,
            "returnLineItems": returnLineItems
        }
    }
});



koreDebugger.log(returnLineItems)
    }


    const prepSkuPayload = () => {
        context.skuQuery = JSON.stringify({
    "skus": [context.entities.hSkuId]
})
    }


    const prepReturnOrderEmailBody = () => {
        BUS=context.session.BotUserSession
storeName="Kore Store"
storeAddress="galaxy Towers"
name=BUS.UserInfo.first_name+" "+BUS.UserInfo.last_name
returnCode=context.returnOrders.response.body.data.returnRequest.return.id.split("/")[4]
shippingLabel=
policyLink=""
logoLink="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiM0Q0EzMEQiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjMzMzY2IDEwLjAwMDFIMTAuMDQwN0wxMC42MzggMTkuNTU2M0MxMC42NDI2IDE5LjYzMSAxMC42NDgyIDE5LjcyMTIgMTAuNjU5NSAxOS44MDA3QzEwLjY3MjggMTkuODkzNCAxMC43IDIwLjAyNCAxMC43NzY1IDIwLjE1OTJDMTAuODc2MyAyMC4zMzU2IDExLjAyNzMgMjAuNDc3NSAxMS4yMDk2IDIwLjU2NjFDMTEuMzQ5MyAyMC42MzQxIDExLjQ4MTQgMjAuNjUzIDExLjU3NDggMjAuNjYwNUMxMS42NTQ3IDIwLjY2NjggMTEuNzQ1MSAyMC42NjY4IDExLjgyIDIwLjY2NjhMMjAuNjY3IDIwLjY2NjhDMjEuMDM1MiAyMC42NjY4IDIxLjMzMzcgMjAuMzY4MyAyMS4zMzM3IDIwLjAwMDFDMjEuMzMzNyAxOS42MzE5IDIxLjAzNTIgMTkuMzMzNCAyMC42NjcgMTkuMzMzNEgxMS45NkwxMS44NzY2IDE4LjAwMDFIMjAuMTE0OUMyMC40MzIgMTguMDAwMSAyMC43MDczIDE4LjAwMDEgMjAuOTM1OCAxNy45ODIzQzIxLjE3ODIgMTcuOTYzNSAyMS40MTkgMTcuOTIxOSAyMS42NTUzIDE3LjgxMTNDMjIuMDEwNCAxNy42NDQ5IDIyLjMwODggMTcuMzc3OCAyMi41MTMzIDE3LjA0MzJDMjIuNjQ5NCAxNi44MjA2IDIyLjcxNzMgMTYuNTg2IDIyLjc2MjggMTYuMzQ3MUMyMi44MDU3IDE2LjEyMiAyMi44MzYxIDE1Ljg0ODQgMjIuODcxMSAxNS41MzMzTDIzLjI2NTYgMTEuOTgyN0MyMy4yNzU0IDExLjg5NTIgMjMuMjg2OCAxMS43OTI2IDIzLjI4OTEgMTEuNzAyM0MyMy4yOTE4IDExLjU5OTMgMjMuMjg2IDExLjQ0NjcgMjMuMjE4IDExLjI4MzFDMjMuMTMxMiAxMS4wNzQxIDIyLjk3NiAxMC45MDA3IDIyLjc3NzkgMTAuNzkxM0MyMi42MjI4IDEwLjcwNTcgMjIuNDcxOCAxMC42ODMxIDIyLjM2OTEgMTAuNjc0M0MyMi4yNzkgMTAuNjY2NyAyMi4xNzU5IDEwLjY2NjcgMjIuMDg3OCAxMC42NjY4TDExLjQxODMgMTAuNjY2OEwxMS4zNjI3IDkuNzc3MjNDMTEuMzU4MSA5LjcwMjQ3IDExLjM1MjUgOS42MTIyNyAxMS4zNDExIDkuNTMyODVDMTEuMzI3OSA5LjQ0MDEyIDExLjMwMDcgOS4zMDk1MyAxMS4yMjQyIDkuMTc0MjhDMTEuMTI0NCA4Ljk5NzkgMTAuOTczMyA4Ljg1NjAxIDEwLjc5MTEgOC43Njc0QzEwLjY1MTMgOC42OTk0NiAxMC41MTkzIDguNjgwNDcgMTAuNDI1OSA4LjY3MzA1QzEwLjM0NTkgOC42NjY2OSAxMC4yNTU2IDguNjY2NzIgMTAuMTgwNyA4LjY2Njc1TDkuMzMzNjYgOC42NjY3NkM4Ljk2NTQ3IDguNjY2NzYgOC42NjY5OSA4Ljk2NTIzIDguNjY2OTkgOS4zMzM0MkM4LjY2Njk5IDkuNzAxNjEgOC45NjU0NyAxMC4wMDAxIDkuMzMzNjYgMTAuMDAwMVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMy4wMDAzIDIxLjMzMzRDMTIuNDQ4IDIxLjMzMzQgMTIuMDAwMyAyMS43ODExIDEyLjAwMDMgMjIuMzMzNEMxMi4wMDAzIDIyLjg4NTcgMTIuNDQ4IDIzLjMzMzQgMTMuMDAwMyAyMy4zMzM0QzEzLjU1MjYgMjMuMzMzNCAxNC4wMDAzIDIyLjg4NTcgMTQuMDAwMyAyMi4zMzM0QzE0LjAwMDMgMjEuNzgxMSAxMy41NTI2IDIxLjMzMzQgMTMuMDAwMyAyMS4zMzM0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE5LjAwMDMgMjEuMzMzNEMxOC40NDggMjEuMzMzNCAxOC4wMDAzIDIxLjc4MTEgMTguMDAwMyAyMi4zMzM0QzE4LjAwMDMgMjIuODg1NyAxOC40NDggMjMuMzMzNCAxOS4wMDAzIDIzLjMzMzRDMTkuNTUyNiAyMy4zMzM0IDIwLjAwMDMgMjIuODg1NyAyMC4wMDAzIDIyLjMzMzRDMjAuMDAwMyAyMS43ODExIDE5LjU1MjYgMjEuMzMzNCAxOS4wMDAzIDIxLjMzMzRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
mailContent="<?xml version='1.0' encoding='utf-8'?> <head> <style> body { font-family: Arial, sans-serif; margin: 20px; } .container { max-width: 600px; margin: 0 auto; } .container1{ padding: 15px 0 0 15px; margin: 0 0 15px 0; } .logo { margin: 10px 0 0 0; max-width: 100%; height: auto; } ul { list-style: none; padding: 0; margin: 0; } </style> </head> <body> <div class=\"container\"> <p>Dear "+name+",</p> <p>Thank you for contacting us regarding your recent purchase return. We apologize for any inconvenience caused.</p> <p>Here is your return information:</p> <div class=\"container1\"> <div class=\"innner-container\"> <ul> <li><b>Return Code/Shipping Label:</b> "+returnCode+"/"+shippingLabel+"</li> </ul> <p> <ul> <li>Please prominently label the package with the return code for efficient processing. For detailed return instructions, refer to our <a href=\""+policyLink+"\">Return Policy</a>.</li> </ul> </p> <ul> <li>Feel free to reach out to us if you have any concerns.</li> <li>Thank you for shopping with "+storeName+"!</li> </ul> <img class=\"logo\" src=\""+logoLink+"\" alt=\"[company name] Logo\"> </div> </div> </div> </body>"
if(context.entities.modeOfReturn=="Return to Store"){
  mailContent="<?xml version='1.0' encoding='utf-8'?> <head> <style> body { font-family: Arial, sans-serif; margin: 20px; } .container { max-width: 600px; margin: 0 auto; } .container1{ padding: 15px 0 0 15px; margin: 0 0 15px 0; } .logo { margin: 10px 0 0 0; max-width: 100%; height: auto; } ul { list-style: none; padding: 0; margin: 0; } </style> </head> <body> <div class=\"container\"> <p>Dear "+name+",</p> <p>Thank you for contacting us regarding your recent purchase return. We apologize for any inconvenience caused.</p> <p>Here's a quick guide on how to return the item directly at the store:</p> <div class=\"container1\"> <div class=\"innner-container\"> <ul> <li>1. Visit "+storeName+" at "+storeAddress+"].<br>2. Bring your order confirmation or receipt.<br>3. Our staff will assist with the retum process.</li> </ul> <ul> <li>Feel free to reach out to us if you have any concerns.</li> <li>Thank you for shopping with "+storeName+"!</li> </ul> <img class=\"logo\" src=\""+logoLink+"\" alt=\"[company name] Logo\"> </div> </div> </div> </body>"  
}
context.emailBody=JSON.stringify({
    "content":mailContent,
    "to": BUS.UserInfo.email,
    "subject": "Return Order Confirmation"
})
    }


    const actionDecider = () => {
        context.immediateAction=context.entities.hActionDecider
    }


    const extractingDataForGENAIPrompt = () => {
        var arr = [];
var orderDetails = context.getCancelableItems?.response?.body?.eligibleOrders;

for (var i = 0; i < orderDetails.length; i++) {
    for (var j = 0; j < orderDetails[i].line_items.length; j++) {
        arr.push({
            "orderId": orderDetails[i].id,
            "lineItemId": orderDetails[i].line_items[j].id,
            "name": orderDetails[i].line_items[j].name,
            "date": orderDetails[i].created_at.split('T')[0] 
        });
    }
}
context.data = arr;

context.isGenAIEnabled = env.isGenAIEnabled
    }


    const sfccCstrtBuyNow = () => {
        var product=context.sfccGetProductId.response.body
var productId = product.hits[0].productId;
var imageUrl=product.hits[0].image.link;
sku = context.entities.sfccSearchResults.indexOf(" ") !== -1 ? context.entities.sfccSearchResults.split(" ")[0] : context.entities.sfccSearchResults.split("#")[0]
var bus = context.session.BotUserSession
var msg=bus?.lastMessage?.messagePayload?.message?.payload ||bus?.lastMessage?.messagePayload?.message?.body||bus?.lastMessage?.messagePayload?.message?.text|| bus.lastMessage?.messagePayload?.entry[0]?.messaging[0]?.postback?.payload
koreDebugger.log("payload: "+msg)
if(msg.match(/\bbuy now\b/gi)){
context.productDetails ={
    "ItemId"     : productId,
    "itemTitle"  : product.hits[0].productName,
    "itemImgUrl" : imageUrl,
    "itemPrice"  : product.hits[0].price,
    "itemCatogery": product?.categories,
    "sku": productId,
    "quantity":parseInt(context.entities.sfccSearchResults.split("#")[1])
}
}
koreDebugger.log(JSON.stringify(msg))




    }


    const mappingImagesToItems = () => {
        // Extract the product information from the context's getProductId response
var prodInfo = context.getProductId.response.body.data.products.edges
const skuToImageMap = {};
// Iterate over each product to populate the skuToImageMap
prodInfo.forEach(product => {
    const sku = product?.node?.variants.edges[0]?.node.sku;
    const imageUrl = product?.node?.images?.edges[0]?.node?.src;
    // If both SKU and image URL are found, add them to the skuToImageMap
    if (sku && imageUrl) {
        skuToImageMap[sku] = imageUrl;
    }
});
// Iterate over each eligible line item in the context
context.eligibleLineItems.forEach(item => {
    const sku = item.sku;
    // If the SKU exists and there's a corresponding image URL in the map, add the imageUrl property to the item
    if (sku && skuToImageMap[sku]) {
        item['imageUrl'] = skuToImageMap[sku];
    }
});

//construct enums
context.lineItemIds = convertToEnumObj(context.eligibleLineItems.map(item => item.id));

    }


    const prepGetProductImages = () => {
        context.skuQuery={
    "skus":[]
}
var info=context.getCartItems.response.body.data.cart.lines.edges
for(let i=0;i<info.length;i++){
    context.skuQuery.skus.push(info[i].node.attributes[0].value)
}
context.skuQuery=JSON.stringify(context.skuQuery);
koreDebugger.log("skus: "+context.skuQuery)
    }


    const addMsgTags = () => {
        
if(context.entities.captureFeedback=="0"){
    tags.addMessageLevelTag("Like/Dislike","DisLike")
}else if(context.entities.captureFeedback =="1"){
    tags.addMessageLevelTag("Like/Dislike","Like")
}

if(context.entities.dislikeFeedbackMsg){
    tags.addMessageLevelTag("comments",context.entities.dislikeFeedbackMsg);
}else{
    tags.addMessageLevelTag("comments","User_Dislikes_Cache_Response");
}

if(context.session.BotUserSession.IsPrevAnsFromCacheCache && context.entities.captureFeedback=="1"){
    tags.addMessageLevelTag("cacheLike/Dislike","Like");
}else if(context.session.BotUserSession.IsPrevAnsFromCache && context.entities.captureFeedback=="0"){
    tags.addMessageLevelTag("cacheLike/Dislike","Dislike");
}

if(!(context.session.BotUserSession.IsPrevAnsFromCache) && context.entities.captureFeedback=="1"){
    tags.addMessageLevelTag("mainAppLike/Dislike","Like");
}else if(!(context.session.BotUserSession.IsPrevAnsFromCache) && context.entities.captureFeedback=="0"){
    tags.addMessageLevelTag("mainAppLike/Dislike","Dislike");
}

tags.addMessageLevelTag("userID",context.session.UserContext._id)
tags.addMessageLevelTag("UserQuery",context.session.BotUserSession.UserQuery)
tags.addMessageLevelTag("BotResponse",JSON.parse(context.session.BotUserSession.CacheObject).documents[0].response.replace(/<[^>]+>/g, ''));

    }


    const prepEnum = () => {
        var orderDetails = context.getOrdersDetails?.response?.body?.orders
for(i=0;i<orderDetails.length ; i++){
    if(orderDetails[i].id == context.orderId){
        context.productTitle = convertToEnumObj(orderDetails[i].line_items.map(item => item.name));
       
   }
}
context.productTitle.push({
    "name":"all",
    "val":"all",
    "syn":"all"
})



    }


    const prepAddToCartPayload = () => {
        bus=context.session.BotUserSession
var productId = context.getProductId.response.body.data?.products?.edges[0]?.node?.variants?.edges[0]?.node
var SKU=productId?.sku
productId=productId?.id
if(context.getCartItems.response.body?.data?.cart){
    context.addToCartPayload=JSON.stringify({
    "cartId": context.getCartId.response.body.metafields[0].value,
    "lines": [
        {
        "merchandiseId": productId,
        "quantity": context?.cartQuantity||1,
        "attributes": [
          {
            "key": "SKU",
            "value": SKU
          }]
      }
    ]
})
context.cartRoute="addCartItems"
}else{
    context.addToCartPayload=JSON.stringify({
    "cartInput": {
      "lines": [
        {
          "quantity": context?.cartQuantity||1,
          "merchandiseId": productId,
        "attributes": [
          {
            "key": "SKU",
            "value": SKU
          }]
        }
      ]
    }
  })
  
context.cartRoute="createCart"
}

    }


    const validateOpenAIResponse = () => {
        var bus = context.session.BotUserSession;
let index = context.identifyRelavantQuery.response.body.choices[0].message.content;
if(index.toLowerCase().trim() != "i don't know" && parseInt(index) < 5){
    let obj = context.searchResults[index-1];
    context.appResponse = {
        "content" : obj.response.replaceAll("&quot;","").replaceAll('"',""),
        "references": obj.references
    }
    bus.IsPrevAnsFromCache = true; 
    bus.DocId = obj["doc_id"]; // Setting this on bus to delete the cache response by Using Doc_Id if user dislikes it 
    //CacheObject is key set on bus whenever response is shown to user either from main or Cacheapp. And this object is stored to delete / update in feedback dialog based on user feedback.
    context.session.BotUserSession.CacheObject = JSON.stringify({ 
    "name": "Cache",
    "documents": [{
        "response": context.appResponse.content,
        "query": obj.query,
        "references": obj.references
        }]
    })
    if(obj.isResponseLiked){
        context.session.BotUserSession.IsResponseLiked = obj.isResponseLiked;
    }
}


    }


    const Script0010 = () => {
        var bus = context.session.BotUserSession;
context.userInput = bus.lastMessage?.messagePayload?.message?.body || bus.lastMessage?.messagePayload?.message?.text || bus.lastMessage?.messagePayload?.entry[0]?.messaging[0]?.message?.text
koreDebugger.log("User Input is " + context.userInput)

// context.isGenAiEnabled = false
koreDebugger.log("Env GenAIIVR is " + env.isIVRGenAIEnabled)
context.isIVRGenAIEnabled = env.isIVRGenAIEnabled
koreDebugger.log("context isIVRGenAIEnabled is " + context.isIVRGenAIEnabled)

// const formattedUserInfo = {
//     "id": "11111",
//     "email": "niranjan.anugu@kore.com",
//     "first_name": "Niranjan",
//     "last_name": "Reddy",
//     "phone": "+918688387213"
//   };

//   BotUserSession.put("UserInfo", formattedUserInfo);
    }


    const resetToIntentedFlow = () => {
        delete context.entities.showAllDeliveryAddresses
delete context.forms?.AddressDetails
delete context.displayAddressCount
delete context.noOfTries
delete context.prefillForms
context.immediateAction=context.entities.hActionDecider

    }


    const prepEnumsForHUpdateProfileOrAddress = () => {
        var platformName=JSON.parse(env.commercePlatformConfig).platformName;
context.platformName=platformName
context.profileFields=[{
    name: 'Address',
    val: 'Address',
    syn: [ 'Address','location' ]
}]
if(platformName=="SFCC"){
    context.profileFields.push({
    name: 'Name',
    val: 'Name',
    syn: [ 'Name' ]
})
}else if(platformName=="Shopify"){
       context.profileFields.push({
    name: 'Name',
    val: 'Name',
    syn: [ 'Name' ]
},{
    name: 'Email',
    val: 'Email',
    syn: [ 'Email','email address','email id','mail id','mail' ]
},{
    name: 'Phone Number',
    val: 'Phone Number',
    syn: [ 'Phone Number','number','contact details' ]
}) 
    }
    }


    const prepIntentPayload = () => {
        var query=context.session.BotUserSession?.lastMessage?.messagePayload?.message?.body || context.session.BotUserSession?.lastMessage?.messagePayload?.message?.text || "";
koreDebugger.log(query)

context.intentIdentifyPayload = JSON.stringify({
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are a skilled Retail Assistant AI ready to efficiently handle various user queries related to retail products and services. The query can be classified as following distinct intents:\n\n1. Search and Order a Product: The user is interested in searching for retail products and placing an order. This includes inquiries about product details, availability, features, and specifications. The user may refer to a specific product while searching for it or provide the full product name with the feature or may provide a model number. Identify this intent when the user wants to buy a product or add a product in their cart. If user wants to see a product or find a product, identify this intent. The user can also specify the mode of delivery or pickup along with the product that they want to shop or place an order for. User may also search for an item that they had ordered previously and reorder the item again. Identify this intent if the user wants to checkout or complete their purchase with the item or multiple items in their cart.\n\n2. Manage my Cart: The intent allows the user to change the quantity of the item in the cart. It also allows the user to delete certain items from the cart. \n\n3. View Cart: This intent allows the user to view their cart or the items added in the cart. Do not identify this intent if the user wants to check the items in their order. \n\n4. Find an Order: User wants to find their order or an item, or check the status of an order or item that they placed an order for. The user seeks information about the status, details or tracking of a specific order or item they placed on the retail platform. User can also look for any past order and its details like price, model, color, date of purchase and other order details for the purchased item. Identify this intent when the user wants to check the delivery or pickup status of their order or item, and inquires about the whereabouts of their order. Identify this intent if the user mentions anything related to checking status of an item. User may only mention incomplete product name when requesting the status of the product. This intent allows the user to view and find the order and the items in their order. \n\n5. Cancel an Order: The user wants to cancel an undelivered order or item they placed on the retail platform. This includes inquiries about order cancellation processes and associated details. This intent allows users to cancel their order or an item from their order due to various reasons which may include price variations,  ordered wrong item, order not needed anymore, some sort of ordering error, or any other reason and will be eligible to get their refund post cancellation. User may provide the item name, brand name, date, order ID to cancel the item or order. Identify this intent if the user wants to cancel a product with or without the order ID and get the refund for item or order which hasn't been delivered yet. Identify this intent if the user mentions cancellation of a product or an order. User cannot cancel the order if the order has been delivered.\n\n6. Exchange or Return an Order: The user is looking to exchange or return an item, multiple items from their order or the entire order that they purchased through the retail platform or the order which has already been delivered to them. This includes queries about return processes, reasons for returns, and return methods. This intent allows users to return their order due to various reasons which may include price variations, ordered wrong item, order not needed anymore, some sort of ordering error, user does not like the style or color of the product, the order received is not as described, defective, wrong size or any other reason. User can return their order via multiple modes - UPS or FedEx drop-off with return code, mail with shipping label, return at store. Order can be returned once it has been delivered or received by the user. If the user mentions that the product they received is damaged, expired or not what they expected, identify this intent.\n\n7. Get Return, Exchange or Refund Status: This intent will allow the user to get the status of their returned or exchanged order, or the refund for their returned or canceled order.\n\n8. Store Locator - The user wants the location of a nearby store or retail outlet and may ask the address of a particular store or outlet. They may mention the city name, locality or zip code in their query. Do not identify the intent if the user asks the directions on a product.\n\n9. Document Search: The user wants product information or needs technical support for the same. The queries may be related to : \na. troubleshooting issues with the product, complaints about certain features or product usability. Users can also indirectly hint towards this by only mentioning the problem they are facing like noise issues, charging issues, leaking issues, malfunctioning of the products, features not working as expected, inquiring on how a functionality or an accessory is supposed to be used. Users can ask the instructions to fix the issue in their appliance or device.\nb. Safety precautions related to a product to ensure safe and proper handling.\nc. Instruction Manual on how to operate or maintain a specific product. This may also include inquiries regarding the settings or requirements for usage of a product. User may directly ask how to operate a product by specifying the task it performs.\nd. Warranty coverage, validity of the warranty and other warranty information for a product.\ne. Instructions on how to properly install or set up a product, and the requirements for setting up a product. Users can ask about specific requirements of the product for installation.\nf. Owner manual, product guides, resources, books or other relevant documented material related to the product.\ng. Product feature related questions. The user may ask what a specific feature is and how it can be utilized, dimensions and specifications of the product.\ng. product information which might include questions concerning what a product or product part is.\n\n10. View Profile Information: The user wants to view or retrieve information about their profile, including saved addresses and their delivery and billing addresses or any other saved locations.\n\n11. Update Profile Information: The user needs assistance in updating or modifying their profile information on the retail platform. This involves changes to email addresses, phone numbers, name, address. A user can add, delete, modify their addresses using this intent. This intent allows the user to only update their phone number, email, first name and last name.\n\n12. Sign Up for a New Account: The user wants to create a new account on the retail platform. This includes inquiries about the sign-up process, account creation steps.\n\n13. Log In: This intent allows the user to access their account and log in or sign in to their existing account on the retail platform which is required for other functions like updating their information or tracking their order.\n\n14. Agent Transfer: This intent is for cases where users request to transfer, connect or chat with a live agent or human representative. Identify this intent whenever the user wants to talk to an agent or connect with an agent.\n\n15. None: This intent is for cases where users make statements that do not clearly indicate any of the above intents, have small talk, queries are out of domain for retail vertical or the user is giving feedback or sharing personal opinions about the products.\nGenerate the output in the following JSON format and make sure it is a valid JSON object and not a string. Make sure to generate the stop token \"###\" after completion of the JSON object. Generate only the index or serial number of the intent.\n"
    },
    {
      "role": "user",
      "content": "Can you add a refrigerator in my cart?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"1\"}###"
    },
    {
      "role": "user",
      "content": "Add this new running shoes in my cart"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"1\"}###"
    },
    {
      "role": "user",
      "content": "show aluminium USE-2 type Southwire"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"1\"}###"
    },
    {
      "role": "user",
      "content": "search stainless steel drills"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"1\"}###"
    },
    {
      "role": "user",
      "content": "My washer is not working properly. I want to buy a new one"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"1\"}###"
    },
    {
      "role": "user",
      "content": "Cart has 7 refrigerators. Can you help me with the checkout?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"1\"}###"
    },
    {
      "role": "user",
      "content": "I would like to change the number of ovens I added in my cart"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"2\"}###"
    },
    {
      "role": "user",
      "content": "Can you remove the air purifier from my cart"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"2\"}###"
    },
    {
      "role": "user",
      "content": "delete a few items from my cart like the washing machine I added yesterday"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"2\"}###"
    },
    {
      "role": "user",
      "content": "I would like to see the items I have added in my cart"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"3\"}###"
    },
    {
      "role": "user",
      "content": "Can you show me what's in my cart?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"3\"}###"
    },
    {
      "role": "user",
      "content": "What is the status of my recent order?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"4\"}###"
    },
    {
      "role": "user",
      "content": "show the status of lumber"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"4\"}###"
    },
    {
      "role": "user",
      "content": "check my boot's status"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"4\"}###"
    },
    {
      "role": "user",
      "content": "I want to check order status for my electric purifier now"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"4\"}###"
    },
    {
      "role": "user",
      "content": "I would like to check the state of my order for the 12 amp corded reciprocating saw"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"4\"}###"
    },
    {
      "role": "user",
      "content": "I want to check my laptop status."
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"4\"}###"
    },
    {
      "role": "user",
      "content": "I would like to see the items I ordered for order ID"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"4\"}###"
    },
    {
      "role": "user",
      "content": "i need the status of safety shirts"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"4\"}###"
    },
    {
      "role": "user",
      "content": "I want to cancel my order for the shirt as it's price has decreased."
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"5\"}###"
    },
    {
      "role": "user",
      "content": "I'm not satisfied with my purchase. How can I cancel it or return it?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"5\"}###"
    },
    {
      "role": "user",
      "content": "The order O1232 hasn't been delivered yet. Can you cancel it?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"5\"}###"
    },
    {
      "role": "user",
      "content": "I want to cancel my laptop"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"5\"}###"
    },
    {
      "role": "user",
      "content": "I want to cancel KitchenAid 23.8 cu. ft. French Door Refrigerator in PrintShield Stainless Steel, Counter Depth"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"5\"}###"
    },
    {
      "role": "user",
      "content": "I want to return the item I purchased last week."
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"6\"}###"
    },
    {
      "role": "user",
      "content": "My order 1234T just got delivered. Can you place a return request now?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"6\"}###"
    },
    {
      "role": "user",
      "content": "I received the product and it doesn't work properly. Can you help me get rid of it?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"6\"}###"
    },
    {
      "role": "user",
      "content": "I purchased 10 units of air purifiers and I would like to return 5 out of them."
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"6\"}###"
    },
    {
      "role": "user",
      "content": "Where is my refund?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"7\"}###"
    },
    {
      "role": "user",
      "content": "Can you update me regarding my exchange request?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"7\"}###"
    },
    {
      "role": "user",
      "content": "What is the status of my returned item?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"7\"}###"
    },
    {
      "role": "user",
      "content": "i was looking for a store in Maine. Can you share the address?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"8\"}###"
    },
    {
      "role": "user",
      "content": "what's the nearest store for zip 49494"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"8\"}###"
    },
    {
      "role": "user",
      "content": "I want to check and locate nearby stores"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"8\"}###"
    },
    {
      "role": "user",
      "content": "what are the safety precautions associated with using a dishwasher?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "I need more info about the storage tanks"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "How do I use a drilling machine?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "how long do you provide warranty on the wooden dining table?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "what is UT27?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "How to move my freezer to a new home"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "what is a wrench and how do you use it?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "what is a valve inlet?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "how do i setup the television on the wall?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "can you download the user book manual for this dryer"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "can you download the user book manual for this garage door."
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "can you help me fix the driver issue i am facing in my laptop"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "What do I do if the green LED power light on my freezer is not on?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "Are faucet-mounted reverse osmosis systems recommended for use with the refrigerator?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "What should be done with the refrigerator handles upon removal?\n"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "What are the steps for cooking various poultry items, such as whole chickens and chicken pieces, in the microwave oven?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"9\"}###"
    },
    {
      "role": "user",
      "content": "I want to check the addresses I have saved."
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"10\"}###"
    },
    {
      "role": "user",
      "content": "I need to update my address in the account section."
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"11\"}###"
    },
    {
      "role": "user",
      "content": "My surname’s spelling is incorrect, can you modify it?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"11\"}###"
    },
    {
      "role": "user",
      "content": "I need to change the email id which I used for registering here"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"11\"}###"
    },
    {
      "role": "user",
      "content": "You have my old phone number in your record which is no longer in use"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"11\"}###"
    },
    {
      "role": "user",
      "content": "How do I sign up for a retail account?"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"12\"}###"
    },
    {
      "role": "user",
      "content": "I want to log into my account."
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"13\"}###"
    },
    {
      "role": "user",
      "content": "chat with customer support representative"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"14\"}###"
    },
    {
      "role": "user",
      "content": "I want to resolve my banking issues"
    },
    {
      "role": "assistant",
      "content": "{\"Intent\" : \"15\"}###"
    },
    {
        "role":"user",
        "content":query
    }
  ],
  "temperature": 0.1,
  "max_tokens": 256,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0,
  "stop": ["###"]
})
    }


    const parseSelectedItems = () => {
        var bus = context.session.BotUserSession
var msg=bus?.lastMessage?.messagePayload?.message?.body||bus?.lastMessage?.messagePayload?.message?.text
try{
if(JSON.parse(msg)){
    context.selectedItems=msg
}
    
}catch(e){
}
    }


    const prepOtpForPayment = () => {
        context.OTP = getRandomNumber(100000,999999);//botFunc
let firstName = context.session.BotUserSession.UserInfo.first_name;
context.smsBody = JSON.stringify({
      "phone": context.session.BotUserSession.UserInfo.phone,
      "message":  `Your one-time code for payment is ${context.OTP}. Please use this code to complete the payment.

- ${env.displayStoreName}`
    });
    
koreDebugger.log('Payment-SMS-Body : '+JSON.stringify(context.smsBody))
    }


    const resetOrderId = () => {
        delete context.entities.selectedOrderId;
delete context.entities.recentOrderItems;
delete context.entities.recentOrders
delete context.entities.showOrders
context.showMoreClickCount+=3;
    }


    const sfccTotalPrice = () => {
        if(context?.cartDetails){
var prod=context.sfccGetProductId.response.body.data.products.edges
var cartInfo=context.getCartItems.response.body.data?.cart?.lines?.edges
var cartDetails=context.cartDetails.selectedItems
context.totalPrice=0
for(let i=0;i<cartDetails.length;i++){
    context.totalPrice=context.totalPrice+parseFloat(cartDetails[i].price)*(cartDetails[i].quantity)
        
}
}else{
var bus=context.productDetails
    context.totalPrice=parseFloat(bus.itemPrice*bus.quantity)
}

// context.price = content.SOP_orderTotalMsg+" "+getFormattedCurrency(context.totalPrice)

    }


    const deleteContextVariabel = () => {
        delete context.entities.registerMobileNum
context.isNumberNotFoundInDb +=1
    }


    const prepDeflectionEmail = () => {
        var userInfo = context.session.BotUserSession?.UserInfo;
var deflectionURL = context.getShortUrl.response?.body?.body?.url;
var body = "Dear Shopper,\nThanks for your inquiry! Here's a personalized list of the items you asked about: " + deflectionURL + "\n\n - " + env.displayStoreName

context.smsBody = JSON.stringify({
    "phone" : getANI(),
    "message" : body
});


    }


    const resetUserDetails = () => {
        delete context.entities?.phoneNumber
delete context.entities.cnfToReEnterPhoneNo
    }


    const validateOrderID = () => {
        if(context.getOrdersDetails.response.body.orders.find(order=>order.id % 10000==parseInt(context.entities.ivrOrderId||context.entities.hIvrOrderId))){
    context.isValidOrder=true
    if(context.orderStatus.find(order=>order.id % 10000==parseInt(context.entities.ivrOrderId||context.entities.hIvrOrderId))){
      context.isValidReturnOrder=context.orderStatus.find(order=>order.id % 10000==parseInt(context.entities.ivrOrderId||context.entities.hIvrOrderId))
    }
}

if(context?.isValidReturnOrder?.result.length>2){
    number=[]
    for(i=1;i<=context.isValidReturnOrder.result.length;i++){
        number.push(i.toString())
    }
    
    context.number=convertToEnumObj(number)
    context.number.push({
    "name":"all",
    "val":"all",
    "syn":"all"
})
}
    }


    const prepEnumsToDisplayCart = () => {
        // Extract the cart line items from the getCartItems response body.
info = context.getCartItems.response.body.data.cart.lines.edges
context.cartItemIds = []
// Go through over each item in the info array.
for(let i=0;i<info.length;i++){
    // Push a new object into the cartItemIds array with name, val, and syn properties.
    context.cartItemIds.push({
    name: info[i]?.node.id,
    val: info[i]?.node?.id,
    syn: [ "\""+info[i]?.node?.id+"\"" ]
}) 
}
   context.cartItemIds.push({
    name: 'Save',
    val: 'Save',
    syn: [ "\"Save\"" ]
},{
    name: 'Check out',
    val: 'Check out',
    syn: [ "\"Check out\"" ]
})

    }


    const Script0021 = () => {
        var bus = context.session.BotUserSession;
bus.lastMessage.messagePayload.message.body  = context.userInput
bus.lastMessage.messagePayload.message.text  = context.userInput
context.session.BotUserSession = bus
// bus.lastMessage.messagePayload.entry[0].messaging[0].message.text  = context.userInput
koreDebugger.log("UserInput "+context.session.BotUserSession.lastMessage.messagePayload.message.body)

//Present Date --==
context.date = new Date()
    }


    const isValidOtpForPayment = () => {
        if(context.entities.otpForPayment == context.OTP){
    context.isValidOTP=true
}
context.noOfOTPAttempts = (context?.noOfOTPAttempts || 0) + 1;
delete context.entities.otpForPayment
koreDebugger.log(context.getCartItems+" "+typeof context.getCartItems)
    }


    const prepEnums = () => {
        // Extract the first 10 orders from the response body and assign them to orderDetails.
var orderDetails = context.getOrdersDetails?.response?.body?.orders.slice(0, 10)
items = []
genAiPrompt = []
for (i = 0; i < orderDetails.length; i++){
    // Go through each line item in the current order.
    for(j=0;j<orderDetails[i]?.line_items.length ; j++){
        items.push(orderDetails[i]?.line_items[j]?.id+'&'+orderDetails[i]?.id)
        genAiPrompt.push({
            "orderId" : orderDetails[i].id,
            "itemName" : orderDetails[i]?.line_items[j].name,
            "lineItemId" : orderDetails[i]?.line_items[j].id,
            "date": orderDetails[i].created_at.split('T')[0]
        })
    }
}
//Enumerating the data for extracting entities like item id's and product title.
context.itemsId = convertToEnumObj(items)
context.productTitle = convertToEnumObj(orderDetails?.flatMap(order => order.line_items.map(item => item.name)));
context.data = genAiPrompt

context.isDigitalGenAIEnabled = env.isDigitalGenAIEnabled

//Present Date --==
context.date = new Date()

    }


    const chkOrderIdFromPartialId = () => {
        resp = context.getOrdersDetails?.response.body.orders
context.orderID = context.entities?.hIvrOrderId || context.entities?.orderIdIvr
if(context.orderID){
    for(i=0;i<resp.length;i++){
      orderId = resp[i].id.toString()
      lastFourOrderId = orderId.slice(-4)
      if(context.orderID == lastFourOrderId){
          context.orderDetails = resp[i]
      }
    }
}

var arr = []
for(i=0;i<resp.length ; i++){
    for(j=0;j<resp[i].line_items.length ; j++){
        let orderDate = resp[i]?.created_at.split("T")[0]
        arr.push({
            "orderDate": orderDate , 
            "productTitle": resp[i]?.line_items[j]?.name,
            "orderId" : resp[i]?.id,
            "LineItemID" : resp[i]?.line_items[j]?.id
        })
    }
}
context.session.BotUserSession['data'] = arr
    }


    const Script0019 = () => {
        var orderData = context.getOrdersDetails.response?.body?.orders
arr = []
for(i=0;i<orderData.length;i++){
    arr.push(orderData[i].id)
}

context.orderIdsPayload=JSON.stringify({
    "orderIds": arr
})
    }


    const Script0004 = () => {
        orders=context.getOrdersDetails.response.body.orders.slice(0,10)
context.orderIds=orders.map(obj => obj.id)
if(orders.find(order=>order.id== context.entities.hIvrOrderId)){
    context.orderIds=[orders.find(order=>order.id== context.entities.hIvrOrderId).id]
}
context.orderIdsPayload=JSON.stringify({
    "orderIds": context.orderIds
})
    }


    const prepEditPayload = () => {
        var id = context.calculatedOrders.response.body?.data?.orderEditBegin?.calculatedOrder?.id
var bus  = context.session.BotUserSession
var calculatedId = id.split('/').pop()
var lineItemPayload = []
// Loop through each displayLineItem in the context entities, if they exist
for (i = 0; i < context?.entities?.displayLineItems.length; i++){
    // Push a new object for each line item with its ID and a quantity of 0 into the lineItemPayload array
    lineItemPayload.push({
        "id": "gid://shopify/CalculatedLineItem/"+context.entities.displayLineItems[i],
        "quantity": 0
    })
} 
// Attempt to retrieve the cancel reason from the last message payload, handling missing properties with optional chaining and logical OR
var cancelReason = bus?.lastMessage?.messagePayload?.message?.body || bus?.lastMessage?.messagePayload?.message?.text || bus?.lastMessage?.messagePayload?.message?.renderMsg  //Incase User didn't choose from list of enumerated
// var cancelReason = context.entities.cancelReason
// if(context.entities.otherReason){
//     cancelReason = context.entities.otherReason
// }
koreDebugger.log(cancelReason)
context.editOrder = JSON.stringify({
    "calculatedOrderId" : calculatedId,
    "lineItems":lineItemPayload,
    "cancelreason" : cancelReason
})

    }


    const Script0020 = () => {
        context.orderStatus=context.getAllOrdersTrackingInfo?.response?.body || []
// context.orderStatus=[]
// for(i=0;i<orderStatus.length;i++){
//     var order=orderStatus[i]
//     order["id"]=context.orderIds[i]
//     context.orderStatus.push(order)
// }


// context.orderStatus = context.orderStatus.map(item => {
//         const { statusCode, index, id } = item;
//         const resultObj = item.result;
//         const resultArray = Object.keys(resultObj).map(key => {
//             return {
//                 id: key,
//                 status: resultObj[key]
//             };
//         });
//         return {
//             statusCode: statusCode,
//             result: resultArray,
//             index: index,
//             id: id
//         };
//     });

for(i=0;i<context.orderStatus.length;i++){
    parsedJSON=context.orderStatus[i].result
var transformedArray = [];
  for (let key in parsedJSON) {
    if (parsedJSON.hasOwnProperty(key)) {
      var newObj = {
        id: key,
        ...parsedJSON[key]
      };
      transformedArray.push(newObj);
    }
  }
  context.orderStatus[i].result=transformedArray
}
    orders=context?.getOrdersDetails.response.body.orders||context?.getSpecificOrder.response.body
for(i=0;i<context.orderStatus.length;i++){
    // order=orders.find(order=>order.id==context.orderStatus[i].id)
    // koreDebugger.log(JSON.stringify(order))
    // koreDebugger.log(context.orderStatus[i].id)
    items=orders[i].line_items
    context.orderStatus[i].created_at=orders[i].created_at
    for(j=0;j<context.orderStatus[i].result.length;j++){
        item=items.find(item=>item.id==context.orderStatus[i].result[j].id)
        context.orderStatus[i].result[j].name=item.name
        
    }
}
context.orderStatus = context.orderStatus.filter(order => order.statusCode === 200);
 context.orderStatus = context.orderStatus.filter(order => {
    order.result = order.result.filter(item => ["Cancelled", "Return Rejected", "Return In Progress", "Return Requested", "Returned", "Return Declined"].includes(item.status));
    return order.result.length > 0;
});

koreDebugger.log(context.orderStatus)


genAiPrompt = []
for (i = 0; i < context.orderStatus.length; i++){
    // Go through each line item in the current order.
    for(j=0;j<context.orderStatus[i]?.result.length ; j++){
        items.push(context.orderStatus[i]?.result[j]?.id)
        
        genAiPrompt.push({
            "orderId" : orders[i].id,
            "itemName" : context.orderStatus[i]?.result[j].name,
            "lineItemId" : context.orderStatus[i]?.result[j].id,
            "date": context.orderStatus[i].created_at.split('T')[0]
        })
    }
}
//Enumerating the data for extracting entities like item id's and product title.
context.itemsId = convertToEnumObj(items)
context.productTitle = convertToEnumObj(context.orderStatus?.flatMap(order => order.result.map(item => item.name)));
context.session.BotUserSession['data'] = genAiPrompt

context.isGenAIEnabled = env.isGenAIEnabled

//Present Date --==
context.date = new Date()
    }


    const Script0016 = () => {
        var trackingStatus = context.getOrderTrackingInfo.response.body
if(!context.orderDetails){
    context.orderDetails = context.getOrdersDetails.response.body.orders[0]  // specifically when it has only one order Id
}
if(context.entities.productTitleName == "all"){
    context.orderStatusMsg = "Your order has "+context.orderDetails.line_items.length+" items "
    for(i=0;i<context.orderDetails.line_items.length ; i++){
        context.orderStatusMsg+=context.orderDetails.line_items[i].name+" Placed on "+context.orderDetails.created_at.split("T")[0]+" "+trackingStatus[context.orderDetails.line_items[i].id].status+"\n"
    }
}
else{
    context.orderStatusMsg = " "
    for(i=0;i<context.orderDetails.line_items.length ; i++){
        if(context.orderDetails.line_items[i].name == context.entities.productTitleName){
            context.orderStatusMsg+=context.orderDetails.line_items[i].name+" Placed on "+context.orderDetails.created_at.split("T")[0]+" "+trackingStatus[context.orderDetails.line_items[i].id].status+"\n"
        }
    }
}


    }


    const parseOrderDeatils = () => {
        if(context.entities.hIvrOrderId){
    order=context.getCancelableItems.response.body.eligibleOrders.find(order=>order.id % 10000==context.entities.hIvrOrderId)
}
if(context.getCancelableItems.response.body.eligibleOrders.length==1){
    order=context.getCancelableItems.response.body.eligibleOrders[0]
}
if(order.line_items.length==1){
        context.singleOrderItem=order
        context.orderIdToCancel=order.id
}else{
    context.multiItemOrder=order
}
    }


    const msgScriptForResRephrase = () => {
        var resp = context.getOrdersDetails.response.body.orders[0]
var trackingInfo = context.getOrderTrackingInfo.response.body
if(context.getOrdersDetails.response.body.orders[0].line_items.length==1){
    var productName = resp.line_items[0].name
    var orderDate = resp.created_at.split("T")[0]
   context.cnfNodetext = "I see your order for "+productName+", placed on "+orderDate+". Would you like an update on the status of this particular order"
   context.orderStatusMsgNode = "Your order for "+resp.line_items[0].name+",placed on "+resp.created_at.split("T")[0]+" is  "+trackingInfo[resp.line_items[0].id].status
}

else if(context.getOrdersDetails.response.body.orders[0].line_items.length==2){
    context.cnfNodetext = "I see your order for "+resp.line_items[0].name+" and "+resp.line_items[1].name+", placed on "+resp.created_at.split("T")[0]+". Would you like an update on the status of this particular order?"
    details=""
    for(i=0;i<2 ;i++){
        details += resp.line_items[i].name+",placed on "+resp.created_at.split("T")[0]+" is "+trackingInfo[resp.line_items[i].id].status+" "
    }
    context.orderStatusMsgNode = "Your order has two items "+details
}
else{
    lineItemCnt = context?.orderDetails?.line_items.length || context.getOrdersDetails.response?.body?.orders[0]?.line_items.length
    context.productTitleNameTxt = "Your order includes "+lineItemCnt+" items. Would you like an update on all or a specific one"
}


    }


    const parseDocSearch = () => {
        var resp = context.docSearch.response.body.template.graph_answer.payload;
if (Object.keys(resp).length == 0) {
    context.noGraphAnswer = true;
} else {
    let response = "";
    context.docLinks = {};
    resp = resp["center_panel"].data?.[0]?.["snippet_content"];
    if (Array.isArray(resp)) {
        resp.forEach(i => {
            i.sources.forEach(j => {
                if (j.title != "") {
                    context.docLinks[j.title] = j.url;
                }
            })
        });
        resp = resp?.map(i => i["answer_fragment"]);
        resp.forEach(i => {
            response += i
        });
        context.response = response;
    } else {
        context.response = resp;
    }
}
    }


    const setDocIdOnBus = () => {
        let docId = context.ingestRespIntoCacheApp.response.body[0]?.["_source"]?.doc_id || undefined;

context.session.BotUserSession.IsPrevAnsFromCache = false;
context.session.BotUserSession.DocId = docId;

    }


    const parseMainAppResponse = () => {
        var resp = context.mainAppSearch.response.body.template.graph_answer.payload;
var bus = context.session.BotUserSession;
if(Object.keys(resp).length == 0){
    context.noGraphAnswer = true;
}else{
    let response="";
    let docLinks = {};
    resp = resp["center_panel"].data?.[0]?.["snippet_content"];
    resp.forEach(i=>{
        i.sources.forEach(j=>{
            if(j.title != ""){
                docLinks[j.title] = j.url;
            }
        })
    });
    
    context.docLinks = docLinks;
    resp = resp?.map(i=>i["answer_fragment"]);
    resp.forEach(i=>{
        response += i
    });
    context.response = response;
    if(context.session.BotUserSession.DocSearchSettings.isCacheEnabled == true){
    context.session.BotUserSession.CacheObject = JSON.stringify({
    "name": "Cache",
    "documents": [{
        "response": context.response?.replaceAll('"',"") || undefined,
        "query": bus.UserQuery,
        "references" : context.docLinks
        }]
    })
    }
}
    }


    const parseOrderDetails = () => {
        // Parse the commercePlatformConfig JSON string from the environment variable and extract the platform name.
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName

// Check if the extracted platform name is Shopify.
if(eCommercePlatform == "Shopify") {
    var ordersData = context.getOrdersDetails?.response?.body?.orders;  // Retrieve all orders for a particular logged-in customer.
    context.isSpecificOrder = false
    var sku = []
    var specificOrder = context.getSpecificOrder?.response?.body
    
    // If a specific order exists and the contact email matches the user's email, set the context accordingly.
    if(specificOrder?.order?.id && specificOrder?.order?.contact_email == context.session.BotUserSession?.UserInfo?.email){  
        // Map the specific order to the user's account based on the order ID provided by the API.
        var ordersData = [specificOrder?.order]
        context.orderId = specificOrder?.order?.id 
        context.isSpecificOrder = true
        context.orderDetails = specificOrder?.order
    }
    for(i=0;i<ordersData.length ; i++){
        for(j=0 ; j<ordersData[i].line_items.length ; j++){
            if(!sku.includes(ordersData[i].line_items[j].sku)){
            sku.push(ordersData[i].line_items[j].sku)
            }
        }
    }
    // Construct a JSON payload with the collected SKUs for extracting images.
    context.skuQuery = JSON.stringify({     
        "skus":sku
    })
    
    koreDebugger.log(sku)
    
    context.showMoreClickCount =0
} else if(eCommercePlatform == "SFCC") {     // Check if the platform is Salesforce Commerce Cloud (SFCC).   
    var ordersData = context.getOrdersDetails?.response?.body?.orders;
    context.isSpecificOrder = false
    var sku = []
    var specificOrder = context.getSpecificOrder?.response?.body;
    if(specificOrder?.id){
        var ordersData = [specificOrder]
        context.orderId = specificOrder?.id 
        context.isSpecificOrder = true
        context.orderDetails = specificOrder
    }
    for(i=0;i<ordersData.length ; i++){
        for(j=0 ; j<ordersData[i].line_items.length ; j++){
            if(!sku.includes(ordersData[i].line_items[j].id)){
            sku.push(ordersData[i].line_items[j].id)
            }
        }
    }
    koreDebugger.log(sku)
    // Construct the SFCC request URL using the collected SKUs and environment variables.
    context.skuQuery = JSON.stringify({
        "getProductsUrl": "https://"+env.shortCode+".api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/"+env.organizationId+"/products?siteId="+env.siteId+"&ids="+sku.join(','),
        auth:"Bearer "+context.session.BotUserSession.SfccAccessToken.accessToken
    })
    
    context.showMoreClickCount =0
}
    }


    const prepEmailBodyPayload = () => {
        var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName;

//if(eCommercePlatform == "Shopify") {
koreDebugger.log("Parent Intent is " + context.parentIntent)
if(context.parentIntent === "Search and Order a Product") {
    var BUS=context.session.BotUserSession
    var firstName=BUS.UserInfo.first_name
    var lastName=BUS.UserInfo.last_name
    var orderDate=getFormattedDate(new Date())
    //retrieve shipping address details, defaulting to an empty string if not available.
    var address1=context.shippingAddress?.address1||""
    // var address2=context.shippingAddress?.address2||""
    var city=context.shippingAddress?.city||""
    var country=context.shippingAddress?.country||""
    var zip=context.shippingAddress?.zip||""
    // Construct the billing address by concatenating address components.
    billingAddress=address1+", "+city+", "+country+", "+zip+"."
    var shippingAddress=billingAddress
    var orderNumber=context.createAnOrder.response.body?.order?.id||""
    var itemsHTML=""   
    var items=context.createAnOrder.response.body.order.line_items
    // Set a default image URL for items.
    var itemImageUrl="https://ci6.googleusercontent.com/proxy/lOYRwSWZnm41Uo-K7H8_liFaWkBP1aT9xG367iZ4i64eDKjlysJNIWXvvv1UNBjIhCOnG2A4-_I40cU0GjYe8J1iGlPkQh97=s0-d-e1-ft#https://cdn-icons-png.flaticon.com/512/825/825500.png"
    var totalItemPrice = getFormattedCurrency(context.createAnOrder.response.body?.order?.total_line_items_price)
    let totalPrice=getFormattedCurrency(context.createAnOrder.response.body?.order?.current_total_price);
    let tablesHTML = [];
    let tax = getFormattedCurrency(context.createAnOrder.response.body?.order?.current_total_tax);
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        let price = getFormattedCurrency(item.price);
        // Retrieve the image URL for the item, defaulting to a placeholder if not available.
        let imageUrl = context.imageSkuMap[item.sku]?.imageUrl || context.imageSkuMap[item.sku] || itemImageUrl;
        // Construct the HTML table for the current item.
        const table = `
            <table key=${index}>
                <tr>
                    <td><img src=${imageUrl} width="80px" height="80px" alt="image"></td>
                    <td>
                        <p>Title:<strong>${item.title}</strong></p>
                        <p>Quantity: <strong>${item.quantity}</strong></p>
                        <p>Price: <strong>${price}</strong></p>
                    </td>
                </tr>
            </table>
        `;
        
        tablesHTML.push(table);
    }
    let storeName = env.displayStoreName;
    // Construct the email body content with personalized greeting, order information, and summary.
    let content = "<?xml version='1.0' encoding='utf-8'?><head><style>.email-body {color: black;}.header {margin: 15px 0px 0 0;}.flex-container {display: flex;align-items: center;}.flex-container img {margin-right: 10px;}</style></head><body><div class=\"email-body\" style=\"font-family: Arial, sans-serif;\"><div class=\"header\" style=\"color: black;\"><p>Dear "+firstName+" "+lastName+",</p><p>We are excited to confirm your recent order with "+storeName+". Thank you for choosing us for your service needs. Below, you'll find all the details of your order.</p><p class=\"order-info-header\" style=\"font-weight: bold;\">Order Information:</p></div><div class=\"header\"><ul style=\"margin: 0; padding: 0;\"><li>Order Number: "+orderNumber+"</li><li>Order Date: <b>"+orderDate+"</b></li><li>Billing Address: "+billingAddress+"</li><li>Shipping Address: "+shippingAddress+"</li></ul></div><div class=\"header\" style=\"font-weight: bold;\">Order Items:</div><div>"
    +tablesHTML+"</div><div class=\"header\"><b>Order Summary</b><p><ul><li>Items Total Price :<b>"+totalItemPrice+"</b></li><li>Tax : <b>"+tax+"</b></li><li>Order Total:<b>"+totalPrice+"</b></li></ul></p><p><b>Order Status:</b> <b style='color:green'>Placed</b></p><p>Please keep this email for your records. If you have any questions or concerns about your order, please don't hesitate to contact our customer support team. Please reference your order number for faster assistance.</p><p>Thank you for choosing "+storeName+". We appreciate your business and look forward to serving you again in the future.</p><p>Sincerely,<br><b>"+storeName+"</b></p></div></div></body>";
    
    // Assign the email content to the context along with recipient and subject details.
    context.emailBody=JSON.stringify({
        "content":content,
        "to": BUS.UserInfo.email,
        "subject": "Order Confirmation -"+orderNumber
    })
    delete BUS.ProductDetails;
} 

if(context.parentIntent === "Cancel Order") {
    var bus = context.session.BotUserSession?.UserInfo
    var order = context.eligibleOrders
    // var bus=context.session.BotUserSession
    var items = []
    if(context.entities.displayLineItems){
        for (i = 0; i < context.eligibleLineItems.length; i++){
            // If the current eligible item's ID is included in the displayLineItems, add it to the 'items' array
            if(context.entities.displayLineItems.includes(context.eligibleLineItems[i].id)){
                 items.push(context.eligibleLineItems[i])
            }
        }
    }
    // If all items are marked as cancelled (isAllCancelled flag is true), assign all eligible line items to 'items'
    else if(context.isAllCancelled){
        items = context.eligibleLineItems
    }
    else{
        items = context.eligibleLineItems
    }
    var tablesHTML = [];
    var refundAmout = 0
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        let price = getFormattedCurrency(item.price)
            // Construct an HTML table for the current item with image, name, quantity, and price
        const table = `
            <table key=${index}>
                <tr>
                    <td><img src=${item.imageUrl} width="80px" height="80px" alt="image"></td>
                    <td>
                        <p>Name:<strong>${item.name}</strong></p>
                        <p>Quantity: <strong>${item.fulfillable_quantity}</strong></p>
                        <p>Price: <strong>${price}</strong></p>
                    </td>
                </tr>
            </table>
        `;
        
        tablesHTML.push(table);
        refundAmout += parseFloat(item.price)
    }
    refundAmout = getFormattedCurrency(refundAmout)
    // Prepare the email body content as a JSON string and store it in the context under 'emailBody'
    context.emailBody = JSON.stringify({
        "content":"<?xml version='1.0' encoding='utf-8'><head><meta charset=\"UTF-8\"></head><body><p>Dear "+bus?.first_name+",</p><p>We hope this message finds you well. We want to inform you that your recent order with <strong>Kore</strong> has been successfully canceled. Below, you will find details regarding the canceled order:</p><h3>Order Details:</h3><ul><li>Order Number: <strong>"+context.entities.showOrders+"</strong></li><li>Order Date: <strong>"+order.created_at.split('T')[0]+"</strong></li><li>Canceled Date: <strong>"+presentDate()+"</strong></li><li>Total Amount: <strong>"+getFormattedCurrency(order.current_subtotal_price)+"</strong></li></ul><h4>Cancelled Items:</h4>"+tablesHTML+"<h4>Refund Information:</h4><ul><li>Refund Amount: <strong>"+refundAmout+"</strong></li><li>Refund Method: <strong>Internet Banking</strong></li><li>Expected Refund Date: <strong>"+presentDate()+"</strong></li></ul><p>Your refund, if applicable, will be processed in accordance with our refund policy. Please allow a few business days for the refund to appear in your account.</p><p>If you have any questions or concerns regarding the cancellation or refund process, please do not hesitate to contact our customer support team at <a href='mail'>demo@kore.com</a> or <strong>99999999999</strong>. We are here to assist you with any inquiries you may have.</p><p>We appreciate your business and hope to have the opportunity to serve you again in the future. Thank you for choosing <strong>"+env.displayStoreName+"</strong>.</p><p>Best Regards,<br>"+env.displayStoreName+"<br>demo@kore.com</p></body></html>",
        "to": bus?.email,
        "subject": "Order Cancellation Confirmation"
    })
}

if(context.parentIntent === "IVR Cancel Order") {
    var bus = context.session.BotUserSession?.UserInfo
    var order = context.getCancelableItems.response.body.eligibleOrders
    // var bus=context.session.BotUserSession
    var items = []
    if(context.orderIdToCancel){
        order=order.find(order=>order.id==parseInt(context.orderIdToCancel))
        eligibleLineItems=order.line_items
        for(i=0;i<eligibleLineItems.length ; i++){
                 items.push(eligibleLineItems[i])
        }
        
    }
    else
    { 
    if(context.line_itemIdToCancel){
        order=order.find(order=>order.line_items.find(item=>item.id==parseInt(context.line_itemIdToCancel)))
        eligibleLineItems=order.line_items.find(item=>item.id==parseInt(context.line_itemIdToCancel))
        items.push(eligibleLineItems)
    }
    }
    var tablesHTML = [];
    var refundAmout = 0
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        let price= getFormattedCurrency(item.price)
        const table = `
            <table key=${index}>
                <tr>
                    <td><img src=${item.imageUrl} width="80px" height="80px" alt="image"></td>
                    <td>
                        <p>Name:<strong>${item.name}</strong></p>
                        <p>Quantity: <strong>${item.fulfillable_quantity}</strong></p>
                        <p>Price: <strong>${price}</strong></p>
                    </td>
                </tr>
            </table>
        `;
        
        tablesHTML.push(table);
        refundAmout += parseFloat(item.price)
    }
    refundAmout = getFormattedCurrency(refundAmout)
    context.emailBody = JSON.stringify({
        "content":"<?xml version='1.0' encoding='utf-8'><head><meta charset=\"UTF-8\"></head><body><p>Dear "+bus?.first_name+",</p><p>We hope this message finds you well. We want to inform you that your recent order with <strong>Kore</strong> has been successfully canceled. Below, you will find details regarding the canceled order:</p><h3>Order Details:</h3><ul><li>Order Number: <strong>"+context.entities.showOrders+"</strong></li><li>Order Date: <strong>"+order.created_at.split('T')[0]+"</strong></li><li>Canceled Date: <strong>"+presentDate()+"</strong></li><li>Total Amount: <strong>"+getFormattedCurrency(order.current_subtotal_price)+"</strong></li></ul><h4>Cancelled Items:</h4>"+tablesHTML+"<h4>Refund Information:</h4><ul><li>Refund Amount: <strong>"+refundAmout+"</strong></li><li>Refund Method: <strong>Internet Banking</strong></li><li>Expected Refund Date: <strong>"+presentDate()+"</strong></li></ul><p>Your refund, if applicable, will be processed in accordance with our refund policy. Please allow a few business days for the refund to appear in your account.</p><p>If you have any questions or concerns regarding the cancellation or refund process, please do not hesitate to contact our customer support team at <a href='mail'>demo@kore.com</a> or <strong>99999999999</strong>. We are here to assist you with any inquiries you may have.</p><p>We appreciate your business and hope to have the opportunity to serve you again in the future. Thank you for choosing <strong>"+env.displayStoreName+"</strong>.</p><p>Best Regards,<br>"+env.displayStoreName+"<br>demo@kore.com</p></body></html>",
        "to": bus?.email,
        "subject": "Order Cancellation Confirmation"
    })    
    
}
    }


    const isValidIVROrder = () => {
        orderId=context.entities.hIvrOrderId||context.entities.ivrOrderId
const regex = /^\d{4}$/
koreDebugger.log(orderId.length)
if(orderId.toString().length==4){
    context.isValidOrder=true
}else{
    delete context.entities.hIvrOrderId
    delete context.entities.ivrOrderId
    delete context.isValidOrder
}
context.noOfattempts=(context.noOfattempts||0)+1
    }


    const sfccRemoveCartPayload = () => {
        if(context.cartDetails){
    ids=[]
var cartDetails=context.cartDetails.selectedItems
    for(i=0;i<cartDetails.length;i++){
        ids.push(cartDetails[i]?.id)
    }
    context.removeCartItemsPayload=JSON.stringify({
        "cartId": context.cartDetails.cartId,
        "lineIds": ids
    })
}

var orderDetails = context.sfccCreateAnOrder.response.body.productItems
sku = []
for(i=0;i<orderDetails.length ; i++){
    sku.push(orderDetails[i].productId)
    
}

context.skuQuery =JSON.stringify({
    "skus":sku
})

koreDebugger.log(context.sku)
    }


    const deleteOrders = () => {
        delete context.entities.recentOrders
    }


    const prepLoginOTPPayload = () => {
        let firstName = context.validatePhoneNo.response.body?.customers[0]?.first_name;
context.OTP = (Math.random() * 9000 + 1000) | 0;
    payload = {
      "phone": context.entities.phoneNumber,
      "message":  `Hi ${firstName}, your one-time code for secure login is ${context.OTP}. Please use this code within the next 5 minutes. Keep it confidential and do not share it with anyone.
- ${env.displayStoreName}`
    };
    context.smsBody = JSON.stringify(payload);

    }


    const routeToSpecificAction = () => {
        context.action=context.entities.showProfileInfo

    }


    const nextSequence = () => {
        context.action=context.entities?.hUpdateProfileOrAddress[0]
if(env.commercePlatformConfig.platformName=="SFCC"&&context.entities.action!="Name"){
    context.eod=true
}
    }


    const prepSmsAndEmailPayload = () => {
        context.OTP = (Math.random() * 9000 + 1000) | 0;
var customerData = context.validatePhoneNo.response.body.customers[0]
context.smsBody = JSON.stringify({
    "phone" : context.phoneNumber,
    "message" : "Hi! Your one-time code for verification is: "+context.OTP+"\n-"+env.shopifyStoreName
})

context.emailBody = JSON.stringify({
    "content":"<?xml version='1.0' encoding='utf-8'><head><meta charset=\"UTF-8\"><body>Dear Customer,<p>Your one-time code for verification is:<b>"+context.OTP+"</b>, Please use this code to complete your login.</p><p>Thank you,<br><b>"+env.shopifyStoreName+"</b></p></body></html>",
    "to": customerData.email,
    "subject": "Shopify - One time code for verification"
})

    }


    const chkValidPhoneNumber = () => {
        context.phoneNumber = validatePhone(context.entities.registerMobileNum)
if(context.phoneNumber.length < 10 || context.phoneNumber.length>13){
   context.isValidPhoneNumber+=1
    delete context.entities.registerMobileNum
}

else if(context.isValidPhoneNumber > 1){
    context.isAgentReq = true
}
else{
    context.isValidPhoneNumber = true
}
koreDebugger.log("Phone Number entered is " + context.phoneNumber)
    }


    const prepUpdatePayload = () => {
        bus=context.session.BotUserSession.UserInfo
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName

if (eCommercePlatform == "Shopify") {
if(context?.action=="Email"||context.entities.showProfileInfo=="Email"){
  context.updateProfilePayload=JSON.stringify({
    "customer": {
        "id": bus.id,
        "email": context.forms.UpdateEmail.email
    }
})
}  
else{
context.updateProfilePayload=JSON.stringify({
    "customer": {
        "id": bus.id,
        "phone": context.forms.UpdatePhoneNo.phone
    }
})
}
}
    }


    const orderAckStatusMsg = () => {
        var trackingInfo = context.getOrderTrackingInfo.response.body
context.orderStatusAckNodeTxt = context.orderDetails[0].name+", placed on "+context.orderDetails[0].orderDate.split("T")[0]+"is "+trackingInfo[context.orderDetails[0].id].status

    }


    const resetDisplayedAddress = () => {
        delete context.entities.displayAddress
context.displayCount=context.displayCount+3
    }


    const isPaymentSuccessful = () => {
        context.isPaymentSuccessful=true
    }


    const orderAckStatusMsgIVR = () => {
        // genAIresponse = context.AI_Assisted_Dialogs.genainodereturnandrefundstatus ? context.AI_Assisted_Dialogs.genainodereturnandrefundstatus.entities : [];

// print(JSON.stringify(genAIresponse));
// var trackingInfo = context.getAllOrdersTrackingInfo?.response?.body
// context.orderStatusAckMsgIVR = "The order name" +genAIresponse[0].Product_Title+", placed on "+genAIresponse[0].Date+"is "+trackingInfo[context.lineItemId].status
var status = ""
var name = ""
var txt = ""
let data = context.session.BotUserSession.data
let genAiRes = context.AI_Assisted_Dialogs.genainodereturnandrefundstatus ? context.AI_Assisted_Dialogs.genainodereturnandrefundstatus.entities : [];
let genAiRespId = genAiRes[0]?.LineItemID[0] //13809333797090
for(i=0 ; i<data.length ; i++){
    if(data[i].lineItemId  == genAiRespId){
        name = data[i].itemName;
        status = data[i].status
    }
}


if (status == "Returned" || status == "Cancelled") {
		txt = txt + "The refund status of the product " + name + " has already been processed to your account ending with 5 6 7 9\n";
	} else if (status == "Return Inprogress" || status == "Return Requested") {
		txt = txt + "The refund status of the product " + name + "  has not reached us. Your refund will be processed once we receive the item.\n";
	} else if (status == "Return Declined") {
		var mentionReason = ""
		switch (order.result[i]?.returnRejectedReason) {
			case "RETURN_PERIOD_ENDED":
				var mentionReason = "you'r return period has ended"
				break;
			case "FINAL_SALE":
				var mentionReason = "you have returned final sale item"
				break;
			default:
				var mentionReason = order.result[i].returnRejectedReason
		}

		txt = txt + "The refund status of the product " + name + "  is that we have received your item. However, I want to inform you that upon inspection, we noticed that the " + mentionReason + " Hence, we are unable to issue a refund for it.\n";
	} else {
		txt = txt + "You can expect to receive your refund for product " + name + " within 2-3 business days. If you haven't received it by then, feel free to reach out to us."
	}
	
	
    }


    const returnEligibleItems = () => {
        orderStatus=context.getOrderStatus.response.body
context.displayItems = [];
if (Object.keys(orderStatus).filter(key => ["Delivered"].includes(orderStatus[key].status)).length > 0) {
  context.displayItems = Object.keys(orderStatus).filter(key => ["Delivered"].includes(orderStatus[key].status));
}
context.itemIds=convertToEnumObj(context.displayItems)

koreDebugger.log(context.displayItems)
context.skuImages={}
imageInfo=context.getProductId.response?.body?.data?.products?.edges
skus=JSON.parse(context.skuQuery)
skus=skus.skus
for(i=0;i<imageInfo.length;i++){
    context.skuImages[skus[i]]=imageInfo[i]?.node?.images?.edges[0]?.node?.src
}


    }


    const Script0017 = () => {
        var trackingInfo = context.getOrderTrackingInfo.response.body
var val = parseInt(context.entities.multipleLineItems)
context.orderStatusMsg = context.entities.titleName[val-1] +" Placed on "+context.orderDetails[val-1].orderDate+" "+trackingInfo[context.orderDetails[val-1].id].status


    }


    const extactStoreFrontToken = () => {
        bus = context.session?.BotUserSession
bus.ShopifyAdmin["storeFrontUrl"] = "https://"+bus.ShopifyAdmin["storeUrl"]+"/api/2023-10/"
bus.ShopifyAdmin["storeAdminUrl"] = "https://"+bus.ShopifyAdmin["storeUrl"]+"/admin/api/2023-10/";



koreDebugger.log("SHopify Admin Token captured for Facebook Channel");
    }


    const sfccCstrtQueryForProductId = () => {
        var sku = context.entities.sfccSearchResults.indexOf(" ") != -1 ? context.entities.sfccSearchResults.split(" ")[0] : context.entities.sfccSearchResults.split("#")[0];

context.skuQuery = JSON.stringify({
    "skus": [sku]
})

context.getProductIdPayload={
    "searchProductUrl":"https://"+env.shortCode+".api.commercecloud.salesforce.com/search/shopper-search/v1/organizations/"+env.organizationId+"/product-search?siteId="+env.siteId+"&q="+sku,
    "auth":"Bearer "+context.session.BotUserSession?.SfccAccessToken?.accessToken
}
    }


    const delUserInfoFromBUS = () => {
        context.session.BotUserSession.UserInfo = undefined;
    }


    const prepOrderStatusScript = () => {
        context.orderStatusId=context.entities.hOrderId||context.entities.displayReturnAndCancelOrders
    }


    const defaultAddressPayload = () => {
        var BUS=context.session.BotUserSession
var addressId=context.entities?.displayAddress||context.entities.showAllDeliveryAddresses
context.updateAddressPayload=JSON.stringify({
    "address": {
        "default":true
    },
    "customerId": BUS.UserInfo.id,
    "addressId": addressId
})

koreDebugger.log(addressId)

koreDebugger.log(context.updateAddressPayload)
    }


    const prepUpdateCartItems = () => {
        var bus=context.session.BotUserSession
var lastMsg=JSON.parse(bus?.lastMessage?.messagePayload?.message?.text||bus?.lastMessage?.messagePayload?.message?.body).selectedItems
var info=context.getCartItems.response.body.data.cart.lines.edges
context.updateCartPayload={
    "cartId": context.getCartId.response.body.metafields[0].value,
    "lines": []
}
for(let i=0;i<info.length;i++){
    koreDebugger.log(lastMsg.find(item => item.id.includes(info[i]?.node?.id)))
    if(lastMsg.find(item => item.id.includes(info[i]?.node?.id))){
        cartDetails=lastMsg.find(item => item.id==info[i]?.node?.id)
    context.updateCartPayload.lines.push({
        "id": cartDetails.id,
        "quantity": cartDetails.quantity,
        "attributes":[{
            "key": "SKU",
            "value": info[i].node.attributes[0].value
        }]
    })
    }
}
context.updateCartPayload=JSON.stringify(context.updateCartPayload)
koreDebugger.log(context.updateCartPayload)
    }


    const chkSpecificOrderExist = () => {
        var orderDetails = context.getSpecificOrder?.response?.body?.order
bus = context.session.BotUserSession
context.hasSpecificOrder = false
if(orderDetails?.contact_email == bus?.UserInfo?.email){
    context.hasSpecificOrder = true
}


    }


    const checkEligibleOrders = () => {
        // Assigning the response body of getOrderStatus to orderStatus variable
orderStatus = context.getOrderStatus.response.body
context.displayItems = [];
// Check if there are any keys in the orderStatus object with statuses that indicate a return or cancellation.
if (Object.keys(orderStatus).filter(key => ["Cancelled", "Return Requested", "Return Inprogress", "Return Rejected", "Return Declined", "Returned"].includes(orderStatus[key].status)).length > 0) {
    // If such statuses exist, filter and assign those keys to context.displayItems.
  context.displayItems = Object.keys(orderStatus).filter(key => ["Cancelled", "Return Requested", "Return Inprogress", "Return Rejected", "Return Declined", "Returned"].includes(orderStatus[key].status));
}
koreDebugger.log(Object.keys(orderStatus).filter(key => ["Cancelled", "Return Requested", "Return Inprogress", "Return Rejected", "Return Declined", "Returned"].includes(orderStatus[key].status)))
// Find the specific order from getOrdersDetails or getSpecificOrder using the displayReturnAndCancelOrders entity,and store it in the info variable.
var info=context.getOrdersDetails.response.body.orders.find(order=>order.id==context.entities.displayReturnAndCancelOrders)||context.getSpecificOrder.response.body.order
skus = []
// Go through each line item in the order and push its SKU to the skus array.
for(i=0;i<info.line_items.length;i++){
    skus.push(info.line_items[i].sku)
}
koreDebugger.log(skus)
context.skuQuery=JSON.stringify({
    "skus":skus
})
context.refundItemIds=[]
context.refundItemIds.push(convertToEnumObj(context.displayItems))
context.refundItemIds=context.refundItemIds.flatMap(innerArray => innerArray)

    }


    const prepCalculatedOrderId = () => {
        order=context.getCancelableItems.response.body.eligibleOrders
orderId=context?.orderIdToCancel||order.find(order=>order.line_items.find(item=>item.id==parseInt(context?.line_itemIdToCancel))).id.toString()
context.caluculatedOrder  =JSON.stringify({
    "orderId" : orderId
})
koreDebugger.log(context?.caluculatedOrder)
    }


    const prepOrderEnums = () => {
        var orderDetails = context.getCancelableItems?.response?.body?.eligibleOrders;

var arr = [];
for (var i = 0; i < orderDetails.length; i++) {
    for (var j = 0; j < orderDetails[i].line_items.length; j++) {
        arr.push({
            "orderId": orderDetails[i].id,
            "lineItemId": orderDetails[i].line_items[j].id,
            "name": orderDetails[i].line_items[j].name,
            "date": orderDetails[i].created_at.split('T')[0] 
        });
    }
}

// Assigning the constructed array to `context.data`
context.data = arr;

context.orders = convertToEnumObj(orderDetails.map(item => item.id));
context.productTitle = strictEnumObj(orderDetails.flatMap(order => order.line_items.map(item => item.name)));

// context.orders.push({
//     name: 'Show More',
//     val: 'Show More',
//     syn: [ 'Show More' ]
// });

context.isDigitalGenAIEnabled = env.isDigitalGenAIEnabled;

//Present Date --==
context.date = new Date()






// var orderDetails =  context.getCancelableItems?.response?.body?.eligibleOrders
// context.orders = convertToEnumObj(orderDetails.map(item=>item.id))
// context.productTitle = strictEnumObj(orderDetails.flatMap(order => order.line_items.map(item => item.name)));

// context.orders.push({
//     name: 'Show More',
//     val: 'Show More',
//     syn: [ 'Show More' ]
// })
    }


    const deleteAndPrefillZip = () => {
        context.prefillForms = {
    "AddressDetails": {
        "fields": {
            "addressLine1": context?.forms.AddressDetails.addressLine1,
            "city": context?.forms.AddressDetails.city,
            "state":context?.forms.AddressDetails.state,
            "country": context?.forms.AddressDetails.country,
        }
    }
}
context.noOfTries = (context?.noOfTries || 0) + 1;
delete context.forms.AddressDetails
    }


    const ParuchuriArun = () => {
        var BUS=context.session.BotUserSession
var addressId=context.entities.showAllDeliveryAddresses||context.fetchDeliveryAddressDetails?.response?.body?.addresses[0]?.id;
koreDebugger.log("addressId"+addressId)
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
if(eCommercePlatform == "Shopify") {
context.updateAddressPayload=JSON.stringify({
    "address": {
        "country": context?.forms?.AddressDetails?.country,
        "zip": context?.forms?.AddressDetails?.zipcode,
        "city": context?.forms?.AddressDetails?.city,
        "address1": context?.forms?.AddressDetails?.addressLine1,
        "address2": context?.forms?.AddressDetails?.state,
        //"provison": context?.forms?.AddressDetails?.state,
        "first_name": BUS.UserInfo.first_name,
        "last_name": BUS.UserInfo.last_name,
        "phone": BUS.UserInfo.phone,
    },
    "customerId": BUS.UserInfo.id,
    "addressId": addressId
});
}else if(eCommercePlatform == "SFCC"){
    context.updateAddressPayload=JSON.stringify({
        "addressUrl": "https://"+env.shortCode+".api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/"+env.organizationId+"/customers/"+BUS.UserInfo.id+"/addresses/"+addressId+"?siteId="+env.siteId,
        "auth":"Bearer "+BUS.SfccAccessToken?.accessToken,
        "address": {
        "addressId": addressId,
        "address1": context?.forms?.AddressDetails?.addressLine1,
        "city": context?.forms?.AddressDetails?.city,
        "stateCode": context?.forms?.AddressDetails?.state,
        "countryCode": context?.forms?.AddressDetails?.country,
        "postalCode": (context?.forms?.AddressDetails?.zipcode).toString(),
        "lastName":BUS.UserInfo.last_name
        }
    })
}

if(context.entities?.hActionDecider=="Modify Address"){
    delete context.entities.hActionDecider
}
koreDebugger.log(JSON.stringify(context.updateAddressPayload))
    }


    const sfccEmailPayload = () => {
        var BUS=context.session.BotUserSession
var firstName=BUS.UserInfo.first_name
var lastName=BUS.UserInfo.last_name
var orderDate=getFormattedDate(new Date())
var address1=context.shippingAddress?.address1||""
// var address2=context.shippingAddress?.address2||""
var city=context.shippingAddress?.city||""
var country=context.shippingAddress?.country||""
var zip=context.shippingAddress?.zip||""
billingAddress=address1+", "+city+", "+country+", "+zip+"."
var shippingAddress=billingAddress
var orderNumber=context.sfccCreateAnOrder.response.body?.orderNo||""
var itemsHTML=""   
var items=context.sfccCreateAnOrder.response.body.productItems
var itemImageUrl="https://ci6.googleusercontent.com/proxy/lOYRwSWZnm41Uo-K7H8_liFaWkBP1aT9xG367iZ4i64eDKjlysJNIWXvvv1UNBjIhCOnG2A4-_I40cU0GjYe8J1iGlPkQh97=s0-d-e1-ft#https://cdn-icons-png.flaticon.com/512/825/825500.png"
var totalItemPrice = getFormattedCurrency(context.sfccCreateAnOrder.response.body?.productSubTotal)
let totalPrice=getFormattedCurrency(context.sfccCreateAnOrder.response.body?.productTotal);
let tablesHTML = [];
let tax = getFormattedCurrency(context.sfccCreateAnOrder.response.body?.productItems[0].current_total_tax);
for (let index = 0; index < items.length; index++) {
    const item = items[index];
    let price = getFormattedCurrency(item.price);
    let imageUrl = context.productDetails.itemImgUrl;
    const table = `
        <table key=${index}>
            <tr>
                <td><img src=${imageUrl} width="80px" height="80px" alt="image"></td>
                <td>
                    <p>Title:<strong>${item.productName}</strong></p>
                    <p>Quantity: <strong>${item.quantity}</strong></p>
                    <p>Price: <strong>${price}</strong></p>
                </td>
            </tr>
        </table>
    `;
    
    tablesHTML.push(table);
}
let storeName = env.displayStoreName;
let content = "<?xml version='1.0' encoding='utf-8'?><head><style>.email-body {color: black;}.header {margin: 15px 0px 0 0;}.flex-container {display: flex;align-items: center;}.flex-container img {margin-right: 10px;}</style></head><body><div class=\"email-body\" style=\"font-family: Arial, sans-serif;\"><div class=\"header\" style=\"color: black;\"><p>Dear "+firstName+" "+lastName+",</p><p>We are excited to confirm your recent order with "+storeName+". Thank you for choosing us for your service needs. Below, you'll find all the details of your order.</p><p class=\"order-info-header\" style=\"font-weight: bold;\">Order Information:</p></div><div class=\"header\"><ul style=\"margin: 0; padding: 0;\"><li>Order Number: "+orderNumber+"</li><li>Order Date: <b>"+orderDate+"</b></li><li>Billing Address: "+billingAddress+"</li><li>Shipping Address: "+shippingAddress+"</li></ul></div><div class=\"header\" style=\"font-weight: bold;\">Order Items:</div><div>"
+tablesHTML+"</div><div class=\"header\"><b>Order Summary</b><p><ul><li>Items Total Price :<b>"+totalItemPrice+"</b></li><li>Order Total:<b>"+totalPrice+"</b></li></ul></p><p><b>Order Status:</b> <b style='color:green'>Placed</b></p><p>Please keep this email for your records. If you have any questions or concerns about your order, please don't hesitate to contact our customer support team. Please reference your order number for faster assistance.</p><p>Thank you for choosing "+storeName+". We appreciate your business and look forward to serving you again in the future.</p><p>Sincerely,<br><b>"+storeName+"</b></p></div></div></body>";

context.emailBody=JSON.stringify({
    content,
    "to": BUS.UserInfo.email,
    "subject": "Order Confirmation -"+orderNumber
})
delete BUS.ProductDetails;
    }


    const deleteUserName = () => {
        delete context.entities.userName
    }


    const prepOrderStatus = () => {
        var itemId=context.entities.showTitleMatchItems
for(let i=0;i<context.orders.length;i++){
    // Go through each line item within the current order.
    for(let j=0;j<context.orders[i].line_items.length;j++){
        // Check if the current line item's ID matches the item ID we're looking for.
        if(context.orders[i].line_items[j].id==itemId){
            // If a match is found, store the corresponding order's ID in the context for order status.
            context.orderStatusId=context.orders[i].id
            break;
        }
    }
}
koreDebugger.log("orderId "+context.orderStatusId)
    }


    const validateOTP = () => {
        
context.isValidOTP = context.entities.OTP == context.OTP;
context.noOfOTPAttempts = (context?.noOfOTPAttempts || 0) + 1;

if(context.isValidOTP){
    var bus = context.session.BotUserSession;
    var userInfo = context.validatePhoneNo.response?.body?.customers[0] || undefined;
    if (userInfo) {
      const formattedUserInfo = {
        "id": userInfo.id,
        "email": userInfo.email,
        "first_name": userInfo.first_name,
        "last_name": userInfo.last_name,
        "phone": userInfo.phone
      };
      BotUserSession.put("UserInfo", formattedUserInfo);
    }
}else{
    delete context.entities.OTP;
}
    }


    const prepEnumsForDaddress = () => {
        var data=context.fetchDeliveryAddressDetails.response.body.addresses
context.addressIds = convertToEnumObj(data.map((addressIds) => addressIds.id))//botFunc
context.addressIds.push({
    name: 'View More',
    val: 'View More',
    syn: [ "\"View More\"" ]
})
    }


    const addQuantity = () => {
        var bus = context.session.BotUserSession
var msg=bus?.lastMessage?.messagePayload?.message?.body||bus?.lastMessage?.messagePayload?.message?.text
koreDebugger.log("payload: "+msg)
context.cartQuantity=parseInt(context.entities.searchResults.split("#")[1])
koreDebugger.log("quantity "+parseInt(context.entities.searchResults.split("#")[1]))
    }


    const extractingStoreNameFromEnv = () => {
        var resp = context.getShopifyAdminToken?.response?.body
var bus = context.session?.BotUserSession
var storeName;
for(i=0;i<resp.length;i++){
    storeName = resp[i]?.storeId.split(".")[0]
    if(storeName == env.shopifyStoreName){
        storeName =  resp[i].storeId
        bus.ShopifyAdmin = {
            "storeAdminToken" : resp[i].token,
            "storeUrl" :storeName
        }
    messageLog = "Using store Url "+bus.ShopifyAdmin["storeUrl"]
    }
}
context.genrateStoreFrontToken = JSON.stringify({
    "storefront_access_token": {
        "title": env.shopifyStoreName  //this condition to make a api for creating storefront token if not exist
    }
});

// bus.ShopifyAdmin["storeAdminToken"] = "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";
// bus.ShopifyAdmin["storeUrl"] = "korebot.myshopify.com"
//koreDebugger.log(messageLog)
    }


    const cartActionDecider = () => {
        var bus=context.session.BotUserSession
var msg=bus?.lastMessage?.messagePayload?.message?.body||bus?.lastMessage?.messagePayload?.message?.text||bus?.lastMessage?.messagePayload?.message?.renderMsg
var info=context.getProductId.response.body.data?.products?.edges;
var cartInfo=context.getCartItems.response.body.data?.cart?.lines?.edges;
if(msg.match(/\bremove\b/gi)){
    context.cartAction="Remove"
}
try {
    if (JSON.parse(msg)) {
        if(JSON.parse(msg)?.title=="Checkout"){
        context.cartAction = "checkout";
        cartDetails=JSON.parse(msg)
        cartDetails["cartId"]=context.getCartItems.response.body.data.cart.id
        for(i=0;i<cartDetails.selectedItems.length;i++){
            sku=cartInfo.find(item=>item.node.id==cartDetails.selectedItems[i].id).node.attributes[0].value
            obj={
                "id": cartDetails.selectedItems[i].id,
            "quantity": cartDetails.selectedItems[i].quantity,
            "sku":sku,
            "imageUrl":context.imageSkuMap[sku],
            "title":context.titleSkuMap[sku],
            "price":context.priceSkuMap[sku]
            }
           cartDetails.selectedItems[i]=obj 
        }
        koreDebugger.log("cartDetails: "+cartDetails)
        context.cartDetails=cartDetails
        
        }else{
        context.cartAction = "Update";
    }
        
    }
}catch(error){
    if(!context.cartAction){
    context.isValidPaylod= true
    }
} 

koreDebugger.log("Action "+context.cartAction)
    }


    const pareseItemsIds = () => {
        orders=context.getCancelableItems.response.body.eligibleOrders
context.lineItemId=[]
k=1
number=[]
for(i=0;i<orders.length;i++){
    for(j=0;j<orders[i].line_items.length;j++){
    if(context.entities.productNameToCancel.includes(orders[i].line_items[j].name)){
        context.lineItemId.push(orders[i].line_items[j].id)
        number.push(k.toString())
        k++
    }
}
}
if(context.lineItemId.length==0){
    delete context.entities.productNameToCancel
    
}
if(context.lineItemId.length==1){
    context.line_itemIdToCancel=context.lineItemId[0]
    
}
context.number=convertToEnumObj(number)
    }


    const Script0001 = () => {
        orders=context.getOrdersDetails.response.body.orders.slice(0,10)
context.orderIds=orders.map(obj => obj.id)
if(orders.find(order=>order % 10000== context.entities.hIvrOrderId)){
    context.orderIds=[orders.find(order=>order % 10000== context.entities.hIvrOrderId).id]
}
context.orderIdsPayload=JSON.stringify({
    "orderIds": context.orderIds
})
    }


    const cnstrtPaylodForTrackingInfo = () => {
        if(!context.entities.multipleLineItems){
context.orderId = context.getOrdersDetails.response.body.orders[0].id
}
else{
    val = parseInt(context.entities.multipleLineItems)
    context.orderId = context.orderDetails[val-1].orderId
}

    }


    const isValidZip = () => {
        // if(context.getZipcode?.response?.body.find(item => item.zipCode == context?.zipCode)){
//     context.isValidZipcode=true
// }
 context.isValidZipcode =true
    }


    const prepCancelOrderPayload = () => {
        context.caluculatedOrder  =JSON.stringify({
    "orderId" : context.entities.showOrders
})

context.isPayload = true
var bus = context.session.BotUserSession
// Check if the number of eligible line items is not exactly one
if(context.eligibleLineItems.length!=1){
    try {
        arr = []
    let bus = context.session.BotUserSession;
    let channel = bus?.channels[0]?.type;
    koreDebugger.log("BUS cancelITEM lineitemId"+JSON.stringify(bus));
    if(channel?.toLowerCase() == "whatsapp") {
        let itemId;
        if(context.entities.displayLineItems){
            itemId = context.entities.displayLineItems;
        } else {
            itemId = bus?.channels?.[0]?.body || bus?.lastMessage?.messagePayload?.message?.body || bus?.lastMessage?.messagePayload?.message?.text || bus?.lastMessage?.messagePayload?.message?.renderMsg;
        }
        koreDebugger.log("cancel lineitemId"+itemId);
        arr.push(itemId);
    } else {
    // Retrieve the last message from the user session, using optional chaining and logical OR to handle missing properties
    var msg = bus?.lastMessage?.messagePayload?.message?.body || bus?.lastMessage?.messagePayload?.message?.text || bus?.lastMessage?.messagePayload?.message?.renderMsg
    var lineItems = JSON.parse(msg).selectedItems
    // Loop through each item in the selected line items & push each line item ID into array
    for (i = 0; i < lineItems.length; i++) {
        arr.push(lineItems[i].id)
    }
    
    }
    context.entities.displayLineItems = arr
}
    catch (err) {
    context.isPayload = false
    }
}
    }


    const parseSpecficItemOrEntireorder = () => {
        if(context.entities.chooseOrderToCancel=="Specific Item"){
for(i=0;i<context.multiItemOrder.line_items.length;i++){
    if(context.multiItemOrder.line_items[i].name==context.entities.specificOrder){
        context.line_itemIdToCancel=context.multiItemOrder.line_items[i].id
    }
}
}else{
    context.orderIdToCancel=context.multiItemOrder.id
}
    }


    const setDocSearchSettingsOnBsus = () => {
        context.session.BotUserSession.DocSearchSettings = {
    "searchService": "SEARCH_ASSIST",
    "isCacheEnabled": true,
    "mainApp": {
        "appId": "st-28805f03-632c-5f26-9b1a-e7aab77fcd40",
        "appToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNzLTVkMmFlYmJkLTA2Y2QtNWJjMC1hM2UzLTI5ZDYxNmI0NDZlYiJ9.sEc6xSOR1qVZ7rWoJoSSGi_bexC6nBO6T1mlAeJNgW4"
    },
    "cacheApp": {
        "appId": "st-2e9c9479-da9a-5df1-81da-393b520019a1",
        "appToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNzLTU2MDBjMTBlLTQ0MzEtNWE4OS1iOWI0LWM4OWM2Yzk2MTA2NSJ9.DwaanN-cZfFdGyYZZ1Y8s8iKUgLZVTKo0K-__dopQgs",
        "maxNumOfResults": 5
    },
    "llmConfig": {
        "url": "https://koreopenai.openai.azure.com/openai/deployments/Koreai-GPT-4/chat/completions?api-version=2023-03-15-preview",
        "token": "d0f6560007a9435d9111cc497c7d5c11"
    }
}
    }


    const setLikeFlagToObject = () => {
        let obj = JSON.parse(context.session.BotUserSession.CacheObject);
obj.documents[0]["isResponseLiked"] = true;

context.session.BotUserSession.CacheObject = JSON.stringify(obj);
koreDebugger.log("Cache Object : "+ JSON.stringify(context.session.BotUserSession.CacheObject));
    }


    const prepZipcodePayload = () => {
        context.zipCode=parseInt(context?.forms?.AddressDetails?.zipcode)

koreDebugger.log("FORM D"+ JSON.stringify(context?.forms?.AddressDetails));
    }


    const prepUpdateName = () => {
        var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
koreDebugger.log("Print " + eCommercePlatform)

bus=context.session.BotUserSession.UserInfo
if (eCommercePlatform == "Shopify") {
context.updateProfilePayload=JSON.stringify({
    "customer": {
        "id": bus.id,
        "first_name": context.forms.UpdateName.firstName,
        "last_name": context.forms.UpdateName.lastName
    }
})
koreDebugger.log(context.updateProfilePayload)
} else if (eCommercePlatform == "SFCC") {
    context.updateProfilePayload=JSON.stringify({
        auth:"Bearer "+context.session.BotUserSession.SfccAccessToken.accessToken,
        updatecustomerurl:"https://"+env.shortCode+".api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/"+env.organizationId+"/customers/"+bus.id+"?siteId="+env.siteId,
        "customer": {
        "firstName": context.forms.UpdateName.firstName,
        "lastName": context.forms.UpdateName.lastName
        }
})
}
koreDebugger.log(context.updateProfilePayload)
    }


    const prepOrdersEnum = () => {
        var data = context.getOrdersDetails?.response?.body?.orders || context.getSpecificOrder?.response?.body.orders || context.rawApi.response?.body?.order || [];
context.orders = convertToEnumObj(data.map((order) => order.id)) //botFunc
context.orders.push({
    name: 'Show More',
    val: 'Show More',
    syn: [ 'Show More' ]
})
context.displayOrdersCount = 0;
koreDebugger.log(JSON.stringify(context.orders))
  
  
  
  
    }


    const validateCardDeatils = () => {
        if(context.forms.PaymentCard.cardNumber!=4242424242424242){
    context.prefillForms = {
    "PaymentCard": {
        "fields": {
            "name": context?.forms.PaymentCard.name,
            "expiryDate": context?.forms.PaymentCard.expiryDate,
            "cvv": context?.forms.PaymentCard.cvv,
            "zip": context?.forms.PaymentCard.zip,
        }
    }
}
delete context.forms.PaymentCard
}else{
    delete context.prefillForms
}
    }


    const contextVariableDeclaration = () => {
        context.isValidPhoneNumber = 0
context.isNumberNotFoundInDb = 0
context.isValidOtpTries = 0
    }


    const parseLocations = () => {
        const locations = context.getLocations.response.body?.locations;
let storeLocations = 'Discover great deals at stores near you!\n\n';
let count = 1;
let addresses = [];
for(let i = 0;i<locations.length;i++) {
    if(locations[i].address1) {
//         storeLocations= storeLocations+`${count++}. ${locations[i].name.toString()} 🛍️
// 🏭${locations[i].address1}, ${locations[i].city}, ${locations[i].zip}
// 📞${locations[i].phone}
// 📍${locations[i].address2}

// `;
 let address= `${count++}. ${locations[i].name.toString()}\nAddress: ${locations[i].address1}, ${locations[i].city}, ${locations[i].zip}\nPhone: ${locations[i].phone}\n${locations[i].address2.toString()}`;
addresses.push(address);
    }
}
storeLocations=storeLocations+ addresses.join('\n\n')+`\n\nHappy Shopping!\n${env.displayStoreName}`;

let payload = {
      "phone": getANI(),
      "message":  storeLocations
    };
context.smsBody = JSON.stringify(payload);
context.NoOfAddresses = addresses.length;
koreDebugger.log(context.smsBody)

    }


    const sfccAuthPayload = () => {
        const secretKey = env.authSecretKey;
const length = env.authSecretKeyLength;


var verifier = "";
for (var i = 0; i < length; i++) {
  verifier += secretKey.charAt(Math.floor(Math.random() * secretKey.length));
}
let hash = koreUtil.hash('sha256').update(verifier).digest();
let challenge = hash.toString('base64')
  .replace(/=/g, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');

// koreDebugger.log('verifier' + verifier + 'challenge' + challenge);
const redirectUri = env.redirectUri;
const siteId = env.siteId;
const shortCode = env.shortCode;
const organizationId = env.organizationId;
const client_id = env.client_id;
const hint = env.hint;
const authtokenurl = `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${organizationId}/oauth2/authorize?response_type=code&client_id=${client_id}&channel_id=${siteId}&redirect_uri=${redirectUri}&hint=${hint}&code_challenge=${challenge}`;
context.authtokenurl = authtokenurl;
context.verifier = verifier;
    }


    const identifyWhatsAppChannel = () => {
        let bus = context.session.BotUserSession;
let channel = bus?.channels[0]?.type;
if (channel?.toLowerCase() == "whatsapp") {
    let whatsappPhoneNumber = bus?.channels[0].from.split("/")[2];
    context.phoneNumber = validatePhone(whatsappPhoneNumber); // Bot Function to format the phone number
    context.isWhatsAppChannel = true;
}
    }


    const prepProductNameEnums = () => {
        names=[]
for(i=0;i<context.multiItemOrder.line_items.length;i++){
    names.push(context.multiItemOrder.line_items[i].name)
}
context.productNames=convertToEnumObj(names)
    }


    const setInfoToBus = () => {
        var bus = context.session.BotUserSession;
var userInfo = context.validatePhoneNo.response?.body?.customers[0];
if (userInfo) {
     const formattedUserInfo = {
        "id": userInfo.id,
        "email": userInfo.email,
        "first_name": userInfo.first_name,
        "last_name": userInfo.last_name,
        "phone": userInfo.phone
      };
      BotUserSession.put("UserInfo", formattedUserInfo);
      koreDebugger.log("Setting UserInfo"+bus.UserInfo);
}



    }


    const hardCodeShopifyUrl = () => {
        bus = context.session.BotUserSession

bus.ShopifyAdmin={
    "storeFrontToken" : "5bc1888ca9e6be31f34b147a6eee942c",
    "storeFrontUrl" : "https://korebot.myshopify.com/api/2023-10/",
    "storeAdminUrl" : "https://korebot.myshopify.com/admin/api/2023-10/",
    "storeAdminToken" : "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"
}
    }


    const isValidAddressToDelete = () => {
        var addressId=parseInt(context.entities.showAllDeliveryAddresses||context.fetchDeliveryAddressDetails?.response?.body?.addresses[0]?.id);
context.eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName;
if(context.eCommercePlatform === "Shopify") {
if(context.fetchDeliveryAddressDetails?.response?.body?.addresses.find(address => address.id === addressId).default==true){
    context.isValidDeleteAddress=false
}
}
    }


    const totalOrderPrice = () => {
        var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName

// var sku = context.entities.searchResults.indexOf(" ") != -1 ? context.entities.searchResults.split(" ")[0] : context.entities.searchResults.split("#")[0];

if(eCommercePlatform == "Shopify") {
// If cart details exist in the context, calculate the total price of items in the cart.    
if(context?.cartDetails){   
var prod=context.getProductId.response.body.data.products.edges
var cartInfo=context.getCartItems.response.body.data?.cart?.lines?.edges
var cartDetails=context.cartDetails.selectedItems
context.totalPrice=0
for(let i=0;i<cartDetails.length;i++){
    // Calculate the total price by adding the product's price multiplied by its quantity.    
    context.totalPrice=context.totalPrice+parseFloat(cartDetails[i].price)*(cartDetails[i].quantity)
        
}
}else{
    var sku = context.entities.searchResults.indexOf(" ") != -1 ? context.entities.searchResults.split(" ")[0] : context.entities.searchResults.split("#")[0];
    koreDebugger.log("Total Price Product Details" + context.productDetails)
    var bus=context.productDetails
    // Calculate the total price using the product's itemPrice and quantity.
    context.totalPrice=parseFloat(bus.itemPrice*bus.quantity)
}
} else if(eCommercePlatform == "SFCC") {
    var bus=context.productDetails;
    koreDebugger.log("Total Price Product Details" + context.productDetails)
    var bus=context.productDetails

    context.totalPrice=parseFloat(bus?.itemPrice*bus?.quantity)
}

// context.price = content.SOP_orderTotalMsg+" "+getFormattedCurrency(context.totalPrice)

    }


    const prepUpdateProfile = () => {
        var platformName=JSON.parse(env.commercePlatformConfig).platformName;
context.platformName=platformName
context.profileFields=[]
if(platformName=="SFCC"){
    context.profileFields.push({
    name: 'Name',
    val: 'Name',
    syn: [ 'Name' ]
})
}else if(platformName=="Shopify"){
       context.profileFields.push({
    name: 'Name',
    val: 'Name',
    syn: [ 'Name' ]
},{
    name: 'Email',
    val: 'Email',
    syn: [ 'Email' ]
},{
    name: 'Phone Number',
    val: 'Phone Number',
    syn: [ 'Phone Number' ]
}) 
    }
    }


    const confirmOTP = () => {
        var otp = context.entities.captureOtp;
otp=parseInt(otp);
var bus = context.session.BotUserSession;
if(context.OTP != otp ){
    context.isValidOtpTries+=1
    delete context.entities.captureOtp
    
}
else{
    context.isValidOtpTries = 0
    context.isLoggedIn=true
    var userInfo = context.validatePhoneNo.response?.body?.customers[0] || undefined;
    if (userInfo) {
      const formattedUserInfo = {
        "id": userInfo.id,
        "email": userInfo.email,
        "first_name": userInfo.first_name,
        "last_name": userInfo.last_name,
        "phone": userInfo.phone
      };
      BotUserSession.put("UserInfo", formattedUserInfo);
    }
}

koreDebugger.log(userInfo)
    }


    const parseProductNames = () => {
        orders = context.orderStatus;
    context.lineItemsIds = [];
k=1
number=[]
    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].result.length; j++) {
            if (context.entities.productNameAndOrderIds.includes(orders[i].result[j].name)) {
                context.lineItemsIds.push(orders[i].result[j].id);
                number.push(k.toString())
                k++
            }
        }
    }
    context.number=convertToEnumObj(number)
context.number.push({
    name: 'All',
    val: 'All',
    syn: [ "All" ]
})


    }


    const isLoggedIn = () => {
        var userInfo = context.session.BotUserSession?.UserInfo?.id;
if(userInfo){
    context.isUserLoggedIn = true;
}

// context.displayOrdersCount = 0;


    }


    const prepWhatsAppPayload = () => {
        var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName;
const whatsAppConfig = JSON.parse(env.whatsAppConfig);
context.whatsAppBaseUrl = whatsAppConfig.baseUrl;
context.whatsAppAuth = whatsAppConfig.Authorization;
const sender = whatsAppConfig.sender;

if(!context.whatsAppLineItemsLength) {
if (eCommercePlatform == "Shopify") {
    var orderDetails = context.getOrdersDetails.response.body.orders
    var trackingStatus = context.getOrderTrackingInfo.response.body

    if (context.entities.recentOrderItems) {
        for (let i = 0; i < orderDetails.length; i++) {
            itemNum = context.entities.recentOrderItems.split('&')[0]
            orderNum = context.orderId
            if (orderDetails[i].id == orderNum) {
                Item = []
                for (j = 0; j < orderDetails[i].line_items.length; j++) {
                    if (orderDetails[i].line_items[j].id == itemNum) {
                        Item.push(orderDetails[i].line_items[j])
                    }

                }
                orderDetails[i].line_items = Item
                orderDetails = orderDetails[i]
            }
        }
    }
    else { // to show all line items in the bot
        orderDetails = context.orderDetails

    }

    var elements = [];
    var deliveryDateNeeded = ["fulfilled", "Placed", "In Transit"]

    let orderDate = orderDetails.created_at?.split("T")[0];
    let orderId = orderDetails.id;
    let i = context.entities.recentOrderItems ? 1 : orderDetails.line_items.length;
    let billingAddress = orderDetails.billing_address
    let shippingAddress = orderDetails.shipping_address
    let address
    if (billingAddress?.address1)
        address = billingAddress?.address1 + ", " + billingAddress?.city + ", " + billingAddress?.address2 + ", " + billingAddress?.country + " " + billingAddress?.zip

    if (shippingAddress?.address1)
        address = shippingAddress?.address1 + ", " + shippingAddress?.city + ", " + shippingAddress?.address2 + ", " + shippingAddress?.country + " " + shippingAddress?.zip



    for (const orderItem of orderDetails.line_items) {
        let element = {};
        let caption = "";
        i = i - 1;
        element.itemStatus = trackingStatus[orderItem.id]?.status || "";
        let trackingUrl = trackingStatus[orderItem.id]?.trackingUrl;
        element.icon = context.imageSkuMap[orderItem.sku];
        element.title = orderItem.name;
        element.lineItemId = orderItem.id;
        element.orderTotal = getFormattedCurrency(orderDetails.total_price) + " (" + orderDetails.line_items.length + " Items)";
        element.address = address || "No shipping Address";
        element.quantity = orderItem.quantity + " x $" + orderItem.price;

        let deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        if (trackingStatus[orderItem.id]?.status == 'Delivered') {
            element.deliveredDate = trackingStatus[orderItem.id]?.deliveryDate?.split("T")[0] || trackingStatus[orderItem.id]?.updatedAt?.split("T")[0];
        }
        else if (deliveryDateNeeded.includes(trackingStatus[orderItem.id]?.status)) {
            element.estDeliveryDate = deliveryDate;
        }

        caption = `*${element.title}*\n\n*Qty:* ${element.quantity}\n*Order Date* ${orderDate}\n*Order ID* ${orderId}\n*Order Total* ${element.orderTotal} \n*Status*: ${element.itemStatus}\n*Shipping Address* : ${address}`;
        if (trackingUrl) {
            caption = caption + `\n*TrackingUrl*: ${trackingUrl}`;
        }
        if (element.estDeliveryDate) {
            caption = caption + `\n*Est Delivery Date*: ${element.estDeliveryDate}`;
        }
        if (element.deliveredDate) {
            caption = caption + `\n*Delivered Date*: ${element.deliveredDate}`;
        }
        if (i == 0) {
            const orderSummary = `\n\n*Order Summary*\nOrder Price:  ${getFormattedCurrency(orderDetails.total_line_items_price)}\nTax:          ${getFormattedCurrency(orderDetails.total_tax)}\nTotal:        ${getFormattedCurrency(orderDetails.total_price)}\nDiscount:     ${getFormattedCurrency(orderDetails.total_discounts)}\nTotalSummary: ${getFormattedCurrency(orderDetails.total_price)}`;
            caption = caption + orderSummary;

        }

        element.caption = caption.substring(0, 3000);
        var msg = {
            "from": sender,
            "to": context.phoneNumber,
            "content": {
                "mediaUrl": element.icon,
                "caption": element.caption
            }
        }
        elements.push(JSON.stringify(msg));
    }

} else if (eCommercePlatform == "SFCC") {
    // to show all line items in the bot
    orderDetails = context.orderDetails



    var elements = [];
    var deliveryDateNeeded = ["fulfilled", "Placed", "In Transit"]


    let orderDate = orderDetails.created_at?.split("T")[0];
    let orderId = orderDetails.id;
    let i = context.entities.recentOrderItems ? 1 : orderDetails.line_items.length;
    let billingAddress = orderDetails.billing_address
    let defaultAddress = orderDetails.default_address
    if (billingAddress.address1)
        address = billingAddress?.address1 || "" + ", " + billingAddress?.city || "" + ", " + billingAddress?.address2 || "" + ", " + billingAddress?.country || "" + " " + billingAddress?.zip || ""
    else
        address = defaultAddress?.address1 || "" + ", " + defaultAddress?.city || "" + ", " + defaultAddress?.address2 || "" + ", " + defaultAddress?.country || "" + " " + defaultAddress?.zip || ""

    for (const orderItem of orderDetails.line_items) {
        let element = {};
        let caption = "";
        i = i - 1;
        let itemStatus = "Placed"
        element.icon = context.imageSkuMap[orderItem.id].imageUrl;
        element.title = orderItem.name;
        element.lineItemId = orderItem.id;
        element.orderTotal = getFormattedCurrency(orderDetails.total_price) + " (" + orderDetails.line_items.length + " Items)";
        element.address = address || "No shipping Address";
        element.quantity = orderItem.quantity + " x $" + orderItem.price;
        element.deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        caption = `*Product Name*: ${element.title}\n\n*Qty:* ${element.quantity}\n*Order Date* ${orderDate}\n*Order ID* ${orderId}\n*Item ID* ${element.lineItemId}\n*Order Total* ${element.orderTotal} \n*Status*: ${itemStatus}\n*Shipping Address* : ${address}`;
        if (element.deliveryDate) {
            caption = caption + `\n*Est Delivery Date*: ${element.deliveryDate}`;
        }
        if (i == 0) {
            const orderSummary = `\n\n*Order Summary*\nOrder Price:  ${getFormattedCurrency(orderDetails.total_line_items_price)}\nTax:          ${getFormattedCurrency(orderDetails.total_tax)}\nDiscount:     ${getFormattedCurrency(orderDetails.total_discounts)}\nTotal:        ${getFormattedCurrency(orderDetails.total_price)}\nTotalSummary: ${getFormattedCurrency(orderDetails.total_price)}`;
            caption = caption + orderSummary;

        }
        element.caption = caption.substring(0, 3000);
        var msg = {
            "from": sender,
            "to": context.phoneNumber,
            "content": {
                "mediaUrl": element.icon,
                "caption": element.caption
            }
        }
        elements.push(JSON.stringify(msg));
    }
}
context.whatsAppLineItemsInfo = elements;
context.whatsAppLineItemsLength = elements.length;
context.currentLineItemCount = 0;
context.whatsAppLineItemStatus = context.whatsAppLineItemsInfo[context.currentLineItemCount]
} else {
    context.currentLineItemCount = context.currentLineItemCount + 1;
    context.whatsAppLineItemStatus = context.whatsAppLineItemsInfo[context.currentLineItemCount]
}
// koreDebugger.log("COntext", JSON.stringify(bus));
delete context.entities.hIvrOrderId;
delete context.entities.orderId;
delete context.isSpecificOrder;
delete context.GenerativeAINode;
    }


    const createOrderPayload = () => {
        var BUS=context.session.BotUserSession
var userId=BUS?.UserInfo?.id;

var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName

if (eCommercePlatform == "Shopify") {

    if(context.cartDetails){
        var info=context.getProductId.response.body.data?.products?.edges;
        var cartInfo=context.getCartItems.response.body.data?.cart?.lines?.edges
        var cartDetails=context.cartDetails.selectedItems
        
        var lineItems=[]
        for(let i=0;i<cartDetails.length;i++){
              lineItems.push({
                    "title": cartDetails[i].title,
                    "price": parseFloat(cartDetails[i].price),
                    "grams": "1300",
                    "sku":cartDetails[i].sku,
                    "quantity": cartDetails[i].quantity,
                    "tax_lines": [
                        {
                            "price": 13.5,
                            "rate": 0.06,
                            "title": "State tax"
                        }
                    ]
                })    
            
        }
    }else{
    var item=context.productDetails||{}
    var lineItems=[
                {
                    "title": item?.itemTitle,
                    "price": item?.itemPrice,
                    "grams": "1300",
                    "quantity": item?.quantity,
                    "sku":item?.sku,
                    "tax_lines": [
                        {
                            "price": 13.5,
                            "rate": 0.06,
                            "title": "State tax"
                        }
                    ]
                }
            ]
    }
    context.orderPayload={
        "order": {
            "line_items":lineItems ,
            "billing_address": {
                "id":context.shippingAddress.id,
                "first_name": BUS.UserInfo.first_name,
                "last_name":BUS.UserInfo.last_name,
                "address1": context.shippingAddress.address1,
                "address2":context.shippingAddress.address2,
                "phone": BUS.UserInfo.phone,
                "city": context.shippingAddress.city,
                //"province": context.shippingAddress.province,
                "country": context.shippingAddress.country,
                "zip": context.shippingAddress.zip
            },
            "shipping_address": {
                "id":context.shippingAddress.id,
                "first_name": BUS.UserInfo.first_name,
                "last_name":BUS.UserInfo.last_name,
                "address1": context.shippingAddress.address1,
                "address2":context.shippingAddress.address2,
                "phone": BUS.UserInfo.phone,
                "city": context.shippingAddress.city,
                //"province": context.shippingAddress.province,
                "country": context.shippingAddress.country,
                "zip": context.shippingAddress.zip
            },
            "customer": {
        "first_name": BUS.UserInfo.first_name,
        "last_name":BUS.UserInfo.last_name,
        "email":BUS.UserInfo.email,
        "phone":BUS.UserInfo.phone
      },
      "email":BUS.UserInfo.email,
      "phone":BUS.UserInfo.phone,
      "note_attributes": 
                {
                    "stripe_id": context.stripe_id
                },
            "transactions": [
                {
                    "kind": "sale",
                    "status": "success",
                    "amount": context.totalPrice
                }
            ],
            "total_tax": 13.5,
            "currency": "USD"
        }
    }
    koreDebugger.log(JSON.stringify(context.orderPayload))
} else if (eCommercePlatform == "SFCC") { 
    
    
    
    
    
    
}
    }


    const prepAddressEnum = () => {
        // Retrieve the list of delivery addresses from the response body of a previously made fetchDeliveryAddressDetails call.
var data = context.fetchDeliveryAddressDetails.response.body.addresses
// Convert the array of address objects to an enumeration object using the map function and a custom convertToEnumObj function.
context.addressIds = convertToEnumObj(data.map((addressIds) => addressIds.id))//botFunc
context.addressIds.push({
    name: 'Add New',
    val: 'Add New',
    syn: [ "\"Add New\"" ]
},{
    name: 'View More',
    val: 'View More',
    syn: [ "\"View More\"" ]
},{
    name: 'View More',
    val: 'View More',
    syn: [ "\"View More\"" ]
})
    }


    const Script0022 = () => {
        koreDebugger.log("context.userInput is " +  context.userInput);

var bus = context.session.BotUserSession;
// Overrisding last message with stored/desired userInput
bus.lastMessage.messagePayload.message.body = context.userInput;
bus.lastMessage.messagePayload.message.text = context.userInput;
// bus.lastMessage?.messagePayload?.entry[0]?.messaging[0]?.message?.text
koreDebugger.log("bus.lastMessage.messagePayload.message.body " +  bus.lastMessage.messagePayload.message.body);

//Present Date --==
context.date = new Date()
    }


    const prepCacheAppPayload = () => {
        var bus=context.session.BotUserSession;
context.actualQuery = bus.lastMessage?.messagePayload?.message?.body || bus.lastMessage?.messagePayload?.message?.text || " user input not found ";
bus.UserQuery = context.actualQuery;

context.cacheAppPayload=JSON.stringify({
  "query": context.actualQuery,
  "maxNumOfResults": bus.DocSearchSettings.cacheApp.maxNumOfResults
})

koreDebugger.log("cacheAppPayload : "+context.cacheAppPayload);
    }


    const valPhoneNo = () => {
        context.entities.phoneNumber=validatePhone(context.entities.phoneNumber)//botFunc
koreDebugger.log('phoneNumber : '+context.entities.phoneNumber)
    }


    const prepOrderInfoPayload = () => {
        context.orderInfoPayload = JSON.stringify({
  "orderId" :  context.entities.hOrderId||context.entities?.recentOrders || context.entities?.orderId ||context?.orderStatusId||context.getOrdersDetails.response.body.orders[0].id
})
context.entities.orderId=context.entities.orderId||context.entities.hOrderId

    }


    const noOfOrderItems = () => {
        if(context.entities.orderId && context.getSpecificOrder?.response?.statusCode == 200){
    context.orderData = context.getSpecificOrder.response.body.order
}else{ if(context.entities.recentOrders){
    context.orderData = context.getOrdersDetails.response.body.orders.find(order => order.id == context.entities.recentOrders)
}    
else{
    context.orderData = context.getOrdersDetails.response.body.orders[0]
}
}
context.orderStatusId=context.orderData.id
var skus=[]
for(i=0;i<context.orderData.line_items.length;i++){
    skus.push(context.orderData.line_items[i].sku)
}
context.skuQuery=JSON.stringify({
    "skus":skus
})
    }


    const isAudioCodes = () => {
        if(isAudioCodeChannel()){
    context.isAudioCodes=true
}
var bus = context.session.BotUserSession
context.userInput = bus.lastMessage?.messagePayload?.message?.body || bus.lastMessage?.messagePayload?.message?.text || bus.lastMessage?.messagePayload?.entry[0]?.messaging[0]?.message?.text;

    }


    const prepSearchQuery = () => {
        context.userId =  getUserId();
var bus = context.session.BotUserSession;
context.actualQuery = bus.lastMessage?.messagePayload?.message?.body || bus.lastMessage?.messagePayload?.message?.text || bus.lastMessage?.messagePayload?.entry[0]?.messaging[0]?.message?.text || " user input not found ";
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
koreDebugger.log("Print " + eCommercePlatform);


var pineconeIndex = env.indexName;
if (eCommercePlatform == "Shopify") {
    pineconeIndex = env.indexName
} else if(eCommercePlatform == "SFCC") {
    pineconeIndex = env.sfccPineConeIndex;
}
var cstrtPromptPayload = {
    "query":context.actualQuery,
    "sessionId":context.userId,
    "indexName": pineconeIndex
};
var cstrtShowResultPayload = {
    "sessionId":context.userId,
    "indexName": pineconeIndex
}
var classifyQuery = {
    "query": context.actualQuery, 
    "sessionId": context.userId,
    "indexName": env.indexName,
   "namespace": "bigbox-test-index"
}
var processQuery = {
    "sessionId": context.userId,
    "indexName": env.indexName,
    "namespace": "bigbox-test-index"
}
var presentQuery = {
    "sessionId": context.userId,
    "indexName": env.indexName
}
context.cstrtShowResultPayload = JSON.stringify(cstrtShowResultPayload);
context.cstrtPromptPayload = JSON.stringify(cstrtPromptPayload);
// koreDebugger.log(JSON.stringify(context.session.BotUserSession))
context.classifyQuery = JSON.stringify(classifyQuery)
context.processQueryPayload = JSON.stringify(processQuery)
context.presentQuery = JSON.stringify(presentQuery)
    }


    const parseOrderAndItemId = () => {
        var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName

context.imageSkuMap = {}
if (eCommercePlatform == "Shopify") {
var ordersData = context.getOrdersDetails?.response?.body?.orders;
var sku = []
itemId=context.entities.itemId.split("&")[0]
orderId=context.entities.itemId.split("&")[1]
if(ordersData.find(order => order.id==orderId)){
    order=ordersData.find(order => order.id==orderId)
    if(order.line_items.find(item=>item.id==itemId)){
        context.isValidItemId=true
    }
}
for(i=0;i<ordersData.length ; i++){
    for(j=0 ; j<ordersData[i].line_items.length ; j++){
        if(!sku.includes(ordersData[i].line_items[j].sku)){
        sku.push(ordersData[i].line_items[j].sku)
        }
    }
    
}


context.skuQuery = JSON.stringify({
    "skus":sku
})


koreDebugger.log(sku)
context.orderId = context.entities.itemId.split("&")[1]
context.showMoreClickCount =0
} else if (eCommercePlatform == "SFCC") {
    var ordersData = context.getOrdersDetails?.response?.body?.orders;
var sku = []
itemId=context.entities.itemId.split("&")[0]
orderId=context.entities.itemId.split("&")[1]
if(ordersData.find(order => order.id==orderId)){
    order=ordersData.find(order => order.id==orderId)
    if(order.line_items.find(item=>item.id==itemId)){
        context.isValidItemId=true
    }
}
for(i=0;i<ordersData.length ; i++){
    for(j=0 ; j<ordersData[i].line_items.length ; j++){
        if(!sku.includes(ordersData[i].line_items[j].id)){
        sku.push(ordersData[i].line_items[j].id)
        }
    }
    
}
context.skuQuery = JSON.stringify({
    "getProductsUrl": "https://"+env.shortCode+".api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/"+env.organizationId+"/products?siteId="+env.siteId+"&ids="+sku.join(','),
    auth:"Bearer "+context.session.BotUserSession.SfccAccessToken.accessToken
})

context.orderId = context.entities.itemId.split("&")[1]
context.showMoreClickCount =0
}
    }


    const addDefaultAddressPayload = () => {
        var BUS=context.session.BotUserSession
context.addAddressPayload=JSON.stringify({
    "address": {
        "address1": context.forms?.AddressDetails.addressLine1,
        "address2": context.forms?.AddressDetails.state,
        "city": context.forms?.AddressDetails.city,
        "first_name": BUS.UserInfo.first_name,
        "last_name": BUS.UserInfo.last_name,
        "phone": BUS.UserInfo.phone,
        "zip": context.forms?.AddressDetails.zipcode,
        "name": BUS.UserInfo.first_name+BUS.UserInfo.last_name,
        "country":context?.forms.AddressDetails?.country,
        "default": true
    }
});
    }


    const addAddressInprofile = () => {
        context.entities.hUpdateProfileOrAddress=["Address"]
context.entities.hActionDecider="Add Address"
    }


    const parsingGenAiDetails = () => {
        var genAiResp = context?.AI_Assisted_Dialogs?.genainodefindanorder?.entities[0]

if(genAiResp?.LineItemID && genAiResp?.Order_ID){
    context.orderId = genAiResp?.Order_ID;
    context.lineItemId = genAiResp?.LineItemID
    context.ItemName = genAiResp?.Product_Title
    context.orderDate = genAiResp?.Date
}

    }


    const setUserInfoOnBus = () => {
        const bus = context.session.BotUserSession;
const userInfo = context.validateUserName?.response?.body?.customers[0] || undefined;
const userSignupId = context.createAccount?.response?.body?.customer?.id || undefined

if (userInfo || userSignupId ) {
  const formattedUserInfo = {
    "id": userInfo?.id || userSignupId,
    "email": userInfo?.email || context.forms?.SignUp?.Email,
    "first_name": userInfo?.first_name || context.forms?.SignUp?.Firstname,
    "last_name": userInfo?.last_name || context.forms?.SignUp?.Lastname,
    "phone": userInfo?.phone ||  context.forms?.SignUp?.PhoneNumber
  };

  BotUserSession.put("UserInfo", formattedUserInfo);
}
    }


    const isRefundProcessed = () => {
        var orderStatus=context.getOrderStatus.response.body
let bus = context.session.BotUserSession;
// koreDebugger.log(JSON.stringify(bus))
status=orderStatus[context.entities.displayItems||context.entities.showTitleMatchItems].status
koreDebugger.log(status)
if (status == "Returned" || status == "Cancelled") {
    context.isRefundedPros = true;
} else if (status == "Return Inprogress" || status == "Return Requested") {
    context.notReturnedToSeller = true;
} else if (status == "Return Declined") {
    context.isDeclined = true;
}

    }


    const checkOrderId = () => {
        delete context.validCancelableOrder
orders=context.getCancelableItems.response.body.eligibleOrders
if(orders.find(order=>order.id % 10000==parseInt(context.entities.ivrOrderId))){
    context.validCancelableOrder=true
    context.entities.hIvrOrderId=context.entities.ivrOrderId
    delete context.entities.ivrOrderId
}
    }


    const mapImagesToLineItems = () => {
        //Parse the eCommerce platform configuration from an environment variable and store the platform name.
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
context.imageSkuMap = {}
if (eCommercePlatform == "Shopify") {
    // Retrieve the product data from the context's response body.
    var images = context.getProductId.response.body?.data?.products?.edges
    context.priceSkuMap={}
    context.titleSkuMap={}
    for(i=0;i<images.length ; i++){
        //Map the SKU to its corresponding image URL, with a fallback image URL if not found.
        context.imageSkuMap[images[i].node.variants.edges[0].node.sku] = images[i]?.node?.images?.edges[0]?.node?.src || "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"  //If the image is not found in the api then this not found image will display
        context.titleSkuMap[images[i].node.variants.edges[0].node.sku] = images[i].node.title   
        context.priceSkuMap[images[i].node.variants.edges[0].node.sku] = images[i].node.variants.edges[0].node.price
    } 
}else if (eCommercePlatform == "SFCC") {
    context.imageSkuMap = context.getProductId.response.body;
}
koreDebugger.log("imagesMap" + JSON.stringify(context.imageSkuMap));  
//constructing Enums
    }


    const checkValidOrderId = () => {
        orderId = context.entities.hIvrOrderId.toString()
context.isValidOrderId = true
if(orderId.length != 4){
    delete context.entities.hIvrOrderId
    context.isValidOrderId = false
}

    }


    const prepRemoveCartItems = () => {
        var bus=context.session.BotUserSession
var msg=bus?.lastMessage?.messagePayload?.message?.body||bus?.lastMessage?.messagePayload?.message?.text
context.removeCartItemsPayload=JSON.stringify({
        "cartId": context.getCartId.response.body.metafields[0].value,
        "lineIds": [
            msg.split(" ")[0]
        ]
    })
koreDebugger.log(context.entities.displayCart.split(" ")[0])
koreDebugger.log(JSON.stringify(context.removeCartItemsPayload))    
    }


    const prepDeflectionhUrl = () => {
        var bus = context.session.BotUserSession;
var actualQuery = bus.lastMessage?.messagePayload?.message?.body || bus.lastMessage?.messagePayload?.message?.text || " user input not found ";
if(context.entities?.hSkuId){
    actualQuery = "get the product with SKU : " + context.entities.hSkuId;
}
var longUrl = env.deflectionURL + '?query=' + actualQuery;
context.getShortUrlPayload = JSON.stringify({
    "url":longUrl
})
    }


    const checkOrderEligibility = () => {
        if(context.getOrderStatus.response.body[context.entities.showTitleMatchItems].status=="Delivered"){
    context.isDelivered=true
}
koreDebugger.log(context.getOrderStatus.response.body[context.entities.showTitleMatchItems].status)
    }


    const chckMultipleLineItems = () => {
        // Retrieve the selected order ID from the context entities
var orderSelected = context.entities.showOrders
itemId = []
for (i = 0; i < context?.eligibleOrders.length; i++){
    // Check if the current order's ID matches the selected order ID
    if(context.eligibleOrders[i].id == orderSelected){
        context.eligibleLineItems = context.eligibleOrders[i].line_items
        context.eligibleOrders = context.eligibleOrders[i]
    } 
}

var skus = []
// Loop through each eligible line item in the context
for(let i=0;i<context?.eligibleLineItems.length;i++){
    itemId.push(context.eligibleLineItems[i]?.id)
    skus.push(context.eligibleLineItems[i]?.sku)
}
// Convert the array of item IDs to an enumeration object and store it in the context
context.itemsId = convertToEnumObj(itemId)
context.skuQuery = JSON.stringify({
    "skus": skus
})
    }


    const sfccSignUpPayload = () => {
        
const password = context.forms.SignUp.Password;
koreDebugger.log("password "+password)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordRegex.test(password)) {
    koreDebugger.log('Incorrect Password');
    context.prefillForms = {
        "SignUp": {
            "fields": {
                "login": context.forms.SignUp.Email,
                "Email": context.forms.SignUp.Email,
                "Firstname": context.forms.SignUp.Firstname,
                "Lastname": context.forms.SignUp.Lastname,
                "DOB": context.forms.SignUp.DOB,
                "Gender": context.forms.SignUp.Gender,
                "PhoneNumber":context.forms.SignUp.PhoneNumber
            }
        }
    }
    delete context.forms.SignUp;
} else {
    
    context.signUp = JSON.stringify({
        "password": context.forms.SignUp.Password,
        "customer": {
            "login": context.forms.SignUp.Email,
            "email": context.forms.SignUp.Email,
            "firstName": context.forms.SignUp.Firstname,
            "lastName": context.forms.SignUp.Lastname,
            "phoneMobile":context.forms.SignUp.PhoneNumber
        }
    });
    context.username = context.forms.SignUp.Email;
    context.password = context.forms.SignUp.Password;
    const siteId = env.siteId;
    const shortCode = env.shortCode;
    const organizationId = env.organizationId;
    context.signUpUrl = `https://${shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/${organizationId}/customers?siteId=${siteId}`;
    delete context.prefillForms
}



// context.signUp = JSON.stringify({
//   "password": context.forms.SignUp.Password,
//   "customer": {
//     "login": context.forms.SignUp.Email,
//     "email": context.forms.SignUp.Email,
//     "firstName": context.forms.SignUp.Firstname,
//     "lastName": context.forms.SignUp.Lastname
//   }
// });

// const siteId = env.siteId;
// const shortCode = env.shortCode;
// const organizationId = env.organizationId;
// context.signUpUrl = `https://${shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/${organizationId}/customers?siteId=${siteId}`;
// koreDebugger.log('context.signUp'+context.signUp);
    }


    const immediateActionDecider = () => {
        var bus=context.session.BotUserSession
var msg=bus?.lastMessage?.messagePayload?.message?.body||bus?.lastMessage?.messagePayload?.message?.text

if(msg.match(/\bdelete\b/gi)){
    context.immediateAction="Delete Address"
}
if(msg.match(/\bupdate\b/gi)){
    context.immediateAction="Modify Address"
}
if(msg.match(/\badd\b/gi)){
    context.immediateAction="Add Address"
}
if(msg.match(/\bdefault\b/gi)){
    context.immediateAction="Default"
}

koreDebugger.log("ImmediateAction : "+context.immediateAction)
    }


    const fillterTheAddress = () => {
        if (context.entities.selectAddress) {
  var addressId = context.entities.selectAddress;
  // Determine which address to select based on the addressId.If the addressId is not 'Add New', filter the address by ID; otherwise, set selectedAddress to null.
  var selectedAddress = addressId !== 'Add New'
    ? filterAddressById(context.fetchDeliveryAddressDetails.response.body, addressId)
    : null;
  var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName

  // If the user has selected 'Add New' as the address and the eCommerce platform is "SFCC",setting a flag indicating that the service for adding a new address is needed.    
  if (addressId === 'Add New' && eCommercePlatform == "SFCC") {
    context.addNewAddressSeriveNeeded = true;
  }
} else {
  // When no specific address is selected, determine the default or preferred address index.    
  if (context.fetchDeliveryAddressDetails.response.body.addresses.length == 1) {
    var index = 0
  } else {
    var index = context.fetchDeliveryAddressDetails.response.body.addresses.findIndex(address => (address.default === true || preferred === true));

  }
  var selectedAddress = context.fetchDeliveryAddressDetails.response.body.addresses[index]
}

// Function to filter a customer's addresses by ID.
function filterAddressById(body, id) {
  var customerAddresses = body?.addresses;
  return customerAddresses?.find(address => (address.id === parseInt(id) || address.id === id) || null);
}
// Construct the shipping address object using selectedAddress details.
context.shippingAddress = {
  "id": selectedAddress?.id || "",
  "address1": selectedAddress?.address1 || context.forms?.AddressDetails.addressLine1,
  "address2": selectedAddress?.address2 || context.forms?.AddressDetails.state,
  "city": selectedAddress?.city || context.forms?.AddressDetails.city,
  "zip": selectedAddress?.zip || context.forms?.AddressDetails.zipcode,
  //"province": selectedAddress?.province || "",
  "country": selectedAddress?.country || context.forms?.AddressDetails.country,
  "province_code": selectedAddress?.province_code || ""
};

    }


    const parseTrackingStatus = () => {
        orderStatus=context.getAllOrdersTrackingInfo?.response?.body
context.orderStatus=[]
for(i=0;i<orderStatus.length;i++){
    context.orderStatus.push(orderStatus[i])
    var order=context.orderStatus[i]
    order["id"]=context.orderIds[i]
}
context.orderStatus = context.orderStatus.filter(order => order.statusCode === 200);
// context.orderStatus = context.orderStatus.map(item => {
//         const { statusCode, index, id } = item;
//         const resultObj = item.result;
//         const resultArray = Object.keys(resultObj).map(key => {
//             return {
//                 id: key,
//                 status: resultObj[key]
//             };
//         });
//         return {
//             statusCode: statusCode,
//             result: resultArray,
//             index: index,
//             id: id
//         };
//     });
for(i=0;i<context.orderStatus.length;i++){
    parsedJSON=context.orderStatus[i].result
var transformedArray = [];
  for (let key in parsedJSON) {
    if (parsedJSON.hasOwnProperty(key)) {
      var newObj = {
        id: key,
        ...parsedJSON[key]
      };
      transformedArray.push(newObj);
    }
  }
  context.orderStatus[i].result=transformedArray
}
    orders=context?.getOrdersDetails.response.body.orders||context?.getSpecificOrder.response.body
for(i=0;i<context.orderStatus.length;i++){
    order=orders.find(order=>order.id==context.orderStatus[i].id)
    // koreDebugger.log(JSON.stringify(order))
    // koreDebugger.log(context.orderStatus[i].id)
    items=order.line_items
    context.orderStatus[i].created_at=order.created_at
    for(j=0;j<context.orderStatus[i].result.length;j++){
        item=items.find(item=>item.id==context.orderStatus[i].result[j].id)
        context.orderStatus[i].result[j].name=item.name
        
    }
}
 context.orderStatus = context.orderStatus.filter(order => {
    order.result = order.result.filter(item => ["Cancelled", "Return Rejected", "Return In Progress", "Return Requested", "Returned", "Return Declined"].includes(item.status));
    return order.result.length > 0;
});

    }


    const chckValidOrderId = () => {
        orders=context.getCancelableItems.response.body.eligibleOrders
var arr = []
if(context.entities?.hIvrOrderId){
context.validCancelableOrder=false    
if(orders.find(order=>order.id % 10000==parseInt(context.entities?.hIvrOrderId))){
    context.validCancelableOrder=true
}
}
names=[]
for(i=0;i<orders.length;i++){
for(j=0;j<orders[i].line_items.length;j++){
    names.push(orders[i].line_items[j].name)
    arr.push({
            "orderDate": orders[i].created_at.split("T")[0] , 
            "productTitle": orders[i].line_items[j].name,
            "orderId" : orders[i]?.id,
            "lineItem" : orders[i].line_items[j].id
        })
}
}
context.productNames=convertToEnumObj(names)
context.session.BotUserSession['data'] = arr

    }


    const resetItems = () => {
        delete context.entities.showTitleMatchItems
context.displayOrdersCount++
    }


    const isStroreFrontTokenExists = () => {
        const resp = context.getStoreFrontToken?.response?.body?.storefront_access_tokens;
bus = context.session?.BotUserSession
for(i=0;i<resp.length ; i++){
      if(resp[i].title == env.shopifyStoreName){
          bus.ShopifyAdmin["storeFrontToken"] = resp[i].access_token
    }
}
    }


    const orderStatusMsg = () => {
        // var trackingInfo = context.getOrderTrackingInfo.response.body
// context.orderStatusAckNodeTxt = "The order name" +context.ItemName+", placed on "+context.orderDate+"is "+trackingInfo[context.lineItemId].status


var trackingInfo = context.getOrderTrackingInfo.response.body;

// Ensure that the line item ID exists within trackingInfo before accessing its status
if(trackingInfo && context.lineItemId && trackingInfo[context.lineItemId]) {
    context.orderStatusAckNodeTxt = "The order name " + context.ItemName + ", placed on " + context.orderDate + " is " + trackingInfo[context.lineItemId].status;
} else {
    // Handle the case where the status cannot be retrieved
    context.orderStatusAckNodeTxt = "The order name " + context.ItemName + ", placed on " + context.orderDate + " has an unknown status.";
}

    }


    const parseGenAi = () => {
        var genAiResp = context?.AI_Assisted_Dialogs?.genainodecancelorder?.entities[0]
// koreDebugger.log(genAiResp)
if(genAiResp?.LineItemID && genAiResp?.Order_ID){
    context.caluculatedOrder = JSON.stringify({
         "orderId" : genAiResp?.Order_ID
    })
    context.lineItemId = genAiResp?.LineItemID
    context.ItemName = genAiResp?.Product_Title
}


koreDebugger.log(context.caluculatedOrder)
    }


    const prepSMSPayload = () => {
        var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
// Determine SKU by checking if a space exists in the search results, and split accordingly.

if(eCommercePlatform == "Shopify") {
    if(context.parentIntent === "Search and Order a Product") {
        var bus=context.session.BotUserSession;
        //Retrieve the order number from the createAnOrder response body.
        var orderNumber=context.createAnOrder.response.body?.order?.id;
        // Map line items to their titles and join them into a string.
        let lineItems = context.orderPayload.order.line_items.map(item=>item.title);
        lineItems = lineItems.join(", ");
        // Construct payload with phone number and confirmation message.
        payload = {
              "phone": bus.UserInfo.phone,
              "message":  `${env.displayStoreName} Order Confirmation : ${orderNumber}\n\nHello ${bus.UserInfo.first_name} ${bus.UserInfo.last_name},\nThank you for choosing ${env.displayStoreName}! Your order for ${lineItems} has been successfully placed and is now being processed.`
            };
        context.smsBody = JSON.stringify(payload);
        koreDebugger.log(context.smsBody)
    }
    if(context.parentIntent === "Cancel Order" || context.parentIntent === "IVR Cancel Order") {
        var bus = context.session.BotUserSession?.UserInfo
        payload = {
          "phone": bus?.phone,
          "message":  `Your Order has been cancelled`
        };
        context.smsBody = JSON.stringify(payload);
    }
    
} else if(eCommercePlatform == "SFCC") {
    context.smsNotNeeded = true;  
}
    }


    const trackingPayload = () => {
        context.orderId  = context?.orderDetails?.id
    }


    const filterBasedOnEntityExtraction = () => {
        context.isIdEligible = false

if (context?.GenerativeAINode?.GenAIPromptCancelAnOrder?.text) {
    var text = context.GenerativeAINode.GenAIPromptCancelAnOrder.text
    var jsonString = text.replace(/^```json\n/, '').replace(/\n```$/, '');
    var parsedData = JSON.parse(jsonString);
    //if (parsedData.entities.length == 1) {
        var orderId = parsedData.entities[0].Order_ID[0];
        koreDebugger.log("Order id is " + orderId)
        if (orderId != "[null]")
            context.entities.orderId = orderId
    //}
}

// Retrieve eligible orders from the context's getCancelableItems method, if it exists
context.eligibleOrders =  context.getCancelableItems?.response?.body?.eligibleOrders
if(context.entities?.productTitles){
    eligibleOrder = []
    for(i=0 ; i<context?.eligibleOrders.length ; i++){
         eligibleLineItems = []
        for(j=0;j<context.eligibleOrders[i].line_items.length ; j++){
            lineItem = context.eligibleOrders[i].line_items[j]
            if(context.entities.productTitles == lineItem.name){
                eligibleLineItems.push(lineItem)
            }
        }
        // If there are eligible line items, construct a new order object with them
        if(eligibleLineItems.length!=0){
        eligibleOrder.push({
            "id": context.eligibleOrders[i].id,
            "created_at" : context.eligibleOrders[i].created_at ,
            "current_subtotal_price":context.eligibleOrders[i].current_subtotal_price,
            "line_items" : eligibleLineItems
        })
        }
    }
 // If there are eligible orders, updating the context with these orders
    if(eligibleOrder.length !=0){
        context.eligibleOrders = eligibleOrder
    }
}
// Alternatively, check if an order ID is present in the context entities
else if(context.entities?.orderId){
    for(i=0;i<context?.eligibleOrders.length ;i++){
        if(context.entities.orderId == context.eligibleOrders[i].id){
            context.entities.showOrders = context.eligibleOrders[i].id
            context.eligibleOrders = [context.eligibleOrders[i]]
            context.isIdEligible = true
        }
    }
}

    }


    const resetRefundOrderId = () => {
        delete context.entities.displayReturnAndCancelOrders
context.displayCount=context.displayCount+3

    }


    const isIntentedFlowDone = () => {
        if(context.entities?.hActionDecider=="Delete Address"){
    delete context.entities.hActionDecider
}
    }


    const prefillUpdateForm = () => {
        if(context.entities.showAllDeliveryAddresses){
    var info=context.fetchDeliveryAddressDetails?.response?.body?.addresses.find(address => (address.id === parseInt(context.entities.showAllDeliveryAddresses)) || 
    address.id === context.entities.showAllDeliveryAddresses)
}
else{
    var info = context.fetchDeliveryAddressDetails.response.body.addresses[0];
    
}
koreDebugger.log('info'+info);
context.prefillForms = {
    "AddressDetails": {
        "fields": {
            "addressLine1": info?.address1,
            // "addressLine2": info?.address2,
            "city": info?.city,
            "state":info?.address2,
            "country": info?.country,
            "zipcode":info?.zip
        }
    }
}
    }


    const addAddressPayload = () => {
        var BUS=context.session.BotUserSession
context.addAddressPayload=JSON.stringify({
    "address": {
        "address1": context.forms?.AddressDetails.addressLine1,
        "address2": context.forms?.AddressDetails.state,
        "city": context.forms?.AddressDetails.city,
        "first_name": BUS.UserInfo.first_name,
        "last_name": BUS.UserInfo.last_name,
        "phone": BUS.UserInfo.phone,
        "zip": context.forms?.AddressDetails.zipcode,
        "name": BUS.UserInfo.first_name+BUS.UserInfo.last_name,
        // "province":context.forms.AddressDetails?.state,
        "country":context?.forms.AddressDetails?.country
    }
});
if(context.entities?.hActionDecider=="Add Address"){ //Required in Update profile information dialog
    delete context.entities.hActionDecider
}
koreDebugger.log(context.addAddressPayload)
    }


    const cnstrtSignUpPayload = () => {
        context.signUp = JSON.stringify({
    "customer": {
        "first_name": context.forms.SignUp.Firstname,
        "last_name": context.forms.SignUp.Lastname,
        "email": context.forms.SignUp.Email,
        "phone": context.forms.SignUp.PhoneNumber,
        "verified_email": true,
        "password": context.forms.SignUp.Password,
        "password_confirmation": context.forms.SignUp.Password,
        "send_email_welcome": true
    }
})
    }


    const Script0018 = () => {
        var id = context.calculatedOrders.response.body?.data?.orderEditBegin?.calculatedOrder?.id
var bus  = context.session.BotUserSession
var calculatedId = id.split('/').pop()
var cancelReason = context.entities.cancelReason
var lineItemPayload = [{
        "id": "gid://shopify/CalculatedLineItem/"+context.lineItemId,
        "quantity": 0
    }]

context.editOrder = JSON.stringify({
    "calculatedOrderId" : calculatedId,
    "lineItems":lineItemPayload,
    "cancelreason" : cancelReason
})
    }


    const prepDocumentSearch = () => {
        var bus = context.session.BotUserSession;
context.actualQuery = bus.lastMessage?.messagePayload?.message?.body || bus.lastMessage?.messagePayload?.message?.text || " user input not found ";
let bodyForSearchAssist = {
    "query": context.actualQuery,
    "queryType": "relevanceWithMetaFilter"
}
context.bodyForSearchAssist = JSON.stringify(bodyForSearchAssist);
    }


    const prepReturnOrderEnums = () => {
        var orders=context.getOrdersDetails.response.body.orders
context.orderIds=[]
        context.orderIds.push(convertToEnumObj(orders.map((order) => order.id)))
context.orderIds.push({
    name: 'Show More',
    val: 'Show More',
    syn: [ "\"Show More\"" ]
})
context.orderIds=context.orderIds.flatMap(innerArray => innerArray)
    }


    const sfccParseOrderDetails = () => {
        var ordersData = context.sfccGetOrdersDetails?.response?.body?.orders;
context.isSpecificOrder = false
var sku = []
var specificOrder = context.sfccGetSpecificOrder?.response?.body
if(specificOrder?.order?.id && specificOrder?.order?.contact_email == context.session.BotUserSession?.UserInfo?.email){
    var ordersData = [specificOrder?.order]
    context.orderId = specificOrder?.order?.id 
    context.isSpecificOrder = true
    context.orderDetails = specificOrder?.order
}
for(i=0;i<ordersData.length ; i++){
    for(j=0 ; j<ordersData[i].line_items.length ; j++){
        if(!sku.includes(ordersData[i].line_items[j].sku)){
        sku.push(ordersData[i].line_items[j].sku)
        }
    }
    
}


context.skuQuery = JSON.stringify({
    "skus":sku
})


koreDebugger.log(sku)

context.showMoreClickCount =0
    }

