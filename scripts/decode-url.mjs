#!/usr/bin/env node
/**
 * Decodes the original image URL from a Brave image-proxy thumbnail URL.
 * Usage: node decode-url.mjs "https://imgs.search.brave.com/<key>/rs:fit:500:0:1:0/g:ce/<base64-chunks>"
 */
const input = process.argv[2];
if (!input) {
  console.error("pass a thumbnail url");
  process.exit(1);
}
const m = input.match(/\/g:ce\/(.+)$/);
if (!m) {
  console.error("no g:ce segment found");
  process.exit(1);
}
const b64 = m[1].split("/").join("");
try {
  console.log(Buffer.from(b64, "base64").toString("utf8"));
} catch {
  console.error("decode failed");
  process.exit(1);
}
