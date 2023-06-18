import { v4 as uuidv4 } from "uuid";
import ResponseHelper from "../helpers/responseHelper";
import { sequelize } from "../models/init-models";

const addToCart = async (req, res) => {
  try {
    const items = await req.body;
    const numberOfEntries = items.length;
    const cartNo = uuidv4();
    const cartItems = [];

    for (let i = 0; i < numberOfEntries; i++) {
      let product = await req.context.models.product.findOne({
        where: { product_id: items[i].product_id },
      });

      let subTotal = product.price * items[i].qty;

      if (product.stock === 0) {
        res.send("Stok " + product.product_name + " Sudah Habis.");
      } else {
        let cartId = uuidv4();

        cartItems.push({
          cart_id: cartId,
          product_id: items[i].product_id,
          qty: items[i].qty,
          subtotal: subTotal,
          user_id: items[i].user_id,
          cart_no: cartNo,
        });

        await req.context.models.cart.create({
          cart_id: cartId,
          product_id: items[i].product_id,
          qty: items[i].qty,
          subtotal: subTotal,
          user_id: items[i].user_id,
          cart_no: cartNo,
        });

        await req.context.models.product.update(
          {
            stock: product.stock - items[i].qty,
          },
          {
            where: { product_id: items[i].product_id },
          }
        );
      }
    }
    ResponseHelper.sendResponse(res, 200, cartItems);
  } catch (error) {
    res.send(error);
  }
};

const createOrder = async (req, res) => {
  try {
    const orderId = uuidv4();
    const cartNo = req.body.cart_no;
    const totalPrice = await req.context.models.cart.sum("subtotal", {
      where: { cart_no: cartNo },
    });

    const order = await req.context.models.orders.create({
      order_id: orderId,
      user_id: req.body.user_id,
      total_price: totalPrice,
      status: "OPEN",
    });

    const query = `
        insert into order_line_item(order_line_id, product_id, qty, subtotal, order_id)
        select cr.cart_id, cr.product_id, cr.qty, cr.subtotal, $1
        from cart as cr
        where cart_no = $2
        `;

    const orderLine = await sequelize.query(query, {
      bind: [orderId, cartNo],
      type: sequelize.QueryTypes.INSERT,
    });

    let result = {
      order: order,
      orderLine: orderLine
    }

    ResponseHelper.sendResponse(res, 200, result);
  } catch (error) {
    res.send(error);
  }
};

const closeOrder = async (req, res) => {
  try {
    const order = await req.context.models.orders.update(
      {
        status: "CLOSED",
      },
      {
        returning: true,
        where: { order_id: req.params.order_id },
      }
    );
    res.send(order);
  } catch (error) {
    res.send(error);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await req.context.models.orders.update(
      {
        status: "CANCELLED",
      },
      {
        returning: true,
        where: { order_id: req.params.order_id },
      }
    );

    const orderLines = await req.context.models.order_line_item.findAll({
      where: { order_id: req.params.order_id },
    });

    for (const orderLine of orderLines) {
      const productId = orderLine.product_id;
      const cancelledQuantity = orderLine.qty;

      const product = await req.context.models.product.findByPk(productId);

      product.stock += cancelledQuantity;

      await product.save();
    }

    res.send(order);
  } catch (error) {
    res.send(error)
  }
}

export default {
  addToCart,
  createOrder,
  closeOrder,
  cancelOrder
};
