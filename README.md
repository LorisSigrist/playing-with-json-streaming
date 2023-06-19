# Playing with JSON Streaming

I recently stumbled accross the `@streamparser/json-whatwg` library, and it looked like it would make my life a lot easier. This is just me playing around with it.

## Insights so far

- It's a lot easier to do than I thought it would be
- Once you have a MapStream & StreamtToAsyncIterator helper, the streaming-version of the code is not meaningfully longer than the non-streaming one.
- On fast internet, the benefits of streaming are negligable up to a few Hunderd objects of JSON. On slow internet the benefits are very noticeable, but you have to load an additional 25k of JS. That's not a lot, but depending on your usecase it might be too much.
- In Offline-First PWA's, where the code is already on the client, and we only need to download the data, it's a no-brainer. I'll be doing this a lot more.
- I wish I knew a small library with WHATWG Stream helpers, that would make stream composition a lot easier. There must exist one, I just haven't spent much time looking.


