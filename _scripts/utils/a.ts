const getByte = (char: string) => {
    const charCode = char.charCodeAt(0);
    if (charCode <= 0x7F) {
        return 1;
    } else if (charCode <= 0x7FF) {
        return 2;
    } else if (charCode <= 0xFFFF) {
        return 3;
    } else {
        return 4;
    }
}

export const sliceByBytes = (value: string, length: number): string[] => {
    let result = "";
    let byteLength = 0;
    const parts: string[] = [];

    for (const char of value) {
        const charByte = getByte(char);

        if (byteLength + charByte > length) {
            parts.push(result);
            result = "";
            byteLength = 0;
        }

        result += char;
        byteLength += charByte;
    }

    if (result) {
        parts.push(result);
    }

    return parts;

}