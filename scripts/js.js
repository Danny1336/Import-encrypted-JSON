function getJSON() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://test1.web-gu.ru/",
            method: "GET",
            dataType: "json",
            success(response) {
                resolve(response);
            },
            error(response) {
                reject(new Error("Данные не получены"));
            }
        });
    });
}
$(async function main() {
    let json = await getJSON();
    let nodes = json.filter(e => e.parent_id === -1);
    for (let node of nodes) {
        createUL($("#basic")[0], node.id, node.name);
        let items = json.filter(e => e.parent_id === node.id);
        for (let item of items) {
            createUL($("[date-id=" + node.id + "]")[0], item.id, item.name);
            let subitems = json.filter(e => e.parent_id === item.id);
            for (let subitem of subitems)
                createLI($("[date-id=" + item.id + "]")[0], subitem.id, subitem.name);
        }
    }
});
function createUL(parent, id, txt) {
    parent.insertAdjacentHTML("beforeend", `<span>${txt}</span><ul date-id="${id}"></ul>`);
}
function createLI(parent, id, txt) {
    parent.insertAdjacentHTML("beforeend", `<li date-id="${id}">${txt}</li>`);
}