const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");
const HASHING_ALGORITHM = "sha3-512";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns '0' when given 'undefined'", ()=>{
    const trivialKey = deterministicPartitionKey(undefined);
    expect(trivialKey).toBe("0");
  });

  it("Returns correct hash for input as 'String'", ()=>{
    const input = 123;
    const output =  deterministicPartitionKey(input);
    const excepted = crypto.createHash(HASHING_ALGORITHM).update(JSON.stringify(input)).digest("hex");
    expect(output).toBe(excepted);
  });

  it("Returns partitionKey object value for less than MAX key", ()=>{
    const input = {partitionKey: {name: 'Yogen'}};
    const output =  deterministicPartitionKey(input);
    expect(output).toBe(JSON.stringify(input.partitionKey));
  });

  it("Returns correct hasing for input as object", ()=>{
    const input = {name: 'Yogen', gender: 'Male'};
    const output =  deterministicPartitionKey(input);
    const expected = crypto.createHash(HASHING_ALGORITHM).update(JSON.stringify(input)).digest("hex")
    expect(output).toBe(expected);
  });

  it("Returns correct hasing for long input than MAX KEY", ()=>{
    const input = {partitionKey:  {name: 'Yogen', 'meta': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}};
    const output =  deterministicPartitionKey(input);
    const expected = crypto.createHash(HASHING_ALGORITHM).update(JSON.stringify(input.partitionKey)).digest("hex")
    expect(output).toBe(expected);
  });

});
