import { toPattern } from 'vanilla-masker';

export function validatePhone(value: string | undefined) {
  if (!value) return true;

  const valueWithouMask = toPattern(value, '99999999999');

  const pattern = new RegExp(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  );

  return !!pattern.test(valueWithouMask);
}
