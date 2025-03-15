
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IpfsHttpModuleOptions } from './ipfs-http.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<IpfsHttpModuleOptions>().build();
