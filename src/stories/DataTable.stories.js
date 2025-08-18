import React from "react";
import DataTable from "../components/DataTable";

const dataTableStory = {
  title: "Components/DataTable",
  component: DataTable
};

export default dataTableStory;

const sampleData = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 28 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 34 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 23 }
];

const sampleColumns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true }
];

const Template = (args) => <DataTable {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  data: sampleData,
  columns: sampleColumns,
  selectable: true
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  columns: sampleColumns,
  loading: true
};

export const Empty = Template.bind({});
Empty.args = {
  data: [],
  columns: sampleColumns
};
