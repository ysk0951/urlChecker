import * as request from 'request'
import * as fs from 'fs'
export const asyncFileRead = (filePath) => {
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
export const doRequest = (settings)  => {
  return new Promise(function (resolve, reject) {
    console.log(request);
    request.post(settings, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}
export const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })