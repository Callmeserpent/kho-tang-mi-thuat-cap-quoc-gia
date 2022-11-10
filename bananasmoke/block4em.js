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

class Blockchain {
  constructor() {
    //block đầu tiên
    const genesisBlock = new Block('0000', { isGenesis: true })

    this.chain = [genesisBlock];
  }

  //nhận block cuối cùng
  getLastBLock() {
    return this.chain[this.chain.length - 1];
  }

  //tạo block mới từ hash của block cuối cùng  
  addBlock(data) {
    const lastBlock = this.getLastBLock();
    const newBlock = new Block(lastBlock.hash, data);

    this.chain.push(newBlock);
  }
}

const duongChain = new Blockchain();
console.log(duongChain);

duongChain.addBlock({ from: 'duong', to: 'duyen', amount: 100 })
duongChain.addBlock({ from: 'duong', to: 'tram', amount: 500 })
duongChain.addBlock({ filmAnime: 'Hentaiz.net' })

console.log(duongChain.chain);