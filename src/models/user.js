const mongoose = require("mongoose");
const argon2 = require("argon2");
const crypto = require("crypto");

const { addressSchema } = require("./order");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    avatarURL: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    passwordReset: {
      key: {
        type: String,
        trim: true,
        default: null,
      },
      validTill: Date,
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
      required: true,
    },

    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    emailVerify: {
      key: {
        type: String,
        trim: true,
        default: null,
      },
      validTill: Date,
    },
    address: [addressSchema],
  },
  { timestamps: true }
);
/*
userSchema.virtual("plainPassword")
    .set(async function(password) {
        this.password = password;
        //this.password = await this.securePassword(password)
    })
*/
userSchema.methods = {
  setHashedPassword: async function () {
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
  },
  /*securePassword: async function(plainPassword) {
        if (!plainPassword) return "";
        try {
            return argon2.hash(plainPassword);
        } catch (error) {
            return "";
        }
    },*/
  authenticate: async function (plainPassword) {
    try {
      return argon2.verify(this.password, plainPassword);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  genEmailVerifyKey: function () {
    this.emailVerify.key = crypto.randomBytes(16).toString("hex");
    this.emailVerify.validTill = Date.now() + 24 * 3600 * 1000;
  },
  verifyEmail: function (key) {
    if (
      this.emailVerify.key !== key ||
      this.emailVerify.validTill < Date.now()
    ) {
      return false;
    }
    this.isEmailVerified = true;
    this.emailVerify.key = null;
    this.emailVerify.validTill = null;
    return true;
  },
  genPasswordResetKey: function () {
    this.passwordReset.key = crypto.randomBytes(32).toString("hex");
    this.passwordReset.validTill = Date.now() + 3600 * 1000;
  },
  verifyPasswordReset: function (key, newPassword) {
    if (
      this.passwordReset.key !== key ||
      this.passwordReset.validTill < Date.now() ||
      !newPassword
    ) {
      return false;
    }
    if (!this.isEmailVerified) {
      this.isEmailVerified = true;
    }
    this.passwordReset.key = null;
    this.passwordReset.validTill = null;
    this.password = newPassword;
    return true;
  },
};

module.exports = mongoose.model("User", userSchema);
