console.log("Hello Client");

//lets do a fetch

const postData = async (url="", data = {}) => {
    const response = await fetch( url, {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(data)
    });
};

postData("/sendData", {"message":"hello"});