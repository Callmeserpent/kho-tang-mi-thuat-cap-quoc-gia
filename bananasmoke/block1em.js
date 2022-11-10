const hash = require('crypto-js/sha256');

class Block {
  constructor(prevHash, data) {
    this.prevHash = prevHash;
    this.data = data;
    this.timeStamp = new Date();

    this.hash = this.calculateHash();
  }

  //xuất ra hash của block hiện tại
  calculateHash() {
    return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp).toString();
  }

}

const block = new Block('', { hello: 'world' });
//Hash trước rỗng, dữ liệu hello: 'world'. chuỗi hash được tạo bằng cách hash toàn bộ dữ liệu của block.

console.log(block);