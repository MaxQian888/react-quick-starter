import { cn } from './utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const result = cn('base', true && 'conditional', false && 'excluded');
    expect(result).toBe('base conditional');
  });

  it('handles undefined and null values', () => {
    const result = cn('base', undefined, null, 'valid');
    expect(result).toBe('base valid');
  });

  it('merges Tailwind classes correctly (removes duplicates)', () => {
    const result = cn('px-2 py-1', 'px-4');
    // tailwind-merge should keep only px-4 (the last one)
    expect(result).toBe('py-1 px-4');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles objects with boolean values', () => {
    const result = cn({
      'class1': true,
      'class2': false,
      'class3': true,
    });
    expect(result).toBe('class1 class3');
  });

  it('combines clsx and tailwind-merge functionality', () => {
    const result = cn(
      'px-2 py-1',
      { 'bg-red-500': true, 'bg-blue-500': false },
      'px-4'
    );
    expect(result).toBe('py-1 bg-red-500 px-4');
  });
});

