import * as async from './asyncFn.js';

async function run(){
  const path = './asset/url.json';
  const privatePath = './private/setting.json'
  let successUrl = [];
  let urls = JSON.parse(await async.asyncFileRead(path));
  let privateSetting = JSON.parse(await async.asyncFileRead(privatePath));
  const headers = {
    Referer: privateSetting.ip + "/scoreLevel/view/main",
    Cookie : "JSESSIONID=4730C513F01980391F5D3908BF5AAB8A",
    "File-Size":"size of the file"
  }
  for (const url of urls){
    let settings = {
      url: privateSetting.ip+url,
      headers: headers,
    }
    try{
      let res = await async.doRequest(settings);
      let ret = JSON.parse(res);
      let success = !ret.success;
      let message = ret.message === '접근 권한이 없습니다.'
      if(success,message){
        successUrl.push(url);
        console.log(url,success,message);
      }
    }catch(err){
    }
  }
  let csvContent = "";
  successUrl.forEach(function(data,index){
    csvContent += data+"\n";
  })
  async.writeFile('./ret.csv',csvContent);
}

run();