module.exports.random = (len) => {
  const random = Math.floor(Math.random() * len);
  return `${random}${Date.now()}`;
};

//chooses random characters to the length specified in the call
module.exports.getUniqueID = (len) => {
  let uniqueID = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz";
  let charsLength = chars.length;

  for (let i = 0; i < len; i++) {
    uniqueID += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return (uniqueID += Date.now());
};
