//index.js function on AWS Lambda
/*
module.exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2));

    const keyword = event.queryStringParameters && event.queryStringParameters.keyword;
    const myName = "Jill"; //my actual name

    if (!keyword) {
        console.error("Error: Missing keyword parameter");
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Missing keyword parameter" }),
        };
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `${myName} says ${keyword}` }),
    };
};
*/
