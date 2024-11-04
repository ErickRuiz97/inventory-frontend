function deepCopy(objetoBase, entidad) {
  const contract = {}

  for (const propiedad in objetoBase) {
    if (propiedad in entidad) {
      const valorEntidad = entidad[propiedad]
      if (Array.isArray(valorEntidad)) {
        contract[propiedad] =
          valorEntidad.length > 0 ? entidad[propiedad] : objetoBase[propiedad]
      } else if (typeof valorEntidad === 'object' && valorEntidad !== null) {
        if (objetoBase[propiedad] == null) {
          contract[propiedad] = entidad[propiedad]
        } else {
          contract[propiedad] = deepCopy(objetoBase[propiedad], valorEntidad)
        }
      } else if (valorEntidad !== null) {
        contract[propiedad] = valorEntidad
      } else {
        contract[propiedad] = objetoBase[propiedad]
      }
    } else {
      contract[propiedad] = objetoBase[propiedad]
    }
  }

  return contract
}

function copyByValue(object) {
  return JSON.parse(JSON.stringify(object))
}

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

export const objectUtils = {
  deepCopy,
  copyByValue,
  arrayStrUpperToStr,
}
