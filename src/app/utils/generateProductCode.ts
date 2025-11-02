import crypto from "crypto";
export const generateProductCode = (name: string) => {
  // Extract the longest strictly increasing substring (consecutive letters in alphabetical order and lowercase).
  const LName = name.toLowerCase().trim().replace(" ", "");
  let longestSubstr = "";
  let longestSubstrings = [];
  for (const char of LName) {
    const lastChar = longestSubstr[longestSubstr?.length - 1]?.charCodeAt(0);
    if (lastChar) {
      if (char.charCodeAt(0) > lastChar) {
        longestSubstr += char;
      } else {
        longestSubstrings.push(longestSubstr);
        longestSubstr = char;
      }
    } else {
      longestSubstr += char;
    }
  }
  if (longestSubstr) {
    longestSubstrings.push(longestSubstr);
  }
  const maxSubs = {};
  const sortedLongestSubstrings = longestSubstrings
    .sort((a, b) => b.length - a.length)
    .reduce(
      (prev, curr) => {
        if (curr.length >= prev?.max) {
          return {
            max: curr.length,
            item: [...prev?.item, curr],
          };
        } else {
          return prev;
        }
      },
      { max: 0, item: [] }
    );

  // If multiple substrings of equal length exist, concatenate them.
  longestSubstrings = sortedLongestSubstrings?.item?.join("");
  //Append the starting and ending index of the substring in the product name.
  const hash = crypto
    .createHash("md5")
    .update(longestSubstrings)
    .digest("hex")
    .slice(0, 7);

  const productCode = `${hash}-${0}${longestSubstrings}${LName.indexOf(
    longestSubstrings[longestSubstrings?.length - 1]
  )}`;

  return productCode;
};
