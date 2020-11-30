import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import userApi from "../../api/user";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true);
    userApi
      .getAllAdmin(auth.token)
      .then((resp) => {
        setIsLoading(false);
        setUsers(resp.data);
      })
      .catch((e) => {
        setIsLoading(false);
        //alert(e.message);
      });
  }, [auth.token]);

  const handleDelete = ({ id, name }) => {
    let consent = window.confirm(
      `Are you sure to delete ${name}\nThis action cannot be undone`
    );
    if (!consent) {
      return;
    }
    userApi
      .deleteByIdAdmin(id, auth.token)
      .then((resp) => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <>
      <h1 className="title">Users</h1>
      <hr />
      {isLoading ? (
        <p className="subtitle is-5 has-text-centered">Loading...</p>
      ) : users.length < 1 ? (
        <p className="subtitle is-5 has-text-centered">No users found.</p>
      ) : (
        <>
          <div className="table-container">
            <table className="table is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {users.map((user, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className="buttons">
                        <Link
                          onClick={() => handleDelete(user)}
                          className="button is-small is-danger"
                        >
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default AdminUsers;
