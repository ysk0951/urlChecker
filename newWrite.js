

async function run(){
  let URLS = JSON.parse(await asyncFileRead(path));
  let ret = JSON.parse(await asyncFileRead(retPath));
  let failUrls = [];
  URLS.forEach(element => {
    let isExist = ret.indexOf(element);
    console.log(isExist);
    if(isExist >-1){

    }else{
      failUrls.push(element);
    }
  });
  let csvContent = "";
  failUrls.forEach(function(data,index){
    csvContent += data+"\n";
  })
  writeFile('./fail.csv',csvContent);
}
  

run();
