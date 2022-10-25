import { TPresenter } from '../shared/types/presenter'

export const presenter = ({ value, style }: TPresenter): any => {
    if (!style) return value

    const type = typeof value
    switch (type) {
        case 'object': {
            //No trae valores
            if (!Object.keys(value)?.length) return value
            
            //Si se trata de un array
            if (value.length) {
                return capitalizeArray({ value, style })
            } else {
                //es un objeto
                return capitalizeObject({ value, style })
            }
            
        }
        default: {
            return value
        }
    }
}

const capitalizeArray = ({ value: values, style }: TPresenter) => {
    let codes = []
    for (const current of values) {
        codes.push(presenter({ value: current, style }))
    }
    return codes
}

const capitalizeObject = ({ value, style }: TPresenter) => {
    let codes: any = {}

    //obtenemos las keys del objeto
    const keys = Object.keys(value)

    //Recorremos cada key (string)
    for (const key of keys) {
        let codeCase
        //Se procesa cada palabra del split array
        switch (style) {
            case 'camel': {
                codeCase = camelCase(key)
                break
            }
            case 'snake': {
                codeCase = snakeCase(key)
            }
        }

        //Se va generando el nuevo objeto
        codes[codeCase] = presenter({ value: value[key], style })
    }
    return codes
}

const camelCase = (key: string) => {
     //Separamos el string por un '_'
     const split = key.split('_')

     //Se procesa cada palabra del split array
     const codeCase = split.map((token, index) => {
         let word = token

         //Si no se trata de la primera palabra [0]
         if (index > 0) {

             //La primera letra del string va en mayúscula
             let parse = word.charAt(0).toUpperCase()

             //Si la palabra tiene más de una letra
             if (word.length > 1) {

                 //Se concatena la primera letra en mayúscula y el resto de la palabra
                 word = parse + word.slice(1).toLowerCase()
             } else word = parse
         }
         else {
             //Es la primera palabra y únicamente se asegura de retornarla en miniscula [0]
             word = word.toString().toLowerCase()
         }

         return word
     }).join('')

     return codeCase
}

const snakeCase = (key: string) => {
    //Separamos el string por mayúsculas, y un _ por si se da el caso
    const split = key.split(/(?=[A-Z])|_/)
    const codeCase = split.join('_').toLowerCase()
    return codeCase

}
