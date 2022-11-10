const hash = require('crypto-js/sha256');

class Block {
  constructor(prevHash, data) {
    this.prevHash = prevHash;
    this.data = data;
    this.timeStamp = new Date();

    this.hash = this.calculateHash();
    this.mineVar = 0;
  }

  //xuất ra hash của block hiện tại
  calculateHash() {
    return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar).toString();
  }

  //mine block(đào) - Proof of Work - chống Hacker hash lại toàn bộ vì hash chạy nhanh, tạo nên chuỗi giả - hash theo một tiêu chuẩn khác, để kết quả phù hợp thì hash mới được
  mine(difficulty) {
  //mine() {  
    //bắt đầu hash từ 4 số 0, nếu không bắt đầu bằng 4 số 0 sẽ tiếp tục hash
    //while (!this.hash.startsWith('0000')) {

    //thay thế 4 số 0 thành difficulty
    while (!this.hash.startsWith('0'.repeat(difficulty))) {
      this.mineVar++; //mỗi lần hash không đúng sẽ mineVar sẽ tăng ( vì đặc điểm hash đầu vào đầu ra ko đổi) 
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor(difficulty) {
  //constructor() {
    //block đầu tiên    
    const genesisBlock = new Block('0000', { isGenesis: true })

    this.difficulty = difficulty;
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

    console.log('start mining')
    console.time('mine')
    //newBlock.mine();
    newBlock.mine(this.difficulty);//đào block trước khi đưa vào chuỗi
    console.timeEnd('mine')
    console.log('end mining', newBlock)

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

const duongChain = new Blockchain(5);   //số trong ngoặc là difficulty - tương đương bao nhiêu số 0
console.log(duongChain);

duongChain.addBlock({ from: 'duong', to: 'duyen', amount: 100 })
duongChain.addBlock({ from: 'duong', to: 'tram', amount: 500 })
duongChain.addBlock({ filmAnime: 'Hentaiz.net' })

console.log(duongChain.chain);
console.log('chainvalid: ', duongChain.isValid())