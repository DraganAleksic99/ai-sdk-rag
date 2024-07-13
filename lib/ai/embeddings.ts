const generateChunks = (text: string): Array<string> => {
    return text
        .trim()
        .split(".")
        .filter(chunk => chunk !== "");
}