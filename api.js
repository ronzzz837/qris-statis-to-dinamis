const _path = process.cwd();
const express = require("express");

const router = express.Router();

function toCRC16(str) {
  function charCodeAt(str, i) {
    let get = str.substr(i, 1)
    return get.charCodeAt()
  }

  let crc = 0xFFFF;
  let strlen = str.length;
  for (let c = 0; c < strlen; c++) {
    crc ^= charCodeAt(str, c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  hex = crc & 0xFFFF;
  hex = hex.toString(16);
  hex = hex.toUpperCase();
  if (hex.length == 3) {
    hex = "0" + hex;
  }
  return hex;
}

async function qrisDinamis(nominal, qris) {
  nominal = String(nominal)

  let qris2 = qris.slice(0, -4);
  let replaceQris = qris2.replace("010211", "010212");
  let pecahQris = replaceQris.split("5802ID");
  let uang = "54" + ("0" + nominal.length).slice(-2) + nominal + "5802ID";

  let output = pecahQris[0] + uang + pecahQris[1] + toCRC16(pecahQris[0] + uang + pecahQris[1])

  return output
}

router.get("/api/qris-statis-to-dinamis", async (req, res) => {
  const { amount, codeqr } = req.query
  if (!amount) return
  if (!codeqr) return 
  
  let qr_string = await qrisDinamis(amount, codeqr)
  res.json({
    status: true,
    creator: "Ronzz YT",
    qr_string: qr_string
  });
});

router.get("/", (req, res) => {
  res.sendFile(_path + "/home.html")
});

module.exports = router;