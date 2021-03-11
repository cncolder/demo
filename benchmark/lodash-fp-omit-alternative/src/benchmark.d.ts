import Benchmark from 'benchmark';

export default Benchmark;

declare global {
    interface Window {
        Benchmark: Benchmark;
    }
}
