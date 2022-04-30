exports.TEMPLATES = {
    ACCOUNT_ACTIVATION_TEMPLATE: (name, tokenUrl) => `
        <h1>Hello, ${name}</h1>
        <p>Here is your activation link:</p>
        <a href='http://localhost:3000/activate-account/${tokenUrl}'>Click here</a>
    `
}