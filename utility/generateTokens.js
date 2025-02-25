import User from "../models/userModel.js";

export const generateAccessAndRefreshToken = async (userid) => {
    try {
      const user = await User.findById(userid);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
      try {
        await user.save({validateBeforeSave: false});
      } catch (error) {
        console.log("Failed saving", error);
      }
      return {accessToken, refreshToken};
    } catch (error) {
      return {error: error };
    }
  };
  