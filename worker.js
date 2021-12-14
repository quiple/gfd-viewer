DataView.prototype.getHex = function (offset, length) {
  let end = typeof length == 'number' ? offset + length : this.byteLength;
  let text = '';
  let val = -1;
  while (offset < this.byteLength && offset < end) {
    val = this.getUint8(offset++);
    text += val.toString(16).toUpperCase().padStart(2, '0');
  }
  return text;
};

onmessage = function (buffer) {

  const view = new DataView(buffer.data);
  const version = view.getUint32(4, true);

  if (version == 68614) {

    var charCount = view.getUint32(28, true),
        floatCount = view.getUint32(32, true),
        fileNameLength = view.getUint32(44 + floatCount * 4, true),
        glphs = new String;

  } else if (version == 69382 || version == 69639 || version == 69895) {

    var charCount = view.getUint32(28, true),
        floatCount = view.getUint32(36, true),
        fileNameLength = view.getUint32(56 + floatCount * 4, true),
        glphs = new String;

  }

  for (var i = 0; i < charCount; i++) {

    if (version == 68614) {

      var char = new DataView(buffer.data.slice((49 + floatCount * 4 + fileNameLength) + 16 * i, (49 + floatCount * 4 + fileNameLength) + 16 * i + 16)),
          code = char.getUint32(0, true),
          unicode = code.toString(16).toUpperCase().padStart(4, '0');
      if (code == 32) {
        var type = '&nbsp;';
      } else {
        var type = String.fromCodePoint(parseInt(code));
      }
      var teId  = char.getHex(4, 1),
          pos   = char.getHex(5, 3),
          posi1 = parseInt('0x' + pos.substr(3, 1) + pos.substr(0, 2)),
          posi2 = ', ' + parseInt('0x' + pos.substr(4, 2) + pos.substr(2, 1)),
          siz   = char.getHex(9, 3),
          size1 = parseInt('0x' + siz.substr(3, 1) + siz.substr(0, 2)),
          size2 = ', ' + parseInt('0x' + siz.substr(4, 2) + siz.substr(2, 1)),
          adv   = '',
          advn1 = char.getInt8(12),
          advn2 = '',
          offs1 = '',
          offs2 = '',
          spac  = char.getHex(13, 1) + ', ' + char.getHex(14, 1) + ', ' + char.getHex(15, 1);

    } else if (version == 69382) {

      var char = new DataView(buffer.data.slice((61 + floatCount * 4 + fileNameLength) + 20 * i, (61 + floatCount * 4 + fileNameLength) + 20 * i + 20)),
          code = char.getUint32(0, true),
          unicode = code.toString(16).toUpperCase().padStart(4, '0');
      if (code == 32) {
        var type = '&nbsp;';
      } else {
        var type = String.fromCodePoint(parseInt(code));
      }
      var teId  = char.getHex(4, 1),
          pos   = char.getHex(5, 3),
          posi1 = parseInt('0x' + pos.substr(3, 1) + pos.substr(0, 2)),
          posi2 = ', ' + parseInt('0x' + pos.substr(4, 2) + pos.substr(2, 1)),
          siz   = char.getHex(8, 3),
          size1 = parseInt('0x' + siz.substr(3, 1) + siz.substr(0, 2)),
          size2 = ', ' + parseInt('0x' + siz.substr(4, 2) + siz.substr(2, 1)),
          spac  = char.getHex(11, 1),
          adv   = char.getHex(12, 3),
          advn1 = parseInt('0x' + adv.substr(3, 1) + adv.substr(0, 2)),
          advn2 = ', ' + parseInt('0x' + adv.substr(4, 2) + adv.substr(2, 1)),
          offs1 = char.getInt8(16),
          offs2 = ', ' + char.getInt8(17);

    } else if (version == 69639 || version == 69895) {

      var char = new DataView(buffer.data.slice((61 + floatCount * 4 + fileNameLength) + 36 * i, (61 + floatCount * 4 + fileNameLength) + 36 * i + 36)),
          code = char.getUint32(0, true),
          unicode = code.toString(16).toUpperCase().padStart(4, '0');
      if (code == 32) {
        var type = '&nbsp;';
      } else {
        var type = String.fromCodePoint(parseInt(code));
      }
      var size1 = char.getFloat32(4, true),
          size2 = ', ' + char.getFloat32(8, true),
          offs1 = char.getFloat32(12, true),
          offs2 = ', ' + char.getFloat32(16, true),
          advn1 = char.getFloat32(20, true),
          advn2 = ', ' + char.getFloat32(24, true),
          teId  = char.getHex(28, 1),
          pos   = char.getHex(29, 3),
          posi1 = parseInt('0x' + pos.substr(3, 1) + pos.substr(0, 2)),
          posi2 = ', ' + parseInt('0x' + pos.substr(4, 2) + pos.substr(2, 1)),
          spac  = char.getHex(32, 1);

    }

    let glph = '<tr><td><code>' + type + '</code> U+' + unicode + '</td><td>' + teId + '</td><td>' + posi1 + posi2 + '</td><td>' + size1 + size2 + '</td><td>' + advn1 + advn2 + '</td><td>' + offs1 + offs2 + '</td><td>' + spac + '</td></tr>';
    glphs += glph;

  }
  postMessage(glphs);
}
