import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cifradoAfin';
  public a: number = 5;
  public b: number = 8;
  public n: number = 0;
  public mcd: any;

  public abecedario = new Map<string, number>([
    ["a", 0], ["b", 1], ["c", 2], ["d", 3], ["e", 4], ["f", 5], ["g", 6],
    ["h", 7], ["i", 8], ["j", 9], ["k", 10], ["l", 11], ["m", 12], ["n", 13],
    ["ñ", 14], ["o", 15], ["p", 16], ["q", 17], ["r", 18], ["s", 19], ["t", 20],
    ["u", 21], ["v", 22], ["w", 23], ["x", 24], ["y", 25], ["z", 26]
  ]);

  public textPrueba = "Hola Mundo  “ @ ß34'12 $%"
  public encyptMessage: String = '';

  constructor() {
    this.n = this.abecedario.size;
    this.adjustText();
    this.validateCoprimos();
  }

  adjustText() {
    this.textPrueba = this.textPrueba.toLowerCase();
    this.textPrueba = this.textPrueba.replace(/[^a-z]/ig, "");
  }

  validateCoprimos() {
    this.maximoComunDivisor(this.a, this.b)
    this.mcd === 1 ? this.encrypt() : console.log("Los numeros a y b no son coprimos")
  }

  encrypt() {
    if (this.a >= 0 && this.b <= this.n) {
      let contains: any;
      let encyptMessage: any = [];
      for (const iterator of this.textPrueba) {
        contains = this.abecedario.get(iterator);
        let newLetter = ((this.a * contains) + this.b) % this.n;
        for (const iterator2 of this.abecedario.entries()) {
          if (iterator2[1] == newLetter) {
            encyptMessage.push(iterator2[0])
          }
        }
      }
      this.encyptMessage = String(encyptMessage).split(',').join('');
    }
    console.log("nuevo Mensaje", this.encyptMessage )
  }

  maximoComunDivisor(a: number, b: number): any {
    if (b == 0) return this.mcd = a
    return this.mcd = this.maximoComunDivisor(b, a % b);
  }

}
