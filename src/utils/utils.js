export const getTxt = (data) => {
  var str = ''
  var func = (function () {
    data.forEach((item) => {
      console.log(data)
      //   //str += data.name
      //   // if (data.subRegion && data.subRegion !== null) {
      //   //   getTxt(data.subRegion)
      //   // }
    })
  })(data)
  //console.log(str)
  return str
}
