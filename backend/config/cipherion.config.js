import {CipherionClient } from "@cipherion/client";

const cipherionClient = new CipherionClient({
    baseUrl: process.env.CIPHERION_BASE_URL,
    projectId: process.env.CIPHERION_PROJECT_ID,
    apiKey: process.env.CIPHERION_API_KEY,
    passphrase: process.env.CIPHERION_PASSPHRASE,

});

export default cipherionClient;