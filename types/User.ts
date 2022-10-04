export type UserDocument = {
  id: string;
  image: string;
  name: string;
};
export type UserDocuments = UserDocument[];


export type User = {
  id: string;
  name: string;
  jobType: string;
  salary: string;
  documents: UserDocument[];
};
export type Users = User[];
