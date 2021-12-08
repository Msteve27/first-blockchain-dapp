console.log('Hello World!');

// connect to Moralis server
const serverUrl = "https://lf3bbnasxzof.usemoralis.com:2053/server";
const appId = "raBjp9RjwCJaoIKYdgtLRaBhHrSmQQY2aeisdsnE";
Moralis.start({ serverUrl, appId });

let homepage = "http://127.0.0.1:5500/first-blockchain-dapp/index.html";

// if(Moralis.User.current() == null && window.location.href != homepage) {
//     document.querySelector('body').style.display = 'none';
//     window.location.href = "index.html";
// }

login = async () => {
    await Moralis.authenticate().then(async function (user) {
        console.log('logged in');
        user.set("name", document.getElementById('user-username').value);
        user.set("email", document.getElementById('user-email').value);
        await user.save();
        window.location.href = "dashboard.html";
    }) 
}

logout = async () => {
    await Moralis.User.logOut();
    window.location.href = "index.html";
}

getTransactions = async () => {
    console.log('get transactions clicked');
    const options = { chain: "rinkeby", address: "0xd6E426709B287c33bAB81E71E6b347806b64dFAB",};
    const transactions = await Moralis.Web3API.account.getTransactions(options);
    console.log(transactions);

    // can put an if statement if(transactions.total > 0) then => {}
        let table = `
        <table class="table">
        <thead>
            <tr>
                <th scope="col">Transaction</th>
                <th scope="col">Block Number</th>
                <th scope="col">Age</th>
                <th scope="col">Type</th>
                <th scope="col">Fee</th>
                <th scope="col">Value</th>
            </tr>
        </thead>
        <tbody id="theTransactions">
        </tbody>
        </table>
        `
        document.querySelector('#tableOfTransactions').innerHTML = table;

        transactions.result.forEach(t => {
            let content = `
            <tr>
                <td>Transaction</td>
                <td>Block Number</td>
                <td>Age</td>
                <td>Type</td>
                <td>Fee</td>
                <td>Value</td>
            </tr>
            `
        })
    
}

if(document.querySelector('#btn-login') != null) {
    document.querySelector('#btn-login').onclick = login;
}
if(document.querySelector('#btn-logout') != null) {
    document.querySelector('#btn-logout').onclick = logout;
}

if(document.querySelector('#get-transactions-link') != null) {
    document.querySelector('#get-transactions-link').onclick = getTransactions;
}

// get-transactions-link
// get-balances-link
// get-NFTs-link

