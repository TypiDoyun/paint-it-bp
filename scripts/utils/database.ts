import { world } from "@minecraft/server"

export namespace Database {
    const IDENTIFIER = "typi-database";
    const MAX_LENGTH = 32_767;

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

    export const write = (id: string, value: string) => {

        const parts = sliceByBytes(value, MAX_LENGTH);

        for (let i = 0; i <= parts.length; i++) {
            world.setDynamicProperty(`${IDENTIFIER}:${id}-${i}`, parts[i]);
        }
    }
    
    export const read = (id: string) => {
        let result = "";
        let index = 0;

        while (true) {
            const part = world.getDynamicProperty(`${IDENTIFIER}:${id}-${index}`);

            if (part === undefined || typeof part !== "string") {
                if (index === 0) return;
                break;
            }
            
            result += part;
            index += 1;
        }

        return result;
    }

    export const writeJSON = (id: string, json: any): boolean => {
        try {
            const value = JSON.stringify(json);

            write(id, value);

            return true;
        } catch (error) {
            return false;
        }
    }

    export const readJSON = <T>(id: string): T | undefined => {
        const rawData = read(id);
        
        if (!rawData) return;

        try {
            const json = JSON.parse(rawData);

            return json;
        } catch (error) {
            return;
        }
    }

    export const remove = (id: string) => {
        let index = 0;

        while (true) {
            const propertyId = `${IDENTIFIER}:${id}-${index}`;
            const part = world.getDynamicProperty(propertyId);

            if (part === undefined || typeof part !== "string") break;
            
            world.setDynamicProperty(propertyId);
            index += 1;
        }
    }

    export const getIds = (): string[] => {
        return world.getDynamicPropertyIds()
            .filter(id => id.startsWith(`${IDENTIFIER}:`));
    }
}
