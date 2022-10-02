export const apiRequest = async (url, optionsObj = null, errMsg = "") => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) {
      throw Error("Unable to connect, please try again");
    }
  } catch (e) {
    errMsg = e.message;
  } finally {
    return errMsg;
  }
};
