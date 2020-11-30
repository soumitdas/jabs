import React, { useEffect, useState } from "react";
import orderApi from "../../api/order";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

import { range } from "../../utils/helper";

const UserOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [paginate, setPaginate] = useState({
    limit: 10,
    currentPage: 1,
    totalPages: 1,
  });

  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true);
    orderApi
      .getOrder(auth.token, paginate.currentPage, paginate.limit)
      .then((resp) => {
        setIsLoading(false);
        setPaginate({
          ...paginate,
          totalPages: resp.totalPages,
          currentPage: resp.currentPage,
        });
        setOrders(resp.data);
      })
      .catch((e) => {
        setIsLoading(false);
        //alert(e.message);
      });
  }, [auth.token, paginate.limit, paginate.currentPage]);

  const handleChange = (e) =>
    setPaginate({ ...paginate, [e.target.name]: e.target.value });

  const handlePaginatePageClick = (e) => {
    setPaginate({ ...paginate, currentPage: e.target.innerText });
  };
  const handlePaginateNext = () => {
    const nextPage = paginate.currentPage + 1;
    if (nextPage > paginate.totalPages) {
      return;
    }
    setPaginate({ ...paginate, currentPage: nextPage });
  };
  const handlePaginateBefore = () => {
    const beforePage = paginate.currentPage - 1;
    if (beforePage < 1) {
      return;
    }
    setPaginate({ ...paginate, currentPage: beforePage });
  };

  return (
    <>
      <h1 className="title">My Orders</h1>
      <hr />
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            {/* <div className="field is-grouped">
              <div className="control">
                <div className="select is-small">
                  <select>
                    <option>Order Id</option>
                    <option>Name</option>
                  </select>
                </div>
              </div>
              <div className="control">
                <input type="text" className="input is-small"></input>
              </div>
              <div className="control">
                <button className="button is-small">Search</button>
              </div>
            </div> */}
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="control">
              <div className="select is-small">
                <select
                  name="limit"
                  value={paginate.limit}
                  onChange={handleChange}
                >
                  <option value={10}>10 per Page</option>
                  <option value={20}>20 per Page</option>
                  <option value={30}>30 per Page</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isLoading ? (
        <p className="subtitle is-5 has-text-centered">Loading...</p>
      ) : orders.length < 1 ? (
        <p className="subtitle is-5 has-text-centered">No orders found.</p>
      ) : (
        <>
          <div className="table-container">
            <table className="table is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Date and Time</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {orders.map((order, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <ul>
                        {order.items.map((item, i) => (
                          <li key={i}>
                            {i + 1}. {item.product.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{order.totalAmount}</td>
                    <td>
                      {order.status === "payment-pending" ? (
                        <span className="tag is-warning">{order.status}</span>
                      ) : order.status === "cancelled" ? (
                        <span className="tag is-danger">{order.status}</span>
                      ) : order.status === "processing" ? (
                        <span className="tag is-primary">{order.status}</span>
                      ) : (
                        <span className="tag is-success">{order.status}</span>
                      )}
                    </td>
                    <td>
                      <div className="buttons">
                        <Link
                          to={`/account/orders/${order._id}`}
                          className="button is-small is-info"
                        >
                          Track
                        </Link>
                        {/* <Link className="button is-small is-danger">
                          Cancel
                        </Link> */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          {paginate.totalPages > 1 && (
            <nav
              className="pagination"
              role="navigation"
              aria-label="pagination"
            >
              <a
                className="pagination-previous"
                disabled={paginate.currentPage <= 1}
                onClick={handlePaginateBefore}
              >
                Previous
              </a>
              <a
                className="pagination-next"
                disabled={paginate.currentPage >= paginate.totalPages}
                onClick={handlePaginateNext}
              >
                Next page
              </a>
              <ul className="pagination-list">
                {range(1, paginate.totalPages).map((pageNo, i) => (
                  <li key={i}>
                    <a
                      className={
                        paginate.currentPage === pageNo
                          ? "pagination-link is-current"
                          : "pagination-link"
                      }
                      aria-label={`Goto page ${pageNo}`}
                      aria-current={paginate.currentPage === pageNo && "page"}
                      onClick={handlePaginatePageClick}
                    >
                      {pageNo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      )}
    </>
  );
};

export default UserOrders;
