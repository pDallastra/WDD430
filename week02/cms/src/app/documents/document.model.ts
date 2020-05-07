export class Document {
    public id: number;
    public name: string;
    public description: string;
    public url: string;
    public children = [];
    constructor(id: number, name: string, description: string,
        url: string, children: []) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.children = children;
    }
}