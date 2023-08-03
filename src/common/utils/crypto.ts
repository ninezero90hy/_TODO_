import CryptoJS from 'crypto-js';

const SECRET_KEY: string | undefined = process.env.REACT_APP_SECRET_KEY;

const encrypt = (text: string) => {
  if (!SECRET_KEY) throw new Error('Invalid secret key');
  if (!text) throw new Error('Invalid text value');
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

const decrypt = (text: string) => {
  if (!SECRET_KEY) throw new Error('Invalid secret key');
  if (!text) throw new Error('Invalid text value');
  return CryptoJS.AES.decrypt(text, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

export { encrypt, decrypt };
