import { Inject, Injectable } from '@nestjs/common'
import { MODULE_OPTIONS_TOKEN } from './ipfs-http.module-definitions'
import { GetFileParams, IPFSHTTPClient } from './lib'
import { IpfsHttpModuleOptions } from './ipfs-http.interface'

@Injectable()
export class IpfsHttpService {
    client: IPFSHTTPClient

    constructor(@Inject(MODULE_OPTIONS_TOKEN) options: IpfsHttpModuleOptions) {
        this.client = new IPFSHTTPClient(options.client)
    }

    /**
     * Helper to cat from uri
     * @param uri ipfs://<hash>
     * @returns Promise<ArrayBuffer>
     */
    async catFromUri(uri: string) {
        return await this.client.cat({ arg: uri.replace('ipfs://', '') })
    }

    /**
     * Helper to get from uri
     * @param uri ipfs://<hash>
     * @returns Promise<ArrayBuffer>
     */
    async getFromUri(uri: string) {
        return await this.client.get({ arg: uri.replace('ipfs://', '') })
    }

    /**
     * Helper to add JSON to IPFS
     * @param data JSON object
     * @returns Promise<AddFileResponse>
     */
    async addJson(data: unknown) {
        return await this.client.add(JSON.stringify(data))
    }

    /**
     * Helper to get JSON from uri
     * @param uri
     * @returns Promise<unknown>
     */
    async getJsonFromUri(uri: string) {
        const data = await this.catFromUri(uri)
        const str = new TextDecoder().decode(new Uint8Array(data))
        return JSON.parse(str)
    }

    /**
     * Helper to get JSON from path
     * @param path
     * @returns Promise<unknown>
     */
    async getJson(params: GetFileParams) {
        const data = await this.client.cat(params)
        const str = new TextDecoder().decode(new Uint8Array(data))
        return JSON.parse(str)
    }
}
