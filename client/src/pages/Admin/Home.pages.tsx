import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { OrderType } from "../../utils/Types";
import FoodProgress from "../../components/FoodProgress";
import "../../styles/AdminHome.styles.scss";

const pendingStyles = {
  ProgressBarStyle: { backgroundColor: "#ee3d22" },
  AcceptBtnStyles: {
    backgroundColor: "#ee3d22",
    border: "none",
    color: "white",
    borderRadius: "10px",
  },
  CancelBtnStyles: {
    backgroundColor: "white",
    marginTop: "10px",
    border: "1px solid #ee3d22",
    color: "#ee3d22",
    borderRadius: "10px",
  },
};

const progressStyles = {
  ProgressBarStyle: { backgroundColor: "#fbb346" },
  DoneBtnStyles: {
    backgroundColor: "#fbb346",
    border: "none",
    color: "white",
    borderRadius: "10px",
  },
};

const readyStyles = {
  ProgressBarStyle: { backgroundColor: "#5db140" },
  NotifyBtnStyles: {
    backgroundColor: "white",
    border: "1px solid #5db140",
    color: "#5db140",
    borderRadius: "10px",
  },
};

const Home: React.FC = () => {
  const accessToken = Cookies.get("accessToken");
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  const [pendingOrders, setPendingOrders] = useState<OrderType[] | null>(null);
  const [inProgressOrders, setInProgressOrdersOrders] = useState<
    OrderType[] | null
  >(null);
  const [readyOrders, setReadyOrders] = useState<OrderType[] | null>(null);

  async function getFoodItems() {
    await axios
      .get("/api/getfoodies", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) =>
        localStorage.setItem("foodItems", JSON.stringify(res.data))
      )
      .catch((e) => {
        console.log(e);
        throw new Error(e);
      });
  }

  async function getOrders() {
    await axios
      .get("/api/order/getorders", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        localStorage.setItem("orderItems", JSON.stringify(res.data));
        setOrders(res.data);
      })
      .catch((e) => console.error(e));
  }

  async function ChangeStatus(data: {
    id: number;
    status: string;
    isCompleted: boolean;
  }) {
    const oldOrders = [...orders!];

    oldOrders?.filter((ord) => {
      if (ord.orderId === data.id) return (ord.status = data.status);

      return ord;
    });

    setOrders(oldOrders);

    await axios
      .patch("/api/order/update", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }

  function filterOrders() {
    setPendingOrders(
      orders!.filter((order) => order.status === "Order Placed")
    );
    setInProgressOrdersOrders(
      orders!.filter((order) => order.status === "In Progress")
    );
    setReadyOrders(
      orders!.filter((order) => order.status === "Ready for Pickup")
    );
  }

  useEffect(() => {
    getFoodItems();
    getOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (orders) {
      filterOrders();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  return (
    <main id="admin-home-content">
      <div id="pending" className="column">
        <div id="pending-header" className="header">
          Pending Request
        </div>
        {pendingOrders?.map((order) => (
          <FoodProgress
            key={order.orderId}
            prp={{
              progressStyle: pendingStyles.ProgressBarStyle,
              btn: [
                {
                  btnTxt: "Accept",
                  style: pendingStyles.AcceptBtnStyles,
                  handleClick: ChangeStatus,
                },
                {
                  btnTxt: "Cancel",
                  style: pendingStyles.CancelBtnStyles,
                  handleClick: ChangeStatus,
                },
              ],
            }}
            order={order}
          />
        ))}
      </div>
      <div id="progress" className="column">
        <div id="progress-header" className="header">
          In Progress
        </div>
        {inProgressOrders?.map((order) => (
          <FoodProgress
            key={order.orderId}
            prp={{
              progressStyle: progressStyles.ProgressBarStyle,
              btn: [
                {
                  btnTxt: "Done",
                  style: progressStyles.DoneBtnStyles,
                  handleClick: ChangeStatus,
                },
              ],
            }}
            order={order}
          />
        ))}
      </div>
      <div id="ready" className="column">
        <div id="ready-header" className="header">
          Ready
        </div>
        {readyOrders?.map((order) => (
          <FoodProgress
            key={order.orderId}
            prp={{
              progressStyle: readyStyles.ProgressBarStyle,
              btn: [
                {
                  btnTxt: "Notify",
                  style: readyStyles.NotifyBtnStyles,
                  handleClick: ChangeStatus,
                },
              ],
            }}
            order={order}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
