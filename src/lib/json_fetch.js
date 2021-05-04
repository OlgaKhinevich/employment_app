async function json_fetch(url, data={}){
    return await fetch(url, {body: JSON.stringify(data), method: "POST", headers: {"Content-Type": "application/json"}});
}

module.exports = json_fetch;