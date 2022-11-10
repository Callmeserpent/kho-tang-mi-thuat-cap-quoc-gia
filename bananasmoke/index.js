const hash = require('crypto-js/sha256');

class Block {
  constructor(prevHash, transactions) {
    this.prevHash = prevHash;
    this.transactions = transactions;
    this.timeStamp = new Date();

    this.hash = this.calculateHash();
    this.mineVar = 0;
  }

  //xuất ra hash của block hiện tại
  calculateHash() {
    return hash(this.prevHash + JSON.stringify(this.transactions) + this.timeStamp + this.mineVar).toString();
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
    const genesisBlock = new Block('0000', { isGenesis: true }) //*

    this.difficulty = difficulty;

    this.miningReward = 100        //add reward for miners - need virtual money for coins - this introduce new coin into system
    this.pendingTransactions = [];   //all the transactions undone will be pending untill 1 transaction finished

    this.chain = [genesisBlock];
  }

  //nhận block cuối cùng
  getLastBLock() {
    return this.chain[this.chain.length - 1];
  }

  //tạo block mới từ hash của block cuối cùng  
  minePendingTransactions(miningRewardAddress) {
    const lastBlock = this.getLastBLock();
    const block = new Block(lastBlock.hash, Date.now(), this.pendingTransactions); //thực tế miners phải chọn transaction vì pending ko vượt quá 1MB

    console.log('Start mining...')
    console.time('Mining time taken:')
    //block.mine();
    block.mine(this.difficulty);//đào block trước khi đưa vào chuỗi
    console.timeEnd('Mining time taken:')
    console.log('End mining!', block)

    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  //đẩy transaction đang pending lên 
  createTransactions(transactions) {
    this.pendingTransactions.push(transactions);
  }

  //lấy balance của địa chỉ, được stored trên blockchain
  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
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

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.from = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

const duongChain = new Blockchain(4);   //số trong ngoặc là difficulty - tương đương bao nhiêu số 0

//create transactions
duongChain.createTransactions(new Transaction('publickey1', 'publickey2', 100));
duongChain.createTransactions(new Transaction('publickey2', 'publickey1', 50));

//mining the pending transactions
duongChain.minePendingTransactions('duong-publickey')

console.log('Balance of duong is: ', duongChain.getBalanceOfAddress('duong-publickkey'));

//mining the pending transactions again
duongChain.minePendingTransactions('duong-publickey')

console.log('Balance of duong is: ', duongChain.getBalanceOfAddress('duong-publickkey'));

console.log(duongChain.chain);
console.log('chainvalid: ', duongChain.isValid());  