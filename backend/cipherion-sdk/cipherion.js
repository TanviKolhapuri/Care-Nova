// index.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class CipherionClient {
    /**
     * Create a new client instance.
     * @param {Object} options
     * @param {string} options.baseUrl - base URL for Cipherion API (required if not in env)
     * @param {string} options.projectId - project id to be included in the path param
     * @param {string} options.apiKey - x-api-key header
     * @param {string} [options.passphrase] - optional default passphrase (can be overridden per-request)
     * @param {Object} [options.axiosConfig] - optional axios config overrides
     */
    constructor({ baseUrl, projectId, apiKey, passphrase, axiosConfig } = {}) {
        this.baseUrl = baseUrl || process.env.CIPHERION_BASE_URL;
        this.projectId = projectId || process.env.CIPHERION_PROJECT_ID;
        this.apiKey = apiKey || process.env.CIPHERION_API_KEY;
        this.defaultPassphrase = passphrase || process.env.CIPHERION_PASSPHRASE || null;

        if (!this.baseUrl) {
            throw new Error("Cipherion baseUrl not provided. Set CIPHERION_BASE_URL or pass baseUrl to the client.");
        }
        if (!this.projectId) {
            throw new Error("Cipherion projectId not provided. Set CIPHERION_PROJECT_ID or pass projectId to the client.");
        }
        if (!this.apiKey) {
            throw new Error("Cipherion apiKey not provided. Set CIPHERION_API_KEY or pass apiKey to the client.");
        }

        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "application/json"
            },
            ...axiosConfig
        });
    }

    // Helper to build request config (headers)
    _getHeaders() {
        return {
            "x-api-key": this.apiKey
        };
    }

    // Helper to call endpoints with projectId path param
    // Helper to call endpoints with projectId path param
    async _post(endpoint, body = {}, options = {}) {
        const url = `crypto/${endpoint.replace(/^\/+/, "")}/${this.projectId}`;
        try {
            const resp = await this.axios.post(url, body, {
                headers: this._getHeaders(),
                ...options
            });

            const value = resp?.data?.data;

            // If it's an object, return the first property's value
            if (value && typeof value === "object" && !Array.isArray(value)) {
                return value[Object.keys(value)[0]];
            }

            // Otherwise, return it as-is
            return value;

        } catch (err) {
            // normalize axios errors
            if (err.response) {
                // API returned non-2xx
                const { status, data } = err.response;
                const message = data?.message || data?.error || err.message;
                const e = new Error(`Cipherion API error: ${message}`);
                e.status = status;
                e.response = data;
                throw e;
            }
            throw err;
        }
    }

    // 1) encrypt: expects { data: "...", passphrase: "..." }
    async encrypt({ data, passphrase } = {}) {
        if (!passphrase && !this.defaultPassphrase) {
            throw new Error("passphrase required for encrypt (pass in param or set default in client).");
        }
        const body = { data, passphrase: passphrase || this.defaultPassphrase };
        return this._post("encrypt", body);
    }

    // 2) decrypt: expects { data: encrypted_str, passphrase: "..." }
    async decrypt({ data, passphrase } = {}) {
        if (!passphrase && !this.defaultPassphrase) {
            throw new Error("passphrase required for decrypt (pass in param or set default in client).");
        }
        const body = { data: data, passphrase: passphrase || this.defaultPassphrase };
        return this._post("decrypt", body);
    }

    // 3) deep_encrypt: sends object in `data` plus passphrase
    async deepEncrypt({ data, passphrase } = {}) {
        if (!passphrase && !this.defaultPassphrase) {
            throw new Error("passphrase required for deepEncrypt (pass in param or set default in client).");
        }
        const body = { data, passphrase: passphrase || this.defaultPassphrase };
        return this._post("deep_encrypt", body);
    }

    // 4) deep_decrypt: expects { encrypted: {...}, passphrase: "..." }
    async deepDecrypt({ data, passphrase } = {}) {
        if (!passphrase && !this.defaultPassphrase) {
            throw new Error("passphrase required for deepDecrypt (pass in param or set default in client).");
        }
        const body = { encrypted:data, passphrase: passphrase || this.defaultPassphrase };
        return this._post("deep_decrypt", body);
    }

    // Static helper to create client from env
    static fromEnv(extra = {}) {
        return new CipherionClient({
            baseUrl: process.env.CIPHERION_BASE_URL,
            projectId: process.env.CIPHERION_PROJECT_ID,
            apiKey: process.env.CIPHERION_API_KEY,
            passphrase: process.env.CIPHERION_PASSPHRASE,
            ...extra
        });
    }
}

export default CipherionClient;
