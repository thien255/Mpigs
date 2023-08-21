import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user) {
      return null;
    }
    return session?.user;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
