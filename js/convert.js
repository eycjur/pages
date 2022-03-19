export function markdown2xml(input) {
    let output = input;
    output = output.replace(/^(#{1,3})(?= )/gm, function (...args) {
        return args[0].replace(/#/g, "<h>");
    });
    output = output.replace(/^((?: {4})*)[*-](?= )/gm, function (...args) {
        const spaceNum = Math.floor(args[1].length / 4);
        return args[1] + "<ul>".repeat(spaceNum + 1);
    });
    output = output.replace(/^((?: {4})*)([0-9]\.)(?= )/gm, function (...args) {
        const spaceNum = Math.floor(args[1].length / 4);
        return args[1] + "<ol>".repeat(spaceNum + 1);
    });
    output = output.replace(/!\[(.*?)\]\((.*?)\)/gs, function (...args) {
        return "<picture_start>" + args[2] + "<picture_end>";
    });
    output = output.replace(/\[(.*?)\]\((.*?)\)/gm, function (...args) {
        return "<link_start>" + args[1] + "<link_middle>" + args[2] + "<link_end>";
    });
    output = output.replace(/`{3}(.*?)(\n.*?)`{3}/gs, function (...args) {
        if (args[1] == "") {
            return "<codeblock_start>" + args[2] + "<codeblock_end>";
        }
        return ('<codeblock_start><code class="' +
            args[1] +
            '">' +
            args[2] +
            "</code><codeblock_end>");
    });
    output = output.replace(/^>(?= )/gm, "<quote>");
    output = output.replace(/(?<=^| )`(.*?)`(?=$| )/gm, function (...args) {
        return "<code_start>" + args[1] + "<code_end>";
    });
    output = output.replace(/(?<=^| )\*\*(.*?)\*\*(?=$| )/gm, function (...args) {
        return "<bold_start>" + args[1] + "<bold_end>";
    });
    output = output.replace(/(?<=^| )\*(.*?)\*(?=$| )/gm, function (...args) {
        return "<italic_start>" + args[1] + "<italic_end>";
    });
    output = output.replace(/(?<=^| )~~(.*?)~~(?=$| )/gm, function (...args) {
        return "<strikethrough_start>" + args[1] + "<strikethrough_end>";
    });
    return output;
}
export function xml2textile(input) {
    let output = input;
    output = output.replace(/^((<h>){1,4})(?= )/gm, function (...args) {
        return "h" + (args[1].split("<h>").length - 1) + ".";
    });
    output = output.replace(/<ul>/g, "*");
    output = output.replace(/<ol>/g, "#");
    output = output.replace(/<picture_start>/g, "!");
    output = output.replace(/<picture_end>/g, "!");
    output = output.replace(/<link_start>/g, '"');
    output = output.replace(/<link_middle>/g, '":');
    output = output.replace(/<link_end>/g, "");
    output = output.replace(/<codeblock_start>/g, "<pre>");
    output = output.replace(/<codeblock_end>/g, "</pre>");
    output = output.replace(/<quote>/gm, "bq.");
    output = output.replace(/<code_start>/g, "@");
    output = output.replace(/<code_end>/g, "@");
    output = output.replace(/<bold_start>/g, "*");
    output = output.replace(/<bold_end>/g, "*");
    output = output.replace(/<italic_start>/g, "_");
    output = output.replace(/<italic_end>/g, "_");
    output = output.replace(/<strikethrough_start>/g, "-");
    output = output.replace(/<strikethrough_end>/g, "-");
    output = output.replace(/^ */gm, "");
    return output;
}
export function xmlCareForNotion(input) {
    let output = input;
    output = output.replace(/(\n( *)[^<\n]+?)\n(?=\n( *)[^ <])/gs, function (...args) {
        if (args[2].length > args[3].length) {
            return args[1] + "\n";
        }
        return args[1];
    });
    output = output.replace(/\n\n<ul><ul>/gm, "\n<ul><ul>");
    output = output.replace(/\n\n<ol><ol>/gm, "\n<ol><ol>");
    output = output.replace(/\n\n +?(?=[^< ])/, function (...args) {
        return args[0].replace("\n\n", "\n");
    });
    output = output.replace(/\n *\n(?= )/g, "\n");
    return output;
}
//# sourceMappingURL=convert.js.map