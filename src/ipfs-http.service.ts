import { Inject, Injectable, Logger } from '@nestjs/common'
import { create, Options, IPFSHTTPClient } from 'kubo-rpc-client'
import { CLIENT_OPTIONS } from './constants'

@Injectable()
export class IpfsHttpService {
    private readonly logger = new Logger(IpfsHttpService.name)
    client: IPFSHTTPClient

    constructor(@Inject(CLIENT_OPTIONS) private readonly options: Options) {
        this.client = create(options)
    }
}
