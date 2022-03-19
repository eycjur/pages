export function markdown2xml(input: string): string {
  let output: string = input;

  // Headline
  // # h1
  // ## h2
  // ### h3
  output = output.replace(/^(\#{1,3})(?= )/mg, function () {
    return arguments[0].replace(/\#/g, '<h>');
  });

  // list
  // - list
  //     - list
  // * list
  output = output.replace(/^((?: {4})*)[\*\-](?= )/mg, function () {  // (?:)は後方参照なし
    // 空白の数だけ<ul>を挿入
    let spaceNum: number = Math.floor(arguments[1].length / 4);
    return arguments[1] + "<ul>".repeat(spaceNum + 1);
  });
  // 1. list
  //     1. list
  output = output.replace(/^((?: {4})*)([0-9]\.)(?= )/mg, function () {
    let spaceNum: number = Math.floor(arguments[1].length / 4);
    return arguments[1] + "<ol>".repeat(spaceNum + 1);
  });

  // picture
  // ![alt](url)
  output = output.replace(/!\[(.*?)\]\((.*?)\)/gs, function () {
    return '<picture_start>' + arguments[2] + '<picture_end>';
  });

  // link
  // [link](url)
  output = output.replace(/\[(.*?)\]\((.*?)\)/mg, function () {
    return '<link_start>' + arguments[1] + '<link_middle>' + arguments[2] + '<link_end>';
  });

  // codeblock
  // ```lang
  // code
  // ```
  output = output.replace(/`{3}(.*?)(\n.*?)`{3}/gs, function () {
    if (arguments[1] == "") {
      return "<codeblock_start>" + arguments[2] + "<codeblock_end>";
    }
    return '<codeblock_start><code class="' + arguments[1] + '">' + arguments[2] + "</code><codeblock_end>";
  });

  // quote
  // > quote
  output = output.replace(/^>(?= )/mg, "<quote> ");

  // code
  // `code`
  output = output.replace(/(?<= )`(.*?)`(?= )/g, function () {
    return "<code_start>" + arguments[1] + "<code_end>";
  });

  // bold
  // **bold**
  output = output.replace(/(?<= )\*\*(.*?)\*\*(?= )/g, function () {
    return '<bold_start>' + arguments[1] + "<bold_end>";
  });

  // italic
  // *italic*
  output = output.replace(/(?<= )\*(.*?)\*(?= )/mg, function () {
    return "<italic_start>" + arguments[1] + "<italic_end>";
  });

  // strikethrough
  // ~~strikethrough~~
  output = output.replace(/(?<= )~~(.*?)~~(?= )/g, function () {
    return '<strikethrough_start>' + arguments[1] + "<strikethrough_end>";
  });

  console.log(output);
  return output;
};

export function xml2textile(input: string): string {
  let output: string = input;

  // Headline
  output = output.replace(/^((<h>){1,4})(?= )/mg, function () {
    return 'h' + (arguments[1].split('<h>').length - 1) + '.'
  });

  // list
  output = output.replace(/<ul>/g, '*');
  output = output.replace(/<ol>/g, '#');

  // picture
  output = output.replace(/<picture_start>/g, '!');
  output = output.replace(/<picture_end>/g, '!');

  // link
  output = output.replace(/<link_start>/g, '"');
  output = output.replace(/<link_middle>/g, '":');
  output = output.replace(/<link_end>/g, '');

  // codeblock
  output = output.replace(/<codeblock_start>/g, "<pre>");
  output = output.replace(/<codeblock_end>/g, "</pre>");

  // quote
  output = output.replace(/<quote>/mg, "bq.");

  // code
  output = output.replace(/<code_start>/g, "@");
  output = output.replace(/<code_end>/g, "@");

  // bold
  output = output.replace(/<bold_start>/g, '*');
  output = output.replace(/<bold_end>/g, '*');

  // italic
  output = output.replace(/<italic_start>/g, "_");
  output = output.replace(/<italic_end>/g, "_");

  // strikethrough
  output = output.replace(/<strikethrough_start>/g, "-");
  output = output.replace(/<strikethrough_end>/g, "-");

  return output;
};

export function xml2TextileForNotion(input: string): string {
  let output: string = input;

  // 文字行の後の改行を削除
  // (
  // テキスト)
  // (
  // テキスト)
  output = output.replace(/(\n( *)[^<\n]+?)\n(?=\n( *)[^ <])/gs, function () {
    console.log(arguments);
    if (arguments[2].length > arguments[3].length) {
      return arguments[1] + "\n";
    }
    console.log(arguments[0], "hoge", arguments[1], "hoge", arguments[2]);
    return arguments[1];
  })

  // リスト前の改行
  // (なんか文字があっても良い)
  //
  // <ul><ul>
  output = output.replace(/\n\n<ul><ul>/mg, "\n<ul><ul>");
  output = output.replace(/\n\n<ol><ol>/mg, "\n<ol><ol>");

  // リストの中の文字をリストに入れる（前の改行を削除）
  //
  //
  //     文字列
  output = output.replace(/\n\n +?(?=[^< ])/, function () {
    return arguments[0].replace("\n\n", "\n");
  })

  output = xml2textile(output);

  // delete \n before indent
  //
  //
  //     *
  output = output.replace(/\n *\n(?= )/g, "\n");

  // delete indent
  //     (インデント)
  output = output.replace(/^ */mg, "");

  return output
}
