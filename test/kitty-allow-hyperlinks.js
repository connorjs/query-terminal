import { queryTerminal } from "query-terminal";

// Query for hyperlink specifically
// https://sw.kovidgoyal.net/kitty/kittens/query_terminal/
// https://github.com/kovidgoyal/kitty/blob/master/kittens/query_terminal/main.py
const answer = await queryTerminal(`kitty-query-allow_hyperlinks`);
console.log(answer);
