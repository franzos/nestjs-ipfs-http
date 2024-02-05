import { Inject, Injectable, Logger } from '@nestjs/common'
import { CLIENT_OPTIONS } from './constants'
import { GetFileParams, IPFSHTTPClient, Options } from './lib'

@Injectable()
export class IpfsHttpService {
    private readonly logger = new Logger(IpfsHttpService.name)
    client: IPFSHTTPClient

    constructor(@Inject(CLIENT_OPTIONS) private readonly options: Options) {
        this.client = new IPFSHTTPClient(options)
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
