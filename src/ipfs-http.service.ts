import { Inject, Injectable, Logger } from '@nestjs/common'
import { create, IPFSHTTPClient, Options } from 'ipfs-http-client'
import { CLIENT_OPTIONS } from './constants'
import { IPFSPath } from 'ipfs-core-types/src/utils'

@Injectable()
export class IpfsHttpService {
    private readonly logger = new Logger(IpfsHttpService.name)
    client: IPFSHTTPClient

    constructor(@Inject(CLIENT_OPTIONS) private readonly options: Options) {
        this.client = create(options)
    }

    /**
     * Convinience function for client.get for easy file retrieval
     * - Not recommended for large files
     * @param ipfsPath
     * @returns
     */
    async get(ipfsPath: IPFSPath) {
        const result = this.client.get(ipfsPath)
        const results: Uint8Array[] = []
        for await (const iterator of result) {
            results.push(iterator)
        }
        return results
    }
}
