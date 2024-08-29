class QueueNode<T> {
    private _value: T;
    private _next: QueueNode<T> | null;
    
    public constructor(value: T) {
        this._value = value;
        this._next = null;
    }
    
    public get value() {
        return this._value;
    }
    
    public get next(): QueueNode<T> | null {
        return this._next;
    }
    
    public set next(node: QueueNode<T>) {
        this._next = node;
    }
}

export class Queue<T> {
    private _head: QueueNode<T> | null;
    private _tail: QueueNode<T> | null;
    private _size: number;

    public constructor() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    public get size() {
        return this._size;
    }

    public get front() {
        return this._head?.value;
    }

    public get back() {
        return this._tail?.value;
    }

    public push(...values: T[]) {
        for (const value of values) {
            const node = new QueueNode(value);
            if (this._tail) {
                this._tail.next = node;
            }
            this._tail = node;
            if (!this._head) {
                this._head = node;
            }
            this._size++;
        }
    }

    public pop() {
        if (!this._head) return;
        const value = this._head.value;
        this._head = this._head.next;
        if (!this._head) {
            this._tail = null;
        }
        this._size--;
        return value;
    }


    public *[Symbol.iterator]() {
        let current = this._head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}