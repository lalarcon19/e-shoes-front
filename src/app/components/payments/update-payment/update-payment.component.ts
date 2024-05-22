import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FranchiseEnum, MethodEnum, PaymentRequest } from 'src/app/models/payment';
import { AuthService } from 'src/app/service/authService/auth.service';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { PaymentService } from 'src/app/service/paymentService/payment.service';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css']
})
export class UpdatePaymentComponent {
  paymentForm: FormGroup;
  franchise = [FranchiseEnum.MASTERCARD, FranchiseEnum.VISA];
  method = [MethodEnum.CREDITO, MethodEnum.DEBITO];

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService) {

    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.maxLength(16)]],
      franchise: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]]
    });

  }

  update() {

    if (this.paymentForm.valid) {

      const formData = this.paymentForm.value;
      console.log("click", formData);

      let data: PaymentRequest = {
        paymentMethod: formData.paymentMethod,
        franchises: formData.franchise,
        cardNumber: String(formData.cardNumber),
        userId: this.getUserId()
      }
      console.log(data);


      this.paymentService.update(this.getUserId(), data).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            alert("Se actualizo correctament.")
          } else {
            alert("Hubo un error")
          }
        }
      );

    }
  }

  getUserId() {
    let token = this.localStorageService.getTokenDecoded();
    return token.user_id;
  }
}
