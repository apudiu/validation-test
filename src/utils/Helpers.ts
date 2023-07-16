type ReduceUnits<Units extends string[]> = {
  readonly [Prop in keyof Units as Units[Prop] extends string ? Units[Prop] : never]: number;
};

export function formatFromBytes<Unit extends 'kilobyte' | 'megabyte', Units extends Unit[]>(
  bytes: number,
  get: [...Units],
  useDecimal = false,
): ReduceUnits<Units> {
  const marker = useDecimal ? 1000 : 1024; // One Kilobyte

  const decimal = 0;

  return get.reduce((acc, cv) => {
    switch (cv) {
      case 'kilobyte': {
        return {
          ...acc,
          [cv]: +(bytes / marker).toFixed(decimal),
        };
      }

      case 'megabyte': {
        const megaBytes = marker * marker; // One MB
        return {
          ...acc,
          [cv]: +(bytes / megaBytes).toFixed(decimal),
        };
      }

      default:
        return acc;
    }
  }, {} as ReduceUnits<Units>);
}

export function formatToBytes(
  input: number,
  inputType: 'kilobyte' | 'megabyte',
  useDecimal = false,
): number {
  const marker = useDecimal ? 1000 : 1024;
  const decimal = 0;

  const kiloBytes = marker; // One Kilobyte
  const megaBytes = marker * marker; // One MB is 1024 KB

  let bytes = 0;

  switch (inputType) {
    case 'kilobyte':
      bytes = +(input * kiloBytes).toFixed(decimal);
      break;

    case 'megabyte':
      bytes = +(input * megaBytes).toFixed(decimal);
      break;
  }

  return bytes;
}

type ReduceCapitalize<TInput extends string[]> = {
  [Prop in keyof TInput]: Capitalize<TInput[Prop]>;
};

export function capitalize<TInput extends string>(input: TInput): Capitalize<TInput>;
export function capitalize<TInput extends string[]>(input: TInput): ReduceCapitalize<TInput>;
export function capitalize(input: string | string[]): any {
  function doCapitalize<Str extends string>(str: Str): Capitalize<Str>;
  function doCapitalize(str: string) {
    const capital = str.charAt(0).toUpperCase();
    return `${capital}${str.slice(1)}`;
  }

  if (typeof input == 'string') {
    return doCapitalize(input);
  }

  return input.map((s) => doCapitalize(s));
}
