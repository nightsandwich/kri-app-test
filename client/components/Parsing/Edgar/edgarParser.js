const edgarParser = str => {
    const andReg = /(?: AND )/gmi;
    const orReg = /(:? OR )/gmi;
    const wReg = /(:? w\/2 )/gmi;
    const nReg = /(:? n\/2 )/gmi;
    const qReg = /(:?")/gmi;
    let ret = str.replace(orReg, ' <OR> ').replace(andReg, ' <AND> ').replace(wReg, ' <near/2> ').replace(nReg, ' <near/2> ').replace(qReg,'')
    return ret
  }
export default edgarParser;