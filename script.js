function downloadQRCode() {
  var surname = document.getElementById("surname").value;  
  var givenname = document.getElementById("givenname").value;
  var email = document.getElementById("email").value;
  var tel = document.getElementById("tel").value;
  var title = document.getElementById("title").value;

//   var surname216 = utf8ToHexString(surname);
//   var givenname216 = utf8ToHexString(givenname);
//   var title216 = utf8ToHexString(title);

  var vcard = "BEGIN:VCARD\nVERSION:3.0\n";
//   vcard += "N;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:" + surname + ";" + givenname + ";;;\n";
//   vcard += "FN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:" + givenname216 + utf8ToHexString(' ') + surname216 + "\n";
//   vcard += "FN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:" + surname + givenname + "\n";
  vcard += "N:" + surname + ";" + givenname + ";;;\n";
//   vcard += "FN:" + givenname + " " + surname + "\n";
  vcard += "FN:" + surname + givenname +  "\n";
  vcard += "EMAIL;WORK:" + email + "\n";
  if (tel !== "") {
    vcard += "TEL;CELL:" + tel + "\n";
  }
  vcard += "ORG:Wassup42" + "\n";
//   vcard += "TITLE;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:" + title + "\n";
  vcard += "TITLE" + title + "\n";
  vcard += "END:VCARD";
  console.log(vcard);

  var qrcode = new QRCode(document.createElement("div"), {
    text: vcard,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  var qrCodeImage = qrcode._oDrawing._elCanvas; // Get the QR code canvas element
  
  var canvas = document.getElementById("card");
  var ctx = canvas.getContext('2d');
  var backgroundImage = new Image();
  backgroundImage.src = 'https://github.com/Paul2021-R/Wassup42/blob/main/background.jpeg?raw=true';
  backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(qrCodeImage, 112, 272);

	var dataURL = canvas.toDataURL('image/png');
	var blob = dataURItoBlob(dataURL);
	var url = URL.createObjectURL(blob);
	var link = document.createElement("a");
	link.href = url;
	link.download = "my_wassup_card.png";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	// document.body.removeChild(qrcode);
	canvas.remove();
	URL.revokeObjectURL(url);
  }
}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

function utf8ToHexString(str) {
  let hexString = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code < 128) { // ASCII character
      hexString += code.toString(16).padStart(2, '0'); // 1 byte
    } else if (code < 2048) { // 2-byte character
      hexString += ((code >> 6) | 0xc0).toString(16) + (code & 0x3f | 0x80).toString(16); // 2 bytes
    } else if (code < 65536) { // 3-byte character
      hexString += ((code >> 12) | 0xe0).toString(16) + ((code >> 6) & 0x3f | 0x80).toString(16) + (code & 0x3f | 0x80).toString(16); // 3 bytes
    } else if (code < 1114112) { // 4-byte character
      hexString += ((code >> 18) | 0xf0).toString(16) + ((code >> 12) & 0x3f | 0x80).toString(16) + ((code >> 6) & 0x3f | 0x80).toString(16) + (code & 0x3f | 0x80).toString(16); // 4 bytes
    }
  }
  
  let encodedString = '';
  for (let i = 0; i < hexString.length; i += 2) {
    encodedString += '=' + hexString.slice(i, i + 2).toUpperCase();
  }
  
  return encodedString;
}

function containsKorean(str) {
  const koreanRegExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/; // 한글 정규식
  return koreanRegExp.test(str);
}
