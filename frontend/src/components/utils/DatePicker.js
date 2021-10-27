import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker() {
    const [date, setDate] = useState(new Date());

    return (
        <DatePicker className="border border-gray-300 rounded-md p-1"
                    filterDate={d => {return new Date() > d;}}
                    dateFormat="dd/MM/yyyy"
                    selected={date}
                    onChange={date => setDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" />
    );
}
