import { memoize } from 'lodash';

export const checkForEmptyString = value => (!value || !value.trim()
  ? 'name must not be empty'
  : null
);

export const checkForAlphaNumeric = value => (value && /[^a-zA-Z0-9 ]/i.test(value)
  ? 'name may contain only alphanumeric characters'
  : null
);

export const checkForUniqueName = memoize(
  channels => name => (channels
    .find(channel => channel.name === name.trim())
    ? 'name must be unique'
    : null),
);

export const checkForUniqueOrCurrentName = memoize(
  (channels, currentName) => name => (channels
    .find(channel => channel.name === name.trim() && currentName !== name.trim())
    ? 'name must be unique'
    : null),
);

export const checkForMaxLength = (value) => {
  const maxLength = 20;
  return value.trim().length > maxLength
    ? `max ${maxLength} chars`
    : null;
};
