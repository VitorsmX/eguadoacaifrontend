function detectFileType(fileName) {
    const regex = /image-.*(svg|png|jpg|jpeg|gif)/;
    const match = fileName.match(regex);
    if (match) {
      return match[1]; // Retorna o tipo de arquivo encontrado (svg, png, jpg, etc.)
    } else {
      return null; // Nenhum tipo de arquivo encontrado
    }
  }

export default detectFileType;