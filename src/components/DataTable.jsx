import React, { useEffect, useState } from "react";

const DynamicTable = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://wallstreet-backend-d9xq.onrender.com/api/all"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Log API response
        setTeamData(data.data); // Assuming data is inside 'data.data'
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const convertToCSV = (data) => {
    const header = [
      "Name",
      "Phone Number",
      "WhatsApp Number",
      "Email",
      "College Name",
    ];
    const rows = data.map((team) => [
      team.name,
      team.phoneNumber,
      team.whatsappNumber,
      team.email,
      team.collegeName,
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(teamData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "team_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Team Data
      </h2>
      <button
        onClick={downloadCSV}
        style={{
          marginBottom: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Download CSV
      </button>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Phone Number
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              WhatsApp Number
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              College Name
            </th>
          </tr>
        </thead>
        <tbody>
          {teamData && teamData.length > 0 ? (
            teamData.map((team, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.phoneNumber}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.whatsappNumber}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.collegeName}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                No team data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
