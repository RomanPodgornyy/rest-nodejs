function validatePhone(phone) {
  const r = /^\+?\d{11}$/;
  return r.test(phone.replace(/\s+/g, ''));
}

function validateEmail(email) {
  const r = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return r.test(email);
}

module.exports = {
  validatePhone,
  validateEmail,
};
