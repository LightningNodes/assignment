"use client";

import ParseData from "./ParseData";
import Loader from "./Loader";
import DataTable from "./Table";

export default function ShowData() {
  return (
    <ParseData>
      {(socketConnectionDone, Data) => (
        <>{socketConnectionDone ? <DataTable Data={Data} /> : <Loader />}</>
      )}
    </ParseData>
  );
}
