DataView.prototype.getString = function (offset, length) {
  let end = typeof length == 'number' ? offset + length : this.byteLength;
  let text = '';
  let val = -1;
  while (offset < this.byteLength && offset < end) {
    val = this.getUint8(offset++);
    if (val == 0) break;
    text += String.fromCharCode(val);
  }
  return text;
};

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

document.getElementById('submit').addEventListener('click', event => {

  document.querySelector('#gfdContent tbody').innerHTML = '';
  document.getElementById('gfdHeader').style.display = 'block';
  document.getElementById('gfdContent').style.display = 'table';
  const elem = document.getElementById('importFile');

  if (elem.files.length <= 0) {
    alert('The file is not selected.');
    return false;
  }

  const file = elem.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', event => {

    const buffer = event.target.result;
    const view = new DataView(buffer);

    const magic = view.getString(0, 4);

    if (!magic.startsWith('GFD')) {
      alert('Please select a GFD file.');
      return false;
    }

    const version = view.getUint32(4, true);

    if (version != 68614 && version != 69382 && version != 69639 && version != 69895) {
      alert('Unsupported version of GFD.');
      return false;
    }

    if (version == 68614) {

      var fontSize = view.getUint32(20, true),
          fontTexCount = view.getUint32(24, true),
          charCount = view.getUint32(28, true),
          floatCount = view.getUint32(32, true),
          maxCharWidth = 'undefined',
          maxCharHeight = 'undefined',
          baseLine = view.getFloat32(36, true),
          descentLine = view.getFloat32(40, true),
          fileNameLength = view.getUint32(44 + floatCount * 4, true),
          fileName = view.getString(48 + floatCount * 4, fileNameLength),
          items = ['version', 'fontSize', 'fontTexCount', 'charCount', 'floatCount', 'maxCharWidth', 'maxCharHeight', 'baseLine', 'descentLine', 'fileName'],
          vars = [version, fontSize, fontTexCount, charCount, floatCount, maxCharWidth, maxCharHeight, baseLine, descentLine, '<code>' + fileName + '</code>'];

    } else if (version == 69382 || version == 69639 || version == 69895) {

      var fontSize = view.getUint32(20, true),
          fontTexCount = view.getUint32(24, true),
          charCount = view.getUint32(28, true),
          floatCount = view.getUint32(36, true),
          maxCharWidth = view.getFloat32(40, true),
          maxCharHeight = view.getFloat32(44, true),
          baseLine = view.getFloat32(48, true),
          descentLine = view.getFloat32(52, true),
          fileNameLength = view.getUint32(56 + floatCount * 4, true),
          fileName = view.getString(60 + floatCount * 4, fileNameLength),
          items = ['version', 'fontSize', 'fontTexCount', 'charCount', 'floatCount', 'maxCharWidth', 'maxCharHeight', 'baseLine', 'descentLine', 'fileName'],
          vars = [version, fontSize, fontTexCount, charCount, floatCount, maxCharWidth, maxCharHeight, baseLine, descentLine, '<code>' + fileName + '</code>'];

    }

    for (let i = 0; i < items.length; i++) {
      document.getElementById(items[i]).innerHTML = vars[i];
    }

    if (window.Worker) {
      const worker = new Worker('./worker.js');
      worker.postMessage(buffer);
      worker.onmessage = function (glphs) {
        document.querySelector('#gfdContent tbody').innerHTML = glphs.data;
      }
    } else {
      alert('Your browser does not support Web Workers.');
      return false;
    }

  });
  reader.readAsArrayBuffer(file);
});
