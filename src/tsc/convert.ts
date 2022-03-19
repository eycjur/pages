export function markdown2xml(input: string): string {
  let output: string = input;

  // Headline
  // # h1
  // ## h2
  // ### h3
  output = output.replace(/^(#{1,3})(?= )/gm, function (...args) {
    return args[0].replace(/#/g, "<h>");
  });

  // list
  // - list
  //     - list
  // * list
  output = output.replace(/^((?: {4})*)[*-](?= )/gm, function (...args) {
    // (?:)は後方参照なし
    // 空白の数だけ<ul>を挿入
    const spaceNum: number = Math.floor(args[1].length / 4);
    return args[1] + "<ul>".repeat(spaceNum + 1);
  });
  // 1. list
  //     1. list
  output = output.replace(/^((?: {4})*)([0-9]\.)(?= )/gm, function (...args) {
    const spaceNum: number = Math.floor(args[1].length / 4);
    return args[1] + "<ol>".repeat(spaceNum + 1);
  });

  // picture
  // ![alt](url)
  output = output.replace(/!\[(.*?)\]\((.*?)\)/gs, function (...args) {
    return "<picture_start>" + args[2] + "<picture_end>";
  });

  // link
  // [link](url)
  output = output.replace(/\[(.*?)\]\((.*?)\)/gm, function (...args) {
    return "<link_start>" + args[1] + "<link_middle>" + args[2] + "<link_end>";
  });

  // codeblock
  // ```lang
  // code
  // ```
  output = output.replace(/`{3}(.*?)(\n.*?)`{3}/gs, function (...args) {
    if (args[1] == "") {
      return "<codeblock_start>" + args[2] + "<codeblock_end>";
    }
    return (
      '<codeblock_start><code class="' +
      args[1] +
      '">' +
      args[2] +
      "</code><codeblock_end>"
    );
  });

  // quote
  // > quote
  output = output.replace(/^>(?= )/gm, "<quote>");

  // code
  // `code`
  output = output.replace(/(?<=^| )`(.*?)`(?=$| )/gm, function (...args) {
    return "<code_start>" + args[1] + "<code_end>";
  });

  // bold
  // **bold**
  output = output.replace(/(?<=^| )\*\*(.*?)\*\*(?=$| )/gm, function (...args) {
    return "<bold_start>" + args[1] + "<bold_end>";
  });

  // italic
  // *italic*
  output = output.replace(/(?<=^| )\*(.*?)\*(?=$| )/gm, function (...args) {
    return "<italic_start>" + args[1] + "<italic_end>";
  });

  // strikethrough
  // ~~strikethrough~~
  output = output.replace(/(?<=^| )~~(.*?)~~(?=$| )/gm, function (...args) {
    return "<strikethrough_start>" + args[1] + "<strikethrough_end>";
  });

  return output;
}

export function xml2textile(input: string): string {
  let output: string = input;

  // Headline
  // HACK: ヘッダー行の後に改行が必要だが、notionとの都合上改行を入れていない
  output = output.replace(/^((<h>){1,4})(?= )/gm, function (...args) {
    return "h" + (args[1].split("<h>").length - 1) + ".";
  });

  // list
  output = output.replace(/<ul>/g, "*");
  output = output.replace(/<ol>/g, "#");

  // picture
  output = output.replace(/<picture_start>/g, "!");
  output = output.replace(/<picture_end>/g, "!");

  // link
  output = output.replace(/<link_start>/g, '"');
  output = output.replace(/<link_middle>/g, '":');
  output = output.replace(/<link_end>/g, "");

  // codeblock
  output = output.replace(/<codeblock_start>/g, "<pre>");
  output = output.replace(/<codeblock_end>/g, "</pre>");

  // quote
  output = output.replace(/<quote>/gm, "bq.");

  // code
  output = output.replace(/<code_start>/g, "@");
  output = output.replace(/<code_end>/g, "@");

  // bold
  output = output.replace(/<bold_start>/g, "*");
  output = output.replace(/<bold_end>/g, "*");

  // italic
  output = output.replace(/<italic_start>/g, "_");
  output = output.replace(/<italic_end>/g, "_");

  // strikethrough
  output = output.replace(/<strikethrough_start>/g, "-");
  output = output.replace(/<strikethrough_end>/g, "-");

  // delete indent
  //     (インデント)
  output = output.replace(/^ */gm, "");

  return output;
}

export function xmlCareForNotion(input: string): string {
  let output: string = input;

  // 文字行の後の改行を削除
  // (
  // テキスト)
  // (
  // テキスト)
  output = output.replace(
    /(\n( *)[^<\n]+?)\n(?=\n( *)[^ <])/gs,
    function (...args) {
      if (args[2].length > args[3].length) {
        return args[1] + "\n";
      }
      return args[1];
    }
  );

  // リスト前の改行
  // (なんか文字があっても良い)
  //
  // <ul><ul>
  output = output.replace(/\n\n<ul><ul>/gm, "\n<ul><ul>");
  output = output.replace(/\n\n<ol><ol>/gm, "\n<ol><ol>");

  // リストの中の文字をリストに入れる（前の改行を削除）
  //
  //
  //     文字列
  output = output.replace(/\n\n +?(?=[^< ])/, function (...args) {
    return args[0].replace("\n\n", "\n");
  });

  // delete \n before indent
  //
  //
  //     *
  output = output.replace(/\n *\n(?= )/g, "\n");

  return output;
}
