const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const HASHING_ALGORITHM = "sha3-512";

/*
Returns correct Hash output based on MAX PARTITION KEY LENGTH
*/
exports.deterministicPartitionKey = (event) => {
  let candidate;
  let data;

  // return default Trivial key in case of no input
  if(!event){
    return TRIVIAL_PARTITION_KEY;
  }

  // If input has 'partitionKey' then use that as hashing data
  if(typeof event.partitionKey === "object"){
    data = JSON.stringify(event.partitionKey);

    // Return 'partitionKey' object if it's less than MAX KEY LENGTH or return hashed
    if(data.length <= MAX_PARTITION_KEY_LENGTH){
      return data;
    }
    else{
      return crypto.createHash(HASHING_ALGORITHM).update(data).digest("hex");
    }
  }
  else{
    data = JSON.stringify(event);
  }

  // Convert input into hash
  candidate = crypto.createHash(HASHING_ALGORITHM).update(data).digest("hex");

  return candidate;
};