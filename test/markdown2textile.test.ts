import { markdown2xml, xml2textile, xmlCareForNotion } from "../src/tsc/convert";

test("headline", () => {
  let headlineMd: string = `
# h1
## h2
### h3
`
  let headlineTextile: string = `
h1. h1
h2. h2
h3. h3
`
  expect(xml2textile(markdown2xml(headlineMd))).toBe(headlineTextile);
});

test("list", () => {
  let listMd: string = `
- list
    - list
        - list
* list
    * list
        * list
1. list
1. list
    1. list
        1. list
`
  let listTextile: string = `
* list
** list
*** list
* list
** list
*** list
# list
# list
## list
### list
`
  expect(xml2textile(markdown2xml(listMd))).toBe(listTextile);
});

test("picture", () => {
  let pictureMd: string = `
![alt](url)
`
  let pictureTextile: string = `
!url!
`
  expect(xml2textile(markdown2xml(pictureMd))).toBe(pictureTextile);
});

test("link", () => {
  let linkMd: string = `
[link](url)
`
  let linkTextile: string = `
"link":url
`
  expect(xml2textile(markdown2xml(linkMd))).toBe(linkTextile);
});

test("codeblock", () => {
  let codeblockMd: string = `
\`\`\`lang
code
\`\`\`
\`\`\`
code
\`\`\`
`
  let codeblockTextile: string = `
<pre><code class="lang">
code
</code></pre>
<pre>
code
</pre>
`
  expect(xml2textile(markdown2xml(codeblockMd))).toBe(codeblockTextile);
});

test("quote", () => {
  let quoteMd: string = `
> quote
`
  let quoteTextile: string = `
bq. quote
`
  expect(xml2textile(markdown2xml(quoteMd))).toBe(quoteTextile);
});

test("code", () => {
  let codeMd: string = `
\`code\`
`
  let codeTextile: string = `
@code@
`
  expect(xml2textile(markdown2xml(codeMd))).toBe(codeTextile);
});

test("bold", () => {
  let boldMd: string = `
**bold**
`
  let boldTextile: string = `
*bold*
`
  expect(xml2textile(markdown2xml(boldMd))).toBe(boldTextile);
});

test("italic", () => {
  let italicMd: string = `
*italic*
`
  let italicTextile: string = `
_italic_
`
  expect(xml2textile(markdown2xml(italicMd))).toBe(italicTextile);
});

test("strikethrough", () => {
  let strikethroughMd: string = `
~~strikethrough~~
`
  let strikethroughTextile: string = `
-strikethrough-
`
  expect(xml2textile(markdown2xml(strikethroughMd))).toBe(strikethroughTextile);
});

test("notion", () => {
  let notionMd: string = `
## 見出し2

本文

- リスト1
    - リスト2

        リスト2の文章

    - リスト2
- リスト1

    ![google](https://www.google.com/images/branding/googlelogo/1x/googlelogo_dark_color_272x92dp.png)


[profile](https://github.com/settings/profile)

\`code\`

文中に \`コード\` を書く
`
  let notionTextile: string = `
h2. 見出し2

本文

* リスト1
** リスト2
リスト2の文章
** リスト2
* リスト1
!https://www.google.com/images/branding/googlelogo/1x/googlelogo_dark_color_272x92dp.png!


"profile":https://github.com/settings/profile

@code@

文中に @コード@ を書く
`
  expect(xml2textile(xmlCareForNotion(markdown2xml(notionMd)))).toBe(notionTextile);
});
