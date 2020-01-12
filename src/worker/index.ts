export const calculatePrimes = (iterations: number, multiplier: number) => {
  let primes = [];
  for (let i = 0; i < iterations; i++) {
    let candidate = i * (multiplier * Math.random());
    let isPrime = true;

    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(candidate);
    }
  }

  return Promise.resolve(primes);
};

export const dump = (arg: any) => {
  console.log(arg);
  return Promise.resolve(3);
};
