export const randomStr = (length: number): string => {
  const seeder = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let randomStr = '';
  for (let i = 0; i < length; i++) {
    randomStr += seeder.charAt(Math.floor(Math.random() * seeder.length));
  }
  return randomStr;
};
