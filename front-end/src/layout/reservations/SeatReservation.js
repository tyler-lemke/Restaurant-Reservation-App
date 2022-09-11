import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import SeatTable from "../tables/SeatTable";

function SeatReservation() {
  const reservationId = useParams();
  const [tableId, setTableId] = useState(3);
  const [seatingError, setSeatingError] = useState(null);
  const history = useHistory();

  const handleChange = (event) => {
    event.preventDefault();
    setTableId(Number(event.target.value));
  };

  const handleSeating = async (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    await updateTable(
      reservationId.reservation_id,
      tableId,
      abortController.signal
    )
      .then(() => history.push("/"))
      .catch(setSeatingError);
    return () => abortController.abort();
  };

  return (
    <>
      <main className="m-3">
        <div className="page-head-container">
          <h2>Seating Reservation: {reservationId.reservation_id}</h2>
        </div>
        <ErrorAlert error={seatingError} />
        <form onSubmit={handleSeating} className="form-card">
          <div className="form-item">
            <label htmlFor="table_id">Select a Table</label>
            <select
              name="table_id"
              className="form-input"
              onChange={handleChange}
            >
              <SeatTable />
            </select>
          </div>
          <div className="form-item mt-2 mb-2">
            <input
              type="submit"
              className="btn btn-success form-button"
              value={"Submit"}
            />
            <input
              type="button"
              className="btn btn-secondary form-button"
              value={"Cancel"}
              onClick={() => history.goBack()}
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default SeatReservation;