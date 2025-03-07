import User from "../models/user.models";

exports.registerUser = async (req, res) => {
  try {
    const { username, mobileNo, email, password } = req.body;

    let user = await User.findOne({
      $or: [{ email }, { mobileNo }],
    });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username,
      email,
      mobileNo,
      password,
    });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
