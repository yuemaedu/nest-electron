import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { success } from '@app/common';
import * as NodeRSA from 'node-rsa';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * 生成公钥和私钥
   * https://blog.csdn.net/zhj_fly/article/details/80076541
   */
  @Get(':id')
  index() {
    const key = new NodeRSA({ b: 512 });
    return success({
      public_key: key.exportKey('pkcs8-public-pem'), //导出公钥
      private_key: key.exportKey('pkcs8-private-pem'), //导出公钥
    });
  }

  /**
   * 加密解密测试
   */
  @Get('/a/b')
  test() {
    const map = {
      code: 0,
      message: 'success',
      encrypted:
        'AqeVjM41iG49YhUeSat06NgZE93zYefHsfx5v5BGths8ETfkFtH2QGzqedk4jRm2dOT0lSM5nOEZQc5GSnlbZnebOPNoNAo/ZuazS2WEo+sduuilHFqTo1uIDqxcBl8WmSRNAficHPE3c37ZNsbpMWfTDFBpNvZ33IuUcR4NC3YDzZocFOPTYl+YdjuGTigEgv6I2B9EAT1B0ElZ0MQJWuJ/UlYFtll4YpwmOq9eTUvmDR8WqkXi/G6XCzXGBONp',
      decrypted: '{"startDate":1670657913372,"endDate":1670658172572}',
      public_key:
        '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI9AgVz2Posz2BlE6FJLEw9snUYPN74O\nen5RojvXiFENlPOFjVewCul3ikcMJC6tqvMdLi2oXW/Z+xm6Kg1umzsCAwEAAQ==\n-----END PUBLIC KEY-----',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAj0CBXPY+izPYGUTo\nUksTD2ydRg83vg56flGiO9eIUQ2U84WNV7AK6XeKRwwkLq2q8x0uLahdb9n7Gboq\nDW6bOwIDAQABAkEAg2Vmgy93BNYEBIGZG0qza/VzePyiY5kCMHWOepdi+Pw38pz7\nBxfiJDTSRqWzREgWe5M0QhIcOnQiN1RQHdPquQIhAOZObM/o1lrotu71FwwOsLXW\nlNITTihPrx0cfTFFpSklAiEAnzvMM2siBzPdY4wC6N7/6fn9+uPALfXQTMe53PvP\ndN8CIQDeNMzHzN8E14OpCtAx0fqtd1wfVIEUY82RSOuBnrC8AQIgASsuL35szIK7\n8DwZ1V21oSD9lTbQtUWllrqsiYurlR8CIBdks4Ijq3CfdJSGMPBJTSGmBvoY7dmY\nn4GMZQprBKhv\n-----END PRIVATE KEY-----',
    };
    const key = new NodeRSA(map.private_key, 'pkcs8-private');
    const pubKey = new NodeRSA(map.public_key, 'pkcs8-public');
    const startDate = new Date().getTime();
    const endDate = startDate + 86400 * 3;
    const obj = {
      startDate,
      endDate,
    };
    const encrypted = pubKey.encrypt(obj, 'base64');
    return {
      ...JSON.parse(key.decrypt(encrypted, 'utf8')),
    };
  }
}
