import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import Table from "~/components/table-list"; // Ajusta la ruta según sea necesario

export async function loader() {
  try {
    const response = await fetch("https://omni.icarus.tools/ethereum/cush/topUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ params: [null] }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response data:", data); 
    return json(data.result);
  } catch (error) {
    console.error("Error fetching top users:", error);
    return json({ error: error.message });
  }
}

export default function TopUsers() {
  const data = useLoaderData();

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data); 
    }
  }, [data]);

  const columns = [
    { key: 'account', label: 'Account' },
    { key: 'positions', label: 'Positions' },
    { key: 'swaps', label: 'Swaps' },
    { key: 'volume', label: 'Volume', format: (value) => value.toFixed(2) }
  ];

  return (
    <div>
      {data && !data.error ? (
        <Table
          data={data}
          title="Top Users in the Last 7 Days"
          description="Here are the top users based on volume, fees, and number of swaps in the last 7 days."
          columns={columns}
          networks={[]} // No networks passed here
          selectedNetwork=""
          onNetworkChange={null} // No network change handler needed
        />
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
