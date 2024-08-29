class QueueNode {
    _value;
    _next;
    constructor(value) {
        this._value = value;
        this._next = null;
    }
    get value() {
        return this._value;
    }
    get next() {
        return this._next;
    }
    set next(node) {
        this._next = node;
    }
}
export class Queue {
    _head;
    _tail;
    _size;
    constructor() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }
    get size() {
        return this._size;
    }
    get front() {
        return this._head?.value;
    }
    get back() {
        return this._tail?.value;
    }
    push(...values) {
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
    pop() {
        if (!this._head)
            return;
        const value = this._head.value;
        this._head = this._head.next;
        if (!this._head) {
            this._tail = null;
        }
        this._size--;
        return value;
    }
    *[Symbol.iterator]() {
        let current = this._head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}
