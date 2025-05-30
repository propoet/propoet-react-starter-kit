import useCounterStore from '@/store/useCounterStore'

export default function Store() {
    const {count,increment,decrement} = useCounterStore()
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}