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

  //kiểm tra dữ liệu blockchain
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.prevHash !== prevBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

const duongChain = new Blockchain();
console.log(duongChain);

duongChain.addBlock({ from: 'duong', to: 'duyen', amount: 100 })
duongChain.addBlock({ from: 'duong', to: 'tram', amount: 500 })
duongChain.addBlock({ filmAnime: 'Hentaiz.net' })

//Nếu hack dữ liệu chuyển đổi số tiền chuyển đi từ 100 thành 50=> kết quả 'chainvalid: false'
duongChain.chain[1].data = { from: 'duong', to: 'duyen', amount: 50 }

//Hacker hash lại toàn bộ sau khi đổi dữ liệu=> kết quả vẫn là 'chainvalid: false' - vì block [2] ko nhận hash đã đổi, dù dữ liệu block [1] đúng => một khi đã sửa 1 block thì phải sửa toàn bộ block phía sau.
duongChain.chain[1].hash = duongChain.chain[1].calculateHash();

console.log(duongChain.chain);
console.log('chainvalid: ', duongChain.isValid())