function arrayStrUpperToStr(list, separator) {
  const listaFormateada = list.map(elemento => {
    return elemento
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ')
  })

  // Unimos los elementos con el separador " | "
  const stringFinal = listaFormateada.join(separator)

  return JSON.parse(JSON.stringify(stringFinal))
}

function cleanQueryEmpties(query) {
  return Object.entries(query).reduce((nuevoObjeto, [clave, valor]) => {
    if (Array.isArray(valor) && valor.length === 0) {
      // Si es un array vacío, no lo agregamos
    } else if (valor) {
      // Si no es un array vacío o es un valor "truthy", lo agregamos
      nuevoObjeto[clave] = valor
    }
    return nuevoObjeto
  }, {})
}

export const objectUtils = {
  arrayStrUpperToStr,
  cleanQueryEmpties,
}
