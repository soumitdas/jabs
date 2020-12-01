const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { createOrder, isPaymentLegit } = require("../utils/razorpay");

const OrderItemsSchema = new mongoose.Schema(
  {
    product: {
      type: {
        _id: {
          type: ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
          maxlength: 50,
        },
        images: {
          type: Array,
        },
        price: {
          type: Number,
          required: true,
          maxlength: 10,
        },
        offerPrice: {
          type: Number,
          required: true,
          maxlength: 10,
        },
      },
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1"],
    },
  },
  { _id: false }
);
const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    street: {
      type: String,
      minlength: 3,
      required: true,
    },
    city: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
    state: {
      type: String,
      minlength: 3,
      required: true,
    },
    pin: {
      type: Number,
      minlength: 6,
      maxlength: 6,
      required: true,
    },
    contactNo: {
      type: String,
      maxlength: 11,
      minlength: 10,
    },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    shipping: {
      type: addressSchema,
      required: true,
    },
    items: {
      type: [OrderItemsSchema],
      required: true,
      validate: [(value) => value.length > 0, "Empty items[]"],
    },
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    taxes: {
      type: Array,
    },
    taxAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingCharges: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    payment: {
      status: {
        type: String,
        required: true,
        default: "pending",
        enum: ["pending", "cod-pending", "paid", "refunded"],
      },
      method: {
        type: String,
        enum: ["cod", "pg-razorpay"],
        require: true,
      },
      reference: {
        type: Object,
        default: {},
      },
    },
    status: {
      type: String,
      enum: [
        "initiated",
        "payment-pending",
        "processing",
        "approved",
        "shipped",
        "delivered",
        "cancelled",
      ],
      required: true,
      default: "initiated",
    },
    shipment: {
      provider: {
        type: String,
      },
      trackingId: {
        type: String,
        trim: true,
      },
    },
    events: [
      {
        _id: false,
        date: Date,
        name: String,
        remarks: String,
      },
    ],
  },
  { timestamps: true }
);

OrderSchema.methods = {
  calculateSubtotal: function () {
    let subTotal = 0;
    this.items.forEach((item) => {
      subTotal += item.product.offerPrice * item.quantity;
    });
    this.subTotal = subTotal;
  },
  calculateTaxAmount: function (taxRate = 18) {
    this.calculateSubtotal();
    this.taxAmount = Math.round((this.subTotal * taxRate) / 100);
  },
  calculateTotal: function () {
    this.calculateTaxAmount(0);
    this.totalAmount = this.subTotal + this.taxAmount + this.shippingCharges;
  },
  addEvent: function (name, remarks) {
    this.events.push({
      date: Date.now(),
      name,
      remarks,
    });
  },
  initiateOrder: function () {
    this.addEvent("order", "Order has been initiated");
    this.calculateTotal();

    switch (this.payment.method) {
      case "cod":
        this.status = "processing";
        this.payment.status = "cod-pending";
        this.addEvent("order", "Order has been confirmed");
        this.addEvent(
          "payment",
          `₹ ${this.totalAmount} to be paid using Cash on delivery`
        );
        break;

      case "pg-razorpay":
        this.status = "payment-pending";
        // Generate razorpay order id
        return createOrder(this.totalAmount, this._id.toString()).then(
          (resp) => {
            // resp: {
            //   id: 'order_G6IG6ROhqQtaVQ',
            //   entity: 'order',
            //   amount: 17500,
            //   amount_paid: 0,
            //   amount_due: 17500,
            //   currency: 'INR',
            //   receipt: '5fc146f091da712d1dc96a56',
            //   offer_id: null,
            //   status: 'created',
            //   attempts: 0,
            //   notes: [],
            //   created_at: 1606502129
            // }
            this.payment.reference = {
              orderId: resp.id,
              amount: resp.amount_due,
            };
            this.addEvent("payment", "Payment has been initiated");
          }
        );
    }

    // if (this.payment.method === "cod") {
    //   this.status = "processing";
    //   this.payment.status = "cod-pending";
    //   this.addEvent("order", "Order has been confirmed");
    //   this.addEvent(
    //     "payment",
    //     `₹ ${this.totalAmount} to be paid using Cash on delivery`
    //   );
    //   return;
    // }
    // if (this.payment.method === "pg-razorpay") {
    //   this.status = "payment-pending";
    //   // Generate razorpay order id
    //   return razorpay.orders
    //     .create({
    //       amount: this.totalAmount * 100,
    //       currency: "INR",
    //       receipt: this._id.toString(),
    //       payment_capture: true,
    //     })
    //     .then((resp) => {
    //       // resp: {
    //       //   id: 'order_G6IG6ROhqQtaVQ',
    //       //   entity: 'order',
    //       //   amount: 17500,
    //       //   amount_paid: 0,
    //       //   amount_due: 17500,
    //       //   currency: 'INR',
    //       //   receipt: '5fc146f091da712d1dc96a56',
    //       //   offer_id: null,
    //       //   status: 'created',
    //       //   attempts: 0,
    //       //   notes: [],
    //       //   created_at: 1606502129
    //       // }
    //       this.payment.reference = { orderId: resp.id };
    //       this.addEvent("payment", "Payment has been initiated");
    //     });
    // }
  },
  verifyPayment: function (orderId, paymentId, signature) {
    if (this.payment.reference.orderId !== orderId) {
      return false;
    }
    const isPaid = isPaymentLegit(orderId, paymentId, signature);
    if (isPaid) {
      this.payment.reference = {
        ...this.payment.reference,
        paymentId,
        signature,
      };
      this.addEvent(
        "payment",
        `Payment of ₹ ${this.totalAmount} received successfully`
      );
      this.payment.status = "paid";
      this.addEvent("order", "We are processing your order");
      this.status = "processing";
    }
    return isPaid;
  },
  approveOrder: function () {
    if (this.status !== "processing") {
      return false;
    }
    this.status = "approved";
    this.addEvent("order", "Order Approved");
    return true;
  },
  cancelOrder: function (remarks = "") {
    if (this.status === "cancelled") {
      return false;
    }
    this.status = "cancelled";
    this.addEvent("order", `Order Cancelled. ${remarks}`);
    return true;
  },
  addShipment: function ({ provider, trackingId }, remarks = "") {
    if (this.status !== "approved" || !provider || !trackingId) {
      return false;
    }
    this.status = "shipped";
    this.shipment.provider = provider;
    this.shipment.trackingId = trackingId;
    this.addEvent("order", `Order Shipped. ${remarks}`);
    return true;
  },
  orderDelivey: function (remarks = "") {
    if (this.status !== "shipped") {
      return false;
    }
    this.status = "delivered";
    this.addEvent("order", `Order Delivered. ${remarks}`);
    return true;
  },
};

const Order = mongoose.model("Order", OrderSchema);

module.exports = { addressSchema, Order };
