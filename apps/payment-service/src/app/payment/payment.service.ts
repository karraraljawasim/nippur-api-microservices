import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  async handlePayment() {
    // mocked payment process

    return Math.random() > 0.3;
  }
}
