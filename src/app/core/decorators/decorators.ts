import { Response } from 'express';
import { Request } from 'express';
import { validateEmail } from '../utils/utils';
export function Body(Type: new () => { [ket: string]: any }): any {
    class BType extends Type {
        [key: string]: unknown;
        constructor(data: { [key: string]: unknown }) {
            super();
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    this[key] = data[key]
                }
            }
        }
    }
    return function (...args: [object, string, { value: (...args: [Request, Response, () => unknown]) => void }]) {
        const [target, key, d] = (args);
        let func = d.value;
        d.value = function (...args: [Request, Response, () => unknown]) {
            const { body } = args[0]
            if (typeof body !== "object")
                throw new Error(`expected object in ${"req.body"} , instead got ${typeof body}`)
            const required = new Type().required || [];
            required.map((i: string) => {
                if (!Object.keys(body).includes(i))
                    throw new Error(`Property ${i} is required`)
            })
            let x = new BType(body)
            return func(...args);
        };


    }
}

export function isNumber() {
    return function (target: object, key: string) {
        let val: number;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: number) => {
                if (typeof value !== "number" && val !== undefined) {
                    throw new Error(`Property ${key} must be Numeric`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}
export function isRequired() {
    return function (target: { [key: string]: any }, key: string) {
        let req = target.required || []
        Object.defineProperty(target, 'required', {
            value: [...req, key],
            enumerable: false,
            configurable: true,
        })
    }
}
export function isString() {
    return function (target: { [key: string]: any }, key: string) {
        let val = "";
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: string) => {
                if (typeof value !== "string") {
                    throw new Error(`Property ${key} must be string`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}
export function isBoolean() {
    return function (target: { [key: string]: any }, key: string) {
        let val: boolean;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: boolean) => {
                if (typeof value !== "boolean" && val !== undefined) {
                    throw new Error(`Property ${key} must be boolean`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}

export function isObject() {
    return function (target: { [key: string]: any }, key: string) {
        let val = {};
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: object) => {
                if (typeof value !== "object") {
                    throw new Error(`Property ${key} must be object`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}
export function isArray() {
    return function (target: { [key: string]: any }, key: string) {
        let val: any[] = [];
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: any[]) => {
                if (!Array.isArray(target[key])) {
                    throw new Error(`Property ${key} must be array`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}


export function isEmail() {
    return function (target: { [key: string]: any }, key: string) {
        let val = "";
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: string) => {
                if (typeof target[key] !== "string")
                    throw new Error(`Property ${key} must be string`)
                if (!validateEmail(value)) {                    
                    throw new Error(`Property ${key} is not an email`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}

export function Union(...arr: any[]) {
    return function (target: { [key: string]: any }, key: string) {
        let val: unknown;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: unknown) => {
                if (!arr.includes(value))
                    throw new Error(`Property ${key} must be ${arr.join(" | ")}`)
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}

export function Custom(fn: (value) => any) {
    return function (target: { [key: string]: any }, key: string) {
        let val: unknown;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: unknown) => {
                if (!fn(value))
                    throw new Error(`${value} is not valid for property ${key}`)
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}
