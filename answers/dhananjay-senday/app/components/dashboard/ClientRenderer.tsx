"use client";

import DataExporter from "./DataExporter";
import Loader from "./Loader";
import DataTable from "./TablesRender";

export default function ClientRenderer() {
  return (
    <DataExporter>
      {(isSocketConnected, CoinData) => (
        <>
          {isSocketConnected ? <DataTable CoinData={CoinData} /> : <Loader />}
        </>
      )}
    </DataExporter>
  );
}
