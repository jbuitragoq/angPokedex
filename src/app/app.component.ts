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
  public mcd!: number;
  public i!: number;
  public textACifrar = ""
  public textValid = ""
  public encyptMessage: String = '';
  public encryptMessageT = ''
  public mensajeError: string = "";
  public showError = false;
  public decryptMessage2: any;
  public content: any = [];
  public arrLess: any;
  public arrMore: any;
  public show: boolean = false;

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
    this.a = a;
    this.b = b;
    this.adjustText(this.textACifrar);
    this.validateCoprimos();
  }

  adjustText(text?: any) {
    this.textValid = text.replace(/[^a-zñvÑV]/ig, "");
    this.textValid = this.textValid.toLowerCase();
  }

  validateCoprimos() {
    this.maximoComunDivisor(this.a, this.n)
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
      this.calculateConcurrent(this.encyptMessage)
    } else {
      this.viewError()
    }
  }

  maximoComunDivisor(a: number, b: number): any {

    if (b == 0) return this.mcd = a
    return this.mcd = this.maximoComunDivisor(b, a % b);
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

  //Desencriptar

  decryptText() {

    this.decryptMessage2 = ' '
    this.content = []
    this.adjustText(this.encryptMessageT);
    this.calculateInverso();
  }

  calculateInverso() {
    for (const iterator2 of this.abecedario.entries()) {
      if (((this.a * iterator2[1]) % this.n) == 1) {
        this.i = iterator2[1]
      }
    }
    this.decryptMessage();
  }

  decryptMessage() {
    let decryptMessage: any = [];
    let newLetter;
    let contains: any;
    let preModulo: any;
    for (const iterator of this.textValid) {
      contains = this.abecedario.get(iterator);
      preModulo = (this.i * (contains - this.b))

      if (preModulo < 0) {
        do {
          preModulo += this.n;
        } while (preModulo < 0);
      }
      newLetter = (preModulo % this.n)
      decryptMessage = this.asignLetter(newLetter)
      this.decryptMessage2 = String(decryptMessage).split(',').join('');
    }
  }

  asignLetter(newLetter: any) {

    for (const iterator2 of this.abecedario.entries()) {
      if (iterator2[1] == newLetter) {
        this.content.push(iterator2[0])
      }
    }
    return this.content;
  }

  //Calcular Estadistica de mensaje cifrado
  calculateConcurrent(msg: any) {
    let myMap = new Map<string, number>();
    for (const iterator of msg) {
      let coincidence = 0;
      for (const iterator2 of msg) {
        if (iterator == iterator2) {
          coincidence += 1;
        }
      }
      myMap.set(iterator, coincidence)
    }
    this.takeMoreless(myMap);
  }

  takeMoreless(myMap: Map<string, number>) {
    //Valid Mayores
    console.log("mapPrincipal", myMap)
    let auxMore: Map<string, number> = this.setMap(myMap, 1, 0);
    this.arrMore = Array.from(auxMore, ([name, value]) => ({ name, value }));
    console.log("Aux More", auxMore)
    //Valid menore
    let auxLess: Map<string, number> = this.setMap(myMap, 2, 1);
    this.arrLess = Array.from(auxLess, ([name, value]) => ({ name, value }));
    console.log("Aux Less", auxLess)
    this.show = true;

  }

  setMap(myMap: any, consult: number, cont: number) {
    let aux = new Map<string, number>();
    let consulta;
    for (const entry of myMap.entries()) {
      consult == 1 ? consulta = entry[1] > cont : consulta = entry[1] < cont
      if (consulta) {
        cont = entry[1];
        aux.clear();
        aux.set(entry[0], entry[1])
      } else if (entry[1] == cont) {
        aux.set(entry[0], entry[1])
      } else if (entry[1] >= cont) {
        cont = entry[1];
      }
    }
    console.log("Aux", aux)
    return aux;
  }

}
