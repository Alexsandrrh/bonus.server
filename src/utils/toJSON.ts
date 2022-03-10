export const toJSON = {
  virtuals: true,
  versionKey: false,
  transform: (doc, { _id, ...ret }) => _id && ret,
};
