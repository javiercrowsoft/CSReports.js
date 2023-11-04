declare global {
    interface String {
        contains(value: string) : boolean;
        format(format: string): string;
    }
}

String.prototype.contains = function(value: string): boolean {
    let d = String(this);
    return(d.indexOf(value) > -1);
}

String.prototype.format = function(format: string): string {
    console.log('in String Prototype 1 : ' + format);
    return String(this);
}

// @ts-ignore
export {};
