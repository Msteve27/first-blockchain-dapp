console.log('Hello World!');

// connect to Moralis server

const serverUrl = "https://lf3bbnasxzof.usemoralis.com:2053/server";
const appId = "raBjp9RjwCJaoIKYdgtLRaBhHrSmQQY2aeisdsnE";
Moralis.start({ serverUrl, appId });

login = async () => {
    await Moralis.authenticate().then(async function (user) {
        console.log('logged in');
        user.set("name", document.getElementById('user-username').value);
        user.set("email", document.getElementById('user-email').value);
        await user.save();
    }) 
}

document.querySelector('#btn-login').onclick = login;
