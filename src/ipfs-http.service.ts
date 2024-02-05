import { Inject, Injectable, Logger } from '@nestjs/common'
import { CLIENT_OPTIONS } from './constants'
import { IPFSHTTPClient, Options } from './lib'

@Injectable()
export class IpfsHttpService {
    private readonly logger = new Logger(IpfsHttpService.name)
    client: IPFSHTTPClient

    constructor(@Inject(CLIENT_OPTIONS) private readonly options: Options) {
        this.client = new IPFSHTTPClient(options)
    }
}
