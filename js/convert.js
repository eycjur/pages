export function markdown2xml(input) {
    let output = input;
    output = output.replace(/^(\#{1,3})(?= )/mg, function () {
        return arguments[0].replace(/\#/g, '<h>');
    });
    output = output.replace(/^((?: {4})*)[\*\-](?= )/mg, function () {
        let spaceNum = Math.floor(arguments[1].length / 4);
        return arguments[1] + "<ul>".repeat(spaceNum + 1);
    });
    output = output.replace(/^((?: {4})*)([0-9]\.)(?= )/mg, function () {
        let spaceNum = Math.floor(arguments[1].length / 4);
        return arguments[1] + "<ol>".repeat(spaceNum + 1);
    });
    output = output.replace(/!\[(.*?)\]\((.*?)\)/gs, function () {
        return '<picture_start>' + arguments[2] + '<picture_end>';
    });
    output = output.replace(/\[(.*?)\]\((.*?)\)/mg, function () {
        return '<link_start>' + arguments[1] + '<link_middle>' + arguments[2] + '<link_end>';
    });
    output = output.replace(/`{3}(.*?)(\n.*?)`{3}/gs, function () {
        if (arguments[1] == "") {
            return "<codeblock_start>" + arguments[2] + "<codeblock_end>";
        }
        return '<codeblock_start><code class="' + arguments[1] + '">' + arguments[2] + "</code><codeblock_end>";
    });
    output = output.replace(/^>(?= )/mg, "<quote> ");
    output = output.replace(/(?<= )`(.*?)`(?= )/g, function () {
        return "<code_start>" + arguments[1] + "<code_end>";
    });
    output = output.replace(/(?<= )\*\*(.*?)\*\*(?= )/g, function () {
        return '<bold_start>' + arguments[1] + "<bold_end>";
    });
    output = output.replace(/(?<= )\*(.*?)\*(?= )/mg, function () {
        return "<italic_start>" + arguments[1] + "<italic_end>";
    });
    output = output.replace(/(?<= )~~(.*?)~~(?= )/g, function () {
        return '<strikethrough_start>' + arguments[1] + "<strikethrough_end>";
    });
    console.log(output);
    return output;
}
;
export function xml2textile(input) {
    let output = input;
    output = output.replace(/^((<h>){1,4})(?= )/mg, function () {
        return 'h' + (arguments[1].split('<h>').length - 1) + '.';
    });
    output = output.replace(/<ul>/g, '*');
    output = output.replace(/<ol>/g, '#');
    output = output.replace(/<picture_start>/g, '!');
    output = output.replace(/<picture_end>/g, '!');
    output = output.replace(/<link_start>/g, '"');
    output = output.replace(/<link_middle>/g, '":');
    output = output.replace(/<link_end>/g, '');
    output = output.replace(/<codeblock_start>/g, "<pre>");
    output = output.replace(/<codeblock_end>/g, "</pre>");
    output = output.replace(/<quote>/mg, "bq.");
    output = output.replace(/<code_start>/g, "@");
    output = output.replace(/<code_end>/g, "@");
    output = output.replace(/<bold_start>/g, '*');
    output = output.replace(/<bold_end>/g, '*');
    output = output.replace(/<italic_start>/g, "_");
    output = output.replace(/<italic_end>/g, "_");
    output = output.replace(/<strikethrough_start>/g, "-");
    output = output.replace(/<strikethrough_end>/g, "-");
    return output;
}
;
export function xml2TextileForNotion(input) {
    let output = input;
    output = output.replace(/(\n( *)[^<\n]+?)\n(?=\n( *)[^ <])/gs, function () {
        console.log(arguments);
        if (arguments[2].length > arguments[3].length) {
            return arguments[1] + "\n";
        }
        console.log(arguments[0], "hoge", arguments[1], "hoge", arguments[2]);
        return arguments[1];
    });
    output = output.replace(/\n\n<ul><ul>/mg, "\n<ul><ul>");
    output = output.replace(/\n\n<ol><ol>/mg, "\n<ol><ol>");
    output = output.replace(/\n\n +?(?=[^< ])/, function () {
        return arguments[0].replace("\n\n", "\n");
    });
    output = xml2textile(output);
    output = output.replace(/\n *\n(?= )/g, "\n");
    output = output.replace(/^ */mg, "");
    return output;
}
//# sourceMappingURL=convert.js.map