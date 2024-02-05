import { AddFileResponse, DhtStatsParams, DhtStatsResponseItem, Options } from './types'
import { AddFileParams, GetFileParams } from './types'
import { buildUrlWithParams, parseNdjson } from './util'
import * as FormDataNode from 'form-data'
import fetch from 'node-fetch-commonjs'

export class IPFSHTTPClient {
    options: Options

    constructor(options?: Options) {
        this.options = {
            protocol: options?.protocol || 'http',
            host: options?.host || '127.0.0.1',
            port: options?.port || 5001,
        }
    }

    makeUrl(path: string) {
        return `${this.options.protocol}://${this.options.host}:${this.options.port}${path}`
    }

    async add(file: Buffer | string, params?: AddFileParams): Promise<AddFileResponse> {
        const url = this.makeUrl('/api/v0/add')
        const formData = new FormDataNode()
        formData.append('file', file)

        const fullUrl = buildUrlWithParams(url, params)

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                body: formData,
                headers: formData.getHeaders(),
            })
            if (response.status > 201) {
                throw new Error(`Failed to upload file: ${response.statusText}`)
            }
            const data = (await response.json()) as AddFileResponse
            return data
        } catch (error) {
            throw error
        }
    }

    async get(params: GetFileParams) {
        const url = this.makeUrl('/api/v0/get')
        const fullUrl = buildUrlWithParams(url, params)

        const response = await fetch(fullUrl, {
            method: 'POST',
        })
        if (response.status > 201) {
            throw new Error(`Failed to download file: ${response.statusText}`)
        }
        const data = await response.arrayBuffer()
        return data
    }

    async cat(params: GetFileParams) {
        const url = this.makeUrl('/api/v0/cat')
        const fullUrl = buildUrlWithParams(url, params)

        const response = await fetch(fullUrl, {
            method: 'POST',
        })
        if (response.status > 201) {
            throw new Error(`Failed to download file: ${response.statusText}`)
        }
        const data = await response.arrayBuffer()
        return data
    }

    async dhtStat(params: DhtStatsParams): Promise<DhtStatsResponseItem[]> {
        const url = this.makeUrl('/api/v0/stats/dht')
        const fullUrl = buildUrlWithParams(url, params)

        const response = await fetch(fullUrl, {
            method: 'POST',
        })
        if (response.status > 201) {
            throw new Error(`Failed to retrieve DHT stats: ${response.statusText}`)
        }
        const data = await response.text()
        return parseNdjson(data)
    }

    // Not really, huh?
    async isOnline() {
        const res = await this.dhtStat({})
        return res.find((item) => item.Name === 'wan') !== undefined
    }
}
