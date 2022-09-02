import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cifradoAfin';
  public a!: number;
  public b!: number;
  public n: number = 0;
  public textACifrar = ""
  public textValid = ""
  public encyptMessage: String = '';
  public mensajeError: string = "";
  public showError = false;
  public mcd: any;

  public abecedario = new Map<string, number>([
    ["a", 0], ["b", 1], ["c", 2], ["d", 3], ["e", 4], ["f", 5], ["g", 6],
    ["h", 7], ["i", 8], ["j", 9], ["k", 10], ["l", 11], ["m", 12], ["n", 13],
    ["ñ", 14], ["o", 15], ["p", 16], ["q", 17], ["r", 18], ["s", 19], ["t", 20],
    ["u", 21], ["v", 22], ["w", 23], ["x", 24], ["y", 25], ["z", 26]
  ]);



  constructor() {
    this.n = this.abecedario.size;
  }

  encriptar(a: number, b: number) {
    console.log("clicK")
    this.a = a;
    this.b = b;
    this.adjustText();
    this.validateCoprimos();
  }

  adjustText() {
    this.textValid = this.textACifrar.toLowerCase();
    this.textValid = this.textValid.replace(/[^a-z]/ig, "");
  }

  validateCoprimos() {
    this.maximoComunDivisor(this.a, this.b)
    this.mcd === 1 ? this.encrypt() : this.viewError();
  }

  encrypt() {
    if (this.a >= 0 && this.b <= this.n) {
      let contains: any;
      let encyptMessage: any = [];
      for (const iterator of this.textValid) {
        contains = this.abecedario.get(iterator);
        let newLetter = ((this.a * contains) + this.b) % this.n;
        for (const iterator2 of this.abecedario.entries()) {
          if (iterator2[1] == newLetter) {
            encyptMessage.push(iterator2[0])
          }
        }
      }
      this.encyptMessage = String(encyptMessage).split(',').join('');
    } else {
      this.viewError()
    }
    console.log("nuevo Mensaje", this.encyptMessage)
  }

  maximoComunDivisor(a: number, b: number): any {
    if (this.n == 0) return this.mcd = a
    return this.mcd = this.maximoComunDivisor(this.n, a % this.n);
  }

  viewError() {
    this.showError = true
    if (this.mcd == 1) {
      this.mensajeError = "Los numeros a y n no son coprimos"
    }
    if (this.a <= 0) {
      this.mensajeError = "La Constante Decimación (A) debe ser mayor a Cero"
    } else if (this.b >= this.n) {
      this.mensajeError = "La Constante Desplazamiento (B) no puede ser mayor que n = 27"
    }
  }

  closeError() {
    this.showError = false
  }
}
