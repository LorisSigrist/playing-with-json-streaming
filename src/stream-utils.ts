export function MapStream<I, O>(map: (arg: I) => O): TransformStream<I, O> {
    return new TransformStream({
        transform(chunk, controller) {
            try {
                const mapped = map(chunk);
                controller.enqueue(mapped);
            } catch (e) {
                console.error(e);
            }
        }
    });
}

export function FilterStream<I>(filter: (arg: I) => boolean): TransformStream<I, I> {
    return new TransformStream({
        transform(chunk, controller) {
            if (filter(chunk)) controller.enqueue(chunk);
        }
    });
}

export async function* asIterator<T>(stream: ReadableStream<T>) : AsyncGenerator<T> {
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield value;
    }
}


export function ReduceStream<I, Acc>(reducer: (acc: Acc, chunk : I) => Acc, initial: Acc) : TransformStream<I, Acc> {
    let acc = initial;
    return new TransformStream({
        transform(chunk, controller) {
            acc = reducer(acc, chunk);
            controller.enqueue(acc);
        }
    });
}
