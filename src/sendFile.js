
async function sendFile(arrMessage) {
try{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: arrMessage.splice(0,2),
            userId: new Date ,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    let result = await response.json();
    console.log(result)
}catch (e){
    console.log('error', e.message)
}
}

module.exports = {sendFile}
