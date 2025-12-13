const https = require('https');

// Usage: node trigger-deploy.js <YOUR_DEPLOY_HOOK_URL>
const deployHookUrl = process.argv[2];

if (!deployHookUrl) {
    console.error("❌ Error: Please provide the Deploy Hook URL as an argument.");
    console.error("Usage: node trigger-deploy.js <YOUR_DEPLOY_HOOK_URL>");
    process.exit(1);
}

console.log(`🚀 Triggering deployment via hook: ${deployHookUrl}...`);

https.get(deployHookUrl, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log("✅ Deployment triggered successfully!");
            console.log("Response:", JSON.parse(data));
        } else {
            console.error(`❌ Failed to trigger deployment. Status Code: ${res.statusCode}`);
            console.error("Response:", data);
        }
    });

}).on("error", (err) => {
    console.error("❌ Error: " + err.message);
});
