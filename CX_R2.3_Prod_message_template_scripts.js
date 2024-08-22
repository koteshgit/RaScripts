var processQuery = context.processQuery?.response?.body;https://bots.kore.ai/
var classifyQuery = context.classifyQuery?.response?.body;
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
if (eCommercePlatform == "Shopify") {
    if (classifyQuery?.query_type == "PRODUCT_SEARCH") {
        var relevent = processQuery?.relavant || [];
        var lessRelevent = processQuery?.lessRelavant;
        var productList = relevent.concat(lessRelevent);
        var message = {
            type: "template",
            payload: {
                template_type: "retailAssistcarousel",
                carousel_type: "stacked",
                elements: [],
            },
        };
        elements = [];

        for (i = 0; i < productList.length; i++) {
            elements.push({
                thumbnail: productList[i].metadata.product_image,
                qty: "1",
                button1: {
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNjI1IDhIMTIuMzc1IiBzdHJva2U9IiNEMEQ1REQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                    buttonTitle: "Decrement",
                    type: "postback",
                    value: "Delete",
                    buttonStyle: {
                        "border-radius": "4px",
                        border: "1px solid #D0D5DD",
                        background: "#F9FAFB",
                    },
                },
                button2: {
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguMDAwMTYgMy4zMzMzNFYxMi42NjY3TTMuMzMzNSA4LjAwMDAxSDEyLjY2NjgiIHN0cm9rZT0iI0ZFRkVGRSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
                    buttonTitle: "increment",
                    type: "postback",
                    value: "increment",
                    buttonStyle: {
                        color: "#F9FAFB",
                        "border-radius": "4px",
                        border: "1px solid #12B76A",
                        background: "#12B76A",
                    },
                },
                "details": {
                    "title": "Best Seller",
                    //"subTitle": productList[i].metadata.ratings + "★",
                    "titleStyle": {
                        "background-color": "#1D2939",
                        "color": "#fff",
                        "border-radius": "4px",
                        "font-size": "10px"
                    },
                    "subTitleStyle": {
                        "background-color": "#12B76A",
                        "color": "#fff",
                        "border-radius": "4px",
                        "font-size": "10px"
                    }
                },
                items: [
                    {
                        title: productList[i].metadata.brand,
                        subTitle: productList[i].metadata.title,
                        value: getFormattedCurrency(productList[i].metadata.price),
                        itemID: "SKU: " + productList[i].metadata.sku,
                        "titleStyles": {
                            "font-size": "12px",
                            "font-weight": "600",
                            "color": "#101828"
                        },
                        "subTitleStyle": {
                            "font-size": "14px",
                            "font-weight": "700",
                            "color": "#101828"
                        },
                        "valueStyle": {
                            "font-size": "14px",
                            "font-weight": "600",
                            "color": "#16A34A"
                        },
                        "summaryTextStyle": {
                            "font-size": "12px",
                            "font-weight": "400",
                            "color": "#344054"
                        },
                    },
                ],
                buttons: [
                    {
                        type: "postback",
                        title: "Add To Cart",
                        payload: productList[i].metadata.sku + " Add To Cart ",
                        value: "Adding To Cart",
                        qty: 0,
                        buttonTitle: "Add To Cart",
                        buttonStyle: {
                            background: "#FFF",
                            color: "#344054",
                            "border-raidus": "4px",
                            border: "1px solid #D0D5DD",
                        },
                    },
                    {
                        type: "postback",
                        title: "Buy now",
                        payload: "Buy Now " + productList[i].metadata.sku,
                        value: "Buying Now",
                        qty: 0,
                        buttonTitle: "Buy Now",
                        buttonStyle: {
                            background: "#344054",
                            color: "#FFF",
                            "border-raidus": "4px",
                            border: "1px solid #344054",
                        },
                    },
                ],
                sliderStyle: {
                    width: "90%",
                },
            });
        }

        message.payload.elements = elements;

        print(JSON.stringify(message));
    }

    else {
        print(processQuery?.presentation?.content)

    }
} else if (eCommercePlatform == "SFCC") {
    if (classifyQuery?.query_type == "PRODUCT_SEARCH") {
        var relevent = processQuery?.relavant || [];
        var lessRelevent = processQuery?.lessRelavant;
        var productList = relevent.concat(lessRelevent);
        var message = {
            type: "template",
            payload: {
                template_type: "retailAssistcarousel",
                carousel_type: "stacked",
                elements: [],
            },
        };
        elements = [];

        for (i = 0; i < productList.length; i++) {
            elements.push({
                thumbnail: productList[i].metadata.product_image,
                qty: "1",
                button1: {
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNjI1IDhIMTIuMzc1IiBzdHJva2U9IiNEMEQ1REQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                    buttonTitle: "Decrement",
                    type: "postback",
                    value: "Delete",
                    buttonStyle: {
                        "border-radius": "4px",
                        border: "1px solid #D0D5DD",
                        background: "#F9FAFB",
                    },
                },
                button2: {
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguMDAwMTYgMy4zMzMzNFYxMi42NjY3TTMuMzMzNSA4LjAwMDAxSDEyLjY2NjgiIHN0cm9rZT0iI0ZFRkVGRSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
                    buttonTitle: "increment",
                    type: "postback",
                    value: "increment",
                    buttonStyle: {
                        color: "#F9FAFB",
                        "border-radius": "4px",
                        border: "1px solid #12B76A",
                        background: "#12B76A",
                    },
                },
                "details": {
                    "title": "Best Seller",
                    //"subTitle": productList[i].metadata.ratings + "★",
                    "titleStyle": {
                        "background-color": "#1D2939",
                        "color": "#fff",
                        "border-radius": "4px",
                        "font-size": "10px"
                    },
                    "subTitleStyle": {
                        "background-color": "#12B76A",
                        "color": "#fff",
                        "border-radius": "4px",
                        "font-size": "10px"
                    }
                },
                items: [
                    {
                        title: productList[i].metadata.brand,
                        subTitle: productList[i].metadata.title,
                        value: getFormattedCurrency(productList[i].metadata.price),
                        itemID: "SKU: " + productList[i].metadata.sku,
                        "titleStyles": {
                            "font-size": "12px",
                            "font-weight": "600",
                            "color": "#101828"
                        },
                        "subTitleStyle": {
                            "font-size": "14px",
                            "font-weight": "700",
                            "color": "#101828"
                        },
                        "valueStyle": {
                            "font-size": "14px",
                            "font-weight": "600",
                            "color": "#16A34A"
                        },
                        "summaryTextStyle": {
                            "font-size": "12px",
                            "font-weight": "400",
                            "color": "#344054"
                        },
                    },
                ],
                buttons: [
                    {
                        type: "postback",
                        title: "Add To Cart",
                        payload: productList[i].metadata.sku + " AddToCart ",
                        value: "Adding To Cart",
                        qty: 0,
                        buttonTitle: "Add To Cart",
                        buttonStyle: {
                            background: "#FFF",
                            color: "#344054",
                            "border-raidus": "4px",
                            border: "1px solid #D0D5DD",
                        },
                    },
                    {
                        type: "postback",
                        title: "Buy now",
                        payload: "Buy Now " + productList[i].metadata.sku,
                        value: "Buying Now",
                        qty: 0,
                        buttonTitle: "Buy Now",
                        buttonStyle: {
                            background: "#344054",
                            color: "#FFF",
                            "border-raidus": "4px",
                            border: "1px solid #344054",
                        },
                    },
                ],
                sliderStyle: {
                    width: "90%",
                },
            });
        }

        message.payload.elements = elements;

        print(JSON.stringify(message));
    }

    else {
        print(processQuery?.presentation?.content)

    }
}


//(classifyQuery?.query_type == "PRODUCT_COMPARISON")
print("heello");
print("Hi");
print("How are you");
// if(context.productDetails.itemTitle.split(" ").length<=4){
// txt="You will receive {{context.orderPayload.order.line_items[0].title}} by *"+getFormattedDate(new Date((new Date()).getTime() + 5 * 24 * 60 * 60 * 1000))+"*"
// }else{
// title=context.productDetails.itemTitle.split(" ")
// txt="You will receive "+title[0]+" "+title[1]+" "+title[title.length-2]+" "+title[title.length-1]+" by *"+getFormattedDate(new Date((new Date()).getTime() + 5 * 24 * 60 * 60 * 1000))+"*"
// }

txt = "Your order is expected to be delivered by *"+getFormattedDate(new Date((new Date()).getTime() + 5 * 24 * 60 * 60 * 1000))+"*."
print(txt)
// title = "what's the one-time code";
// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "otpValidationTemplate",
//         "title": title,
//         "sliderView": true,
//         "description": "Please Enter your 4 digit OTP below",
//         // "mobileNumber": "+91******8161",
//         // "piiReductionChar": '#', // Special charater that is used for PII Redaction
//         "pinLength": 4,// Specifies the length of the PIN, it should be minimun 4
//         "otpButtons": [
//             {
//                 title: "Verify One-Time-Code",
//                 type: "submit"
//             },
//             {
//                 title: "Cancel",
//                 type: "resend",
//                 payload : "cancel"
//             }
//         ]
//     }
// };
//     message.payload["mobileNumber"] = maskMobileNumber(context.entities?.phoneNumber)
// print(JSON.stringify(message));

print("What's the one-time code?");
var quickReplies = ["Log in", "Sign Up"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Sorry it seems that you are not logged in.",
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    /* Uncomment this if both text and image needs to displayed for the  quick reply button
     var quickReply = {
     "content_type":"text",
     "title":quickReplies[i],
     "payload":"payload2",
     "image_url": "url of the image
     };
     */
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));

var info = ["Log in", "Sign Up"];
var message = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "button",
            "text": "Sorry it seems that you are not logged in.",
            "buttons": []
        }
    }
};

for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform      
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i],
    }
    message.attachment.payload.buttons.push(button);
}
print(JSON.stringify(message));

var msg = {
 	  "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/text",
      "text": "How may I assist you today? 😊"
};
print(JSON.stringify(msg));
txt="I found "+context.lineItemId.length
orders=context.getCancelableItems.response.body.eligibleOrders
cnt = 0
for(i=0;i<orders.length;i++){
    for(j=0;j<orders[i].line_items.length;j++){
        if(context.lineItemId.includes(orders[i].line_items[j].id)){
            txt=txt+","+(cnt+1)+" "+orders[i].line_items[j].name+" Placed on "+orders[i].created_at.split("T")[0]+" "
            cnt++
        }
    }
}
txt=txt+" Which item do you want to cancel?"
print(txt)
txt="Great. I'm sending you a return code with instructions. You should see it in your email soon."
if(context.entities.modeOfReturn=="Return by Mail"){
    txt="Great. I'm sending you a shipping label with instructions. You should see it in your email soon."
}
print(txt)
text = "Hey there! Welcome to "+env.displayStoreName+". I'm Genie, your virtual assistant."
print(text)
var message = {
    "activities": [{
            "type": "event",
            "name": "config",
            "sessionParams": {
                "sttContextId": "2dc1b471-ca52-4474-bd80-5a1cedbb673d",
                // "sttContextId": "68f4966c-6f83-41b4-b872-a87ab75d1e10",
                "bargeIn": true
               },
            "id": new Date().getTime() + 200,
            "timestamp": new Date().toISOString()
        },
        {
            "type": "message",
            "text": "Hi! Thanks for calling "+{{env.displayStoreName}}+". I'm Genie, your virtual assistant.",
            "timestamp": new Date().toISOString(),
            "id": new Date().getTime()
        },

    ]
};
print(JSON.stringify(message.activities[1].text));
var msg = {
 	"infobipWhatsAppMessageEndpoint":"/whatsapp/1/message/text",
    "text": content.RA_welcomeMessage
};
print(JSON.stringify(msg));

orderId=context.entities.ivrOrderId||context.entities.hIvrOrderId
var order=context.orderStatus.find(order=>order.id==orderId)
cancelCount=order.result.filter(item=>item.status=="Cancelled").length
returnCount=order.result.length-cancelCount
txt="You "

if(cancelCount==0){
    txt= txt+"returned "+returnCount+" in this order including "+order.result[0].name+" Would you like an update on all, or a specific item?"
}
if(returnCount==0){
    txt=txt+"canceled "+cancelCount+" in this order including "+order.result[0].name+" Would you like an update on all, or a specific item?"
}
 txt=txt+"returned or canceled "+context.orderStatus[0].result.length+" in this order including "+order.result[0].name+" Would you like an update on all, or a specific item?"

print(txt)
var info = ["Continue Shopping", "View Cart"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Added to the cart.",
        "subText": "Added to the cart.",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));

orders=context.orderStatus
        for(i=0;i<orders.length;i++){
            item=orders[i].result.find(item=>item.id==parseInt(context.lineItemsIds[0]))
            if(item){
                if(item.status=="Cancelled"){
                    txt="I see the cancelation request you raised for I "+orders[i].result.find(item=>item.id==parseInt(context.lineItemsIds[0])).name+", on "+getFormattedDate(orders[i].created_at)+". I Would you like an update on I the status of this particular order?" 
                }else{
                    txt="I see the return request you raised for I "+orders[i].result.find(item=>item.id==parseInt(context.lineItemsIds[0])).name+", on "+getFormattedDate(orders[i].created_at)+". I Would you like an update on I the status of this particular order?" 
                }
            }
        }
print(txt)
var info=context.session.BotUserSession.UserInfo
var platformName=JSON.parse(env.commercePlatformConfig).platformName
var image = "https://retail-assist.s3.amazonaws.com/resources/images/RetailAssist/profile.png"

if(platformName=="SFCC"){
    elements=[{
                "icon": image,
                "title":"Name",
                "flag":"addressTemplate",
                "values": [
                    {
                        "title":info.first_name +" "+info.last_name,
                        "style": {
                            "color": "#344054"
                        }
                    }
                ],
                "actions":{
                    "type": "postback",
                    "title": "Edit Name",
                    "value":  "Name"
               }
            }]
}else if(platformName=="Shopify"){
    elements=[{
                "icon": image,
                "title":"Name",
                "flag":"addressTemplate",
                "values": [
                    {
                        "title":info.first_name +" "+info.last_name,
                        "style": {
                            "color": "#344054"
                        }
                    }
                ],
                "actions":{
                    "type": "postback",
                    "title": "Edit Name",
                    "value":  "Name"
               }
            },
            {
                "icon": image,
                "title": "Email ID",
                "flag":"addressTemplate",
                 "values": [
                    {
                        "title":info.email,
                        "style": {
                            "color": "#344054"
                        }
                    }
                ],
                "actions":{
                    "type": "postback",
                    "title": "Edit email",
                    "value":  "Email"
               }
            },
             {
                "icon": image ,
                "title": "Phone Number",
                "flag":"addressTemplate",
                 "values": [
                    {
                        "title":info.phone,
                        "style": {
                            "color": "#344054"
                        }
                    }
                ],
                "actions":{
                    "type": "postback",
                    "title": "Edit phone number",
                    "value":  "Phone Number"
               }
            }]
}			
var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Personal Information",
        "showMore": "true",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": elements,
        // "buttons": []
    }
}


print(JSON.stringify(message));

var info = context.session.BotUserSession.UserInfo;
var image = "https://retail-assist.s3.amazonaws.com/resources/images/RetailAssist/profile.png";
var message = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "button",
            "text": "Personal Information",
            "buttons": []
        }
    }
};

var elements = [{
        "icon": image,
        "title": "Name",
        "flag": "addressTemplate",
        "values": [{
            "title": info.first_name + " " + info.last_name,
            "style": {
                "color": "#344054"
            }
        }],
        "actions": {
            "type": "postback",
            "title": "Edit Name",
            "value": "Name"
        }
    },
    {
        "icon": image,
        "title": "Email ID",
        "flag": "addressTemplate",
        "values": [{
            "title": info.email,
            "style": {
                "color": "#344054"
            }
        }],
        "actions": {
            "type": "postback",
            "title": "Edit email",
            "value": "Email"
        }
    },
    {
        "icon": image,
        "title": "Phone Number",
        "flag": "addressTemplate",
        "values": [{
            "title": info.phone,
            "style": {
                "color": "#344054"
            }
        }],
        "actions": {
            "type": "postback",
            "title": "Edit phone number",
            "value": "Phone Number"
        }
    }
];

elements.forEach(function(element) {
    message.attachment.payload.buttons.push({
        "type": "postback",
        "title": element.title,
        "payload": element.actions.value
    });
});

print(JSON.stringify(message));

I am sorry, you cannot exchange your order. Please contact customer support.
var info = context.fetchDeliveryAddressDetails.response.body.addresses;
// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "list",
//         "elements": [],
//         "buttons": [
//             {
//                 "title": "View More",
//                 "type": "postback",
//                 "payload": "View More"
//             }
//         ]
//     }
// };
// var element = {
//         "title": info.address1+info.address2+","+info.city+info.country,
//         "subtitle": "Zipcode:"+info.zip ,
//     };
//     message.payload.elements.push(element)
// print(JSON.stringify(message));

var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Default Address",
        "showMore": "true",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": [],
        // "buttons": []
    }
}

var elements = []
for(i=0;i<info.length ;i++){
    var address = {
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMCAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTk5NjcgMTguODMzM0MxMC44MzMgMTQuNjY2NyAxNi42NjYzIDE0LjE4MTkgMTYuNjY2MyA4LjgzMzMyQzE2LjY2NjMgNS4xNTE0MiAxMy42ODE2IDIuMTY2NjYgOS45OTk2NyAyLjE2NjY2QzYuMzE3NzggMi4xNjY2NiAzLjMzMzAxIDUuMTUxNDIgMy4zMzMwMSA4LjgzMzMyQzMuMzMzMDEgMTQuMTgxOSA5LjE2NjM0IDE0LjY2NjcgOS45OTk2NyAxOC44MzMzWiIgc3Ryb2tlPSIjMzQ0MDU0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05Ljk5OTY3IDExLjMzMzNDMTEuMzgwNCAxMS4zMzMzIDEyLjQ5OTcgMTAuMjE0IDEyLjQ5OTcgOC44MzMzMkMxMi40OTk3IDcuNDUyNjEgMTEuMzgwNCA2LjMzMzMyIDkuOTk5NjcgNi4zMzMzMkM4LjYxODk2IDYuMzMzMzIgNy40OTk2NyA3LjQ1MjYxIDcuNDk5NjcgOC44MzMzMkM3LjQ5OTY3IDEwLjIxNCA4LjYxODk2IDExLjMzMzMgOS45OTk2NyAxMS4zMzMzWiIgc3Ryb2tlPSIjMzQ0MDU0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                "title": info[i].address1 +" "+ info[i].address2 ,
                "flag":"addressTemplate", 
                "values": [
                    {
                        "title":info[i].city+","+info[i].country+" "+info[i].zip,
                        "style": {
                            "color": "#344054"
                        }
                    }
                ]
            }
            
        // if(context.entities.hActionDecider == "Modify Address"){
        //     address["actions"]={
        //             "type": "postback",
        //             "title": info[i].city+", "+info[i].country,
        //             "value":  "Update "+info[i].id.toString()
        //     }
        //     message.payload.title = "Default Address"
        // }
        // if(context.entities.hActionDecider == "Delete Address"){
        //      address["actions"]={
        //             "type": "postback",
        //             "title": info[i].city+", "+info[i].country,
        //             "value":  "Delete "+info[i].id.toString()
        //     }
        // message.payload.title = "Default Address"
        // }
    elements.push(address)
}

message.payload.elements = elements
print(JSON.stringify(message))

var info = context.fetchDeliveryAddressDetails.response.body.addresses;
var message = {
  "text": "Default Address",
  "quick_replies": []
};

for (var i = 0; i < info.length; i++) {
  var title = info[i].address1 + " " + info[i].address2;
  var quick_reply = {
    "content_type": "text",
    "title": title,
    "payload": "payload1" // <-- Check this line
  };
  message.quick_replies.push(quick_reply);
}

print(JSON.stringify(message));

var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName

if(eCommercePlatform == "Shopify") {

    var metaData = context.getConsolidateQuery?.response?.body?.metaData || [];
    const genResponse = (context.showResult.response?.body?.result?.sku || '').split(',');
    
    const genAiRecommend = metaData.filter(item => genResponse.includes(item.sku));
    const arr = metaData.filter(item => !genResponse.includes(item.sku));
    
    var metaData = [...genAiRecommend, ...arr];
    
    
    var message = 
    {
        "type": "template",
        "payload": {
            "template_type": "retailAssistcarousel",
            "carousel_type": "stacked",
            "elements": []
        }
    }
    
    for (const productSku in metaData) {
        if (metaData.hasOwnProperty(productSku)) {
            const productInfo = metaData[productSku];
            // koreDebugger.log("features" + productInfo.keyFeatures);
            let elementItem = {
                "thumbnail": productInfo.product_image,
                "qty": "1",
                "button1": {
                    "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNjI1IDhIMTIuMzc1IiBzdHJva2U9IiNEMEQ1REQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                    "buttonTitle": "Decrement",
                    "type": "postback",
                    "value": "Delete",
                    "buttonStyle": {
                        "border-radius": "4px",
                        "border": "1px solid #D0D5DD",
                        "background": "#F9FAFB"
                    },
                },
                "button2": {
                    "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguMDAwMTYgMy4zMzMzNFYxMi42NjY3TTMuMzMzNSA4LjAwMDAxSDEyLjY2NjgiIHN0cm9rZT0iI0ZFRkVGRSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
                    "buttonTitle": "increment",
                    "type": "postback",
                    "value": "increment",
                    "buttonStyle": {
                        "color": "#F9FAFB",
                        "border-radius": "4px",
                        "border": "1px solid #12B76A",
                        "background": "#12B76A"
                    },
                },
                "details": {
                    "title": "Best Seller",
                    "subTitle": productInfo.ratings + "★",
                    "titleStyle": {
                        "background-color": "#1D2939",
                        "color": "#fff",
                        "border-radius": "4px",
                        "font-size": "10px"
                    },
                    "subTitleStyle": {
                        "background-color": "#12B76A",
                        "color": "#fff",
                        "border-radius": "4px",
                        "font-size": "10px"
                    }
                },
                "items": [
                    {
                        "title": productInfo.brand,
                        "subTitle": productInfo.title,
                        "value": getFormattedCurrency(productInfo.price),
                        "itemID": "SKU: " + productInfo.modelCode,
                        "titleStyles": {
                            "font-size": "12px",
                            "font-weight": "600",
                            "color": "#101828"
                        },
                        "subTitleStyle": {
                            "font-size": "14px",
                            "font-weight": "700",
                            "color": "#101828"
                        },
                        "valueStyle": {
                            "font-size": "14px",
                            "font-weight": "600",
                            "color": "#16A34A"
                        },
                        "summaryTextStyle": {
                            "font-size": "12px",
                            "font-weight": "400",
                            "color": "#344054"
                        }
                    }
                ],
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Add To Cart",
                        "payload": productInfo.modelCode + " Add To Cart ",
                        "value": "Adding To Cart" ,
                        "qty" : 0 ,
                        "buttonTitle": "Add To Cart",
                        "buttonStyle": {
                            "background": "#FFF",
                            "color": "#344054",
                            "border-raidus": "4px",
                            "border": "1px solid #D0D5DD"
                        }
                    },
                    {
                        "type": "postback",
                        "title": "Buy now",
                        "payload": "Buy Now "+productInfo.modelCode ,
                        "value": "Buying Now" ,
                        "qty": 0,
                        "buttonTitle": "Buy Now",
                        "buttonStyle": {
                            "background": "#344054",
                            "color": "#FFF",
                            "border-raidus": "4px",
                            "border": "1px solid #344054"
                        }
                    }
                ],
                "sliderStyle": {
                    "width": "90%"
                }
            };
            if(productInfo?.keyFeatures && productInfo?.keyFeatures[0]){
                let summaryText = "Features: " + productInfo?.keyFeatures[0];
                if(productInfo?.keyFeatures[2]) {
                    summaryText += " , " + productInfo?.keyFeatures[2]
                }
                elementItem.items[0].summaryText = summaryText;
            }
            else {
                let summaryText = "Features:  NA ";
                elementItem.items[0].summaryText = summaryText;
            }
            message.payload.elements.push(elementItem);
    
    
        }
    }
    
    print(JSON.stringify(message));

    
} else if(eCommercePlatform == "SFCC") {
    var metaData = context.getConsolidateQuery?.response?.body?.metaData || [];
    const genResponse = (context.showResult.response?.body?.result?.sku || '').split(',');
    
    const genAiRecommend = metaData.filter(item => genResponse.includes(item.sku));
    const arr = metaData.filter(item => !genResponse.includes(item.sku));
    
    var metaData = [...genAiRecommend, ...arr];
    
    
    var message = 
    {
        "type": "template",
        "payload": {
            "template_type": "retailAssistcarousel",
            "carousel_type": "stacked",
            "elements": []
        }
    }
    
    for (const productSku in metaData) {
        if (metaData.hasOwnProperty(productSku)) {
            const productInfo = metaData[productSku];
            // koreDebugger.log("features" + productInfo.keyFeatures);
            let elementItem = {
                "thumbnail": productInfo.product_image,
                "qty": "1",
                "button1": {
                    "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNjI1IDhIMTIuMzc1IiBzdHJva2U9IiNEMEQ1REQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                    "buttonTitle": "Decrement",
                    "type": "postback",
                    "value": "Delete",
                    "buttonStyle": {
                        "border-radius": "4px",
                        "border": "1px solid #D0D5DD",
                        "background": "#F9FAFB"
                    },
                },
                "button2": {
                    "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguMDAwMTYgMy4zMzMzNFYxMi42NjY3TTMuMzMzNSA4LjAwMDAxSDEyLjY2NjgiIHN0cm9rZT0iI0ZFRkVGRSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
                    "buttonTitle": "increment",
                    "type": "postback",
                    "value": "increment",
                    "buttonStyle": {
                        "color": "#F9FAFB",
                        "border-radius": "4px",
                        "border": "1px solid #12B76A",
                        "background": "#12B76A"
                    },
                },
                "details": {
                    "title": "Best Seller",
                    "subTitle": productInfo.ratings + "★",
                    "titleStyle": {
                        "background-color": "#1D2939",
                        "color": "#fff",
                        "border-radius": "4px",
                        "font-size": "10px"
                    },
                    "subTitleStyle": {
                        "background-color": "#12B76A",
                        "color": "#fff",
                        "border-radius": "4px",
                        "font-size": "10px"
                    }
                },
                "items": [
                    {
                        "title": productInfo.brand,
                        "subTitle": productInfo.title,
                        "value": getFormattedCurrency(productInfo.price),
                        "itemID": "SKU: " + productInfo.modelCode,
                        "titleStyles": {
                            "font-size": "12px",
                            "font-weight": "600",
                            "color": "#101828"
                        },
                        "subTitleStyle": {
                            "font-size": "14px",
                            "font-weight": "700",
                            "color": "#101828"
                        },
                        "valueStyle": {
                            "font-size": "14px",
                            "font-weight": "600",
                            "color": "#16A34A"
                        },
                        "summaryTextStyle": {
                            "font-size": "12px",
                            "font-weight": "400",
                            "color": "#344054"
                        }
                    }
                ],
                "buttons": [
                   
                    {
                        "type": "postback",
                        "title": "Buy now",
                        "payload": "Buy Now "+productInfo.modelCode ,
                        "value": "Buying Now" ,
                        "qty": 0,
                        "buttonTitle": "Buy Now",
                        "buttonStyle": {
                            "background": "#344054",
                            "color": "#FFF",
                            "border-raidus": "4px",
                            "border": "1px solid #344054"
                        }
                    }
                ],
                "sliderStyle": {
                    "width": "90%"
                }
            };
            if(productInfo?.keyFeatures && productInfo?.keyFeatures[0]){
                let summaryText = "Features: " + productInfo?.keyFeatures[0];
                if(productInfo?.keyFeatures[2]) {
                    summaryText += " , " + productInfo?.keyFeatures[2]
                }
                elementItem.items[0].summaryText = summaryText;
            }
            else {
                let summaryText = "Features:  NA ";
                elementItem.items[0].summaryText = summaryText;
            }
            message.payload.elements.push(elementItem);
    
    
        }
    }
    
    print(JSON.stringify(message));
    
}
    
var info = context.getConsolidateQuery?.response?.body?.metaData || [];
//koreDebugger.log(info);
var message = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [],
        }
    }
};
var resultLength = info.length > 10 ? 10 : info.length;
for (var i = 0; i < resultLength; i++) {
    var sub = getFormattedCurrency(info[i].price) + " (" + info[i].ratings + "★)" + "\n" + info[i].title + "\n" + info[i].keyFeatures
    //+ "\n" + " | " + info[i].categories
    var element = {
        "title": info[i].brand,
        "image_url": info[i].product_image,
        "subtitle": sub,
        "buttons": [{
            "type": "postback",
            "title": "🛍 Buy now",
            "payload": "Buy Now "+info[i].modelCode+"#1"
            // + " " + (context.deliveryDate || '') + (context.entities.typeOfDelivery || '')
        },
        {
            "type": "postback",
            "title": "🛒 Add to cart",
            "payload": "Add to cart : " + info[i].modelCode+"#1"
        }]
    };
    message.attachment.payload.elements.push(element);
}
print(JSON.stringify(message));
text = "Please tell me the security code I sent on your email address and mobile number to complete the verification."
if(context.isValidOtpTries == 1){
    text = "The security code you entered didn't match. Please re-check and enter the security code on your keypad."
}

print(text)
text = "Please tell me the security code I sent on your email address and mobile number to complete the verification."
if(context.isValidOtpTries == 1){
    text = "The security code you entered didn't match. Please re-check and enter the security code on your keypad."
}

print(text)
if(context.appResponse.references){
    var titles = Object.keys(context.appResponse.references);
    var message = {
        "type": "template",
        "payload": {
            "template_type": "button",
            "fromCache": true,
            "text": context.appResponse.content,
            "buttons": []
        }
    };
    for (var i = 0; i < titles.length; i++) {
        var button = {
            "type": "web_url",
            "url": context.appResponse.references[titles[i]], 
            "title": titles[i]
        };
        message.payload.buttons.push(button);
    }
    

}else{
    var message = {
        "type": "template",
        "payload": {
            "template_type": "button",
            "fromCache": true,
            "text": context.appResponse.content
        }
    }
}
print(JSON.stringify(message))

max=parseInt(context.multiItemOrder.line_items[0].price)
name=context.multiItemOrder.line_items[0].name
for(i=0;i<context.multiItemOrder.line_items.length;i++){
    if(max<=parseInt(context.multiItemOrder.line_items[i].price)){
        max=parseInt(context.multiItemOrder.line_items[i].price)
        name=context.multiItemOrder.line_items[i].name
    }
}

txt="I see "+context.multiItemOrder.line_items.length+" items in your order which includes "+name+". Do you want to cancel the entire order, or do you have a specific item you would like to cancel?"
print(txt)
var info = ["Yes", "No"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Is this the item you want to cancel?",
        "subText": "Button Template Description",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));

var quickReplies = ["Connect me to an agent"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Hmm... I can see that the refund for this item has already been processed to your account ending with 5679",
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    /* Uncomment this if both text and image needs to displayed for the  quick reply button
     var quickReply = {
     "content_type":"text",
     "title":quickReplies[i],
     "payload":"payload2",
     "image_url": "url of the image
     };
     */
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));

var msg = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": "Hmm... I can see that the refund for this item has already been processed to your account ending with 5679"
    },
    "action": {
        "buttons": [
            {
                "type": "REPLY",
                "id": "Connect me to an agent",
                "title": "Connect me to an agent"
            }
        ]
    }
}
print(JSON.stringify(msg));
I am sorry, you cannot cancel the order from the bot. Please contact customer support.
if(context.fetchDeliveryAddressDetails.response.body.addresses.length==1){

var quickReplies = ["Yes", "Add a New address"];
}else{
var quickReplies = ["Yes","Chosse Another address", "Add a New address"];
    
}
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": content.SOP_cnfAddress,
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));

// var info = context.fetchDeliveryAddressDetails.response.body.addresses
// if(context.fetchDeliveryAddressDetails.response.body.addresses.length==1){
//  var index = 0   
// }else{
//  var index = info.findIndex(address => address.default===true)   
// }

// info = info[index];

// var message = {
// 	"type": "template",
// 	"payload": {
// 		"template_type": "listWidget",
// 		"title": "Address",
// 		"description": "",
// 		"elements": []
// 	},
// 	"screenIdentifier": "searchResults"
    
// };
//     var element={
				
// 				"title": info.address1+" "+info.address2,
// 				"subtitle": info.city+" "+info.country,
// 				"details": [{
					
// 					"description": "Zipcode: "+info.zip
// 				},{"description": "Default"}],
// 				"default_action": {
// 					"type": "postback",
// 					"payload": info.id,
// 					"utterance": "Select"
// 				},
// 				"buttonsLayout": {
// 					"displayLimit": {
// 						"count": "2"
// 					},
// 					"style": "float"
// 				}
// 			};
			

// message.payload.elements.push(element)
			

        
// print(JSON.stringify(message));

if(context.fetchDeliveryAddressDetails.response.body.addresses.length==1){

var info = ["Yes", "Add a New address"];
}else{
var info = ["Yes","Chosse Another address", "Add a New address"];
    
}
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": content.SOP_cnfAddress,
        "buttons": []
    }
};

for (i = 0; i < info.length; i++) {
    var button = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    message.payload.buttons.push(button);
}
print(JSON.stringify(message));

var quickReplies = ["Login with another account"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "quick_replies",
        "text": "Sorry it appears that you are already logged in and attempting to log in again.",
        "quick_replies": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "content_type": "text",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    /* Uncomment this if both text and image needs to displayed for the  quick reply button
     var quickReply = {
     "content_type":"text",
     "title":quickReplies[i],
     "payload":"payload2",
     "image_url": "url of the image
     };
     */
    message.payload.quick_replies.push(quickReply);
}
print(JSON.stringify(message));

var info = ["Login with another account"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Sorry it appears that you are already logged in and attempting to log in again.",
        "buttons": []
    }
};

for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };
    message.payload.buttons.push(button);
}
print(JSON.stringify(message));
var msg = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": "Sorry it appears that you are already logged in and attempting to log in again."
    },
    "action": {
        "buttons": [{
            "type": "REPLY",
            "id": "Login with another account",
            "title": "Sign in as another"
        }]
    }
}
print(JSON.stringify(msg));
// print(JSON.stringify(msg));
// print(JSON.stringify(msg));
text="You can expect to receive your refund within 2-3 business days. If you haven't received it by then, feel free to reach out to us. We appreciate your patience."
print(text)
{{context.orderStatusAckNodeTxt}}
// var message = {
// 	"type": "template",
// 	"payload": {
// 		"template_type": "multi_select",
// 		"elements": [],
// 		"buttons": [
// 			{
// 				"title": "Done",
// 				"type": "postback",
// 				"payload": "payload"
// 			}
// 		]
// 	}
// };

// var items = context.eligibleLineItems || []
// var elements = []
// for(i=0;i<items.length ; i++){
//     elements.push({
//         "title": items[i].name,
//         "value": items[i].id
//     })
// }

// message.payload.elements = elements
// print(JSON.stringify(message)); 

var items = context.eligibleLineItems || []
var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Select your item",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": [],
        "buttons": [
            {
                "title": "Cancel Items",
                //"buttonTitle": "Show more",
                //"type": "postback",
                "value": "Cancel Item",
                "buttonStyle": {
                    "background": "#344054",
                    "color": "#FFF",
                    "width": "90%",
                    "border": "1px solid #344054"
                }
            },
            // {  // Enable for Single button
            //     "title": "Cancel subscription",
            //     "buttonTitle": "Show more",
            //     "type": "postback",
            //     "value":"show more",
            //     "buttonStyle":{
            //         "background":"#fff",
            //         "color":"#404040",
            //         "width":"100%"
            //     }
            // }
        ]
    }
}


var elements = []

for(i=0 ; i<items.length ; i++){
    elements.push({
                "icon":items[i].imageUrl||"https://ci6.googleusercontent.com/proxy/lOYRwSWZnm41Uo-K7H8_liFaWkBP1aT9xG367iZ4i64eDKjlysJNIWXvvv1UNBjIhCOnG2A4-_I40cU0GjYe8J1iGlPkQh97=s0-d-e1-ft#https://cdn-icons-png.flaticon.com/512/825/825500.png",
                "title":  items[i].name,
                "subTitle":  "Item Id :"+items[i].id, // value should be subtitle
                "flag": "cancelScreen",
                "qty": items[i].fulfillable_quantity,
                "checkBox": "enabled", // this property for checkbox
                "titleStyle": {
                    "color": "#101828",
                    "font-size": "12px",
                },
                "subTitleStyle": {
                    "color": "#101828",
                    "font-size": "14px",
                },
                "description": [
                    {
                        "value":getFormattedCurrency(items[i].price),
                        "detailStyle": {
                            "color": "#101828",
                            "font-size": "12px",
                            "font-weight": "600"
                        },
                    },
                    {
                        "title": "Arriving On",
                        "value": getFormattedDate(new Date((new Date()).getTime() + 5 * 24 * 60 * 60 * 1000)),
                        "detailStyle": {
                            "color": "#344054",
                            "font-size": "12px",
                            "font-weight": "400"
                        },
                    },
                ],
                "value":items[i].id
            })
}

message.payload.elements = elements

var agentMsg = "<b>Select your item</b> \n"
for (let i = 0; i < message.payload.elements.length; i++) {
  let ele = message.payload.elements[i];
  agentMsg += "________________________________\n"
  agentMsg += ele.title
  agentMsg += ele.subTitle
  agentMsg += "Price "+ele.description[0].value+"\n"
  agentMsg += "Arriving on "+ele.description[1].value+"\n"
}
message["text"] = agentMsg;

print(JSON.stringify(message)); 

var items = context.eligibleLineItems || []
var message = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/list",
    "body": {
        "text": "List of items"
    },
    "action": {
        "title": "Select your item",
        "sections": [
            {
                "rows": []
            }
        ]
    }
};

let whatsAppLineItems = {};
for(i=0 ; i<items.length && i<10; i++){
    let desc = items[i].name + getFormattedCurrency(items[i].price);
    
    let buttonImg = {
        "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
        "header": {
            "type": "IMAGE",
            "mediaUrl": items[i].imageUrl||"https://ci6.googleusercontent.com/proxy/lOYRwSWZnm41Uo-K7H8_liFaWkBP1aT9xG367iZ4i64eDKjlysJNIWXvvv1UNBjIhCOnG2A4-_I40cU0GjYe8J1iGlPkQh97=s0-d-e1-ft#https://cdn-icons-png.flaticon.com/512/825/825500.png",
        },
        "body": {
            "text": `*Product Name*: ${items[i].name}\n*Item Id*: ${items[i].id}\n*Item Price*: ${getFormattedCurrency(items[i].price)}\n*Arriving On*: ${getFormattedDate(new Date((new Date()).getTime() + 5 * 24 * 60 * 60 * 1000))}`
        },
        "action": {
            "buttons": [
                {
                    "type": "REPLY",
                    "id": "Yes",
                    "title": "Yes"
                },
                {
                    "type": "REPLY",
                    "id": "No",
                    "title": "No"
                }
            ]
        },
        "footer": {
            "text":"Is this the item you want to cancel?"
        }
    }
    whatsAppLineItems[items[i].id] = JSON.stringify(buttonImg);
    message.action.sections[0].rows.push({
        "id": items[i].id,
        "title": items[i].id,
        "description": desc?.substring(0,72)
    })
}

context.whatsAppLineItems = whatsAppLineItems;
print(JSON.stringify(message)); 
var message =  {
			"type": "template",
			"payload": {
				"template_type": "dropdown_template",
				"heading":"May I know the reason for the cancellation?",
				"elements": [
					{
						"title": "Changed Mind",
						"value":"Changed Mind"
					},
					{
						"title": "Price Concerns",
						"value":"Price Concerns"
					},
					{
						"title": "Shipping Delays",
						"value":"Shipping Delays"
					},
					{
						"title": "Quality Concerns",
						"value":"Quality Concerns"
					},
					{
						"title": "Payment Issues",
						"value":"Payment Issues"
					},
					{
						"title": "Miscommunication",
						"value":"Miscommunication"
					},
					{
						"title": "Personal Emergency",
						"value":"Personal Emergency"
					},
					{
						"title": "Unsatisfactory Customer Service",
						"value":"Unsatisfactory Customer Service"
					},
					{
						"title": "Delivery Issues",
						"value":"Delivery Issues"
					},
					{
						"title": "Others",
						"value":"Others"
					}
			   
				], 
			}
		};
print(JSON.stringify(message));

var message = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/list",
    "body": {
        "text": "May I know the reason for the cancellation?"
    },
    "action": {
        "title": "Select your reason",
        "sections": [
            {
                "rows": []
            }
        ]
    }
};
message.action.sections[0].rows = [
        {
            "title": "Changed Mind",
            "id": "Changed Mind"
        },
        {
            "title": "Price Concerns",
            "id": "Price Concerns"
        },
        {
            "title": "Shipping Delays",
            "id": "Shipping Delays"
        },
        {
            "title": "Quality Concerns",
            "id": "Quality Concerns"
        },
        {
            "title": "Payment Issues",
            "id": "Payment Issues"
        },
        {
            "title": "Miscommunication",
            "id": "Miscommunication"
        },
        {
            "title": "Personal Emergency",
            "id": "Personal Emergency"
        },
        {
            "title": "Unsatisfactory Service",
            "id": "Unsatisfactory Customer Service"
        },
        {
            "title": "Delivery Issues",
            "id": "Delivery Issues"
        },
        {
            "title": "Others",
            "id": "Others"
        }
    ]
print(JSON.stringify(message));

 text = "I couldn't find any orders on the number you're calling from. Please tell me 10-digit mobile number you used while placing the order."

if(context.isNumberNotFoundInDb == 1){
    text = "I couldn't find that number in our records. Please tell me your number again."
}
else if(context.isValidPhoneNumber == 1){
    text = "The number you provided doesn't seem correct. Can you please enter your 10 digit mobile number on the keypad?"
}

print(text)

 text = "I couldn't find any orders on the number you're calling from. Please tell me 10-digit mobile number you used while placing the order."

if(context.isNumberNotFoundInDb == 1){
    text = "I couldn't find that number in our records. Please tell me your number again."
}
if(context.isValidPhoneNumber == 1){
    text = "The number you provided doesn't seem correct. Can you please enter your 10 digit mobile number on the keypad?"
}

print(text)
var quickReplies = ["Login with another account", "Connect me with an agent",];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Hmm... I couldn't find any item on your account that qualify for refund. 🤔",
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    /* Uncomment this if both text and image needs to displayed for the  quick reply button
     var quickReply = {
     "content_type":"text",
     "title":quickReplies[i],
     "payload":"payload2",
     "image_url": "url of the image
     };
     */
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));

var msg = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": "Hmm... I couldn't find any item on your account that qualify for refund. 🤔"
    },
    "action": {
        "buttons": [
            {
                "type": "REPLY",
                "id": "Login with another account",
                "title": "Try Other Account"
            },
            {
                "type": "REPLY",
                "id": "Connect to Agent",
                "title": "Connect to Agent"
            }
        ]
    }
}
print(JSON.stringify(msg));

var items = context.orders
var info=context.getProductId.response.body.data?.products?.edges;
var message = {
    "type": "template",
    "AlwaysShowGlobalButtons": false,
    "payload": {
        "template_type": "list",
        "elements": [],
        "buttons": []
    }
}
var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Select your item",
        "showMore": "false",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": [],
        "buttons": [
            {
                "title": "Return Items",
                // "buttonTitle": "Show more",
                // "type": "postback",
                "value": "Return Items",
                "buttonStyle": {
                    "background": "#344054",
                    "color": "#FFF",
                    "width": "48%",
                    "border": "1px solid #344054"
                }
            },
        ]
    }
}

var elements = []

context.displayOrdersCount=(context?.displayOrdersCount)||0
var fullLength = items.length;
k=context.displayOrdersCount
for (let i = context.displayOrdersCount; i < fullLength; i++) {
    for(let j=0;j<items[i].line_items.length;j++){
    elements.push({
                "icon":info[0]?.node?.images?.edges[0]?.node?.src||"https://ci6.googleusercontent.com/proxy/lOYRwSWZnm41Uo-K7H8_liFaWkBP1aT9xG367iZ4i64eDKjlysJNIWXvvv1UNBjIhCOnG2A4-_I40cU0GjYe8J1iGlPkQh97=s0-d-e1-ft#https://cdn-icons-png.flaticon.com/512/825/825500.png",
                "title":  items[i].line_items[j].name,
                "subTitle":  "Item Id :"+items[i].line_items[j].id, // value should be subtitle
                "flag": "cancelScreen",
                "qty": items[i].line_items[j]?.quantity,
                "checkBox": "enabled", // this property for checkbox
                "titleStyle": {
                    "color": "#101828",
                    "font-size": "12px",
                },
                "subTitleStyle": {
                    "color": "#101828",
                    "font-size": "14px",
                },
                "description": [
                    {
                        "value":getFormattedCurrency(items[i].line_items[j]?.price),
                        "detailStyle": {
                            "color": "#101828",
                            "font-size": "12px",
                            "font-weight": "600"
                        },
                    }
                ],
                "value":items[i].line_items[j].id
            })
    k++
    }
}
message.payload.elements = elements;
context.totalItems = elements.length
print(JSON.stringify(message));

txt="Please select the order you wish to exchange"
if(context?.getOrdersDetails?.response?.body?.orders.length){
    txt="Please choose the order you'd like to exchange."
}
print(txt)
orderId=context.entities.ivrOrderId||context.entities.hIvrOrderId
var order=context.orderStatus.find(order=>order.id % 10000==orderId)
cancelCount=order.result.filter(item=>item.status=="Cancelled").length
returnCount=order.result.length-cancelCount
txt="You "
orderName=""
for(i=0;i<order.result.length;i++){
    orderName=orderName+(i+1)+" "+order.result[i].name+" \n"
}
prefix="returned or canceled "+context.orderStatus[0].result.length
if(cancelCount==0){
    prefix= "returned "+returnCount
}
if(returnCount==0){
    prefix=txt+"canceled "+cancelCount
}
 txt=txt+prefix+" in this order including "+orderName+" Would you like an update on all, or a specific item?"

print(txt)
orderId=context.orderStatus[0].id
var order=context.getOrdersDetails.response.body.orders
order=order.find(order=>order.id == orderId)
cancelCount=context.orderStatus[0].result.filter(item=>item.status=="Cancelled").length
returnCount=context.orderStatus[0].result.length-cancelCount
txt="You "
if(cancelCount==0){
    txt= txt+"returned "+returnCount+" in this order including "+order.line_items[0].name+" Would you like an update on all, or a specific item?"
}
if(returnCount==0){
    txt=txt+"canceled "+cancelCount+" in this order including "+order.line_items[0].name+" Would you like an update on all, or a specific item?"
}
 txt=txt+"returned or canceled "+context.orderStatus[0].result.length+" in this order including "+order.line_items[0].name+" Would you like an update on all, or a specific item?"

print(txt)

// Cancelled
// "Return Rejected",
//     "OPEN": "Return Inprogress",
//     "REQUESTED": "Return Requested",
//     "CLOSED": "Returned",
//     "DECLINED": "Return Declined"
//     Return Rejected
// txt="And what's your password?"
// if(context?.noOfUserLogInAttempts==1){
//     txt="What's your password?"
// }
// print(txt)

text = "And what's your password?"
if(context?.noOfUserLogInAttempts==1) {
    text="What's your password?"
}

var message = {
"text" : text,
"masking" : true
};
print(JSON.stringify(message));
var txt="I couldn't update your number with that code."
if(context.action=="Email"){
    txt="I couldn't update your email with that code."
}
print(txt)
// var metaData = context.getConsolidateQuery?.response?.body?.metaData;
// var genResponse = context.showResult.response?.body?.result?.sku?.split(",")

// genAiRecommend = []
// arr =[]
// for(i=0;i<metaData.length;i++){
//     if(genResponse.includes(metaData[i].sku)){
//         genAiRecommend.push(metaData[i])
//     }
//     else{
//         arr.push(metaData[i])
//     }
// }
// metaData =[...genAiRecommend, ...arr]
var metaData = context.getConsolidateQuery?.response?.body?.metaData || [];
const genResponse = (context.showResult?.response?.body?.result?.sku || '').split(',');

const genAiRecommend = metaData.filter(item => genResponse?.includes(item.sku));
const arr = metaData.filter(item => !genResponse.includes(item.sku));

var metaData = [...genAiRecommend, ...arr];


// metaData = arr+metaData

    //     "brand": "Danby",
    //     "categories": "Washing Machines",
    //     "keyFeatures": [
    //       "Capacity (cu. ft.):1.8",
    //       "Agitator/Impeller Type:Impeller",
    //       "Features:Anti Vibration",
    //       "Features:Adjustable Legs",
    //       "Features:End-Of-Cycle Signal"
    //     ],
    //     "modelCode": "315667127",
    //     "part_number": 315667127,
    //     "price": 491.06,
    //     "product_image": "https://images.thdstatic.com/productImages/a05a47e3-00dc-4187-9946-948de27de6da/svn/white-danby-portable-washing-machines-dwm065a1wdb-6-64_1000.jpg",
    //     "product_link": "https://www.homedepot.com/p/Danby-1-8-cu-ft-Portable-Top-Load-Washer-in-White-DWM065A1WDB-6/315667127",
    //     "product_model": "DWM065A1WDB-6",
    //     "ratings": 0,
    //     "sku": "1010195184",
    //     "title": "Danby 1.8 cu. ft. Portable Top Load Washer in White"
    //   }
      
// var message = {
//     "type": 'template',
//     "payload": {
//         "template_type": 'carousel',
//         "elements": []
//     }
// };

// for (const productSku in metaData) {
//     if (metaData.hasOwnProperty(productSku)) {
//       const productInfo =metaData[productSku];
//       message.payload.elements.push({
//         "title": productInfo?.title,
//         "image_url": productInfo?.imageUrl,
//         "subtitle":`price : $${productInfo?.price?.finalPrice?.value} \n Features : ${productInfo?.keyFeatures[0]?.feature} \n SKU : ${productSku}`,
//         // "default_action": {
//         //     "type": "web_url",
//         //     "url": "https://www.lg.com/us"+productInfo.pdpUrl
//         // },
//         "buttons": [{
//             "type": "postback",
//             "title": "Buy Now",
//             "payload": productSku
//         },{
//             "type": "postback",
//             "title": "Add To Cart",
//             "payload": productSku+" Add To Cart"
//         }]
//     });
      
      
//     }
//   }

// print(JSON.stringify(message));




var message = 
{
    "type": "template",
    "payload": {
        "template_type": "retailAssistcarousel",
        "carousel_type": "stacked",
        "elements": []
    }
}

for (const productSku in metaData) {
    if (metaData.hasOwnProperty(productSku)) {
        const productInfo = metaData[productSku];
        // koreDebugger.log("features" + productInfo.keyFeatures);
        let elementItem = {
            "thumbnail": productInfo.product_image,
            "qty": "1",
            "button1": {
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNjI1IDhIMTIuMzc1IiBzdHJva2U9IiNEMEQ1REQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                "buttonTitle": "Decrement",
                "type": "postback",
                "value": "Delete",
                "buttonStyle": {
                    "border-radius": "4px",
                    "border": "1px solid #D0D5DD",
                    "background": "#F9FAFB"
                },
            },
            "button2": {
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguMDAwMTYgMy4zMzMzNFYxMi42NjY3TTMuMzMzNSA4LjAwMDAxSDEyLjY2NjgiIHN0cm9rZT0iI0ZFRkVGRSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
                "buttonTitle": "increment",
                "type": "postback",
                "value": "increment",
                "buttonStyle": {
                    "color": "#F9FAFB",
                    "border-radius": "4px",
                    "border": "1px solid #12B76A",
                    "background": "#12B76A"
                },
            },
            "details": {
                "title": "Best Seller",
                "subTitle": productInfo.ratings + "★",
                "titleStyle": {
                    "background-color": "#1D2939",
                    "color": "#fff",
                    "border-radius": "4px",
                    "font-size": "10px"
                },
                "subTitleStyle": {
                    "background-color": "#12B76A",
                    "color": "#fff",
                    "border-radius": "4px",
                    "font-size": "10px"
                }
            },
            "items": [
                {
                    "title": productInfo.brand,
                    "subTitle": productInfo.title,
                    "value": getFormattedCurrency(productInfo.price),
                    "itemID": "SKU: " + productInfo.modelCode,
                    "titleStyles": {
                        "font-size": "12px",
                        "font-weight": "600",
                        "color": "#101828"
                    },
                    "subTitleStyle": {
                        "font-size": "14px",
                        "font-weight": "700",
                        "color": "#101828"
                    },
                    "valueStyle": {
                        "font-size": "14px",
                        "font-weight": "600",
                        "color": "#16A34A"
                    },
                    "summaryTextStyle": {
                        "font-size": "12px",
                        "font-weight": "400",
                        "color": "#344054"
                    }
                }
            ],
            "buttons": [
                {
                    "type": "postback",
                    "title": "Add To Cart",
                    "payload": productInfo.modelCode + " Add To Cart ",
                    "value": "Adding To Cart" ,
                    "qty" : 0 ,
                    "buttonTitle": "Add To Cart",
                    "buttonStyle": {
                        "background": "#FFF",
                        "color": "#344054",
                        "border-raidus": "4px",
                        "border": "1px solid #D0D5DD"
                    }
                },
                {
                    "type": "postback",
                    "title": "Buy now",
                    "payload": productInfo.modelCode ,
                    "value": "Buying Now" ,
                    "qty": 0,
                    "buttonTitle": "Buy Now",
                    "buttonStyle": {
                        "background": "#344054",
                        "color": "#FFF",
                        "border-raidus": "4px",
                        "border": "1px solid #344054"
                    }
                }
            ],
            "sliderStyle": {
                "width": "90%"
            }
        };
        if(productInfo?.keyFeatures && productInfo?.keyFeatures[0]){
            let summaryText = "Features: " + productInfo?.keyFeatures[0];
            if(productInfo?.keyFeatures[2]) {
                summaryText += " , " + productInfo?.keyFeatures[2]
            }
            elementItem.items[0].summaryText = summaryText;
        }
        else {
            let summaryText = "Features:  NA ";
            elementItem.items[0].summaryText = summaryText;
        }
        message.payload.elements.push(elementItem);


    }
}

print(JSON.stringify(message));
var info = context.getConsolidateQuery?.response?.body?.metaData || [];
//koreDebugger.log(info);
var message = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [],
        }
    }
};
var resultLength = info.length > 10 ? 10 : info.length;
for (var i = 0; i < resultLength; i++) {
    var sub = getFormattedCurrency(info[i].price) + " (" + info[i].ratings + "★)" + "\n" + info[i].title + "\n" + info[i].keyFeatures
    //+ "\n" + " | " + info[i].categories
    var element = {
        "title": info[i].brand,
        "image_url": info[i].product_image,
        "subtitle": sub,
        "buttons": [{
            "type": "postback",
            "title": "🛍 Buy now",
            "payload": "Buy Now "+info[i].modelCode+"#1"
            // + " " + (context.deliveryDate || '') + (context.entities.typeOfDelivery || '')
        },
        {
            "type": "postback",
            "title": "🛒 Add to cart",
            "payload": "Add to cart " + info[i].modelCode+"#1"
        }]
    };
    message.attachment.payload.elements.push(element);
}
print(JSON.stringify(message));
const lineItemId = context.entities.displayLineItems;
koreDebugger.log("lineItemId"+lineItemId+"  "+JSON.stringify(context.whatsAppLineItems));
print(context.whatsAppLineItems[lineItemId]);
txt = content.SOP_invalidZipCodeMsg

if(context?.noOfTries){
    txt = content.SOP_retryInvalidZipCodeMsg
}
print(txt)
txt="I'm sorry, but item in this order is not eligible for return."
if(context.orderData.line_items.length>1){
    txt="I'm sorry, but items in this order are not eligible for return."
}
var quickReplies = ["Connect me with an Agent"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": txt,
        "subText": "Button Template Description",
        "buttons": []
    }
};
for (i = 0; i < quickReplies.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));




// txt="I'm sorry, but item in this order are not eligible to return."
// if(context.orderData.line_items.length>1){
//     txt="I'm sorry, but items in this order are not eligible to return."
// }

// var quickReplies = ["Connect me with an Agent"];
// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "quick_replies",
//         "text": txt,
//         "quick_replies": []
//     }
// };

// for (i = 0; i < quickReplies.length; i++) {
//     //if only text needs to diplayed
//     var quickReply = {
//         "content_type": "text",
//         "title": quickReplies[i],
//         "payload": quickReplies[i]
//     };
//     /* Uncomment this if both text and image needs to displayed for the  quick reply button
//      var quickReply = {
//      "content_type":"text",
//      "title":quickReplies[i],
//      "payload":"payload2",
//      "image_url": "url of the image
//      };
//      */
//     message.payload.quick_replies.push(quickReply);
// }
// print(JSON.stringify(message));
if(Object.keys(context.docLinks).length == 0){
    print(context.response);
}
else{
    
    var info = Object.keys(context.docLinks);
    var message = {
        "type": "template",
        "payload": {
            "template_type": "button",
            "template":"documentTemplate",
            "text": context.response,
            "buttons": []
        }
    };
    for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    // var button = {
    //     "type": "web_url",
    //     "title": info[i],
    //     "payload": context.docLinks[i]
    // };

        var button = {
        "type":"web_url", // type can be "postback" if
        "url":context.docLinks[info[i]],
        "title":info[i]
        };

        message.payload.buttons.push(button);
    }
    print(JSON.stringify(message));
}
var item = context.eligibleLineItems[0] 
var order = context.eligibleOrders
var orderDate = context.eligibleOrders.created_at.split("T")[0]
// var itemImage=context.getProductId.response.body?.data?.products?.edges[0]?.node?.images?.edges[0]?.node?.src
// var elements = [ {
//         "title": item.name,
//         "image_url": context.eligibleLineItems[0].imageUrl||"https://cdn-icons-png.flaticon.com/512/825/825500.png",
//         "subtitle":"Item Id : "+item.id+"\nSku : "+item.sku+"\nPrice : $"+item.price ,
//     }];
// var message = {
//     "type": 'template',
//     "payload": {
//         "template_type": 'carousel',
//         "elements": []
//     }
// };
// message.payload.elements = elements;
// print(JSON.stringify(message));

context.entities.displayLineItems = [item.id]



var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Item eligible for cancel",
        "showMore": "true",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements":[{
                "icon": context.eligibleLineItems[0].imageUrl||"https://cdn-icons-png.flaticon.com/512/825/825500.png",
                "title": item.name,
                "subTitle": "SKU :"+item.sku, // value should be subtitle
                "flag": "ItemdetailsScreen",
                "titleStyle": {
                    "color": "#101828",
                    "font-size": "12px",
                },
                "subTitleStyle": {
                    "color": "#101828",
                    "font-size": "14px",
                },
                "description": [
                    {
                        "title": "Qty:",
                        "value": item.quantity,
                        "detailStyle": {
                            "color": "#344054",
                            "font-size": "12px",
                            "font-weight": "400"
                        },
                    },
                ],
                "descriptionDetails": [
                    {
                        "title": "Order Date",
                        "value": ": "+orderDate,

                    },
                    {
                        "title": "Order ID",
                        "value": ": "+order.id,
                    },
                    {
                        "title": "Price",
                        "value": ": "+getFormattedCurrency(item.price),
                    }
                    
                ]

            }]
    }

}

var agentMsg = "Item eligible for cancel \n"
var len = Math.min(3,message.payload.elements.length)
for (let i = 0; i < len; i++) {
    agentMsg += "________________________________\n"
    let ele = message.payload.elements[i];
    agentMsg += ele.title + "\n";
    agentMsg += ele.subTitle + "\n";
    agentMsg += ele.description[0].title + " " + ele.description[0].value + "\n";
    for(let obj of ele.descriptionDetails){
        agentMsg += obj.title + "       " + obj.value + "\n";
    }
}
message["text"] = agentMsg;
print(JSON.stringify(message));


var msg = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": "Is this the item you want to cancel?"
    },
    "action": {
        "buttons": [
            {
                "type": "REPLY",
                "id": "Yes",
                "title": "Yes"
            },
            {
                "type": "REPLY",
                "id": "No",
                "title": "No"
            }
        ]
    }
}
print(JSON.stringify(msg));
var quickReplies = ["Login to another account", "Add Address"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Hmm... I don't see any address linked to this account.",
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
   
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));

var info = ["Login to another account", "Add Address"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Hmm... I don't see any address linked to this account.",
        "buttons": []
    }
};

for (i = 0; i < info.length; i++) {
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };
   
    message.payload.buttons.push(button);
}
print(JSON.stringify(message));

var quickReplies = ["Sign Up", "Connect me with an Agent"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "I couldn't sign you in with that either. Reach out to us again in future. Have a good rest of your day!",
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));

Let’s log you in first!
var item = context.orderData.line_items


var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Select your item",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": [],
        "buttons": [
            {
                "title": "Return Items",
                // "buttonTitle": "Show more",
                // "type": "postback",
                "value": "Return Items",
                "buttonStyle": {
                    "background": "#344054",
                    "color": "#FFF",
                    "width": "48%",
                    "border": "1px solid #344054"
                }
            },
        ]
    }
}
var elements = []
displayItems=context.displayItems.map(str => parseInt(str))
deliveryDate=context.getOrderStatus.response?.body
for(i=0 ; i<item.length ; i++){
    koreDebugger.log(typeof item[i].id+" "+displayItems.includes(item[i].id))
    if(displayItems.includes(item[i].id)){
    elements.push({
                "icon":context.skuImages[item[i].sku]||"https://ci6.googleusercontent.com/proxy/lOYRwSWZnm41Uo-K7H8_liFaWkBP1aT9xG367iZ4i64eDKjlysJNIWXvvv1UNBjIhCOnG2A4-_I40cU0GjYe8J1iGlPkQh97=s0-d-e1-ft#https://cdn-icons-png.flaticon.com/512/825/825500.png",
                "title":  item[i].name,
                "subTitle":  "Item Id :"+item[i].id, // value should be subtitle
                "flag": "cancelScreen",
                "qty": item[i]?.quantity,
                "checkBox": "enabled", // this property for checkbox
                "titleStyle": {
                    "color": "#101828",
                    "font-size": "12px",
                },
                "subTitleStyle": {
                    "color": "#101828",
                    "font-size": "14px",
                },
                "description": [
                    {
                        "value":getFormattedCurrency(item[i].price),
                        "detailStyle": {
                            "color": "#101828",
                            "font-size": "12px",
                            "font-weight": "600"
                        },
                    },
                    {
                        "title": "Delivered On",
                        "value": deliveryDate[item[i].id.toString()]?.updatedAt.split("T")[0],
                        "detailStyle": {
                            "color": "#344054",
                            "font-size": "12px",
                            "font-weight": "400"
                        },
                    },
                ],
                "value":item[i].id
            })
        
    }
}

message.payload.elements = elements
agentMsg = ""
var len = Math.min(3,message.payload.elements.length)
for (let i = 0; i < len; i++) {
  let ele = message.payload.elements[i];
  agentMsg += "Item Details"
  agentMsg += "________________________________\n"
  agentMsg += ele.title + "\n";
  agentMsg += "Price"+ "    " + ele.description[0].value + "\n";
  agentMsg += ele.description[1].title + "    " + ele.description[1].value + "\n";
}
message["text"] = agentMsg;
print(JSON.stringify(message)); 

var quickReplies = ["Login with another account", "Connect to Agent"];
var payload = ["Login with another account","Connect to Agent"]
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "I couldn't find any orders associated with this account.",
        "subText": "Button Template Description",
        "buttons": []
    }
};
for (i = 0; i < quickReplies.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": payload[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));


// var quickReplies = ["Login with Another Account", "Connect to Agent"];
// var payload = ["logout","agent"]
// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "quick_replies",
//         "text": "Hmm...I couldn't find any orders linked with your Account. 🤔",
//         "quick_replies": []
//     }
// };

// for (i = 0; i < quickReplies.length; i++) {
//     //if only text needs to diplayed
//     var quickReply = {
//         "content_type": "text",
//         "title": quickReplies[i],
//         "payload": payload[i]
//     };
//     message.payload.quick_replies.push(quickReply);
// }
// print(JSON.stringify(message));
var info = ["Login with another account", "Connect to Agent"];
var payload = ["Login with another account","Connect to Agent"]
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "I couldn't find any orders associated with this account.",
        "subText": "Button Template Description",
        "buttons": []
    }
};
for (i = 0; i < quickReplies.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": payload[i]
    };
    
    message.payload.buttons.push(button);
}
print(JSON.stringify(message));

I couldn't find any eligible order for cancellation associated with your account. Would you like to try with another mobile number, or I can connect you with one of our agents who can help.
var quickReplies = ["Try other Account", "Connect to Agent"];
var payload = ["Login with another account", "Connect to Agent"]
var message = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": "I couldn't find any orders associated with this account."
    },
    "action": {
        "buttons": []
    }
};
for (i = 0; i < quickReplies.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "REPLY",
        "id": payload[i],
        "title": quickReplies[i]
    };

    message.action.buttons.push(button);
}
print(JSON.stringify(message));
var message={
  "type": "template",
  "payload": {
    "text": "How likely are you to recommend our products or services to others?",
    "template_type": "feedbackTemplate",
    "view": "ThumbsUpDown",
    "sliderView": false,
    "messageTodisplay": "Glad you liked the experience. Thanks!"
  }
};
//Todisplaythetemplateinslider,changethevalueofsliderViewtotrue
var displayValues=[
  {
    "value": "Like",
    "id": "positive"
  },
  {
    "value": "Dislike",
    "id": "negative"
  }
];//ThenumberofelementsyouhaveunderdisplayValuesshouldalwaysbe2//Irrespectiveoftheorderofvaluesinthearray,theorderintheUIwillbe"Extremely Likely"and"Extremely Unlikely"
message.payload.thumpsUpDownArrays=[];
for(var i=0;i<=1;i++){
  var thumpsUpDownArray={
    "thumpUpId": displayValues[i].id,
    "value": displayValues[i].value,
    "reviewText": displayValues[i].value
  };
  message.payload.thumpsUpDownArrays.push(thumpsUpDownArray);
}
print(JSON.stringify(message));
koreDebugger.log(context.displayItems)
var items = context.orderData.line_items.find(item=>item.id==context.displayItems[0])
var elements = [{
        "title": items.name,
        "image_url": items?.itemImgUrl||"",
        "subtitle": "Price : "+items.price+"\n"+"Quantity :"+items.quantity,
    }];
var message = {
    "type": 'template',
    "payload": {
        "template_type": 'carousel',
        "elements": []
    }
};
message.payload.elements = elements;
print(JSON.stringify(message));
lineItems = context?.sfccCreateAnOrder?.response?.body?.productItems
var orderData = context?.sfccCreateAnOrder?.response?.body

// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "listWidget",
//         "title": "Order: "+context.createAnOrder.response.body?.order?.id||"12345678",
//         "description": "",
//         "elements": []
//     },
// }
// var order=context.orderPayload.order
// message.payload.elements.push({
//         "image": {
//             "image_type": "image",
//             "image_src": order?.line_items[0]?.itemImgUrl||"https://ci6.googleusercontent.com/proxy/lOYRwSWZnm41Uo-K7H8_liFaWkBP1aT9xG367iZ4i64eDKjlysJNIWXvvv1UNBjIhCOnG2A4-_I40cU0GjYe8J1iGlPkQh97=s0-d-e1-ft#https://cdn-icons-png.flaticon.com/512/825/825500.png",
//             "radius": 20,
//             "size": "large"
//         },
//         "title": order.line_items[0]?.title||"",
//         "subtitle": "QTY:"+order.line_items[0]?.quantity||"1"+"\n" + "Price x $" + order.line_items[0]?.price||"0$"+".00",
//         "details": [{
//             "description": "Shipping Address: " + context.shippingAddress?.address1 +" "+context.shippingAddress?.address2+"\n"+context.shippingAddress?.city+" "+context.shippingAddress?.country+" "+context.shippingAddress?.zip
//         }, {
//             "description":"Estimated delivery by "+getFormattedDate(new Date((new Date()).getTime() + 5 * 24 * 60 * 60 * 1000)) //""+deliverdOnOrEstimate+ ": " + foundOrder.orderDate.split('|')[0].trim()
//         }]
//     })
    
// print(JSON.stringify(message));

var address = context.shippingAddress.address1+", "+context.shippingAddress.city+", "+context.shippingAddress.zip

var message ={
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Order Details",
        "showMore": "false",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", // limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}

elements = []
j = lineItems.length
for(i=0;i<lineItems.length ; i++){
    j = j-1
    koreDebugger.log(context.productDetails.itemImgUrl)
    currentItem = {
                "icon": context.productDetails.itemImgUrl,
                "title": lineItems[i].productName,
                //"subTitle": , // value should be subtitle
                "flag": "ItemdetailsScreen",
                "titleStyle": {
                    "color": "#101828",
                    "font-size": "12px",
                },
                "subTitleStyle": {
                    "color": "#101828",
                    "font-size": "14px",
                },
                "description": [
                    {
                        "title": "Qty:",
                        "value": lineItems[i].quantity,
                        "detailStyle": {
                            "color": "#344054",
                            "font-size": "12px",
                            "font-weight": "400"
                        },
                    },
                ]
            }
            
    if(j==0){
        currentItem["descriptionDetails"] =  [
                    {
                        "title": "Order ID",
                        "value": ": "+orderData.orderNo,
                    },
                   {
                        "title": "Order Status",
                        "value": ": Placed",
                        "valueStyle": {
                        "color": "#039855",
                         },
                    },
                    {
                        "title":"Shipping Address",
                        "value":": "+address
                    },
                    {
                        "title": "Estimated Delivery",
                        "value": ": "+getFormattedDate(new Date((new Date()).getTime() + 5 * 24 * 60 * 60 * 1000))
                    }
                ]

    }
           
    elements.push(currentItem) 
    
}


message.payload.elements = elements

print(JSON.stringify(message));
var items = context.eligibleOrders;
var data;
    try {
         data = JSON.stringify(context.GenerativeAINode.GenAIPromptCancelAnOrder);
        
    } catch (error) {
        koreDebugger.log("Error stringifying data: " + error.message);
}
    
var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Select your order to cancel",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}

var elements = []
var fullLength = items.length;
if (!data || !env.isDigitalGenAIEnabled || data?.includes(null)) {
    for (let i = 0; i < fullLength; i++) {
        var orderDate = items[i].created_at.split("T")[0]

        for (j = 0; j < items[i].line_items.length; j++){  // Changed items[i].length to items[i].line_items.length

            elements.push({
                "icon": "https://retail-assist.s3.amazonaws.com/resources/images/RetailAssist/shoppingCartSVG.svg",
                "title": "Order Id : " + items[i].id,
                "flag": "cancelOrderTemplate",
                "values": [
                    {
                        "title": "Order Date :",
                        "value": orderDate
                    },{
                        "title": "Items Id:",
                        "value": items[i].line_items[j].id
                    },
                    {
                        "title": "Items eligible:",
                        "value": items[i].line_items.length
                    },
                    {
                        "title": "Order Price : ",
                        "value": items[i].current_subtotal_price
                    },
                ],
                "actions": {
                    "type": "postback",
                    //"title": "You have selected order number : " + items[i].line_items[j].id,
                    "title": "You have selected order number : " + items[i].id,
                    //"value": items[i].line_items[j].id.toString()
                    "value": items[i].id.toString()
                }
            })

        }
    
    }
} else {
    for (i = 0; i < fullLength; i++) {
        var orderDate = items[i].created_at.split("T")[0]
    for (j = 0; j < items[i].line_items.length; j++) { 
        
        if (data?.includes(items[i].line_items[j].id.toString())) {
            elements.push({
                "icon": "https://retail-assist.s3.amazonaws.com/resources/images/RetailAssist/shoppingCartSVG.svg",
                "title": "Order Id : " + items[i].id,
                "flag": "cancelOrderTemplate",
                "values": [
                    {
                        "title": "Order Date :",
                        "value": orderDate
                    },{
                        "title": "Items Id:",
                        "value": items[i].line_items[j].id
                    },
                    {
                        "title": "Items eligible:",
                        "value": items[i].line_items.length
                    },
                    {
                        "title": "Order Price : ",
                        "value": items[i].current_subtotal_price
                    },
                ],
                "actions": {
                    "type": "postback",
                    // "title": "You have selected order number : " + items[i].line_items[j].id,
                    // "value": items[i].line_items[j].id.toString()
                    "title": "You have selected order number : " + items[i].id,
                     "value": items[i].id.toString()
                }
            })

        }
    }
}

}

message.payload.elements = elements;


// agent text message construction
var agentMsg = "Select your Order to cancel\n\n";
var len = Math.min(3,message.payload.elements.length)
for (let i = 0; i < len; i++) {
  let ele = message.payload.elements[i];
  agentMsg += "________________________________\n"
  agentMsg += ele.title + "\n";
  agentMsg += ele.values[0].title + "    " + ele.values[0].value + "\n";
}
message["text"] = agentMsg;

context.totalItems = elements.length
print(JSON.stringify(message));

var items = context.eligibleOrders;
var data;
try {
    data = JSON.stringify(context.GenerativeAINode.GenAIPromptCancelAnOrder);

} catch (error) {
    koreDebugger.log("Error stringifying data: " + error.message);
}

var message = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/list",
    "body": {
        "text": "List of orders"
    },
    "action": {
        "title": "Please select one",
        "sections": [{
            "rows":[]
        }]
    }
}

var elements = []
var fullLength = items.length;
for (let i = 0; i < fullLength && i<10; i++) {
        var orderDate = items[i].created_at.split("T")[0]
        message.action.sections[0].rows.push({
                id: items[i].id.toString(),
                title:"Order ID : "+items[i].id,
                description:"Order Date: "+orderDate+"\nOrder Price : "+getFormattedCurrency(items[i]?.current_subtotal_price)
        });

}

print(JSON.stringify(message));

var info = ["Use Phone Number","Sign Up"];
var txt="Please enter your email ID."
if(context?.noUserLoginTries>0){
    txt="Sorry, what’s your email ID?"
    //print(txt)
}
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": txt,
        "subText": "Button Template Description",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));
// txt="Please enter the your username."
// if(context?.noUserLoginTries>0){
//     txt="What's your username."
// }
// var quickReplies = ["Log in with phone number","Sign Up"];
// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "quick_replies",
//         "text": txt,
//         "quick_replies": []
//     }
// };

// for (i = 0; i < quickReplies.length; i++) {
//     var quickReply = {
//         "content_type": "text",
//         "title": quickReplies[i],
//         "payload": quickReplies[i]
//     };
 
//     message.payload.quick_replies.push(quickReply);
// }
// print(JSON.stringify(message));
var info = ["Use Phone Number","Sign Up"];
var message = {
  "text": "Please enter your email ID.",
  "quick_replies": []
};

for(i=0;i<info.length;i++){
	// if the quick reply is for showing only text
	var quick_reply = {
      "content_type": "text",
      "title": info[i],
      "payload": info[i]
    }
    message.quick_replies.push(quick_reply);
    
}

print(JSON.stringify(message));

var info = ["Use Phone Number", "Sign Up"];
var txt = "Please enter your email ID."
if (context?.noUserLoginTries > 0) {
    txt = "Sorry, what’s your email ID?"
}
var msg = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": txt
    },
    "action": {
        "buttons": []
    }
}

for (i = 0; i < info.length; i++) {
    var button = {
        "type": "REPLY",
        "id": info[i],
        "title": info[i]
    };

    msg.action.buttons.push(button);
}
print(JSON.stringify(msg));
var message = {
    "activities": [{
            "type": "event",
            "name": "config",
            "sessionParams": {
                "bargeIn": true,
                "userNoInputTimeoutMS":60000,
                "botNoInputTimeoutMS":120000,
                "userNoInputGiveUpTimeoutMS":300000
               },
            "id": new Date().getTime() + 200,
            "timestamp": new Date().toISOString()
        },
        {
            "type": "message",
            "text": "Sure.",
            "timestamp": new Date().toISOString(),
            "id": new Date().getTime()
        }

    ]
};
print(JSON.stringify(message));
var returnRejectedReason=context.getOrderStatus.response.body[context.entities?.displayItems||context.entities?.showTitleMatchItems]
koreDebugger.log(typeof returnRejectedReason.returnRejectedReason)
switch(returnRejectedReason.returnRejectedReason){
    case "RETURN_PERIOD_ENDED":
        var mentionReason="you'r return period has ended" 
        break;
    case "FINAL_SALE":
        var mentionReason="you have returned final sale item"
        break;
    default: 
    var mentionReason=returnRejectedReason.returnRejectedNote
}
var quickReplies = ["connect me with an Agent"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "However, I want to inform you that upon inspection, we noticed that the "+mentionReason+" Hence, we are unable to issue a refund for it.",
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    /* Uncomment this if both text and image needs to displayed for the  quick reply button
     var quickReply = {
     "content_type":"text",
     "title":quickReplies[i],
     "payload":"payload2",
     "image_url": "url of the image
     };
     */
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));

var txt="Sure, I can help your with that. 😊"
if(context.entities?.hActionDecider=="Modify Address"){
    txt="Sure! I can help you update your address. 😊"
}
if(context.entities?.hActionDecider=="Add Address"){
    txt="Sure, I can help you add a new address. 😊"
}
print(txt)
var txt="Sure, I can help your with that. 😊"
if(context.entities?.hActionDecider=="Modify Address"){
    txt="Sure! I can help you update your address. 😊"
}
if(context.entities?.hActionDecider=="Add Address"){
    txt="Sure, I can help you add a new address. 😊"
}
print(txt)
var info = context.fetchDeliveryAddressDetails.response.body.addresses;
var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Address Details",
        "showMore": "true",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": [],
        // "buttons": []
    }
}

var elements = []
for(i=0;i<info.length ;i++){
    var address = {
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMCAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTk5NjcgMTguODMzM0MxMC44MzMgMTQuNjY2NyAxNi42NjYzIDE0LjE4MTkgMTYuNjY2MyA4LjgzMzMyQzE2LjY2NjMgNS4xNTE0MiAxMy42ODE2IDIuMTY2NjYgOS45OTk2NyAyLjE2NjY2QzYuMzE3NzggMi4xNjY2NiAzLjMzMzAxIDUuMTUxNDIgMy4zMzMwMSA4LjgzMzMyQzMuMzMzMDEgMTQuMTgxOSA5LjE2NjM0IDE0LjY2NjcgOS45OTk2NyAxOC44MzMzWiIgc3Ryb2tlPSIjMzQ0MDU0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05Ljk5OTY3IDExLjMzMzNDMTEuMzgwNCAxMS4zMzMzIDEyLjQ5OTcgMTAuMjE0IDEyLjQ5OTcgOC44MzMzMkMxMi40OTk3IDcuNDUyNjEgMTEuMzgwNCA2LjMzMzMyIDkuOTk5NjcgNi4zMzMzMkM4LjYxODk2IDYuMzMzMzIgNy40OTk2NyA3LjQ1MjYxIDcuNDk5NjcgOC44MzMzMkM3LjQ5OTY3IDEwLjIxNCA4LjYxODk2IDExLjMzMzMgOS45OTk2NyAxMS4zMzMzWiIgc3Ryb2tlPSIjMzQ0MDU0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                "title": info[i].address1 +" "+ info[i].address2 ,
                "flag":"addressTemplate", 
                "values": [
                    {
                        "title":info[i].city+","+info[i].country+" "+info[i].zip,
                        "style": {
                            "color": "#344054"
                        }
                    }
                ]
        }
        
    elements.push(address)
}

message.payload.elements = elements
print(JSON.stringify(message));
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName


var orderDetails = context.getOrdersDetails.response?.body?.orders
var trackingStatus = context.getOrderTrackingInfo?.response?.body


for (let i = 0; i < orderDetails.length; i++) {
    itemNum = context.entities.itemId.split('&')[0]
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


var elements = [];
var deliveryDateNeeded = ["fulfilled", "Placed", "In Transit"]




var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Item details",
        "showMore": "false",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", // limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}
let orderDate = orderDetails.created_at?.split("T")[0];
let orderId = orderDetails.id;
let i = context.entities.recentOrderItems ? 1 : orderDetails.line_items.length;
let billingAddress = orderDetails.billing_address;
let address;
if (eCommercePlatform == "Shopify") {
    let shippingAddress = orderDetails.shipping_address
    if (billingAddress?.address1)
        address = billingAddress?.address1 + ", " + billingAddress?.city + ", " + billingAddress?.address2 + ", " + billingAddress?.country + " " + billingAddress?.zip

    if (shippingAddress?.address1)
        address = shippingAddress?.address1 + ", " + shippingAddress?.city + ", " + shippingAddress?.address2 + ", " + shippingAddress?.country + " " + shippingAddress?.zip

}
if (eCommercePlatform == "SFCC") {
    // address = billingAddress?.address1||""+", "+billingAddress?.city||""+", "+billingAddress?.address2||""+", "+billingAddress?.country||""+" "+billingAddress?.zip||""
    let addressParts = [
        billingAddress?.address1,
        billingAddress?.city,
        billingAddress?.address2,
        billingAddress?.country,
        billingAddress?.zip
    ];
    address = addressParts.filter(part => part).join(", ");
}

for (const orderItem of orderDetails.line_items) {
    i = i - 1;
    let itemStatus;
    if (eCommercePlatform == "Shopify") {
        itemStatus = trackingStatus[orderItem.id]?.status || "";
    }
    if (eCommercePlatform == "SFCC") {
        itemStatus = "Placed";
    }
    let trackingUrl = trackingStatus[orderItem.id]?.trackingUrl || "";
    // let deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleString().split(",")[0];
    const currentItem = {
        "icon": context.imageSkuMap[orderItem.sku],
        "title": orderItem.name,
        //"subtitle": "QTY: " + orderItem.quantity + " x $" + orderItem.price,
        "flag": "ItemdetailsScreen",
        "titleStyle": {
            "color": "#101828",
            "font-size": "12px",
        },
        "subTitleStyle": {
            "color": "#101828",
            "font-size": "14px",
        },
        "description": [
            {
                "title": "Qty:",
                "value": orderItem.quantity + " x $" + orderItem.price,
                "detailStyle": {
                    "color": "#344054",
                    "font-size": "12px",
                    "font-weight": "400"
                },
            },
        ],
        "descriptionDetails": [
            {
                "title": "Order Date",
                "value": ": " + orderDate,
            },
            {
                "title": "Order ID",
                "value": ": " + orderId,
            },
            {
                "title": "Item ID",
                "value": ": " + orderItem.id,
            },
            {
                "title": "Order Total",
                "value": ": " + getFormattedCurrency(orderDetails.total_price) + " (" + orderDetails.line_items.length + " Items)",
            },
            {
                "title": "Status",
                "value": ": " + itemStatus,
                "valueStyle": {
                    "color": "#039855"
                }
            },
            {
                "title": "Shipping Address",
                "value": ": " + (address || "No shipping Address"),
            }
        ]
    };
    if (eCommercePlatform == "SFCC") {
        currentItem.icon = context.imageSkuMap[orderItem.id]?.imageUrl
    }
    let deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    if (trackingStatus[orderItem.id]?.status == 'Delivered') {
        let trackingDate = trackingStatus[orderItem.id]?.deliveryDate?.split("T")[0] || trackingStatus[orderItem.id]?.updatedAt?.split("T")[0];
        currentItem["descriptionDetails"].push({
            "title": "Delivered Date",
            "value": ": " + trackingDate
        })
    }
    else if (deliveryDateNeeded.includes(trackingStatus[orderItem.id]?.status)) {
        currentItem["descriptionDetails"].push({
            "title": "Est.Delivery Date",
            "value": ": " + deliveryDate
        })


    }

    if (trackingUrl) {
        currentItem.descriptionDetails.push({
            "title": "Tracking Url",
            "value": trackingUrl,
        });
    }
    if (i == 0) {

        currentItem["summaryDetails"] = [
            {
                "title": "Order Summary",
                "description": [
                    {
                        "title": "Order Price",
                        "value": getFormattedCurrency(orderDetails.total_line_items_price)
                    },
                    {
                        "title": "Tax",
                        "value": getFormattedCurrency(orderDetails.total_tax)
                    },
                    {
                        "title": "Total",
                        "value": getFormattedCurrency(orderDetails.total_price)
                    },
                    {
                        "title": "Discount",
                        "value": getFormattedCurrency(orderDetails.total_discounts)
                    }
                ]
            }
        ],
            currentItem["totalSummary"] = [
                {
                    "title": "Order Total",
                    "value": getFormattedCurrency(orderDetails.total_price)
                },
            ]
    }
    elements.push(currentItem);
}

message.payload.elements = elements;
var agentMsg = "Details\n";

for (let i = 0; i < message.payload.elements.length; i++) {
    agentMsg += "________________________________\n"
    let ele = message.payload?.elements[i];
    agentMsg += "Title : " + ele.title + "\n"
    agentMsg += ele?.description[0]?.title + " " + ele?.description[0]?.value + "\n";
}
message["text"] = agentMsg;

// var msg1 = {
//     "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/image",
//     "content": {
//         "mediaUrl": elements[0].icon,
//         "caption": `*Product Name*: ${ elements[0]?.title}\n *Order Date* ${elements[0].descriptionDetails[0].value}\n *Order ID* ${elements[0].descriptionDetails[1].value}\n *Order Total* ${elements[0].descriptionDetails[3].value} \n *Status*: ${elements[0].descriptionDetails[4].value}\n *Shipping Address* : ${address}\n *Est.Delivery Date*: 2024-06-06`
//     }
// }

var msg = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "header": {
        "type": "IMAGE",
        "mediaUrl": elements[0].icon
    },
    "body": {
        "text": `*Product Name*: ${ elements[0]?.title}\n *Order Date* ${elements[0].descriptionDetails[0].value}\n *Order ID* ${elements[0].descriptionDetails[1].value}\n *Order Total* ${elements[0].descriptionDetails[3].value} \n *Status*: ${elements[0].descriptionDetails[4].value}\n *Shipping Address* : ${address}\n *Est.Delivery Date*: 2024-06-06`
    },
    "action": {
        "buttons": [
            {
                "type": "REPLY",
                "id": "Chat With Us",
                "title": "Chat With Us"
            }
        ]
    }
}

print(JSON.stringify(msg));
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName


var orderDetails = context.getOrdersDetails.response?.body?.orders
var trackingStatus = context.getOrderTrackingInfo?.response?.body


    for (let i = 0; i < orderDetails.length; i++) {
        itemNum = context.entities.itemId.split('&')[0]
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


var elements = [];
var deliveryDateNeeded = ["fulfilled" , "Placed", "In Transit"]




var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Item details",
        "showMore": "false",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", // limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}
let orderDate = orderDetails.created_at?.split("T")[0];
let orderId = orderDetails.id;
let i = context.entities.recentOrderItems ? 1 : orderDetails.line_items.length;
let billingAddress = orderDetails.billing_address;
let address;
if (eCommercePlatform == "Shopify") {
let shippingAddress = orderDetails.shipping_address
if(billingAddress?.address1)
    address = billingAddress?.address1+", "+billingAddress?.city+", "+billingAddress?.address2+", "+billingAddress?.country+" "+billingAddress?.zip

if(shippingAddress?.address1)
    address = shippingAddress?.address1+", "+shippingAddress?.city+", "+shippingAddress?.address2+", "+shippingAddress?.country+" "+shippingAddress?.zip

}
if (eCommercePlatform == "SFCC") {
        // address = billingAddress?.address1||""+", "+billingAddress?.city||""+", "+billingAddress?.address2||""+", "+billingAddress?.country||""+" "+billingAddress?.zip||""
        let addressParts = [
                billingAddress?.address1,
                billingAddress?.city,
                billingAddress?.address2,
                billingAddress?.country,
                billingAddress?.zip
        ];
        address = addressParts.filter(part => part).join(", ");
}

for (const orderItem of orderDetails.line_items) {
    i = i-1;
    let itemStatus;
    if (eCommercePlatform == "Shopify") {
    itemStatus = trackingStatus[orderItem.id]?.status || "";
    } 
    if (eCommercePlatform == "SFCC") {
        itemStatus ="Placed";
    }
    let trackingUrl = trackingStatus[orderItem.id]?.trackingUrl || "";
    // let deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleString().split(",")[0];
    const currentItem = {
        "icon": context.imageSkuMap[orderItem.sku],
        "title": orderItem.name,
        //"subtitle": "QTY: " + orderItem.quantity + " x $" + orderItem.price,
        "flag": "ItemdetailsScreen",
        "titleStyle": {
            "color": "#101828",
            "font-size": "12px",
        },
        "subTitleStyle": {
            "color": "#101828",
            "font-size": "14px",
        },
        "description": [
            {
                "title": "Qty:",
                "value": orderItem.quantity + " x $" + orderItem.price,
                "detailStyle": {
                    "color": "#344054",
                    "font-size": "12px",
                    "font-weight": "400"
                },
            },
        ],
        "descriptionDetails": [
            {
                "title": "Order Date",
                "value": ": " + orderDate,
            },
            {
                "title": "Order ID",
                "value": ": " + orderId,
            },
            {
                "title": "Item ID",
                "value": ": " + orderItem.id,
            },
            {
                "title": "Order Total",
                "value": ": " + getFormattedCurrency(orderDetails.total_price) + " (" + orderDetails.line_items.length + " Items)",
            },
            {
                "title": "Status",
                "value": ": " + itemStatus,
                "valueStyle": {
                    "color": "#039855"
                }
            },
            {
                "title": "Shipping Address",
                "value": ": " +(address || "No shipping Address"),
            }
        ]
    };
    if(eCommercePlatform == "SFCC") {
        currentItem.icon = context.imageSkuMap[orderItem.id]?.imageUrl
    }
    let deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    if (trackingStatus[orderItem.id]?.status == 'Delivered') {
         let trackingDate = trackingStatus[orderItem.id]?.deliveryDate?.split("T")[0] || trackingStatus[orderItem.id]?.updatedAt?.split("T")[0];
        currentItem["descriptionDetails"].push({
                "title": "Delivered Date",
                "value": ": " +trackingDate
        })
    }
    else if(deliveryDateNeeded.includes(trackingStatus[orderItem.id]?.status)){
        currentItem["descriptionDetails"].push({
                "title": "Est.Delivery Date",
                "value": ": " + deliveryDate
        })
        
        
    }

    if (trackingUrl) {
        currentItem.descriptionDetails.push({
            "title": "Tracking Url",
            "value":  trackingUrl,
        });
    }
    if (i == 0) {
        
        currentItem["summaryDetails"] = [
            {
                "title": "Order Summary",
                "description": [
                    {
                        "title": "Order Price",
                        "value": getFormattedCurrency(orderDetails.total_line_items_price)
                    },
                    {
                        "title": "Tax",
                        "value": getFormattedCurrency(orderDetails.total_tax)
                    },
                    {
                        "title": "Total",
                        "value": getFormattedCurrency(orderDetails.total_price)
                    },
                    {
                        "title": "Discount",
                        "value": getFormattedCurrency(orderDetails.total_discounts)
                    }
                ]
            }
        ],
            currentItem["totalSummary"] = [
                {
                    "title": "Order Total",
                    "value": getFormattedCurrency(orderDetails.total_price)
                },
            ]
    }
    elements.push(currentItem);
}

message.payload.elements = elements;
 var agentMsg = "Details\n";

    for (let i = 0; i < message.payload.elements.length ; i++) {
      agentMsg += "________________________________\n"
      let ele = message.payload?.elements[i];
      agentMsg += "Title : " + ele.title + "\n"
      agentMsg += ele?.description[0]?.title + " " + ele?.description[0]?.value + "\n";
    }
    message["text"] = agentMsg;
print(JSON.stringify(message));
// var items = context.lineItems
var ordersData = context.sfccGetOrdersDetails?.response?.body?.orders;
var lineItems = []
var productData = []
var specificOrder = context.sfccGetSpecificOrder?.response?.body
if(specificOrder?.order?.id && specificOrder?.order?.email == context.session.BotUserSession.UserInfo.email ){
    var ordersData = [specificOrder?.order]
}
if (context.entities.hTitleName) {
    for (i = 0; i < ordersData.length; i++) {
        for (j = 0; j < ordersData[i].line_items.length; j++) {
            let lineItem = ordersData[i].line_items[j]
            if (lineItem.name == context.entities.hTitleName) {
                productData.push({
                    "orderId": ordersData[i].id,
                    "itemId": lineItem.id,
                    "title": lineItem.name,
                    "price": lineItem.price,
                    "sku": lineItem.id,
                    "quantity":lineItem.quantity,
                    "image" : lineItem.image
                })
            }
        }

    }
}


if(productData.length==0){
for(i=0;i<ordersData.length ; i++){
    for(j=0 ; j<ordersData[i].line_items.length ; j++){
        let lineItem = ordersData[i].line_items[j]
        lineItems.push({
            "orderId" : ordersData[i].id,
            "itemId" : lineItem.id,
            "title" : lineItem.name,
            "price" : lineItem.price,
            "sku": lineItem.id,
            "quantity":lineItem.quantity,
            "image" : lineItem.image
        })
    }
    
}

}
else{
    lineItems = productData
}

var items = lineItems
// var message = {
//     "type": "template",
//     "AlwaysShowGlobalButtons": false,
//     "payload": {
//         "template_type": "list",
//         "elements": [],
//         "buttons": []
//     }
// }
// var elements = []
// var fullLength = items.length;
// if (fullLength < 3) {
//     context.showMoreClickCount=0;
// }
// for (let i = context.showMoreClickCount; i < fullLength; i++) {
//     elements.push({
//         "title": items[i].title,
//         "image_url": context.imageSkuMap[items[i].sku],
//         "subtitle": "Item Id : "+items[i].itemId +"\nPrice : "+getFormattedCurrency(items[i].price)+"\nQuantity : "+items[i].quantity,//text
//         "buttons": [{
//             "title": "Select",
//             "type": "postback",
//             "payload": items[i].itemId+"&"+items[i].orderId
//         }]
//     })
// }
// message.payload.elements = elements;
// if(fullLength - context.showMoreClickCount -3 > 0){
//     message.payload.buttons=[{
//         "title": "Show More",
//         "type": "postback",
//         "payload": "Show More"
//     }]
// }

// print(JSON.stringify(message));



var message = {
    "type": "template",
    //"text":"test for agent",
    "payload": {
        "template_type": "retailOrderSelection",
        // "text":"test for agent",
        // "dummyKey" : "Dummy",
        "card_type": "detail",
        "title": "Select your item",
        "showMore": "true",
        "showMoreTitle": "Show more", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements":[]
    }
    
}
var fullLength = items.length;
// if (fullLength < 4) {
//     message.payload.showMore = "false"
//     context.showMoreClickCount=0;
// }
elements = []
for(i=context.showMoreClickCount;i<fullLength ; i++){
    elements.push({
                "icon":items[i].image,
                "title": items[i].title, // title
                //"subTitle": "Price : "+getFormattedCurrency(items[i].price)+"\nQuantity : "+items[i].quantity, // sub-title
                //"value": "Delivered", // value
                "titleStyle": {
                    "color": "#101828",
                    "font-size": "12px",
                },
                // "subTitleStyle": {
                //     "color": "#101828",
                //     "font-size": "14px",
                // },
                // "valueStyle": {   // change to valuestyle
                //     "color": "#12B76A",
                //     "background": "#ECFDF3",
                //     "font-size": "12px",
                //     "font-weight": "500"
                // },
                "description": [
                    {
                        "title": "Item ID : ",
                        "value": items[i].itemId,
                        "detailStyle": {
                            "color": "#344054",
                            "font-size": "12px",
                            "font-weight": "400"
                        },
                    },{
                        "title": "Price : ",
                        "value": getFormattedCurrency(items[i].price),
                        "detailStyle": {
                            "color": "#344054",
                            "font-size": "12px",
                            "font-weight": "400"
                        },
                    },
                ],

                "buttons": [
                    {
                        "title": "View Details",
                        //"buttonTitle": "Show more",
                        "type": "postback",
                        "value": "status item "+items[i].itemId+"&"+items[i].orderId,
                        "payload": "status item "+items[i].itemId+"&"+items[i].orderId,
                        "buttonStyle": {
                            "color": "#101828",
                            "border-radius": "4px",
                            "border": "1px solid #D0D5DD",
                            "background": "#fff"
                        },
                    }
                ],

            })
}

message.payload.elements = elements


var agentMsg = "Select your Order\n";
var len = Math.min(3,fullLength)
for (let i = 0; i < len; i++) {
  agentMsg += "________________________________\n"
  let ele = message.payload.elements[i];
  agentMsg += "Title : " + ele.title + "\n"
  agentMsg += ele.description[0].title + " " + ele.description[0].value + "\n";
  agentMsg += ele.description[1].title + " " + ele.description[1].value + "\n";
}
message["text"] = agentMsg;

print(JSON.stringify(message))

var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
koreDebugger.log("Print " + eCommercePlatform)



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
var deliveryDateNeeded = ["fulfilled" , "Placed", "In Transit"]




var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Item details",
        "showMore": "false",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", // limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}
let orderDate = orderDetails.created_at?.split("T")[0];
let orderId = orderDetails.id;
let i = context.entities.recentOrderItems ? 1 : orderDetails.line_items.length;
let billingAddress = orderDetails.billing_address
let shippingAddress = orderDetails.shipping_address
let address
if(billingAddress?.address1)
    address = billingAddress?.address1+", "+billingAddress?.city+", "+billingAddress?.address2+", "+billingAddress?.country+" "+billingAddress?.zip

if(shippingAddress?.address1)
    address = shippingAddress?.address1+", "+shippingAddress?.city+", "+shippingAddress?.address2+", "+shippingAddress?.country+" "+shippingAddress?.zip



for (const orderItem of orderDetails.line_items) {
    i = i-1;
    let itemStatus = trackingStatus[orderItem.id]?.status || "";
    let trackingUrl = trackingStatus[orderItem.id]?.trackingUrl;
    // let deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleString().split(",")[0];
    const currentItem = {
        "icon": context.imageSkuMap[orderItem.sku],
        "title": orderItem.name,
        //"subtitle": "QTY: " + orderItem.quantity + " x $" + orderItem.price,
        "flag": "ItemdetailsScreen",
        "titleStyle": {
            "color": "#101828",
            "font-size": "12px",
            "font-weight":"bold"
        },
        "subTitleStyle": {
            "color": "#101828",
            "font-size": "14px",
        },
        "description": [
            {
                "title": "Qty:",
                "value": orderItem.quantity + " x $" + orderItem.price,
                "detailStyle": {
                    "color": "#344054",
                    "font-size": "12px",
                    "font-weight": "400"
                },
            },
        ],
        "descriptionDetails": [
            {
                "title": "Order Date",
                "value": ": " + orderDate,
            },
            {
                "title": "Order ID",
                "value": ": " + orderId,
            },
            {
                "title": "Item ID",
                "value": ": " + orderItem.id,
            },
            {
                "title": "Order Total",
                "value": ": " + getFormattedCurrency(orderDetails.total_price) + " (" + orderDetails.line_items.length + " Items)",
            },
            {
                "title": "Status",
                "value": ": " + itemStatus,
                "valueStyle": {
                    "color": "#039855"
                }
            },
            {
                        "title": "Shipping Address",
                        "value": ": " +( address || "No shipping Address"),
            }
            // {
            // "title": "Tracking Url",
            // "value": "https://korebot.aftership.com/FED-7654321",
            // }
        ]
    };
    let deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    if (trackingStatus[orderItem.id]?.status == 'Delivered') {
        let trackingDate = trackingStatus[orderItem.id]?.deliveryDate?.split("T")[0] || trackingStatus[orderItem.id]?.updatedAt?.split("T")[0];
        currentItem["descriptionDetails"].push({
                "title": "Delivered Date",
                "value": ": " + trackingDate
        })
    }
    else if(deliveryDateNeeded.includes(trackingStatus[orderItem.id]?.status)){
        currentItem["descriptionDetails"].push({
                "title": "Est.Delivery Date",
                "value": ": " + deliveryDate
        })
        
        
    }

    if (trackingUrl) {
        currentItem.descriptionDetails.push({
            "title": "Tracking Url",
            "value": trackingUrl,
        });
    }
    if (i == 0) {
        
        currentItem["summaryDetails"] = [
            {
                "title": "Order Summary",
                "description": [
                    {
                        "title": "Order Price",
                        "value": getFormattedCurrency(orderDetails.total_line_items_price)
                    },
                    {
                        "title": "Tax",
                        "value": getFormattedCurrency(orderDetails.total_tax)
                    },
                    {
                        "title": "Discount",
                        "value": getFormattedCurrency(orderDetails.total_discounts)
                    },
                    {
                        "title": "Total",
                        "value": getFormattedCurrency(orderDetails.total_price)
                    }
                ]
            }
        ],
            currentItem["totalSummary"] = [
                {
                    "title": "Order Total",
                    "value": getFormattedCurrency(orderDetails.total_price)
                },
            ]
    }
    elements.push(currentItem);
}

message.payload.elements = elements;

 var agentMsg = "Details\n";

    for (let i = 0; i < message.payload.elements.length ; i++) {
      agentMsg += "________________________________\n"
      let ele = message.payload?.elements[i];
      agentMsg += "Title : " + ele.title + "\n"
      agentMsg += ele?.description[0]?.title + " " + ele?.description[0]?.value + "\n";
    }
    message["text"] = agentMsg;


print(JSON.stringify(message));
} else if (eCommercePlatform == "SFCC") {
    // to show all line items in the bot
orderDetails = context.orderDetails



var elements = [];
var deliveryDateNeeded = ["fulfilled", "Placed", "In Transit"]


var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Item details",
        "showMore": "false",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", // limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}
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
    i = i - 1;
    let itemStatus = "Placed"
    // let deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleString().split(",")[0];
    const currentItem = {
        //"icon": context.imageSkuMap[orderItem.id],
        "icon": context.imageSkuMap[orderItem.id].imageUrl,
        "title": orderItem.name,
        //"subtitle": "QTY: " + orderItem.quantity + " x $" + orderItem.price,
        "flag": "ItemdetailsScreen",
        "titleStyle": {
            "color": "#101828",
            "font-size": "12px",
            "font-weight": "bold"
        },
        "subTitleStyle": {
            "color": "#101828",
            "font-size": "14px",
        },
        "description": [{
            "title": "Qty:",
            "value": orderItem.quantity + " x $" + orderItem.price,
            "detailStyle": {
                "color": "#344054",
                "font-size": "12px",
                "font-weight": "400"
            },
        }, ],
        "descriptionDetails": [{
                "title": "Order Date",
                "value": ": " + orderDate,
            },
            {
                "title": "Order ID",
                "value": ": " + orderId,
            },
            {
                "title": "Item ID",
                "value": ": " + orderItem.id,
            },
            {
                "title": "Order Total",
                "value": ": " + getFormattedCurrency(orderDetails.total_price) + " (" + orderDetails.line_items.length + " Items)",
            },
            {
                "title": "Status",
                "value": ": " + itemStatus,
                "valueStyle": {
                    "color": "#039855"
                }
            },
            {
                "title": "Shipping Address",
                "value": ": " + address,
            }
        ]
    };
    let deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    currentItem["descriptionDetails"].push({
        "title": "Est.Delivery Date",
        "value": ": " + deliveryDate
    })
    if (i == 0) {

        currentItem["summaryDetails"] = [{
                "title": "Order Summary",
                "description": [{
                        "title": "Order Price",
                        "value": getFormattedCurrency(orderItem.price)
                    },
                    {
                        "title": "Tax",
                        "value": getFormattedCurrency(0)
                    },
                    {
                        "title": "Discount",
                        "value": getFormattedCurrency(0)
                    },
                    {
                        "title": "Total",
                        "value": getFormattedCurrency(orderItem.price)
                    }
                ]
            }],
            currentItem["totalSummary"] = [{
                "title": "Order Total",
                "value": getFormattedCurrency(orderDetails?.total_price)
            }, ]
    }
    elements.push(currentItem);
}

message.payload.elements = elements;
// message["text"] = agentMsg;

print(JSON.stringify(message));
}

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
var deliveryDateNeeded = ["fulfilled" , "Placed", "In Transit"]
var message = {
    "type": "template",
    "payload": {
        "template_type": "listWidget",
        "title": "Order",
        "description": "",
        "elements": []
    },
}
orderDate = orderDetails.created_at.split("T")[0]
elements.push({
    "subtitle": "Order Date  :   "+orderDate+"       \nOrder Id     :       " + orderDetails.id + "\nOrder Total  :       " + getFormattedCurrency(orderDetails.total_price) + " ("+ orderDetails.line_items.length + " Items)"
})
elements.push({"title":"Items"});
for (const orderItem of orderDetails.line_items) {
    const currentItem = {
        "image": {
            "image_type": "image",
            "image_src": context.imageSkuMap[orderItem.sku],
            "radius": 20,
            "size": "large"
        },
        "title": orderItem.name,
        "subtitle": "QTY: " + orderItem.quantity + " x $" + orderItem.price,
        "details": [{
            "description": "Sku : " + orderItem.sku
        }, {
            "description": "Item No: " + orderItem.id
        }]
    };

    if (trackingStatus[orderItem.id]?.trackingUrl) {
        currentItem.details.unshift({
            "description": "Status : " + trackingStatus[orderItem.id].status
        });

        currentItem.default_action = {
            "type": "postback",
            "payload": trackingStatus[orderItem.id]?.trackingUrl
        };

        elements.push(currentItem);
    } else if (trackingStatus[orderItem.id]?.status) {
        currentItem.details.unshift({
            "description": "Status : " + trackingStatus[orderItem.id].status
        });

        elements.push(currentItem);
    } else {
        const futureDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
        estimatedDate = futureDate.toString();
        currentItem.details.unshift({
            "description": "Estimated Delivery : " + estimatedDate
        });

        elements.push(currentItem);
    }
}

elements.push({
    "title": "Order Summary",
    "subtitle": "Item total      " + getFormattedCurrency(orderDetails.total_line_items_price) + "\nTax                  "+getFormattedCurrency(orderDetails.total_tax)+"\nTotal               " + getFormattedCurrency(orderDetails.total_price) + "\nDiscount      "+getFormattedCurrency(orderDetails.total_discounts), 
    "title": "Order Total:     " + getFormattedCurrency(orderDetails.total_price)
})
message.payload.elements = elements;
print(JSON.stringify(message));

var quickReplies = ["Incorrect Response", "Outdated Response", "Incomplete Response"];
var message = {
    "type": "template",
    "style": "block",
    "payload": {
        "template_type": "quick_replies",
        "text": "We're sorry to hear that. Could you please let us know why you gave a thumbs down? Your feedback will help us improve.",
        "quick_replies": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "content_type": "text",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    /* Uncomment this if both text and image needs to displayed for the  quick reply button
     var quickReply = {
     "content_type":"text",
     "title":quickReplies[i],
     "payload":"payload2",
     "image_url": "url of the image
     };
     */
    message.payload.quick_replies.push(quickReply);
}
print(JSON.stringify(message));

{{content.SOP_addrNotFoundMsg}}
txt="Got it. This is the default address on your profile. To delete this address, please add another address as the default first."
if(context.fetchDeliveryAddressDetails?.response?.body?.addresses.length>1){
    txt="You cannot delete this address because it is set as the default one on your profile. To delete this address please set another address as default first"
}
print(txt)
Please click the link to proceed with signup
orderId = context.entities.ivrOrderId || context.entities.hIvrOrderId;
var order = context.orderStatus;
if (orderId) {
	order = order.find(order => order.id % 10000 == parseInt(orderId));
	if(context.entities?.multipleItemsOrder!="all"){
	    cnt=parseInt(context.entities.multipleItemsOrder)
	    order.result=order.result.slice(cnt-1,cnt)
	}
} else {
	order = order.find(order => order.id == context.orderStatus[0].id);
}
txt = "";
for (let i = 0; i < order.result.length; i++) {
	name = order.result[i].name;
	status = order.result[i].status;
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

print(txt);



// Cancelled
// "Return Rejected",
//     "OPEN": "Return Inprogress",
//     "REQUESTED": "Return Requested",
//     "CLOSED": "Returned",
//     "DECLINED": "Return Declined"
//     Return Rejected
const title = context.noOfOTPAttempts
  ? context.action == "Email"
    ? "I have sent a new code to your email address. Please enter it here"
    : "I have sent a new code to your phone number. Please enter it here"
  : context.action=="Phone Number"
    ? "Enter the  one-time code sent to " + context.forms.UpdatePhoneNo?.phone
    : "Enter the one-time code sent to " + context.forms.UpdateEmail?.email;


print(title)
var info = ["Log in", "Sign up"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Login or Sign up",
        "subText": "Login or Sign up",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));





// var quickReplies = ["Log in", "Sign up"];
// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "quick_replies",
//         "text": "Login or Sign up",
//         "quick_replies": []
//     }
// };

// for (i = 0; i < quickReplies.length; i++) {
//     //if only text needs to diplayed
//     var quickReply = {
//         "content_type": "text",
//         "title": quickReplies[i],
//         "payload": quickReplies[i]
//     };
//     message.payload.quick_replies.push(quickReply);
// }
// print(JSON.stringify(message));
var info = ["Log in", "Sign up"];
var message = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "button",
            "text": "Login or Sign up",
            "buttons": []
        }
    }
};

for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform      
    var button = {
            "type": "postback",
            "title": info[i],
            "payload": info[i]
        };

    message.attachment.payload.buttons.push(button);
}
print(JSON.stringify(message));
var msg = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": "Login or Sign up"
    },
    "action": {
        "buttons": [
            {
                "type": "REPLY",
                "id": "Log in",
                "title": "Log in"
            },
            {
                "type": "REPLY",
                "id": "Sign Up",
                "title": "Sign Up"
            }
        ]
    }
}
print(JSON.stringify(msg));
var info = ["Return-then-ship", "Cross-ship"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Which way would you prefer to exchange?",
        "subText": "",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));

var info=context.getProductId.response.body.data?.products?.edges;
var cartInfo=context.getCartItems.response.body.data?.cart?.lines?.edges
var cartDetails=context.cartDetails.selectedItems

var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Review items",
        "showMore": "true",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": [],
        "buttons": [
            {
                "title": "Continue",
                //"buttonTitle": "Continue",
                "type": "postback",
                "value": "Continue",
                "buttonStyle": {
                    "background": "#344054",
                    "color": "#FFF",
                    "width": "48%",
                    "border": "1px solid #344054"
                }
            }]
    }
}    
for(let i=0;i<cartDetails.length;i++) {
    
        var elements={
                "icon": cartDetails[i].imageUrl,
                "title": cartDetails[i].title, //+"\n Excepted delivery by"+getFormattedDate(new Date((new Date()).getTime() + 5 * 24 * 60 * 60 * 1000)),
                "flag":"addressTemplate", 
                "values": [
                    ,{
                        "title": "Expected delivery date: " + getFormattedDate(new Date((new Date()).getTime() + 5 * 24 * 60 * 60 * 1000)),
                        "style": {
                            "color": "#344054"
                        }
                    },{
                        "title": "Qty: "+cartDetails[i].quantity+", ",
                        "style": {
                            "color": "#344054"
                        }
                    },{
                        "title": "Price: " +getFormattedCurrency(cartDetails[i].quantity*cartDetails[i].price),
                        "style": {
                            "color": "#344054"
                        }
                    }
                ],
               
        }
        message.payload.elements.push(elements)
    
}
print(JSON.stringify(message));
// var items = context.lineItems
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
koreDebugger.log("Print " + eCommercePlatform)

if (eCommercePlatform == "Shopify") {
    let data;
    if(context.GenerativeAINode?.GenAIPromptFindAnOrder) {
    try {
        data = JSON.stringify(context.GenerativeAINode.GenAIPromptFindAnOrder);
    } catch (error) {
        koreDebugger.log("Error stringifying data: " + error.message);
    }
    }
    var ordersData = context.getOrdersDetails?.response?.body?.orders;
    var lineItems = []
    var productData = []
    var specificOrder = context.getSpecificOrder?.response?.body
    if(specificOrder?.order?.id && specificOrder?.order?.email == context.session.BotUserSession.UserInfo.email ){
        var ordersData = [specificOrder?.order]
    }
    if (context.entities.hTitleName) {
        for (i = 0; i < ordersData.length; i++) {
            for (j = 0; j < ordersData[i].line_items.length; j++) {
                let lineItem = ordersData[i].line_items[j]
                if (lineItem.name == context.entities.hTitleName) {
                    productData.push({
                        "orderId": ordersData[i].id,
                        "itemId": lineItem.id,
                        "title": lineItem.name,
                        "price": lineItem.price,
                        "sku": lineItem.sku,
                        "quantity":lineItem.quantity
                    })
                }
            }
        }
    }
    
    if(productData.length==0){
    for(i=0;i<ordersData.length ; i++){
        for(j=0 ; j<ordersData[i].line_items.length ; j++){
            let lineItem = ordersData[i].line_items[j]
            lineItems.push({
                "orderId" : ordersData[i].id,
                "itemId" : lineItem.id,
                "title" : lineItem.name,
                "price" : lineItem.price,
                "sku" : lineItem.sku,
                "quantity":lineItem.quantity
            })
        }
    }
    
    }
    else{
        lineItems = productData
    }
    
    var items = lineItems

    var message = {
        "type": "template",
        //"text":"test for agent",
        "payload": {
            "template_type": "retailOrderSelection",
            // "text":"test for agent",
            // "dummyKey" : "Dummy",
            "card_type": "detail",
            "title": "Select your item",
            "showMore": "true",
            "showMoreTitle": "Show more", // we can customize
            "displayLimit": "3", //  limit for show more
            "isSelectionEnabled": "true",
            "elements":[]
        }
    }
    var fullLength = items.length;
    // if (fullLength < 4) {
    //     message.payload.showMore = "false"
    //     context.showMoreClickCount=0;
    // }
    let elements = []
    //Check if the `data` array contains any null values.
    if (!data || !env.isDigitalGenAIEnabled || data?.includes(null)){
        for (var i = 0; i < fullLength; i++) {
            elements.push({
                    "icon":context.imageSkuMap[items[i].sku],
                    "title": items[i].title, // title
                    //"subTitle": "Price : "+getFormattedCurrency(items[i].price)+"\nQuantity : "+items[i].quantity, // sub-title
                    //"value": "Delivered", // value
                    "titleStyle": {
                        "color": "#101828",
                        "font-size": "12px",
                    },
                    "description": [
                        {
                            "title": "Item ID : ",
                            "value": items[i].itemId,
                            "detailStyle": {
                                "color": "#344054",
                                "font-size": "12px",
                                "font-weight": "400"
                            },
                        },{
                            "title": "Price : ",
                            "value": getFormattedCurrency(items[i].price),
                            "detailStyle": {
                                "color": "#344054",
                                "font-size": "12px",
                                "font-weight": "400"
                            },
                        },
                    ],
    
                    "buttons": [
                        {
                            "title": "View Details",
                            //"buttonTitle": "Show more",
                            "type": "postback",
                            "value": "status item "+items[i].itemId+"&"+items[i].orderId,
                            "payload": "status item "+items[i].itemId+"&"+items[i].orderId,
                            "buttonStyle": {
                                "color": "#101828",
                                "border-radius": "4px",
                                "border": "1px solid #D0D5DD",
                                "background": "#fff"
                            },
                        }
                    ],
    
                })
        }
    }else {
        for(i=0;i<fullLength ; i++){
        //Check if the current `itemId` is included in the `data`.
        if (data?.includes(items[i].itemId.toString())){ 
        elements.push({
                    "icon":context.imageSkuMap[items[i].sku],
                    "title": items[i].title, // title
                    //"subTitle": "Price : "+getFormattedCurrency(items[i].price)+"\nQuantity : "+items[i].quantity, // sub-title
                    //"value": "Delivered", // value
                    "titleStyle": {
                        "color": "#101828",
                        "font-size": "12px",
                    },
                    "description": [
                        {
                            "title": "Item ID : ",
                            "value": items[i].itemId,
                            "detailStyle": {
                                "color": "#344054",
                                "font-size": "12px",
                                "font-weight": "400"
                            },
                        },{
                            "title": "Price : ",
                            "value": getFormattedCurrency(items[i].price),
                            "detailStyle": {
                                "color": "#344054",
                                "font-size": "12px",
                                "font-weight": "400"
                            },
                        },
                    ],
    
                    "buttons": [
                        {
                            "title": "View Details",
                            //"buttonTitle": "Show more",
                            "type": "postback",
                            "value": "status item "+items[i].itemId+"&"+items[i].orderId,
                            "payload": "status item "+items[i].itemId+"&"+items[i].orderId,
                            "buttonStyle": {
                                "color": "#101828",
                                "border-radius": "4px",
                                "border": "1px solid #D0D5DD",
                                "background": "#fff"
                            },
                        }
                    ],
    
                })
    }}
    }
    
    message.payload.elements = elements
    
    
    var agentMsg = "Select your Order\n";
    var len = Math.min(3, message.payload.elements.length)
    for (let i = 0; i < len; i++) {
      agentMsg += "________________________________\n"
      let ele = message.payload?.elements[i];
      agentMsg += "Title : " + ele.title + "\n"
      agentMsg += ele?.description[0]?.title + " " + ele?.description[0]?.value + "\n";
      agentMsg += ele?.description[1]?.title + " " + ele?.description[1]?.value + "\n";
    }
    message["text"] = agentMsg;
    
    
    print(JSON.stringify(message))
    
    
} else if (eCommercePlatform == "SFCC") {
    // var items = context.lineItems
    var ordersData = context.getOrdersDetails?.response?.body?.orders;
    var lineItems = []
    var productData = []
    var specificOrder = context.getSpecificOrder?.response?.body
    if(specificOrder?.order?.id && specificOrder?.order?.email == context.session.BotUserSession.UserInfo.email ){
        var ordersData = [specificOrder?.order]
    }
    if (context.entities.hTitleName) {
        for (i = 0; i < ordersData.length; i++) {
            for (j = 0; j < ordersData[i].line_items.length; j++) {
                let lineItem = ordersData[i].line_items[j]
                if (lineItem.name == context.entities.hTitleName) {
                    productData.push({
                        "orderId": ordersData[i].id,
                        "itemId": lineItem.id,
                        "title": lineItem.name,
                        "price": lineItem.price,
                        "sku": lineItem.id,
                        "quantity":lineItem.quantity,
                        "image" : lineItem.image
                    })
                }
            }
    
        }
    }
    
    
    if(productData.length==0){
    for(i=0;i<ordersData.length ; i++){
        for(j=0 ; j<ordersData[i].line_items.length ; j++){
            let lineItem = ordersData[i].line_items[j]
            lineItems.push({
                "orderId" : ordersData[i].id,
                "itemId" : lineItem.id,
                "title" : lineItem.name,
                "price" : lineItem.price,
                "sku": lineItem.id,
                "quantity":lineItem.quantity,
                "image" : lineItem.image
            })
        }
        
    }
    
    }
    else{
        lineItems = productData
    }
    
    var items = lineItems
    
    
    
    var message = {
        "type": "template",
        //"text":"test for agent",
        "payload": {
            "template_type": "retailOrderSelection",
            // "text":"test for agent",
            // "dummyKey" : "Dummy",
            "card_type": "detail",
            "title": "Select your item",
            "showMore": "true",
            "showMoreTitle": "Show more", // we can customize
            "displayLimit": "3", //  limit for show more
            "isSelectionEnabled": "true",
            "elements":[]
        }
        
    }
    var fullLength = items.length;
    // if (fullLength < 4) {
    //     message.payload.showMore = "false"
    //     context.showMoreClickCount=0;
    // }
    elements = []
    for(i=context.showMoreClickCount;i<fullLength ; i++){
        elements.push({
                    "icon":context.imageSkuMap[items[i].itemId]?.imageUrl,
                    "title": items[i].title, // title
                    //"subTitle": "Price : "+getFormattedCurrency(items[i].price)+"\nQuantity : "+items[i].quantity, // sub-title
                    //"value": "Delivered", // value
                    "titleStyle": {
                        "color": "#101828",
                        "font-size": "12px",
                    },
                    
            
                    "description": [
                        {
                            "title": "Item ID : ",
                            "value": items[i].itemId,
                            "detailStyle": {
                                "color": "#344054",
                                "font-size": "12px",
                                "font-weight": "400"
                            },
                        },{
                            "title": "Price : ",
                            "value": getFormattedCurrency(items[i].price),
                            "detailStyle": {
                                "color": "#344054",
                                "font-size": "12px",
                                "font-weight": "400"
                            },
                        },
                    ],
    
                    "buttons": [
                        {
                            "title": "View Details",
                            //"buttonTitle": "Show more",
                            "type": "postback",
                            "value": "status item "+items[i].itemId+"&"+items[i].orderId,
                            "payload": "status item "+items[i].itemId+"&"+items[i].orderId,
                            "buttonStyle": {
                                "color": "#101828",
                                "border-radius": "4px",
                                "border": "1px solid #D0D5DD",
                                "background": "#fff"
                            },
                        }
                    ],
    
                })
    }
    
    message.payload.elements = elements
    
    
    var agentMsg = "Select your Order\n";
    var len = Math.min(3,fullLength)
    for (let i = 0; i < len; i++) {
      agentMsg += "________________________________\n"
      let ele = message.payload.elements[i];
      agentMsg += "Title : " + ele.title + "\n"
      agentMsg += ele.description[0].title + " " + ele.description[0].value + "\n";
      agentMsg += ele.description[1].title + " " + ele.description[1].value + "\n";
    }
    message["text"] = agentMsg;
    
    print(JSON.stringify(message))

}

var items = context.lineItems
var message = {
    "type": "template",
    "AlwaysShowGlobalButtons": false,
    "payload": {
        "template_type": "list",
        "elements": [],
        "buttons": []
    }
}
var elements = []
var fullLength = items.length;
if (fullLength < 3) {
    context.showMoreClickCount=0;
}
for (let i = context.showMoreClickCount; i < fullLength; i++) {
    elements.push({
        "title": items[i].title,
        "image_url": context.imageSkuMap[items[i].sku],
        "subtitle": "Item Id : "+items[i].itemId +"\nPrice : "+getFormattedCurrency(items[i].price)+"\nQuantity : "+items[i].quantity,//text
        "buttons": [{
            "title": "Select",
            "type": "postback",
            "payload": items[i].itemId+"&"+items[i].orderId
        }]
    })
}
message.payload.elements = elements;
if(fullLength - context.showMoreClickCount -3 > 0){
    message.payload.buttons=[{
        "title": "Show More",
        "type": "postback",
        "payload": "Show More"
    }]
}

print(JSON.stringify(message));

// var items = context.lineItems
var eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName
koreDebugger.log("Print " + eCommercePlatform)

if (eCommercePlatform == "Shopify") {
    let data;
    if (context.GenerativeAINode?.GenAIPromptFindAnOrder) {
        try {
            data = JSON.stringify(context.GenerativeAINode.GenAIPromptFindAnOrder);
        } catch (error) {
            koreDebugger.log("Error stringifying data: " + error.message);
        }
    }
    var ordersData = context.getOrdersDetails?.response?.body?.orders;
    var lineItems = []
    var productData = []
    var specificOrder = context.getSpecificOrder?.response?.body
    if (specificOrder?.order?.id && specificOrder?.order?.email == context.session.BotUserSession.UserInfo.email) {
        var ordersData = [specificOrder?.order]
    }
    if (context.entities.hTitleName) {
        for (i = 0; i < ordersData.length; i++) {
            for (j = 0; j < ordersData[i].line_items.length; j++) {
                let lineItem = ordersData[i].line_items[j]
                if (lineItem.name == context.entities.hTitleName) {
                    productData.push({
                        "orderId": ordersData[i].id,
                        "itemId": lineItem.id,
                        "title": lineItem.name,
                        "price": lineItem.price,
                        "sku": lineItem.sku,
                        "quantity": lineItem.quantity
                    })
                }
            }
        }
    }

    if (productData.length == 0) {
        for (i = 0; i < ordersData.length; i++) {
            for (j = 0; j < ordersData[i].line_items.length; j++) {
                let lineItem = ordersData[i].line_items[j]
                lineItems.push({
                    "orderId": ordersData[i].id,
                    "itemId": lineItem.id,
                    "title": lineItem.name,
                    "price": lineItem.price,
                    "sku": lineItem.sku,
                    "quantity": lineItem.quantity
                })
            }
        }

    }
    else {
        lineItems = productData
    }

    var items = lineItems

    var message = {
        "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/list",
        "body": {
            "text": "List of items"
        },
        "action": {
            "title": "Please select one",
            "sections": []
        }
    }
    var fullLength = items.length;
    // if (fullLength < 4) {
    //     message.payload.showMore = "false"
    //     context.showMoreClickCount=0;
    // }
    let elements = []
    //Check if the `data` array contains any null values.
    if (!data || !env.isDigitalGenAIEnabled || data?.includes(null)) {
        for (var i = 0; i < fullLength; i++) {
            elements.push({
                title: items[i].itemId,
                description: items[i].title?.substring(0, 72),
                id: "status item " + items[i].itemId + "&" + items[i].orderId
            })
        }
    } else {
        for (i = 0; i < fullLength; i++) {
            //Check if the current `itemId` is included in the `data`.
            if (data?.includes(items[i].itemId.toString())) {
                elements.push({
                    title: items[i].itemId,
                    description: items[i].title?.substring(0, 72),
                    id: "status item " + items[i].itemId + "&" + items[i].orderId
                })
            }
        }
    }

    for (let i = 0; i < elements.length && i < 10; i++) {
    if(i % 10 === 0) { // For every 10th element, add a new section.
        message.action.sections.push({
            "title": "section " + (i / 10 + 1), 
            "rows": []
         })
     }
      message.action.sections[ message.action.sections.length - 1].rows.push(elements[i]); // Add element to the last section.
}


    // var agentMsg = "Select your Order\n";
    // var len = Math.min(3, message.payload.elements.length)
    // for (let i = 0; i < len; i++) {
    //   agentMsg += "________________________________\n"
    //   let ele = message.payload?.elements[i];
    //   agentMsg += "Title : " + ele.title + "\n"
    //   agentMsg += ele?.description[0]?.title + " " + ele?.description[0]?.value + "\n";
    //   agentMsg += ele?.description[1]?.title + " " + ele?.description[1]?.value + "\n";
    // }
    // message["text"] = agentMsg;


    print(JSON.stringify(message))


} else if (eCommercePlatform == "SFCC") {
    // var items = context.lineItems
    var ordersData = context.getOrdersDetails?.response?.body?.orders;
    var lineItems = []
    var productData = []
    var specificOrder = context.getSpecificOrder?.response?.body
    if (specificOrder?.order?.id && specificOrder?.order?.email == context.session.BotUserSession.UserInfo.email) {
        var ordersData = [specificOrder?.order]
    }
    if (context.entities.hTitleName) {
        for (i = 0; i < ordersData.length; i++) {
            for (j = 0; j < ordersData[i].line_items.length; j++) {
                let lineItem = ordersData[i].line_items[j]
                if (lineItem.name == context.entities.hTitleName) {
                    productData.push({
                        "orderId": ordersData[i].id,
                        "itemId": lineItem.id,
                        "title": lineItem.name,
                        "price": lineItem.price,
                        "sku": lineItem.id,
                        "quantity": lineItem.quantity,
                        "image": lineItem.image
                    })
                }
            }

        }
    }


    if (productData.length == 0) {
        for (i = 0; i < ordersData.length; i++) {
            for (j = 0; j < ordersData[i].line_items.length; j++) {
                let lineItem = ordersData[i].line_items[j]
                lineItems.push({
                    "orderId": ordersData[i].id,
                    "itemId": lineItem.id,
                    "title": lineItem.name,
                    "price": lineItem.price,
                    "sku": lineItem.id,
                    "quantity": lineItem.quantity,
                    "image": lineItem.image
                })
            }

        }

    }
    else {
        lineItems = productData
    }

    var items = lineItems



    var message = {
        "type": "template",
        //"text":"test for agent",
        "payload": {
            "template_type": "retailOrderSelection",
            // "text":"test for agent",
            // "dummyKey" : "Dummy",
            "card_type": "detail",
            "title": "Select your item",
            "showMore": "true",
            "showMoreTitle": "Show more", // we can customize
            "displayLimit": "3", //  limit for show more
            "isSelectionEnabled": "true",
            "elements": []
        }

    }
    var fullLength = items.length;
    // if (fullLength < 4) {
    //     message.payload.showMore = "false"
    //     context.showMoreClickCount=0;
    // }
    elements = []
    for (i = context.showMoreClickCount; i < fullLength; i++) {
        elements.push({
            "icon": context.imageSkuMap[items[i].itemId]?.imageUrl,
            "title": items[i].title, // title
            //"subTitle": "Price : "+getFormattedCurrency(items[i].price)+"\nQuantity : "+items[i].quantity, // sub-title
            //"value": "Delivered", // value
            "titleStyle": {
                "color": "#101828",
                "font-size": "12px",
            },


            "description": [
                {
                    "title": "Item ID : ",
                    "value": items[i].itemId,
                    "detailStyle": {
                        "color": "#344054",
                        "font-size": "12px",
                        "font-weight": "400"
                    },
                }, {
                    "title": "Price : ",
                    "value": getFormattedCurrency(items[i].price),
                    "detailStyle": {
                        "color": "#344054",
                        "font-size": "12px",
                        "font-weight": "400"
                    },
                },
            ],

            "buttons": [
                {
                    "title": "View Details",
                    //"buttonTitle": "Show more",
                    "type": "postback",
                    "value": "status item " + items[i].itemId + "&" + items[i].orderId,
                    "payload": "status item " + items[i].itemId + "&" + items[i].orderId,
                    "buttonStyle": {
                        "color": "#101828",
                        "border-radius": "4px",
                        "border": "1px solid #D0D5DD",
                        "background": "#fff"
                    },
                }
            ],

        })
    }

    message.payload.elements = elements


    var agentMsg = "Select your Order\n";
    var len = Math.min(3, fullLength)
    for (let i = 0; i < len; i++) {
        agentMsg += "________________________________\n"
        let ele = message.payload.elements[i];
        agentMsg += "Title : " + ele.title + "\n"
        agentMsg += ele.description[0].title + " " + ele.description[0].value + "\n";
        agentMsg += ele.description[1].title + " " + ele.description[1].value + "\n";
    }
    message["text"] = agentMsg;

    print(JSON.stringify(message))

}


// var message = {
//     "type": "template",
//     "AlwaysShowGlobalButtons": false,
//     "payload": {
//         "template_type": "list",
//         "elements": [],
//         "buttons": []
//     }
// }
// var info=context.getOrdersDetails.response.body.orders
// var elements = []
// if(!context?.displayCount){
//     context.displayCount=0
// }
// for(i=context.displayCount;i<info.length;i++){
//           elements.push({
//         "title": info[i].id,
//         "image_url": "https://cdn-icons-png.flaticon.com/512/825/825500.png",
//         "subtitle": "Order Date : "+info[i].created_at,
//         "buttons": [{
//             "title": "Select",
//             "type": "postback",
//             "payload": info[i].id
//         }]
//     })  
        
// }

// message.payload.elements = elements;
// message.payload.buttons.push({
//         "title": "Show More",
//         "type": "postback",
//         "payload": "Show More"
//     })
// context.totalItems = elements.length
// print(JSON.stringify(message));





// After adding genAI prompt node for entity extraction.

var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Select your item",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}
var info=context.getOrdersDetails.response.body.orders
var elements = []
if(!context?.displayCount){
    context.displayCount=0
}

var data;
try {
    data = JSON.stringify(context.GenerativeAINode.GenAIPromptReturnOrRefundStatus);
} catch (error) {
    koreDebugger.log("Error stringifying data: " + error.message);
}


if (!data || !env.isDigitalGenAIEnabled || data?.includes(null)) {
    for (var i = context.displayCount; i < info.length; i++) {
        elements.push({
            "icon": "https://retail-assist.s3.amazonaws.com/resources/images/RetailAssist/shoppingCartSVG.svg",
            "title": "Order ID : " + info[i].id,
            "flag": "cancelOrderTemplate",
            "values": [
                {
                    "title": "Order Date : ",
                    "value": info[i].created_at.split("T")[0],
                    "style": {
                        "color": "#344054"
                    }
                },
                {
                    "title": "Order Price : ",
                    "value": getFormattedCurrency(info[i]?.current_subtotal_price)
                },
            ],
            "actions": {
                "type": "postback",
                "title": "You have selected order number : " + info[i].id,
                "value": info[i].id.toString()
            }
        })
    }
} else {
    for (i = context.displayCount; i < info.length; i++) {
        if (data?.includes(info[i].id.toString())) {
            elements.push({
                "icon": "https://retail-assist.s3.amazonaws.com/resources/images/RetailAssist/shoppingCartSVG.svg",
                "title": "Order ID : " + info[i].id,
                "flag": "cancelOrderTemplate",
                "values": [
                    {
                        "title": "Order Date : ",
                        "value": info[i].created_at.split("T")[0],
                        "style": {
                            "color": "#344054"
                        }
                    },
                    {
                        "title": "Order Price : ",
                        "value": getFormattedCurrency(info[i]?.current_subtotal_price)
                    },
                ],
                "actions": {
                    "type": "postback",
                    "title": "You have selected order number : " + info[i].id,
                    "value": info[i].id.toString()
                }
            })
        }
    }
}

// Assuming you want to set 'elements' to some payload property as in the 1st code
message.payload.elements = elements;


koreDebugger.log("Refund payload is " + JSON.stringify(message.payload.elements))
koreDebugger.log("Refund info is " + JSON.stringify(info))

//var len = Math.min(3,info.length)
var len = message.payload.elements.length
koreDebugger.log("length is " + len)
var agentMsg = "Select your Order\n";
for (let i = 0; i < len; i++) {
  agentMsg += "________________________________\n"
  let ele = message.payload.elements[i];
  agentMsg += ele.title + "\n";
  agentMsg += ele.values[0].title + " " + ele.values[0].value + "\n";
  agentMsg += ele.values[1].title + " " + ele.values[1].value + "\n";

}
message["text"] = agentMsg;



context.totalItems = elements.length
print(JSON.stringify(message));


var msg = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/list",
    "body": {
        "text": "List of items"
    },
    "action": {
        "title": "Please select one",
        "sections": [{
                "rows":[]
            }]
    }
}

var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Select your item",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}


var info=context.getOrdersDetails.response.body.orders
var elements = []
if(!context?.displayCount){
    context.displayCount=0
}

var data;
try {
    data = JSON.stringify(context.GenerativeAINode.GenAIPromptReturnOrRefundStatus);
} catch (error) {
    koreDebugger.log("Error stringifying data: " + error.message);
}


if (!data || !env.isDigitalGenAIEnabled || data?.includes(null)) {
    for (var i = context.displayCount; i < info.length && i<10; i++) {
        msg.action.sections[0].rows.push({
                id: "You have selected order number : " + info[i].id.toString(),
                title:"Order ID : " +info[i].id,
                description:"Order Date : " + info[i].created_at.split("T")[0] + "\nOrder Price : " + getFormattedCurrency(info[i]?.current_subtotal_price)
        })
        elements.push({
            "icon": "https://retail-assist.s3.amazonaws.com/resources/images/RetailAssist/shoppingCartSVG.svg",
            "title": "Order ID : " + info[i].id,
            "flag": "cancelOrderTemplate",
            "values": [
                {
                    "title": "Order Date : ",
                    "value": info[i].created_at.split("T")[0],
                    "style": {
                        "color": "#344054"
                    }
                },
                {
                    "title": "Order Price : ",
                    "value": getFormattedCurrency(info[i]?.current_subtotal_price)
                },
            ],
            "actions": {
                "type": "postback",
                "title": "You have selected order number : " + info[i].id,
                "value": info[i].id.toString()
            }
        })
    }
} else {
    for (i = context.displayCount; i < info.length && i<10; i++) {
        if (data?.includes(info[i].id.toString())) {
            msg.action.sections[0].rows.push({
                id: "You have selected order number : " + info[i].id.toString(),
                title: "Order ID : " + info[i].id,
                description: "Order Date : " + info[i].created_at.split("T")[0] + "\nOrder Price : " + getFormattedCurrency(info[i]?.current_subtotal_price)
            })
            elements.push({
                "icon": "https://retail-assist.s3.amazonaws.com/resources/images/RetailAssist/shoppingCartSVG.svg",
                "title": "Order ID : " + info[i].id,
                "flag": "cancelOrderTemplate",
                "values": [
                    {
                        "title": "Order Date : ",
                        "value": info[i].created_at.split("T")[0],
                        "style": {
                            "color": "#344054"
                        }
                    },
                    {
                        "title": "Order Price : ",
                        "value": getFormattedCurrency(info[i]?.current_subtotal_price)
                    },
                ],
                "actions": {
                    "type": "postback",
                    "title": "You have selected order number : " + info[i].id,
                    "value": info[i].id.toString()
                }
            })
        }
    }
}

// Assuming you want to set 'elements' to some payload property as in the 1st code
message.payload.elements = elements;


var len = Math.min(3,info.length)
var agentMsg = "Select your Order\n";
for (let i = 0; i < len; i++) {
  agentMsg += "________________________________\n"
  let ele = message.payload.elements[i];
  agentMsg += ele.title + "\n";
  agentMsg += ele.values[0].title + " " + ele.values[0].value + "\n";
  agentMsg += ele.values[1].title + " " + ele.values[1].value + "\n";

}
message["text"] = agentMsg;


context.totalItems = elements.length
print(JSON.stringify(msg));

// var quickReplies = ["Yes", "No","Sign Up"];
var quickReplies = ["Yes","Sign Up"];

text = "I couldn't find that phone number in the system. Want to try with a different phone number?";
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": text,
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));
var info = ["Yes","Sign Up"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "I couldn't find that phone number in the system. Want to try with a different phone number?",
        "buttons": []
    }
};

for (i = 0; i < info.length; i++) {
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };
    message.payload.buttons.push(button);
}
print(JSON.stringify(message));
// var quickReplies = ["Yes", "No","Sign Up"];
var quickReplies = ["Yes","Sign Up"];

text = "I couldn't find that phone number in the system. Want to try with a different phone number?";
var msg = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": text
    },
    "action": {
        "buttons": []
    }
}

for (i = 0; i < quickReplies.length; i++) {
    var quickReply = {
        "type": "REPLY",
        "id": quickReplies[i],
        "title": quickReplies[i]
    };
    msg.action.buttons.push(quickReply);
}
print(JSON.stringify(msg));
txt="Thank you for verifying. Your mobile number has been updated."
if(context.action=="Email"){
    txt="Thank you for verifying. Your email ID has been updated."
}
if(context.action=="Name"){
    txt="I've updated the name to "+ context.forms.UpdateName.firstName+" "+context.forms.UpdateName.lastName
}
print(txt)
title = `Enter the one-time code sent to ${maskMobileNumber(context.session.BotUserSession.UserInfo.phone)}`;
if(context.noOfOTPAttempts){
    title="I have sent a new code to your mobile number. Please enter it here"
}
// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "otpValidationTemplate",
//         "title": title,
//         "sliderView": true,
//         "description": "Please Enter your 6 digit OTP below",
//         // "mobileNumber": "+91******8161",
//         // "piiReductionChar": '#', // Special charater that is used for PII Redaction
//         "pinLength": 6,// Specifies the length of the PIN, it should be minimun 4
//         "otpButtons": [
//             {
//                 title: "Verify One-Time-Code",
//                 type: "submit"
//             },
//             {
//                 title: "Cancel",
//                 type: "resend",
//                 payload : "cancel"
//             }
//         ]
//     }
// };
    // message.payload["mobileNumber"] = maskMobileNumber(context.session.BotUserSession.UserInfo.phone)
// print(JSON.stringify(message));

print(title);
What else can I help you with?
var info = ["Drop off", "Return to Store", "Return by Mail"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "How do you want to return the item(s)?",
        "subText": "",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));

context.eCommercePlatform = JSON.parse(env.commercePlatformConfig).platformName

var txt = "Please enter your address here."
print(txt)
var msg = {
 	"infobipWhatsAppMessageEndpoint":"/whatsapp/1/message/text",
    "text": "Creating an account is quick and easy. 😀"
};
print(JSON.stringify(msg));
txt="We'll notify you once your return has been processed by the seller."
if(context.entities.returnOrCrossShip=="Cross-ship"){
    txt="Which product would you like to exchange for this item?"
}
print(txt)
orders=context.orderStatus
txt=""
if(context.entities.mutipleProductsFound&&context.entities.mutipleProductsFound!="All"){
    context.lineItemsIds=context.lineItemsIds.slice(parseInt(context.entities.mutipleProductsFound),parseInt(context.entities.mutipleProductsFound)+1)
}
for(i=0;i<orders.length;i++){
    for(j=0;j<orders[i].result.length;j++){
        if(orders[i].result[j].id.includes(context.lineItemsIds)){
            name=orders[i].result[j]?.name
            status = orders[i].result[j]?.status;
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
    }
}
print(txt)

txt="I found "+context?.lineItemsIds.length
orders=context.orderStatus
for (i = 0; i < orders.length; i++) {
  for (j = 0; j < orders[i].result.length; j++) {
    if (context.lineItemsIds.includes(orders[i].result[j].id)) {
      txt = txt + "Return Request raised for " + orders[i].result[j].name + " ordered on " + getFormattedDate(orders[i].created_at) + "\n";
    }
  }
}
txt=txt +"\n Please specify the order you're inquiring about."
print(txt)
var info = context.fetchDeliveryAddressDetails.response.body.addresses;
const defaultIndex = info.findIndex(address => address.default===true);
if (defaultIndex > 0) {
    var firstAddress = info[0];
    info[0] = info[defaultIndex];
    info[defaultIndex] = firstAddress;
}

var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Deliver to:",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": [],
        "buttons": [
            {
                "title": "Add New",
                //"buttonTitle": "Show more",
                "type": "postback",
                "value": "Lets proceed to add new address",
                "buttonStyle": {
                    "background": "#344054",
                    "color": "#FFF",
                    "width": "100%",
                    "border": "1px solid #344054"
                }
            }]
    }
}


var elements = []
for(i=0;i<info.length ;i++){
    elements.push({
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMCAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTk5NjcgMTguODMzM0MxMC44MzMgMTQuNjY2NyAxNi42NjYzIDE0LjE4MTkgMTYuNjY2MyA4LjgzMzMyQzE2LjY2NjMgNS4xNTE0MiAxMy42ODE2IDIuMTY2NjYgOS45OTk2NyAyLjE2NjY2QzYuMzE3NzggMi4xNjY2NiAzLjMzMzAxIDUuMTUxNDIgMy4zMzMwMSA4LjgzMzMyQzMuMzMzMDEgMTQuMTgxOSA5LjE2NjM0IDE0LjY2NjcgOS45OTk2NyAxOC44MzMzWiIgc3Ryb2tlPSIjMzQ0MDU0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05Ljk5OTY3IDExLjMzMzNDMTEuMzgwNCAxMS4zMzMzIDEyLjQ5OTcgMTAuMjE0IDEyLjQ5OTcgOC44MzMzMkMxMi40OTk3IDcuNDUyNjEgMTEuMzgwNCA2LjMzMzMyIDkuOTk5NjcgNi4zMzMzMkM4LjYxODk2IDYuMzMzMzIgNy40OTk2NyA3LjQ1MjYxIDcuNDk5NjcgOC44MzMzMkM3LjQ5OTY3IDEwLjIxNCA4LjYxODk2IDExLjMzMzMgOS45OTk2NyAxMS4zMzMzWiIgc3Ryb2tlPSIjMzQ0MDU0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                "title": info[i].address1+" "+info[i].city,
                "flag":"addressTemplate", 
                "values": [
                    {
                        "title":info[i].address2+","+info[i].country+" "+info[i].zip,
                        "style": {
                            "color": "#344054"
                        }
                    }
                ],
                "actions": {
                    "type": "postback",
                    "title": info[i].city+", "+info[i].country,
                    "value":  info[i].id.toString()
                }
            })
    
}

message.payload.elements = elements
print(JSON.stringify(message))


var info = context.fetchDeliveryAddressDetails.response.body.addresses;
const defaultIndex = info.findIndex(address => address.default === true);
if (defaultIndex > 0) {
    var firstAddress = info[0];
    info[0] = info[defaultIndex];
    info[defaultIndex] = firstAddress;
}
var message = {
    "text": "Here are your delivery addresses:",
    "quick_replies": []
};
context.displayAddressCount = context.displayAddressCount || 0; 
var i=0;
for (i = context.displayAddressCount; i < info.length && i < context.displayAddressCount+5; i++) {
    var title = info[i].address1 + " " + info[i].address2 + ", " + info[i].city + " " + info[i].country;
    var subtitle = "Zipcode: " + info[i].zip;
    if (i == 0) {
        subtitle += " (Default)";
    }
    var quick_reply = {
        "content_type": "text",
        "title": title,
        "payload": info[i].id
    };
    message.quick_replies.push(quick_reply);
}
if (i < info.length) {
    var viewMoreQuickReply = {
        "content_type": "text",
        "title": "View More",
        "payload": "View More"
    };
    message.quick_replies.push(viewMoreQuickReply);
}

print(JSON.stringify(message));

{{context.orderStatusAckMsgIVR}}
var info = ["Connect to agent" , "Show all orders"];
var buttons = ["agent"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Hmm...I don't see any order on your account eligible for cancellation.",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));
var info = ["Connect to agent" , "Show all orders"];

var message = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": "Hmm...I don't see any order on your account eligible for cancellation."
    },
    "action": {
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "REPLY",
        "id": info[i],
        "title": info[i]
    };

    message.action.buttons.push(button);
}
print(JSON.stringify(message));
var quickReplies = ["Sign Up", "Connect me with an Agent"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "I couldn't sign you in with that either. Reach out to us again in future. Have a good rest of your day!",
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));

var info = ["Sign Up", "Connect me with an Agent"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "I couldn't sign you in with that either. Reach out to us again in future. Have a good rest of your day!",
        "buttons": []
    }
};

for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };
    message.payload.buttons.push(button);
}
print(JSON.stringify(message));
var quickReplies = ["Sign Up", "Connect me with an Agent"];
var message = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": "I couldn't sign you in with that either. Reach out to us again in future. Have a good rest of your day!"
    },
    "action": {
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "type": "REPLY",
        "id": quickReplies[i],
        "title": quickReplies[i]
    };
    message.action.buttons.push(quickReply);
}
print(JSON.stringify(message));

print(context.getConsolidateQuery.response.body.consolidatedQuery)

koreDebugger.log("Product Search - UserId : "+ context.userId + " UserInput : "+context.actualQuery +" Consolidated Query : "+context.getConsolidateQuery.response.body.consolidatedQuery )
if (Object.keys(context.docLinks).length == 0) {
    print(context.response); 
} else {
    var info = Object.keys(context.docLinks);
    var message = {
        "type": "template",
        "payload": {
            "template_type": "button", 
            "text": context.response,
            "buttons": []
        }
    };

    for (var i = 0; i < info.length; i++) {
        var button = {
            "type": "web_url",
            "url": context.docLinks[info[i]], 
            "title": info[i]
        };
        message.payload.buttons.push(button);
    }
    print(JSON.stringify(message));  
}

// var message = {
// 	"type": "template",
// 	"payload": {
// 		"template_type": "listWidget",
// 		"title": "Cart",
// 		"description": "",
// 		"elements": []
// 	},
// 	"screenIdentifier": "searchResults"
    
// };


// for(let i=0;i<info.length;i++){
//         var element={
// 				"image": {
//             "image_type": "image",
//             "image_src": info[i]?.node?.images?.edges[0]?.node?.src||"https://ci6.googleusercontent.com/proxy/lOYRwSWZnm41Uo-K7H8_liFaWkBP1aT9xG367iZ4i64eDKjlysJNIWXvvv1UNBjIhCOnG2A4-_I40cU0GjYe8J1iGlPkQh97=s0-d-e1-ft#https://cdn-icons-png.flaticon.com/512/825/825500.png",
//             "radius": 20,
//             "size": "large"
//         },
// 				"title": info[i]?.node?.title||"XXXX0.9 cu. ft. NeoChef™ Countertop Microwave with Smart Inverter and EasyClean®",
// 				"subtitle": "Quantity "+cartInfo[i]?.node?.quantity,
// 				"default_action": {
// 					"type": "postback",
// 					"payload": cartInfo[i]?.node?.id,
// 					"utterance": "Select"
// 				},
// 				"buttonsLayout": {
// 					"displayLimit": {
// 						"count": "2"
// 					},
// 					"style": "float"
// 				},
// 				"buttons": [{
// 					"type": "postback",
// 					"title": "Remove",
// 					"payload": cartInfo[i]?.node?.id,
// 					"utterance": "Remove"
// 				}]
// 			};
// message.payload.elements.push(element)
// }
// message.payload.elements.push({
// 			    "buttons": [{
// 					"type": "postback",
// 					"title": "Check out",
// 					"payload": "Check out",
// 					"utterance": "Check out"
// 				}]
			    
// 			});

			
			

        
// print(JSON.stringify(message));
















info=context.getProductId.response.body.data?.products?.edges;
cartInfo=context.getCartItems.response.body.data?.cart?.lines?.edges; 
checkoutPayload={
    lineItems:cartInfo.map(item => item.node),
    action:"checkout"
}



var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Select the items for checkout",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": [],
        "buttons": [
            {
                "title": "Continue Shopping",
                //"buttonTitle": "Continue Shopping",
                "type": "ContinueShopping",
                "value": "Continue Shopping",
                "buttonStyle": {
                    "background": "#344054",
                    "color": "#FFF",
                    "width": "48%",
                    "border": "1px solid #344054"
                }
            },
            {  // Enable for Single button
                "title": "Checkout",
                //"buttonTitle": "Show more",
                "type": "Checkout",
                "value":"Let's proceed to check out",
                "buttonStyle":{
                    "background":"#fff",
                    "color":"#404040",
                    "width":"48%"
                }
            }
        ]
    }
};

elements = []

for(i=0; i<cartInfo.length ; i++){
    sku=cartInfo[i].node.attributes[0].value
    elements.push({
                "icon":context.imageSkuMap[sku]||"https://ci6.googleusercontent.com/proxy/lOYRwSWZnm41Uo-K7H8_liFaWkBP1aT9xG367iZ4i64eDKjlysJNIWXvvv1UNBjIhCOnG2A4-_I40cU0GjYe8J1iGlPkQh97=s0-d-e1-ft#https://cdn-icons-png.flaticon.com/512/825/825500.png",
                "title":  context.titleSkuMap[sku],
                //"subTitle":  info[i]?.node?.title, // value should be subtitle
                "flag": "cartScreen",
                "qty": cartInfo[i]?.node?.quantity,
                "value": cartInfo[i]?.node?.id,
                "checkBox": "enabled", // this property for checkbox
                "button1": {
                    "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNjI1IDhIMTIuMzc1IiBzdHJva2U9IiNEMEQ1REQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                    "buttonTitle": "Decrement",
                    "type": "postback",
                    "value": "Delete",
                    "buttonStyle": {
                        "border-radius": "4px",
                        "border": "1px solid #D0D5DD",
                        "background": "#F9FAFB"
                    },
                },
                "button2": {
                    "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguMDAwMTYgMy4zMzMzNFYxMi42NjY3TTMuMzMzNSA4LjAwMDAxSDEyLjY2NjgiIHN0cm9rZT0iI0ZFRkVGRSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
                    "buttonTitle": "increment",
                    "type": "postback",
                    "value": "increment",
                    "buttonStyle": {
                        "color": "#F9FAFB",
                        "border-radius": "4px",
                        "border": "1px solid #12B76A",
                        "background": "#12B76A"
                    },
                },
                "titleStyle": {
                    "color": "#101828",
                    "font-size": "12px",
                },
                "subTitleStyle": {
                    "color": "#101828",
                    "font-size": "14px",
                },
                "description": [
                    {
                        "value": getFormattedCurrency(context.priceSkuMap[sku]),
                        "detailStyle": {
                            "color": "#101828",
                            "font-size": "12px",
                            "font-weight": "600"
                        },
                    },
                ],

                "buttons": [
                    {
                        "title": "Remove",
                        "buttonTitle": "Show more",
                        "type": "postback",
                        "value": cartInfo[i]?.node?.id+" remove",
                        "buttonStyle": {
                            "color": "#101828",
                            "border-radius": "4px",
                            "border": "1px solid #D0D5DD",
                            "background": "#fff"
                        },
                    }
                ],
            })
}




message.payload.elements = elements



print(JSON.stringify(message))
txt="I'm sorry, but item in this order is not eligible for return."
if(context.orderData.line_items.length>1){
    txt="I'm sorry, but items in this order are not eligible for return."
}
var quickReplies = ["Connect me with an Agent"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": txt,
        "subText": "Button Template Description",
        "buttons": []
    }
};
for (i = 0; i < quickReplies.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));




// txt="I'm sorry, but item in this order are not eligible to return."
// if(context.orderData.line_items.length>1){
//     txt="I'm sorry, but items in this order are not eligible to return."
// }

// var quickReplies = ["Connect me with an Agent"];
// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "quick_replies",
//         "text": txt,
//         "quick_replies": []
//     }
// };

// for (i = 0; i < quickReplies.length; i++) {
//     //if only text needs to diplayed
//     var quickReply = {
//         "content_type": "text",
//         "title": quickReplies[i],
//         "payload": quickReplies[i]
//     };
//     /* Uncomment this if both text and image needs to displayed for the  quick reply button
//      var quickReply = {
//      "content_type":"text",
//      "title":quickReplies[i],
//      "payload":"payload2",
//      "image_url": "url of the image
//      };
//      */
//     message.payload.quick_replies.push(quickReply);
// }
// print(JSON.stringify(message));
var quickReplies = ["show all Orders","Connect me with agent"]
var payload = ["allOrders","agent"]
if(context.orderData.orderItems.length == 1)
    var quickReplies = ["Connect me with agent"];
    var payload  = ["agent"]
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "I'm sorry,but this item is not eligible for return",
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": payload[i]
    };
    /* Uncomment this if both text and image needs to displayed for the  quick reply button
     var quickReply = {
     "content_type":"text",
     "title":quickReplies[i],
     "payload":"payload2",
     "image_url": "url of the image
     };
     */
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));

var info = context.fetchDeliveryAddressDetails.response.body.addresses;
const defaultIndex = info.findIndex(address => address.default===true);
if (defaultIndex > 0) {
    var firstAddress = info[0];
    info[0] = info[defaultIndex];
    info[defaultIndex] = firstAddress;
}


var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "choose address",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": [],
        // "buttons": []
    }
}

var elements = []
for(i=0;i<info.length ;i++){
    var address = {
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMCAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTk5NjcgMTguODMzM0MxMC44MzMgMTQuNjY2NyAxNi42NjYzIDE0LjE4MTkgMTYuNjY2MyA4LjgzMzMyQzE2LjY2NjMgNS4xNTE0MiAxMy42ODE2IDIuMTY2NjYgOS45OTk2NyAyLjE2NjY2QzYuMzE3NzggMi4xNjY2NiAzLjMzMzAxIDUuMTUxNDIgMy4zMzMwMSA4LjgzMzMyQzMuMzMzMDEgMTQuMTgxOSA5LjE2NjM0IDE0LjY2NjcgOS45OTk2NyAxOC44MzMzWiIgc3Ryb2tlPSIjMzQ0MDU0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05Ljk5OTY3IDExLjMzMzNDMTEuMzgwNCAxMS4zMzMzIDEyLjQ5OTcgMTAuMjE0IDEyLjQ5OTcgOC44MzMzMkMxMi40OTk3IDcuNDUyNjEgMTEuMzgwNCA2LjMzMzMyIDkuOTk5NjcgNi4zMzMzMkM4LjYxODk2IDYuMzMzMzIgNy40OTk2NyA3LjQ1MjYxIDcuNDk5NjcgOC44MzMzMkM3LjQ5OTY3IDEwLjIxNCA4LjYxODk2IDExLjMzMzMgOS45OTk2NyAxMS4zMzMzWiIgc3Ryb2tlPSIjMzQ0MDU0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                "title": info[i]?.address1,
                "flag":"addressTemplate", 
                "values": [
                    {
                        "title":info[i]?.city+","+info[i]?.country+" "+info[i]?.zip,
                        "style": {
                            "color": "#344054"
                        }
                    }
                ]
            }
            
        if(context.entities.hActionDecider == "Modify Address"){
            address["actions"]={
                    "type": "postback",
                    "title": info[i]?.city+", "+info[i]?.country,
                    "value":  "Update "+info[i]?.id.toString()
            }
            message.payload.title = "Choose the address for modification."
        }
        if(context.entities.hActionDecider == "Delete Address"){
             address["actions"]={
                    "type": "postback",
                    "title": info[i]?.city+", "+info[i]?.country,
                    "value":  "Delete "+info[i]?.id.toString()
            }
        message.payload.title = "Choose the address to be deleted."
        }
    elements.push(address)
}

message.payload.elements = elements
print(JSON.stringify(message))


// var message = {
//     "type": "template",
//     "AlwaysShowGlobalButtons": false,
//     "payload": {
//         "template_type": "list",
//         "elements": [],
//         "buttons": []
//     }
// }
// var info=context?.getOrdersDetails?.response.body.orders.find(order=>order.id==context.entities.displayReturnAndCancelOrders)||context?.getSpecificOrder?.response?.body?.order
// var img=context.getProductId.response.body.data.products.edges
// var elements = []
// if(!context?.displayCount){
//     context.displayCount=0
// }
// for(i=context.displayCount;i<info.line_items.length;i++){
//     koreDebugger.log(info.line_items[i])
//     if(context.displayItems.includes(info.line_items[i].id.toString())){
//           elements.push({
//         "title": info.line_items[i].name,
//         "image_url": img[i].node.images.edges[0].node.src||"https://cdn-icons-png.flaticon.com/512/825/825500.png",
//         "subtitle": "Order Date : "+info?.created_at||"",
//         "buttons": [{
//             "title": "Select",
//             "type": "postback",
//             "payload": info.line_items[i].id
//         }]
//     })
        
//     }  
        
// }

// message.payload.elements = elements;
// message.payload.buttons.push({
//         "title": "Show More",
//         "type": "postback",
//         "payload": "Show More"
//     })
// context.totalItems = elements.length
// print(JSON.stringify(message));

var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Select your item",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}
var info=context?.getOrdersDetails?.response.body.orders.find(order=>order.id==context.entities.displayReturnAndCancelOrders)||context?.getSpecificOrder?.response?.body?.order
var img=context.getProductId.response.body.data.products.edges
var elements = []
if(!context?.displayCount){
    context.displayCount=0
}
for(i=context.displayCount;i<info.line_items.length;i++){
    koreDebugger.log(info.line_items[i])
    if(context.displayItems.includes(info.line_items[i].id.toString())){
    elements.push({
        "icon": img[i].node.images.edges[0].node.src||"https://cdn-icons-png.flaticon.com/512/825/825500.png",
        "title": info.line_items[i].name,
        "flag":"cancelOrderTemplate", 
        "values": [
            {
                "title":"Order Date : ",
                "value":info?.created_at.split("T")[0],
                "style": {
                    "color": "#344054"
                }
            },
            {
                "title": "Item Price : ",
                "value": getFormattedCurrency(info.line_items[i]?.price)
            },
        ],
        "actions": {
            "type": "postback",
            "title": "You have selected item number : "+info.line_items[i].id,
            "value":  info.line_items[i].id.toString()
        }
    })
        
    }  
        
}

message.payload.elements = elements;


var agentMsg = "Select your item\n";
var len = Math.min(3,message.payload.elements.length)
for (let i = 0; i < len; i++) {
  agentMsg += "________________________________\n";
  let ele = message.payload.elements[i];
  agentMsg += ele?.title + "\n";
  agentMsg += ele?.values[0]?.title + " " + ele?.values[0]?.value + "\n";
  agentMsg += ele?.values[1]?.title + " " + ele?.values[1]?.value + "\n";
}
message["text"] = agentMsg;
context.totalItems = elements.length
print(JSON.stringify(message));

var message = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/list",
    "body": {
        "text": "List of items"
    },
    "action": {
        "title": "Select your item",
        "sections": [
            {
                "rows": []
            }
        ]
    }
};

var info=context?.getOrdersDetails?.response.body.orders.find(order=>order.id==context.entities.displayReturnAndCancelOrders)||context?.getSpecificOrder?.response?.body?.order
var img=context.getProductId.response.body.data.products.edges
var elements = []
if(!context?.displayCount){
    context.displayCount=0
}
let whatsAppLineItems = {};
for(i=context.displayCount;i<info.line_items.length&&i<10;i++){
    koreDebugger.log(info.line_items[i])
    if(context.displayItems.includes(info.line_items[i].id.toString())){
        let desc = info.line_items[i].id.toString();
        
        
        let buttonImg = {
            
        "content": {
            "mediaUrl": img[i].node.images.edges[0].node.src||"https://cdn-icons-png.flaticon.com/512/825/825500.png",
            "caption": `*Product Name*: ${info.line_items[i].name}\n*Item Id*: ${info.line_items[i].id}\n*Item Price*: ${getFormattedCurrency(info.line_items[i].price)}`
        }
        }
    whatsAppLineItems[info.line_items[i].id.toString()] = buttonImg;
    
    
        message.action.sections[0].rows.push({
        "id": info.line_items[i].id.toString(),
        "title": info.line_items[i].id.toString(),
        "description": desc?.substring(0,72)
    })
        
    // elements.push({
    //     "icon": img[i].node.images.edges[0].node.src||"https://cdn-icons-png.flaticon.com/512/825/825500.png",
    //     "title": info.line_items[i].name,
    //     "flag":"cancelOrderTemplate", 
    //     "values": [
    //         {
    //             "title":"Order Date : ",
    //             "value":info?.created_at.split("T")[0],
    //             "style": {
    //                 "color": "#344054"
    //             }
    //         },
    //         {
    //             "title": "Item Price : ",
    //             "value": getFormattedCurrency(info.line_items[i]?.price)
    //         },
    //     ],
    //     "actions": {
    //         "type": "postback",
    //         "title": "You have selected item number : "+info.line_items[i].id,
    //         "value":  info.line_items[i].id.toString()
    //     }
    // })
    }       
}

context.whatsAppLineItems =whatsAppLineItems
context.totalItems = message.action.sections[0].rows.length
print(JSON.stringify(message));

var message =  {
			"type": "template",
			"payload": {
				"template_type": "dropdown_template",
				"heading":"May I know the reason for return?",
				"elements": [
					{
						"title": "Color Discrepancy",
						"value":"COLOR"
					},
					{
						"title": "Defective",
						"value":"DEFECTIVE"
					},
					{
						"title": "Not as described",
						"value":"NOT_AS_DESCRIBED"
					},
					{
						"title": "Other",
						"value":"OTHER"
					},
					{
						"title": "Size too large",
						"value":"SIZE_TOO_LARGE"
					},
					{
						"title": "Size too small",
						"value":"SIZE_TOO_SMALL"
					},
					{
						"title": "Style",
						"value":"STYLE"
					},
					{
						"title": "Ordering Error",
						"value":"UNKNOWN"
					},
					{
						"title": "Unwanted",
						"value":"UNWANTED"
					},
					{
						"title": "Wrong Product Shipped",
						"value":"WRONG_ITEM"
					}
			   
				], 
			}
		};
		print(JSON.stringify(message)); 
I am sorry, you cannot perform refund. Please contact customer support.
var txt="Your address has been updated."
switch(context.immediateAction) {
  case "Delete Address":
       txt="I have removed this address from your profile."
    break;
  case "Modify Address":
      txt="Your address has been updated."
    break;
  case "Add Address":
    txt="This address has been added to your profile."
    break;
}
print(txt)
var txt="Your address has been updated."
switch(context.immediateAction) {
  case "Delete Address":
       txt="I have removed this address from your profile."
    break;
  case "Modify Address":
      txt="Your address has been updated."
    break;
  case "Add Address":
    txt="This address has been added to your profile."
    break;
}
print(txt)
Please tell me the last 4 digits of your order ID, or you can also enter them on the keypad. 
orderId=context.orderStatus[0].id
var order=context.getOrdersDetails.response.body.orders
order=order.find(order=>order.id == orderId)
name=[]
for(i=0;i<context.orderStatus[0].result.length;i++){
    name.push(order.line_items.find(item => item.id==context.orderStatus[0].result[i].id).name)
}
txt="I see you return/cancelation request for "+name[0]+" and "+name[1]+". Would you like an update on the status of this particular order?"
print(txt)
var info = ["Connect to Agent"];
var payload = ["Agent Transfer"]
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "I’m sorry, but there are no items in this order eligible for cancelation",
        "subText": "Button Template Description",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": payload[i]
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));

var info = ["Connect to Agent"];
var payload = ["Agent Transfer"];

var message = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": "I’m sorry, but there are no items in this order eligible for cancelation"
    },
    "action": {
        "buttons": []
    }
};
for (let i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "REPLY",
        "id": payload[i],
        "title": info[i]
    };

    message.action.buttons.push(button);
}
print(JSON.stringify(message));
var txt="Please select the address you want to update."
if(context.immediateAction=="Delete Address"){
    txt="Select the address you want to delete."
}
print(txt)
var txt="Please select the address you want to update."
if(context.immediateAction=="Delete Address"){
    txt="Select the address you want to delete."
}
print(txt)
{{content.SOP_addrFoundMsg}}
var info = context.fetchDeliveryAddressDetails.response.body.addresses;
info.shift();
// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "list",
//         "elements": [],
//         "buttons": [
//             {
//                 "title": "View More",
//                 "type": "postback",
//                 "payload": "View More"
//             }
//         ]
//     }
// };
// if(!context.displayCount){
//     context.displayCount=0
// }
// for (i = context.displayCount; i < info.length; i++) {
//     var element = {
//         "title": info[i].address1+info[i].address2+","+info[i].city+info[i].country,
//         "subtitle": "Zipcode:"+info[i].zip ,
//         "buttons": [{
//             "title": "Select",
//             "type": "postback",
//             "payload": info[i].id
//         }]
//     };
//     message.payload.elements.push(element)
// }

        
// print(JSON.stringify(message));

var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Manage Addresses",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": [],
        // "buttons": []
    }
}

var elements = []
for(i=0;i<info.length ;i++){
    var address = {
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMCAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTk5NjcgMTguODMzM0MxMC44MzMgMTQuNjY2NyAxNi42NjYzIDE0LjE4MTkgMTYuNjY2MyA4LjgzMzMyQzE2LjY2NjMgNS4xNTE0MiAxMy42ODE2IDIuMTY2NjYgOS45OTk2NyAyLjE2NjY2QzYuMzE3NzggMi4xNjY2NiAzLjMzMzAxIDUuMTUxNDIgMy4zMzMwMSA4LjgzMzMyQzMuMzMzMDEgMTQuMTgxOSA5LjE2NjM0IDE0LjY2NjcgOS45OTk2NyAxOC44MzMzWiIgc3Ryb2tlPSIjMzQ0MDU0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05Ljk5OTY3IDExLjMzMzNDMTEuMzgwNCAxMS4zMzMzIDEyLjQ5OTcgMTAuMjE0IDEyLjQ5OTcgOC44MzMzMkMxMi40OTk3IDcuNDUyNjEgMTEuMzgwNCA2LjMzMzMyIDkuOTk5NjcgNi4zMzMzMkM4LjYxODk2IDYuMzMzMzIgNy40OTk2NyA3LjQ1MjYxIDcuNDk5NjcgOC44MzMzMkM3LjQ5OTY3IDEwLjIxNCA4LjYxODk2IDExLjMzMzMgOS45OTk2NyAxMS4zMzMzWiIgc3Ryb2tlPSIjMzQ0MDU0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
                "title": info[i].address1,
                "flag":"addressTemplate", 
                "values": [
                    {
                        "title":info[i].city+", "+info[i].address2 +" "+info[i].country+" "+info[i].zip,
                        "style": {
                            "color": "#344054"
                        }
                    }
                ],
            "actions":{
                    "type": "postback",
                    "title": info[i].city+", "+info[i].country,
                    "value":  "Delete "+info[i].id.toString()
            },
            }
    elements.push(address)
}

message.payload.elements = elements
print(JSON.stringify(message))

var items = context.getOrdersDetails?.response?.body.orders || context.getSpecificOrder?.response?.body.orders|| []

var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Select your item",
        "showMore": "true",
        "showMoreTitle": "Show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}

var elements = []
var fullLength = items.length;

for (let i = 0; i < fullLength; i++) {
    
    
    context.orderDate = items[i].created_at.split("T")[0]
  
     elements.push({
        "icon": "https://retail-assist.s3.amazonaws.com/resources/images/RetailAssist/shoppingCartSVG.svg",
        "title": "Order ID : "+items[i].id,
        "flag":"cancelOrderTemplate", 
        "values": [
            {
                "title":"Date : ",
                "value":context.orderDate,
                "style": {
                    "color": "#344054"
                }
            },
            {
                "title": "Order Price : ",
                "value": getFormattedCurrency(items[i].current_subtotal_price)
            },
        ],
        "actions": {
            "type": "postback",
            "title": "You have selected order number : "+items[i].id,
            "value":  items[i].id.toString()
        }
    })
}
message.payload.elements = elements;
var len = Math.min(3,message.payload.elements)
agentMsg =""
for (let i = 0; i < len.length; i++) {
  let ele = message.payload.elements[i];
  agentMsg += "________________________________\n"
  agentMsg += ele.title + "\n";
  agentMsg += ele?.values[0]?.title + "    " + ele?.values[0]?.value + "\n";
  agentMsg += ele?.values[1]?.title + "    " + ele?.values[1]?.value + "\n";
}
message["text"] = agentMsg;

context.totalItems = elements.length
print(JSON.stringify(message));
var quickReplies = ["Yes", "No","Sign Up"];

text = "I still can't find it. Want to log in with a phone number?";
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": text,
        "buttons": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    var quickReply = {
        "type": "postback",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    message.payload.buttons.push(quickReply);
}
print(JSON.stringify(message));
var info = ["Yes", "No","Sign Up"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "I still can't find it. Want to log in with a phone number?",
        "buttons": []
    }
};

for (i = 0; i < info.length; i++) {
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
    };
    message.payload.buttons.push(button);
}
print(JSON.stringify(message));
var msg = {
    "infobipWhatsAppMessageEndpoint": "/whatsapp/1/message/interactive/buttons",
    "body": {
        "text": "I still can't find it. Want to log in with a phone number?"
    },
    "action": {
        "buttons": [
            {
                "type": "REPLY",
                "id": "Yes",
                "title": "Yes"
            },
            {
                "type": "REPLY",
                "id": "No",
                "title": "No"
            },
            {
                "type": "REPLY",
                "id": "Sign Up",
                "title": "Sign Up"
            }
        ]
    }
}
print(JSON.stringify(msg));
var items = context.getOrdersDetails?.response?.body.orders

// var message = {
//     "type": "template",
//     "AlwaysShowGlobalButtons": false,
//     "payload": {
//         "template_type": "list",
//         "elements": [],
//         "buttons": []
//     }
// }

var elements = []
    // elements.push({
    //     "title": items[0].id,
    //     "image_url": "https://shorturl.at/fxALM",
    //     "subtitle": "Order Date " + items[0].created_at.split("T")[0],//text
        
    // })
    
    var message = {
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Select your item",
        "showMore": "true",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", //  limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}
    elements.push({
        "icon": "https://cdn-icons-png.flaticon.com/512/825/825500.png",
        "title": "Order ID : "+items[0].id,
        "flag":"cancelOrderTemplate", 
        "values": [
            {
                "title":"Date : ",
                "value":items[0].created_at.split("T")[0],
                "style": {
                    "color": "#344054"
                }
            },
            {
                "title": "Order Price : ",
                "value": getFormattedCurrency(items[0]?.current_subtotal_price)
            },
        ],
        // "actions": {
        //     "type": "postback",
        //     "title": "You have selected order number : "+items[i].id,
        //     "value":  items[i].id.toString()
        // }
    })

message.payload.elements = elements;
print(JSON.stringify(message));
lineItems = context?.createAnOrder?.response?.body?.order?.line_items
var orderData = context?.createAnOrder?.response?.body?.order


var address = context.shippingAddress.address1+", "+context.shippingAddress.city+", "+context.shippingAddress.zip

var message ={
    "type": "template",
    "payload": {
        "template_type": "retailOrderSelection",
        "card_type": "detail",
        "title": "Order Details",
        "showMore": "false",
        "showMoreTitle": "show More", // we can customize
        "displayLimit": "3", // limit for show more
        "isSelectionEnabled": "true",
        "elements": []
    }
}

elements = []
j = lineItems.length
for(i=0;i<lineItems.length ; i++){
    j = j-1
    koreDebugger.log(lineItems[i].sku)
    currentItem = {
                "icon": context.imageSkuMap[lineItems[i].sku].imageUrl || context.imageSkuMap[lineItems[i].sku],
                "title": lineItems[i].name,
                //"subTitle": , // value should be subtitle
                "flag": "ItemdetailsScreen",
                "titleStyle": {
                    "color": "#101828",
                    "font-size": "12px",
                },
                "subTitleStyle": {
                    "color": "#101828",
                    "font-size": "14px",
                },
                "description": [
                    {
                        "title": "Qty:",
                        "value": lineItems[i].quantity,
                        "detailStyle": {
                            "color": "#344054",
                            "font-size": "12px",
                            "font-weight": "400"
                        },
                    },
                ]
            }
            
    if(j==0){
        currentItem["descriptionDetails"] =  [
                    {
                        "title": "Order ID",
                        "value": ": "+orderData.id,
                    },
                   {
                        "title": "Order Status",
                        "value": ": Placed",
                        "valueStyle": {
                        "color": "#039855",
                         },
                    },
                    {
                        "title":"Shipping Address",
                        "value":": "+address
                    },
                    {
                        "title": "Estimated Delivery",
                        "value": ": "+getFormattedDate(new Date((new Date()).getTime() + 5 * 24 * 60 * 60 * 1000))
                    }
                ]

    }
           
    elements.push(currentItem) 
    
}


message.payload.elements = elements

print(JSON.stringify(message));
