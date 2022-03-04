const addressParser = str => {
    let spl = str.toUpperCase().split('\n');

    if (str.includes('(')){
      spl = spl.join(' ').split(') ')
    
    } else {
      for (const item of spl){
        item === '' ? spl.shift() : '';
      }
      spl = spl.join(' ').split(/\d{5}\-\d{4}/);

      for (let i = 0; i < spl.length; i++){
        let item = spl[i].split(' ')
        if (item[0] === ''){
          item.splice(0, 2);
        }
          spl[i] = item.join(' ')
      }
    }
    const setParsed = spl.reduce((accum, item) => {
      let itemArr = item.split(' ');
      itemArr[0] === '' ? itemArr.shift() : '';
      const boxIdx = itemArr.indexOf('BOX')
      if (itemArr[1]){
        if (itemArr[1].length === 1) {
          const retStr = itemArr[0].concat(' ', itemArr[1], ' ', itemArr[2]);
          accum.add(`"${retStr}"`);
          if(itemArr[1] === 'N'){
            accum.add(`"${itemArr[0].concat(' NORTH ', itemArr[2])}"`);
          }
          if(itemArr[1] === 'S'){
            accum.add(`"${itemArr[0].concat(' SOUTH ', itemArr[2])}"`);
          }
          if(itemArr[1] === 'E'){
            accum.add(`"${itemArr[0].concat(' EAST ', itemArr[2])}"`);
          }
          if(itemArr[1] === 'W'){
            accum.add(`"${itemArr[0].concat(' WEST ', itemArr[2])}"`);
          }
        } else if (boxIdx > -1){
          let boxStr = `"${itemArr[boxIdx].concat(' ',itemArr[boxIdx + 1])}"`
          boxStr = boxStr.replace(',', '')
          accum.add(boxStr)
        } else if (itemArr[0][0] !== '(' ){
        accum.add(`"${itemArr[0].concat(' ', itemArr[1])}"`)
        } 
      } 
      return accum
    }, new Set())
    let returnStr = ''
    setParsed.forEach((item) => returnStr += item + ' OR ')
    return returnStr.slice(0,-4)
}
export default addressParser
