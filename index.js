const fs = require('fs');
const util = require('util');
const _ = require('lodash')
const request = require('request');
const asyncFileRead = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (data === undefined) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const doRequest = (settings)  => {
  return new Promise(function (resolve, reject) {
    request.post(settings, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

async function run(){
  const path = './asset/url.json';
  const privatePath = './private/setting.json'
  let successUrl = [];
  let urls = JSON.parse(await asyncFileRead(path));
  let private = JSON.parse(await asyncFileRead(privatePath));
  const headers = {
    Referer: private.ip + "/scoreLevel/view/main",
    Cookie : "JSESSIONID=4730C513F01980391F5D3908BF5AAB8A",
    "File-Size":"size of the file"
  }
  cnt = 1;
  for (const url of urls){
    let settings = {
      url: private.ip+url,
      headers: headers,
    }
    try{
      let res = await doRequest(settings);
      let ret = JSON.parse(res);
      let success = !ret.success;
      let message = ret.message === '접근 권한이 없습니다.'
      if(success,message){
        successUrl.push(url);
        console.log(url,success,message);
      }
    }catch(err){
      // console.log(err);
    }
    cnt ++;
  }
  let csvContent = "";
  successUrl.forEach(function(data,index){
    csvContent += data+"\n";
  })
  writeFile('./ret.csv',csvContent);
}

run();