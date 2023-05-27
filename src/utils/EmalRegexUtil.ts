export const validateEmail = (email: string): boolean => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  const res = email.match(reg);
  return res !== null;
};
