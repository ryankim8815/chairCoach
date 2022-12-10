export const nullPrototypeHandler = (object: any) => {
  const jsonString = JSON.stringify(object);
  const jsonObject = JSON.parse(jsonString);
  return jsonObject;
};
