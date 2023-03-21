# query-terminal

> Query for terminfo capabilities using XTGETTCAP

## Usage

```js
import { queryTerminal } from "query-terminal";

const answer = await queryTerminal(`<some capability>`);
console.log(answer);
```

## Context

The [supports-hyperlink] issue about [Kitty support][kitty-support] led me to
[Kitty’s _Query terminal_ docs][kitty-docs] and [XTerm Control
Sequences][xterm-control-sequences]. I figured I would publish my script as a
module, lest I forget everything I learned about XTGETTCAP in Node.

[supports-hyperlink]: https://github.com/jamestalmage/supports-hyperlinks#readme
[kitty-support]: https://github.com/jamestalmage/supports-hyperlinks/issues/10
[kitty-docs]: https://sw.kovidgoyal.net/kitty/kittens/query_terminal/
[xterm-control-sequences]: https://invisible-island.net/xterm/ctlseqs/ctlseqs.html

## License

MIT © [Connor Sullivan](https://github.com/connorjs)
