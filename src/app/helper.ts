import {
  Pipe,
  PipeTransform,
  Directive,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
//kostyа bigChart={....}

function replaceEachWord(target: any, key: string, desc:any) {
  return {
    value(text: string){
      //console.log(text);
      console.log(desc)
      let result = text.replace(
        /\w+/g,
        (word) =>{
          console.log(word)
          return desc.value(word)
        }
      )

      console.log(`${text} => ${result}`)
      return result
    }
  }
}


class BigChart  {
  @replaceEachWord
  static last (word: string ){
    return word.slice(0, -1) + word.substr(-1, 1).toUpperCase()
  }

  @replaceEachWord
  static first(word: string){
    return word.slice(0, 1).toUpperCase() + word.slice(1)
  }
  //return {last, first}
}


@Pipe({
    name: 'lastChar'
})
export class LastCharPipe implements PipeTransform, AfterViewChecked {
  transform(text: string){
    console.log(`pipe ${text}`)
    return BigChart.last(text)
  }
  ngAfterViewChecked(){

  }
}

@Directive({
  selector: '[firstChar]'
})
export class FirstCharDirective implements AfterViewChecked{
  constructor(private el: ElementRef) {

  }
  ngAfterViewChecked(){
    let el = this.el;
    let text = el.nativeElement.value;

    let bigfirst = BigChart.first(text);
    console.log(el, text, bigfirst);
    console.log();
    //el.nativeElement.value = text.replace(/w*/g, bigChart.last);
    el.nativeElement.value = bigfirst
  }
}
